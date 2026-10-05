'use client';

import { motion } from 'framer-motion';
import { BoltIcon, CoverageIcon, ExperienceIcon, GlobeIcon, TrackingIcon } from '../icons';
import { backedByPoints, whyShipCards } from '../data';

const EASE = [0.2, 0.8, 0.2, 1] as const;

const CARDS = [
  { ...whyShipCards.domestic, Icon: BoltIcon, id: 'domestic' },
  { ...whyShipCards.international, Icon: GlobeIcon, id: 'international' },
];

const BACKED_BY_ICONS = [TrackingIcon, CoverageIcon, ExperienceIcon];

export default function WhyShipWithZajel() {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-16 font-sans sm:px-6 sm:py-20 md:px-12 lg:px-20 lg:py-24">
      <div className="mx-auto max-w-[1320px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto flex w-full max-w-[1320px] flex-col items-center pb-10 text-center sm:pb-14"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-[#36B936]">
              Core Advantages
            </span>
          </div>
          <h2 className="mx-auto max-w-[720px] text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.15] tracking-tight text-[#0A4D26]">
            Why Ship With Zajel
          </h2>
          <p className="mt-4 sm:mt-5 max-w-[560px] text-[13px] sm:text-[13.5px] lg:text-[14px] font-light leading-relaxed text-[#0A4D26]/75">
            Engineered for speed, reliability, and global reach—built on decades of trusted logistics
            excellence across the UAE and worldwide.
          </p>
        </motion.div>

        {/* Primary Cards Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {CARDS.map((item, i) => {
            const ItemIcon = item.Icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
                className="group flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-[#0A3D2D]/50 bg-gradient-to-b from-[#0A3D2D] to-[#05241A] p-[clamp(1.75rem,4vw,2.5rem)] text-white shadow-[0_25px_60px_-15px_rgba(5,36,26,0.45)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/10 text-[#36B936] transition-colors duration-300 group-hover:bg-[#36B936] group-hover:text-white">
                    <ItemIcon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl sm:text-2xl font-medium tracking-tight text-white">
                    {item.label}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm md:text-base font-light leading-relaxed text-white/75">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Backed By Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.24 }}
          className="mt-14 sm:mt-16"
        >
          <div className="mb-6 flex items-center justify-center gap-3 sm:mb-8">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#0A4D26]/50">
              Backed By
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {backedByPoints.map((point, i) => {
              const PointIcon = BACKED_BY_ICONS[i];
              return (
                <div
                  key={point.text}
                  className="flex flex-col items-center justify-center rounded-[1.5rem] border border-[#0A4D26]/15 bg-white px-6 py-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#36B936]/15 text-[#36B936]">
                    <PointIcon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-xs sm:text-sm font-light leading-relaxed text-[#0A4D26]/85">
                    {point.text}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}