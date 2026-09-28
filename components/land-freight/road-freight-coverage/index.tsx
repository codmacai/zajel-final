'use client';

import { motion } from 'framer-motion';

const EASE = [0.2, 0.8, 0.2, 1] as const;

const stops = [
  {
    label: 'Domestic',
    blurb: 'Distribution within the UAE, city to city.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M12 21s-6.5-5.7-6.5-11A6.5 6.5 0 1 1 18.5 10c0 5.3-6.5 11-6.5 11Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    label: 'Import',
    blurb: 'Bringing cargo into the UAE by road from regional origins.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect x="10" y="4" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 10h12" stroke="currentColor" strokeWidth="1.6" />
        <path d="M16 4v12" stroke="currentColor" strokeWidth="1.6" />
        <path d="M1 10h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M5 7l3 3-3 3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Export',
    blurb: 'Sending cargo out of the UAE to regional and cross-border destinations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect x="2" y="4" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M2 10h12" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 4v12" stroke="currentColor" strokeWidth="1.6" />
        <path d="M15 10h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M19 7l3 3-3 3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Cross-Border',
    blurb: 'Coverage across the GCC, Turkey, Jordan, Syria, and Europe.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 12h18" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 3c2.4 2.4 3.7 5.5 3.7 9s-1.3 6.6-3.7 9c-2.4-2.4-3.7-5.5-3.7-9S9.6 5.4 12 3Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
];

const RoadFreightCoverage = () => {
  return (
    <section
      className="w-full py-[clamp(3rem,8vw,7rem)] px-[clamp(1rem,4vw,1.5rem)] overflow-hidden font-sans"
      style={{ background: 'linear-gradient(180deg, #1b4332 0%, #073018 55%, #052611 100%)' }}
    >
      <div className="max-w-[1080px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[2px]" style={{ backgroundColor: '#36B936' }} />
            <span className="text-[#36B936] font-medium text-xs sm:text-sm tracking-wider uppercase">
              Land Freight Coverage
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-medium leading-[1.15] mb-6 max-w-[720px] mx-auto tracking-tight">
            Domestic, Import, Export &amp; Cross-Border Coverage
          </h2>

          <span className="inline-flex items-center gap-2 bg-white/5 border border-white/15 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-white/85 font-light text-sm sm:text-base tracking-tight">
            <span className="w-1.5 h-1.5 rounded-full bg-[#36B936] flex-shrink-0" aria-hidden="true" />
            Door-to-door by default — pickup at origin, delivery to final destination, every time.
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          className="mt-14 sm:mt-16 lg:mt-20"
        >
          <div className="hidden md:flex md:items-start">
            {stops.map((stop, i) => (
              <div key={stop.label} className="contents">
                {i > 0 && (
                  <div className="flex-1 border-t border-dashed border-[#36B936]/40 mt-7" aria-hidden="true" />
                )}
                <div className="flex flex-col items-center text-center w-[11rem] lg:w-[13rem] flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#1b4332] shadow-[0_10px_28px_-8px_rgba(0,0,0,0.45)]">
                    {stop.icon}
                  </div>
                  <p className="text-white font-medium text-base mt-5 mb-1.5">{stop.label}</p>
                  <p className="text-white/60 font-light text-sm leading-[1.55]">{stop.blurb}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex md:hidden flex-col text-left">
            {stops.map((stop, i) => (
              <div key={stop.label}>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#1b4332] shadow-[0_10px_28px_-8px_rgba(0,0,0,0.45)] flex-shrink-0">
                    {stop.icon}
                  </div>
                  <div className="pt-2.5">
                    <p className="text-white font-medium text-base mb-1.5">{stop.label}</p>
                    <p className="text-white/60 font-light text-sm leading-[1.55]">{stop.blurb}</p>
                  </div>
                </div>
                {i < stops.length - 1 && (
                  <div className="w-14 flex justify-center py-2" aria-hidden="true">
                    <div className="w-px h-6 border-l border-dashed border-[#36B936]/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RoadFreightCoverage;
