'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const ANIMATION_EASE = [0.2, 0.8, 0.2, 1] as const;

const coverageStops = [
  {
    label: 'Domestic',
    blurb: 'Distribution within the UAE, city to city.',
    iconSrc: '/customs_icon/domestic-icon.png',
  },
  {
    label: 'Import',
    blurb: 'Bringing cargo into the UAE by road from regional origins.',
    iconSrc: '/customs_icon/import-icon.png',
  },
  {
    label: 'Export',
    blurb: 'Sending cargo out of the UAE to regional and cross-border destinations.',
    iconSrc: '/customs_icon/export-icon.png',
  },
  {
    label: 'Cross-Border',
    blurb: 'Coverage across the GCC, Turkey, Jordan, Syria, and Europe.',
    iconSrc: '/customs_icon/cross-border-icon.png',
  },
];

export default function RoadFreightCoverage() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-14 px-4 sm:px-6 lg:px-8 bg-slate-50/50 font-sans">
      {/* Rectangular Banner Container */}
      <div className="max-w-[1320px] mx-auto relative rounded-3xl lg:rounded-[1.5rem] overflow-hidden shadow-2xl lg:shadow-xl border border-[#36B936]/20 bg-[#132219]">

        {/* Mobile Background Image (Visible only on mobile/tablet, hidden on desktop) */}
        <div className="absolute inset-0 z-0 lg:hidden">
          <Image
            src="/roadcustoms/road-customs-inspection.jpg"
            alt="Land Freight Coverage Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark greenish overlay for mobile text legibility */}
          <div className="absolute inset-0 bg-[#132219]/90 sm:bg-[#132219]/85" />
        </div>

        {/* Layout Grid: Full background on mobile, Side-by-side on desktop */}
        <div className="rtl-keep-split relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full items-stretch">

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: ANIMATION_EASE }}
            className="flex flex-col justify-center py-12 sm:py-16 lg:py-14 px-6 sm:px-12 lg:px-14 z-10 bg-transparent lg:bg-[#132219]"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-medium leading-[1.12] tracking-tight mb-4 lg:mb-4">
              Land Freight <br className="hidden sm:block" />
              <span className="text-white sm:text-[#36B936]">Coverage</span>
            </h2>

            <p className="text-white/70 font-light text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed mb-8 lg:mb-7 max-w-[480px] lg:max-w-[420px]">
              Complete the information and documentation needed for a successful import and export of your products and materials.
            </p>

            <div className="flex flex-col">
              {coverageStops.map((stop, index) => (
                <div key={stop.label}>
                  <div className="flex items-center justify-between py-3.5 sm:py-4 lg:py-4 pr-2">
                    <div>
                      <h3 className="text-white font-medium text-base sm:text-lg lg:text-base mb-0.5">{stop.label}</h3>
                      <p className="text-white/60 font-light text-xs sm:text-sm lg:text-[0.8125rem]">{stop.blurb}</p>
                    </div>
                    <div className="relative w-8 h-8 sm:w-9 sm:h-9 lg:w-8 lg:h-8 flex-shrink-0 ml-4">
                      <Image
                        src={stop.iconSrc}
                        alt={stop.label}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  {index < coverageStops.length - 1 && (
                    <div className="w-full h-px bg-white/10" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Desktop Image Column (Hidden on mobile, side-by-side right column on desktop) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: ANIMATION_EASE, delay: 0.1 }}
            className="hidden lg:block relative w-full h-full min-h-[460px] bg-[#132219]"
          >
            <Image
              src="/roadcustoms/road-customs-inspection.jpg"
              alt="Land Freight Coverage"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Gradient blend into the dark greenish side */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#132219] via-[#132219]/30 to-transparent w-3/4" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}