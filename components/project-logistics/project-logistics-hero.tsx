"use client";

import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { HERO } from "./data";

// Optional fields: add them to HERO in ./data to control the highlight line and CTA.
const hero = HERO as typeof HERO & {
  titleHighlight?: string;
  ctaText?: string;
  ctaHref?: string;
};

const ProjectLogisticsHero: FC = () => {
  const {
    eyebrow,
    title,
    titleHighlight,
    description,
    image,
    ctaText = "Request a Quote",
    ctaHref = "/quote",
  } = hero;

  return (
    <section
      className="box-border flex min-h-svh w-full flex-col justify-between overflow-hidden bg-[#F9FAFB] pb-6 font-sans md:pb-[clamp(1.5rem,3vw,3rem)]"
      style={{ paddingTop: "calc(var(--navbar-h, 76px) + 1rem)" }}
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 items-center px-[clamp(1rem,4vw,3.5rem)] py-4">
        <div className="relative flex h-full w-full flex-col md:h-[min(clamp(520px,48vw,680px),100%)]">
          
          {/* Image container: on mobile it sits below text, on desktop it becomes the background card */}
          <div className="relative order-2 h-[300px] w-full shrink-0 overflow-hidden rounded-[1.25rem] bg-[#0B140F] shadow-lg sm:rounded-[1.5rem] md:order-none md:absolute md:inset-0 md:h-auto md:min-h-0 md:rounded-[clamp(20px,2vw,32px)] md:shadow-xl">
            <Image
              src={image}
              alt={title}
              fill
              priority
              sizes="(max-width: 1600px) 100vw, 1600px"
              className="object-cover object-center"
            />

            {/* Overlays: md+ only */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B140F]/85 via-[#0B140F]/60 to-[#0B140F]/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060A07]/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* Text: stacked on mobile, overlaid on desktop */}
          <div className="order-1 flex flex-col pb-3 pt-2 md:absolute md:inset-0 md:z-10 md:justify-between md:p-[clamp(1.75rem,4vw,4rem)] md:pb-[clamp(1.75rem,4vw,4rem)]">
            
            {/* Eyebrow */}
            <div className="mb-[clamp(0.5rem,1.2vw,1rem)] flex items-center gap-3 md:mb-0">
              <span className="h-[2px] w-[clamp(1.5rem,2.4vw,2.25rem)] shrink-0 bg-[#36B936]" />
              <span className="text-[clamp(0.6875rem,0.75vw,0.875rem)] font-medium uppercase tracking-wider text-[#36B936]">
                {eyebrow}
              </span>
            </div>

            {/* Main content grid */}
            <div className="grid w-full grid-cols-1 items-end gap-6 lg:grid-cols-2 lg:gap-8">
              <div className="flex flex-col items-start">
                <h1 className="max-w-[26ch] text-balance break-words text-[clamp(1.5rem,min(1.2rem_+_2.2vw,5.5svh),3.5rem)] font-medium leading-[1.15] tracking-tight text-[#0A4D26] md:text-white">
                  {title}
                  {titleHighlight && (
                    <>
                      <br />
                      <span className="text-[#36B936]">{titleHighlight}</span>
                    </>
                  )}
                </h1>

                {/* Desktop CTA Button Only */}
                <div className="hidden md:block">
                  <Link
                    href={ctaHref}
                    className="mt-[clamp(1rem,2vw,1.75rem)] inline-flex items-center gap-2 rounded-full bg-[#36B936] px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.6rem,1vw,0.85rem)] text-[clamp(0.8rem,1.4vw,0.9rem)] font-medium text-[#0B140F] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:focus-visible:outline-white"
                  >
                    {ctaText}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              {/* Description: desktop only */}
              <div className="hidden text-left lg:block">
                <p className="max-w-[60ch] text-[clamp(0.8125rem,min(0.6rem_+_0.7vw,2.6svh),1.1rem)] font-light leading-relaxed text-white/80">
                  {description}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile CTA Button (Stretched full width below the image container) */}
      <div className="mt-3 w-full md:hidden px-[clamp(1rem,4vw,3.5rem)]">
        <Link
          href={ctaHref}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#36B936] px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.75rem,1.5vw,1rem)] text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-[#0B140F] transition-transform hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A4D26]"
        >
          {ctaText}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
};

export default ProjectLogisticsHero;