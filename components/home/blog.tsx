"use client";

import { useSharedRevealObserver, useReveal } from "@/lib/useReveal";
import "./LatestNews.css";
import { cmsSection } from "@/components/cms/CmsProvider";
import { HOME_NEWS, type HomeNewsContent } from "./content";



function ArticleImage({ src, alt, category }: { src: string; alt: string; category: string }) {
  return (
    <div className="ln-img-wrapper">
      <img src={src} alt={alt} loading="lazy" className="ln-img" />
      <div aria-hidden="true" className="ln-img-gradient" />
      <span className="ln-img-category">{category}</span>
    </div>
  );
}

function LatestNews({ content }: { content: HomeNewsContent }) {
  const { register } = useSharedRevealObserver();
  const { ref: sectionRef, isVisible } = useReveal<HTMLElement>(register);

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
        {content.articles.map((a, i) => (
          <a href={a.href} className={`ln-card ln-card-delay-${i}`} key={`${a.title}-${i}`}>
            <div className="ln-card-img-container">
              <ArticleImage src={a.image} alt={a.title} category={a.category} />
            </div>
            <div className="ln-card-meta">
              <span className="ln-meta-dot" style={{ background: a.accent }} />
              <span className="ln-meta-text">
                {a.category} · {a.date}
              </span>
            </div>
            <h3 className="ln-card-title">{a.title}</h3>
            <p className="ln-card-excerpt">{a.excerpt}</p>
            <span className="ln-readmore">{content.readMore}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
export default cmsSection('home.news', HOME_NEWS, LatestNews);
