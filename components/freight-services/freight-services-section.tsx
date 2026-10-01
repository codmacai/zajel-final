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
    <div className="group relative h-[280px] sm:h-[340px] md:h-[380px] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm transition-all duration-500 hover:shadow-xl cursor-pointer">
      {/* Full Cover Background Image */}
      <Image
        src={card.imageSrc}
        alt={card.imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Ambient Gradient Overlay for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent transition-opacity duration-300 group-hover:opacity-80" />

      {/* Floating White Banner Overlay */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between rounded-xl sm:rounded-2xl bg-white px-5 py-4 sm:px-6 sm:py-5 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
        <h3 className="text-base sm:text-lg md:text-xl font-medium tracking-tight text-[#0D2A22]">
          {card.title}
        </h3>
        <span
          className="text-lg sm:text-xl font-light transition-transform duration-300 group-hover:translate-x-1.5"
          style={{ color: BRAND.green }}
          aria-hidden="true"
        >
          →
        </span>
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
            className="mb-2 block text-xs sm:text-sm font-medium uppercase tracking-widest"
            style={{ color: BRAND.green }}
          >
            {FREIGHT_SERVICES_EYEBROW}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#0D2A22]">
            {FREIGHT_SERVICES_HEADING}
          </h2>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
          {FREIGHT_SERVICES.map((card) => (
            <FreightCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}