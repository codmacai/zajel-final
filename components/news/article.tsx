import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { typo } from '@/components/ui copy/typography';
import { ZajelBird } from '@/components/cms/admin/Brand';
import { isSafeImage } from '@/lib/cms/content';
import { SITE } from '@/lib/seo';
import type { NewsArticle, NewsBlock, NewsPageContent } from './data';
import NewsDate from './date';
import { readMinutes } from './format';
import ShareBar from './share';

/** One part of the article body. Empty blocks are left out. */
function Block({ block, first }: { block: NewsBlock; first: boolean }) {
  switch (block.type) {
    case 'Heading':
      return block.text.trim() ? (
        <h2 className="pt-6 text-[1.375rem] font-medium leading-snug tracking-tight text-[#1b4332] sm:text-[1.625rem]">{block.text}</h2>
      ) : null;
    case 'Quote':
      return block.text.trim() ? (
        <blockquote className="relative my-4 rounded-[1.5rem] bg-[#F3F8F4] px-6 py-7 sm:px-10 sm:py-9">
          <span aria-hidden="true" className="absolute -top-3 start-6 font-serif text-[64px] leading-none text-[#36B936] sm:start-10">
            “
          </span>
          <p className="text-[1.2rem] font-light leading-[1.5] tracking-tight text-[#1b4332] sm:text-[1.45rem]">{block.text}</p>
        </blockquote>
      ) : null;
    case 'Bullet list': {
      const items = block.items.filter((i) => i.trim());
      return items.length ? (
        <ul className="space-y-3.5 py-1">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3.5 text-[16px] leading-[1.7] text-[#2d4a3a] sm:text-[17px]">
              <span className="mt-[0.3em] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#36B936]/15">
                <Check aria-hidden="true" className="h-3 w-3 text-[#2ea22e]" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null;
    }
    case 'Image':
      return block.image && isSafeImage(block.image) ? (
        <figure className="my-6">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.25rem] bg-[#1b4332]/5 sm:rounded-[1.5rem]">
            <Image src={block.image} alt={block.caption} fill sizes="(min-width: 800px) 720px, 100vw" className="object-cover" />
          </div>
          {block.caption.trim() && <figcaption className="mt-3 text-[13px] leading-relaxed text-[#1b4332]/55">{block.caption}</figcaption>}
        </figure>
      ) : null;
    default:
      return block.text.trim() ? (
        <p className={first ? 'text-[18px] leading-[1.7] text-[#1b4332] sm:text-[20px]' : 'text-[16px] leading-[1.8] text-[#2d4a3a] sm:text-[17px]'}>
          {block.text}
        </p>
      ) : null;
  }
}

function MoreCard({ article }: { article: NewsArticle }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex flex-col rounded-[1.5rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#36B936]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.25rem] bg-[#1b4332]/5">
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
      <div className="mt-4 flex items-center gap-2 text-[12px] font-medium text-[#1b4332]/55">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: article.accent }} />
        <span>{article.category}</span>
        <span aria-hidden="true">·</span>
        <NewsDate iso={article.date} />
      </div>
      <h3 className="mt-2 text-[17px] font-medium leading-snug tracking-tight text-[#1b4332] transition-colors group-hover:text-[#2ea22e]">
        {article.title}
      </h3>
    </Link>
  );
}

/** A full news article. Server component; only the share buttons ship client JS. */
export default function NewsArticleView({ article, more, page }: { article: NewsArticle; more: NewsArticle[]; page: NewsPageContent }) {
  const firstText = article.body.findIndex((b) => b.type === 'Paragraph' && b.text.trim());

  return (
    <div className="w-full bg-white font-sans text-[#1b4332]">
      <article>
        {/* Header */}
        <header className="relative overflow-hidden pb-10 pt-24 sm:pb-12 sm:pt-28 lg:pt-32">
          <div aria-hidden="true" className="pointer-events-none absolute -right-[10%] -top-[20%] h-[80%] w-[55%] rounded-full bg-[#36B936]/10 blur-[120px]" />
          <div className="relative mx-auto max-w-[860px] px-5 sm:px-8">
            <Link
              href="/#news"
              className="mb-8 inline-flex items-center gap-2 text-[13px] font-medium text-[#1b4332]/60 transition-colors hover:text-[#1b4332] sm:mb-10"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
              {page.backLabel}
            </Link>

            <div className="mb-5 flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full" style={{ background: article.accent }} />
              <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#1b4332]/70">{article.category}</span>
            </div>

            <h1 className={`${typo.h1Long} text-[#1b4332]`}>{article.title}</h1>
            <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-[#2d6a4f] sm:mt-6 sm:text-[18px]">{article.excerpt}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-[#1b4332]/10 pt-6 text-[13px] text-[#1b4332]/60">
              <span className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#064423]">
                  <ZajelBird size={20} color="#36B936" />
                </span>
                <span>
                  {page.byLabel} <span className="font-medium text-[#1b4332]">{article.author}</span>
                </span>
              </span>
              <span aria-hidden="true" className="text-[#1b4332]/25">•</span>
              <NewsDate iso={article.date} />
              <span aria-hidden="true" className="text-[#1b4332]/25">•</span>
              <span>
                {readMinutes(article)} {page.readTimeLabel}
              </span>
            </div>
          </div>
        </header>

        {/* Cover */}
        {isSafeImage(article.image) && (
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] bg-[#1b4332]/5 sm:aspect-[2/1] sm:rounded-[2rem]">
              <Image src={article.image} alt={article.imageAlt} fill priority sizes="(min-width: 1200px) 1136px, 100vw" className="object-cover" />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="mx-auto max-w-[760px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
          <div className="space-y-6">
            {article.body.map((b, i) => (
              <Block key={i} block={b} first={i === firstText} />
            ))}
          </div>
          <div className="mt-12 border-t border-[#1b4332]/10 pt-8 sm:mt-16">
            <ShareBar url={`${SITE.url}/news/${article.slug}`} title={article.title} label={page.shareLabel} copiedLabel={page.copiedLabel} />
          </div>
        </div>
      </article>

      {/* More news */}
      {more.length > 0 && (
        <section className="w-full bg-[#F7FAF8] py-14 sm:py-20" aria-labelledby="more-news">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
            <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
              <h2 id="more-news" className={`${typo.h2} text-[#1b4332]`}>
                {page.moreLabel}
              </h2>
              <Link href="/#news" className="hidden items-center gap-1.5 text-[14px] font-medium text-[#2ea22e] hover:text-[#1b4332] sm:inline-flex">
                {page.backLabel}
                <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
            <div className={`grid gap-8 sm:grid-cols-2 ${more.length >= 3 ? 'lg:grid-cols-3' : ''}`}>
              {more.map((a) => (
                <MoreCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to action */}
      <section className="w-full bg-white px-5 py-14 sm:px-8 sm:py-20">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0A5A2E] via-[#064423] to-[#042B18] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-[360px] w-[360px] rounded-full bg-[#36B936]/20 blur-[110px]" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-16 opacity-[0.08]">
            <ZajelBird size={340} color="#ffffff" />
          </div>
          <div className="relative">
            <h2 className={`${typo.h2} mx-auto max-w-[22ch] text-white`}>{page.ctaTitle}</h2>
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
