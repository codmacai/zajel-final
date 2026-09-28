"use client";

import { useEffect, useState } from "react";

export function useCountUp(target: number, start: boolean, duration = 2000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start || target === 0) return;

    let startTime: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target, start, duration]);

  return value;
}