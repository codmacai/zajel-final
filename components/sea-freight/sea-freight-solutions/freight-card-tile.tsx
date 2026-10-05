'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ComponentType } from 'react';

const EASE = [0.2, 0.8, 0.2, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: 0.1 + index * 0.08 },
  }),
};

const badgeVariants = {
  hidden: { opacity: 0, rotate: -45, scale: 0.5 },
  visible: (index: number) => ({
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE, delay: 0.2 + index * 0.08 },
  }),
};

interface FreightCardTileProps {
  id: string;
  Icon: ComponentType;
  image: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonUrl: string;
  index: number;
}

const FreightCardTile = ({
  Icon,
  image,
  title,
  description,
  buttonLabel,
  buttonUrl,
  index,
}: FreightCardTileProps) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={cardVariants}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 h-full"
    >
      {/* Photo area with icon badge */}
      <div className="relative shrink-0 h-32 sm:h-36 lg:h-44">
        <Image
          src={image}
          alt={title}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        <motion.div
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={badgeVariants}
          className="absolute -bottom-5 sm:-bottom-6 left-5 sm:left-7 w-11 h-11 sm:w-14 sm:h-14 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-md z-10 text-[#0A4D26]"
        >
          <Icon />
        </motion.div>
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1 p-5 pt-8 sm:p-7 sm:pt-10 lg:p-8 lg:pt-11">
        <h3 className="text-[#1b4332] font-medium tracking-tight leading-tight whitespace-pre-line text-lg sm:text-xl lg:text-[1.65rem] mb-3">
          {title}
        </h3>

        <p className="text-[#2d6a4f]/80 font-normal leading-relaxed flex-1 text-xs sm:text-sm lg:text-base whitespace-pre-line mb-6">
          {description}
        </p>

        <div>
          <Link
            href={buttonUrl}
            className="bg-[#36B936] hover:bg-[#2da32d] hover:scale-105 transition-all duration-200 text-white rounded-full inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium tracking-wide shadow-sm"
          >
            <span className="text-sm leading-none">+</span>
            <span>{buttonLabel}</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FreightCardTile;