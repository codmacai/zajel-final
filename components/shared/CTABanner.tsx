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
  /** Fixed or minimum height of the banner. Accepts any CSS length, e.g. "420px", "60vh" */
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
  height = "clamp(280px, 40vw, 420px)",
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

  const banner = (
    <section
      className={`relative w-full overflow-hidden flex items-center ${hasImage ? "" : "bg-white"} ${
        contained ? "rounded-2xl sm:rounded-[2rem]" : ""
      } ${className}`}
      style={{ minHeight: height }}
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

      {/* Content wrapper with responsive padding */}
      <div className="relative z-10 w-full py-10 px-5 sm:px-10 md:px-16">
        <div className={`flex max-w-2xl flex-col gap-3.5 sm:gap-4 ${alignConfig.wrapper}`}>
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
            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.15] ${
              hasImage ? "text-white" : "text-slate-900"
            }`}
          >
            {title}
          </h2>

          {description && (
            <p
              className={`max-w-lg text-[13.5px] sm:text-base leading-relaxed font-light ${
                hasImage ? "text-white/85" : "text-slate-600"
              }`}
            >
              {description}
            </p>
          )}

          {resolvedButtons.length > 0 && (
            <div className={`mt-2 flex flex-wrap gap-3 w-full ${align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start"}`}>
              {resolvedButtons.map((btn, i) => {
                const isPrimary = btn.variant ? btn.variant === "primary" : i === 0;
                return (
                  <Link
                    key={`${btn.label}-${i}`}
                    href={btn.href}
                    target={btn.external ? "_blank" : undefined}
                    rel={btn.external ? "noopener noreferrer" : undefined}
                    className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200 ${
                      isPrimary
                        ? "bg-[#36b936] text-white shadow-md shadow-[#36b936]/20 hover:bg-[#2e9e2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#36b936]"
                        : hasImage
                        ? "border border-white/70 bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        : "border border-slate-300 text-slate-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
                    }`}
                  >
                    {btn.label}
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
    <div className="w-full bg-white py-6 sm:py-10">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">{banner}</div>
    </div>
  );
}