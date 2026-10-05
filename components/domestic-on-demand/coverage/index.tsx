'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';

const ROW_1 = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'];
const ROW_2 = ['Fujairah', 'Ras Al Khaimah', 'Umm Al Quwain'];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const listContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const CoverageMap: FC = () => {
  return (
    <section
      className="relative w-full bg-white overflow-hidden py-16 sm:py-20 lg:py-28 font-sans"
      aria-labelledby="coverage-heading"
    >
      {/* Section eyebrow + heading */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center mb-6 sm:mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
          <span className="text-[#36B936] text-xs sm:text-sm font-medium tracking-wider uppercase">
            Our Coverage
          </span>
        </div>
        <h2
          id="coverage-heading"
          className="text-[#0A4D26] text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-[1.15]"
        >
          We deliver across the UAE
        </h2>
      </motion.div>

      {/* Map container optimized for all screen form factors */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="relative w-full flex justify-center px-4 sm:px-6"
      >
        <div className="relative w-full max-w-4xl">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] min-h-[300px] sm:min-h-[400px]">
            <Image
              src="/ChatGPTImageSep27202603_43_00PM.webp"
              alt="Map of the UAE showing Zajel's delivery coverage"
              fill
              priority
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-contain object-bottom mix-blend-multiply"
            />
          </div>

          {/* Emirate list overlay — strict horizontal rows (4 top, 3 bottom) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={listContainer}
            className="absolute inset-x-0 top-3 sm:top-6 lg:top-8 flex flex-col items-center px-4 pointer-events-none"
          >
            <div className="w-full max-w-2xl lg:max-w-3xl flex flex-col items-center gap-2 sm:gap-3 bg-white/60 sm:bg-transparent backdrop-blur-[2px] sm:backdrop-blur-none p-3.5 sm:p-0 rounded-2xl">
              {/* Row 1: exactly 4 items in a horizontal line */}
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-x-6 sm:gap-x-10 lg:gap-x-14 gap-y-2 pointer-events-auto w-full">
                {ROW_1.map((city) => (
                  <motion.div
                    key={city}
                    variants={listItem}
                    className="flex items-center gap-2 [text-shadow:_0_1px_4px_rgb(255_255_255_/_90%)] shrink-0"
                  >
                    <span className="w-[5px] sm:w-[6px] h-[5px] sm:h-[6px] rounded-full bg-[#36B936] shrink-0" />
                    <span className="text-[11px] sm:text-[13px] lg:text-[14px] font-medium text-[#0A4D26] whitespace-nowrap">
                      {city}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Row 2: exactly 3 items in a horizontal line */}
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-x-6 sm:gap-x-10 lg:gap-x-14 gap-y-2 pointer-events-auto w-full">
                {ROW_2.map((city) => (
                  <motion.div
                    key={city}
                    variants={listItem}
                    className="flex items-center gap-2 [text-shadow:_0_1px_4px_rgb(255_255_255_/_90%)] shrink-0"
                  >
                    <span className="w-[5px] sm:w-[6px] h-[5px] sm:h-[6px] rounded-full bg-[#36B936] shrink-0" />
                    <span className="text-[11px] sm:text-[13px] lg:text-[14px] font-medium text-[#0A4D26] whitespace-nowrap">
                      {city}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CoverageMap;