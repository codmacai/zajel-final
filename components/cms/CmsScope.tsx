import type { ReactNode } from 'react';
import { readAllRows } from '@/lib/cms/store';
import { CmsProvider, type SavedSection } from './CmsProvider';

export default async function CmsScope({ page, children }: { page: string | string[]; children: ReactNode }) {
  const prefixes = (Array.isArray(page) ? page : [page]).map((p) => `${p}.`);
  const saved: Record<string, SavedSection> = {};
  for (const row of await readAllRows()) {
    if (prefixes.some((p) => row.key.startsWith(p))) saved[row.key] = { en: row.enabled ? row.en : null, enabled: row.enabled };
  }
  return <CmsProvider saved={saved}>{children}</CmsProvider>;
}
