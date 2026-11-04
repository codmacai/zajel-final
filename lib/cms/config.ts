// Public CMS settings, safe to use in the browser and on the server.
// The secret key is read only in lib/cms/store.ts (server code).

export const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').replace(/\/+$/, '');

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

/** True when the site can read CMS content. Without it every section shows its built-in content. */
export const cmsConfigured = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);

/** Cache tag on every CMS read, so a save refreshes every page that uses CMS content. */
export const CMS_TAG = 'cms';

/** Supabase Storage bucket for uploaded images (see supabase/migrations). */
export const MEDIA_BUCKET = 'cms-media';
