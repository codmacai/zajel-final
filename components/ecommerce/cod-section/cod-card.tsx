'use client';

import { motion } from 'framer-motion';

interface CodCardProps {
  number: string;
  title: string;
  description: string;
  index: number;
}

export default function CodCard({ number, title, description, index }: CodCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a4d26] to-[#123821] p-8 sm:p-10 border border-white/10 shadow-[0_16px_36px_-16px_rgba(10,77,38,0.45)] transition-all duration-500 hover:border-[#36B936]/40 hover:shadow-[0_24px_50px_rgba(10,77,38,0.6)]"
    >
      {/* Subtle interior lighting sheen on hover */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.07] to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
      />

      {/* Top row: Card Number & Action Arrow */}
      <div className="relative z-10 flex items-center justify-between mb-8">
        <span className="text-xs font-medium tracking-wider text-[#36B936] uppercase">
          Advantage {number}
        </span>
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-500 group-hover:bg-[#36B936] group-hover:text-black">
          <span className="text-xs font-medium">→</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white mb-3">
          {title}
        </h3>
        <p className="text-sm sm:text-base font-light text-white/80 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom accent glow line on hover */}
      <div 
        aria-hidden="true" 
        className="absolute bottom-0 left-8 right-8 h-[2px] bg-[#36B936] scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100" 
      />
    </motion.div>
  );
}