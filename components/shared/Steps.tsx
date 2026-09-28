'use client';

import * as React from 'react';
import { memo, useRef, useMemo, useState, type ReactNode } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessStepsSectionProps {
  /** Small uppercase label above the heading, e.g. "freight quote" */
  eyebrow: string;
  /** Heading node, e.g. <>how a freight<br />quote works</> */
  heading: ReactNode;
  /** Supporting paragraph under the heading */
  description: string;
  /** Small line under the heading when there is only one step. Omit to hide. */
  footnote?: string;
  /** The steps, revealed one at a time as the section is scrolled through */
  steps: ProcessStep[];
}

// Scroll distance per step: reduced to 80vh per step on mobile to keep scrubbing faster & smoother
const SVH_PER_STEP = 0.8;

// ---------------------------------------------------------------------------
// Section: tall scroll track with pinned stage. 
// Uses direct transform mapping to eliminate layout reflow / jerkiness on mobile.
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
  const reduceMotion = useReducedMotion() ?? false;
  const total = steps.length;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const next = Math.max(0, Math.min(total - 1, Math.floor(progress * total)));
    setActiveIndex((current) => (current === next ? current : next));
  });

  return (
    <section
      ref={trackRef}
      className="relative w-full"
      style={{ height: `${Math.max(total, 1) * SVH_PER_STEP * 100}vh` }}
    >
      <div
        className="sticky top-0 flex h-[100vh] w-full items-center overflow-hidden px-4 sm:px-6 md:px-12 lg:px-20"
        style={{
          fontFamily: "'manrope', system-ui, -apple-system, sans-serif",
          background: 'linear-gradient(180deg, #0a3d22 0%, #073018 55%, #052611 100%)',
        }}
      >
        <BackgroundLayer />

        <div className="relative mx-auto w-full max-w-[1320px]">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-[clamp(2.5rem,6vw,5rem)]">
            <Header
              eyebrow={eyebrow}
              heading={heading}
              description={description}
              footnote={footnote}
              activeIndex={activeIndex}
              total={total}
              scrollYProgress={scrollYProgress}
            />

            {/* Stage: fixed-ratio box; every card is absolutely stacked inside it */}
            <div className="relative aspect-[4/3] max-h-[380px] w-full sm:aspect-[16/9] lg:aspect-[21/10] sm:max-h-[420px]">
              {steps.map((step, i) => (
                <StepCard
                  key={step.number}
                  step={step}
                  index={i}
                  total={total}
                  progress={scrollYProgress}
                  active={i === activeIndex}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Static background layer
// ---------------------------------------------------------------------------

const BackgroundLayer = memo(function BackgroundLayer() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: [
          'radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(0,0,0,0.35) 100%)',
          'radial-gradient(circle at 92% 0%, rgba(54,185,54,0.18) 0%, transparent 38%)',
          'radial-gradient(circle at 0% 100%, rgba(10,77,38,0.35) 0%, transparent 34%)',
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        ].join(','),
        backgroundSize: 'auto, auto, auto, 64px 64px, 64px 64px',
      }}
    />
  );
});

// ---------------------------------------------------------------------------
// Left column
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

function Header({
  eyebrow,
  heading,
  description,
  footnote,
  activeIndex,
  total,
  scrollYProgress,
}: HeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center lg:items-start lg:text-left"
    >
      <span className="mb-2.5 inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.24em] text-[#36B936] sm:mb-4 sm:text-[12px] lowercase">
        <span className="h-px w-5 bg-[#36B936]" />
        {eyebrow}
      </span>

      <h2 className="max-w-[560px] text-[clamp(1.5rem,4vw,3rem)] font-medium leading-[1.12] tracking-tight text-white lowercase">
        {heading}
      </h2>

      <p className="mt-2.5 max-w-[420px] text-[clamp(0.85rem,1.8vw,1.1rem)] font-medium leading-relaxed tracking-wide text-[#8fae9c] sm:mt-4 lowercase">
        {description}
      </p>

      {total > 1 ? (
        <div className="mt-5 flex w-full max-w-[280px] flex-col items-center gap-2.5 sm:mt-8 lg:items-start">
          <div className="flex w-full items-center gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
              <ProgressSegment key={i} index={i} total={total} scrollYProgress={scrollYProgress} />
            ))}
          </div>
          <span className="text-xs font-medium tabular-nums tracking-wide text-[#8fae9c]/60 sm:text-[13px]">
            {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      ) : (
        footnote && (
          <div className="mt-6 hidden items-center gap-3 text-[13px] font-medium tracking-wide text-[#8fae9c]/60 lg:flex lowercase">
            <span className="h-px w-8 bg-[#8fae9c]/30" />
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
  const fill = useTransform(scrollYProgress, (v) => Math.min(Math.max(v * total - index, 0), 1));

  return (
    <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
      <motion.span
        className="absolute inset-0 origin-left rounded-full bg-[#36B936]"
        style={{ scaleX: fill }}
      />
    </span>
  );
}

// ---------------------------------------------------------------------------
// Step card with robust cross-fade keyframes optimized for mobile devices
// ---------------------------------------------------------------------------

interface StepCardProps {
  step: ProcessStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
  active: boolean;
  reduceMotion: boolean;
}

const StepCard = memo(function StepCard({
  step,
  index,
  total,
  progress,
  active,
  reduceMotion,
}: StepCardProps) {
  // Compute optimized keyframes to avoid layout shifts and guarantee buttery smooth performance
  const input = useMemo(() => {
    if (total === 1) return [0, 1];
    const start = index / total;
    const end = (index + 1) / total;
    const buffer = 0.15 / total;

    if (index === 0) {
      return [0, Math.max(0, end - buffer), end];
    }
    if (index === total - 1) {
      return [Math.min(1, start - buffer), start, 1];
    }
    return [Math.min(1, start - buffer), start, Math.max(0, end - buffer), end];
  }, [index, total]);

  const opacity = useTransform(
    progress,
    input,
    total === 1
      ? [1, 1]
      : index === 0
      ? [1, 1, 0]
      : index === total - 1
      ? [0, 1, 1]
      : [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    input,
    reduceMotion
      ? [0, 0, 0, 0]
      : total === 1
      ? [0, 0]
      : index === 0
      ? [0, 0, 16]
      : index === total - 1
      ? [-16, 0, 0]
      : [-16, 0, 0, 16]
  );

  return (
    <motion.div
      aria-hidden={!active}
      style={{ opacity, y, pointerEvents: active ? 'auto' : 'none' }}
      className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10
                 bg-gradient-to-br from-[#36B936] to-[#0a4d26]
                 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.5)] will-change-[transform,opacity] sm:rounded-[28px]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 45%)' }}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-[4%] right-[3%] select-none text-[clamp(4.5rem,13vw,9rem)] font-medium leading-none tabular-nums text-white/10"
      >
        {step.number}
      </span>

      <div className="relative flex h-full flex-col justify-end gap-2 p-[clamp(1.25rem,4vw,2.5rem)] sm:gap-3">
        <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/60 sm:text-[11px] lowercase">
          step {step.number} <span className="text-white/30">/ {String(total).padStart(2, '0')}</span>
        </span>

        <h3 className="max-w-[90%] text-[clamp(1.15rem,2.8vw,2.1rem)] font-medium tracking-tight text-white sm:max-w-[85%] lowercase">
          {step.title}
        </h3>

        <p className="line-clamp-3 max-w-[95%] text-[clamp(0.8rem,1.7vw,1.05rem)] font-medium leading-relaxed tracking-wide text-white/80 sm:line-clamp-none sm:max-w-[85%] lowercase">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
});