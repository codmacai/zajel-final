import type { NewsArticle } from './data';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** [day, month, year], e.g. ["14", "May", "2026"], or "Feb" style when short. Parsed as UTC so the day never shifts. */
export function newsDateParts(iso: string, short = false): [string, string, string] | null {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  const month = MONTHS[d.getUTCMonth()];
  return [String(d.getUTCDate()), short ? month.slice(0, 3) : month, String(d.getUTCFullYear())];
}

/** "14 May 2026". */
export function newsDate(iso: string): string {
  return newsDateParts(iso)?.join(' ') ?? iso;
}

/** Minutes to read the article, at about 200 words a minute. */
export function readMinutes(a: NewsArticle): number {
  const words = [a.title, a.excerpt, ...a.body.flatMap((b) => [b.text, b.caption, ...b.items])].join(' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** Shown on the site only with a title and a valid page address (and each address once). */
export function publishable(articles: NewsArticle[]): NewsArticle[] {
  const seen = new Set<string>();
  return articles.filter((a) => {
    if (!a.title?.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug) || seen.has(a.slug)) return false;
    seen.add(a.slug);
    return true;
  });
}

/** Newest first. */
export const byNewest = (a: NewsArticle, b: NewsArticle) => b.date.localeCompare(a.date);
