'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;
const smoothTransition = { duration: 0.6, ease: EASE };

const CONTENT = {
  eyebrow: 'Fleet Flexibility',
  heading: 'The Right Vehicle for Every Package',
  description: 'Designed to handle everything from urgent document delivery to large, bulky cargo with absolute reliability and care.',
  motorbike: {
    label: 'Motorbike Delivery',
    image: '/domestic/AAFF_Bike.png',
    text: 'Built for speed. Ideal for documents, small parcels, and anything that needs to move quickly through city traffic.',
    features: ['Fast through traffic', 'Best for documents & small parcels', 'Same day and next day delivery'],
  },
  van: {
    label: 'Van Delivery',
    image: '/domestic/AAFF_Van_Lateral.png',
    text: 'Built for size. Ideal for bulky items, multiple parcels, and shipments too large for a motorbike.',
    features: ['Handles bulky or heavy packages', 'Room for multiple items', 'Same day and next day delivery'],
  },
};

const CheckIcon: FC<{ className?: string }> = ({ className = 'text-[#36B936]' }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    aria-hidden="true"
    className={`shrink-0 mt-[1px] ${className}`}
  >
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface VehicleCardProps {
  label: string;
  image: string;
  text: string;
  features: string[];
  delay: number;
  variant: 'filled' | 'outlined';
}

const VehicleCard: FC<VehicleCardProps> = ({ label, image, text, features, delay, variant }) => {
  const isFilled = variant === 'filled';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ ...smoothTransition, delay }}
      className={`relative w-full rounded-2xl sm:rounded-[2rem] overflow-hidden flex flex-col lg:flex-row items-stretch shadow-[0_16px_40px_rgba(6,68,35,0.06)] border ${
        isFilled
          ? 'bg-gradient-to-br from-[#36B936] to-[#247A24] border-transparent text-white'
          : 'bg-gradient-to-br from-[#0D2A22] via-[#0A4D26] to-[#042B18] border-[#36B936]/30 text-white'
      }`}
    >
      {/* Image container with fluid aspect ratio */}
      <div
        className={`relative w-full lg:w-[45%] aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto min-h-[220px] sm:min-h-[260px] flex items-center justify-center p-6 sm:p-8 shrink-0 ${
          isFilled ? 'bg-black/[0.06]' : 'bg-white/[0.03]'
        }`}
      >
        <Image
          src={image}
          alt={label}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-contain p-4 drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)]"
        />
      </div>

      {/* Content wrapper */}
      <div className="p-6 sm:p-8 lg:p-10 flex flex-col flex-1 justify-center min-w-0">
        <span
          className={`text-[11px] sm:text-[12px] font-medium tracking-[0.18em] uppercase mb-2 ${
            isFilled ? 'text-white/80' : 'text-[#36B936]'
          }`}
        >
          {label}
        </span>

        <p
          className={`text-[0.85rem] sm:text-[0.95rem] font-light leading-relaxed mb-6 ${
            isFilled ? 'text-white' : 'text-white/80'
          }`}
        >
          {text}
        </p>

        <ul className={`space-y-2.5 pt-4 border-t ${isFilled ? 'border-white/20' : 'border-white/10'}`}>
          {features.map((feature) => (
            <li
              key={feature}
              className={`flex items-center gap-2.5 text-[0.8rem] sm:text-[0.85rem] font-light leading-snug ${
                isFilled ? 'text-white/95' : 'text-white/70'
              }`}
            >
              <CheckIcon className={isFilled ? 'text-white' : 'text-[#36B936]'} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const ChooseVehicle: FC = () => {
  const data = CONTENT;

  return (
    <section
      className="w-full bg-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-10 overflow-hidden font-sans"
      aria-labelledby="choose-vehicle-heading"
    >
      <div className="max-w-[1080px] mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={smoothTransition}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
            <span style={{ color: '#36B936' }} className="font-medium text-xs sm:text-sm tracking-wider uppercase">
              {data.eyebrow}
            </span>
          </div>

          <motion.h2
            id="choose-vehicle-heading"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl text-[#0A4D26] font-medium tracking-tight leading-[1.15] max-w-[720px] mx-auto mb-4"
          >
            {data.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.1 }}
            className="text-[#2d6a4f] font-light text-[13px] sm:text-[14px] leading-relaxed max-w-[520px] mx-auto px-2"
          >
            {data.description}
          </motion.p>
        </motion.div>

        {/* Cards Stack */}
        <div className="flex flex-col gap-6 sm:gap-8">
          <VehicleCard {...data.motorbike} delay={0.1} variant="filled" />
          <VehicleCard {...data.van} delay={0.18} variant="outlined" />
        </div>
      </div>
    </section>
  );
};

export default ChooseVehicle;