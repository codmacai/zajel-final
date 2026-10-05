'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckIcon, CleanBoltIcon, CleanGlobeIcon } from '../icons';
import { serviceCards } from '../data';

const EASE = [0.2, 0.8, 0.2, 1] as const;

export default function ServiceCards() {
  return (
    <section className="relative w-full overflow-hidden bg-white font-sans">
      {/* Background Decorative Blur Elements */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-12 -top-12 sm:-left-24 sm:-top-24 h-[300px] w-[300px] sm:h-[520px] sm:w-[520px] rounded-full bg-[#36B936]/[0.06] blur-[80px] sm:blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-[40%] sm:-right-16 sm:top-[30%] h-[260px] w-[260px] sm:h-[460px] sm:w-[460px] rounded-full bg-[#8FE38F]/[0.05] blur-[100px] sm:blur-[150px]"
      />

      <div className="relative z-10 mx-auto max-w-[1080px] px-4 py-12 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        {/* Grid Layout: 1 column on mobile, 2 columns on tablet and up */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8">
          {serviceCards.map((card, i) => {
            const isGradientCard = card.id === 'domestic';
            const DecorativeIcon = isGradientCard ? CleanBoltIcon : CleanGlobeIcon;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
                className={`relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border p-6 sm:p-8 md:p-10 transition-transform duration-300 hover:-translate-y-1 sm:hover:-translate-y-1.5 ${
                  isGradientCard
                    ? 'border-white/20 bg-gradient-to-br from-[#36B936] via-[#2A9E2A] to-[#0A4D26] shadow-[0_12px_30px_rgba(54,185,54,0.15)] sm:shadow-[0_20px_50px_rgba(54,185,54,0.18)]'
                    : 'border-[#0A4D26]/10 bg-gradient-to-br from-white via-[#F7FAF7] to-[#E8F3E9] shadow-[0_12px_30px_rgba(6,68,35,0.1)] sm:shadow-[0_20px_50px_rgba(6,68,35,0.14)]'
                }`}
              >
                <div className="relative z-10">
                  {/* Eyebrow Label */}
                  <span
                    className={`mb-4 sm:mb-5 inline-flex w-fit items-center gap-1.5 sm:gap-2 rounded-full px-3 py-1 sm:px-3.5 sm:py-1.5 ${
                      isGradientCard ? 'border border-white/20 bg-white/10' : ''
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${isGradientCard ? 'bg-white' : 'bg-[#0A4D26]'}`} />
                    <span
                      className={`text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.16em] ${
                        isGradientCard ? 'text-white' : 'text-[#0A4D26]'
                      }`}
                    >
                      {card.title}
                    </span>
                  </span>

                  {/* Card Description / Main Text */}
                  <p
                    className={`mb-5 sm:mb-6 max-w-[90%] sm:max-w-[85%] text-base sm:text-lg md:text-[1.3rem] font-light leading-snug ${
                      isGradientCard ? 'text-white' : 'text-[#0A4D26]/80'
                    }`}
                  >
                    {card.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 sm:space-y-2.5">
                    {card.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm md:text-[0.88rem] leading-snug ${
                          isGradientCard ? 'text-white/90' : 'text-[#0A4D26]/75'
                        }`}
                      >
                        <CheckIcon className={`mt-[2px] flex-shrink-0 ${isGradientCard ? 'text-white' : 'text-[#36B936]'}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to Action Button */}
                <div className="relative z-10 mt-6 sm:mt-8">
                  <Link
                    href={card.buttonUrl}
                    className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-[0.85rem] font-medium tracking-wide transition-all duration-200 hover:scale-105 ${
                      isGradientCard
                        ? 'bg-white text-[#0A4D26] hover:bg-[#F7FAF7]'
                        : 'bg-[#0A4D26] text-[#36B936] hover:bg-[#0A4D26]/90'
                    }`}
                  >
                    {card.buttonLabel}
                    <span aria-hidden>→</span>
                  </Link>
                </div>

                {/* Decorative Background Icon */}
                <DecorativeIcon
                  className={`pointer-events-none absolute -bottom-4 -right-4 h-[100px] w-[100px] sm:h-[140px] sm:w-[140px] md:h-[160px] md:w-[160px] ${
                    isGradientCard ? 'text-white opacity-20' : 'text-[#0A4D26] opacity-[0.08]'
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