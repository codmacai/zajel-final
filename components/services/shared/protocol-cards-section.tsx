'use client';

import { motion } from 'framer-motion';
import { EASE, fadeUp } from './motion';
import type { ProtocolSectionContent } from './types';

const ProtocolCardsSection = ({ title, subtitle, cards }: ProtocolSectionContent) => {
  return (
    <section className="w-full py-14 sm:py-20 lg:py-28 px-5 sm:px-8 md:px-12 lg:px-20 bg-white border-t border-[#0B140F]/10 font-['Manrope',sans-serif]">
      <div className="mx-auto max-w-[1280px]">
        
        {/* Section Header */}
        <motion.div {...fadeUp()} className="mb-10 sm:mb-14 lg:mb-16 text-start">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0B140F] font-medium tracking-tight leading-[1.15] mb-3 sm:mb-4">
            {title}
          </h2>
          <p className="text-[#4B5750] font-normal text-xs sm:text-sm md:text-base max-w-[640px] leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {cards.map(({ Icon, title: cardTitle, content }, i) => (
            <motion.article
              key={cardTitle}
              {...fadeUp((i % 3) * 0.1)}
              whileHover={{ y: -6, transition: { duration: 0.35, ease: EASE } }}
              className="flex flex-col h-full min-h-[220px] sm:min-h-[260px] lg:min-h-[280px] bg-[#36B936] rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-2xl transition-shadow duration-500 text-start"
            >
              {/* Icon Container with dark green icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 shrink-0 mb-4 sm:mb-6 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#0B140F]">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" strokeWidth={1.75} />
              </div>

              {/* Card Title */}
              <h3 className="text-[#0B140F] font-medium text-lg sm:text-xl lg:text-2xl leading-tight tracking-tight mb-2.5 sm:mb-3 whitespace-pre-line">
                {cardTitle}
              </h3>

              {/* Card Content Description */}
              <p className="flex-1 text-[#0B140F]/85 font-normal text-xs sm:text-sm leading-relaxed">
                {content}
              </p>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProtocolCardsSection;