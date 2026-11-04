"use client";

import React from "react";
import Image from "next/image";
import { NETWORK_HUB, type NETWORK_HUBContent } from './content';
import { cmsSection } from '@/components/cms/CmsProvider';

interface LogisticsNetworkSectionProps {
  imageSrc?: string;
  imageAlt?: string;
}

const BRAND = {
  paper: "#FAFAF8",
  green: "#36b936",
  dark: "#111827",
} as const;

function LogisticsNetworkSection({ content,
}: LogisticsNetworkSectionProps & { content: NETWORK_HUBContent }) {
  const { imageSrc, imageAlt } = content;
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
                {content.eyebrow}
              </span>

              {/* Header */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight text-white mb-4 sm:mb-6">
                {content.heading}
              </h2>

              {/* Body */}
              <div className="space-y-3 sm:space-y-4 text-white/90 text-xs sm:text-sm lg:text-base font-normal leading-relaxed max-w-xl">
                <p>{content.paragraph1}</p>
                <p>{content.paragraph2}</p>
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

export default cmsSection('network.hub', NETWORK_HUB, LogisticsNetworkSection);
