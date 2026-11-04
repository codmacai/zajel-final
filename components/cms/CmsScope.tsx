// Loads the saved CMS content for one page (or the site-wide sections) and hands it to the
// sections inside. Wrap a page's sections in <CmsScope page="sea-freight">, or pass several
// pages when a section shows another page's content (the home page shows the projects list).

import type { ReactNode } from 'react';
import { readAllRows } from '@/lib/cms/store';
import { CmsProvider, type SavedSection } from './CmsProvider';

export default async function CmsScope({ page, children }: { page: string | string[]; children: ReactNode }) {
  const prefixes = (Array.isArray(page) ? page : [page]).map((p) => `${p}.`);
  const saved: Record<string, SavedSection> = {};
  for (const row of await readAllRows()) {
    if (prefixes.some((p) => row.key.startsWith(p))) saved[row.key] = { en: row.en, enabled: row.enabled };
  }
  return <CmsProvider saved={saved}>{children}</CmsProvider>;
}
