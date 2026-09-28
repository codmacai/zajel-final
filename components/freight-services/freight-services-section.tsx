"use client";

import Image from "next/image";
import {
  FREIGHT_SERVICES,
  FREIGHT_SERVICES_EYEBROW,
  FREIGHT_SERVICES_HEADING,
  type FreightCardData,
} from "@/data/freight-services";

const BRAND = {
  green: "#36b936",
  dark: "#0D2A22",
  paper: "#FAFAF8",
} as const;

interface FreightCardProps {
  card: FreightCardData;
}

function FreightCard({ card }: FreightCardProps) {
  return (
    <div
      className="group relative flex min-h-[320px] sm:min-h-[360px] flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-emerald-500/20 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ backgroundColor: BRAND.green }}
    >
      {/* Text */}
      <div className="z-10 max-w-full sm:max-w-[85%]">
        <h3 className="mb-2 text-base sm:text-lg md:text-xl font-medium leading-snug tracking-tight text-white">
          {card.title}
        </h3>
        <p className="text-xs sm:text-sm font-normal leading-relaxed text-white/85">
          {card.description}
        </p>
      </div>

      {/* Vehicle cutout, bottom-right */}
      <div className="relative mt-4 flex h-36 sm:h-44 w-full items-end justify-end pointer-events-none">
        <Image
          src={card.imageSrc}
          alt={card.imageAlt}
          width={400}
          height={220}
          className="h-full max-h-full w-auto max-w-[110%] object-contain object-bottom-right transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
    </div>
  );
}

export default function FreightServicesSection() {
  return (
    <section
      className="w-full px-4 py-12 sm:px-6 sm:py-16 font-['Manrope',sans-serif] md:px-12 lg:px-20 lg:py-24"
      style={{ backgroundColor: BRAND.paper }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 sm:mb-12 text-center px-2">
          <span
            className="mb-2 block text-[11px] font-medium uppercase tracking-widest"
            style={{ color: BRAND.green }}
          >
            {FREIGHT_SERVICES_EYEBROW}
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0D2A22] md:text-4xl">
            {FREIGHT_SERVICES_HEADING}
          </h2>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
          {FREIGHT_SERVICES.map((card) => (
            <FreightCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}