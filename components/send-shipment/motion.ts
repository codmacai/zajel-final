'use client';

import { useCallback, useEffect, useRef } from 'react';

// Motion language ported from Zajel-2's SendShipmentPage: one Apple-style spring for anything
// that moves (card presses, check pop-ins), a softer one for step transitions and fills, and a
// crossfade + slight scale + vertical drift between steps instead of a flat slide.

export const SPRING = { type: 'spring', stiffness: 380, damping: 32, mass: 0.9 } as const;
export const SOFT_SPRING = { type: 'spring', stiffness: 260, damping: 26 } as const;

export const PAGE_VARIANTS = {
  initial: { opacity: 0, y: 18, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -14, scale: 0.985 },
};

/** Hover lift + press for selectable cards (React's SelectCard). */
export const CARD_HOVER = { scale: 1.015, y: -2 } as const;
export const CARD_TAP = { scale: 0.98 } as const;
/** Smaller chips (dates, time slots). */
export const CHIP_HOVER = { scale: 1.04 } as const;
export const CHIP_TAP = { scale: 0.96 } as const;

/**
 * When a pick IS the last answer on a step (route type, a saved address, the final time slot),
 * move on by itself — after a short delay so the selection's own animation can play first,
 * same as React's autoAdvance(). `advance` is always the latest render's version (so it sees
 * the state the pick just set), and nothing fires if the user already left that step.
 */
export function useAutoAdvance(step: number, advance: () => void) {
  const advanceRef = useRef(advance);
  const stepRef = useRef(step);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    advanceRef.current = advance;
    stepRef.current = step;
  });

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  return useCallback((delay = 450) => {
    const scheduledOn = stepRef.current;
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      timer.current = null;
      if (stepRef.current === scheduledOn) advanceRef.current();
    }, delay);
  }, []);
}
