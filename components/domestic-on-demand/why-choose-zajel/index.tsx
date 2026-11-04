'use client';

import type { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FeatureCardTile } from './feature-card';
import { DOMESTIC_WHY, type DOMESTIC_WHYContent } from '../content';
import { cmsSection } from '@/components/cms/CmsProvider';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
});

const WhyChooseZajel = ({ content }: { content: DOMESTIC_WHYContent }) => (
  <section
    className="w-full relative overflow-hidden py-16 sm:py-24 lg:py-32 bg-white font-sans"
    aria-labelledby="why-choose-heading"
  >
    <div className="max-w-[1200px] mx-auto relative z-10 px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="max-w-[680px] mx-auto text-center mb-10 sm:mb-16">
        <motion.div {...fade()} className="flex items-center justify-center gap-3 mb-4">
          <span className="text-[#36B936] font-medium text-xs sm:text-sm tracking-wider uppercase">
            {content.eyebrow}
          </span>
        </motion.div>

        <motion.h2
          id="why-choose-heading"
          {...fade(0.1)}
          className="text-2xl sm:text-3xl md:text-4xl text-[#0A4D26] font-medium tracking-tight mb-4"
        >
          {content.heading}
        </motion.h2>

        <motion.p
          {...fade(0.2)}
          className="text-[#2d6a4f] font-light text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed max-w-[520px] mx-auto"
        >
          {content.description}
        </motion.p>
      </div>

      {/* 2x2 Grid on Mobile (grid-cols-2), 4-Column on Desktop (md:grid-cols-4) */}
      <motion.div
        {...fade(0.3)}
        className="grid grid-cols-2 md:grid-cols-4 w-full bg-gray-200/80 gap-[1px] rounded-2xl sm:rounded-[2rem] border border-gray-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden"
      >
        {content.cards.map((card) => (
          <FeatureCardTile
            key={card.id}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </motion.div>
    </div>
  </section>
);

export default cmsSection('domestic-courier.why-zajel', DOMESTIC_WHY, WhyChooseZajel);
