"use client";

import Image from "next/image";
import { useSharedRevealObserver, useReveal } from "@/lib/useReveal";
import { whyChooseUsContent as content } from "@/data/whyChooseUs";
import "./WhyChooseUs.css";

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

export default function WhyChooseUs() {
  const { register } = useSharedRevealObserver();
  const { ref: sectionRef, isVisible } = useReveal<HTMLElement>(register);

  return (
    <section ref={sectionRef} className="wcz-section">
      <div className="wcz-container">
        {/* Section Header */}
        <div className={cx("wcz-header", isVisible && "is-visible")}>
          <span className="wcz-eyebrow">
            {content.eyebrow}
          </span>
          <h2 className="wcz-heading">
            {content.heading}
          </h2>
          <p className="wcz-header-desc">
            {content.description}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="wcz-grid">
          {/* Tracking Card */}
          <div className={`wcz-card wcz-card-tracking wcz-delay-0 ${isVisible ? "is-visible" : ""}`}>
            <div className="wcz-tracking-inner">
              <div className="wcz-tracking-text">
                <div className="wcz-live-badge">
                  <span className="wcz-live-dot" aria-hidden="true" />
                  <span className="wcz-live-text">{content.tracking.badgeText}</span>
                </div>
                <h3 className="wcz-card-title">{content.tracking.title}</h3>
                <p className="wcz-card-desc">{content.tracking.description}</p>
              </div>

              <div className="wcz-tracking-phone" aria-hidden="true">
                <Image
                  src="/Homepage/whychooseus/track.png"
                  alt=""
                  fill
                  sizes="(max-width: 767px) 90vw, 400px"
                  className={`wcz-phone-img ${isVisible ? "wcz-phone-in" : ""}`}
                />
              </div>
            </div>
          </div>

          {/* Reach Card */}
          <div className={`wcz-card wcz-card-reach wcz-delay-1 ${isVisible ? "is-visible" : ""}`}>
            <div className="wcz-reach-map">
              <Image
                src="/Homepage/whychooseus/ChatGPT Image Aug 4, 2026, 01_04_26 PM (1).png"
                alt="International shipping network map"
                fill
                sizes="(max-width: 1023px) 100vw, 40vw"
                className="wcz-reach-map-base"
              />
              <Image
                src="/Homepage/whychooseus/ChatGPT Image Aug 4, 2026, 11_27_44 AM (1).png"
                alt="Map of Zajel delivery coverage across the UAE"
                fill
                sizes="(max-width: 1023px) 100vw, 40vw"
                className="wcz-reach-map-overlay"
              />
            </div>
            <div className="wcz-reach-icon-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 12H21" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M12 3C14.5 5.5 15.75 8.5 15.75 12C15.75 15.5 14.5 18.5 12 21C9.5 18.5 8.25 15.5 8.25 12C8.25 8.5 9.5 5.5 12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <h3 className="wcz-card-title">International Reach</h3>
            <p className="wcz-card-desc">Nationwide coverage across every emirate.</p>
          </div>

          {/* Experience Card */}
          <div className={`wcz-card wcz-card-experience wcz-delay-2 ${isVisible ? "is-visible" : ""}`}>
            <div className="wcz-exp-content-box">
              <div className="wcz-exp-main-title">
                17
                <span>+</span>
              </div>
              <div className="wcz-exp-subheading">{content.experience.title}</div>
              <p className="wcz-exp-description">{content.experience.description}</p>
            </div>
          </div>

          {/* Shipments Card */}
          <div className={`wcz-card wcz-card-shipments rtl-keep-layout wcz-delay-3 ${isVisible ? "is-visible" : ""}`}>
            <div className="wcz-ship-pattern" aria-hidden="true" />
            <div className="wcz-ship-icon-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 7.5L12 12M12 12L20 7.5M12 12V21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="wcz-ship-content rtl-copy">
              <div className="wcz-ship-value">
                60M
                <span>+</span>
              </div>
              <div className="wcz-ship-label">{content.shipments.title}</div>
            </div>
            <div className="wcz-ship-illustration" aria-hidden="true">
              <Image src="/Homepage/whychooseus/magnific_photo-a-person-wearing-gr_nVaG47XYQD.webp" alt="" fill sizes="320px" />
            </div>
          </div>

          {/* Government Card */}
          <div className={`wcz-card wcz-card-government wcz-delay-4 ${isVisible ? "is-visible" : ""}`}>
            <h3 className="wcz-card-title">{content.government.title}</h3>
            <p className="wcz-card-desc">{content.government.description}</p>
            <div className="wcz-gov-image">
              <Image
                src={content.government.imageUrl}
                alt={content.government.imageAlt}
                fill
                sizes="180px"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Destinations Card */}
          <div className={`wcz-card wcz-card-destinations wcz-delay-5 ${isVisible ? "is-visible" : ""}`}>
            <div className="wcz-dest-icon-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="wcz-dest-content">
              <div className="wcz-dest-value">
                500
                <span>+</span>
              </div>
              <div className="wcz-dest-label">Worldwide Destinations</div>
            </div>
          </div>

          {/* Countries Served Card */}
          <div className={`wcz-card wcz-card-new wcz-delay-6 ${isVisible ? "is-visible" : ""}`}>
            {/* Premium badge: gradient tile + verified-seal check */}
            <div className="wcz-dest-icon-badge wcz-dest-icon-badge--premium" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m9 12 2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="wcz-dest-value">
              195
            </div>
            <div className="wcz-dest-label">Countries Served</div>
          </div>
        </div>
      </div>
    </section>
  );
}