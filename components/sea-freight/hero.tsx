// components/SeaFreight/SeaFreightHero/SeaFreightHero.tsx
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

export interface SeaFreightHeroContent {
  badge?: string;
  titleLine1: string;
  titleLine2?: string;
  description: string;
  primaryCta?: { label: string; url: string };
  secondaryCta?: { label: string; url: string };
  image_url: string;
}

// Fallback until the CMS entry is ready.
const defaultContent: SeaFreightHeroContent = {
  badge: "Sea Freight, FCL & LCL",
  titleLine1: "Port to port,",
  titleLine2: "priced plainly.",
  description:
    "Weekly sailings through Jebel Ali and Khalifa Port with in-house clearance, bonded storage and the inland leg included on arrival.",
  primaryCta: { label: "Book space", url: "/contact" },
  secondaryCta: { label: "Download schedule", url: "/schedule.pdf" },
  image_url: "/sea-freight/ChatGPT Image Apr 24, 2026 at 01_16_23 PM.png",
};

interface SeaFreightHeroProps {
  content?: SeaFreightHeroContent;
  isRtl?: boolean;
}

const SeaFreightHero: FC<SeaFreightHeroProps> = ({
  content = defaultContent,
  isRtl = false,
}) => {
  const {
    badge,
    titleLine1,
    titleLine2,
    description,
    primaryCta,
    secondaryCta,
    image_url,
  } = content;

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="sea-freight-hero-title"
      className="box-border w-full bg-[#F9FAFB] pb-[clamp(0.75rem,2vw,1.5rem)] font-sans md:h-svh md:max-h-svh md:overflow-hidden"
      style={{ paddingTop: "calc(var(--navbar-h, 76px) + 0.5rem)" }}
    >
      <div className="mx-auto flex h-full w-full max-w-[1600px] items-center px-[clamp(1rem,4vw,3.5rem)]">
        {/* Mobile: column flex wrapper. md+: one card with text over image */}
        <div className="relative flex h-full max-h-full w-full flex-col md:block md:h-[clamp(500px,45vw,640px)] md:overflow-hidden md:rounded-[clamp(20px,2vw,32px)] md:bg-[#0B140F] md:text-white md:shadow-xl">
          
          {/* Picture: taller on mobile (h-[340px]) to remove empty dead space, background on md+ */}
          <div className="relative h-[340px] w-full shrink-0 overflow-hidden rounded-[1.25rem] bg-[#0B140F] shadow-lg sm:rounded-[1.5rem] md:absolute md:inset-0 md:h-auto md:min-h-0 md:rounded-none md:shadow-none">
            <Image
              src={image_url}
              alt=""
              fill
              priority
              sizes="(max-width: 1600px) 100vw, 1600px"
              className={`object-cover ${
                isRtl ? "object-left" : "object-center md:object-right"
              }`}
            />

            {/* Overlay: tablet/desktop only */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 hidden from-[#0B140F]/85 via-[#0B140F]/60 to-[#0B140F]/20 md:block ${
                isRtl ? "bg-gradient-to-l" : "bg-gradient-to-r"
              }`}
            />
          </div>

          {/* Text & Desktop CTAs */}
          <div className="order-first pt-1 pb-3 md:absolute md:inset-0 md:z-10 md:flex md:items-center md:p-[clamp(1.75rem,4vw,4rem)] md:py-0">
            <div className="w-full md:max-w-[clamp(420px,42vw,680px)]">
              {badge && (
                <span className="mb-[clamp(0.375rem,1.2vw,1rem)] inline-flex items-center gap-2 rounded-full border border-[#0A4D26]/20 px-3 py-1 text-[clamp(0.6875rem,0.75vw,0.8125rem)] font-medium uppercase tracking-wider text-[#36B936] md:border-white/25 md:bg-white/5 md:text-white/85">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 text-[#36B936]"
                  >
                    <circle cx="12" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M12 7.2V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M5 13a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M8 10.5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  {badge}
                </span>
              )}

              <h1
                id="sea-freight-hero-title"
                className="max-w-[22ch] text-balance break-words font-medium leading-[1.12] tracking-tight text-[#0A4D26] text-[clamp(1.5rem,min(1rem_+_2.8vw,5.5svh),3.5rem)] md:text-white"
              >
                {titleLine1}
                {titleLine2 && (
                  <>
                    <br />
                    <span className="text-[#36B936]">{titleLine2}</span>
                  </>
                )}
              </h1>

              <p className="mt-[clamp(0.375rem,1.4vw,1.25rem)] max-w-[46ch] font-light leading-relaxed text-[#0A4D26]/75 text-[clamp(0.8125rem,min(0.6rem_+_0.7vw,2.6svh),1.1rem)] md:text-white/80">
                {description}
              </p>

              {/* Desktop CTA Buttons Only */}
              {(primaryCta || secondaryCta) && (
                <div className="hidden md:mt-[clamp(0.75rem,2vw,1.75rem)] md:flex md:flex-wrap md:items-center md:gap-[clamp(0.5rem,1.2vw,0.85rem)]">
                  {primaryCta && (
                    <Link
                      href={primaryCta.url}
                      className="inline-flex items-center gap-2 rounded-full bg-[#36B936] px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.55rem,1vw,0.85rem)] text-[clamp(0.8rem,1.4vw,0.9rem)] font-medium text-[#0B140F] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:focus-visible:outline-white"
                    >
                      {primaryCta.label}
                      <span aria-hidden="true">{isRtl ? "←" : "→"}</span>
                    </Link>
                  )}
                  {secondaryCta && (
                    <a
                      href={secondaryCta.url}
                      className="inline-flex items-center rounded-full border border-white/35 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.55rem,1vw,0.85rem)] text-[clamp(0.8rem,1.4vw,0.9rem)] font-medium text-white/90 transition-colors hover:border-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:focus-visible:outline-white"
                    >
                      {secondaryCta.label}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Mobile CTA Buttons (Stretched full width below the image container) */}
      {(primaryCta || secondaryCta) && (
        <div className="mt-3 flex w-full flex-col gap-2.5 md:hidden px-[clamp(1rem,4vw,3.5rem)]">
          {primaryCta && (
            <Link
              href={primaryCta.url}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#36B936] px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.75rem,1.5vw,1rem)] text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-[#0B140F] transition-transform hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A4D26]"
            >
              {primaryCta.label}
              <span aria-hidden="true">{isRtl ? "←" : "→"}</span>
            </Link>
          )}
          {secondaryCta && (
            <a
              href={secondaryCta.url}
              className="flex w-full items-center justify-center rounded-full border border-[#0A4D26]/25 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.75rem,1.5vw,1rem)] text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-[#0A4D26] transition-colors hover:border-[#0A4D26]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A4D26]"
            >
              {secondaryCta.label}
            </a>
          )}
        </div>
      )}
    </section>
  );
};

export default SeaFreightHero;