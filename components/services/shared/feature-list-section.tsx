'use client';

import { motion } from 'framer-motion';
import { fadeUp } from './motion';
import type { FeatureSectionContent } from './types';

const FeatureListSection = ({ title, highlight, description, features }: FeatureSectionContent) => {
  return (
    <section className="w-full py-14 sm:py-20 lg:py-28 px-5 sm:px-8 md:px-12 lg:px-20 bg-white font-['Manrope',sans-serif]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          
          {/* Left Column: Heading and Description */}
          <motion.div {...fadeUp()} className="lg:col-span-5 text-start">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0B140F] font-medium tracking-tight leading-[1.15] mb-4 sm:mb-6 whitespace-pre-line">
              {title}
              {highlight && <span className="text-[#36B936]"> {highlight}</span>}
            </h2>
            <p className="text-[#4B5750] font-normal text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed max-w-[50ch]">
              {description}
            </p>
          </motion.div>

          {/* Right Column: Numbered Features List */}
          <ol className="lg:col-span-7 flex flex-col gap-6 sm:gap-8 lg:gap-10 text-start list-none">
            {features.map((feature, i) => (
              <motion.li key={feature.title} {...fadeUp(i * 0.08)} className="group flex gap-4 sm:gap-6">
                <span className="w-8 sm:w-12 shrink-0 text-[#36B936]/40 text-xl sm:text-2xl lg:text-3xl font-light leading-none tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col min-w-0">
                  <h3 className="text-[#0B140F] group-hover:text-[#36B936] transition-colors duration-300 text-base sm:text-lg font-medium mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-[#4B5750] font-normal leading-relaxed text-xs sm:text-sm">
                    {feature.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>

        </div>
      </div>
    </section>
  );
};

export default FeatureListSection;