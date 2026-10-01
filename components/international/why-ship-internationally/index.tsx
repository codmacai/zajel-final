'use client';

import type { ComponentType } from 'react';
import { motion } from 'framer-motion';

const LIGHT_GREEN = '#36B936';

// ---------------------------------------------------------------------------
// Minimal Line Icons (strokeWidth reduced to 1.25)
// Icon size scales with the card: smaller on phones, larger on desktop.
// ---------------------------------------------------------------------------
const svgProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'h-6 w-6 sm:h-8 sm:w-8 lg:h-9 lg:w-9',
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
  <div className="group relative flex h-full min-h-[190px] cursor-pointer flex-col bg-[#F9FAFB] p-4 transition-colors duration-300 hover:bg-[#36B936] active:bg-[#36B936] min-[400px]:min-h-[210px] min-[400px]:p-5 sm:min-h-[250px] sm:p-7 lg:min-h-[300px] lg:p-8">
    <div className="flex h-full flex-col justify-between gap-4">
      <div>
        {/* Icon: green by default, white on hover */}
        <div className="mb-3 text-[#36B936] transition-colors duration-300 group-hover:text-white group-active:text-white sm:mb-4">
          <Icon />
        </div>

        {/* Title */}
        <h3 className="text-[0.95rem] font-medium leading-snug tracking-tight text-[#0A4D26] transition-colors duration-300 group-hover:text-white group-active:text-white min-[400px]:text-base sm:text-lg lg:text-[1.25rem]">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-[0.7rem] font-light leading-relaxed text-[#2D6A4F] transition-colors duration-300 group-hover:text-white/90 group-active:text-white/90 min-[400px]:text-xs sm:text-sm">
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
  <section className="relative w-full overflow-hidden bg-white py-12 font-sans sm:py-20 lg:py-28 xl:py-32">
    <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="mx-auto mb-10 max-w-[680px] text-center sm:mb-14 lg:mb-16">
        <motion.div {...fade()} className="mb-3 flex items-center justify-center gap-3 sm:mb-4">
          <span
            className="text-xs sm:text-sm font-medium uppercase tracking-wider"
            style={{ color: LIGHT_GREEN }}
          >
            {EYEBROW}
          </span>
        </motion.div>

        <motion.h2
          {...fade(0.1)}
          className="mb-3 text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight text-[#0A4D26] sm:mb-4"
        >
          {HEADING}
        </motion.h2>

        <motion.p
          {...fade(0.2)}
          className="mx-auto max-w-[520px] text-[13px] sm:text-[13.5px] lg:text-[14px] font-light leading-relaxed text-[#2D6A4F]"
        >
          {DESCRIPTION}
        </motion.p>
      </div>

      {/*
        Card grid — 2 x 2 on phones and tablets, 4 across on large screens.
        `gap-px` over a tinted background draws the divider lines, so borders
        stay correct in every layout without divide-x / divide-y juggling.
      */}
      <motion.div
        {...fade(0.3)}
        className="grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] sm:rounded-[2rem] lg:grid-cols-4"
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