import { CONTENT } from './content';

export type Lang = 'en' | 'ar';

/**
 * Returns the section content for `lang` from local `content.ts`,
 * or null if the section is missing / disabled.
 *
 * Kept async with the same signature as the old Supabase version, so swapping
 * a real CMS back in later only means changing this file.
 */
export async function getSection<T>(id: string, lang: Lang = 'en'): Promise<T | null> {
  const row = CONTENT[id];
  if (!row || row.enabled === false) return null;
  const content = (lang === 'ar' ? row.ar : null) ?? row.en;
  return (content as T) ?? null;
}
