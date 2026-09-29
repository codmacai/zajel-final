'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { heroData } from '../data';

const EASE = [0.2, 0.8, 0.2, 1] as const;

// Primary button — pill, brand green, dark text, arrow.
const primaryButton =
  'inline-flex items-center justify-center gap-2 rounded-full bg-[#36B936] ' +
  'px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.55rem,1vw,0.85rem)] ' +
  'text-xs sm:text-sm font-medium text-[#0B140F] shadow-md ' +
  'transition-transform hover:scale-[1.03] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A4D26]';

interface BusinessHeroProps {
  onPrimaryClick?: () => void;
  primaryHref?: string;
}

export default function BusinessHero({
  onPrimaryClick,
  primaryHref = heroData.buttonUrl,
}: BusinessHeroProps) {
  return (
    <section className="w-full bg-white px-4 py-12 font-sans sm:px-6 sm:py-20 md:px-12 lg:px-20 lg:py-24">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center text-center">
        {/* Header content: eyebrow, title, description */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col items-center"
        >
          <div className="mb-3 flex items-center justify-center gap-3 sm:mb-4">
            <span className="h-[2px] w-6 bg-[#36B936] sm:w-8" />
            <span className="text-xs font-medium uppercase tracking-wider text-[#36B936] sm:text-sm">
              {heroData.eyebrow}
            </span>
          </div>

          <h1 className="mx-auto max-w-[800px] text-2xl font-medium leading-[1.18] tracking-tight text-[#0A4D26] sm:text-3xl md:text-4xl lg:text-[2.75rem]">
            {heroData.title}
          </h1>

          <p className="mt-4 max-w-[580px] text-sm font-light leading-relaxed text-[#0A4D26]/75 sm:mt-5 md:text-base">
            {heroData.description}
          </p>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="relative mt-8 h-[220px] w-full max-w-[1200px] overflow-hidden rounded-2xl border border-[#0A3D2D]/20 shadow-[0_25px_60px_-15px_rgba(5,36,26,0.3)] min-[400px]:h-[280px] sm:mt-12 sm:h-[380px] sm:rounded-[1.75rem] md:h-[420px] lg:h-[480px]"
        >
          <Image
            src={heroData.heroImage}
            alt={heroData.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05241A]/60 via-[#0A3D2D]/20 to-transparent" />
        </motion.div>

        {/* Action button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          className="mt-8 flex items-center justify-center sm:mt-12"
        >
          <Link
            href={primaryHref}
            onClick={onPrimaryClick ? (e) => { e.preventDefault(); onPrimaryClick(); } : undefined}
            className={primaryButton}
          >
            <span>{heroData.buttonLabel}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}