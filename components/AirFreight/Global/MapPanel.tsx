"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MAP_IMAGE_SRC, SMOOTH_TRANSITION } from "@/data/global";
import FlightPaths from "../Global/FleightPaths";

export default function MapPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...SMOOTH_TRANSITION, delay: 0.1 }}
      className="relative flex w-full items-center justify-center overflow-hidden rounded-xl sm:rounded-[2rem] border border-[#0A4D26]/15 p-3 xs:p-5 sm:p-6 shadow-[0_20px_50px_rgba(6,68,35,0.08)]"
      style={{
        background:
          "radial-gradient(120% 140% at 78% 85%, #1F7A45 0%, #0F5C2E 32%, #0A4D26 58%, #073A1D 100%)",
      }}
    >
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute bottom-[-10%] right-[-8%] z-0 h-[85%] w-[55%]"
        style={{ background: "radial-gradient(closest-side, rgba(123,224,123,0.18) 0%, rgba(123,224,123,0) 70%)" }}
      />
      <div
        className="pointer-events-none absolute left-[-5%] top-[10%] z-0 h-[65%] w-[45%] opacity-40 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(54,185,54,0.25) 0%, rgba(10,77,38,0) 70%)" }}
      />

      {/* Locked-aspect stage container maintaining exact 2:1 SVG proportions */}
      <div className="relative z-10 aspect-[2/1] w-full max-w-full">
        <Image
          src={MAP_IMAGE_SRC}
          alt="World map showing the air freight network"
          fill
          sizes="(min-width: 1024px) 72rem, 100vw"
          className="object-contain"
          priority
        />

        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...SMOOTH_TRANSITION, delay: 0.5 }}
        >
          <FlightPaths />
        </motion.div>
      </div>
    </motion.div>
  );
}