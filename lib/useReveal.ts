"use client";

import { useEffect, useRef, useState } from "react";

export const useSharedRevealObserver = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const callbacksRef = useRef(new WeakMap<Element, () => void>());

  const getObserver = () => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              callbacksRef.current.get(entry.target)?.();
              observerRef.current?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
    }
    return observerRef.current;
  };

  useEffect(() => () => observerRef.current?.disconnect(), []);

  const register = (node: Element, onVisible: () => void) => {
    callbacksRef.current.set(node, onVisible);
    getObserver().observe(node);
  };

  return { register };
};

export const useReveal = <T extends HTMLElement>(register: (node: Element, onVisible: () => void) => void) => {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    register(node, () => setIsVisible(true));
  }, [register]);

  return { ref, isVisible };
};