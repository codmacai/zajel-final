'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '../icons';
import { builtForBlocks } from '../data';

const EASE = [0.2, 0.8, 0.2, 1] as const;

export default function BuiltForBusiness() {
  return (
    <section className="w-full overflow-hidden bg-[#FAFCFA] px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24 lg:px-20 lg:py-32 font-['Manrope',sans-serif]">
      <div className="mx-auto max-w-[1320px]">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto mb-12 sm:mb-16 md:mb-20 max-w-[720px] text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 bg-[#36B936]" />
            <h2 className="text-xs sm:text-sm font-medium uppercase tracking-wider text-[#36B936]">Enterprise Solutions</h2>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight text-[#0A4D26]">
            Built for the Way You Do Business
          </h2>
        </motion.div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {builtForBlocks.map((block, blockIndex) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: EASE, delay: blockIndex * 0.12 }}
              className="group flex h-full flex-col rounded-3xl border border-[#0A4D26]/10 bg-white p-6 sm:p-8 md:p-10 shadow-[0_12px_40px_rgba(10,77,38,0.06)] transition-all duration-500 hover:border-[#36B936]/30 hover:shadow-[0_20px_50px_rgba(10,77,38,0.12)] hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="mb-8">
                <span className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#36B936]">
                  {block.eyebrow}
                </span>
                <h3 className="mb-3 text-xl sm:text-2xl font-medium leading-snug text-[#0A4D26]">
                  {block.heading}
                </h3>
                <p className="text-xs sm:text-sm font-normal leading-relaxed text-[#2d6a4f]">
                  {block.intro}
                </p>
              </div>

              {/* Points List */}
              <div className="flex flex-1 flex-col gap-4">
                {block.points.map((point) => (
                  <div
                    key={point.title}
                    className="flex items-start gap-4 rounded-2xl border border-[#0A4D26]/[0.06] bg-[#FAFCFA] p-4 sm:p-5 transition-colors duration-300 group-hover:border-[#0A4D26]/10"
                  >
                    <span className="mt-0.5 flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-[#36B936]/10 text-[#36B936]">
                      <CheckIcon className="h-4 w-4 text-[#36B936]" />
                    </span>
                    <div>
                      <h4 className="mb-1 text-sm sm:text-base font-medium tracking-tight text-[#0A4D26]">
                        {point.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs font-normal leading-relaxed text-[#2d6a4f]">
                        {point.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}