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
      className="relative w-full min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] flex items-center justify-center py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 overflow-hidden select-none font-sans"
      aria-labelledby="environmental-heading"
    >
      {/* Full-width background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.backgroundImage}
          alt="Sustainability and environmental commitment background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark vignette overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#042B18]/80 via-[#042B18]/50 to-[#042B18]/70" />
      </div>

      {/* Overlay content container */}
      <div className="relative z-10 max-w-[1100px] w-full mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUpVariants}
          className="bg-[#042B18]/75 backdrop-blur-xl border border-white/15 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-12 lg:p-16 text-white shadow-2xl max-w-[880px]"
        >
          {/* Top header + ISO badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#36B936]" />
              <span className="text-[#8FE38F] text-xs sm:text-sm font-medium tracking-wider uppercase">
                {data.eyebrow}
              </span>
            </div>

            {/* ISO 14001 inline badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#36B936]" />
              <span className="text-white text-[0.65rem] sm:text-[0.7rem] font-medium tracking-wider uppercase">
                {data.badge}
              </span>
            </div>
          </div>

          {/* Main heading */}
          <h2
            id="environmental-heading"
            className="text-2xl sm:text-3xl md:text-4xl text-white font-medium tracking-tight leading-[1.15] mb-6 sm:mb-8"
          >
            {data.heading}
          </h2>

          {/* Paragraphs */}
          <div className="space-y-5 sm:space-y-6 text-white/80 text-sm sm:text-base font-light leading-relaxed">
            <p>{data.paragraph1}</p>
            <p>{data.paragraph2}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnvironmentalResponsibility;
