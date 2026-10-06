"use client";

import React from "react";
import Image from "next/image";

interface LogisticsNetworkSectionProps {
  imageSrc?: string;
  imageAlt?: string;
}

const BRAND = {
  paper: "#FAFAF8",
  green: "#36b936",
  dark: "#111827",
} as const;

export default function LogisticsNetworkSection({
  imageSrc = "/network/ChatGPT Image Sep 28, 2026, 02_26_23 PM.webp",
  imageAlt = "Jebel Ali Port and Dubai Air Cargo Infrastructure",
}: LogisticsNetworkSectionProps) {
  return (
    <section
      className="w-full py-12 sm:py-16 lg:py-24 flex flex-col justify-center overflow-hidden font-['Manrope',sans-serif]"
      style={{ backgroundColor: BRAND.paper }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rtl-keep-split relative grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Column: Content Container in #36b936 */}
          <div
            className="lg:col-span-7 p-6 sm:p-10 lg:p-16 flex flex-col justify-center text-white rounded-2xl lg:rounded-l-2xl lg:rounded-r-none relative z-0 shadow-lg lg:shadow-none"
            style={{ backgroundColor: BRAND.green }}
          >
            <div className="lg:pr-6">
              {/* Eyebrow Label */}
              <span className="inline-block text-xs sm:text-sm font-medium tracking-wider uppercase text-white/80 mb-3">
                Global Logistics Hub
              </span>

              {/* Header */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight text-white mb-4 sm:mb-6">
                A Logistics Network Built from the UAE
              </h2>

              {/* Body */}
              <div className="space-y-3 sm:space-y-4 text-white/90 text-xs sm:text-sm lg:text-base font-normal leading-relaxed max-w-xl">
                <p>
                  Situated at the crossroads of Asia, Europe, and Africa, the UAE is one of the
                  world&apos;s most connected logistics hubs. Dubai serves as a primary gateway for
                  global air cargo and maritime container traffic through Jebel Ali Port and its
                  international airports.
                </p>
                <p>
                  Headquartered at the center of this infrastructure, Zajel leverages the
                  UAE&rsquo;s established trade facilities and efficient customs systems for air,
                  sea, and land shipments. This geographic advantage delivers shorter transit times
                  to key markets across the GCC, Indian subcontinent, East Africa, and
                  Europe&mdash;connecting your cargo onward without unnecessary repositioning or
                  transshipment delays.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Overlapping Image Container */}
          <div className="lg:col-span-5 relative z-10 flex items-center mt-6 lg:mt-0 lg:-ml-12">
            {/* Desktop Decorative Background Blocks with Original Colors */}
            <div
              className="hidden lg:block absolute -top-6 -right-6 w-32 h-32 -z-10"
              style={{ backgroundColor: BRAND.dark }}
            />
            <div
              className="hidden lg:block absolute -bottom-6 -right-6 w-32 h-32 -z-10"
              style={{ backgroundColor: BRAND.green }}
            />

            <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[460px] shadow-2xl rounded-2xl overflow-hidden">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}