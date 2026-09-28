'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface RowProps {
  number: string;
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Row({
  number,
  title,
  description,
  isOpen,
  onToggle,
}: RowProps) {
  return (
    <div
      onClick={onToggle}
      className="group relative flex w-full flex-col cursor-pointer border-b border-[#0A4D26]/10 transition-colors duration-500 overflow-hidden"
    >
      {/* Editorial green gradient sweep on hover matching your brand aesthetic */}
      <div
        aria-hidden
        className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#0a4d26]/5 to-[#36B936]/10 transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      <div className="relative grid w-full grid-cols-1 items-center gap-3 px-4 py-6 sm:grid-cols-12 sm:gap-4 sm:px-8 md:gap-6 md:px-10">
        {/* Step Number / Icon Column */}
        <div className="flex items-center gap-3 sm:col-span-1">
          <span className="text-sm font-medium text-[#36B936]">
            {number}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-medium tracking-tight text-[#0A4D26] transition-colors duration-500 sm:col-span-8 sm:text-xl lg:text-2xl">
          {title}
        </h3>

        {/* Arrow Toggle Indicator */}
        <span
          aria-hidden
          className="flex justify-start text-xl text-[#0A4D26]/60 transition-transform duration-500 ease-out sm:col-span-3 sm:justify-end"
          style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
        >
          →
        </span>
      </div>

      {/* Accordion Expandable Description */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-6 sm:px-8 sm:pb-8 md:px-10 max-w-3xl">
              <p className="text-sm sm:text-base font-light text-[#2D6A4F] leading-relaxed">
                {description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}