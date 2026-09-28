"use client";

import { useInView } from "@/hooks/useInView";
import SolutionCardTile from "@/components/warehouse/solution-card-tile";
import {
  WAREHOUSING_SOLUTIONS_EYEBROW,
  WAREHOUSING_SOLUTIONS_HEADING,
  WAREHOUSING_SOLUTIONS_CARDS,
} from "@/data/warehousing-solutions";

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");
const ANIMATE_BASE = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
const fade = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10");

export default function WarehousingSolutions() {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="w-full py-14 sm:py-20 lg:py-24 px-5 sm:px-8 md:px-12 lg:px-20 bg-slate-50/50 overflow-hidden font-['Manrope',sans-serif]"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className={cx("text-center mb-8 sm:mb-12 lg:mb-14", ANIMATE_BASE, fade(isVisible))}>
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
            <span className="w-6 sm:w-8 h-[2px] shrink-0" style={{ backgroundColor: "#36B936" }} />
            <span style={{ color: "#36B936" }} className="font-medium text-xs sm:text-sm tracking-wider uppercase">
              {WAREHOUSING_SOLUTIONS_EYEBROW}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0D2A22] font-medium tracking-tight leading-[1.15] max-w-[720px] mx-auto whitespace-pre-line">
            {WAREHOUSING_SOLUTIONS_HEADING}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {WAREHOUSING_SOLUTIONS_CARDS.map((card, i) => (
            <SolutionCardTile key={card.id} {...card} isVisible={isVisible} delayOffset={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}
