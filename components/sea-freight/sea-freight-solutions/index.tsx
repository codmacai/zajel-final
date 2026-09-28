'use client';

import { EYEBROW, HEADING, SUBHEADING, SEA_FREIGHT_CARDS } from './data';
import FreightCardTile from './freight-card-tile';

const SeaFreightSolutions = () => {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-12 bg-white overflow-hidden font-sans">
      <div className="mx-auto max-w-[1320px] w-full">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
            <span className="w-8 h-[2px]" style={{ backgroundColor: '#36B936' }} />
            <span className="text-[#36B936] font-medium text-xs sm:text-sm tracking-wider uppercase">
              {EYEBROW}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0A4D26] font-medium tracking-tight leading-[1.15] max-w-[720px] mx-auto">
            {HEADING}
          </h2>

          <p className="mt-4 sm:mt-5 text-[#2d6a4f] font-light text-sm sm:text-base lg:text-[1.1rem] leading-relaxed max-w-[520px] mx-auto">
            {SUBHEADING}
          </p>
        </div>

        {/* Responsive Grid displaying all 8 cards at once */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {SEA_FREIGHT_CARDS.map((card, i) => (
            <FreightCardTile key={card.id} {...card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeaFreightSolutions;