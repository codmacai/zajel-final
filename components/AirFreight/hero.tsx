// components/AirFreight/AirFreightHero/AirFreightHero.tsx
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

export interface AirFreightHeroContent {
  eyebrow?: string;
  title: string;
  description: string;
  button: string;
  ctaLink: string;
  image_url: string;
}

// Fallback until the CMS entry is ready.
const defaultContent: AirFreightHeroContent = {
  eyebrow: "Air Freight",
  title: "Air Freight Forwarding: Fast, Secure Cargo by Air",
  description:
    "From standard cargo to specialized project shipments, Zajel moves it by air, with customs handled and the right delivery arrangement for your business.",
  button: "Get my rate",
  ctaLink: "/contact",
  image_url: "/international/ChatGPT Image May 12, 2026 at 02_03_10 AM.png",
};

interface AirFreightHeroProps {
  content?: AirFreightHeroContent;
  isRtl?: boolean;
}

const AirFreightHero: FC<AirFreightHeroProps> = ({
  content = defaultContent,
  isRtl = false,
}) => {
  const { eyebrow, title, description, button, ctaLink, image_url } = content;

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="air-freight-hero-title"
      className="box-border w-full bg-[#F9FAFB] pb-[clamp(0.75rem,2vw,1.5rem)] font-sans md:h-svh md:max-h-svh md:overflow-hidden"
      style={{ paddingTop: "calc(var(--navbar-h, 76px) + 0.5rem)" }}
    >
      <div className="mx-auto flex h-full w-full max-w-[1600px] items-center px-[clamp(1rem,4vw,3.5rem)]">
        {/* Mobile: column flex wrapper. md+: one card with text over image */}
        <div className="relative flex h-full max-h-full w-full flex-col md:block md:h-[clamp(500px,45vw,640px)] md:overflow-hidden md:rounded-[clamp(20px,2vw,32px)] md:bg-[#0B140F] md:text-white md:shadow-xl">
          
          {/* Picture: taller on mobile (h-[340px] or aspect ratio) to remove empty dead space */}
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

          {/* Text & Desktop CTA */}
          <div className="order-first pt-1 pb-3 md:absolute md:inset-0 md:z-10 md:flex md:items-center md:p-[clamp(1.75rem,4vw,4rem)] md:py-0">
            <div className="w-full md:max-w-[clamp(420px,42vw,680px)]">
              {eyebrow && (
                <div className="mb-[clamp(0.375rem,1.2vw,1rem)] flex items-center gap-3">
                  <span className="h-[2px] w-[clamp(1.5rem,2.4vw,2.25rem)] shrink-0 bg-[#36B936]" />
                  <span className="text-[clamp(0.6875rem,0.75vw,0.875rem)] font-medium uppercase tracking-wider text-[#36B936]">
                    {eyebrow}
                  </span>
                </div>
              )}

              <h1
                id="air-freight-hero-title"
                className="max-w-[22ch] text-balance break-words font-medium leading-[1.15] tracking-tight text-[#0A4D26] text-[clamp(1.375rem,min(1rem_+_2.4vw,5.5svh),3.5rem)] md:text-white"
              >
                {title}
              </h1>

              <p className="mt-[clamp(0.375rem,1.4vw,1.25rem)] max-w-[46ch] font-light leading-relaxed text-[#0A4D26]/75 text-[clamp(0.8125rem,min(0.6rem_+_0.7vw,2.6svh),1.1rem)] md:text-white/80">
                {description}
              </p>

              {/* Desktop CTA Button Only */}
              <div className="hidden md:block">
                <Link
                  href={ctaLink}
                  className="mt-[clamp(0.75rem,2vw,1.75rem)] inline-flex items-center gap-2 rounded-full bg-[#36B936] px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.55rem,1vw,0.85rem)] text-[clamp(0.8rem,1.4vw,0.9rem)] font-medium text-[#0B140F] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:focus-visible:outline-white"
                >
                  {button}
                  <span aria-hidden="true">{isRtl ? "←" : "→"}</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile CTA Button (Stretched full width on mobile) */}
      <div className="mt-3 w-full md:hidden px-[clamp(1rem,4vw,3.5rem)]">
        <Link
          href={ctaLink}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#36B936] px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.75rem,1.5vw,1rem)] text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-[#0B140F] transition-transform hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A4D26]"
        >
          {button}
          <span aria-hidden="true">{isRtl ? "←" : "→"}</span>
        </Link>
      </div>
    </section>
  );
};

export default AirFreightHero;