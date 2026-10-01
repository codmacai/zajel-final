'use client';

import { useEffect, useRef, useState } from 'react';

interface SeaFreightBannerProps {
  imageSrc: string;
  imageAlt: string;
  heading?: string;
  description?: string;
  projectLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const SeaFreightBanner = ({
  imageSrc,
  imageAlt,
  heading = 'Full container loads, moved with precision',
  description = "From FCL and LCL shipments to breakbulk and roll-on roll-off cargo, our sea freight network connects major ports worldwide, backed by reliable schedules and end-to-end documentation support.",
  projectLabel = 'Jebel Ali to Rotterdam Route',
  ctaLabel = 'Explore project',
  ctaHref = '/sea-freight',
}: SeaFreightBannerProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="w-full bg-white py-10 sm:py-16 lg:py-20"
      style={{ fontFamily: "'Manrope', system-ui, -apple-system, sans-serif" }}
    >
      <div
        ref={sectionRef}
        className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10"
      >
        {/* Section heading — centered, top */}
        <div className="mx-auto mb-8 sm:mb-12 max-w-3xl text-center px-2">
          <div className="mb-3 sm:mb-4 flex items-center justify-center gap-3">
            <h3
              className="font-medium text-xs sm:text-sm tracking-wider uppercase"
              style={{ color: '#36B936' }}
            >
              Sea Freight
            </h3>
          </div>

          <h2 className="mx-auto mb-3 sm:mb-4 max-w-[720px] text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#0A4D26] leading-[1.15]">
            {heading}
          </h2>

          <p className="mx-auto max-w-[580px] text-[13px] sm:text-[13.5px] lg:text-[14px] font-normal leading-relaxed text-[#2D6A4F]">
            {description}
          </p>
        </div>

        {/* Image container */}
        <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl min-h-[300px] xs:min-h-[360px] sm:min-h-[440px] lg:min-h-[520px] shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: isVisible ? 'scale(1)' : 'scale(1.08)',
              opacity: isVisible ? 1 : 0,
              transition: 'transform 1.1s cubic-bezier(0.16,1,0.3,1), opacity 0.8s ease-out',
            }}
          />

          {/* Bottom gradient overlay */}
          <div
            className="absolute inset-x-0 bottom-0 h-3/5 pointer-events-none"
            style={{
              background:
                'linear-gradient(0deg, rgba(4,20,11,0.85) 0%, rgba(4,20,11,0.4) 50%, rgba(4,20,11,0) 100%)',
            }}
          />

          {/* Caption — bottom left */}
          <div
            className="absolute bottom-0 left-0 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 w-full p-5 sm:p-8 lg:p-10"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
              transition:
                'opacity 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s',
            }}
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-base sm:text-xl lg:text-2xl font-medium text-white tracking-tight leading-tight">
                {projectLabel}
              </span>

              <a
                href={ctaHref}
                className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#36B936] hover:text-[#45d945] transition-colors w-fit"
              >
                <span>{ctaLabel}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeaFreightBanner;