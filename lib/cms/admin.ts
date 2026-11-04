// What the admin shows for each section: its current content, its Arabic and its status.
// Server only.

import AR_JSON from '@/locales/ar.json';
import { getAt, mergeContent, normText, toPlain, type ArabicMap, type Plain } from './content';
import { translatablePaths } from './fields';
import { allSections, findSection, PAGES, sectionKey, type PageDef, type SectionDef } from './registry';
import { readRowsFresh, type CmsRow } from './store';

const AR = AR_JSON as Record<string, string>;

/** The site's existing Arabic for an English text (same matching as the site translator). */
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
  /** Built-in content (what "Reset to original" goes back to). */
  original: Plain;
  /** Content shown on the site now. */
  current: Plain;
  /** Arabic for each translatable field of `current`, filled in from the site's translations. */
  arabic: ArabicMap;
  originalArabic: ArabicMap;
  enabled: boolean;
  edited: boolean;
  updatedAt: string | null;
  updatedBy: string | null;
  /** Translatable fields with English but no Arabic. */
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

/** Status of every section (one database read). */
export async function allStatuses(): Promise<SectionStatus[]> {
  const rows = new Map((await readRowsFresh()).map((r) => [r.key, r]));
  return allSections().map(({ page, section, key }) => buildStatus(page, section, rows.get(key)));
}

/** The sidebar: pages by group, with how many sections still need Arabic. */
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
