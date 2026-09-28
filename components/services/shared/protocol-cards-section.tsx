'use client';

import { motion } from 'framer-motion';
import { EASE, fadeUp } from './motion';
import type { ProtocolSectionContent } from './types';

const ProtocolCardsSection = ({ title, subtitle, cards }: ProtocolSectionContent) => {
  return (
    <section className="w-full py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-white border-t border-gray-100 font-sans">
      <div className="mx-auto max-w-[1200px]">
        <motion.div {...fadeUp()} className="mb-8 sm:mb-12 lg:mb-16 text-start">
          <h2 className="text-[1.75rem] min-[375px]:text-3xl sm:text-4xl lg:text-[2.75rem] text-[#0A4D26] font-medium tracking-tight leading-[1.1] mb-3 sm:mb-4">
            {title}
          </h2>
          <p className="text-[#0A4D26]/70 font-light text-[15px] sm:text-base lg:text-lg max-w-[640px]">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {cards.map(({ Icon, title: cardTitle, content }, i) => (
            <motion.article
              key={cardTitle}
              {...fadeUp((i % 3) * 0.1)}
              whileHover={{ y: -6, transition: { duration: 0.35, ease: EASE } }}
              className="flex flex-col h-full min-h-[220px] sm:min-h-[260px] lg:min-h-[280px] bg-[#36B936] rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-2xl transition-shadow duration-500 text-start"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 shrink-0 mb-4 sm:mb-6 rounded-full bg-white shadow-sm flex items-center justify-center text-[#36B936]">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" strokeWidth={1.5} />
              </div>
              <h3 className="text-white font-medium text-[1.15rem] sm:text-2xl lg:text-[1.75rem] leading-tight tracking-tight mb-3 sm:mb-4 whitespace-pre-line">
                {cardTitle}
              </h3>
              <p className="flex-1 text-white/90 font-light text-[13px] sm:text-sm leading-relaxed">
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
