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
  heroImageUrl:
    '/about/gallery/magnific_remove-texgt_Cqw0eUHEEy.png',
  heroImageAlt: 'Zajel fleet and warehouse operations',
};

const EASE = [0.22, 1, 0.36, 1] as const;

const AboutHero: FC = () => {
  const data = defaultContent;

  return (
    <section
      className="w-full bg-[#FDFDFD] pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 font-sans"
      aria-labelledby="about-hero-heading"
    >
      <div className="max-w-[1300px] mx-auto">
        {/* Heading (left) + intro (right) */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 sm:gap-6 lg:gap-16">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            id="about-hero-heading"
            className="text-2xl sm:text-3xl md:text-4xl text-[#064423] font-medium tracking-tight leading-[1.15] lg:max-w-[46%]"
          >
            {data.heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="text-[#064423]/60 text-sm sm:text-base font-light leading-relaxed lg:max-w-[46%]"
          >
            {data.intro}
          </motion.p>
        </div>

        {/* Full-width hero image banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="relative mt-10 sm:mt-12 lg:mt-14 w-full h-[220px] xs:h-[260px] sm:h-[380px] lg:h-[520px] rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden bg-[#F9FBF9] border border-[#064423]/5"
        >
          <Image
            src={data.heroImageUrl}
            alt={data.heroImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
