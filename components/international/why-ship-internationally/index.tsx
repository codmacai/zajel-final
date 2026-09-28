'use client';

import type { ComponentType } from 'react';
import { motion } from 'framer-motion';

const LIGHT_GREEN = '#36B936';

// ---------------------------------------------------------------------------
// Minimal Line Icons (strokeWidth reduced to 1.25)
// ---------------------------------------------------------------------------
const svgProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'w-7 h-7 sm:w-8 sm:h-8 mb-4',
  'aria-hidden': true,
};

const GlobeIcon = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 3.75 5.5 3.75 9S14.5 20.5 12 21c-2.5-2.5-3.75-5.5-3.75-9S9.5 3.5 12 3Z" />
  </svg>
);

const ClockIcon = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

const TrackingIcon = () => (
  <svg {...svgProps}>
    <path d="M12 21s7-6.5 7-11.5A7 7 0 1 0 5 9.5C5 14.5 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.3" />
  </svg>
);

const ExperienceIcon = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="8.5" r="5.5" />
    <path d="M8.5 13 7 21l5-2.5L17 21l-1.5-8" />
  </svg>
);

// ---------------------------------------------------------------------------
// Content & Types
// ---------------------------------------------------------------------------
interface FeatureCard {
  id: string;
  Icon: ComponentType;
  title: string;
  description: string;
}

const EYEBROW = 'Global Reach';
const HEADING = 'Why Ship Internationally With Zajel';
const DESCRIPTION =
  'Expand your global footprint with seamless international shipping backed by reliable transit networks, fast customs clearance, and global coverage.';

const CARDS: FeatureCard[] = [
  { id: 'countries', Icon: GlobeIcon, title: '200+ Countries Reached', description: 'A global network from a single pickup in the UAE.' },
  { id: 'delivery', Icon: ClockIcon, title: '3-4 Day Delivery', description: 'Fast, predictable transit times, worldwide.' },
  { id: 'tracking', Icon: TrackingIcon, title: 'Real-Time Tracking', description: 'Follow your shipment from pickup to delivery.' },
  { id: 'experience', Icon: ExperienceIcon, title: '15+ Years of Experience', description: 'A track record built on 45M+ shipments.' },
];

interface FeatureCardTileProps {
  Icon: ComponentType;
  title: string;
  description: string;
}

const FeatureCardTile = ({ Icon, title, description }: FeatureCardTileProps) => (
  <div className="group relative flex flex-col justify-between p-7 sm:p-8 min-h-[260px] sm:min-h-[300px] bg-[#F9FAFB] hover:bg-[#36B936] transition-colors duration-300 cursor-pointer">
    <div className="flex flex-col h-full justify-between z-10">
      <div>
        {/* Minimal Icon in #36B936 green by default */}
        <div className="mb-4 text-[#36B936] group-hover:text-white transition-colors duration-300">
          <Icon />
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-[1.25rem] font-medium leading-snug tracking-tight mb-3 text-[#0A4D26] group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm font-light leading-relaxed text-[#2D6A4F] group-hover:text-white/90 transition-colors duration-300">
        {description}
      </p>
    </div>
  </div>
);

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
});

// ---------------------------------------------------------------------------
// Section Component
// ---------------------------------------------------------------------------
const WhyShipInternationally = () => (
  <section className="w-full relative overflow-hidden py-16 sm:py-24 lg:py-32 bg-white font-sans">
    <div className="max-w-[1200px] mx-auto relative z-10 px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="max-w-[680px] mx-auto text-center mb-12 sm:mb-16">
        <motion.div {...fade()} className="flex items-center justify-center gap-3 mb-4">
          <span className="w-6 h-[2px]" style={{ backgroundColor: LIGHT_GREEN }} />
          <span className="text-xs sm:text-sm font-medium tracking-wider uppercase" style={{ color: LIGHT_GREEN }}>
            {EYEBROW}
          </span>
          <span className="w-6 h-[2px]" style={{ backgroundColor: LIGHT_GREEN }} />
        </motion.div>

        <motion.h2
          {...fade(0.1)}
          className="text-2xl sm:text-3xl md:text-4xl text-[#0A4D26] font-medium tracking-tight mb-4"
        >
          {HEADING}
        </motion.h2>

        <motion.p
          {...fade(0.2)}
          className="text-[#2D6A4F] font-light text-sm leading-relaxed max-w-[520px] mx-auto"
        >
          {DESCRIPTION}
        </motion.p>
      </div>

      {/* 4-Card Unified Grid Container */}
      <motion.div
        {...fade(0.3)}
        className="grid grid-cols-1 md:grid-cols-4 w-full bg-[#F9FAFB] rounded-[2rem] border border-gray-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden divide-y md:divide-y-0 md:divide-x divide-gray-200/80"
      >
        {CARDS.map((card) => (
          <FeatureCardTile
            key={card.id}
            Icon={card.Icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </motion.div>
    </div>
  </section>
);

export default WhyShipInternationally;