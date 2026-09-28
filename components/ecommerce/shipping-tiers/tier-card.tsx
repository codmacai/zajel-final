'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckIcon } from './icons';
import type { ShippingTier } from './types';

const EASE = [0.22, 1, 0.36, 1] as const;

interface TierCardProps extends ShippingTier {
  /** Position in the grid, used only to stagger the entrance animation. */
  position: number;
}

const TierCard = ({
  tierNumber,
  label,
  volume,
  description,
  featuresNote,
  features,
  buttonLabel,
  buttonUrl,
  recommended,
  position,
}: TierCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 + position * 0.08 }}
      className={`relative flex flex-col h-full rounded-2xl sm:rounded-[2rem] transition-transform duration-300 ${
        recommended ? 'lg:-translate-y-3' : ''
      }`}
    >
      <div
        className={`relative flex flex-col h-full rounded-2xl sm:rounded-[2rem] p-6 sm:p-9 overflow-hidden border ${
          recommended
            ? 'bg-gradient-to-br from-[#0D2A22] via-[#0A4D26] to-[#042B18] border-[#36B936]/30 shadow-[0_20px_50px_rgba(6,68,35,0.25)]'
            : 'bg-[#FAFBF8] border-[#0A4D26]/12 shadow-[0_16px_40px_rgba(6,68,35,0.06)]'
        }`}
      >
        {recommended && <div className="absolute top-0 left-6 sm:left-9 right-6 sm:right-9 h-[2px] bg-[#36B936]" />}

        <div className="flex items-baseline gap-2.5 mb-1.5">
          <span
            className={`text-[0.75rem] font-medium tabular-nums ${
              recommended ? 'text-[#36B936]' : 'text-[#0A4D26]/50'
            }`}
          >
            {tierNumber}
          </span>
          {recommended && (
            <span className="text-[#36B936] text-[0.7rem] font-medium tracking-[0.08em] uppercase">Recommended</span>
          )}
        </div>

        <h3
          className={`text-[1.15rem] sm:text-[1.3rem] font-medium tracking-[-0.005em] mb-1.5 ${
            recommended ? 'text-white' : 'text-[#0A4D26]'
          }`}
        >
          {label}
        </h3>

        <p className={`text-[0.78rem] sm:text-[0.8rem] font-light mb-5 sm:mb-6 ${recommended ? 'text-white/70' : 'text-[#2d6a4f]'}`}>
          {volume}
        </p>

        <p className={`text-[0.78rem] sm:text-[0.8rem] font-light leading-relaxed mb-6 sm:mb-7 ${recommended ? 'text-white/80' : 'text-[#2d6a4f]'}`}>
          {description}
        </p>

        <div className={`h-px w-full mb-5 sm:mb-6 ${recommended ? 'bg-white/10' : 'bg-[#0A4D26]/10'}`} />

        <div className="flex-1 flex flex-col">
          {featuresNote && (
            <p
              className={`text-[0.7rem] font-medium tracking-[0.08em] uppercase mb-3 ${
                recommended ? 'text-[#36B936]' : 'text-[#0A4D26]'
              }`}
            >
              {featuresNote}
            </p>
          )}
          <ul className="space-y-2.5 flex-1 mb-6">
            {features.map((feature) => (
              <li
                key={feature}
                className={`flex items-start gap-2.5 text-[0.78rem] sm:text-[0.8rem] font-light leading-snug ${
                  recommended ? 'text-white/90' : 'text-[#2d6a4f]'
                }`}
              >
                <CheckIcon className="text-[#36B936] shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-2">
          <Link
            href={buttonUrl}
            className={`w-full inline-flex items-center justify-center rounded-full px-6 py-3 text-[0.78rem] sm:text-[0.8rem] font-medium tracking-[0.01em] transition-all duration-200 hover:scale-[1.02] text-center ${
              recommended ? 'bg-[#36B936] text-white hover:bg-[#2e9e2e]' : 'bg-[#0A4D26] text-white hover:bg-[#0A4D26]/90'
            }`}
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TierCard;