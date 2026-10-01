'use client';

import * as React from 'react';
import { useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessStepsSectionProps {
  /** Small uppercase label above the heading, e.g. "Freight Quote" */
  eyebrow: string;
  /** Heading — pass a React node so you can control line breaks, e.g. <>How a Freight<br />Quote Works</> */
  heading: ReactNode;
  /** Supporting paragraph under the heading */
  description: string;
  /** Small line at the bottom of the left column, e.g. "Est. response within 24 hours". Omit to hide it. */
  footnote?: string;
  /** The steps, revealed one at a time as the section is scrolled through */
  steps: ProcessStep[];
}

const EASE = [0.16, 1, 0.3, 1] as const;

// How much scroll distance (in viewport heights) is given to each step.
// 1 = the section is pinned for exactly one screen's worth of scrolling
// per step; raise it (e.g. 1.4) to give each step more breathing room.
const VH_PER_STEP = 1.1;

// ---------------------------------------------------------------------------
// Section — a tall scroll "track" with a pinned viewport-height stage inside
// it. As the user scrolls through the track, scroll progress is mapped to a
// step index, and only that step is rendered, cross-fading in/out.
// ---------------------------------------------------------------------------

export default function ProcessStepsSection({
  eyebrow,
  heading,
  description,
  footnote,
  steps,
}: ProcessStepsSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const next = Math.min(steps.length - 1, Math.floor(progress * steps.length));
    setActiveIndex((current) => (current === next ? current : next));
  });

  return (
    <section
      ref={trackRef}
      className="relative w-full"
      style={{ height: `${Math.max(steps.length, 1) * VH_PER_STEP * 100}vh` }}
    >
      <div
        className="sticky top-0 h-screen w-full flex items-center overflow-hidden"
        style={{
          fontFamily: "'Manrope', system-ui, -apple-system, sans-serif",
          background: 'linear-gradient(180deg, #0A3D22 0%, #073018 55%, #052611 100%)',
        }}
      >
        <BackgroundGlow />

        <div className="relative w-full max-w-[1320px] mx-auto px-[clamp(1rem,4vw,1.5rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-[clamp(2.5rem,6vw,5rem)] items-center">
            <Header
              eyebrow={eyebrow}
              heading={heading}
              description={description}
              footnote={footnote}
              activeIndex={activeIndex}
              total={steps.length}
              scrollYProgress={scrollYProgress}
            />

            {/* Stage — a fixed-ratio rectangle, one step rendered at a time,
                absolutely positioned so the crossfade never shifts layout. */}
            <div
              className="relative w-full aspect-[16/9] sm:aspect-[2/1] lg:aspect-[21/10] max-h-[420px]"
              style={{ perspective: 1200 }}
            >
              <AnimatePresence mode="wait">
                <StepCard
                  key={steps[activeIndex]?.number ?? activeIndex}
                  step={steps[activeIndex]}
                  total={steps.length}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Ambient backdrop
// ---------------------------------------------------------------------------

function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-40 right-0 w-[560px] h-[560px] rounded-full opacity-[0.18] blur-[130px]"
        style={{ background: 'radial-gradient(circle, #36B936 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-[-10%] w-[420px] h-[420px] rounded-full opacity-[0.1] blur-[110px]"
        style={{ background: 'radial-gradient(circle, #0A4D26 0%, transparent 70%)' }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* Vignette so the pinned stage always reads with high contrast,
          regardless of which step's card is showing */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(0,0,0,0.35) 100%)' }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Left column — static for the whole pinned duration; the step counter and
// segmented progress rail update live as the user scrolls through.
// ---------------------------------------------------------------------------

interface HeaderProps {
  eyebrow: string;
  heading: ReactNode;
  description: string;
  footnote?: string;
  activeIndex: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function Header({ eyebrow, heading, description, footnote, activeIndex, total, scrollYProgress }: HeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="flex flex-col items-center text-center"
    >
      <span className="inline-flex items-center gap-2.5 text-[#36B936] font-medium text-xs sm:text-sm tracking-[0.24em] uppercase mb-[clamp(1rem,2.5vw,1.25rem)]">
        {eyebrow}
      </span>

      <h2 className="text-white font-light leading-[1.12] text-2xl sm:text-3xl md:text-4xl tracking-tight max-w-[560px] mx-auto lg:mx-0">
        {heading}
      </h2>

      <p className="text-[#8FAE9C] font-light text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed mt-[clamp(1.25rem,3vw,1.5rem)] max-w-[400px] mx-auto lg:mx-0 tracking-wide">
        {description}
      </p>

      {total > 1 ? (
        <div className="flex flex-col items-center gap-4 mt-10 w-full max-w-[280px]">
          {/* Segmented rail — one bar per step, filling as the user scrolls
              through that step's slice of the pinned track (à la stories). */}
          <div className="flex items-center gap-1.5 w-full">
            {Array.from({ length: total }).map((_, i) => (
              <ProgressSegment key={i} index={i} total={total} scrollYProgress={scrollYProgress} />
            ))}
          </div>
          <span className="text-[#8FAE9C]/60 font-light text-[13px] tracking-wide tabular-nums">
            {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      ) : (
        footnote && (
          <div className="hidden lg:flex items-center gap-3 mt-10 text-[#8FAE9C]/60 font-light text-[13px] tracking-wide">
            <span className="w-8 h-px bg-[#8FAE9C]/30" />
            {footnote}
          </div>
        )
      )}
    </motion.div>
  );
}

function ProgressSegment({
  index,
  total,
  scrollYProgress,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const fill = useTransform(scrollYProgress, (v) => `${Math.min(Math.max(v * total - index, 0), 1) * 100}%`);

  return (
    <span className="relative flex-1 h-[3px] rounded-full bg-white/10 overflow-hidden">
      <motion.span className="absolute inset-y-0 left-0 rounded-full bg-[#36B936]" style={{ width: fill }} />
    </span>
  );
}

// ---------------------------------------------------------------------------
// Step card — one at a time, crossfading via AnimatePresence as the pinned
// section's scroll progress advances past this step's segment. A large
// ghost numeral, layered border/shadow and a blur-through transition give
// it a more editorial, high-end feel than a flat colored box.
// ---------------------------------------------------------------------------

function StepCard({ step, total }: { step: ProcessStep | undefined; total: number }) {
  if (!step) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97, rotateX: -6, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -28, scale: 0.97, filter: 'blur(10px)' }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{ transformStyle: 'preserve-3d' }}
      className="absolute inset-0 rounded-[28px] overflow-hidden border border-white/10
                 bg-gradient-to-br from-[#36B936] to-[#0A4D26]
                 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)]"
    >
      {/* Inner highlight — a soft light sweep from the top-left, the kind of
          subtle depth cue that separates a flat card from a "product" card */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.16) 0%, transparent 45%)' }}
      />

      {/* Ghost numeral — large, low-opacity, anchored top-right */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-[6%] right-[3%] font-light leading-none text-white/10
                   text-[clamp(5rem,14vw,9rem)] tabular-nums"
      >
        {step.number}
      </span>

      <div className="relative h-full flex flex-col justify-end gap-3 p-[clamp(1.75rem,4.5vw,3rem)]">
        <span className="inline-flex items-center gap-2 text-white/60 font-medium text-[11px] tracking-[0.2em] uppercase">
          Step {step.number} <span className="text-white/30">/ {String(total).padStart(2, '0')}</span>
        </span>

        <h3 className="font-light text-[clamp(1.4rem,3.4vw,2.1rem)] tracking-tight text-white max-w-[85%]">
          {step.title}
        </h3>

        <p className="font-light text-[clamp(0.9rem,2vw,1.05rem)] leading-relaxed tracking-wide text-white/75 max-w-[85%]">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}