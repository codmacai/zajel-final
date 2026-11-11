import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronRight, Clock, Tag } from 'lucide-react';
import { ZajelBird } from '@/components/cms/admin/Brand';
import { isSafeImage } from '@/lib/cms/content';
import { SITE } from '@/lib/seo';
import type { NewsArticle, NewsBlock, NewsPageContent } from './data';
import NewsDate from './date';
import { readMinutes } from './format';
import ReadingProgress from './progress';
import ShareBar from './share';
import TableOfContents, { type TocItem } from './toc';

/** An address for each heading, so the contents list can link to it. */
const headingId = (text: string, i: number) =>
  `${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48) || 'section'}-${i}`;

/** One part of the article body. Empty blocks are left out. */
function Block({ block, index, first }: { block: NewsBlock; index: number; first: boolean }) {
  switch (block.type) {
    case 'Heading':
      return block.text.trim() ? (
        <h2
          id={headingId(block.text, index)}
          className="scroll-mt-32 pt-8 text-[1.5rem] font-medium leading-[1.25] tracking-[-0.015em] text-[#0b2e1b] sm:text-[1.75rem]"
        >
          {block.text}
        </h2>
      ) : null;
    case 'Quote':
      return block.text.trim() ? (
        <figure className="relative my-10 border-s-[3px] border-[#36B936] ps-6 sm:ps-8">
          <svg aria-hidden="true" width="28" height="22" viewBox="0 0 28 22" className="mb-4 text-[#36B936]/80" fill="currentColor">
            <path d="M0 22V13.2C0 9.47 .87 6.47 2.6 4.2 4.4 1.93 7.07.53 10.6 0l1.2 3.4C9.67 4 8.07 5.13 7 6.8c-1 1.6-1.47 3.27-1.4 5h5.6V22H0zm16.2 0V13.2c0-3.73.87-6.73 2.6-9 1.8-2.27 4.47-3.67 8-4.2L28 3.4c-2.13.6-3.73 1.73-4.8 3.4-1 1.6-1.47 3.27-1.4 5h5.6V22H16.2z" />
          </svg>
          <blockquote className="text-[1.375rem] font-light leading-[1.45] tracking-[-0.01em] text-[#0b2e1b] sm:text-[1.625rem]">
            <p>{block.text}</p>
          </blockquote>
        </figure>
      ) : null;
    case 'Bullet list': {
      const items = block.items.filter((i) => i.trim());
      return items.length ? (
        <ul className="my-2 grid gap-3 rounded-[1.25rem] border border-[#1b4332]/[0.08] bg-[#F6FAF7] p-5 sm:p-7">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3.5 text-[16px] leading-[1.65] text-[#24402f] sm:text-[17px]">
              <span className="mt-[0.28em] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#36B936]">
                <Check aria-hidden="true" className="h-3 w-3 text-white" strokeWidth={3} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null;
    }
    case 'Image':
      return block.image && isSafeImage(block.image) ? (
        // Photos run a little wider than the text on large screens.
        <figure className="my-10 lg:-mx-14">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.25rem] bg-[#1b4332]/5 sm:rounded-[1.5rem]">
            <Image src={block.image} alt={block.caption} fill sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" />
          </div>
          {block.caption.trim() && (
            <figcaption className="mx-auto mt-3.5 max-w-[680px] text-center text-[13px] leading-relaxed text-[#1b4332]/55">{block.caption}</figcaption>
          )}
        </figure>
      ) : null;
    default:
      return block.text.trim() ? (
        <p
          className={
            first
              ? 'text-[19px] leading-[1.7] text-[#0b2e1b] sm:text-[21px] sm:leading-[1.65]'
              : 'text-[16.5px] leading-[1.85] text-[#33503f] sm:text-[17.5px]'
          }
        >
          {block.text}
        </p>
      ) : null;
  }
}

function MoreCard({ article }: { article: NewsArticle }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-[#1b4332]/[0.08] bg-white transition-shadow duration-300 hover:shadow-[0_20px_50px_-20px_rgba(6,68,35,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#36B936]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1b4332]/5">
        {isSafeImage(article.image) && (
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2 text-[12px] font-medium text-[#1b4332]/55">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: article.accent }} />
          <span>{article.category}</span>
          <span aria-hidden="true">·</span>
          <NewsDate iso={article.date} short />
        </div>
        <h3 className="mt-2.5 text-[17px] font-medium leading-snug tracking-tight text-[#0b2e1b] transition-colors group-hover:text-[#2ea22e]">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-[#1b4332]/60">{article.excerpt}</p>
      </div>
    </Link>
  );
}

/** A full news article. Server component; the progress bar, contents and share buttons are small client parts. */
export default function NewsArticleView({ article, more, page }: { article: NewsArticle; more: NewsArticle[]; page: NewsPageContent }) {
  const firstText = article.body.findIndex((b) => b.type === 'Paragraph' && b.text.trim());
  const toc: TocItem[] = article.body.flatMap((b, i) => (b.type === 'Heading' && b.text.trim() ? [{ id: headingId(b.text, i), text: b.text }] : []));
  const minutes = readMinutes(article);
  const url = `${SITE.url}/news/${article.slug}`;
  const share = <ShareBar url={url} title={article.title} label={page.shareLabel} copiedLabel={page.copiedLabel} />;

  const details = [
    { icon: CalendarDays, label: page.publishedLabel, value: <NewsDate iso={article.date} /> },
    { icon: Clock, label: page.readingLabel, value: <>{minutes} {page.readTimeLabel}</> },
    { icon: Tag, label: page.topicLabel, value: article.category },
  ];

  return (
    <div className="w-full bg-white font-sans text-[#1b4332]">
      <ReadingProgress target="article-body" />
      <article>
        {/* Header */}
        <header className="relative overflow-hidden bg-gradient-to-b from-[#F2F8F3] to-white pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pt-32">
          <div aria-hidden="true" className="pointer-events-none absolute -right-[12%] -top-[30%] h-[90%] w-[55%] rounded-full bg-[#36B936]/[0.09] blur-[120px]" />
          <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
            <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-1.5 text-[13px] text-[#1b4332]/50 sm:mb-12">
              <Link href="/" className="transition-colors hover:text-[#1b4332]">{page.homeLabel}</Link>
              <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 rtl:rotate-180" />
              <Link href="/#news" className="transition-colors hover:text-[#1b4332]">{page.newsLabel}</Link>
              <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 rtl:rotate-180" />
              <span className="text-[#1b4332]/75">{article.category}</span>
            </nav>

            <div className="max-w-[900px]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#1b4332]/10 bg-white/80 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-[#1b4332]/75 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: article.accent }} />
                {article.category}
              </span>
              <h1 className="mt-6 text-balance text-[2.125rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#0b2e1b] sm:text-[2.875rem] lg:text-[3.5rem]">
                {article.title}
              </h1>
              <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.6] text-[#2d6a4f] sm:text-[19px]">{article.excerpt}</p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-[#1b4332]/10 pt-7">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#064423] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
                  <ZajelBird size={22} color="#36B936" />
                </span>
                <div className="leading-tight">
                  <span className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#1b4332]/45">{page.authorLabel}</span>
                  <span className="mt-1 block text-[14.5px] font-medium text-[#0b2e1b]">{article.author}</span>
                </div>
              </div>
              {details.slice(0, 2).map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1b4332]/10 bg-white">
                    <Icon aria-hidden="true" className="h-[18px] w-[18px] text-[#36B936]" strokeWidth={1.75} />
                  </span>
                  <div className="leading-tight">
                    <span className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#1b4332]/45">{label}</span>
                    <span className="mt-1 block text-[14.5px] font-medium text-[#0b2e1b]">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Cover */}
        {isSafeImage(article.image) && (
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] bg-[#1b4332]/5 shadow-[0_30px_80px_-40px_rgba(6,68,35,0.45)] sm:aspect-[21/10] sm:rounded-[2rem]">
              <Image src={article.image} alt={article.imageAlt} fill priority sizes="(min-width: 1200px) 1136px, 100vw" className="object-cover" />
            </div>
          </div>
        )}

        {/* Body, with the contents on the left and the details on the right on large screens */}
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[200px_minmax(0,680px)_200px] lg:justify-between lg:gap-8 lg:py-20">
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <TableOfContents items={toc} label={page.tocLabel} />
            </div>
          </aside>

          <div id="article-body" className="min-w-0">
            {toc.length > 1 && (
              <details className="group mb-10 rounded-[1.25rem] border border-[#1b4332]/10 bg-[#F6FAF7] px-5 py-4 lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[14px] font-medium text-[#0b2e1b]">
                  {page.tocLabel}
                  <ChevronRight aria-hidden="true" className="h-4 w-4 transition-transform group-open:rotate-90" />
                </summary>
                <ol className="mt-3 space-y-2 border-t border-[#1b4332]/10 pt-3">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="text-[14px] text-[#1b4332]/70 hover:text-[#1b4332]">{t.text}</a>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            <div className="space-y-6">
              {article.body.map((b, i) => (
                <Block key={i} block={b} index={i} first={i === firstText} />
              ))}
            </div>

            {/* Topic, sharing and the author */}
            <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-y border-[#1b4332]/10 py-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#F2F8F3] px-3.5 py-1.5 text-[13px] font-medium text-[#1b4332]/80">
                <Tag aria-hidden="true" className="h-3.5 w-3.5 text-[#36B936]" />
                {article.category}
              </span>
              {share}
            </div>
            <div className="mt-8 flex items-start gap-4 rounded-[1.5rem] bg-[#064423] p-6 sm:p-7">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                <ZajelBird size={24} color="#36B936" />
              </span>
              <div>
                <span className="block text-[11px] font-medium uppercase tracking-[0.12em] text-white/50">{page.authorLabel}</span>
                <span className="mt-1 block text-[17px] font-medium text-white">{article.author}</span>
                <p className="mt-1.5 text-[14px] leading-relaxed text-white/65">{page.authorNote}</p>
              </div>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-32 rounded-[1.25rem] border border-[#1b4332]/10 p-5">
              <dl className="space-y-4">
                {details.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#36B936]" strokeWidth={1.75} />
                    <div>
                      <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#1b4332]/45">{label}</dt>
                      <dd className="mt-1 text-[13.5px] font-medium text-[#0b2e1b]">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <div className="mt-5 border-t border-[#1b4332]/10 pt-5">
                <ShareBar url={url} title={article.title} label={page.shareLabel} copiedLabel={page.copiedLabel} compact />
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* More news */}
      {more.length > 0 && (
        <section className="w-full bg-[#F6FAF7] py-16 sm:py-20" aria-labelledby="more-news">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
            <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
              <h2 id="more-news" className="text-[1.75rem] font-medium tracking-[-0.02em] text-[#0b2e1b] sm:text-[2.25rem]">
                {page.moreLabel}
              </h2>
              <Link href="/#news" className="hidden items-center gap-1.5 text-[14px] font-medium text-[#2ea22e] transition-colors hover:text-[#1b4332] sm:inline-flex">
                {page.backLabel}
                <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
            <div className={`grid gap-6 sm:grid-cols-2 ${more.length >= 3 ? 'lg:grid-cols-3' : ''}`}>
              {more.map((a) => (
                <MoreCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to action */}
      <section className="w-full bg-white px-5 py-16 sm:px-8 sm:py-20">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0A5A2E] via-[#064423] to-[#042B18] px-6 py-14 text-center sm:px-12 sm:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-[360px] w-[360px] rounded-full bg-[#36B936]/20 blur-[110px]" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-16 opacity-[0.08]">
            <ZajelBird size={340} color="#ffffff" />
          </div>
          <div className="relative">
            <h2 className="mx-auto max-w-[22ch] text-[1.75rem] font-medium tracking-[-0.02em] text-white sm:text-[2.25rem]">{page.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-[15px] leading-relaxed text-white/70 sm:text-[16px]">{page.ctaText}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {page.ctaButton && page.ctaHref && (
                <Link
                  href={page.ctaHref}
                  className="inline-flex items-center gap-2 rounded-full bg-[#36B936] px-7 py-3.5 text-[14px] font-medium text-[#0B140F] shadow-md transition-transform hover:scale-[1.03]"
                >
                  {page.ctaButton}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" />
                </Link>
              )}
              {page.ctaSecondaryButton && page.ctaSecondaryHref && (
                <Link
                  href={page.ctaSecondaryHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-white/10"
                >
                  {page.ctaSecondaryButton}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
