"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useSharedRevealObserver, useReveal } from "@/lib/useReveal";
import "./CertificationsGrid.css";
import { cmsSection } from "@/components/cms/CmsProvider";
import { HOME_CERTIFICATIONS, type HomeCertificationsContent } from "./content";


function CertificationsGrid({ content }: { content: HomeCertificationsContent }) {
  const { register } = useSharedRevealObserver();
  const { ref: sectionRef, isVisible } = useReveal<HTMLElement>(register);

  return (
    <section ref={sectionRef} className={`cg-section ${isVisible ? "is-visible" : ""}`}>
      <div className="cg-container">
        {/* Header */}
        <div className="cg-header">
          <span className="cg-eyebrow">{content.eyebrow}</span>
          <h2 className="cg-heading">{content.heading}</h2>
        </div>

        {/* 3x2 grid, 3 columns on every device */}
        <div className="cg-grid">
          {content.logos.map((item, index) => (
            <Link
              href={content.linkHref}
              key={item.id}
              className={`cg-cell cg-delay-${index}`}
              aria-label={item.name}
            >
              <div className="cg-logo-wrapper">
                <img
                  src={item.logo}
                  alt={`${item.name} certification`}
                  className="cg-logo-img"
                  loading="lazy"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Link below the grid */}
        <div className="cg-footer cg-delay-6">
          <Link href={content.linkHref} className="cg-link">
            <span>{content.linkLabel}</span>
            <ArrowUpRight className="cg-link-icon" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default cmsSection('home.certifications', HOME_CERTIFICATIONS, CertificationsGrid);
