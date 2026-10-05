'use client';

import * as React from 'react';
import { memo, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  easeInOut,
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
  /** Small label above the heading, e.g. "freight quote" */
  eyebrow: string;
  /** Heading node, e.g. <>how a freight<br />quote works</> */
  heading: ReactNode;
  /** Supporting paragraph under the heading */
  description: string;
  /** Small line under the heading when there is only one step */
  footnote?: string;
  /** Steps, revealed one at a time while scrolling */
  steps: ProcessStep[];
}

const SVH_PER_STEP = 140;
const FADE = 0.15;

const GREEN = '#36B936';
const GREEN_DARK = '#0a4d26';

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export default function ProcessStepsSection({
  eyebrow,
  heading,
  description,
  footnote,
  steps,
}: ProcessStepsSectionProps) {
  const trackRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion() ?? false;
  const total = steps.length;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 35,
    mass: 0.4,
    restDelta: 0.0001,
  });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = Math.max(0, Math.min(total - 1, Math.floor(p * total)));
    setActiveIndex((cur) => (cur === next ? cur : next));
  });

  const trackHeight = `${Math.max(total - 1, 0) * SVH_PER_STEP + 100}svh`;

  return (
    <section
      ref={trackRef}
      className="relative w-full bg-white font-sans"
      style={{ height: trackHeight }}
    >
      <div
        className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden bg-white px-5 sm:px-8 md:px-12 lg:px-20"
        style={{ contain: 'layout paint' }}
      >
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-[clamp(2.5rem,6vw,5rem)]">
            <Header
              eyebrow={eyebrow}
              heading={heading}
              description={description}
              footnote={footnote}
              activeIndex={activeIndex}
              total={total}
            />

            {/* Stage: fixed ratio, cards stacked inside */}
            <div className="relative isolate aspect-[4/3] max-h-[380px] w-full sm:aspect-[16/9] sm:max-h-[420px] lg:aspect-[21/10]">
              {steps.map((step, i) => (
                <StepCard
                  key={step.number}
                  step={step}
                  index={i}
                  total={total}
                  progress={smoothProgress}
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
// Left column (Matched with Zajel style: side bars, uppercase, medium heading)
// ---------------------------------------------------------------------------

interface HeaderProps {
  eyebrow: string;
  heading: ReactNode;
  description: string;
  footnote?: string;
  activeIndex: number;
  total: number;
}

function Header({
  eyebrow,
  heading,
  description,
  footnote,
  activeIndex,
  total,
}: HeaderProps) {
  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
      {/* Eyebrow with side lines matching WhyChooseZajel style */}
      <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
        <span className="text-[#36B936] font-medium text-xs sm:text-sm tracking-wider uppercase">
          {eyebrow}
        </span>
      </div>

      <h2 className="max-w-[560px] text-2xl sm:text-3xl md:text-4xl text-[#0A4D26] font-medium tracking-tight mb-4">
        {heading}
      </h2>

      <p className="max-w-[440px] text-[#2d6a4f] font-light text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed">
        {description}
      </p>

      {total > 1 ? (
        <span className="mt-6 text-[13px] font-medium tracking-wide tabular-nums text-[#2d6a4f]/70 sm:mt-8">
          {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      ) : (
        footnote && (
          <div className="mt-6 hidden items-center gap-3 text-[13px] font-normal text-[#2d6a4f]/70 lg:flex">
            <span className="h-px w-8 bg-[#2d6a4f]/40" />
            {footnote}
          </div>
        )
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step card
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
  const frames = useMemo(() => {
    if (total === 1) return { x: [0, 1], o: [1, 1], y: [0, 0], s: [1, 1] };

    const range = 1 / total;
    const f = range * FADE;
    const start = index * range;
    const end = (index + 1) * range;
    const isFirst = index === 0;
    const isLast = index === total - 1;

    const x: number[] = [];
    const o: number[] = [];
    const y: number[] = [];
    const s: number[] = [];

    if (isFirst) {
      x.push(0);
      o.push(1);
      y.push(0);
      s.push(1);
    } else {
      x.push(start + f, start + 2 * f);
      o.push(0, 1);
      y.push(24, 0);
      s.push(0.97, 1);
    }

    if (isLast) {
      x.push(1);
      o.push(1);
      y.push(0);
      s.push(1);
    } else {
      x.push(end - 2 * f, end - f);
      o.push(1, 0);
      y.push(0, -24);
      s.push(1, 0.97);
    }

    return { x, o, y, s };
  }, [index, total]);

  const opts = { ease: easeInOut };
  const opacity = useTransform(progress, frames.x, frames.o, opts);
  const yRaw = useTransform(progress, frames.x, frames.y, opts);
  const scaleRaw = useTransform(progress, frames.x, frames.s, opts);

  const visibility = useTransform(opacity, (v) => (v < 0.01 ? 'hidden' : 'visible'));

  const motionStyle = reduceMotion
    ? { opacity, visibility }
    : { opacity, visibility, y: yRaw, scale: scaleRaw };

  return (
    <motion.div
      aria-hidden={!active}
      style={{
        ...motionStyle,
        pointerEvents: active ? 'auto' : 'none',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transformOrigin: '50% 50%',
      }}
      className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#36B936] to-[#0a4d26] shadow-[0_16px_36px_-16px_rgba(10,77,38,0.45)] will-change-[transform,opacity] sm:rounded-[2rem]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 45%)' }}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-[4%] right-[3%] select-none text-[clamp(4.5rem,13vw,9rem)] font-light leading-none tabular-nums text-white/10"
      >
        {step.number}
      </span>

      <div className="relative flex h-full flex-col justify-end gap-2 p-[clamp(1.25rem,4vw,2.5rem)] sm:gap-3">
        <span className="inline-flex items-center gap-2 text-[12px] font-medium tracking-wider uppercase text-white/70 sm:text-[13px]">
          step {step.number} <span className="text-white/30 font-light">/ {String(total).padStart(2, '0')}</span>
        </span>

        <h3 className="max-w-[90%] text-[clamp(1.25rem,2.8vw,2.05rem)] font-medium leading-snug tracking-tight text-white sm:max-w-[85%]">
          {step.title}
        </h3>

        <p className="line-clamp-3 max-w-[95%] text-[clamp(0.85rem,1.7vw,1.02rem)] font-light leading-[1.6] text-white/85 sm:line-clamp-none sm:max-w-[85%]">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
});