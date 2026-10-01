'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Radar, Wallet, BellRing, BarChart3, Plug, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { technologyFeatures, technologyContent } from '../data';

const EASE = [0.2, 0.8, 0.2, 1] as const;

const iconMap: Record<string, LucideIcon> = {
  tracking: Radar,
  cod: Wallet,
  notifications: BellRing,
  reports: BarChart3,
  integration: Plug,
};

// Primary button — pill, brand green, dark text, arrow.
const primaryButton =
  'inline-flex items-center justify-center gap-2 rounded-full bg-[#36B936] ' +
  'px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.55rem,1vw,0.85rem)] ' +
  'text-xs sm:text-sm font-medium text-[#0B140F] shadow-md ' +
  'transition-transform hover:scale-[1.03] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A4D26]';

interface TechnologyVisibilityProps {
  quoteHref?: string;
}

export default function TechnologyVisibility({ quoteHref = '/quote' }: TechnologyVisibilityProps) {
  return (
    <section className="flex w-full items-center bg-white px-4 py-12 font-['Manrope',sans-serif] sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1320px]">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-8 flex items-center gap-4 border-b border-[#0A4D26]/10 pb-4 sm:mb-10"
        >
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#0A4D26]/60">
            {technologyContent.eyebrow}
          </span>
        </motion.div>

        {/* Balanced grid: single column on phones/tablets, two columns on large screens */}
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left column: content */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex w-full min-w-0 max-w-[620px] flex-col"
          >
            <h2 className="mb-3 text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight text-[#0A4D26] sm:mb-4">
              {technologyContent.heading}
            </h2>

            <p className="mb-6 text-[13px] sm:text-[13.5px] lg:text-[14px] font-normal leading-relaxed text-[#2d6a4f] sm:mb-8">
              {technologyContent.description}
            </p>

            {/* Image shown inline on phones and tablets */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative mx-auto mb-8 flex w-full max-w-[480px] items-center justify-center lg:hidden"
            >
              <Image
                src={technologyContent.image}
                alt={technologyContent.imageAlt}
                width={640}
                height={640}
                sizes="(max-width: 640px) 90vw, 480px"
                className="h-auto max-h-[45vh] w-full object-contain sm:max-h-[50vh]"
              />
            </motion.div>

            {/* Features: 2-column grid */}
            <div className="mb-8 grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-6 sm:gap-y-6">
              {technologyFeatures.map(({ id, title, description }) => {
                const Icon = iconMap[id];
                return (
                  <div key={id} className="flex min-w-0 flex-col items-start gap-2.5 sm:flex-row sm:gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#36B936]/10 sm:mt-0.5 sm:h-9 sm:w-9">
                      <Icon className="h-4 w-4 text-[#36B936]" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="mb-1 text-[0.8rem] font-medium tracking-tight text-[#0A4D26] sm:text-sm">{title}</h3>
                      <p className="text-[11px] leading-relaxed text-[#2d6a4f] sm:text-xs">{description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA: centered on phones/tablets, left-aligned on desktop */}
            <div className="flex justify-center lg:justify-start">
              <Link href={quoteHref} className={primaryButton}>
                <span>{technologyContent.ctaLabel}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>

          {/* Right column: image, large screens only */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative hidden max-h-[60vh] w-full items-center justify-center lg:flex"
          >
            <Image
              src={technologyContent.image}
              alt={technologyContent.imageAlt}
              width={640}
              height={640}
              sizes="45vw"
              className="h-auto max-h-[60vh] w-full object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}