"use client";

import IndustryBlock from "@/components/industry-expertise/industry-block";
import { INDUSTRIES, INDUSTRY_EXPERTISE_EYEBROW } from "@/data/industry-expertise";

export default function IndustryExpertise() {
  return (
    <section className="relative w-full bg-white">
      <div className="relative z-[100] w-full bg-white px-5 sm:px-8 md:px-12 lg:px-20 pt-8 sm:pt-12 md:pt-14 pb-2 sm:pb-4">
        <div className="mx-auto max-w-[1280px] flex items-center justify-center gap-3">
          <span className="w-6 sm:w-8 h-[2px] shrink-0" style={{ backgroundColor: "#36B936" }} />
          <p
            className="font-['Manrope',sans-serif] font-medium uppercase text-center"
            style={{ fontSize: "clamp(0.75rem, 1vw, 0.875rem)", color: "#36B936", letterSpacing: "0.02em" }}
          >
            {INDUSTRY_EXPERTISE_EYEBROW}
          </p>
        </div>
      </div>

      {INDUSTRIES.map((industry, i) => (
        <IndustryBlock key={industry.index} industry={industry} zIndex={i + 1} />
      ))}
    </section>
  );
}