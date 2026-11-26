import { CMS_TAG, MEDIA_BUCKET, SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, cmsConfigured } from './config';
import type { ArabicMap, Plain } from './content';

export interface CmsRow {
  key: string;
  en: Plain;
  ar: ArabicMap;
  enabled: boolean;
  updated_at?: string;
  updated_by?: string | null;
}

export interface CmsVersion {
  id: number;
  key: string;
  en: Plain;
  ar: ArabicMap;
  enabled: boolean;
  saved_at: string;
  saved_by: string | null;
}

const secretKey = () => process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

export const cmsWritable = () => cmsConfigured && Boolean(secretKey());

function headers(key: string, extra?: Record<string, string>): HeadersInit {
  return { apikey: key, Authorization: `Bearer ${key}`, ...extra };
}

async function fail(res: Response, what: string): Promise<never> {
  let detail = '';
  try {
    const body = await res.json();
    detail = body.message ?? body.error ?? body.msg ?? '';
  } catch {}
  throw new Error(`${what} failed (${res.status})${detail ? `: ${detail}` : ''}`);
}

export async function readAllRows(): Promise<CmsRow[]> {
  if (!cmsConfigured) return [];
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/cms_content?select=key,en,ar,enabled`, {
      headers: headers(SUPABASE_PUBLISHABLE_KEY),
      cache: 'force-cache',
      next: { tags: [CMS_TAG], revalidate: 300 },
    });
    if (!res.ok) return [];
    return (await res.json()) as CmsRow[];
  } catch {
    return [];
  }
}

export async function readRowsFresh(keys?: string[]): Promise<CmsRow[]> {
  if (!cmsWritable()) return [];
  const filter = keys ? `&key=in.(${keys.map((k) => `"${k}"`).join(',')})` : '';
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/cms_content?select=key,en,ar,enabled,updated_at,updated_by${filter}`,
    { headers: headers(secretKey()), cache: 'no-store' },
  );
  if (!res.ok) await fail(res, 'Loading content');
  return (await res.json()) as CmsRow[];
}

export async function readRowFresh(key: string): Promise<CmsRow | null> {
  const [row] = await readRowsFresh([key]);
  return row ?? null;
}

export async function writeRow(row: Omit<CmsRow, 'updated_at'>): Promise<CmsRow> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/cms_content?on_conflict=key`, {
    method: 'POST',
    headers: headers(secretKey(), {
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=representation',
    }),
    body: JSON.stringify(row),
    cache: 'no-store',
  });
  if (!res.ok) await fail(res, 'Saving');
  const [saved] = (await res.json()) as CmsRow[];
  return saved;
}

export async function readHistory(key: string, limit = 30): Promise<CmsVersion[]> {
  if (!cmsWritable()) return [];
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/cms_history?key=eq.${encodeURIComponent(key)}&order=saved_at.desc&limit=${limit}`,
    { headers: headers(secretKey()), cache: 'no-store' },
  );
  if (!res.ok) await fail(res, 'Loading history');
  return (await res.json()) as CmsVersion[];
}

export async function createUpload(path: string): Promise<{ uploadUrl: string; publicUrl: string }> {
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/upload/sign/${MEDIA_BUCKET}/${path}`, {
    method: 'POST',
    headers: headers(secretKey(), { 'Content-Type': 'application/json' }),
    body: '{}',
    cache: 'no-store',
  });
  if (!res.ok) await fail(res, 'Preparing the upload');
  const { url } = (await res.json()) as { url: string };
  return {
    uploadUrl: `${SUPABASE_URL}/storage/v1${url.startsWith('/') ? url : `/${url}`}`,
    publicUrl: `${SUPABASE_URL}/storage/v1/object/public/${MEDIA_BUCKET}/${path}`,
  };
}
