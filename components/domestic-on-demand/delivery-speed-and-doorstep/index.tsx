'use client';

import { type FC } from 'react';
import { motion } from 'framer-motion';

const EASE = [0.2, 0.8, 0.2, 1] as const;

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
const CONTENT = {
  eyebrow: 'Seamless Execution',
  heading: 'Choose Your Delivery Speed',
  sameDay: {
    label: 'Same Day Delivery',
    text: 'Schedule your pickup for today, at a time that suits you. Same city or city-to-city.',
    features: [
      'Pickup within 1 hour of your scheduled time',
      'Delivered within 2 hours of pickup',
      'Same-city or city-to-city',
    ],
  },
  nextDay: {
    label: 'Next Day Delivery',
    text: 'Scheduled for the next day, when speed matters less than certainty. Same city or city-to-city.',
    features: [
      'Book today, delivered tomorrow',
      'Choose your preferred pickup day and time',
      'Same-city or city-to-city',
    ],
  },
  doorstep: {
    heading: 'Doorstep Pickup, Doorstep Delivery',
    text: 'No drop-off points. No waiting in line. We collect from your door and deliver straight to theirs — wherever in the UAE that door happens to be.',
  },
};

// ---------------------------------------------------------------------------
// Static, high-end minimalist vector icons (no motion / no complex HUD)
// ---------------------------------------------------------------------------
const CleanBoltIcon: FC<{ className?: string }> = ({ className = '' }) => (
  <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M54 16L28 52H48L42 84L72 48H52L54 16Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CleanCalendarIcon: FC<{ className?: string }> = ({ className = '' }) => (
  <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect x="22" y="24" width="56" height="54" rx="12" stroke="currentColor" strokeWidth="2.5" />
    <line x1="22" y1="40" x2="78" y2="40" stroke="currentColor" strokeWidth="2" opacity="0.8" />
    <line x1="38" y1="16" x2="38" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="62" y1="16" x2="62" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="36" cy="53" r="2" fill="currentColor" opacity="0.6" />
    <circle cx="50" cy="53" r="2" fill="currentColor" opacity="0.6" />
    <circle cx="64" cy="53" r="2" fill="currentColor" opacity="0.6" />
    <circle cx="36" cy="65" r="2" fill="currentColor" opacity="0.6" />
    <circle cx="50" cy="65" r="2.5" fill="currentColor" />
    <circle cx="64" cy="65" r="2" fill="currentColor" opacity="0.3" />
  </svg>
);

const PrecisionCheckIconLine: FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`shrink-0 mt-[2px] ${className}`}
    aria-hidden="true"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------
const DeliverySpeedAndDoorstep: FC = () => {
  const data = CONTENT;

  return (
    <section
      className="w-full overflow-hidden relative select-none font-sans"
      aria-labelledby="delivery-speed-heading"
      style={{
        background: 'linear-gradient(180deg, #0A5A2E 0%, #064423 30%, #053A20 55%, #04321C 75%, #042B18 100%)',
      }}
    >
      {/* Ambient glows */}
      <div className="absolute -top-24 -left-24 w-[320px] h-[320px] md:w-[520px] md:h-[520px] bg-[#36B936]/[0.10] blur-[100px] md:blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-[22%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] md:w-[800px] md:h-[500px] bg-[#36B936]/[0.06] blur-[120px] md:blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-[55%] -right-16 w-[300px] h-[300px] md:w-[460px] md:h-[460px] bg-[#8FE38F]/[0.05] blur-[120px] md:blur-[150px] pointer-events-none rounded-full" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(120% 60% at 50% 8%, transparent 45%, rgba(0,0,0,0.35) 100%)' }}
      />

      {/* Delivery Speed block */}
      <div className="max-w-[1280px] mx-auto relative z-10 pt-12 md:pt-28 px-4 sm:px-6 lg:px-20 text-center">
        <div className="flex items-center justify-center gap-2.5 mb-3">
          <span style={{ color: '#36B936' }} className="font-medium text-[10px] sm:text-xs md:text-sm tracking-widest uppercase">
            {data.eyebrow}
          </span>
        </div>

        <motion.h2
          id="delivery-speed-heading"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white leading-[1.2] max-w-[720px] mx-auto mb-8 md:mb-16"
        >
          {data.heading}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-7 text-left">
          {/* Same Day Card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="group relative rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-12 min-h-[300px] md:min-h-[420px] flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#36B936] via-[#2A9E2A] to-[#1A681A] border border-white/20 shadow-[0_15px_40px_rgba(54,185,54,0.15)] md:shadow-[0_20px_50px_rgba(54,185,54,0.18)]"
          >
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/25 mb-4 md:mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="text-white text-[10px] sm:text-[11px] font-medium tracking-[0.16em] uppercase">{data.sameDay.label}</span>
              </div>

              <p className="text-white text-xs sm:text-[13.5px] md:text-[14px] font-light leading-relaxed max-w-[430px] mb-6 md:mb-8 tracking-wide">
                {data.sameDay.text}
              </p>

              <ul className="space-y-2 md:space-y-3">
                {data.sameDay.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-white/90 text-[11.5px] sm:text-[13px] font-light leading-snug tracking-wide">
                    <PrecisionCheckIconLine className="text-white" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="absolute -right-4 -bottom-4 text-white opacity-20 pointer-events-none">
              <CleanBoltIcon className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[220px] md:h-[220px]" />
            </div>
          </motion.div>

          {/* Next Day Card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="group relative rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-12 min-h-[300px] md:min-h-[420px] flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0D2A22] via-[#0A4D26] to-[#042B18] border border-[#36B936]/20 shadow-[0_15px_40px_rgba(6,68,35,0.3)] md:shadow-[0_20px_50px_rgba(6,68,35,0.35)]"
          >
            <div className="absolute -top-10 -right-10 w-48 h-48 md:w-64 md:h-64 bg-[#36B936]/[0.14] blur-[70px] md:blur-[80px] pointer-events-none rounded-full" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#36B936]/10 border border-[#36B936]/25 mb-4 md:mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#36B936]" />
                <span className="text-[#8FE38F] text-[10px] sm:text-[11px] font-medium tracking-[0.16em] uppercase">{data.nextDay.label}</span>
              </div>

              <p className="text-[#B7E9BE] text-xs sm:text-[13.5px] md:text-[14px] font-light leading-relaxed max-w-[430px] mb-6 md:mb-8 tracking-wide">
                {data.nextDay.text}
              </p>

              <ul className="space-y-2 md:space-y-3">
                {data.nextDay.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[#B7E9BE]/90 text-[11.5px] sm:text-[13px] font-light leading-snug tracking-wide">
                    <PrecisionCheckIconLine className="text-[#36B936]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="absolute -right-6 -bottom-6 text-white opacity-[0.14] pointer-events-none">
              <CleanCalendarIcon className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[220px] md:h-[220px]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Doorstep Pickup / Delivery block */}
      <div className="max-w-[820px] mx-auto flex flex-col items-center text-center relative z-10 pt-12 md:pt-24 pb-12 md:pb-20 px-4 sm:px-6 lg:px-24">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white leading-[1.2] max-w-[720px] mx-auto mb-3 md:mb-5"
        >
          {data.doorstep.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="text-white/70 font-light text-xs sm:text-[13.5px] md:text-[14px] leading-relaxed max-w-[520px] mx-auto tracking-wide"
        >
          {data.doorstep.text}
        </motion.p>
      </div>
    </section>
  );
};

export default DeliverySpeedAndDoorstep;