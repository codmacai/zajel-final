'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { LandFreightCard } from './types';

const EASE = [0.2, 0.8, 0.2, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: 0.1 + index * 0.12 },
  }),
};

const badgeVariants = {
  hidden: { opacity: 0, rotate: -30, scale: 0.6 },
  visible: (index: number) => ({
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE, delay: 0.25 + index * 0.12 },
  }),
};

const textVariants = (delay: number) => ({
  hidden: { opacity: 0, y: 10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: delay + index * 0.12 },
  }),
});

const titleVariants = textVariants(0.35);
const descriptionVariants = textVariants(0.45);
const buttonVariants = textVariants(0.55);

interface FreightCardTileProps extends LandFreightCard {
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
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#0A4D26]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#36B936]/40 hover:shadow-xl sm:rounded-[1.25rem]"
    >
      {/* Header Image Container */}
      <div className="relative h-36 w-full shrink-0 sm:h-40 lg:h-48">
        <Image
          src={image}
          alt={title}
          fill
          loading="lazy"
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Floating Circular Badge */}
        <motion.div
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={badgeVariants}
          className="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#0A4D26]/10 bg-white shadow-md sm:left-7 sm:h-14 sm:w-14"
        >
          <Icon />
        </motion.div>
      </div>

      {/* Card Content Area */}
      <div className="flex flex-1 flex-col p-6 pt-9 text-left sm:p-7 sm:pt-10 lg:p-8 lg:pt-11">
        <motion.h3
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={titleVariants}
          className="text-base font-medium tracking-tight text-[#0A4D26] transition-colors group-hover:text-[#36B936] sm:text-lg lg:text-xl"
        >
          {title}
        </motion.h3>

        <motion.p
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={descriptionVariants}
          className="mt-2.5 flex-1 text-xs font-light leading-relaxed text-[#0A4D26]/75 sm:text-sm"
        >
          {description}
        </motion.p>

        {/* Button: Green background with dark green font */}
        <motion.div
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={buttonVariants}
          className="mt-6 flex items-center justify-start pt-2"
        >
          <Link
            href={buttonUrl || '/contact'}
            className="inline-flex items-center gap-2 rounded-full bg-[#36B936] px-4 py-2 text-xs font-medium text-[#05361A] transition-all duration-200 hover:scale-[1.03] hover:bg-[#2fa32f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#36B936]"
          >
            <span>{buttonLabel || 'Learn More'}</span>
            <span aria-hidden="true" className="text-sm font-semibold">→</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FreightCardTile;