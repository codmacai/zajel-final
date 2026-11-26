export const PAGES_KEY = 'global.pages';

export interface PageVisibility {
  pages: string[];
  paths: string[];
}

export const NONE_HIDDEN: PageVisibility = { pages: [], paths: [] };

export const canHide = (path: string | null | undefined) => !!path && path.startsWith('/') && path !== '/' && !path.includes('#');

export function parseVisibility(en: unknown): PageVisibility {
  const o = (en && typeof en === 'object' ? en : {}) as Record<string, unknown>;
  const strings = (v: unknown) => (Array.isArray(v) ? v.filter((s): s is string => typeof s === 'string') : []);
  return { pages: strings(o.pages), paths: strings(o.paths).filter(canHide) };
}

export function linksToHidden(href: string | undefined, paths: string[]): boolean {
  if (!href || !href.startsWith('/') || !paths.length) return false;
  const path = href.split(/[?#]/)[0].replace(/\/+$/, '').toLowerCase() || '/';
  return paths.some((p) => path === p.toLowerCase() || path.startsWith(`${p.toLowerCase()}/`));
}
