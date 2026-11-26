import { cache } from 'react';
import AR_JSON from '@/locales/ar.json';
import { getAt, mergeContent, normText, toPlain, type ArabicMap, type Plain } from './content';
import { translatablePaths } from './fields';
import { allSections, findSection, PAGES, sectionKey, type PageDef, type SectionDef } from './registry';
import { readRowsFresh, type CmsRow } from './store';
import { PAGES_KEY, parseVisibility } from './visibility';

const freshRows = cache(() => readRowsFresh());

export const hiddenPageIds = cache(async (): Promise<string[]> =>
  parseVisibility((await freshRows().catch(() => [])).find((r) => r.key === PAGES_KEY)?.en).pages,
);

const AR = AR_JSON as Record<string, string>;

export function lookupArabic(en: string): string {
  const k = normText(en);
  if (!k) return '';
  if (AR[k]) return AR[k];
  const m = k.match(/^(.*?)(\s*[:*…]+)$/);
  if (m && AR[m[1]]) return AR[m[1]] + m[2];
  return '';
}

export interface SectionStatus {
  key: string;
  page: PageDef;
  section: SectionDef;
  original: Plain;
  current: Plain;
  arabic: ArabicMap;
  originalArabic: ArabicMap;
  enabled: boolean;
  edited: boolean;
  updatedAt: string | null;
  updatedBy: string | null;
  missingArabic: number;
  summary: string;
}

function arabicFor(content: Plain, section: SectionDef, saved?: ArabicMap): ArabicMap {
  const out: ArabicMap = {};
  for (const path of translatablePaths(content, section.hints)) {
    const en = getAt(content, path);
    if (typeof en !== 'string' || !en.trim()) continue;
    const ar = saved && path in saved ? saved[path] : lookupArabic(en);
    if (ar) out[path] = ar;
  }
  return out;
}

function countMissing(content: Plain, section: SectionDef, arabic: ArabicMap): number {
  return translatablePaths(content, section.hints).filter((p) => {
    const en = getAt(content, p);
    return typeof en === 'string' && en.trim() && !arabic[p]?.trim();
  }).length;
}

function firstText(content: Plain, section: SectionDef): string {
  for (const p of translatablePaths(content, section.hints)) {
    const v = getAt(content, p);
    if (typeof v === 'string' && v.trim().length > 2) return v.length > 90 ? `${v.slice(0, 88)}…` : v;
  }
  return '';
}

function buildStatus(page: PageDef, section: SectionDef, row?: CmsRow): SectionStatus {
  const original = (toPlain(section.defaults) ?? {}) as Plain;
  const current = (row ? toPlain(mergeContent(section.defaults, row.en)) : original) as Plain;
  const arabic = arabicFor(current, section, row?.ar);
  return {
    key: sectionKey(page.id, section.id),
    page,
    section,
    original,
    current,
    arabic,
    originalArabic: arabicFor(original, section),
    enabled: row?.enabled ?? true,
    edited: Boolean(row),
    updatedAt: row?.updated_at ?? null,
    updatedBy: row?.updated_by ?? null,
    missingArabic: countMissing(current, section, arabic),
    summary: firstText(current, section),
  };
}

export async function sectionStatus(key: string): Promise<SectionStatus | null> {
  const found = findSection(key);
  if (!found) return null;
  const [row] = await readRowsFresh([key]);
  return buildStatus(found.page, found.section, row);
}

export const allStatuses = cache(async (): Promise<SectionStatus[]> => {
  const rows = new Map((await freshRows()).map((r) => [r.key, r]));
  return allSections().map(({ page, section, key }) => buildStatus(page, section, rows.get(key)));
});

export function navFrom(statuses: SectionStatus[]) {
  return PAGES.map((p) => ({
    id: p.id,
    label: p.label,
    path: p.path,
    group: p.group,
    missingArabic: statuses.filter((s) => s.page.id === p.id).reduce((n, s) => n + s.missingArabic, 0),
    sections: p.sections.map((s) => ({ id: s.id, label: s.label })),
  }));
}
export type NavPage = ReturnType<typeof navFrom>[number];
