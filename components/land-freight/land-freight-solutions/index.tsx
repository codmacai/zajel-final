'use client';

import { motion } from 'framer-motion';
import { EYEBROW, HEADING, SUBHEADING, LAND_FREIGHT_CARDS } from './data';
import FreightCardTile from './freight-card-tile';

const EASE = [0.2, 0.8, 0.2, 1] as const;

const LandFreightSolutions = () => {
  return (
    <section className="w-full bg-[#F9FAFB] py-[clamp(3rem,6vw,5.5rem)] font-sans overflow-hidden">
      <div className="mx-auto max-w-[1320px] px-[clamp(1rem,4vw,3.5rem)]">
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mb-[clamp(2rem,4vw,3rem)] max-w-[720px] text-center"
        >
          <div className="mb-2.5 flex items-center justify-center gap-2.5 sm:gap-3">
            <span className="h-[2px] w-6 bg-[#36B936] sm:w-8" />
            <span className="text-[clamp(0.6875rem,0.75vw,0.8125rem)] font-medium uppercase tracking-wider text-[#36B936]">
              {EYEBROW}
            </span>
          </div>

          {/* Calibrated Medium Desktop Heading Size */}
          <h2 className="text-balance text-xl sm:text-2xl md:text-3xl lg:text-[2.125rem] font-medium leading-[1.2] tracking-tight text-[#0A4D26]">
            {HEADING}
          </h2>

          <p className="mx-auto mt-3 max-w-[540px] text-balance font-light leading-relaxed text-[#0A4D26]/80 text-xs sm:text-sm md:text-base">
            {SUBHEADING}
          </p>
        </motion.div>

        {/* Responsive Grid */}
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-7">
          {LAND_FREIGHT_CARDS.map((card, i) => (
            <FreightCardTile key={card.id ?? i} {...card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandFreightSolutions;