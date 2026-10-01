'use client';

import type { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { API_ACCESS, EYEBROW, HEADING, INTEGRATIONS, INTRO } from './data';
import IntegrationCardTile from './integration-card';

const EASE = [0.22, 1, 0.36, 1] as const;
const smoothTransition = { duration: 0.7, ease: EASE };

const PlatformIntegrations: FC = () => {
  return (
    <section
      className="w-full overflow-hidden relative py-16 sm:py-24 lg:py-32 bg-white font-sans"
      aria-labelledby="platform-integrations-heading"
    >
      {/* Ambient glows scaled for ultra-wide and foldables */}
      <div className="absolute -top-24 -left-24 w-[320px] sm:w-[520px] h-[320px] sm:h-[520px] bg-[#36B936]/[0.10] blur-[100px] sm:blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-[30%] -right-16 w-[280px] sm:w-[460px] h-[280px] sm:h-[460px] bg-[#8FE38F]/[0.06] blur-[120px] sm:blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-[1080px] mx-auto relative z-10 px-4 sm:px-6 lg:px-10">
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
            id="platform-integrations-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl text-[#1b4332] font-medium tracking-tight leading-[1.2] max-w-[720px] mx-auto mb-4"
          >
            {HEADING}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.1 }}
            className="text-[#2d6a4f] font-light text-[13px] sm:text-[14px] leading-relaxed max-w-[520px] mx-auto px-2"
          >
            {INTRO}
          </motion.p>
        </div>

        {/* Integration cards — stacks gracefully on foldables / phones, dual-column on tablets & desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch mb-5 sm:mb-6">
          {INTEGRATIONS.map((card, i) => (
            <IntegrationCardTile key={card.id} {...card} index={i} />
          ))}
        </div>

        {/* General API access card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={smoothTransition}
          className="relative rounded-2xl sm:rounded-[2rem] p-6 sm:p-10 lg:p-12 overflow-hidden bg-[#FAFBF8] border border-[#0A4D26]/[0.12] shadow-[0_16px_40px_rgba(6,68,35,0.08)] flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12"
        >
          <div className="relative z-10 flex-1">
            <span className="inline-flex w-fit items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D2A22] mb-4 sm:mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#36B936]" />
              <span className="text-[#36B936] text-[0.65rem] sm:text-[0.7rem] font-medium tracking-[0.08em] uppercase">
                {API_ACCESS.label}
              </span>
            </span>

            <p className="text-[#2d6a4f] font-light text-[13px] sm:text-[14px] leading-relaxed max-w-[560px]">
              {API_ACCESS.text}
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <Link
              href={API_ACCESS.primaryUrl}
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-[#0A4D26] text-[#36B936] text-[0.75rem] sm:text-[0.8rem] font-medium tracking-[0.01em] hover:bg-[#0A4D26]/90 hover:scale-[1.02] transition-all duration-200 whitespace-nowrap text-center"
            >
              <span>{API_ACCESS.primaryCta}</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={API_ACCESS.secondaryUrl}
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-transparent border border-[#0A4D26]/25 text-[#0A4D26] text-[0.75rem] sm:text-[0.8rem] font-medium tracking-[0.01em] hover:bg-[#0A4D26]/5 transition-colors whitespace-nowrap text-center"
            >
              {API_ACCESS.secondaryCta}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformIntegrations;