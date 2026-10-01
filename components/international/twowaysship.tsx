// components/domestic-on-demand/TwoWaysToShipAndJourney.tsx
"use client";

import type { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
const defaultContent = {
  eyebrow: 'Shipping Options',
  twoWays: {
    heading: 'Two Ways to Ship',
    documents: {
      label: 'Documents',
      text: 'Get an instant rate and book in minutes.',
      steps: ['Declare the weight', 'Choose your pickup date', "Pay and you're booked"],
      buttonLabel: 'Ship Documents Now',
      buttonUrl: '/quotation?type=documents',
    },
    packages: {
      label: 'Packages',
      text: 'Get accurate pricing after your package is verified.',
      steps: [
        'Choose your pickup date',
        'We collect and verify the weight',
        'We send you a secure payment link to confirm',
      ],
      buttonLabel: 'Request a Package Quote',
      buttonUrl: '/quotation?type=package',
    },
  },
  journey: {
    heading: 'One Simple Journey, Either Way',
    text: "Whether you're sending a document or a package, the rest of the journey looks the same: add the receiver's details and location, declare the value, and you're set. Track it from pickup to delivery, wherever in the world it's headed.",
  },
};

const smoothTransition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

// ---------------------------------------------------------------------------
// High-End Minimalist Vector Icons (Realistic Structural Details)
// ---------------------------------------------------------------------------
const CleanDocumentIcon: FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Architectural Document Outer Frame */}
    <path
      d="M28 18 H56 L72 34 V82 C72 84.2 70.2 86 68 86 H28 C25.8 86 24 84.2 24 82 V22 C24 19.8 25.8 18 28 18 Z"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Precision Folded Corner */}
    <path
      d="M56 18 V34 H72"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Minimal Accent Content Lines */}
    <line x1="34" y1="46" x2="62" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    <line x1="34" y1="56" x2="62" y2="56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    <line x1="34" y1="66" x2="48" y2="66" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
  </svg>
);

const RealisticPackageIcon: FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Isometric Parcel Outer Structure */}
    <path
      d="M50 16 L84 32 V68 L50 84 L16 68 V32 L50 16 Z"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />

    {/* Top Flap Seams */}
    <path
      d="M16 32 L50 48 L84 32"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />

    {/* Center Vertical Seam */}
    <path
      d="M50 48 V84"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Center Packing Sealing Tape (Top Flaps) */}
    <path
      d="M33 24 L67 40"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.9"
    />

    {/* Integrated Shipping Label / Waybill Patch */}
    <path
      d="M58 48 L76 39 V53 L58 62 Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.08"
    />

    {/* Shipping Label Text / Barcode Lines */}
    <line x1="62" y1="48" x2="72" y2="43" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <line x1="62" y1="52" x2="72" y2="47" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
  </svg>
);

// ---------------------------------------------------------------------------
// Shared Step-List Item
// ---------------------------------------------------------------------------
const StepItem: FC<{ index: number; text: string; badgeClassName: string; textClassName: string }> = ({
  index,
  text,
  badgeClassName,
  textClassName,
}) => (
  <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] md:text-[14px] font-normal leading-relaxed tracking-wide">
    <span
      className={`shrink-0 mt-[2px] w-5 h-5 rounded-full flex items-center justify-center text-[10.5px] sm:text-[11px] font-medium ${badgeClassName}`}
    >
      {index}
    </span>
    <span className={textClassName}>{text}</span>
  </li>
);

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
const TwoWaysToShipAndJourney: FC = () => {
  const data = defaultContent;

  return (
    <section
      className="w-full overflow-hidden relative select-none font-sans"
      aria-labelledby="two-ways-to-ship-heading"
      style={{
        background:
          "linear-gradient(180deg, #0A5A2E 0%, #064423 30%, #053A20 55%, #04321C 75%, #042B18 100%)",
      }}
    >
      {/* Ambient glow — upper left */}
      <div className="absolute -top-24 -left-24 w-[320px] h-[320px] md:w-[520px] md:h-[520px] bg-[#36B936]/[0.10] blur-[100px] md:blur-[130px] pointer-events-none rounded-full" />

      {/* Ambient glow — center */}
      <div className="absolute top-[22%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] md:w-[800px] md:h-[500px] bg-[#36B936]/[0.06] blur-[120px] md:blur-[140px] pointer-events-none rounded-full" />

      {/* Ambient glow — lower right */}
      <div className="absolute top-[55%] -right-16 w-[300px] h-[300px] md:w-[460px] md:h-[460px] bg-[#8FE38F]/[0.05] blur-[120px] md:blur-[150px] pointer-events-none rounded-full" />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 60% at 50% 8%, transparent 45%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* ── Two Ways to Ship block ── */}
      <div className="max-w-[1100px] mx-auto relative z-10 pt-12 sm:pt-20 lg:pt-24 px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-8 sm:mb-14 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
            className="flex items-center justify-center gap-2.5 sm:gap-4 mb-3 sm:mb-4"
          >
            <span style={{ color: '#36B936' }} className="font-medium text-[10px] sm:text-xs md:text-sm tracking-widest uppercase">
              {data.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            id="two-ways-to-ship-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.1 }}
            className="text-white text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-[1.2] max-w-[720px] mx-auto"
          >
            {data.twoWays.heading}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {/* Documents Card — Filled Gradient */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.15 }}
            className="group relative rounded-[1.5rem] md:rounded-[1.75rem] p-6 sm:p-9 md:p-10 min-h-[320px] sm:min-h-[380px] flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#36B936] via-[#2A9E2A] to-[#1A681A] border border-white/20 shadow-[0_15px_40px_rgba(54,185,54,0.15)] md:shadow-[0_20px_50px_rgba(54,185,54,0.18)]"
          >
            {/* Top Gloss Sheen */}
            <div className="absolute inset-x-0 top-0 h-28 sm:h-32 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-white text-[10px] sm:text-[11px] font-medium tracking-[0.16em] uppercase">
                  {data.twoWays.documents.label}
                </span>
              </div>

              <p className="text-white text-xs sm:text-[14.5px] md:text-[15.5px] font-normal leading-relaxed max-w-[34ch] mb-5 sm:mb-6 tracking-wide">
                {data.twoWays.documents.text}
              </p>

              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {data.twoWays.documents.steps.map((step, i) => (
                  <StepItem
                    key={step}
                    index={i + 1}
                    text={step}
                    badgeClassName="bg-white/20 text-white"
                    textClassName="text-white/95"
                  />
                ))}
              </ul>

              <Link
                href={data.twoWays.documents.buttonUrl}
                className="inline-flex items-center rounded-full bg-[#05361A] text-[#36B936] px-6 sm:px-7 py-3 sm:py-3.5 text-[13px] sm:text-[14px] font-medium tracking-wide transition-all duration-300 hover:bg-[#03200F] hover:shadow-lg relative z-10"
              >
                {data.twoWays.documents.buttonLabel}
              </Link>
            </div>

            {/* Static Clean Vector */}
            <div className="absolute -right-4 -bottom-4 text-white opacity-20 pointer-events-none">
              <CleanDocumentIcon className="w-[140px] h-[140px] sm:w-[220px] sm:h-[220px]" />
            </div>
          </motion.div>

          {/* Packages Card — Light contrast card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.25 }}
            className="group relative rounded-[1.5rem] md:rounded-[1.75rem] p-6 sm:p-9 md:p-10 min-h-[320px] sm:min-h-[380px] flex flex-col justify-between overflow-hidden bg-gradient-to-br from-white via-[#F7FAF7] to-[#E8F3E9] border border-[#0A5A2E]/[0.12] shadow-[0_15px_40px_rgba(6,68,35,0.15)] md:shadow-[0_20px_50px_rgba(6,68,35,0.16)]"
          >
            {/* Soft green corner glow */}
            <div className="absolute -top-10 -right-10 w-48 sm:w-64 h-48 sm:h-64 bg-[#36B936]/[0.10] blur-[70px] sm:blur-[80px] pointer-events-none rounded-full" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#064423]/10 border border-[#064423]/20 mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#064423]" />
                <span className="text-[#064423] text-[10px] sm:text-[11px] font-medium tracking-[0.16em] uppercase">
                  {data.twoWays.packages.label}
                </span>
              </div>

              <p className="text-neutral-700 text-xs sm:text-[14.5px] md:text-[15.5px] font-normal leading-relaxed max-w-[34ch] mb-5 sm:mb-6 tracking-wide">
                {data.twoWays.packages.text}
              </p>

              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {data.twoWays.packages.steps.map((step, i) => (
                  <StepItem
                    key={step}
                    index={i + 1}
                    text={step}
                    badgeClassName="bg-[#064423] text-white"
                    textClassName="text-neutral-700"
                  />
                ))}
              </ul>

              <Link
                href={data.twoWays.packages.buttonUrl}
                className="inline-flex items-center rounded-full bg-[#064423] text-white px-6 sm:px-7 py-3 sm:py-3.5 text-[13px] sm:text-[14px] font-medium tracking-wide transition-all duration-300 hover:bg-[#05361A] hover:shadow-lg relative z-10"
              >
                {data.twoWays.packages.buttonLabel}
              </Link>
            </div>

            {/* Static Realistic Package Vector */}
            <div className="absolute -right-6 -bottom-6 text-[#064423] opacity-[0.08] pointer-events-none">
              <RealisticPackageIcon className="w-[140px] h-[140px] sm:w-[220px] sm:h-[220px]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── One Simple Journey block ── */}
      <div className="max-w-[760px] mx-auto text-center relative z-10 pt-12 sm:pt-16 md:pt-24 pb-12 sm:pb-14 md:pb-20 px-4 sm:px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={smoothTransition}
          className="text-white text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-[1.2] mb-3 sm:mb-4 md:mb-5"
        >
          {data.journey.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...smoothTransition, delay: 0.1 }}
          className="text-[#E8F3E9]/80 font-normal text-xs sm:text-[13.5px] md:text-[14px] leading-relaxed max-w-[580px] mx-auto tracking-wide"
        >
          {data.journey.text}
        </motion.p>
      </div>
    </section>
  );
};

export default TwoWaysToShipAndJourney;