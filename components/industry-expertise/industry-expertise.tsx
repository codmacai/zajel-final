"use client";

import IndustryBlock from "@/components/industry-expertise/industry-block";
import { INDUSTRIES, INDUSTRY_EXPERTISE_EYEBROW } from "@/data/industry-expertise";

export default function IndustryExpertise() {
  return (
    <section className="relative w-full bg-white font-['Manrope',sans-serif]">
      {/* Header Sticky Bar */}
      <div className="relative z-[100] w-full bg-white px-5 sm:px-8 md:px-12 lg:px-20 pt-10 sm:pt-14 pb-4 sm:pb-6">
        <div className="mx-auto max-w-[1280px] flex items-center justify-center gap-3">
          <span className="w-6 sm:w-8 h-[2px] shrink-0 bg-[#36B936]" />
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#36B936]">
            {INDUSTRY_EXPERTISE_EYEBROW}
          </p>
          <span className="w-6 sm:w-8 h-[2px] shrink-0 bg-[#36B936]" />
        </div>
      </div>

      {/* Cards Wrapper */}
      <div className="relative w-full">
        {INDUSTRIES.map((industry, i) => (
          <IndustryBlock key={industry.index} industry={industry} zIndex={i + 1} />
        ))}
      </div>
    </section>
  );
}