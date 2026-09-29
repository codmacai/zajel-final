'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
const defaultContent = {
  eyebrow: 'Sustainability & Commitment',
  heading: 'Environmental Responsibility',
  badge: 'ISO 14001 Certified',
  paragraph1:
    'Zajel holds ISO 14001 certification for environmental management, which means sustainability is built into how we plan routes, manage facilities, and operate our fleet. This is not a statement of intent. It is an audited standard that governs our operations.',
  paragraph2:
    "In practice, ISO 14001 drives route optimization to reduce fuel consumption and emissions across our delivery and freight operations. It governs waste management at our warehouse facilities and sets targets for energy efficiency across our offices and logistics infrastructure. As the UAE's logistics sector continues to grow, operating within a certified environmental framework ensures that growth does not come at the expense of responsibility.",
  backgroundImage: '/about/magnific_create-an-ultrarealistic-_TdQyDWBVNR.jpg', // 👈 Update with your image path
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const EnvironmentalResponsibility: FC = () => {
  const data = defaultContent;

  return (
    <section
      className="relative flex min-h-[560px] w-full select-none items-center justify-center overflow-hidden px-4 py-14 font-['Manrope',sans-serif] sm:min-h-[640px] sm:px-6 sm:py-20 lg:min-h-[720px] lg:px-12 lg:py-28"
      aria-labelledby="environmental-heading"
    >
      {/* Full-width background image (decorative) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.backgroundImage}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark vignette overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#042B18]/80 via-[#042B18]/50 to-[#042B18]/70" />
      </div>

      {/* Overlay content container */}
      <div className="relative z-10 mx-auto w-full max-w-[1100px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUpVariants}
          className="max-w-[880px] rounded-2xl border border-white/15 bg-[#042B18]/75 p-6 text-white shadow-2xl backdrop-blur-xl sm:rounded-[2rem] sm:p-10 lg:p-14"
        >
          {/* Eyebrow + ISO badge */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 sm:mb-6 sm:gap-4">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#36B936] sm:text-xs md:text-sm">
              {data.eyebrow}
            </span>

            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-medium uppercase leading-none tracking-wider text-white backdrop-blur-md">
              {data.badge}
            </span>
          </div>

          {/* Main heading */}
          <h2
            id="environmental-heading"
            className="mb-5 text-balance text-[1.5rem] font-medium leading-[1.15] tracking-tight text-white sm:mb-7 sm:text-3xl md:text-4xl lg:text-[2.5rem]"
          >
            {data.heading}
          </h2>

          {/* Paragraphs */}
          <div className="flex max-w-[68ch] flex-col gap-4 text-[0.9375rem] font-light leading-relaxed text-white/85 sm:gap-5 sm:text-base lg:text-[1.0625rem]">
            <p>{data.paragraph1}</p>
            <p>{data.paragraph2}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnvironmentalResponsibility;