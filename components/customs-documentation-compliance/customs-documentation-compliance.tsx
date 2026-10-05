"use client";

import { useInView } from "@/hooks/useInView";
import {
  DOC_COMPLIANCE_COLUMNS,
  DOC_COMPLIANCE_HEADING,
  DOC_COMPLIANCE_INTRO,
} from "@/data/customs-documentation-compliance";
import { StatColumn } from "./stat-column";

const ANIMATE_BASE = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
const fadeIn = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10");
const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

const COLUMN_DELAY_STEP_MS = 150;

export function CustomsDocumentationCompliance() {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-white overflow-hidden font-['Manrope',sans-serif]"
    >
      <div className="mx-auto max-w-7xl">
        <div className={cx("text-center mb-4 sm:mb-6 px-2", ANIMATE_BASE, fadeIn(isVisible))}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#1b4332] tracking-tight whitespace-pre-line leading-tight">
            {DOC_COMPLIANCE_HEADING}
          </h2>
        </div>

        <div className={cx("max-w-3xl mx-auto text-center mb-10 sm:mb-16 px-2", ANIMATE_BASE, fadeIn(isVisible))}>
          <p className="text-[#2d6a4f] font-normal leading-relaxed text-sm sm:text-base md:text-lg">
            {DOC_COMPLIANCE_INTRO}
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#e2ece9]">
          <div className="flex flex-col lg:flex-row">
            {DOC_COMPLIANCE_COLUMNS.map((column, i) => (
              <StatColumn
                key={column.id}
                {...column}
                isVisible={isVisible}
                delayOffset={i * COLUMN_DELAY_STEP_MS}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomsDocumentationCompliance;