'use client';

import { useRef, useState, type FC } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ABOUT_JOURNEY, type ABOUT_JOURNEYContent } from './content';
import { cmsSection } from '@/components/cms/CmsProvider';

// ---------------------------------------------------------------------------
// Motion
// ---------------------------------------------------------------------------
const EASE = [0.16, 1, 0.3, 1] as const;

const yearVariants = {
  enter: { opacity: 0, y: 16, filter: 'blur(4px)' },
  center: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, y: -12, filter: 'blur(3px)', transition: { duration: 0.3, ease: EASE } },
};

const panelVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.04 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: EASE } },
};

const smoothTransition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

// Scroll distance per step (in viewport heights)
const STEP_VH = 75;

const pad = (n: number) => String(n).padStart(2, '0');

const OurJourney = ({ content }: { content: ABOUT_JOURNEYContent }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, content.stops.length - 1]);

  useMotionValueEvent(rawIndex, 'change', (v) => {
    const idx = Math.min(content.stops.length - 1, Math.max(0, Math.round(v)));
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  // From the CMS content, so edited, added and removed stops all show.
  const stop = content.stops[Math.min(activeIndex, content.stops.length - 1)];

  return (
    <section
      className="relative w-full select-none font-['Manrope',sans-serif]"
      aria-labelledby="our-journey-heading"
    >
      <div ref={containerRef} style={{ height: `${STEP_VH * content.stops.length}vh` }} className="relative">
        {/* svh keeps the pinned frame stable as mobile browser bars show/hide */}
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* Background */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, #0A5A2E 0%, #064423 30%, #053A20 55%, #04321C 75%, #042B18 100%)',
            }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -left-24 -top-24 h-[520px] w-[520px] rounded-full bg-[#36B936]/[0.08] blur-[140px]" />
            <div className="absolute -right-16 bottom-0 h-[460px] w-[460px] rounded-full bg-[#8FE38F]/[0.04] blur-[150px]" />
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(120% 60% at 50% 8%, transparent 45%, rgba(0,0,0,0.35) 100%)' }}
            />
          </div>

          {/* Content — top padding keeps it clear of a fixed navbar (set --navbar-height in globals.css) */}
          <div className="relative z-10 flex h-full flex-col justify-center pt-[var(--navbar-height,0px)]">
            <div className="mx-auto w-full max-w-[1300px] px-4 sm:px-6 lg:px-12">
              {/* Heading + divider */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={smoothTransition}
                className="mb-[clamp(1rem,4vh,3rem)] text-center"
              >
                <h2
                  id="our-journey-heading"
                  className="mb-3 text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.15] tracking-tight text-white sm:mb-4"
                >
                  {content.heading}
                </h2>
                <span className="inline-block h-px w-14 bg-white/30" aria-hidden="true" />
              </motion.div>

              {/* Scroll-driven year numeral (scales with viewport height so nothing clips) */}
              <div className="mb-[clamp(1.25rem,5vh,3.5rem)] flex h-[clamp(3.5rem,13vh,8rem)] items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={stop.year}
                    variants={yearVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="text-[clamp(3.25rem,12vh,7.5rem)] font-light leading-none tracking-tight text-white"
                  >
                    {stop.year === 'Present' ? '∞' : stop.year}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Counter / narrative split */}
              <div aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stop.year}
                    variants={panelVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="mx-auto grid max-w-[1100px] grid-cols-1 gap-4 sm:gap-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.7fr)] md:gap-14 lg:gap-20"
                  >
                    {/* Left — position in the timeline */}
                    <div className="flex items-baseline gap-3 md:block">
                      <span className="block text-2xl font-light leading-none tracking-tight text-white sm:text-3xl md:mb-3 md:text-5xl">
                        {pad(activeIndex + 1)}
                        <span className="text-[0.55em] text-white/40"> / {pad(content.stops.length)}</span>
                      </span>
                      <p className="max-w-[240px] text-[0.8125rem] font-light leading-snug text-white/60 sm:text-sm">
                        {stop.caption}
                      </p>
                    </div>

                    {/* Right — title + description */}
                    <div>
                      <h3 className="mb-3 text-[1.0625rem] font-medium leading-snug tracking-tight text-white sm:mb-4 sm:text-xl lg:text-2xl">
                        {stop.eyebrow}
                        {stop.isPresent ? ' (Today)' : ''}
                      </h3>
                      <div className="flex max-w-[62ch] flex-col gap-2.5 sm:gap-3.5">
                        {stop.beats.map((beat, i) => (
                          <p
                            key={i}
                            className="text-[0.875rem] font-light leading-relaxed text-white/80 sm:text-[0.9375rem] lg:text-base"
                          >
                            {beat}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default cmsSection('about.journey', ABOUT_JOURNEY, OurJourney);
