'use client';

import type { FC, ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';

// ---------------------------------------------------------------------------
// Content — verbatim from brand guide
// ---------------------------------------------------------------------------
const defaultContent = {
  heading: 'How We Work',
  philosophy:
    'We combine technology, expertise, and human judgment to move shipments with control — not just speed. Every decision, from route planning to customer support, is built on that same principle: intelligent movement, not just movement.',
  certIntro: 'That discipline is independently certified:',
  certifications: [
    { code: 'ISO 9001', name: 'Quality Management' },
    { code: 'ISO 14001', name: 'Environmental Management' },
    { code: 'ISO 45001', name: 'Occupational Health & Safety' },
    { code: 'ISO 27001', name: 'Information Security Management' },
  ],
};

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// ---------------------------------------------------------------------------
// Clean minimalist icons
// ---------------------------------------------------------------------------
const IconBase: FC<{ children: ReactNode }> = ({ children }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
    {children}
  </svg>
);

const QualityMark: FC = () => (
  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#36B936" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
);

const LeafMark: FC = () => (
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#36B936" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
);

const SafetyMark: FC = () => (
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 8v4m0 4h.01" stroke="#36B936" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
);

const SecurityMark: FC = () => (
  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="#36B936" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
);

const certMarks = [QualityMark, LeafMark, SafetyMark, SecurityMark];

const HowWeWork: FC = () => {
  const data = defaultContent;

  return (
    <section
      className="w-full overflow-hidden relative select-none py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#042B18] font-sans"
    >
      {/* Soft radial ambient glow */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#36B936]/[0.03] blur-[160px] pointer-events-none rounded-full" />

      <motion.div
        className="max-w-[1280px] mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20 items-stretch">
          {/* Left: heading + philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2.5 mb-4 sm:mb-5">
                <span className="w-2 h-2 rounded-full bg-[#36B936]" />
                <span className="text-[#36B936] text-xs sm:text-sm font-medium tracking-wider uppercase">
                  {data.heading}
                </span>
              </motion.div>

              <motion.p
                variants={fadeUpVariants}
                className="text-white text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-[1.15]"
              >
                {data.philosophy}
              </motion.p>
            </div>

            <motion.p
              variants={fadeUpVariants}
              className="text-white/40 text-xs sm:text-sm font-medium tracking-wider uppercase mt-8 lg:mt-12"
            >
              {data.certIntro}
            </motion.p>
          </div>

          {/* Right: minimal, clean accreditation list */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3 sm:space-y-4">
            {data.certifications.map((cert, idx) => {
              const Mark = certMarks[idx];
              return (
                <motion.div
                  key={cert.code}
                  variants={fadeUpVariants}
                  className="group px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <IconBase>
                      <Mark />
                    </IconBase>
                    <span className="text-white/80 text-[0.8rem] sm:text-[0.85rem] font-light tracking-wide group-hover:text-white transition-colors">
                      {cert.name}
                    </span>
                  </div>

                  <span className="text-[#8FE38F]/80 text-[0.7rem] sm:text-[0.75rem] font-mono tracking-widest uppercase">
                    {cert.code}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HowWeWork;