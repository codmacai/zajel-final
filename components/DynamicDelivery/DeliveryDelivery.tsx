"use client";

// components/DynamicDelivery/DynamicDelivery.tsx
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.2, 0.8, 0.2, 1] as const;

export interface DeliveryBlock {
  eyebrow: string;
  heading: string;
  description: string;
  /** Optional pill above the card title, e.g. "Our Most Popular Arrangement" */
  badge?: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaUrl: string;
  /** Scene image: fills the whole right side of the card */
  baseImage: string;
  /** Cut-out version: same framing as the base, pops out above the card */
  cutoutImage: string;
  baseAlt?: string;
  cutoutAlt?: string;
  /** Line under the card, e.g. other arrangements available */
  note?: string;
}

export interface ComplianceBlock {
  eyebrow: string;
  heading: string;
  sentences: string[];
}

export interface DynamicDeliveryProps {
  delivery: DeliveryBlock;
  compliance: ComplianceBlock;
  /**
   * Tailwind object-fit/position classes for BOTH images (they must match so the
   * cut-out lines up with the base). Default fills the right side, anchored to the top
   * so the head is never cropped (any crop happens at the bottom, inside the card).
   */
  imageFitClassName?: string;
}

// Shared box for base + cutout: extends above the card so the cutout can pop out.
const IMAGE_BOX = "absolute inset-x-0 bottom-0 -top-14 sm:-top-20 lg:-top-24";
const GREEN_GRADIENT = "linear-gradient(180deg, #0A3D22 0%, #073018 55%, #052611 100%)";

export default function DynamicDelivery({
  delivery,
  compliance,
  imageFitClassName = "object-cover object-top",
}: DynamicDeliveryProps) {
  const {
    eyebrow,
    heading,
    description,
    badge,
    title,
    body,
    ctaLabel,
    ctaUrl,
    baseImage,
    cutoutImage,
    baseAlt = "",
    cutoutAlt = "",
    note,
  } = delivery;

  return (
    <>
      {/* Delivery arrangement — white surface */}
      <section className="w-full overflow-hidden bg-white font-sans">
        <div className="px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mb-10 text-center sm:mb-14 lg:mb-16"
            >
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-[2px] w-8 bg-[#36B936]" />
                <span className="text-xs font-medium uppercase tracking-wider text-[#36B936] sm:text-sm">
                  {eyebrow}
                </span>
              </div>

              <h2 className="mx-auto max-w-[720px] px-2 text-balance text-2xl font-medium leading-[1.15] tracking-tight text-[#1b4332] sm:text-3xl md:text-4xl">
                {heading}
              </h2>

              <p className="mx-auto mt-4 max-w-[520px] px-2 text-balance text-sm font-light leading-relaxed text-[#2d6a4f] sm:mt-5 sm:text-base lg:text-[1.1rem]">
                {description}
              </p>
            </motion.div>

            {/* Feature card (no overflow-hidden, so the cutout can pop out) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative mx-auto mt-20 max-w-[1180px] rounded-[1.25rem] border border-white/10 shadow-[0_20px_56px_-16px_rgba(5,54,26,0.22)] sm:mt-28 sm:rounded-[2rem] md:rounded-[2.5rem] lg:mt-32"
              style={{ background: GREEN_GRADIENT }}
            >
              <div className="grid grid-cols-1 items-stretch lg:grid-cols-[1.05fr_0.95fr]">
                {/* Text side */}
                <div className="relative z-10 order-2 flex flex-col justify-center p-6 sm:p-10 md:p-12 lg:order-1 lg:p-16">
                  {badge && (
                    <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#36B936]/30 bg-[#36B936]/15 px-3.5 py-1 text-[#36B936] sm:mb-5">
                      <span className="text-xs" aria-hidden="true">
                        ★
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.1em] sm:text-[11px]">
                        {badge}
                      </span>
                    </span>
                  )}

                  <h3 className="mb-3 text-2xl font-medium leading-[1.08] tracking-tight text-white sm:mb-4 sm:text-[2.2rem] lg:text-[2.6rem]">
                    {title}
                  </h3>

                  <div className="mb-4 h-px w-10 bg-white/15 sm:mb-5" />

                  <p className="mb-6 max-w-[46ch] text-sm font-light leading-[1.65] tracking-tight text-white/75 sm:mb-8 sm:text-base lg:text-[1.1rem]">
                    {body}
                  </p>

                  <Link
                    href={ctaUrl}
                    className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#36B936] px-6 py-3.5 text-xs font-medium tracking-wide text-[#05361A] shadow-[0_10px_28px_rgba(54,185,54,0.25)] transition-all duration-200 hover:scale-[1.03] hover:bg-[#2fa32f] active:scale-[0.98] active:bg-[#2a8f2a] sm:w-fit sm:text-sm"
                  >
                    <span>{ctaLabel}</span>
                    <span
                      className="text-sm leading-none transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </div>

                {/* Image side */}
                <div className="relative order-1 min-h-[300px] sm:min-h-[360px] lg:order-2 lg:min-h-full">
                  {/* Base: clipped to the card shape, fills the whole side */}
                  <div className="absolute inset-0 overflow-hidden rounded-t-[1.25rem] sm:rounded-t-[2rem] lg:rounded-r-[2.5rem] lg:rounded-t-none">
                    <div className={IMAGE_BOX}>
                      <Image
                        src={baseImage}
                        alt={baseAlt}
                        fill
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className={imageFitClassName}
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
                  </div>

                  {/* Cutout: identical box + fit, not clipped, so it pops out above the card */}
                  <div className={`${IMAGE_BOX} pointer-events-none z-20`}>
                    <Image
                      src={cutoutImage}
                      alt={cutoutAlt}
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className={`${imageFitClassName} drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {note && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
                className="mx-auto mt-6 max-w-[52rem] px-2 text-center text-xs font-light leading-[1.65] text-[#4B5750] sm:mt-10 sm:text-sm lg:text-base"
              >
                {note}
              </motion.p>
            )}
          </div>
        </div>
      </section>

      {/* Compliance & customs — dark green section */}
      <section className="w-full overflow-hidden font-sans" style={{ background: GREEN_GRADIENT }}>
        <div className="px-4 py-14 sm:px-6 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-[860px] text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-4 flex items-center justify-center gap-3 sm:mb-6"
            >
              <span className="h-[2px] w-8 bg-[#36B936]" />
              <span className="text-xs font-medium uppercase tracking-wider text-[#36B936] sm:text-sm">
                {compliance.eyebrow}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="mx-auto mb-4 max-w-[720px] px-2 text-balance text-2xl font-medium leading-[1.15] tracking-tight text-white sm:mb-8 sm:text-3xl md:text-4xl"
            >
              {compliance.heading}
            </motion.h2>

            <p className="mx-auto max-w-[540px] px-2 text-sm font-light leading-[1.65] tracking-tight text-white/75 sm:text-base sm:leading-[1.7] lg:text-[1.15rem]">
              {compliance.sentences.map((sentence, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.15 }}
                  className="inline"
                >
                  {sentence}
                  {i < compliance.sentences.length - 1 ? " " : ""}
                </motion.span>
              ))}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}