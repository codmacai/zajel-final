import { CONTENT } from './content';
import { getSection as getCmsSection } from '@/lib/cms/server';

export type Lang = 'en' | 'ar';

/** CMS key of a careers section: careers_hero → careers.hero */
export const careersKey = (id: string) => `careers.${id.replace(/^careers_/, '').replace(/_/g, '-')}`;

/**
 * Returns the section content: its built-in content from `content.ts`, with any edits made in
 * the CMS (Careers page) laid over it. Null if the section is missing or switched off.
 * Arabic is handled by the site translator, so `lang` is accepted for compatibility only.
 */
export async function getSection<T>(id: string, lang: Lang = 'en'): Promise<T | null> {
  void lang;
  const row = CONTENT[id];
  if (!row || row.enabled === false) return null;
  return getCmsSection<T>(careersKey(id), row.en as T);
}
