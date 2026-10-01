'use client';

import Link from "next/link";
import {
  Fuel,
  Factory,
  ShoppingBag,
  HardHat,
  UtensilsCrossed,
  Plane,
  Cpu,
  Car,
  Shirt,
  Wheat,
  Building2,
  Ship,
  Truck,
  HeartPulse,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");
const ANIMATE_BASE = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
const fadeIn = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8");

const LIME = "#36B936";
const DARK = "#1b4332";

const GRID_COLUMNS_MOBILE = 2;
const GRID_COLUMNS_DESKTOP = 4;

export interface IndustryItem {
  title: string;
  description: string;
}

interface MarqueeSectionProps {
  eyebrow: string;
  heading: string;
  description: string;
  items: readonly IndustryItem[];
  ctaLabel?: string;
  ctaDescription?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

const ICON_RULES: Array<[RegExp, LucideIcon]> = [
  [/oil|gas|energy|petro/i, Fuel],
  [/pharma|medic|health/i, HeartPulse],
  [/construct|heavy|equipment|infrastructure/i, HardHat],
  [/food|beverage|f&b/i, UtensilsCrossed],
  [/aero|aircraft|aviation/i, Plane],
  [/electro|tech|semiconductor/i, Cpu],
  [/auto|vehicle/i, Car],
  [/textile|garment|apparel|fashion/i, Shirt],
  [/agri|farm/i, Wheat],
  [/retail|consumer/i, ShoppingBag],
  [/marine|shipping|maritime/i, Ship],
  [/manufactur|machinery|industrial/i, Factory],
  [/logistics|transport|freight/i, Truck],
];

const iconFor = (title: string): LucideIcon => {
  const match = ICON_RULES.find(([pattern]) => pattern.test(title));
  return match ? match[1] : Building2;
};

export function MarqueeSection({
  eyebrow,
  heading,
  description,
  items,
  ctaLabel = "Don't see your industry?",
  ctaDescription = "Get in touch — we tailor logistics solutions for every sector.",
  ctaHref,
  onCtaClick,
}: MarqueeSectionProps) {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>();

  const remainderMobile = items.length % GRID_COLUMNS_MOBILE;
  const emptyCellsMobile = remainderMobile === 0 ? 0 : GRID_COLUMNS_MOBILE - remainderMobile;

  const remainderDesktop = items.length % GRID_COLUMNS_DESKTOP;
  const emptyCellsDesktop = remainderDesktop === 0 ? 0 : GRID_COLUMNS_DESKTOP - remainderDesktop;

  const renderCtaContent = (isMobileDark: boolean) => (
    <>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <span className={cx(
          "text-[11px] font-medium tracking-wide transition-colors duration-300",
          isMobileDark ? "text-white/60 group-hover:text-white/80" : "text-[#1b4332]/40 group-hover:text-white/70"
        )}>
          CTA
        </span>
        <ArrowRight
          className={cx(
            "w-4 h-4 transition-colors duration-300",
            isMobileDark ? "text-white group-hover:text-white/90" : "text-[#36B936] group-hover:text-white"
          )}
          strokeWidth={2}
        />
      </div>

      <div>
        <ArrowRight
          className={cx(
            "w-8 h-8 sm:w-10 sm:h-10 mb-3 sm:mb-4 transition-colors duration-300",
            isMobileDark ? "text-white group-hover:text-white/90" : "text-[#36B936] group-hover:text-white"
          )}
          strokeWidth={1.25}
        />

        <h3 className={cx(
          "text-[14px] sm:text-[15px] lg:text-[16px] font-medium tracking-tight mb-1.5 transition-colors duration-300",
          isMobileDark ? "text-white" : "text-[#1b4332] group-hover:text-white"
        )}>
          {ctaLabel}
        </h3>

        <p className={cx(
          "text-[12px] sm:text-[12.5px] leading-relaxed font-normal transition-colors duration-300",
          isMobileDark ? "text-white/85" : "text-[#2d6a4f] group-hover:text-white/85"
        )}>
          {ctaDescription}
        </p>
      </div>
    </>
  );

  const getCtaClassName = (isMobileDark: boolean) =>
    cx(
      "group border-r border-b border-[#1b4332]/15 p-4 sm:p-6 lg:p-8 transition-colors duration-300 flex flex-col justify-between cursor-pointer",
      isMobileDark ? "bg-[#1b4332] hover:bg-[#36B936]" : "bg-white hover:bg-[#36B936]"
    );

  const ctaStyleMobile = { gridColumn: `span ${emptyCellsMobile} / span ${emptyCellsMobile}` };
  const ctaStyleDesktop = { gridColumn: `span ${emptyCellsDesktop} / span ${emptyCellsDesktop}` };

  const renderCta = (visibilityClass: string, style: React.CSSProperties, isMobileDark: boolean) =>
    ctaHref ? (
      <Link href={ctaHref} className={cx(getCtaClassName(isMobileDark), visibilityClass)} style={style}>
        {renderCtaContent(isMobileDark)}
      </Link>
    ) : (
      <button
        type="button"
        onClick={onCtaClick}
        className={cx(getCtaClassName(isMobileDark), "text-left w-full", visibilityClass)}
        style={style}
      >
        {renderCtaContent(isMobileDark)}
      </button>
    );

  return (
    <section
      ref={sectionRef}
      // px-0 on mobile so it touches the screen edges, with regular padding on sm and lg screens
      className="w-full py-10 sm:py-16 lg:py-24 px-0 sm:px-6 lg:px-12 bg-white font-['Manrope',sans-serif]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header container keeps standard mobile padding so the title/eyebrow don't stick to the edges */}
        <div className={cx("text-center mb-8 sm:mb-12 lg:mb-14 px-4 sm:px-0", ANIMATE_BASE, fadeIn(isVisible))}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <h2 style={{ color: LIME }} className="font-medium text-xs sm:text-sm tracking-wider uppercase">
              {eyebrow}
            </h2>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#1b4332] leading-[1.15] max-w-[720px] mx-auto">
            {heading}
          </h2>

          <p className="mt-3.5 text-[#2d6a4f] font-normal text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed max-w-[520px] mx-auto">
            {description}
          </p>
        </div>

        {/* Grid wrapper: rounded-none on mobile, rounded-2xl from sm screens up */}
        <div
          className={cx(
            "grid grid-cols-2 lg:grid-cols-4 border-t border-l border-[#1b4332]/15 rounded-none sm:rounded-2xl overflow-hidden shadow-sm",
            ANIMATE_BASE,
            fadeIn(isVisible)
          )}
          style={{ transitionDelay: "150ms", borderColor: `${DARK}1F` }}
        >
          {items.map((item, i) => {
            const Icon = iconFor(item.title);
            return (
              <div
                key={item.title}
                className="group border-r border-b border-[#1b4332]/15 p-4 sm:p-6 lg:p-8 bg-white hover:bg-[#36B936] transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="block text-[11px] font-medium tracking-wide mb-4 sm:mb-6 text-[#1b4332]/40 group-hover:text-white/70 transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}.
                  </span>

                  <Icon
                    className="w-8 h-8 sm:w-10 sm:h-10 mb-3 sm:mb-4 text-[#36B936] group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.25}
                  />

                  <h3 className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium tracking-tight mb-1.5 text-[#1b4332] group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>

                <p className="text-[12px] sm:text-[12.5px] leading-relaxed text-[#2d6a4f] font-normal group-hover:text-white/85 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            );
          })}

          {emptyCellsMobile > 0 && renderCta("lg:hidden", ctaStyleMobile, true)}
          {emptyCellsDesktop > 0 && renderCta("hidden lg:flex", ctaStyleDesktop, false)}
        </div>
      </div>
    </section>
  );
}

export default MarqueeSection;