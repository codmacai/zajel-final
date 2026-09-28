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
  const delay = index * 0.08;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...SMOOTH_TRANSITION, duration: 0.7, delay }}
      className="group relative flex flex-col justify-between p-7 sm:p-8 md:p-10 min-h-[260px] sm:min-h-[300px] bg-[#F9FAFB] hover:bg-[#36B936] transition-colors duration-300 cursor-pointer"
    >
      <div className="flex flex-col h-full justify-between z-10">
        <div>
          {/* Icon wrapper uses currentColor so that when stroke="#36B936" is used in the SVG, 
              it automatically inherits text color and transitions from dark green (#0A4D26) to pure white (#ffffff) on hover */}
          <div className="mb-6 text-[#0A4D26] group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1 [&_svg]:w-7 [&_svg]:h-7 sm:[&_svg]:w-8 sm:[&_svg]:h-8 [&_svg_*]:stroke-[currentColor]">
            <Icon />
          </div>

          <h3 className="text-lg sm:text-[1.25rem] font-normal leading-snug tracking-tight mb-3 text-[#0A4D26] group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
        </div>

        <p className="text-xs sm:text-sm font-light leading-relaxed text-[#2D6A4F] group-hover:text-white/90 transition-colors duration-300">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default BusinessGetsCard;