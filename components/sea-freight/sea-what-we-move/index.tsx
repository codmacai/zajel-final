'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const EASE = [0.2, 0.8, 0.2, 1] as const;

interface CargoItem {
  id: string;
  label: string;
  description: string;
  image: string;
}

const CARGO_ITEMS: CargoItem[] = [
  {
    id: 'general',
    label: 'General Cargo',
    description: 'Commercial goods and parcels',
    image: '/sea-freight/whatwemove/ChatGPT Image Sep 2, 2026, 09_45_34 AM.webp',
  },
  {
    id: 'oversized',
    label: 'Oversized & Project Cargo',
    description: 'Large-format and heavy-lift shipments',
    image: '/sea-freight/whatwemove/ChatGPT Image Sep 2, 2026, 09_58_47 AM.webp',
  },
  {
    id: 'oil-gas',
    label: 'Oil & Gas Equipment',
    description: 'Industrial and energy-sector machinery',
    image: '/sea-freight/whatwemove/ChatGPT Image Sep 2, 2026, 09_58_54 AM.webp',
  },
  {
    id: 'hazmat',
    label: 'Hazardous Materials',
    description: 'Handled to full compliance standards',
    image: '/sea-freight/whatwemove/ChatGPT Image Sep 2, 2026, 09_59_13 AM.webp',
  },
];

interface CargoCardProps extends CargoItem {
  index: number;
}

const CargoCard = ({ label, description, image, index }: CargoCardProps) => {
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
          src={image}
          alt={label}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-contain"
        />
      </div>

      <p className="text-[#0A4D26] font-medium text-[0.85rem] xs:text-[0.95rem] sm:text-[1.05rem] leading-tight mt-3 sm:mt-4">
        {label}
      </p>
      <p className="text-[#4B5750] text-[0.75rem] xs:text-[0.82rem] sm:text-[0.88rem] leading-snug mt-1 sm:mt-1.5">
        {description}
      </p>
    </motion.div>
  );
};

const SeaWhatWeMove = () => {
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
              Cargo Capability
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#1b4332] leading-[1.15] max-w-[720px] mx-auto">
            What We Move
          </h2>

          <p className="mt-4 sm:mt-5 text-[#2d6a4f] font-light text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed max-w-[520px] mx-auto">
            Comprehensive handling capabilities tailored to diverse commercial cargo requirements.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
          {CARGO_ITEMS.map((item, i) => (
            <CargoCard key={item.id} {...item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeaWhatWeMove;
