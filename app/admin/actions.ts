'use server';

import { revalidatePath, updateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { clearSession, getAdmin, safeNext, signIn } from '@/lib/cms/auth';
import { CMS_TAG } from '@/lib/cms/config';
import { getAt, sanitize, toPlain, type ArabicMap, type Plain } from '@/lib/cms/content';
import { translatablePaths } from '@/lib/cms/fields';
import { findSection } from '@/lib/cms/registry';
import { cmsWritable, createUpload, readHistory, readRowFresh, writeRow, type CmsVersion } from '@/lib/cms/store';

export type ActionResult<T = object> = ({ ok: true } & T) | { ok: false; error: string };

export async function loginAction(_prev: string | null, form: FormData): Promise<string | null> {
  const email = String(form.get('email') ?? '').trim();
  const password = String(form.get('password') ?? '');
  if (!email || !password) return 'Enter your email and password.';
  const error = await signIn(email, password);
  if (error) return error;
  redirect(safeNext(String(form.get('next') ?? '')));
}

export async function logoutAction() {
  await clearSession();
  redirect('/admin/login');
}

async function guard(): Promise<{ email: string } | { error: string }> {
  const admin = await getAdmin();
  if (!admin) return { error: 'Your session has ended. Sign in again, then save.' };
  if (!cmsWritable()) return { error: 'Saving is turned off: the server is missing the Supabase secret key.' };
  return admin;
}

/** Refreshes every page that shows CMS content. */
function publish() {
  updateTag(CMS_TAG);
  revalidatePath('/', 'layout');
}

/** Keeps only Arabic for real text fields of the saved content. */
function cleanArabic(content: Plain, input: unknown, hints = {}): ArabicMap {
  const out: ArabicMap = {};
  if (!input || typeof input !== 'object') return out;
  for (const path of translatablePaths(content, hints)) {
    const ar = (input as Record<string, unknown>)[path];
    const en = getAt(content, path);
    if (typeof ar === 'string' && ar.trim() && typeof en === 'string' && en.trim()) out[path] = ar.trim().slice(0, 20000);
  }
  return out;
}

export async function saveSectionAction(input: {
  key: string;
  en: unknown;
  ar: unknown;
  enabled: boolean;
}): Promise<ActionResult<{ updatedAt: string }>> {
  const who = await guard();
  if ('error' in who) return { ok: false, error: who.error };
  const found = findSection(input.key);
  if (!found) return { ok: false, error: 'This section no longer exists. Reload the page.' };

  const original = toPlain(found.section.defaults) ?? {};
  const en = sanitize(original, input.en) ?? original;
  const ar = cleanArabic(en, input.ar, found.section.hints);
  try {
    const row = await writeRow({ key: input.key, en, ar, enabled: Boolean(input.enabled), updated_by: who.email });
    publish();
    return { ok: true, updatedAt: row.updated_at ?? new Date().toISOString() };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Saving failed. Try again.' };
  }
}

/** Shows or hides a section on the site, keeping its content as it is. */
export async function setSectionEnabledAction(key: string, enabled: boolean): Promise<ActionResult> {
  const who = await guard();
  if ('error' in who) return { ok: false, error: who.error };
  const found = findSection(key);
  if (!found) return { ok: false, error: 'This section no longer exists. Reload the page.' };
  try {
    const row = await readRowFresh(key);
    const en = row?.en ?? toPlain(found.section.defaults) ?? {};
    await writeRow({ key, en, ar: row?.ar ?? {}, enabled, updated_by: who.email });
    publish();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Couldn’t change the section. Try again.' };
  }
}

export async function historyAction(key: string): Promise<ActionResult<{ versions: CmsVersion[] }>> {
  const who = await guard();
  if ('error' in who) return { ok: false, error: who.error };
  try {
    return { ok: true, versions: await readHistory(key) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Couldn’t load the history.' };
  }
}

const IMAGE_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
};

/** An address the browser can upload one image to, and where it will be shown from. */
export async function prepareUploadAction(
  key: string,
  fileName: string,
  type: string,
  size: number,
): Promise<ActionResult<{ uploadUrl: string; publicUrl: string }>> {
  const who = await guard();
  if ('error' in who) return { ok: false, error: who.error };
  const ext = IMAGE_TYPES[type];
  if (!ext) return { ok: false, error: 'Use a JPG, PNG, WebP, AVIF, GIF or SVG image.' };
  if (size > 10 * 1024 * 1024) return { ok: false, error: 'This image is over 10 MB. Make it smaller and try again.' };
  const base = fileName.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'image';
  const folder = key.replace(/[^a-z0-9.-]/gi, '-');
  const path = `${folder}/${Date.now().toString(36)}-${base}.${ext}`;
  try {
    return { ok: true, ...(await createUpload(path)) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Couldn’t prepare the upload.' };
  }
}
