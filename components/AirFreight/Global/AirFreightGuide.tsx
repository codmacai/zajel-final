"use client";

import { motion } from "framer-motion";
import { SMOOTH_TRANSITION } from "@/data/global";
import MapPanel from "./MapPanel";
import { AIR_NETWORK, type AIR_NETWORKContent } from '../content';
import { cmsSection } from '@/components/cms/CmsProvider';

function AirFreightGuide({ content }: { content: AIR_NETWORKContent }) {
  return (
    <section className="relative flex w-full flex-col justify-between overflow-hidden bg-white px-4 xs:px-6 md:px-12 lg:px-20 py-[clamp(2.5rem,6vw,6rem)]">
      <div className="relative z-10 mx-auto flex max-w-3xl flex-shrink-0 flex-col items-center gap-3 text-center sm:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={SMOOTH_TRANSITION}
          className="flex items-center justify-center gap-3 sm:gap-4"
        >
          <span className="text-xs sm:text-sm font-medium tracking-wider uppercase text-[#36B936]">
            {content.eyebrow}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={SMOOTH_TRANSITION}
          className="mx-auto max-w-[720px] text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.15] tracking-tight text-[#0A4D26] px-2"
        >
          {content.heading}
        </motion.h2>

        <p className="mx-auto max-w-[580px] text-[13px] sm:text-[13.5px] lg:text-[14px] font-light leading-relaxed text-[#2D6A4F] px-2">
          {content.description}
        </p>
      </div>

      <div className="relative z-0 mx-auto mt-6 sm:mt-10 flex w-full max-w-6xl flex-1 flex-col justify-center">
        <MapPanel />
      </div>
    </section>
  );
}

export default cmsSection('air-freight.network', AIR_NETWORK, AirFreightGuide);
