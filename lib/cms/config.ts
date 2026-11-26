export const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').replace(/\/+$/, '');

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const cmsConfigured = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);

export const CMS_TAG = 'cms';

export const MEDIA_BUCKET = 'cms-media';
