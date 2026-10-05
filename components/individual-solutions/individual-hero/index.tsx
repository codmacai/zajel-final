'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AppIcon } from '../icons';
import { APP_DOWNLOAD_URL, heroData } from '../data';

const EASE = [0.2, 0.8, 0.2, 1] as const;

interface IndividualHeroProps {
  onPrimaryClick?: () => void;
  primaryHref?: string;
}

export default function IndividualHero({
  onPrimaryClick,
  primaryHref = heroData.primaryButtonUrl,
}: IndividualHeroProps) {
  return (
    <section className="w-full bg-white px-4 py-16 font-sans sm:px-6 sm:py-20 md:px-12 lg:px-20 lg:py-24">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center text-center">
        {/* Header content: Eyebrow, Title, Description */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col items-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-[#36B936]">
              {heroData.eyebrow}
            </span>
          </div>

          <h1 className="mx-auto max-w-[800px] text-2xl sm:text-3xl md:text-4xl lg:text-[2.75xl] font-medium leading-[1.18] tracking-tight text-[#0A4D26]">
            {heroData.title}
          </h1>

          <p className="mt-4 sm:mt-5 max-w-[580px] text-xs sm:text-sm md:text-base font-light leading-relaxed text-[#0A4D26]/75">
            {heroData.description}
          </p>
        </motion.div>

        {/* Visual Hero Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="relative mt-10 sm:mt-12 h-[280px] w-full max-w-[1200px] overflow-hidden rounded-[1.75rem] border border-[#0A3D2D]/20 shadow-[0_25px_60px_-15px_rgba(5,36,26,0.3)] xs:h-[340px] sm:h-[420px] lg:h-[480px]"
        >
          <Image
            src={heroData.heroImage}
            alt={heroData.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05241A]/60 via-[#0A3D2D]/20 to-transparent" />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <Link
            href={primaryHref}
            onClick={onPrimaryClick ? (e) => { e.preventDefault(); onPrimaryClick(); } : undefined}
            className="group inline-flex items-center gap-3 rounded-full border border-[#0A4D26]/20 bg-white py-2.5 pl-7 pr-2.5 text-sm font-medium text-[#0A4D26] shadow-[0_1px_2px_rgba(10,77,38,0.06)] transition-all duration-300 hover:border-[#36B936] hover:shadow-[0_10px_24px_rgba(10,77,38,0.15)]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
              {heroData.primaryButtonLabel}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#36B936]/15 text-[#36B936] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[135deg]">
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </span>
          </Link>

          <a
            href={APP_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-[#0A4D26]/20 bg-white py-2.5 pl-6 pr-2.5 text-sm font-medium text-[#0A4D26] shadow-[0_1px_2px_rgba(10,77,38,0.06)] transition-all duration-300 hover:border-[#36B936] hover:shadow-[0_10px_24px_rgba(10,77,38,0.15)]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
              {heroData.secondaryButtonLabel}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#36B936]/15 text-[#36B936] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[135deg]">
              <AppIcon className="h-4 w-4" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}