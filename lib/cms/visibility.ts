// Pages switched off in the CMS (each page's screen → "Page on the website").
// A switched-off page answers "page not found", leaves the sitemap, and links to it are
// taken out of the menu and footer. Stored as one CMS row, so the site reads it with the rest.

export const PAGES_KEY = 'global.pages';

export interface PageVisibility {
  /** Page ids, e.g. "careers". */
  pages: string[];
  /** Their addresses, e.g. "/careers", for hiding links. */
  paths: string[];
}

export const NONE_HIDDEN: PageVisibility = { pages: [], paths: [] };

/** Pages that can be switched off: real pages, not the home page or site-wide parts. */
export const canHide = (path: string | null | undefined) => !!path && path.startsWith('/') && path !== '/' && !path.includes('#');

/** Reads the stored row safely (anything unexpected counts as nothing hidden). */
export function parseVisibility(en: unknown): PageVisibility {
  const o = (en && typeof en === 'object' ? en : {}) as Record<string, unknown>;
  const strings = (v: unknown) => (Array.isArray(v) ? v.filter((s): s is string => typeof s === 'string') : []);
  return { pages: strings(o.pages), paths: strings(o.paths).filter(canHide) };
}

/** Whether a link goes to a switched-off page, or to a page under it (e.g. /events/…). */
export function linksToHidden(href: string | undefined, paths: string[]): boolean {
  if (!href || !href.startsWith('/') || !paths.length) return false;
  const path = href.split(/[?#]/)[0].replace(/\/+$/, '').toLowerCase() || '/';
  return paths.some((p) => path === p.toLowerCase() || path.startsWith(`${p.toLowerCase()}/`));
}
