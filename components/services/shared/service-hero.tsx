'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp } from './motion';
import type { HeroContent } from './types';

const ServiceHero = ({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  image,
  imageAlt,
}: HeroContent) => {
  return (
    <section className="w-full min-h-[100svh] flex items-center justify-center pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 px-5 sm:px-8 md:px-12 lg:px-20 bg-white font-['Manrope',sans-serif]">
      {/*
        DOM order = mobile order: text → image → buttons.
        On desktop the grid puts text + buttons in the left column (rows 1–2)
        and lets the image span both rows on the right.
      */}
      <div className="mx-auto w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-y-8 lg:gap-x-16 lg:gap-y-0 items-center">
        <div className="flex flex-col items-start text-start lg:col-start-1 lg:row-start-1 lg:self-end lg:pb-10">
          <motion.p
            {...fadeUp(0.1)}
            className="text-[#36B936] text-xs font-semibold uppercase tracking-widest mb-3 sm:mb-4"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            {...fadeUp(0.2)}
            className="text-[#0B140F] font-medium tracking-tight leading-[1.15] text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 whitespace-pre-line"
          >
            {title}
          </motion.h1>
          <motion.p
            {...fadeUp(0.3)}
            className="text-[#4B5750] font-normal leading-relaxed text-xs sm:text-sm md:text-base max-w-[58ch]"
          >
            {description}
          </motion.p>
        </div>

        <motion.div
          {...fadeUp(0.3)}
          className="relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl lg:col-start-2 lg:row-start-1 lg:row-span-2"
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          {...fadeUp(0.4)}
          className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto lg:col-start-1 lg:row-start-2 lg:self-start"
        >
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-[#36B936] px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.55rem,1vw,0.85rem)] text-[clamp(0.8rem,1.4vw,0.9rem)] font-medium text-[#0B140F] shadow-md transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B140F]"
          >
            <span>{primaryLabel}</span>
            <span aria-hidden="true">→</span>
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-white border border-[#0B140F]/15 hover:border-[#36B936] text-[#0B140F] rounded-full px-6 py-3 text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 active:scale-95"
            >
              <span>{secondaryLabel}</span>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceHero;