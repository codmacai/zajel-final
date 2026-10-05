import type { MotionProps } from 'framer-motion';

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Scroll-reveal props: spread onto any motion element. */
export const fadeUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, ease: EASE, delay },
});
