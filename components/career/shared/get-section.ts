import { CONTENT } from './content';
import { getSection as getCmsSection } from '@/lib/cms/server';

export type Lang = 'en' | 'ar';

export const careersKey = (id: string) => `careers.${id.replace(/^careers_/, '').replace(/_/g, '-')}`;

export async function getSection<T>(id: string, lang: Lang = 'en'): Promise<T | null> {
  void lang;
  const row = CONTENT[id];
  if (!row || row.enabled === false) return null;
  return getCmsSection<T>(careersKey(id), row.en as T);
}
