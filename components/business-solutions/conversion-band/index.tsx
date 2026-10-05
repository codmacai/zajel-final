'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { QuoteIcon, TeamIcon, CalculatorIcon } from '../icons';
import { ctaButtons, conversionBandContent } from '../data';

const EASE = [0.16, 1, 0.3, 1] as const;

const iconMap = {
  quote: QuoteIcon,
  team: TeamIcon,
  calculator: CalculatorIcon,
} as const;

export default function ConversionBand() {
  return (
    <section className="flex w-full flex-col justify-center px-4 py-10 sm:px-6 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative mx-auto w-full overflow-hidden rounded-3xl"
        style={{ maxWidth: 'clamp(1100px, 88vw, 1440px)' }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(120% 160% at 6% 20%, #0A3D22 0%, #073018 40%, #052611 70%, #031a0d 100%)' }}
        />
        <div
          className="absolute inset-0 opacity-70 mix-blend-screen"
          style={{
            background:
              'linear-gradient(115deg, transparent 30%, rgba(54,185,54,0.18) 45%, rgba(110,231,183,0.25) 50%, rgba(54,185,54,0.18) 55%, transparent 70%)',
          }}
        />
        <svg className="absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden="true">
          <defs>
            <pattern id="business-cta-dots" width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.4" fill="#ffffff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#business-cta-dots)" />
        </svg>
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[240px] w-[520px] -translate-x-1/2 rounded-full opacity-40 blur-[90px]"
          style={{ background: 'radial-gradient(circle, rgba(54,185,54,0.5), transparent 70%)' }}
        />

        <div className="relative z-10 px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-[clamp(48px,7vw,88px)]">
          <div className="absolute right-5 top-5 grid grid-cols-2 grid-rows-2 gap-1 sm:right-7 sm:top-7">
            <span className="h-2 w-2 rounded-sm bg-white/55" />
            <span className="h-2 w-2 rounded-sm bg-white/55" />
            <span className="h-2 w-2 rounded-sm bg-white/55" />
            <span className="h-2 w-2 rounded-sm bg-white/30" />
          </div>

          <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-[#36B936]">
            {conversionBandContent.eyebrow}
          </p>

          <p className="mx-auto mb-5 max-w-[62ch] text-center text-[clamp(20px,2.2vw,26px)] font-normal uppercase leading-[1.4] tracking-[0.01em] text-white sm:mb-7">
            {conversionBandContent.heading}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5">
            {ctaButtons.map((btn) => {
              const Icon = iconMap[btn.id];
              return (
                <Link
                  key={btn.id}
                  href={btn.url}
                  className={`inline-flex h-[clamp(52px,5.5vw,60px)] items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-[clamp(24px,2.6vw,36px)] text-[clamp(14px,1.3vw,16px)] font-medium tracking-[0.01em] transition-all duration-250 ${
                    btn.variant === 'primary'
                      ? 'bg-white text-[#164A16] shadow-[0_14px_28px_-12px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-12px_rgba(0,0,0,0.45)]'
                      : 'border-[1.5px] border-white/55 bg-white/[0.12] text-white hover:-translate-y-0.5 hover:bg-white/20'
                  }`}
                >
                  <Icon />
                  {btn.label}
                </Link>
              );
            })}
          </div>

          <p className="mt-8 text-center text-[0.78rem] text-white/50">{conversionBandContent.footnote}</p>
        </div>
      </motion.div>
    </section>
  );
}
