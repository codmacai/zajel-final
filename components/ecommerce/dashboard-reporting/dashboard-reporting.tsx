'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckIcon } from './icons';
import { DASHBOARD_IMAGE, EYEBROW, FEATURES, HEADING, INTRO } from './data';

const EASE = [0.22, 1, 0.36, 1] as const;
const smoothTransition = { duration: 0.6, ease: EASE };

const DashboardReporting: FC = () => {
  return (
    <section
      className="w-full relative flex flex-col justify-center bg-gradient-to-br from-[#0D2A22] via-[#0A4D26] to-[#042B18] text-white py-16 sm:py-24 lg:py-32 overflow-hidden font-sans"
      aria-labelledby="dashboard-reporting-heading"
    >
      {/* Ambient glows scaled for smaller/foldable displays */}
      <div className="absolute top-1/4 -left-20 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-[#36B936]/15 blur-[100px] sm:blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 -right-20 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-[#36B936]/10 blur-[100px] sm:blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-[1280px] w-full mx-auto relative z-10 px-4 sm:px-6 lg:px-10 flex flex-col justify-center">
        {/* Section header */}
        <div className="max-w-[700px] mx-auto text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
            className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4"
          >
            <span className="w-6 sm:w-8 h-[2px]" style={{ backgroundColor: '#36B936' }} />
            <span style={{ color: '#36B936' }} className="font-medium text-xs sm:text-sm tracking-wider uppercase">
              {EYEBROW}
            </span>
            <span className="w-6 sm:w-8 h-[2px]" style={{ backgroundColor: '#36B936' }} />
          </motion.div>

          <motion.h2
            id="dashboard-reporting-heading"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl text-white font-medium tracking-tight leading-[1.2] max-w-[720px] mx-auto mb-3 sm:mb-4"
          >
            {HEADING}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.1 }}
            className="text-white/70 font-light text-[13px] sm:text-[14px] leading-relaxed max-w-[540px] mx-auto px-2"
          >
            {INTRO}
          </motion.p>
        </div>

        {/* Two-column split optimized for foldables & tablets */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          {/* Left: floating UI frame with full cover image and overlapping nav */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.15 }}
            className="lg:col-span-6 w-full flex flex-col justify-between relative rounded-2xl overflow-hidden border border-[#36B936]/30 shadow-[0_25px_60px_rgba(0,0,0,0.5)] min-h-[340px] sm:min-h-[400px] lg:min-h-full group"
          >
            {/* Full coverage background image */}
            <div className="absolute inset-0 w-full h-full z-0">
              <Image
                src={DASHBOARD_IMAGE}
                alt="Zajel Merchant Dashboard Preview"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top"
              />
              {/* Subtle gradient overlay to keep nav/frame crisp */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40 pointer-events-none" />
            </div>

            {/* Nav buttons overlay on top of the image */}
            <div className="relative z-10 flex items-center justify-between px-5 py-4 bg-black/40 backdrop-blur-md border-b border-white/15">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
            </div>

            {/* Spacer to allow full image viewing */}
            <div className="relative z-10 flex-1 pointer-events-none" />
          </motion.div>

          {/* Right: features list */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-between gap-3 sm:gap-3.5"
          >
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...smoothTransition, delay: 0.12 + index * 0.05 }}
                className="group p-4 sm:p-5 rounded-xl bg-white/[0.06] border border-white/10 shadow-sm hover:border-[#36B936]/50 hover:bg-white/[0.09] transition-all duration-300 flex-1 flex flex-col justify-center backdrop-blur-md"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-[#36B936] group-hover:bg-[#36B936] group-hover:text-white group-hover:border-[#36B936] transition-colors shrink-0 mt-0.5">
                    <CheckIcon />
                  </div>
                  <div>
                    <h3 className="text-white text-[0.9rem] sm:text-[0.95rem] font-medium tracking-tight mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 text-[0.75rem] sm:text-[0.8rem] font-light leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardReporting;