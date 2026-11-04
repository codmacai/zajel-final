"use client";

import { useInView } from "@/hooks/useInView";

import { ClearanceCardTile } from "./clearance-card";
import { CUSTOMS_SERVICES, type CUSTOMS_SERVICESContent } from './content';
import { cmsSection } from '@/components/cms/CmsProvider';

const ANIMATE_BASE = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
const fadeIn = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10");
const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

const CARD_DELAY_STEP_MS = 150;

function CustomsClearanceServices({ content }: { content: CUSTOMS_SERVICESContent }) {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-white overflow-hidden font-['Manrope',sans-serif]"
    >
      <div className="mx-auto max-w-7xl">
        <div className={cx("text-center mb-6 sm:mb-8", ANIMATE_BASE, fadeIn(isVisible))}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#1b4332] tracking-tight whitespace-pre-line leading-tight px-2">
            {content.heading}
          </h2>
        </div>

        <div className={cx("max-w-3xl mx-auto text-center mb-10 sm:mb-16 px-2", ANIMATE_BASE, fadeIn(isVisible))}>
          <p className="text-[#2d6a4f] font-normal leading-relaxed text-sm sm:text-base md:text-lg">
            {content.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {content.cards.map((card, i) => (
            <ClearanceCardTile
              key={card.id}
              {...card}
              isVisible={isVisible}
              delayOffset={i * CARD_DELAY_STEP_MS}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default cmsSection('customs-clearance.services', CUSTOMS_SERVICES, CustomsClearanceServices);
