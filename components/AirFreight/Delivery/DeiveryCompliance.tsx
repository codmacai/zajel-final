"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  COMPLIANCE_BODY_SENTENCES,
  COMPLIANCE_HEADING,
  DOOR_TO_DOOR_BASE_IMAGE_SRC,
  DOOR_TO_DOOR_CUTOUT_IMAGE_SRC,
  OTHER_ARRANGEMENTS_LINE,
} from "@/data/air-freight/delivery";

const EASE = [0.2, 0.8, 0.2, 1] as const;

export default function ChooseDeliveryAndCompliance() {
  return (
    <>
      {/* ── Delivery Arrangement block — white surface ── */}
      <section className="w-full overflow-hidden bg-white px-4 py-12 font-sans sm:px-6 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1320px]">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE }}
            className="mb-[clamp(2.5rem,6vw,4rem)] text-center"
          >
            {/* Eyebrow */}
            <div className="mb-4 flex items-center justify-center gap-4">
              <span className="h-[2px] w-8" style={{ backgroundColor: "#36B936" }} />
              <span className="text-sm font-medium uppercase tracking-wider" style={{ color: "#36B936" }}>
                Delivery Arrangements
              </span>
              <span className="h-[2px] w-8" style={{ backgroundColor: "#36B936" }} />
            </div>

            {/* Main heading */}
            <h2 className="mx-auto max-w-[720px] text-3xl font-light leading-[1.15] tracking-tight text-[#1b4332] md:text-4xl">
              Choose Your Delivery Arrangement
            </h2>

            {/* Supporting description */}
            <p className="mx-auto mt-5 max-w-[520px] text-[13.5px] font-light leading-relaxed text-[#2d6a4f] sm:text-[14px]">
              Select how your shipment moves from start to finish with flexible options tailored to your workflow.
            </p>
          </motion.div>

          {/* Door-to-Door feature card (no overflow-hidden so the cutout can pop out) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: EASE }}
            className="relative mx-auto mt-14 max-w-[1180px] sm:mt-20 lg:mt-24 rounded-[2rem] border border-[#0A4D26]/10 shadow-[0_20px_50px_-15px_rgba(5,54,26,0.25)]"
            style={{ background: "linear-gradient(180deg, #0A3D22 0%, #073018 55%, #052611 100%)" }}
          >
            <div className="grid grid-cols-1 items-stretch lg:grid-cols-[1.05fr_0.95fr]">
              {/* Text side */}
              <div className="relative z-10 order-2 flex flex-col justify-center p-6 sm:p-10 lg:order-1 lg:p-12">
                <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#36B936]/30 bg-[#36B936]/15 px-3.5 py-1 text-[#36B936] sm:mb-5">
                  <span className="text-xs" aria-hidden="true">
                    ★
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.1em] sm:text-[11px]">
                    Our Most Popular Arrangement
                  </span>
                </span>

                <h3 className="mb-4 text-[clamp(1.75rem,3.8vw,2.75rem)] font-light leading-[1.08] tracking-tight text-white sm:mb-5">
                  Door-to-Door
                </h3>

                <div className="mb-4 h-px w-10 bg-white/15 sm:mb-5" />

                <p className="mb-8 max-w-xl text-[clamp(0.9rem,1.8vw,1.05rem)] font-light leading-[1.65] tracking-tight text-white/70">
                  Pickup at your origin address, delivered straight to the final destination — no extra
                  coordination required on your end. This is how most Zajel air freight shipments move,
                  start to finish.
                </p>

                <div className="flex">
                  <Link
                    href="/quote?arrangement=door-to-door"
                    className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#36B936] px-7 py-3.5 text-[clamp(0.85rem,1.6vw,0.9rem)] font-medium tracking-tight text-white shadow-[0_10px_28px_rgba(54,185,54,0.25)] transition-all duration-200 hover:scale-[1.02] hover:bg-[#2fa32f] active:scale-100"
                  >
                    Request Door-to-Door Quote
                    <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>
              </div>

              {/* Image side — base + cutout share one box that extends above the card */}
              <div className="relative order-1 min-h-[280px] sm:min-h-[340px] lg:order-2 lg:min-h-full">
                {/* Layer 1: base image, clipped to the card shape */}
                <div className="absolute inset-0 overflow-hidden rounded-t-[2rem] lg:rounded-l-none lg:rounded-r-[2rem] lg:rounded-t-none">
                  <div className="absolute inset-x-0 bottom-0 -top-14 sm:-top-20 lg:-top-24">
                    <Image
                      src={DOOR_TO_DOOR_BASE_IMAGE_SRC}
                      alt="Door-to-Door air freight background"
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-contain object-bottom"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                </div>

                {/* Layer 2: cutout, same box and fit, not clipped so the head pops out */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 -top-14 z-20 sm:-top-20 lg:-top-24">
                  <Image
                    src={DOOR_TO_DOOR_CUTOUT_IMAGE_SRC}
                    alt="Door-to-Door pop-out"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-contain object-bottom drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)]"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Note below */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
            className="mx-auto mt-6 max-w-3xl text-center text-[clamp(0.82rem,1.6vw,0.9rem)] font-light leading-[1.6] text-[#4B5750] sm:mt-8"
          >
            {OTHER_ARRANGEMENTS_LINE}
          </motion.p>
        </div>
      </section>

      {/* ── Compliance & Customs block — dark green section ── */}
      <section
        className="w-full overflow-hidden px-4 py-16 font-sans sm:px-6 sm:py-24 lg:px-12 lg:py-28"
        style={{ background: "linear-gradient(180deg, #0A3D22 0%, #073018 55%, #052611 100%)" }}
      >
        <div className="mx-auto max-w-[860px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE }}
            className="mb-6 flex items-center justify-center sm:mb-7"
          >
            <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#36B936] sm:text-[13px]">
              Compliance &amp; Customs
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="mb-8 text-3xl font-medium leading-[1.15] text-white sm:mb-10 md:text-4xl"
          >
            {COMPLIANCE_HEADING}
          </motion.h2>

          <p className="mx-auto max-w-[46rem] text-[0.95rem] font-normal leading-[1.7] tracking-tight text-white/70 sm:text-[1.05rem] lg:text-[1.1rem]">
            {COMPLIANCE_BODY_SENTENCES.map((sentence, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: EASE, delay: 0.35 + i * 0.15 }}
                className="inline"
              >
                {sentence}
                {i < COMPLIANCE_BODY_SENTENCES.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </p>
        </div>
      </section>
    </>
  );
}