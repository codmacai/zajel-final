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
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="shrink-0 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
  >
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
    <section className="relative w-full select-none overflow-hidden bg-[#042B18] px-4 py-14 font-['Manrope',sans-serif] sm:px-6 sm:py-20 lg:px-12 lg:py-28">
      {/* Soft radial ambient glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-[#36B936]/[0.03] blur-[160px]" />

      <motion.div
        className="relative z-10 mx-auto max-w-[1280px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainerVariants}
      >
        <div className="grid grid-cols-1 items-stretch gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Left: eyebrow + philosophy + certification lead-in */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <motion.span
                variants={fadeUpVariants}
                className="mb-4 block text-[11px] font-medium uppercase tracking-wider text-[#36B936] sm:mb-5 sm:text-xs md:text-sm"
              >
                {data.heading}
              </motion.span>

              <motion.p
                variants={fadeUpVariants}
                className="text-[1.5rem] font-medium leading-[1.2] tracking-[-0.02em] text-white [text-wrap:pretty] sm:text-[1.875rem] md:text-3xl lg:text-[2.25rem]"
              >
                {data.philosophy}
              </motion.p>
            </div>

            <motion.p
              variants={fadeUpVariants}
              className="mt-8 text-[11px] font-medium uppercase tracking-wider text-white/55 sm:text-xs lg:mt-12"
            >
              {data.certIntro}
            </motion.p>
          </div>

          {/* Right: accreditation list, distributed to match the left column height */}
          <div className="flex flex-col justify-between gap-3 sm:gap-4 lg:col-span-5">
            {data.certifications.map((cert, idx) => {
              const Mark = certMarks[idx];
              return (
                <motion.div
                  key={cert.code}
                  variants={fadeUpVariants}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 transition-colors duration-300 hover:border-white/[0.18] sm:px-5 sm:py-[1.125rem]"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <IconBase>
                      <Mark />
                    </IconBase>
                    <span className="text-[0.875rem] font-light leading-snug tracking-tight text-white/85 transition-colors group-hover:text-white sm:text-[0.9375rem]">
                      {cert.name}
                    </span>
                  </div>

                  <span className="shrink-0 whitespace-nowrap text-[0.75rem] font-medium uppercase tracking-wider text-[#8FE38F] sm:text-[0.8125rem]">
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