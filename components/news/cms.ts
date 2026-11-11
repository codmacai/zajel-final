// News articles with any CMS edits (News → Articles). Server only.
import { getSection } from '@/lib/cms/server';
import { NEWS_ARTICLES, NEWS_PAGE, type NewsArticle } from './data';
import { byNewest, publishable } from './format';

export async function getArticles(): Promise<NewsArticle[]> {
  return publishable([...((await getSection('news.articles', NEWS_ARTICLES))?.articles ?? [])].sort(byNewest));
}

export async function findArticle(slug: string): Promise<NewsArticle | undefined> {
  return (await getArticles()).find((a) => a.slug === slug);
}

export async function getNewsPage() {
  return (await getSection('news.page', NEWS_PAGE)) ?? NEWS_PAGE;
}
