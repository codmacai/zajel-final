// Every page and section the CMS can edit, in the order they appear on the site.
// To make a new section editable: give its component built-in content (see components/home/
// content.ts for examples), connect it with cmsSection()/getSection(), and list it here.

import type { Hints } from './fields';
import { PAGE_SEO, type PageSeoContent } from './seo';
import { HOME } from './pages/home';

export type PageGroup = 'Site-wide' | 'Main' | 'Solutions' | 'Services' | 'Secure' | 'Company' | 'Help';

export interface SectionDef {
  /** Unique within the page; the CMS key is `${page}.${id}`. */
  id: string;
  label: string;
  defaults: unknown;
  hints?: Hints;
  /** Shown under the section name in the admin, e.g. what it is or where it appears. */
  note?: string;
}

export interface PageDef {
  id: string;
  label: string;
  /** Address on the site, or null for site-wide content. */
  path: string | null;
  group: PageGroup;
  sections: SectionDef[];
}

export const GROUPS: PageGroup[] = ['Site-wide', 'Main', 'Solutions', 'Services', 'Secure', 'Company', 'Help'];

const SEO_HINTS: Hints = {
  title: { label: 'Page title', help: 'Shown in Google results and the browser tab. " | Zajel" is added automatically.' },
  description: { label: 'Description', help: 'Shown under the title in Google. Aim for 120–160 characters.', kind: 'textarea' },
};

function withSeo(page: PageDef): PageDef {
  const seo = PAGE_SEO[page.id] as PageSeoContent | undefined;
  if (!seo) return page;
  return {
    ...page,
    sections: [
      ...page.sections,
      { id: 'seo', label: 'Google title & description', defaults: seo, hints: SEO_HINTS, note: 'How this page appears in search results' },
    ],
  };
}

export const PAGES: PageDef[] = [HOME].map(withSeo);

export const sectionKey = (page: string, section: string) => `${page}.${section}`;

export function findPage(id: string): PageDef | undefined {
  return PAGES.find((p) => p.id === id);
}

export function findSection(key: string): { page: PageDef; section: SectionDef } | undefined {
  const dot = key.indexOf('.');
  const page = findPage(key.slice(0, dot));
  const section = page?.sections.find((s) => s.id === key.slice(dot + 1));
  return page && section ? { page, section } : undefined;
}

export const allSections = () => PAGES.flatMap((page) => page.sections.map((section) => ({ page, section, key: sectionKey(page.id, section.id) })));
