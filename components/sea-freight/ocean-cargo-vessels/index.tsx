'use client';

import type { ComponentType } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Box, Package, Truck, Layers, Flame, Wind } from 'lucide-react';

const BRAND = {
  hairline: 'rgba(6,68,35,0.12)',
};

const EASE = [0.22, 1, 0.36, 1] as const;
const smoothTransition = { duration: 0.5, ease: EASE };

type VesselType = 'container' | 'general' | 'roro' | 'bulk' | 'gas' | 'livestock';

type Vessel = {
  type: VesselType;
  name: string;
  purpose: string;
  feature: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  image: string;
};

const VESSELS: Vessel[] = [
  {
    type: 'container',
    name: 'Container Vessel',
    purpose: 'Transports standard ISO containers (20ft/40ft)',
    feature: 'Fast loading and unloading at container terminals with gantry cranes',
    icon: Box,
    image: '/sea-freight/oceancargo/ChatGPT Image Sep 9, 2026, 03_49_23 AM.png',
  },
  {
    type: 'general',
    name: 'General Cargo Vessel',
    purpose: 'Transports loose, non-containerized, non-bulk cargo — oversized loads, machines, equipment',
    feature: 'Flexible space for different cargo types, using its own cranes to load and unload',
    icon: Package,
    image: '/sea-freight/oceancargo/ChatGPT Image Sep 2, 2026, 03_00_54 AM.png',
  },
  {
    type: 'roro',
    name: 'RORO Vessel',
    purpose: 'Transports wheeled cargo like cars, trucks and trailers',
    feature: 'Cargo is driven on and off via built-in ramps — no crane needed',
    icon: Truck,
    image: '/sea-freight/oceancargo/ChatGPT Image Sep 2, 2026, 02_56_24 AM.png',
  },
  {
    type: 'bulk',
    name: 'Bulk Carrier Vessel',
    purpose: 'Carries unpackaged bulk cargo like coal, grain and iron ore',
    feature: 'Large cargo holds, sometimes with onboard cranes for self-loading',
    icon: Layers,
    image: '/sea-freight/oceancargo/ChatGPT Image Sep 2, 2026, 03_00_33 AM.png',
  },
  {
    type: 'gas',
    name: 'Gas Carrier Vessel',
    purpose: 'Transports liquefied gases like LNG and LPG',
    feature: 'Highly specialized tanks with temperature and pressure control systems',
    icon: Flame,
    image: '/sea-freight/oceancargo/ChatGPT Image Sep 2, 2026, 03_00_43 AM.png',
  },
  {
    type: 'livestock',
    name: 'Livestock Carrier Vessel',
    purpose: 'Transports live animals, such as cattle and sheep, over sea routes',
    feature: 'Modified decks with ventilation, feeding and waste systems for animal welfare',
    icon: Wind,
    image: '/sea-freight/oceancargo/ChatGPT Image Sep 2, 2026, 03_01_05 AM.png',
  },
];

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
      <div className="relative w-full aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border border-[#0A4D26]/10 bg-[#F0F0EE]">
        <Image
          src={vessel.image}
          alt={vessel.name}
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(4,50,28,0) 24%, rgba(4,50,28,0.55) 58%, rgba(3,28,16,0.94) 100%)',
          }}
        />

        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-6 flex flex-col justify-end">
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#36B936] text-white shrink-0">
              <Icon size={13} strokeWidth={2} />
            </span>
            <h3 className="text-white text-[0.85rem] xs:text-[0.95rem] sm:text-[1.05rem] md:text-[1.2rem] font-medium leading-tight">
              {vessel.name}
            </h3>
          </div>

          <p className="text-[0.75rem] xs:text-[0.8rem] sm:text-[0.85rem] leading-snug mb-1.5 sm:mb-2 text-white/90 line-clamp-2 sm:line-clamp-none">
            {vessel.purpose}
          </p>
          
          <p className="text-[0.7rem] xs:text-[0.75rem] sm:text-[0.8rem] leading-snug pt-1.5 sm:pt-2 border-t border-white/20 text-white line-clamp-2 sm:line-clamp-none">
            {vessel.feature}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function OceanCargoVessels() {
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
            <span className="w-8 h-[2px]" style={{ backgroundColor: '#36B936' }} />
            <span className="text-[#36B936] font-medium text-xs sm:text-sm tracking-wider uppercase">
              Fleet Guide
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#1b4332] leading-[1.15] max-w-[720px] mx-auto">
            Ocean cargo vessels
          </h2>

          <p className="mt-4 sm:mt-5 text-[#2d6a4f] font-light text-sm sm:text-lg leading-relaxed max-w-[520px] mx-auto">
            Types, purpose and key feature.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
          {VESSELS.map((vessel, i) => (
            <VesselCard key={vessel.type} vessel={vessel} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}