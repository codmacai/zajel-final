'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Radar, Wallet, BellRing, BarChart3, Plug, ArrowRight, type LucideIcon } from 'lucide-react';
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

interface TechnologyVisibilityProps {
  quoteHref?: string;
}

export default function TechnologyVisibility({ quoteHref = '/quote' }: TechnologyVisibilityProps) {
  return (
    <section className="flex w-full items-center bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-20 lg:py-24 font-['Manrope',sans-serif]">
      <div className="mx-auto w-full max-w-[1320px]">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-8 sm:mb-10 flex items-center gap-4 border-b border-[#0A4D26]/10 pb-4"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0A4D26]/60">{technologyContent.eyebrow}</span>
        </motion.div>

        {/* Balanced Grid Layout */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          
          {/* Left Column: Content Block */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex flex-col w-full max-w-[620px]"
          >
            <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight text-[#0A4D26]">
              {technologyContent.heading}
            </h2>

            <p className="mb-8 text-xs sm:text-sm md:text-base font-normal leading-relaxed text-[#2d6a4f]">
              {technologyContent.description}
            </p>

            {/* Mobile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative my-6 flex w-full items-center justify-center lg:hidden"
            >
              <Image
                src={technologyContent.image}
                alt={technologyContent.imageAlt}
                width={640}
                height={640}
                sizes="90vw"
                className="h-auto max-h-[50vh] w-full object-contain"
              />
            </motion.div>

            {/* Features 2-Column Grid */}
            <div className="mb-8 grid grid-cols-2 gap-4 sm:gap-6">
              {technologyFeatures.map(({ id, title, description }) => {
                const Icon = iconMap[id];
                return (
                  <div key={id} className="flex flex-col sm:flex-row items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-[#36B936]/10">
                      <Icon className="h-4 w-4 text-[#36B936]" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="mb-1 text-xs sm:text-sm font-medium tracking-tight text-[#0A4D26]">{title}</h3>
                      <p className="text-[11px] sm:text-xs leading-relaxed text-[#2d6a4f]">{description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Centered CTA Button on Mobile, Left-aligned on Desktop */}
            <div className="flex justify-center lg:justify-start">
              <Link
                href={quoteHref}
                className="group inline-flex items-center gap-2 rounded-full bg-[#36B936] py-2.5 px-6 text-xs sm:text-sm font-medium tracking-wide text-white transition-all duration-300 hover:shadow-[0_8px_20px_rgba(54,185,54,0.25)] hover:scale-[1.02]"
              >
                <span>{technologyContent.ctaLabel}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[135deg]">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Desktop Image Block */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative hidden lg:flex max-h-[60vh] w-full items-center justify-center"
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