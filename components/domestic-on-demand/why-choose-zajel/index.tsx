'use client';

import type { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FeatureCardTile } from './feature-card';

export interface FeatureCard {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
}

const svgProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'w-6 h-6 sm:w-8 sm:h-8 mb-3 sm:mb-4',
  'aria-hidden': true,
};

const PricingIcon = () => (
  <svg {...svgProps}>
    <path d="M20 13.2 13.2 20a1.8 1.8 0 0 1-2.5 0L3.5 12.8V3.5h9.3L20 10.7a1.8 1.8 0 0 1 0 2.5Z" />
    <circle cx="8" cy="8" r="1" />
  </svg>
);

const TrackingIcon = () => (
  <svg {...svgProps}>
    <path d="M12 21s6.5-5.2 6.5-10.5a6.5 6.5 0 0 0-13 0C5.5 15.8 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.3" />
  </svg>
);

const ExperienceIcon = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="m8.8 13.6-1.3 7 4.5-2.6 4.5 2.6-1.3-7" />
  </svg>
);

const DoorstepIcon = () => (
  <svg {...svgProps}>
    <path d="M3.5 11 12 3.5 20.5 11" />
    <path d="M5.5 9.5V20.5h13V9.5" />
    <path d="M10 20.5v-5.5h4v5.5" />
  </svg>
);

const EYEBROW = 'Why Zajel';
const HEADING = 'Why Choose Zajel for On-Demand Delivery';
const DESCRIPTION =
  'Discover the operational advantages that make us the preferred logistics partner for businesses and individuals across the UAE.';

const CARDS: FeatureCard[] = [
  {
    id: 'pricing',
    icon: <PricingIcon />,
    title: 'Competitive Pricing',
    description: 'Attractive rates without cutting corners on speed.',
  },
  {
    id: 'tracking',
    icon: <TrackingIcon />,
    title: 'Real-Time Tracking',
    description: 'Know exactly where your delivery stands.',
  },
  {
    id: 'experience',
    icon: <ExperienceIcon />,
    title: '15+ Years of Experience',
    description: 'A track record built on 45M+ shipments.',
  },
  {
    id: 'doorstep',
    icon: <DoorstepIcon />,
    title: 'Doorstep Convenience',
    description: 'Pickup and delivery, no drop-off needed.',
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
});

const WhyChooseZajel: FC = () => (
  <section
    className="w-full relative overflow-hidden py-16 sm:py-24 lg:py-32 bg-white font-sans"
    aria-labelledby="why-choose-heading"
  >
    <div className="max-w-[1200px] mx-auto relative z-10 px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="max-w-[680px] mx-auto text-center mb-10 sm:mb-16">
        <motion.div {...fade()} className="flex items-center justify-center gap-3 mb-4">
          <span className="w-6 h-[2px] bg-[#36B936]" />
          <span className="text-[#36B936] font-medium text-xs sm:text-sm tracking-wider uppercase">
            {EYEBROW}
          </span>
          <span className="w-6 h-[2px] bg-[#36B936]" />
        </motion.div>

        <motion.h2
          id="why-choose-heading"
          {...fade(0.1)}
          className="text-2xl sm:text-3xl md:text-4xl text-[#0A4D26] font-medium tracking-tight mb-4"
        >
          {HEADING}
        </motion.h2>

        <motion.p
          {...fade(0.2)}
          className="text-[#2d6a4f] font-light text-sm leading-relaxed max-w-[520px] mx-auto"
        >
          {DESCRIPTION}
        </motion.p>
      </div>

      {/* 2x2 Grid on Mobile (grid-cols-2), 4-Column on Desktop (md:grid-cols-4) */}
      <motion.div
        {...fade(0.3)}
        className="grid grid-cols-2 md:grid-cols-4 w-full bg-gray-200/80 gap-[1px] rounded-2xl sm:rounded-[2rem] border border-gray-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden"
      >
        {CARDS.map((card) => (
          <FeatureCardTile
            key={card.id}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </motion.div>
    </div>
  </section>
);

export default WhyChooseZajel;