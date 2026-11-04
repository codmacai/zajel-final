"use client";

import IndustryBlock from "@/components/industry-expertise/industry-block";
import { INDUSTRY_EXPERTISE, type INDUSTRY_EXPERTISEContent } from './content';
import { cmsSection } from '@/components/cms/CmsProvider';

function IndustryExpertise({ content }: { content: INDUSTRY_EXPERTISEContent }) {
  return (
    <section className="relative w-full bg-white font-['Manrope',sans-serif]">
      {/* Header Sticky Bar */}
      <div className="relative z-[100] w-full bg-white px-5 sm:px-8 md:px-12 lg:px-20 pt-10 sm:pt-14 pb-4 sm:pb-6">
        <div className="mx-auto max-w-[1280px] flex items-center justify-center gap-3">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#36B936]">
            {content.eyebrow}
          </p>
        </div>
      </div>

      {/* Cards Wrapper */}
      <div className="relative w-full">
        {content.industries.map((industry, i) => (
          <IndustryBlock key={industry.index} industry={industry} zIndex={i + 1} />
        ))}
      </div>
    </section>
  );
}

export default cmsSection('industry.expertise', INDUSTRY_EXPERTISE, IndustryExpertise);
