'use client';

import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { INTERNATIONAL_WHY, type INTERNATIONAL_WHYContent } from '../content';
import { cmsSection } from '@/components/cms/CmsProvider';

const LIGHT_GREEN = '#36B936';

interface FeatureCardTileProps {
  Icon: ComponentType;
  title: string;
  description: string;
}

const FeatureCardTile = ({ Icon, title, description }: FeatureCardTileProps) => (
  <div className="group relative flex h-full min-h-[190px] cursor-pointer flex-col bg-[#F9FAFB] p-4 transition-colors duration-300 hover:bg-[#36B936] active:bg-[#36B936] min-[400px]:min-h-[210px] min-[400px]:p-5 sm:min-h-[250px] sm:p-7 lg:min-h-[300px] lg:p-8">
    <div className="flex h-full flex-col justify-between gap-4">
      <div>
        {/* Icon: green by default, white on hover */}
        <div className="mb-3 text-[#36B936] transition-colors duration-300 group-hover:text-white group-active:text-white sm:mb-4">
          <Icon />
        </div>

        {/* Title */}
        <h3 className="text-[0.95rem] font-medium leading-snug tracking-tight text-[#0A4D26] transition-colors duration-300 group-hover:text-white group-active:text-white min-[400px]:text-base sm:text-lg lg:text-[1.25rem]">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-[0.7rem] font-light leading-relaxed text-[#2D6A4F] transition-colors duration-300 group-hover:text-white/90 group-active:text-white/90 min-[400px]:text-xs sm:text-sm">
        {description}
      </p>
    </div>
  </div>
);

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
});

// ---------------------------------------------------------------------------
// Section Component
// ---------------------------------------------------------------------------
const WhyShipInternationally = ({ content }: { content: INTERNATIONAL_WHYContent }) => (
  <section className="relative w-full overflow-hidden bg-white py-12 font-sans sm:py-20 lg:py-28 xl:py-32">
    <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="mx-auto mb-10 max-w-[680px] text-center sm:mb-14 lg:mb-16">
        <motion.div {...fade()} className="mb-3 flex items-center justify-center gap-3 sm:mb-4">
          <span
            className="text-xs sm:text-sm font-medium uppercase tracking-wider"
            style={{ color: LIGHT_GREEN }}
          >
            {content.eyebrow}
          </span>
        </motion.div>

        <motion.h2
          {...fade(0.1)}
          className="mb-3 text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight text-[#0A4D26] sm:mb-4"
        >
          {content.heading}
        </motion.h2>

        <motion.p
          {...fade(0.2)}
          className="mx-auto max-w-[520px] text-[13px] sm:text-[13.5px] lg:text-[14px] font-light leading-relaxed text-[#2D6A4F]"
        >
          {content.description}
        </motion.p>
      </div>

      {/*
        Card grid — 2 x 2 on phones and tablets, 4 across on large screens.
        `gap-px` over a tinted background draws the divider lines, so borders
        stay correct in every layout without divide-x / divide-y juggling.
      */}
      <motion.div
        {...fade(0.3)}
        className="grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] sm:rounded-[2rem] lg:grid-cols-4"
      >
        {content.cards.map((card) => (
          <FeatureCardTile
            key={card.id}
            Icon={card.Icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </motion.div>
    </div>
  </section>
);

export default cmsSection('international-courier.why', INTERNATIONAL_WHY, WhyShipInternationally);
