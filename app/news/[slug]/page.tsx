import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata, SITE } from '@/lib/seo';
import NewsArticleView from '@/components/news/article';
import { findArticle, getArticles, getNewsPage } from '@/components/news/cms';

const absolute = (src: string) => (/^https?:/.test(src) ? src : `${SITE.url}${src}`);

// Every article page is built ahead of time; articles added later in the CMS are built on first visit.
export async function generateStaticParams() {
  return (await getArticles()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = await findArticle((await params).slug);
  if (!article) return {};
  const meta = pageMetadata({ title: article.title, description: article.excerpt, path: `/news/${article.slug}` });
  // Link previews (WhatsApp, LinkedIn, X) show the article's own cover photo.
  const image = { url: absolute(article.image), alt: article.imageAlt };
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: 'article', publishedTime: article.date, images: [image] },
    twitter: { ...meta.twitter, images: [image.url] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [articles, page] = await Promise.all([getArticles(), getNewsPage()]);
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  // Article structured data (lets Google show the date and image in results)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: [absolute(article.image)],
    datePublished: article.date,
    author: { '@type': 'Organization', name: article.author || SITE.name, url: SITE.url },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url, logo: { '@type': 'ImageObject', url: absolute(SITE.logo) } },
    mainEntityOfPage: `${SITE.url}/news/${article.slug}`,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        // `<` escaped so text can never close the script tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <NewsArticleView article={article} more={articles.filter((a) => a.slug !== article.slug).slice(0, 3)} page={page} />
    </main>
  );
}
