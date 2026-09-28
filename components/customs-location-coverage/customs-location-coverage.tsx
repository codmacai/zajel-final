"use client";

import { useInView } from "@/hooks/useInView";
import {
  FREE_ZONE_NOTE,
  LOCATION_COVERAGE_HEADING,
  LOCATION_COVERAGE_INTRO,
  LOCATION_GROUPS,
} from "@/data/customs-location-coverage";
import { InfoIcon } from "./icons";
import { LocationImageBar } from "./location-image-bar";

const ANIMATE_BASE = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
const fadeIn = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10");
const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

const CARD_DELAY_STEP_MS = 120;

export function CustomsLocationCoverage() {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#F7FAF6] overflow-hidden font-['Manrope',sans-serif]"
    >
      <div className="mx-auto max-w-7xl">
        <div className={cx("text-center mb-4 sm:mb-6 px-2", ANIMATE_BASE, fadeIn(isVisible))}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#1b4332] tracking-tight whitespace-pre-line leading-tight">
            {LOCATION_COVERAGE_HEADING}
          </h2>
        </div>

        <div className={cx("max-w-3xl mx-auto text-center mb-10 sm:mb-16 px-2", ANIMATE_BASE, fadeIn(isVisible))}>
          <p className="text-[#2d6a4f] font-normal leading-relaxed text-sm sm:text-base md:text-lg">
            {LOCATION_COVERAGE_INTRO}
          </p>
        </div>

        {/*
          gap-px + bg-[#e2ece9] draws a 1px seam between every card automatically,
          regardless of how many columns wrap per row at each breakpoint (1 / 2 / 4).
          overflow-hidden + rounded-2xl on this wrapper clips the whole block into
          one seamless rounded bar with no per-card corner logic needed.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e2ece9] rounded-2xl overflow-hidden border border-[#e2ece9] shadow-sm">
          {LOCATION_GROUPS.map((group, i) => (
            <LocationImageBar
              key={group.id}
              {...group}
              isVisible={isVisible}
              delayOffset={i * CARD_DELAY_STEP_MS}
            />
          ))}
        </div>

        <div
          className={cx(
            "mt-10 sm:mt-16 bg-white border border-[#e2ece9] rounded-2xl p-5 sm:p-8 lg:p-10 flex flex-col sm:flex-row gap-4 sm:gap-6 shadow-sm",
            ANIMATE_BASE,
            fadeIn(isVisible)
          )}
          style={{ transitionDelay: `${200 + LOCATION_GROUPS.length * CARD_DELAY_STEP_MS}ms` }}
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#f8faf9] border border-[#e2ece9] rounded-full flex items-center justify-center shrink-0">
            <InfoIcon />
          </div>
          <p className="text-[#2d6a4f] font-normal leading-relaxed text-xs sm:text-base md:text-lg">
            {FREE_ZONE_NOTE}
          </p>
        </div>
      </div>
    </section>
  );
}

export default CustomsLocationCoverage;