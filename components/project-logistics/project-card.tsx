'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project } from './types';

const EASE = [0.2, 0.8, 0.2, 1] as const;

interface ProjectCardProps extends Project {
  index: number;
}

const ProjectCard = ({ title, place, caption, image, alt, index }: ProjectCardProps) => {
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center ${
        isReversed ? 'lg:direction-rtl' : ''
      }`}
    >
      {/* Image — always first in DOM (for accessibility/mobile order),
          reordered visually via lg:order-* so alternation is purely visual */}
      <div
        className={`relative lg:col-span-7 overflow-hidden rounded-2xl aspect-[16/10] bg-[#0A4D26]/5 ${
          isReversed ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.03]"
        />
      </div>

      {/* Text */}
      <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
        <span className="text-[#0A4D26]/30 text-[0.7rem] font-mono tracking-wide">
          {String(index + 1).padStart(2, '0')} / Selected work
        </span>
        <h3 className="mt-3 text-xl sm:text-2xl font-medium text-[#0A4D26] leading-snug tracking-tight">
          {title}
        </h3>
        <p className="mt-2 text-[#36B936] text-[0.85rem] font-medium">{place}</p>
        <p className="mt-4 text-[#0A4D26]/60 text-[0.9rem] font-light leading-relaxed max-w-[46ch]">
          {caption}
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;