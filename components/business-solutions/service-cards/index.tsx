'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckIcon, CleanBoxIcon, CleanPlaneIcon, CleanShipIcon, CleanTruckIcon } from '../icons';
import { serviceCards } from '../data';

const EASE = [0.2, 0.8, 0.2, 1] as const;

const cleanIconMap = {
  ecommerce: CleanBoxIcon,
  'air-freight': CleanPlaneIcon,
  'sea-freight': CleanShipIcon,
  'land-freight': CleanTruckIcon,
} as const;

export default function ServiceCards() {
  return (
    <section
      className="relative w-full overflow-hidden font-['Manrope',sans-serif]"
      style={{ background: 'linear-gradient(180deg, #0A5A2E 0%, #064423 30%, #053A20 55%, #04321C 75%, #042B18 100%)' }}
    >
      <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-[520px] w-[520px] rounded-full bg-[#36B936]/10 blur-[130px]" />
      <div aria-hidden className="pointer-events-none absolute -right-16 top-[30%] h-[460px] w-[460px] rounded-full bg-[#8FE38F]/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 md:px-12 lg:px-20 lg:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto mb-10 sm:mb-14 max-w-[800px] text-center text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight text-white lg:mb-16"
        >
          Built to Move Every Kind of Business
        </motion.h2>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:gap-8 md:grid-cols-2">
          {serviceCards.map((card, i) => {
            const DecorativeIcon = cleanIconMap[card.id];
            // Alternates strictly based on index: 0=Green, 1=White, 2=Green, 3=White
            const isGreen = i % 2 === 0;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
                className={`relative flex h-full min-h-[360px] sm:min-h-[400px] flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${
                  isGreen
                    ? 'border border-emerald-500/30 bg-gradient-to-br from-[#36B936] via-[#2A9E2A] to-[#1A681A] shadow-[0_20px_50px_rgba(54,185,54,0.22)]'
                    : 'border border-[#0A5A2E]/[0.12] bg-gradient-to-br from-white via-[#F7FAF7] to-[#E8F3E9] shadow-[0_20px_50px_rgba(6,68,35,0.16)]'
                }`}
              >
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <span
                      className={`mb-5 inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 ${
                        isGreen ? 'border border-white/20 bg-white/10' : 'bg-[#064423]'
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${isGreen ? 'bg-white' : 'bg-[#36B936]'}`} />
                      <span className={`text-[11px] font-medium uppercase tracking-[0.16em] ${isGreen ? 'text-white' : 'text-[#36B936]'}`}>
                        {card.title}
                      </span>
                    </span>

                    <p className={`mb-5 max-w-[85%] text-lg sm:text-xl font-medium leading-snug ${isGreen ? 'text-white' : 'text-neutral-900'}`}>
                      {card.description}
                    </p>

                    <ul className="space-y-2.5">
                      {card.features.map((feature) => (
                        <li key={feature} className={`flex items-start gap-2.5 text-xs sm:text-sm leading-snug ${isGreen ? 'text-white/90' : 'text-neutral-700'}`}>
                          <CheckIcon className={`shrink-0 mt-0.5 ${isGreen ? 'text-white' : 'text-[#36B936]'}`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <Link
                      href={card.buttonUrl}
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 hover:scale-[1.03] ${
                        isGreen ? 'bg-[#05361A] text-[#36B936] hover:bg-[#03200F]' : 'bg-[#064423] text-[#36B936] hover:bg-[#053018]'
                      }`}
                    >
                      {card.buttonLabel}
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>

                <DecorativeIcon
                  className={`pointer-events-none absolute -bottom-6 -right-6 h-[140px] w-[140px] sm:h-[180px] sm:w-[180px] ${
                    isGreen ? 'text-white opacity-20' : 'text-[#064423] opacity-[0.08]'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}