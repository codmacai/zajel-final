'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckIcon, ShopifyMark, WooMark } from './icons';
import type { IntegrationCard } from './types';

const EASE = [0.22, 1, 0.36, 1] as const;

interface IntegrationCardTileProps extends IntegrationCard {
  index: number;
}

const IntegrationCardTile = ({
  id,
  label,
  description,
  features,
  buttonLabel,
  buttonUrl,
  index,
}: IntegrationCardTileProps) => {
  const isGreen = index % 2 === 0;
  const Mark = id === 'shopify' ? ShopifyMark : WooMark;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 + index * 0.1 }}
      className={`relative rounded-2xl sm:rounded-[2rem] p-6 sm:p-10 h-full flex flex-col justify-between overflow-hidden border ${
        isGreen
          ? 'bg-gradient-to-br from-[#36B936] via-[#2A9E2A] to-[#1A681A] border-white/20 shadow-[0_20px_50px_rgba(54,185,54,0.18)]'
          : 'bg-gradient-to-br from-[#0D2A22] via-[#0A4D26] to-[#042B18] border-[#36B936]/20 shadow-[0_20px_50px_rgba(6,68,35,0.35)]'
      }`}
    >
      {!isGreen && (
        <div className="absolute -top-10 -right-10 w-48 sm:w-64 h-48 sm:h-64 bg-[#36B936]/[0.14] blur-[70px] sm:blur-[80px] pointer-events-none rounded-full" />
      )}
      {isGreen && (
        <div className="absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
      )}

      <div className="relative z-10 flex flex-col h-full">
        <span
          className={`inline-flex w-fit items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 sm:mb-5 ${
            isGreen ? 'bg-white/10 border border-white/20' : 'bg-[#36B936]/10 border border-[#36B936]/25'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isGreen ? 'bg-white' : 'bg-[#36B936]'}`} />
          <span
            className={`text-[0.65rem] sm:text-[0.7rem] font-medium tracking-[0.08em] uppercase ${
              isGreen ? 'text-white' : 'text-[#8FE38F]'
            }`}
          >
            {label}
          </span>
        </span>

        <p
          className={`text-[1.1rem] sm:text-[1.25rem] font-medium leading-snug max-w-[90%] mb-5 ${
            isGreen ? 'text-white' : 'text-[#B7E9BE]'
          }`}
        >
          {description}
        </p>

        <ul className="space-y-2.5 flex-1 mb-8">
          {features.map((feature) => (
            <li
              key={feature}
              className={`flex items-start gap-2.5 text-[0.75rem] sm:text-[0.8rem] font-light leading-snug ${
                isGreen ? 'text-white/90' : 'text-[#B7E9BE]/90'
              }`}
            >
              <CheckIcon className={isGreen ? 'text-white' : 'text-[#36B936]'} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div>
          <Link
            href={buttonUrl}
            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-[0.75rem] sm:text-[0.8rem] font-medium tracking-[0.01em] transition-all duration-200 hover:scale-[1.02] ${
              isGreen
                ? 'bg-[#0D2A22] text-[#36B936] hover:bg-[#081d17]'
                : 'bg-white text-[#0A4D26] hover:bg-[#EFF7EF]'
            }`}
          >
            <span>{buttonLabel}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div
        className={`absolute -right-4 sm:-right-6 -bottom-4 sm:-bottom-6 pointer-events-none ${
          isGreen ? 'text-white opacity-20' : 'opacity-[0.14]'
        }`}
      >
        <Mark className="w-[110px] h-[110px] sm:w-[150px] sm:h-[150px]" />
      </div>
    </motion.div>
  );
};

export default IntegrationCardTile;