"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CARGO_ITEMS, SMOOTH_TRANSITION, type CargoItem } from "@/data/air-freight/Whatwemove";

const EASE = [0.2, 0.8, 0.2, 1] as const;

// ---------------------------------------------------------------------------
// Card — real photo, fixed aspect ratio.
// ---------------------------------------------------------------------------

function CargoCard({ label, description, image, delayOffset }: CargoItem & { delayOffset: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...SMOOTH_TRANSITION, duration: 0.8, delay: delayOffset / 1000 }}
      className="flex w-full flex-col"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-[#0A4D26]/10 bg-[#F0F0EE]">
        <Image
          src={image}
          alt={label}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover"
        />
      </div>

      <h3 className="mt-3 sm:mt-4 text-sm xs:text-base sm:text-lg font-medium leading-snug tracking-tight text-[#0A4D26]">
        {label}
      </h3>
      <p className="mt-1 sm:mt-1.5 text-xs xs:text-[13px] sm:text-sm font-light leading-relaxed text-[#2D6A4F]">
        {description}
      </p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export default function WhatWeMove() {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-12 xs:px-6 sm:py-16 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1320px]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-8 xs:mb-10 text-center sm:mb-[clamp(2rem,6vw,4rem)]"
        >
          <div className="mb-3 xs:mb-4 flex items-center justify-center gap-3">
            <span className="text-xs sm:text-sm font-medium tracking-wider uppercase" style={{ color: "#36B936" }}>
              Cargo Capability
            </span>
          </div>

          <h2 className="mx-auto max-w-[720px] text-2xl xs:text-3xl font-medium leading-[1.15] tracking-tight text-[#0A4D26] md:text-4xl px-2">
            What We Move
          </h2>

          <p className="mx-auto mt-3 xs:mt-4 sm:mt-5 max-w-[520px] text-xs xs:text-[13.5px] font-light leading-relaxed text-[#2D6A4F] sm:text-[14px] px-2">
            Specialized air freight capabilities designed for diverse cargo requirements across industries.
          </p>
        </motion.div>

        {/* 2 columns on mobile, 4 from `lg:` up */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {CARGO_ITEMS.map((item, i) => (
            <CargoCard key={item.id} {...item} delayOffset={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}