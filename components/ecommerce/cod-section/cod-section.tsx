'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { EYEBROW, ROWS } from './data';
import Row from './cod-row';

const SMOOTH_TRANSITION = {
  type: "spring" as const,
  damping: 25,
  stiffness: 120,
};

const LIGHT_GREEN = "#36B936";

const CodSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 bg-white overflow-hidden font-['Manrope',sans-serif]">
      <div className="max-w-[840px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ...SMOOTH_TRANSITION, duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: LIGHT_GREEN }}>
              {EYEBROW}
            </span>
          </div>

          <h2 className="mx-auto max-w-[700px] text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-[#0A4D26] tracking-tight px-2">
            Cash on Delivery remains a core preference in the UAE — Zajel{' '}
            <span className="text-[#2D6A4F] font-light">collects and remits funds seamlessly</span> so your business avoids all cash handling friction.
          </h2>
        </motion.div>

        {/* Minimalist stacked list with consistent padding and dividers */}
        <div className="border-t border-[#0A4D26]/10">
          {ROWS.map((row, i) => (
            <Row
              key={row.number}
              {...row}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodSection;