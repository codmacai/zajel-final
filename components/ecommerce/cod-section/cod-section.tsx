'use client';

import { motion } from 'framer-motion';
import { EYEBROW, ROWS } from './data';

const SMOOTH_TRANSITION = {
  type: "spring" as const,
  damping: 25,
  stiffness: 120,
};

const LIGHT_GREEN = "#36B936";

const CodSection = () => {
  return (
    <section className="w-full py-16 sm:py-28 lg:py-40 px-4 sm:px-6 lg:px-12 bg-white overflow-hidden font-sans">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Ultra-Luxury Deep Emerald Gradient Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...SMOOTH_TRANSITION, duration: 0.9 }}
          className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-14 lg:p-20 shadow-[0_20px_50px_rgba(5,28,16,0.25)] border border-emerald-500/20"
          style={{
            background: "linear-gradient(135deg, #093318 0%, #051c10 100%)",
          }}
        >
          {/* Top ambient lighting glow */}
          <div 
            aria-hidden="true" 
            className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] h-[180px] sm:h-[220px] rounded-full blur-[70px] sm:blur-[90px]"
            style={{ background: "rgba(54, 185, 54, 0.15)" }}
          />

          {/* Header & Core Quote */}
          <div className="relative z-10 text-center max-w-[820px] mx-auto mb-12 sm:mb-20">
            {/* Eyebrow with side lines */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span className="font-medium text-xs sm:text-sm tracking-widest uppercase" style={{ color: LIGHT_GREEN }}>
                {EYEBROW}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.3] sm:leading-[1.25] text-white tracking-tight">
              Cash on Delivery remains a core preference in the UAE — Zajel{' '}
              <span className="text-[#36B936] font-light">collects and remits funds seamlessly</span> so your business avoids all cash handling friction.
            </h2>
          </div>

          {/* Minimalist Advantages Grid Built Directly Inside the Card */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-10 border-t border-white/10">
            {ROWS.slice(0, 3).map((item, index) => (
              <div key={item.number} className="flex flex-col group">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="text-xs font-medium text-[#36B936] uppercase tracking-wider">
                    0{index + 1}
                  </span>
                  <span className="h-px w-6 bg-white/20" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-medium tracking-tight text-white mb-1.5 sm:mb-2 transition-colors duration-300 group-hover:text-[#36B936]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm font-light text-white/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CodSection;