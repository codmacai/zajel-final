'use server';

// Messages from the website's forms (the contact page, and the quote forms on the freight
// pages). They are saved in Supabase and read in the CMS under Messages.

import { headers } from 'next/headers';
import { cmsWritable, insertMessage } from '@/lib/cms/store';

export type SendResult = { ok: true } | { ok: false; error: string };

// Form field names that mean the same thing on different forms.
const FIELDS = {
  name: ['name', 'fullName', 'full_name', 'contactName'],
  email: ['email', 'emailAddress'],
  phone: ['phone', 'mobile', 'telephone', 'tel', 'phoneNumber'],
  subject: ['subject', 'topic', 'inquiryType'],
  message: ['message', 'details', 'notes', 'comments', 'enquiry', 'inquiry'],
} as const;
const HONEYPOT = 'website';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// At most 5 messages per visitor and 60 in total per server every 10 minutes.
const WINDOW_MS = 10 * 60_000;
const recent = new Map<string, number[]>();
function tooMany(visitor: string): boolean {
  const now = Date.now();
  const mine = (recent.get(visitor) ?? []).filter((t) => now - t < WINDOW_MS);
  const all = [...recent.values()].flat().filter((t) => now - t < WINDOW_MS).length;
  if (mine.length >= 5 || all >= 60) return true;
  if (recent.size > 1000) recent.clear();
  recent.set(visitor, [...mine, now]);
  return false;
}

const labelOf = (key: string) => {
  const words = key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
};

export async function sendMessageAction(input: {
  form?: string;
  page?: string;
  values: Record<string, unknown>;
  /** Milliseconds between the form appearing and being sent. */
  elapsed?: number;
}): Promise<SendResult> {
  const values: Record<string, string> = {};
  for (const [k, v] of Object.entries(input?.values ?? {}).slice(0, 30)) {
    if (typeof v === 'string') values[k.slice(0, 40)] = v.trim();
  }

  // Bots fill the hidden field, or send faster than a person can type. Pretend it worked.
  if (values[HONEYPOT] || (typeof input.elapsed === 'number' && input.elapsed < 2500)) return { ok: true };

  const pick = (field: keyof typeof FIELDS) => FIELDS[field].map((k) => values[k]).find(Boolean) ?? '';
  const name = pick('name').slice(0, 120);
  const email = pick('email').slice(0, 200);
  const known = new Set<string>([...Object.values(FIELDS).flat(), HONEYPOT]);
  const extra = Object.entries(values)
    .filter(([k, v]) => v && !known.has(k))
    .map(([k, v]) => `${labelOf(k)}: ${v.slice(0, 500)}`);
  const message = [pick('message'), extra.join('\n')].filter(Boolean).join('\n\n').slice(0, 6000);

  if (!name || !EMAIL.test(email) || !message) {
    return { ok: false, error: 'Please fill in your name, a valid email address and your message.' };
  }

  const h = await headers();
  const visitor = h.get('x-forwarded-for')?.split(',')[0].trim() || h.get('x-real-ip') || 'unknown';
  if (tooMany(visitor)) return { ok: false, error: 'You’ve sent several messages already. Please wait a few minutes and try again.' };

  if (!cmsWritable()) {
    console.error('[contact] message not saved: the Supabase keys are not set on the server');
    return { ok: false, error: 'We couldn’t send your message right now. Please email us instead.' };
  }
  try {
    await insertMessage({
      form: (input.form ?? 'contact').replace(/[^a-z0-9-]/gi, '').slice(0, 40) || 'contact',
      name,
      email,
      phone: pick('phone').slice(0, 40) || null,
      subject: pick('subject').slice(0, 200) || null,
      message,
      page: (input.page ?? '').startsWith('/') ? input.page!.slice(0, 200) : null,
    });
    return { ok: true };
  } catch (e) {
    console.error('[contact] message not saved:', e instanceof Error ? e.message : e);
    return { ok: false, error: 'We couldn’t send your message. Please try again, or email us instead.' };
  }
}
