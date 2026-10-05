import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";

export interface CTAButton {
  label: string;
  href: string;
  external?: boolean;
  /** Visual weight. "primary" is the solid filled button, "secondary" is outlined/ghost. Default: first button is primary, rest are secondary. */
  variant?: "primary" | "secondary";
}

export interface CTABannerProps {
  /** Background image — pass a static import for optimized local images, or a URL string. Omit for a plain white background section. */
  image?: string | StaticImageData;
  /** Alt text for the background image */
  imageAlt?: string;
  /** Small line above the heading, e.g. an eyebrow or category tag. Optional. */
  eyebrow?: string;
  /** Main heading text */
  title: string;
  /** Supporting paragraph under the heading */
  description?: string;
  /** Use this for a single button (simplest case) */
  buttonLabel?: string;
  buttonHref?: string;
  buttonExternal?: boolean;
  /** Use this instead when you need 2+ buttons — overrides buttonLabel/buttonHref if both are given */
  buttons?: CTAButton[];
  /** Marks the image as above-the-fold so Next.js loads it eagerly (use for the page's first/hero banner only) */
  priority?: boolean;
  /** Horizontal position of the text block */
  align?: "left" | "center" | "right";
  /** Darkens the image so text stays readable. 0–1, default 0.55 */
  overlayOpacity?: number;
  /** Fixed or minimum height of the banner. Accepts any CSS length */
  height?: string;
  /** When true (default), the banner sits inside a max-width container with side margins and rounded corners, like a card. Set false for a full-bleed, edge-to-edge section. */
  contained?: boolean;
  /** Extra class names for the outer section, if you need to tweak spacing per-page */
  className?: string;
}

const alignmentClasses: Record<NonNullable<CTABannerProps["align"]>, { wrapper: string; text: string }> = {
  left: { wrapper: "items-start text-left mr-auto", text: "text-left" },
  center: { wrapper: "items-center text-center mx-auto", text: "text-center" },
  right: { wrapper: "items-end text-right ml-auto", text: "text-right" },
};

/* -------------------------------------------------------------------------- */
/*  Button styles — shared pill shape, primary = brand green, secondary =     */
/*  matching outlined pill                                                    */
/* -------------------------------------------------------------------------- */

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full " +
  "px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.55rem,1vw,0.85rem)] " +
  "text-xs sm:text-sm font-medium transition-transform hover:scale-[1.03] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const buttonPrimary = "bg-[#36B936] text-[#0B140F] shadow-md";

export default function CTABanner({
  image,
  imageAlt = "",
  eyebrow,
  title,
  description,
  buttonLabel,
  buttonHref,
  buttonExternal = false,
  buttons,
  priority = false,
  align = "center",
  overlayOpacity = 0.55,
  height = "min-h-[75vh] sm:min-h-[420px]",
  contained = true,
  className = "",
}: CTABannerProps) {
  const hasImage = Boolean(image);

  // Fall back to a single-button array built from buttonLabel/buttonHref
  const resolvedButtons: CTAButton[] =
    buttons ??
    (buttonLabel && buttonHref
      ? [{ label: buttonLabel, href: buttonHref, external: buttonExternal, variant: "primary" }]
      : []);

  const alignConfig = alignmentClasses[align];

  // Focus ring + secondary styling depend on whether there is a dark image behind
  const focusColor = hasImage ? "focus-visible:outline-white" : "focus-visible:outline-slate-900";
  const buttonSecondary = hasImage
    ? "border border-white/70 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15"
    : "border border-slate-300 text-slate-700 hover:bg-slate-50";

  const banner = (
    <section
      className={`relative w-full overflow-hidden flex items-center justify-center ${hasImage ? "" : "bg-white"} ${
        contained ? "rounded-2xl sm:rounded-[2rem]" : ""
      } ${className}`}
      style={{ minHeight: "clamp(460px, 75vh, 520px)" }}
    >
      {hasImage && (
        <>
          {/* Background image */}
          <Image
            src={image!}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover"
          />

          {/* Darkening overlay for text contrast */}
          <div
            className="absolute inset-0 transition-opacity"
            style={{ backgroundColor: `rgba(10, 12, 16, ${overlayOpacity})` }}
          />
        </>
      )}

      {/* Symmetrical top & bottom padding for a balanced mobile card feel */}
      <div className="relative z-10 w-full py-20 sm:py-16 px-6 sm:px-12 md:px-16 my-auto flex flex-col justify-center">
        <div className={`flex max-w-2xl flex-col gap-4 sm:gap-5 ${alignConfig.wrapper}`}>
          {eyebrow && (
            <span
              className={`text-xs sm:text-sm font-medium tracking-wider uppercase ${
                hasImage ? "text-white/80" : "text-slate-500"
              }`}
            >
              {eyebrow}
            </span>
          )}

          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15] ${
              hasImage ? "text-white" : "text-slate-900"
            }`}
          >
            {title}
          </h2>

          {description && (
            <p
              className={`max-w-lg text-sm sm:text-base leading-relaxed font-light ${
                hasImage ? "text-white/85" : "text-slate-600"
              }`}
            >
              {description}
            </p>
          )}

          {resolvedButtons.length > 0 && (
            <div
              className={`mt-3 flex w-full flex-wrap gap-3 ${
                align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start"
              }`}
            >
              {resolvedButtons.map((btn, i) => {
                const isPrimary = btn.variant ? btn.variant === "primary" : i === 0;
                return (
                  <Link
                    key={`${btn.label}-${i}`}
                    href={btn.href}
                    target={btn.external ? "_blank" : undefined}
                    rel={btn.external ? "noopener noreferrer" : undefined}
                    className={`${buttonBase} ${focusColor} ${isPrimary ? buttonPrimary : buttonSecondary}`}
                  >
                    <span>{btn.label}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );

  if (!contained) return banner;

  return (
    <div className="w-full bg-white pt-6 sm:pt-10 pb-12 sm:pb-16">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">{banner}</div>
    </div>
  );
}