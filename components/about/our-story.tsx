'use client';

import type { FC } from 'react';
import { motion, type Variants } from 'framer-motion';

// ---------------------------------------------------------------------------
// Constants & Brand Palette
// ---------------------------------------------------------------------------
const FOREST = '#0A4D26';
const LIME = '#36B936';

const EASE = [0.2, 0.8, 0.2, 1] as const;

// ---------------------------------------------------------------------------
// Content — verbatim copy
// ---------------------------------------------------------------------------
const defaultContent = {
  eyebrow: 'Our Story',
  paragraphFounding:
    'We were founded in Dubai in 2008, starting with a specific and demanding mandate: delivering Emirates IDs and passports on behalf of UAE government entities. That work required precision, security, and consistency from day one, standards that still shape how we operate today.',
  paragraphGrowth:
    "Since then, we've grown from a single government logistics service into a full logistics company in the UAE, supporting individuals, businesses, and government entities alike:",
  solutions: [
    {
      title: 'Individual Solutions',
      description: 'Same day and next day delivery, domestic and international',
    },
    {
      title: 'Business Solutions',
      description: 'E-commerce fulfillment and freight forwarding by air, sea, and land',
    },
    {
      title: 'Secure Solutions',
      description:
        'The government logistics work we were built on, still trusted by entities like MOFA, Dubai Courts, and Dubai Customs',
    },
  ],
};

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const staggerContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUpItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const OurStory: FC = () => {
  const data = defaultContent;

  return (
    <section className="w-full relative overflow-hidden py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white font-['Manrope',sans-serif]">
      {/* Background ambient glows */}
      <div
        className="absolute left-[-5%] top-[-5%] w-[45%] h-[65%] pointer-events-none opacity-50 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(10,77,38,0.05) 0%, rgba(10,77,38,0) 70%)' }}
      />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainerVariants}
          className="flex flex-col"
        >
          {/* Top section: eyebrow + statement paragraphs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 sm:mb-20 lg:mb-24 items-start">
            {/* Eyebrow label */}
            <motion.div variants={fadeUpItemVariants} className="lg:col-span-3 pt-1">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-6 sm:w-8" style={{ backgroundColor: LIME }} />
                <span className="text-xs sm:text-sm font-medium tracking-widest uppercase" style={{ color: LIME }}>
                  {data.eyebrow}
                </span>
              </div>
            </motion.div>

            {/* Story paragraphs */}
            <div className="lg:col-span-9 flex flex-col gap-6 sm:gap-8">
              <motion.p
                variants={fadeUpItemVariants}
                className="font-medium tracking-tight leading-[1.15] text-2xl sm:text-3xl md:text-5xl"
                style={{ color: FOREST }}
              >
                {data.paragraphFounding}
              </motion.p>

              <motion.p
                variants={fadeUpItemVariants}
                className="font-light text-base sm:text-lg leading-relaxed max-w-3xl"
                style={{ color: `${FOREST}B3` }}
              >
                {data.paragraphGrowth}
              </motion.p>
            </div>
          </div>

          {/* Minimal Solutions grid */}
          <motion.div
            variants={fadeUpItemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pt-10 sm:pt-14 border-t border-[#0A4D26]/15"
          >
            {data.solutions.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col pl-4 sm:pl-5 border-l border-[#0A4D26]/20 transition-colors duration-300 hover:border-[#0A4D26]"
              >
                <span className="text-[13px] font-light tracking-wide mb-3" style={{ color: `${FOREST}80` }}>
                  ({idx + 1})
                </span>

                <h3 className="text-base sm:text-lg font-medium tracking-tight mb-2" style={{ color: FOREST }}>
                  {item.title}
                </h3>
                
                <p className="font-light text-xs sm:text-sm leading-relaxed mt-auto" style={{ color: `${FOREST}B3` }}>
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;