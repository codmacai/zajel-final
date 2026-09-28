'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Project } from './types';

const EASE = [0.2, 0.8, 0.2, 1] as const;

interface ProjectCardProps extends Project {
  index: number;
  ctaText?: string;
  ctaHref?: string;
}

const ProjectCard = ({
  title,
  place,
  caption,
  image,
  alt,
  index,
  ctaText = 'Request a Quote',
  ctaHref = '/quote',
}: ProjectCardProps) => {
  const isReversed = index % 2 === 1;
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE }}
      // Mobile: one unified card. Desktop: two separate cards in a grid.
      className="grid grid-cols-1 overflow-hidden rounded-[1.5rem] border border-[#0A4D26]/10 bg-[#F8F9F8] shadow-sm lg:grid-cols-12 lg:gap-5 lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none"
    >
      {/* Image */}
      <div
        className={`group relative aspect-[16/10] overflow-hidden bg-[#0A4D26]/5 lg:col-span-5 lg:aspect-auto lg:min-h-[380px] lg:rounded-[2rem] ${
          isReversed ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Mobile-only label on the image so it's clear which project it is */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 bg-gradient-to-b from-[#0B140F]/55 to-transparent p-3 sm:p-4 lg:hidden">
          <span className="rounded-full bg-white/90 px-2.5 py-1 font-mono text-[0.7rem] font-medium tracking-widest text-[#0A4D26]">
            {num}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-wider text-[#0A4D26]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#36B936]" />
            {place}
          </span>
        </div>
      </div>

      {/* Detail card */}
      <div
        className={`flex flex-col justify-between gap-6 p-5 sm:p-7 lg:col-span-7 lg:gap-10 lg:rounded-[2rem] lg:border lg:border-[#0A4D26]/10 lg:bg-[#F8F9F8] lg:p-12 ${
          isReversed ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        {/* Meta row: desktop only (mobile shows it on the image) */}
        <div className="hidden items-center justify-between gap-4 lg:flex">
          <span className="font-mono text-[0.7rem] tracking-widest text-[#0A4D26]/40">{num}</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0A4D26]/10 bg-white px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-[#0A4D26]/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#36B936]" />
            {place}
          </span>
        </div>

        {/* Title + caption */}
        <div>
          <h3 className="max-w-[18ch] text-xl font-medium leading-[1.15] tracking-tight text-[#0A4D26] sm:text-3xl lg:text-[2.25rem] lg:leading-[1.12]">
            {title}
          </h3>
          <p className="mt-3 max-w-[46ch] text-[0.875rem] font-light leading-relaxed text-[#0A4D26]/60 sm:text-[0.95rem] lg:mt-4">
            {caption}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 border-t border-[#0A4D26]/10 pt-5 lg:pt-6">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-full bg-[#36B936] px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.55rem,1vw,0.85rem)] text-xs font-medium text-[#0B140F] shadow-md transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A4D26] sm:text-sm"
          >
            <span>{ctaText}</span>
            <span aria-hidden="true">→</span>
          </Link>
          <span className="hidden text-[0.7rem] font-light uppercase tracking-widest text-[#0A4D26]/35 sm:block">
            Selected work
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;