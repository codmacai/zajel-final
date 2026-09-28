'use client';

import { motion } from 'framer-motion';
import type { BusinessCard } from './types';

const SMOOTH_TRANSITION = {
  type: "spring" as const,
  damping: 25,
  stiffness: 120,
};

interface BusinessGetsCardProps extends BusinessCard {
  index: number;
}

const BusinessGetsCard = ({ Icon, title, description, index }: BusinessGetsCardProps) => {
  const delay = index * 0.09;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...SMOOTH_TRANSITION, duration: 0.8, delay }}
      className="flex flex-col justify-between rounded-2xl sm:rounded-[2rem] border border-[#0A4D26]/12 bg-white p-6 sm:p-8 lg:p-10 shadow-[0_16px_40px_rgba(6,68,35,0.04)] transition-all duration-300 hover:border-[#36B936]/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50"
    >
      <div>
        <div className="flex w-full justify-start">
          <motion.div
            initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ ...SMOOTH_TRANSITION, delay: 0.2 + delay }}
            className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-[#FAFBF8] shadow-sm text-[#0A4D26]"
          >
            <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#36B936]" />
          </motion.div>
        </div>

        <h3 className="mt-6 sm:mt-8 text-lg sm:text-[1.25rem] font-medium leading-snug tracking-[-0.005em] text-[#0A4D26]">
          {title}
        </h3>

        <div className="mt-4 h-[2px] w-8 bg-[#36B936]/30" />

        <p className="mt-4 text-xs sm:text-[0.9rem] font-light leading-relaxed text-[#2D6A4F]">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default BusinessGetsCard;