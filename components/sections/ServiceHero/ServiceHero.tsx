"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import CountUp from "./CountUp";
import { serviceHeroData, type ServiceHeroKey } from "./serviceHeroData";

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

  // Equal-width cells; dividers come from cell borders so every cell aligns
  const cellBase =
    "flex min-w-0 items-center justify-center px-2 py-2.5 md:px-4 md:py-0 " +
    "border-gray-100 [&:nth-child(n+3)]:border-t even:border-l " +
    "md:[&:nth-child(n+3)]:border-t-0 md:[&:not(:first-child)]:border-l";

  return (
    <section
      // Bottom padding on mobile provides generous room for the dock and CTA button below it
      className="box-border w-full bg-[#F9FAFB] pb-24 font-['Manrope',sans-serif] md:h-svh md:max-h-svh md:overflow-hidden md:pb-[clamp(3rem,5vw,4.5rem)]"
      style={{ paddingTop: "calc(var(--navbar-h, 76px) + 0.5rem)" }}
    >
      <div className="mx-auto flex h-full w-full max-w-[1600px] items-center px-[clamp(1rem,4vw,3.5rem)]">
        <div
          className="relative flex h-full max-h-full w-full flex-col md:h-[min(clamp(500px,45vw,640px),100%)]"
          style={{ "--img-op": imageOpacity } as CSSProperties}
        >
          {/* Image container: taller on mobile to remove empty dead space */}
          <div
            className="relative order-last h-[320px] w-full shrink-0 overflow-hidden rounded-[1.25rem] shadow-lg sm:rounded-[1.5rem] md:order-none md:absolute md:inset-0 md:h-auto md:min-h-0 md:rounded-[clamp(20px,2vw,32px)] md:shadow-xl"
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
          <div className="order-first shrink-0 pb-3 pt-1 md:absolute md:inset-x-0 md:top-0 md:z-10 md:flex md:flex-col md:p-[clamp(1.75rem,4vw,4rem)]">
            <div className="mb-[clamp(0.25rem,1vw,0.75rem)] flex items-center justify-center gap-2.5 md:mb-3 md:justify-start">
              <span className="h-[2px] w-[clamp(1.25rem,2vw,2rem)] shrink-0 bg-[#36B936]" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#36B936]">
                {badgeText}
              </span>
            </div>

            <div className="grid w-full grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:gap-8">
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                {/* Heading: minimal scale on mobile (text-2xl), full scale on md+ (lg:text-5xl) */}
                <h1 className="max-w-[26ch] text-balance break-words text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.12] tracking-tight text-[#0B140F] md:text-white">
                  {headingPrimary}
                  <br />
                  <span className="text-[#36B936]">{headingHighlight}</span>
                </h1>

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
            <div className="relative w-full max-w-[1040px] overflow-hidden rounded-[18px] border border-gray-100 bg-white/95 px-2 py-1 shadow-[0_20px_40px_-12px_rgba(6,68,35,0.2)] backdrop-blur-xl md:rounded-[clamp(22px,2.5vw,36px)] md:px-[clamp(1rem,2vw,2rem)] md:py-[clamp(1.1rem,1.6vw,1.6rem)]">
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
                      <span className="mb-0.5 text-xl sm:text-2xl lg:text-3xl font-semibold leading-none tracking-tight text-[#0B140F] md:mb-1">
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

      {/* Mobile CTA Button: Safely spaced with mt-20 below the half-hanging dock */}
      <div className="mt-20 w-full md:hidden px-[clamp(1rem,4vw,3.5rem)]">
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