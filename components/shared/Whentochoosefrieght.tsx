'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const EASE = [0.2, 0.8, 0.2, 1] as const;

export type BodyPart = { text: string; emphasis?: boolean };
export type AlternativeRoute = { href: string; label: string };

type WhenToChooseFreightProps = {
  /** Heading shown on the image card, e.g. "When to Choose Sea Freight" */
  title: string;
  imageSrc: string;
  imageAlt: string;
  /** Body copy split into parts; parts with `emphasis` are highlighted */
  body: readonly BodyPart[];
  /** The other freight modes to link to (first = green button, second = dark button) */
  alternatives: readonly AlternativeRoute[];
};

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function WhenToChooseFreight({
  title,
  imageSrc,
  imageAlt,
  body,
  alternatives,
}: WhenToChooseFreightProps) {
  const alternativesText = alternatives.map((a) => a.label).join(' or ');

  return (
    <section className="w-full py-[clamp(2.5rem,6vw,6rem)] bg-white font-sans">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* Feature image block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE }}
          className="relative rounded-xl sm:rounded-2xl overflow-hidden h-[340px] xs:h-[380px] sm:h-[400px] lg:h-[440px] shadow-[0_16px_44px_-16px_rgba(5,54,26,0.4)]"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 1280px) 1320px, 100vw"
            className="object-cover object-center"
            priority
          />

          {/* Legibility scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 sm:bg-gradient-to-r sm:from-black/85 sm:via-black/55 sm:to-transparent" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-end p-4 xs:p-6 sm:p-8 lg:p-10">
            <div className="max-w-[42ch] sm:max-w-[52ch] lg:max-w-[62ch] flex flex-col gap-2 sm:gap-3.5">
              <h2 className="text-white font-medium leading-[1.15] text-xl xs:text-2xl sm:text-3xl md:text-4xl tracking-tight">
                {title}
              </h2>
              <p className="text-white/90 font-light leading-relaxed text-xs xs:text-[13px] sm:text-[14px] tracking-tight">
                {body.map((part, i) =>
                  part.emphasis ? (
                    <em key={i} className="not-italic font-medium text-[#7BE07B]">
                      {part.text}
                    </em>
                  ) : (
                    <span key={i}>{part.text}</span>
                  )
                )}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Cross-sell banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE }}
          className="mt-4 sm:mt-5 rounded-xl sm:rounded-2xl bg-white border border-[#0A4D26]/10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-col gap-0.5">
              <span className="text-[14px] sm:text-[15px] font-medium text-[#0A4D26]">
                Not the right fit?
              </span>
              <p className="text-[13px] sm:text-[14px] leading-snug tracking-tight text-[#0A4D26]/65 font-light">
                Explore {alternativesText}.
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {alternatives.map(({ href, label }, i) => (
                <Link
                  key={href}
                  href={href}
                  className={`group flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#36B936]/60 ${
                    i === 0 ? 'bg-[#36B936] text-[#0A4D26]' : 'bg-[#0A4D26] text-[#36B936]'
                  }`}
                >
                  {label}
                  <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}