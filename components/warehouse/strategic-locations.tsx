"use client";

import { useInView } from "@/hooks/useInView";
import LocationImageCard from "@/components/warehouse/location-image-card";
import {
  STRATEGIC_LOCATIONS_EYEBROW,
  STRATEGIC_LOCATIONS_HEADING,
  STRATEGIC_LOCATIONS_INTRO,
  STRATEGIC_LOCATIONS_CARDS,
} from "@/data/strategic-locations";

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");
const ANIMATE_BASE = "transition-all duration-800 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
const fade = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8");

const DARK = "#1b4332";
const LIME = "#36B936";

export default function StrategicLocations() {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="w-full py-10 sm:py-16 lg:py-24 px-3 sm:px-6 lg:px-10 bg-white overflow-hidden font-['Manrope',sans-serif]"
    >
      <div className="mx-auto max-w-[1320px]">
        {/* Section Header Tag */}
        <div className={cx("flex items-center justify-center gap-3 mb-3", ANIMATE_BASE, fade(isVisible))}>
          <h2 style={{ color: LIME }} className="font-medium text-xs sm:text-sm tracking-wider uppercase">
            {STRATEGIC_LOCATIONS_EYEBROW}
          </h2>
        </div>

        <div className={cx("text-center mb-3.5 px-2", ANIMATE_BASE, fade(isVisible))} style={{ transitionDelay: "80ms" }}>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight"
            style={{ color: DARK, lineHeight: 1.15 }}
          >
            {STRATEGIC_LOCATIONS_HEADING}
          </h2>
        </div>

        <div
          className={cx("text-center mb-8 sm:mb-12 lg:mb-14 px-3", ANIMATE_BASE, fade(isVisible))}
          style={{ transitionDelay: "160ms" }}
        >
          <p className="text-[13px] sm:text-[13.5px] lg:text-[14px] font-normal text-[#2d6a4f] max-w-xl mx-auto">
            {STRATEGIC_LOCATIONS_INTRO}
          </p>
        </div>

        {/* 2x2 Grid on mobile and foldables, 4-column layout on desktop */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-0 rounded-2xl overflow-hidden shadow-sm border"
          style={{ borderColor: `${DARK}1F` }}
        >
          {STRATEGIC_LOCATIONS_CARDS.map((card, i) => (
            <LocationImageCard key={card.id} {...card} isVisible={isVisible} delay={240 + i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}