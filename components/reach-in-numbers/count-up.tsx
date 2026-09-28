"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  startTrigger: boolean;
  prefix?: string;
  suffix?: string;
}

export default function CountUp({ end, duration = 2000, startTrigger, prefix = "", suffix = "" }: CountUpProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    if (!startTrigger) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * end);

      if (currentVal !== countRef.current) {
        countRef.current = currentVal;
        setCount(currentVal);
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, startTrigger]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}