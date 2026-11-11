"use client";

import Link from "next/link";
import { useSharedRevealObserver, useReveal } from "@/lib/useReveal";
import "./LatestNews.css";
import { cmsSection, useSection } from "@/components/cms/CmsProvider";
import { NEWS_ARTICLES } from "@/components/news/data";
import NewsDate from "@/components/news/date";
import { byNewest, publishable } from "@/components/news/format";
import { HOME_NEWS, type HomeNewsContent } from "./content";

function ArticleImage({ src, alt, category }: { src: string; alt: string; category: string }) {
  return (
    <div className="ln-img-wrapper">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" className="ln-img" />
      <div aria-hidden="true" className="ln-img-gradient" />
      <span className="ln-img-category">{category}</span>
    </div>
  );
}

/** A preview of the newest three articles; each card opens the full article. */
function LatestNews({ content }: { content: HomeNewsContent }) {
  const { register } = useSharedRevealObserver();
  const { ref: sectionRef, isVisible } = useReveal<HTMLElement>(register);
  const articles = publishable([...(useSection("news.articles", NEWS_ARTICLES)?.articles ?? [])].sort(byNewest)).slice(0, 3);
  if (!articles.length) return null;

  return (
    <section id="news" ref={sectionRef} className={`ln-section ${isVisible ? "is-visible" : ""}`}>
      {/* Masthead */}
      <div className="ln-header">
        <span className="ln-eyebrow">{content.eyebrow}</span>
        <h2 className="ln-heading">{content.heading}</h2>
        <p className="ln-header-desc">{content.description}</p>
      </div>

      {/* Grid container */}
      <div className="ln-grid">
        {articles.map((a, i) => (
          <Link href={`/news/${a.slug}`} className={`ln-card ln-card-delay-${i}`} key={`${a.slug}-${i}`}>
            <div className="ln-card-img-container">
              <ArticleImage src={a.image} alt={a.imageAlt || a.title} category={a.category} />
            </div>
            <div className="ln-card-meta">
              <span className="ln-meta-dot" style={{ background: a.accent }} />
              <span className="ln-meta-text">
                {a.category} · <NewsDate iso={a.date} short />
              </span>
            </div>
            <h3 className="ln-card-title">{a.title}</h3>
            <p className="ln-card-excerpt">{a.excerpt}</p>
            <span className="ln-readmore">{content.readMore}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
export default cmsSection('home.news', HOME_NEWS, LatestNews);
