'use client';

import { motion } from 'framer-motion';
import { HEADING, BUSINESS_CARDS } from './data';
import BusinessGetsCard from './business-gets-card';

const LIGHT_GREEN = '#36B936';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
});

const BusinessGetsSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-12 font-sans sm:py-20 lg:py-28 xl:py-32">
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-[680px] text-center sm:mb-14 lg:mb-16">
          <motion.div {...fade()} className="mb-3 flex items-center justify-center gap-3 sm:mb-4">
            <span
              className="text-xs sm:text-sm font-medium uppercase tracking-wider"
              style={{ color: LIGHT_GREEN }}
            >
              Core Benefits
            </span>
          </motion.div>

          <motion.h2
            {...fade(0.1)}
            className="whitespace-pre-line text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight text-[#0A4D26]"
          >
            {HEADING}
          </motion.h2>
        </div>

        {/*
          Card grid — 2 columns on phones and tablets, 3 across on large screens.
          `gap-px` over a tinted background draws the divider lines.
        */}
        <motion.div
          {...fade(0.3)}
          className="grid w-full grid-cols-2 items-stretch gap-px overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] sm:rounded-[2rem] lg:grid-cols-3"
        >
          {BUSINESS_CARDS.map((card, i) => (
            <BusinessGetsCard key={card.title} {...card} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessGetsSection;