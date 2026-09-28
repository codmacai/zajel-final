'use client';

import { motion } from 'framer-motion';
import { HEADING, BUSINESS_CARDS } from './data';
import BusinessGetsCard from './business-gets-card';

const SMOOTH_TRANSITION = {
  type: "spring" as const,
  damping: 25,
  stiffness: 120,
};

const LIGHT_GREEN = "#36B936";

const BusinessGetsSection = () => {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10 bg-white overflow-hidden font-['Manrope',sans-serif]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ...SMOOTH_TRANSITION, duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="mb-3 sm:mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-6 sm:w-8" style={{ backgroundColor: LIGHT_GREEN }} />
            <span className="text-xs sm:text-sm font-medium tracking-wider uppercase" style={{ color: LIGHT_GREEN }}>
              Core Benefits
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0A4D26] font-medium tracking-tight leading-[1.15] whitespace-pre-line px-2">
            {HEADING}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {BUSINESS_CARDS.map((card, i) => (
            <BusinessGetsCard key={card.title} {...card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessGetsSection;