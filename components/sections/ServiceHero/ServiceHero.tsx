"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import CountUp from "./CountUp";
import { serviceHeroData, type ServiceHeroKey } from "./serviceHeroData";

/**
 * Keeps the heading on exactly two lines (primary line + highlight line).
 * Each line never wraps; if a line is wider than the space available, the font
 * size steps down until it fits, and grows back to the Tailwind size when there
 * is room again (rotation, resize, breakpoint change).
 */
function useFitHeading(deps: unknown[]) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const MIN_PX = 16;

    const fit = () => {
      el.style.fontSize = ""; // back to the size Tailwind set for this breakpoint
      let size = parseFloat(getComputedStyle(el).fontSize);
      while (el.scrollWidth > el.clientWidth + 1 && size > MIN_PX) {
        size -= 1;
        el.style.fontSize = `${size}px`;
      }
    };

    fit();

    // Only re-fit when the available width changes (font changes alter height, not width).
    let lastWidth = el.clientWidth;
    const ro = new ResizeObserver(() => {
      if (el.clientWidth === lastWidth) return;
      lastWidth = el.clientWidth;
      fit();
    });
    ro.observe(el);

    // Web fonts change glyph widths once loaded.
    document.fonts?.ready.then(fit);

    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

export default function ServiceHero({ variant }: { variant: ServiceHeroKey }) {
  const {
    badgeText,
    headingPrimary,
    headingHighlight,
    leadParagraph,
    detailParagraph,
    ctaText,
    ctaHref,
    backgroundImage,
    backgroundImageAlt,
    cardBg,
    imageOpacity = 1,
    overlayVariant = "standard",
    showGlowOrbs = false,
    stats,
  } = serviceHeroData[variant];

  const headingRef = useFitHeading([headingPrimary, headingHighlight]);

  // Equal-width cells; dividers come from cell borders so every cell aligns
  const cellBase =
    "flex min-h-[3.5rem] min-w-0 items-center justify-center px-2 py-3 md:min-h-0 md:px-4 md:py-0 " +
    "border-gray-100 [&:nth-child(n+3)]:border-t even:border-l " +
    "md:[&:nth-child(n+3)]:border-t-0 md:[&:not(:first-child)]:border-l";

  return (
    <section
      // Mobile: a flex column at least one viewport tall. The image takes whatever height is
      // left after the text, dock and CTA, so the hero always fills the screen with even gaps.
      // md+: fixed-height hero; the card also grows with viewport height on portrait tablets.
      className="box-border flex min-h-svh w-full flex-col bg-[#F9FAFB] pb-6 font-['Manrope',sans-serif] md:block md:h-svh md:max-h-svh md:min-h-0 md:overflow-hidden md:pb-[clamp(3rem,5vw,4.5rem)]"
      style={{ paddingTop: "calc(var(--navbar-h, 76px) + 0.75rem)" }}
    >
      <div className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 items-stretch px-[clamp(1rem,4vw,3.5rem)] md:h-full md:flex-none md:items-center">
        <div
          className="relative mb-16 flex min-h-0 w-full flex-1 flex-col md:mb-0 md:h-[min(clamp(500px,max(45vw,55svh),640px),100%)] md:max-h-full md:flex-none"
          style={{ "--img-op": imageOpacity } as CSSProperties}
        >
          {/* Image container: height follows the viewport on mobile */}
          <div
            className="relative order-last min-h-[180px] w-full flex-1 overflow-hidden rounded-[1.25rem] shadow-lg sm:rounded-[1.5rem] md:order-none md:flex-none md:absolute md:inset-0 md:h-auto md:min-h-0 md:rounded-[clamp(20px,2vw,32px)] md:shadow-xl"
            style={{ backgroundColor: cardBg }}
          >
            {backgroundImage && (
              <Image
                src={backgroundImage}
                alt={backgroundImageAlt}
                fill
                priority
                sizes="(max-width: 1600px) 100vw, 1600px"
                className="object-cover object-center md:opacity-[var(--img-op)]"
              />
            )}

            {/* Overlays: md+ only */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
              {overlayVariant === "network" ? (
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to bottom, ${cardBg}E6 0%, ${cardBg}BF 60%, ${cardBg}F2 100%)`,
                  }}
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0B140F]/85 via-[#0B140F]/60 to-[#0B140F]/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060A07]/40 via-transparent to-transparent" />
                </>
              )}
              {showGlowOrbs && (
                <>
                  <div className="absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-[#36B936]/10 blur-[140px]" />
                  <div className="absolute bottom-0 left-[-15%] h-[420px] w-[420px] rounded-full bg-[#2E5C3A]/20 blur-[120px]" />
                </>
              )}
            </div>
          </div>

          {/* Text: above the image on mobile, overlaid at the TOP on md+ */}
          <div className="order-first shrink-0 pb-5 pt-2 md:absolute md:inset-x-0 md:top-0 md:z-10 md:flex md:flex-col md:p-[clamp(1.75rem,4vw,4rem)]">
            <div className="mb-3 flex items-center justify-center gap-2.5 md:justify-start">
              <span className="h-[2px] w-[clamp(1.25rem,2vw,2rem)] shrink-0 bg-[#36B936]" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#36B936]">
                {badgeText}
              </span>
            </div>

            <div className="grid w-full grid-cols-[minmax(0,1fr)] items-start gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-8">
              <div className="flex w-full min-w-0 flex-col items-center text-center md:items-start md:text-left">
                <h1
                  ref={headingRef}
                  className="w-full overflow-x-clip text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight text-[#0B140F] md:leading-[1.12] md:text-white"
                >
                  <span className="block whitespace-nowrap">{headingPrimary}</span>
                  <span className="block whitespace-nowrap text-[#36B936]">{headingHighlight}</span>
                </h1>

                {/* Mobile + tablet description (max 3 lines). lg+ uses the two-paragraph block on the right. */}
                <p className="mt-3 line-clamp-3 max-w-[38ch] text-[13px] font-normal leading-relaxed text-[#4B5750] sm:text-sm md:mt-4 md:max-w-[52ch] md:text-base md:text-white/85 lg:hidden">
                  {leadParagraph}
                </p>

                {/* Desktop CTA Button Only */}
                <div className="hidden md:block">
                  <Link
                    href={ctaHref}
                    className="mt-[clamp(0.75rem,2vw,1.75rem)] inline-flex items-center gap-2 rounded-full bg-[#36B936] px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.55rem,1vw,0.85rem)] text-xs sm:text-sm font-medium text-[#0B140F] shadow-md transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:focus-visible:outline-white"
                  >
                    <span>{ctaText}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              {/* Description: desktop only */}
              <div className="hidden space-y-4 text-left lg:block">
                <p className="max-w-[58ch] text-xs sm:text-sm md:text-base font-normal leading-relaxed text-white/85">
                  {leadParagraph}
                </p>
                <p className="max-w-[58ch] text-xs sm:text-sm md:text-base font-normal leading-relaxed text-white/85">
                  {detailParagraph}
                </p>
              </div>
            </div>
          </div>

          {/* Dock: centered on the image's bottom edge on every screen size */}
          <div className="absolute inset-x-0 bottom-0 z-30 flex translate-y-1/2 justify-center px-3 md:px-[clamp(1rem,3vw,2rem)]">
            <div className="relative w-full max-w-[1040px] overflow-hidden rounded-[18px] border border-gray-100 bg-white/95 px-2 py-1.5 shadow-[0_20px_40px_-12px_rgba(6,68,35,0.2)] backdrop-blur-xl md:rounded-[clamp(22px,2.5vw,36px)] md:px-[clamp(1rem,2vw,2rem)] md:py-[clamp(1.1rem,1.6vw,1.6rem)]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#36B936] to-transparent" />

              <div
                className={`grid grid-cols-2 md:items-center ${
                  stats.length === 4 ? "md:grid-cols-4" : "md:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
                }`}
              >
                {stats.map((stat) => {
                  if (stat.type === "icon") {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.title} className={`${cellBase} group`}>
                        <div className="flex min-w-0 items-center gap-2 md:gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-[#F4F6F4] text-[#36B936] transition-all duration-300 group-hover:border-[#36B936]/40 group-hover:bg-[#36B936]/10 md:h-11 md:w-11">
                            <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.75} />
                          </span>
                          <span className="flex min-w-0 flex-col text-left">
                            <span className="truncate text-xs sm:text-sm font-medium leading-tight tracking-tight text-[#0B140F]">
                              {stat.title}
                            </span>
                            <span className="text-[10px] sm:text-xs font-normal leading-tight text-[#4B5750]">
                              {stat.subtitle}
                            </span>
                          </span>
                        </div>
                      </div>
                    );
                  }

                  const animate = stat.animate ?? typeof stat.value === "number";
                  return (
                    <div key={stat.label} className={`${cellBase} flex-col text-center`}>
                      <span className="mb-1 text-xl sm:text-2xl lg:text-3xl font-semibold leading-none tracking-tight text-[#0B140F] md:mb-1">
                        {animate ? (
                          <CountUp end={stat.value as number} suffix={stat.suffix} />
                        ) : (
                          <>
                            {stat.value}
                            {stat.suffix}
                          </>
                        )}
                      </span>
                      <span className="text-[10px] sm:text-xs font-normal tracking-tight text-[#4B5750]">
                        {stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTA: sits right under the dock (the wrapper's mb-16 reserves the dock's
          overhang, pt-4 is the visible gap). */}
      <div className="w-full px-[clamp(1rem,4vw,3.5rem)] pt-4 md:hidden">
        <Link
          href={ctaHref}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#36B936] px-6 py-3.5 text-xs sm:text-sm font-medium text-[#0B140F] shadow-md transition-transform hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B140F]"
        >
          <span>{ctaText}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}