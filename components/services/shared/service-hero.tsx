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
    <section className="w-full min-h-[100svh] flex items-center justify-center pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 bg-white font-sans">
      {/*
        DOM order = mobile order: text → image → buttons.
        On desktop the grid puts text + buttons in the left column (rows 1–2)
        and lets the image span both rows on the right.
      */}
      <div className="mx-auto w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-20 lg:gap-y-0 items-center">
        <div className="flex flex-col items-start text-start lg:col-start-1 lg:row-start-1 lg:self-end lg:pb-10">
          <motion.p
            {...fadeUp(0.1)}
            className="text-[#36B936] text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-3 sm:mb-4"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            {...fadeUp(0.2)}
            className="text-[#0A4D26] font-medium tracking-tight leading-[1.1] text-[2rem] min-[375px]:text-[2.25rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4.2rem] mb-4 sm:mb-6 whitespace-pre-line"
          >
            {title}
          </motion.h1>
          <motion.p
            {...fadeUp(0.3)}
            className="text-gray-600 font-light leading-relaxed text-[15px] sm:text-base lg:text-lg max-w-[500px]"
          >
            {description}
          </motion.p>
        </div>

        <motion.div
          {...fadeUp(0.3)}
          className="relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl lg:col-start-2 lg:row-start-1 lg:row-span-2"
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
          className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:col-start-1 lg:row-start-2 lg:self-start"
        >
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#36B936] hover:bg-[#2da12d] text-white rounded-full px-8 py-3.5 text-sm font-medium tracking-wide shadow-lg transition-all duration-300 active:scale-95"
          >
            <span aria-hidden className="text-base leading-none">+</span>
            <span>{primaryLabel}</span>
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-white border border-gray-200 hover:border-[#36B936] text-[#0A4D26] rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 active:scale-95"
          >
            <span aria-hidden className="text-base leading-none">+</span>
            <span>{secondaryLabel}</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceHero;
