import type { NewsArticle } from './data';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function newsDateParts(iso: string, short = false): [string, string, string] | null {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  const month = MONTHS[d.getUTCMonth()];
  return [String(d.getUTCDate()), short ? month.slice(0, 3) : month, String(d.getUTCFullYear())];
}

export function newsDate(iso: string): string {
  return newsDateParts(iso)?.join(' ') ?? iso;
}

export function readMinutes(a: NewsArticle): number {
  const words = [a.title, a.excerpt, ...a.body.flatMap((b) => [b.text, b.caption, ...b.items])].join(' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function publishable(articles: NewsArticle[]): NewsArticle[] {
  const seen = new Set<string>();
  return articles.filter((a) => {
    if (!a.title?.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug) || seen.has(a.slug)) return false;
    seen.add(a.slug);
    return true;
  });
}

export const byNewest = (a: NewsArticle, b: NewsArticle) => b.date.localeCompare(a.date);
