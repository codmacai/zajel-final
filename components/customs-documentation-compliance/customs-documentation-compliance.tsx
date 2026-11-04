"use client";

import { useInView } from "@/hooks/useInView";

import { StatColumn } from "./stat-column";
import { CUSTOMS_DOCUMENTS, type CUSTOMS_DOCUMENTSContent } from '../customs-clearance/content';
import { cmsSection } from '@/components/cms/CmsProvider';

const ANIMATE_BASE = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
const fadeIn = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10");
const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

const COLUMN_DELAY_STEP_MS = 150;

function CustomsDocumentationCompliance({ content }: { content: CUSTOMS_DOCUMENTSContent }) {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-white overflow-hidden font-['Manrope',sans-serif]"
    >
      <div className="mx-auto max-w-7xl">
        <div className={cx("text-center mb-4 sm:mb-6 px-2", ANIMATE_BASE, fadeIn(isVisible))}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#1b4332] tracking-tight whitespace-pre-line leading-tight">
            {content.heading}
          </h2>
        </div>

        <div className={cx("max-w-3xl mx-auto text-center mb-10 sm:mb-16 px-2", ANIMATE_BASE, fadeIn(isVisible))}>
          <p className="text-[#2d6a4f] font-normal leading-relaxed text-sm sm:text-base md:text-lg">
            {content.intro}
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#e2ece9]">
          <div className="flex flex-col lg:flex-row">
            {content.columns.map((column, i) => (
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

export default cmsSection('customs-clearance.documents', CUSTOMS_DOCUMENTS, CustomsDocumentationCompliance);
