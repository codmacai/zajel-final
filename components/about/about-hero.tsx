'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// Content — swap `defaultContent` for a CMS/API response later if you
// reconnect data-fetching; the JSX below doesn't care where `data` comes from.
// ---------------------------------------------------------------------------
const defaultContent = {
  heading: 'About Zajel Logistic Services, Since 2008',
  intro:
    "We don't just move parcels, goods, and shipments. We move businesses, relationships, and markets forward — with the intelligence, precision, and care of a trusted logistics partner.",
  heroImageUrl: '/about/gallery/port-worker-sunset.webp',
  heroImageAlt: 'Zajel fleet and warehouse operations',
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Top spacing = navbar height + breathing room.
 * The navbar height comes from the CSS variable --navbar-height if you define
 * one (see notes); otherwise it falls back to 4rem / 4.5rem / 5rem per breakpoint.
 * Set the fallbacks below to your real navbar heights.
 */
const TOP_SPACING =
  'pt-[calc(var(--navbar-height,4rem)+1.5rem)] ' +
  'sm:pt-[calc(var(--navbar-height,4.5rem)+2.5rem)] ' +
  'lg:pt-[calc(var(--navbar-height,5rem)+3.5rem)]';

const AboutHero: FC = () => {
  const data = defaultContent;

  return (
    <section
      className={`w-full bg-[#FDFDFD] ${TOP_SPACING} pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 lg:px-12 font-['Manrope',sans-serif]`}
      aria-labelledby="about-hero-heading"
    >
      <div className="mx-auto w-full max-w-[1300px]">
        {/* Heading (left) + intro (right); stacked below lg */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            id="about-hero-heading"
            className="text-balance text-[1.65rem] leading-[1.15] font-medium tracking-tight text-[#064423] sm:text-3xl md:text-4xl lg:max-w-[46%] xl:text-[2.6rem]"
          >
            {data.heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="max-w-[60ch] text-sm font-light leading-relaxed text-[#064423]/60 sm:text-base lg:max-w-[46%] lg:pt-1.5"
          >
            {data.intro}
          </motion.p>
        </div>

        {/* Hero image: ratio-based so it scales cleanly on every screen */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="relative mt-8 w-full overflow-hidden rounded-2xl border border-[#064423]/5 bg-[#F9FBF9] aspect-[4/3] xs:aspect-[16/10] sm:mt-10 sm:aspect-[16/9] sm:rounded-[2rem] lg:mt-14 lg:aspect-[21/9] lg:rounded-[2.5rem] lg:max-h-[560px]"
        >
          <Image
            src={data.heroImageUrl}
            alt={data.heroImageAlt}
            fill
            priority
            sizes="(min-width: 1300px) 1300px, 100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;