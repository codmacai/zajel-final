'use client';

import type { ReactNode } from 'react';
import { LazyMotion, MotionConfig, m, type Variants } from 'framer-motion';

/**
 * The ONLY client-side animation code for the career page.
 * Sections stay server components (HTML is in the first response) and wrap
 * their animated bits in <Reveal> / <Stagger> / <StaggerItem>.
 *
 * - `m.*` + LazyMotion (async features) instead of `motion.*` -> much smaller bundle
 * - reducedMotion="user" -> respects the OS "reduce motion" setting
 */

const loadFeatures = () => import('./motion-features').then((mod) => mod.default);

const EASE: [number, number, number, number] = [0.04, 0.62, 0.23, 0.98];
const TRANSITION = { duration: 0.8, ease: EASE };

type Margin = `${number}px`;

function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  x?: number;
  y?: number;
  scale?: number;
  delay?: number;
  margin?: Margin;
}

/** Fade/slide (optionally scale) a block in once it scrolls into view. */
export function Reveal({ children, className, x = 0, y = 20, scale, delay = 0, margin }: RevealProps) {
  return (
    <MotionProvider>
      <m.div
        className={className}
        initial={{ opacity: 0, x, y, ...(scale !== undefined && { scale }) }}
        whileInView={{ opacity: 1, x: 0, y: 0, ...(scale !== undefined && { scale: 1 }) }}
        viewport={{ once: true, margin }}
        transition={{ ...TRANSITION, delay }}
      >
        {children}
      </m.div>
    </MotionProvider>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  scale?: number;
  margin?: Margin;
}

/** Parent that reveals its <StaggerItem> children one after another. */
export function Stagger({ children, className, stagger = 0.1, delay = 0, scale, margin }: StaggerProps) {
  const variants: Variants = {
    hidden: { opacity: 0, ...(scale !== undefined && { scale }) },
    visible: {
      opacity: 1,
      ...(scale !== undefined && { scale: 1 }),
      transition: { ...TRANSITION, staggerChildren: stagger, delayChildren: delay },
    },
  };

  return (
    <MotionProvider>
      <m.div
        className={className}
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin }}
      >
        {children}
      </m.div>
    </MotionProvider>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  y?: number;
  scale?: number;
}

export function StaggerItem({ children, className, y = 20, scale }: StaggerItemProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y, ...(scale !== undefined && { scale }) },
    visible: { opacity: 1, y: 0, ...(scale !== undefined && { scale: 1 }), transition: TRANSITION },
  };

  return (
    <m.div className={className} variants={variants}>
      {children}
    </m.div>
  );
}
