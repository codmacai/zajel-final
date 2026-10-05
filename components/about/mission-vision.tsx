'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
const defaultContent = {
  tagline: 'Who We Are',
  heading: 'Moving Goods, Businesses, & Communities',
  description:
    'We are dedicated to setting the standard for logistics across the region. Combining human expertise with advanced intelligence, we provide seamless movement, reliability, and care for every journey.',
  mission: {
    label: 'Our Mission',
    text: 'To move goods, businesses, and communities with intelligence, reliability, and care, by combining human judgment with advanced systems across the logistics spectrum.',
    image: '/about/mission/magnific_create-an-ultrarealistic-_5jNdEh1Kxe.webp',
  },
  vision: {
    label: 'Our Vision',
    text: "To become the region's most trusted and intelligently connected logistics partner, setting the standard for how movement works across the Middle East and beyond.",
    image: '/about/magnific_remove-the-text_s7Ghs1rl8e.webp',
  },
  stats: [
    { value: '17', label: 'Years of Success' },
    { value: '45M+', label: 'Shipments Delivered' },
    { value: '195', label: 'Countries Covered' },
    { value: '500+', label: 'Worldwide Destinations' },
  ],
};

const smoothTransition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

const MissionVision: FC = () => {
  const data = defaultContent;

  return (
    <section
      className="w-full py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-white select-none font-sans"
      aria-labelledby="mission-vision-heading"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header (split layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 mb-10 sm:mb-12 lg:mb-16 items-start">
          <div>
            <span className="text-[#36B936] text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 block">
              {data.tagline}
            </span>
            <h2
              id="mission-vision-heading"
              className="text-2xl sm:text-3xl md:text-4xl text-[#064423] font-medium tracking-tight leading-[1.15]"
            >
              {data.heading}
            </h2>
          </div>

          <div>
            <p className="text-[#064423]/70 text-sm sm:text-base font-light leading-relaxed">{data.description}</p>
          </div>
        </div>

        {/* Mission & Vision cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 mb-10 sm:mb-12 lg:mb-16">
          {[data.mission, data.vision].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...smoothTransition, delay: 0.1 + i * 0.1 }}
              className="relative h-[280px] xs:h-[320px] sm:h-[380px] lg:h-[440px] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-sm group border border-[#064423]/[0.08]"
            >
              <Image
                src={card.image}
                alt={card.label}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#042B18]/60 via-transparent to-transparent pointer-events-none" />

              {/* Bottom overlay box */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/50">
                <h3 className="text-[#064423] text-[0.95rem] sm:text-[1.1rem] lg:text-[1.25rem] font-medium tracking-tight mb-1.5 sm:mb-2">
                  {card.label}
                </h3>
                <p className="text-[#064423]/70 text-[0.75rem] sm:text-[0.8rem] lg:text-[0.85rem] font-light leading-relaxed">
                  {card.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Track record stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {data.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...smoothTransition, delay: 0.1 * idx }}
              className="rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center border border-[#064423]/[0.08] bg-[#064423]/[0.02] transition-all duration-300 hover:shadow-md"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl text-[#36B936] font-medium tracking-tight mb-1.5 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-[#064423]/70 text-[0.75rem] sm:text-[0.8rem] font-light">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVision;