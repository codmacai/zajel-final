"use client";

import { useSharedRevealObserver, useReveal } from "@/lib/useReveal";
import "./LatestNews.css";

export type Article = {
  date: string;
  category: string;
  title: string;
  excerpt: string;
  href: string;
  accent: string;
  image: string;
};

const articles: Article[] = [
  {
    date: "14 May 2026",
    category: "Global Freight",
    title: "Expanding Air & Sea Trade Corridors Across 500+ Destinations",
    excerpt:
      "Enhancing multimodal freight connectivity between key trade hubs across Asia, Europe, and the Middle East to accelerate transit times for bulk cargo.",
    href: "#",
    accent: "#36B936",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
  },
  {
    date: "28 Feb 2026",
    category: "Customs & Trade",
    title: "Streamlined GCC Cross-Border Clearance Network Launched",
    excerpt:
      "Accelerating border clearance operations through automated documentation workflows and dedicated customs brokerage hubs across regional gateways.",
    href: "#",
    accent: "#5FD37A",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80",
  },
  {
    date: "12 Nov 2025",
    category: "Smart Warehousing",
    title: "Next-Generation Fulfillment Center Operational in Dubai",
    excerpt:
      "Opening high-capacity, climate-controlled fulfillment facilities equipped with automated inventory sorting to power seamless e-commerce distribution.",
    href: "#",
    accent: "#7FD79A",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80",
  },
];

function ArticleImage({ src, alt, category }: { src: string; alt: string; category: string }) {
  return (
    <div className="ln-img-wrapper">
      <img src={src} alt={alt} loading="lazy" className="ln-img" />
      <div aria-hidden="true" className="ln-img-gradient" />
      <span className="ln-img-category">{category}</span>
    </div>
  );
}

export default function LatestNews() {
  const { register } = useSharedRevealObserver();
  const { ref: sectionRef, isVisible } = useReveal<HTMLElement>(register);

  return (
    <section id="news" ref={sectionRef} className={`ln-section ${isVisible ? "is-visible" : ""}`}>
      {/* Masthead */}
      <div className="ln-header">
        <span className="ln-eyebrow">Newsroom</span>
        <h2 className="ln-heading">Latest news</h2>
        <p className="ln-header-desc">Global logistics, freight forwarding, and supply chain briefings.</p>
      </div>

      {/* Grid container */}
      <div className="ln-grid">
        {articles.map((a, i) => (
          <a href={a.href} className={`ln-card ln-card-delay-${i}`} key={a.title}>
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
            <span className="ln-readmore">Read more</span>
          </a>
        ))}
      </div>
    </section>
  );
}