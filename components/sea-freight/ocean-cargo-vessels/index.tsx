'use client';

import type { ComponentType } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Box, Package, Truck, Layers, Flame, Wind } from 'lucide-react';
import { type Vessel, SEA_VESSELS, type SEA_VESSELSContent } from '../content';
import { cmsSection } from '@/components/cms/CmsProvider';

const EASE = [0.22, 1, 0.36, 1] as const;

function VesselCard({ vessel, index }: { vessel: Vessel; index: number }) {
  const Icon = vessel.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: EASE, delay: index * 0.09 }}
      className="flex flex-col"
    >
      {/* Mobile: 1 column, medium square card. sm+: 3/4 in a 2/3-col grid */}
      <div className="relative w-full aspect-square sm:aspect-[3/4] rounded-2xl overflow-hidden border border-[#0A4D26]/10 bg-[#F0F0EE]">
        <Image
          src={vessel.image}
          alt={vessel.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(4,50,28,0) 24%, rgba(4,50,28,0.55) 58%, rgba(3,28,16,0.94) 100%)',
          }}
        />

        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-4 sm:p-4 md:p-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#36B936] text-white">
              <Icon size={14} strokeWidth={2} />
            </span>
            <h3 className="text-[1.1rem] font-medium leading-tight text-white sm:text-[1.05rem] md:text-[1.2rem]">
              {vessel.name}
            </h3>
          </div>

          <p className="mb-2 text-[0.85rem] leading-snug text-white/90 sm:text-[0.85rem]">
            {vessel.purpose}
          </p>

          <p className="border-t border-white/20 pt-2 text-[0.8rem] leading-snug text-white sm:text-[0.8rem]">
            {vessel.feature}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function OceanCargoVessels({ content }: { content: SEA_VESSELSContent }) {
  return (
    <section className="w-full py-10 sm:py-20 lg:py-24 bg-white font-sans">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-[clamp(2rem,6vw,4rem)]"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-[#36B936] font-medium text-xs sm:text-sm tracking-wider uppercase">
              {content.eyebrow}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#1b4332] leading-[1.15] max-w-[720px] mx-auto">
            {content.heading}
          </h2>

          <p className="mt-4 sm:mt-5 text-[#2d6a4f] font-light text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed max-w-[520px] mx-auto">
            {content.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {content.vessels.map((vessel, i) => (
            <VesselCard key={vessel.type} vessel={vessel} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default cmsSection('sea-freight.vessels', SEA_VESSELS, OceanCargoVessels);
