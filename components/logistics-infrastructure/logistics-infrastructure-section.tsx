"use client";

import { useInView } from "@/hooks/useInView";
import {
  LOGISTICS_INFRASTRUCTURE_CARDS,
  LOGISTICS_INFRASTRUCTURE_EYEBROW,
  LOGISTICS_INFRASTRUCTURE_HEADING,
} from "@/data/logistics-infrastructure";

const LIME = "#36B936";

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");
const ANIMATE_BASE = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
const fadeIn = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8");

export default function LogisticsInfrastructureSection() {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>();

  return (
    <section ref={sectionRef} className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 font-['Manrope',sans-serif]">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 md:px-12 lg:px-20">
        <div className={cx("mb-10 sm:mb-12 md:mb-16 text-center", ANIMATE_BASE, fadeIn(isVisible))}>
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="text-xs sm:text-sm font-medium uppercase tracking-[0.22em]" style={{ color: LIME }}>
              {LOGISTICS_INFRASTRUCTURE_EYEBROW}
            </span>
          </div>

          <h2 className="mx-auto max-w-[720px] text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight text-[#1b4332]">
            {LOGISTICS_INFRASTRUCTURE_HEADING}
          </h2>
        </div>

        <div
          className={cx(
            "grid grid-cols-1 overflow-hidden rounded-2xl border border-[#1b4332]/15 shadow-sm md:grid-cols-3",
            ANIMATE_BASE,
            fadeIn(isVisible)
          )}
          style={{ transitionDelay: "150ms" }}
        >
          {LOGISTICS_INFRASTRUCTURE_CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={cx(
                  "group flex min-h-[340px] sm:min-h-[380px] flex-col justify-between bg-white p-6 sm:p-8 transition-colors duration-300 hover:bg-[#36B936]",
                  // Add bottom border for mobile stacked cards except the last one
                  index !== LOGISTICS_INFRASTRUCTURE_CARDS.length - 1 && "border-b border-[#1b4332]/15 md:border-b-0",
                  // Add right border for desktop grid columns
                  "md:border-r md:last:border-r-0"
                )}
              >
                <div>
                  <span className="mb-6 sm:mb-8 block text-[11px] font-medium tracking-wide text-[#1b4332]/40 transition-colors duration-300 group-hover:text-white/70">
                    {card.number}.
                  </span>

                  <Icon
                    className="mb-6 sm:mb-8 h-8 w-8 sm:h-10 sm:w-10 text-[#36B936] transition-colors duration-300 group-hover:text-white"
                    strokeWidth={1.25}
                  />

                  <h3 className="mb-2 text-lg sm:text-xl font-medium tracking-tight leading-snug text-[#1b4332] transition-colors duration-300 group-hover:text-white md:text-2xl">
                    {card.title}
                  </h3>
                </div>

                <p className="mt-2 text-xs sm:text-sm font-normal leading-relaxed text-[#2d6a4f] transition-colors duration-300 group-hover:text-white/85">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}