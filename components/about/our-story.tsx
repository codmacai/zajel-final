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
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const OurStory: FC = () => {
  const data = defaultContent;

  return (
    <section className="w-full overflow-hidden bg-white px-4 py-14 font-['Manrope',sans-serif] sm:px-6 sm:py-20 lg:px-12 lg:py-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
        className="mx-auto w-full max-w-[1100px]"
      >
        {/* Left-aligned editorial text flow */}
        <div className="flex flex-col items-start space-y-6 sm:space-y-8">
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="pt-3">
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-[7px] w-[7px] shrink-0" style={{ backgroundColor: LIME }} />
              <span
                className="text-[11px] font-medium uppercase leading-none tracking-[0.1em] sm:text-xs"
                style={{ color: FOREST }}
              >
                {data.eyebrow}
              </span>
            </div>
          </motion.div>

          {/* Big statement */}
          <motion.p
            variants={itemVariants}
            className="max-w-[42ch] text-[1.5rem] font-normal leading-[1.22] tracking-[-0.02em] [text-wrap:pretty] sm:text-[1.875rem] md:text-4xl lg:text-[2.25rem] xl:text-[2.6rem]"
            style={{ color: FOREST }}
          >
            {data.paragraphFounding}
          </motion.p>

          {/* Supporting text */}
          <motion.p
            variants={itemVariants}
            className="max-w-[65ch] text-[11px] font-medium uppercase leading-[1.8] tracking-[0.06em] sm:text-xs"
            style={{ color: `${FOREST}B3` }}
          >
            {data.paragraphGrowth}
          </motion.p>
        </div>

        {/* Solutions */}
        <motion.ul
          variants={itemVariants}
          className="mt-14 grid grid-cols-1 gap-8 border-t border-[#0A4D26]/15 pt-8 sm:mt-16 sm:gap-10 sm:pt-10 md:grid-cols-3 md:gap-8 lg:mt-20 lg:gap-12"
        >
          {data.solutions.map((item, idx) => (
            <li
              key={item.title}
              className="flex flex-col border-l border-[#0A4D26]/20 pl-4 transition-colors duration-300 hover:border-[#0A4D26] sm:pl-5"
            >
              <span
                aria-hidden="true"
                className="mb-3 text-[11px] font-medium leading-none tracking-wide"
                style={{ color: `${FOREST}80` }}
              >
                ({idx + 1})
              </span>

              <h3
                className="mb-2 text-base font-medium leading-snug tracking-tight sm:text-lg"
                style={{ color: FOREST }}
              >
                {item.title}
              </h3>

              <p className="text-[13px] font-light leading-relaxed sm:text-sm" style={{ color: `${FOREST}B3` }}>
                {item.description}
              </p>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
};

export default OurStory;