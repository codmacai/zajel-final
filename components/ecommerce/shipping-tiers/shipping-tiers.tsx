'use client';

import type { FC } from 'react';
import { motion } from 'framer-motion';
import { EYEBROW, FOOTNOTE, HEADING_LINE_1, HEADING_LINE_2, INTRO, TIERS } from './data';
import TierCard from './tier-card';

const EASE = [0.22, 1, 0.36, 1] as const;
const smoothTransition = { duration: 0.7, ease: EASE };

const ShippingTiers: FC = () => {
  return (
    <section
      className="w-full overflow-hidden relative py-16 sm:py-24 lg:py-32 bg-white font-sans"
      aria-labelledby="shipping-tiers-heading"
    >
      {/* Ambient glows scaled for foldables & smaller displays */}
      <div className="absolute top-1/4 -left-24 w-[320px] sm:w-[520px] h-[320px] sm:h-[520px] bg-[#36B936]/[0.10] blur-[100px] sm:blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 -right-16 w-[280px] sm:w-[460px] h-[280px] sm:h-[460px] bg-[#8FE38F]/[0.06] blur-[120px] sm:blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-[1180px] mx-auto relative z-10 px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-[640px] mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
            className="flex items-center justify-center gap-3 sm:gap-4 mb-4"
          >
            <span style={{ color: '#36B936' }} className="font-medium text-xs sm:text-sm tracking-wider uppercase">
              {EYEBROW}
            </span>
          </motion.div>

          <motion.h2
            id="shipping-tiers-heading"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl text-[#0A4D26] font-medium tracking-tight leading-[1.15] max-w-[720px] mx-auto mb-4"
          >
            {HEADING_LINE_1} {HEADING_LINE_2}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.1 }}
            className="text-[#2d6a4f] font-light text-[13px] sm:text-[14px] leading-relaxed max-w-[520px] mx-auto px-2"
          >
            {INTRO}
          </motion.p>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {TIERS.map((tier, i) => (
            <TierCard key={tier.id} {...tier} position={i} />
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...smoothTransition, delay: 0.35 }}
          className="text-[#2d6a4f]/70 text-[0.75rem] sm:text-[0.82rem] font-light text-center mt-10 sm:mt-12 lg:mt-14 px-4"
        >
          {FOOTNOTE}
        </motion.p>
      </div>
    </section>
  );
};

export default ShippingTiers;