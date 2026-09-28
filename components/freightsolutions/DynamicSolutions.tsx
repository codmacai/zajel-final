"use client";

import { useInView } from "@/hooks/useInView";
import SolutionCardTile from "./Solutioncardtile";
import type { SolutionCard, SolutionColumns } from "./types";

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");
const ANIMATE_BASE = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
const fade = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10");

// Static class strings so Tailwind can see them.
const GRID_BY_COLUMNS: Record<SolutionColumns, string> = {
  2: "sm:grid-cols-2 max-w-[1100px] mx-auto",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

const SIZES_BY_COLUMNS: Record<SolutionColumns, string> = {
  2: "(min-width: 640px) 50vw, 100vw",
  3: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  4: "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
};

export interface DynamicSolutionsProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  cards: SolutionCard[];
  columns?: SolutionColumns;
  /** Tailwind background class for the section */
  bgClassName?: string;
}

export default function DynamicSolutions({
  eyebrow,
  heading,
  subheading,
  cards,
  columns = 4,
  bgClassName = "bg-slate-50/50",
}: DynamicSolutionsProps) {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className={cx(
        "w-full py-14 sm:py-20 lg:py-24 px-5 sm:px-8 md:px-12 lg:px-20 overflow-hidden font-['Manrope',sans-serif]",
        bgClassName
      )}
    >
      <div className="mx-auto max-w-[1320px]">
        <div className={cx("text-center mb-8 sm:mb-12 lg:mb-14", ANIMATE_BASE, fade(isVisible))}>
          {eyebrow && (
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
              <span className="w-6 sm:w-8 h-[2px] shrink-0 bg-[#36B936]" />
              <span className="text-[#36B936] font-medium text-xs sm:text-sm tracking-wider uppercase">
                {eyebrow}
              </span>
            </div>
          )}

          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0D2A22] font-medium tracking-tight leading-[1.15] max-w-[720px] mx-auto whitespace-pre-line text-balance">
            {heading}
          </h2>

          {subheading && (
            <p className="mt-4 sm:mt-5 text-[#0D2A22]/75 font-normal text-sm sm:text-base lg:text-[1.05rem] leading-relaxed max-w-[560px] mx-auto text-balance">
              {subheading}
            </p>
          )}
        </div>

        <div className={cx("grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8", GRID_BY_COLUMNS[columns])}>
          {cards.map((card, i) => (
            <SolutionCardTile
              key={card.id ?? i}
              {...card}
              sizes={SIZES_BY_COLUMNS[columns]}
              isVisible={isVisible}
              delayOffset={i * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}