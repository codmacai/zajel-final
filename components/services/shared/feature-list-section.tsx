'use client';

import { motion } from 'framer-motion';
import { fadeUp } from './motion';
import type { FeatureSectionContent } from './types';

const FeatureListSection = ({ title, highlight, description, features }: FeatureSectionContent) => {
  return (
    <section className="w-full py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-white font-sans">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-start">
          <motion.div {...fadeUp()} className="lg:col-span-5 text-start">
            <h2 className="text-[1.75rem] min-[375px]:text-3xl sm:text-4xl lg:text-[2.75rem] text-[#0A4D26] font-medium tracking-tight leading-[1.1] mb-4 sm:mb-5 whitespace-pre-line">
              {title}
              {highlight && <span className="text-[#36B936]">{highlight}</span>}
            </h2>
            <p className="text-gray-500 font-light text-[15px] sm:text-base lg:text-lg leading-relaxed">
              {description}
            </p>
          </motion.div>

          <ol className="lg:col-span-7 flex flex-col gap-7 sm:gap-10 lg:gap-12 text-start list-none">
            {features.map((feature, i) => (
              <motion.li key={feature.title} {...fadeUp(i * 0.08)} className="group flex gap-4 sm:gap-6">
                <span className="w-9 sm:w-14 shrink-0 text-[#36B936]/25 text-2xl sm:text-4xl font-light leading-none tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col">
                  <h3 className="text-[#0A4D26] group-hover:text-[#36B936] transition-colors duration-300 text-lg sm:text-xl font-medium mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 font-light leading-relaxed text-sm sm:text-[15px]">
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
