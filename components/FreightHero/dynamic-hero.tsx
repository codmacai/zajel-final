// components/DynamicHero/DynamicHero.tsx
import Image from "next/image";
import Link from "next/link";
import type { FC, ReactNode } from "react";

export interface HeroCta {
  label: string;
  url: string;
}

export interface DynamicHeroContent {
  badge?: string;
  titleLine1: string;
  titleLine2?: string;
  description: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  image_url: string;
  imageAlt?: string;
}

interface DynamicHeroProps {
  /** Unique id prefix, used for aria-labelledby (e.g. "sea-freight-hero") */
  id: string;
  content: DynamicHeroContent;
  /** Small icon rendered inside the badge pill */
  icon?: ReactNode;
  isRtl?: boolean;
  /** Render titleLine1 + titleLine2 on one line (wraps naturally on mobile) */
  singleLineTitle?: boolean;
}

// Internal routes use <Link>; files (.pdf etc.) and external URLs use <a>.
const isPlainAnchor = (url: string) =>
  /^(https?:|mailto:|tel:)/.test(url) || /\.[a-z0-9]{2,5}$/i.test(url);

const CtaLink: FC<{ href: string; className: string; children: ReactNode }> = ({
  href,
  className,
  children,
}) =>
  isPlainAnchor(href) ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );

const DynamicHero: FC<DynamicHeroProps> = ({
  id,
  content,
  icon,
  isRtl = false,
  singleLineTitle = false,
}) => {
  const {
    badge,
    titleLine1,
    titleLine2,
    description,
    primaryCta,
    secondaryCta,
    image_url,
    imageAlt = "",
  } = content;

  const titleId = `${id}-title`;
  const arrow = isRtl ? "←" : "→";

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby={titleId}
      className="box-border w-full bg-[#F9FAFB] pb-[clamp(0.75rem,2vw,1.5rem)] font-sans md:h-svh md:max-h-svh md:overflow-hidden"
      style={{ paddingTop: "calc(var(--navbar-h, 76px) + 0.5rem)" }}
    >
      <div className="mx-auto flex h-full w-full max-w-[1600px] items-center px-[clamp(1rem,4vw,3.5rem)]">
        <div className="relative flex h-full max-h-full w-full flex-col md:block md:h-[clamp(500px,45vw,640px)] md:overflow-hidden md:rounded-[clamp(20px,2vw,32px)] md:bg-[#0B140F] md:text-white md:shadow-xl">
          {/* Image */}
          <div className="relative h-[340px] w-full shrink-0 overflow-hidden rounded-[1.25rem] bg-[#0B140F] shadow-lg sm:rounded-[1.5rem] md:absolute md:inset-0 md:h-auto md:min-h-0 md:rounded-none md:shadow-none">
            <Image
              src={image_url}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1600px) 100vw, 1600px"
              className="object-cover object-center"
            />
            {/* Even overlay (text is centered), tablet/desktop only */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden bg-[#0B140F]/65 md:block"
            />
          </div>

          {/* Centered text + desktop CTAs */}
          <div className="order-first pt-1 pb-3 text-center md:absolute md:inset-0 md:z-10 md:flex md:items-center md:justify-center md:p-[clamp(1.75rem,4vw,4rem)] md:py-0">
            <div
              className={`mx-auto w-full ${
                singleLineTitle
                  ? "md:max-w-[clamp(420px,80vw,1100px)]"
                  : "md:max-w-[clamp(420px,52vw,780px)]"
              }`}
            >
              {badge && (
                <span className="mb-[clamp(0.375rem,1.2vw,1rem)] inline-flex items-center gap-2 rounded-full border border-[#0A4D26]/20 px-3 py-1 text-[clamp(0.6875rem,0.75vw,0.8125rem)] font-medium uppercase tracking-wider text-[#36B936] md:border-white/25 md:bg-white/5 md:text-white/85">
                  {icon && (
                    <span aria-hidden="true" className="shrink-0 text-[#36B936]">
                      {icon}
                    </span>
                  )}
                  {badge}
                </span>
              )}

              <h1
                id={titleId}
                className={`mx-auto text-balance break-words font-medium leading-[1.12] tracking-tight text-[#0A4D26] text-[clamp(1.5rem,min(1rem_+_2.8vw,5.5svh),3.5rem)] md:text-white ${
                  singleLineTitle ? "max-w-none md:whitespace-nowrap" : "max-w-[22ch]"
                }`}
              >
                {titleLine1}
                {titleLine2 && (
                  <>
                    {singleLineTitle ? " " : <br />}
                    <span className="text-[#36B936]">{titleLine2}</span>
                  </>
                )}
              </h1>

              <p className="mx-auto mt-[clamp(0.375rem,1.4vw,1.25rem)] max-w-[46ch] font-light leading-relaxed text-[#0A4D26]/75 text-[clamp(0.8125rem,min(0.6rem_+_0.7vw,2.6svh),1.1rem)] md:text-white/80">
                {description}
              </p>

              {(primaryCta || secondaryCta) && (
                <div className="hidden md:mt-[clamp(0.75rem,2vw,1.75rem)] md:flex md:flex-wrap md:items-center md:justify-center md:gap-[clamp(0.5rem,1.2vw,0.85rem)]">
                  {primaryCta && (
                    <CtaLink
                      href={primaryCta.url}
                      className="inline-flex items-center gap-2 rounded-full bg-[#36B936] px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.55rem,1vw,0.85rem)] text-[clamp(0.8rem,1.4vw,0.9rem)] font-medium text-[#0B140F] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:focus-visible:outline-white"
                    >
                      {primaryCta.label}
                      <span aria-hidden="true">{arrow}</span>
                    </CtaLink>
                  )}
                  {secondaryCta && (
                    <CtaLink
                      href={secondaryCta.url}
                      className="inline-flex items-center rounded-full border border-white/35 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.55rem,1vw,0.85rem)] text-[clamp(0.8rem,1.4vw,0.9rem)] font-medium text-white/90 transition-colors hover:border-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:focus-visible:outline-white"
                    >
                      {secondaryCta.label}
                    </CtaLink>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTAs */}
      {(primaryCta || secondaryCta) && (
        <div className="mt-3 flex w-full flex-col gap-2.5 px-[clamp(1rem,4vw,3.5rem)] md:hidden">
          {primaryCta && (
            <CtaLink
              href={primaryCta.url}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#36B936] px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.75rem,1.5vw,1rem)] text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-[#0B140F] transition-transform hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A4D26]"
            >
              {primaryCta.label}
              <span aria-hidden="true">{arrow}</span>
            </CtaLink>
          )}
          {secondaryCta && (
            <CtaLink
              href={secondaryCta.url}
              className="flex w-full items-center justify-center rounded-full border border-[#0A4D26]/25 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.75rem,1.5vw,1rem)] text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-[#0A4D26] transition-colors hover:border-[#0A4D26]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A4D26]"
            >
              {secondaryCta.label}
            </CtaLink>
          )}
        </div>
      )}
    </section>
  );
};

export default DynamicHero;