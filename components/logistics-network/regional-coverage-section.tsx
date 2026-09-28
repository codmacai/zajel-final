"use client";

import { useInView } from "@/hooks/useInView";
import {
  REGIONAL_COVERAGE_COLUMNS,
  REGIONAL_COVERAGE_HEADING,
  REGIONAL_COVERAGE_INTRO,
  type CoverageColumn,
  type CoverageTone,
} from "@/data/regional-coverage";

// ---------------------------------------------------------------------------
// Style constants
// ---------------------------------------------------------------------------

const BRAND = {
  dark: "#0D2A22",
  light: "#FFFFFF",
  lime: "#36B936",
  paper: "#FAFAF8",
} as const;

const ANIMATE_BASE = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");
const fadeIn = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10");

interface ToneStyle {
  background: string;
  text: string;
  textMuted: string;
  tagBorder: string;
  divider: string;
}

const TONE_STYLES: Record<CoverageTone, ToneStyle> = {
  dark: {
    background: BRAND.dark,
    text: BRAND.lime,
    textMuted: "rgba(54, 185, 54, 0.8)",
    tagBorder: "rgba(54, 185, 54, 0.35)",
    divider: "rgba(255, 255, 255, 0.14)",
  },
  light: {
    background: BRAND.light,
    text: BRAND.lime,
    textMuted: `${BRAND.lime}B3`,
    tagBorder: `${BRAND.lime}4D`,
    divider: `${BRAND.dark}1F`,
  },
  lime: {
    background: BRAND.lime,
    text: BRAND.light, // Changed to white
    textMuted: "rgba(255, 255, 255, 0.85)", // Muted white
    tagBorder: "rgba(255, 255, 255, 0.4)", // White-tinted border
    divider: "rgba(255, 255, 255, 0.2)", // White divider
  },
};

// ---------------------------------------------------------------------------
// Faceted pill tag
// ---------------------------------------------------------------------------

interface FacetTagProps {
  label: string;
  borderColor: string;
  textColor: string;
}

function FacetTag({ label, borderColor, textColor }: FacetTagProps) {
  return (
    <span
      className="inline-flex shrink-0 items-center whitespace-nowrap border px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-medium uppercase tracking-wider"
      style={{
        borderColor,
        color: textColor,
        clipPath: "polygon(12px 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0 50%)",
      }}
    >
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Stat column
// ---------------------------------------------------------------------------

interface StatColumnProps extends CoverageColumn {
  isVisible: boolean;
  delayMs: number;
}

function StatColumn({ value, suffix, label, tag, tone, text, isVisible, delayMs }: StatColumnProps) {
  const style = TONE_STYLES[tone];
  const isDarkTone = tone === "dark";
  const isLimeTone = tone === "lime";
  const paragraphs = text.split("\n\n");

  return (
    <div
      className={cx("relative min-w-0 flex-1 w-full", ANIMATE_BASE, fadeIn(isVisible))}
      style={{ backgroundColor: style.background, transitionDelay: `${150 + delayMs}ms` }}
    >
      <div className="flex h-full flex-col items-start gap-5 sm:gap-6 px-6 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-20">
        {/* Big number + suffix */}
        <div className="flex items-baseline gap-2.5 sm:gap-3 flex-wrap">
          <span className="text-4xl xs:text-5xl font-medium leading-none tracking-tight sm:text-6xl lg:text-7xl" style={{ color: style.text }}>
            {value}
          </span>
          <span
            className="text-xs sm:text-sm lg:text-base font-medium uppercase tracking-wider pb-1"
            style={{ color: style.text }}
          >
            {suffix}
          </span>
        </div>

        {/* Label + tag */}
        <div className="w-full">
          <h3
            className="mb-3 sm:mb-4 text-lg sm:text-xl font-medium tracking-tight lg:text-2xl"
            style={{ color: isDarkTone || isLimeTone ? BRAND.light : style.text }}
          >
            {label}
          </h3>
          <FacetTag label={tag} borderColor={style.tagBorder} textColor={style.textMuted} />
        </div>

        <div className="w-full pt-1 sm:pt-2" style={{ borderTop: `1px solid ${style.divider}` }} />

        {/* Body copy */}
        <div className="space-y-3 sm:space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-xs sm:text-sm font-normal leading-relaxed lg:text-[15px]"
              style={{ color: isDarkTone || isLimeTone ? "rgba(255, 255, 255, 0.85)" : style.textMuted }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export default function RegionalCoverageSection() {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#FAFAF8] px-4 py-12 font-['Manrope',sans-serif] sm:px-6 sm:py-16 md:px-12 lg:px-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className={cx("mb-3 sm:mb-4 text-center sm:mb-6", ANIMATE_BASE, fadeIn(isVisible))}>
          <h2 className="whitespace-pre-line text-2xl sm:text-3xl font-medium leading-tight tracking-tight text-[#0D2A22] md:text-4xl px-2">
            {REGIONAL_COVERAGE_HEADING}
          </h2>
        </div>

        <div className={cx("mx-auto mb-10 sm:mb-12 max-w-3xl text-center sm:mb-16 px-2", ANIMATE_BASE, fadeIn(isVisible))}>
          <p className="text-sm sm:text-base font-normal leading-relaxed text-[#2d6a4f] md:text-lg">
            {REGIONAL_COVERAGE_INTRO}
          </p>
        </div>

        <div className="relative rounded-2xl border border-[#e2ece9] shadow-sm">
          <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden">
            {REGIONAL_COVERAGE_COLUMNS.map((column, index) => (
              <StatColumn key={column.id} {...column} isVisible={isVisible} delayMs={index * 150} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}