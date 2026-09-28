'use client';

import { useRef, useState, type FC } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
const sectionHeading = 'Our Journey';

type Stop = {
  year: string;
  eyebrow: string;
  beats: string[];
  caption: string;
  isPresent?: boolean;
};

const stops: Stop[] = [
  {
    year: '2008',
    eyebrow: 'The beginning.',
    beats: [
      'Zajel is founded in Dubai, starting with Emirates ID and passport delivery for UAE government entities.',
      'Zajel partners with the General Directorate of Residency and Foreigners Affairs (GDRFA), becoming the official courier service for passport and Emirates ID deliveries.',
    ],
    caption: 'Emirates ID and passport delivery, Dubai',
  },
  {
    year: '2009',
    eyebrow: 'A new partnership.',
    beats: [
      "Zajel partners with Dubai Courts, enabling customers to complete document accreditation through Zajel's courier services.",
    ],
    caption: 'Document accreditation with Dubai Courts',
  },
  {
    year: '2012',
    eyebrow: 'Growing footprint.',
    beats: [
      "Zajel opens its first office in Jebel Ali Free Zone (JAFZA), strengthening its presence in Dubai's business and logistics hub.",
    ],
    caption: 'First office opens in JAFZA',
  },
  {
    year: '2018',
    eyebrow: 'Expanding to the capital.',
    beats: [
      'Zajel expands its UAE footprint with the opening of its first office in Abu Dhabi.',
    ],
    caption: 'First office opens in Abu Dhabi',
  },
  {
    year: '2022',
    eyebrow: 'A national partnership.',
    beats: [
      'Zajel becomes an official courier service for the Ministry of Foreign Affairs (MOFA), supporting customers with pickup and delivery of documents for official attestation and accreditation.',
    ],
    caption: 'Official courier for MOFA',
  },
  {
    year: '2023',
    eyebrow: 'A new chapter.',
    beats: [
      'Nabeel AlKharabsheh joins as General Manager, opening a chapter focused on growth, operational excellence, and transformation.',
      'Zajel begins its shift from a traditional courier business into a full logistics and supply-chain company.',
    ],
    caption: 'New leadership, new direction',
  },
  {
    year: '2024',
    eyebrow: 'Building momentum.',
    beats: [
      'An operational efficiency program strengthens internal delivery capabilities and reduces reliance on third-party resources.',
      'ZajelNOW launches — on-demand, point-to-point and same-day delivery across the UAE.',
      'GDRFA Dubai recognizes Zajel as a Strategic Partner; freight forwarding expands across air, sea, and land.',
    ],
    caption: 'ZajelNOW launches across the UAE',
  },
  {
    year: '2025',
    eyebrow: 'Recognition and reach.',
    beats: [
      'Investment increases in technology, automation, business intelligence, and route optimization.',
      'Zajel is named Freight Forwarder of the Year; Nabeel AlKharabsheh receives Logistics Executive of the Year.',
      'A five-year growth strategy is set — diversification, technology, expansion into Abu Dhabi and Al Ain, e-commerce, fulfillment, and freight.',
      'Zajel further expands its UAE network with the opening of its first office in Al Ain.',
    ],
    caption: 'Freight Forwarder of the Year',
  },
  {
    year: '2026',
    eyebrow: 'Excellence, recognized.',
    beats: ["Zajel receives the Delivery Sector Excellence Award, with recognition involving Dubai's RTA and Dubai Police."],
    caption: 'Delivery Sector Excellence Award',
  },
  {
    year: 'Present',
    eyebrow: 'The journey continues.',
    beats: [
      'Zajel is evolving from a courier company into an integrated, technology-enabled logistics partner — connecting businesses and communities through express delivery, e-commerce, fulfillment, freight forwarding, and cross-border logistics.',
    ],
    caption: 'An integrated logistics partner',
    isPresent: true,
  },
];

const yearVariants = {
  enter: { opacity: 0, y: 16, filter: 'blur(4px)' },
  center: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: 'blur(3px)',
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const panelVariants = {
  enter: { opacity: 0, y: 12 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: 0.04 },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const smoothTransition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

// Optimized scroll track height per step for snappy, responsive pacing
const STEP_VH = 75;

const OurJourney: FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, stops.length - 1]);

  useMotionValueEvent(rawIndex, 'change', (v) => {
    const idx = Math.min(stops.length - 1, Math.max(0, Math.round(v)));
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  const stop = stops[activeIndex];

  return (
    <section className="w-full relative select-none font-sans" aria-labelledby="our-journey-heading">
      <div ref={containerRef} style={{ height: `${STEP_VH * stops.length}vh` }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Background Gradient & Ambient Glows */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, #0A5A2E 0%, #064423 30%, #053A20 55%, #04321C 75%, #042B18 100%)',
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-[#36B936]/[0.08] blur-[140px] rounded-full" />
            <div className="absolute bottom-0 -right-16 w-[460px] h-[460px] bg-[#8FE38F]/[0.04] blur-[150px] rounded-full" />
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(120% 60% at 50% 8%, transparent 45%, rgba(0,0,0,0.35) 100%)' }}
            />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center">
            <div className="max-w-[1300px] w-full mx-auto px-4 sm:px-6 lg:px-12">
              {/* Heading + divider */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={smoothTransition}
                className="text-center mb-8 sm:mb-10 md:mb-12"
              >
                <h2
                  id="our-journey-heading"
                  className="text-2xl sm:text-3xl md:text-4xl text-white font-medium tracking-tight leading-[1.15] mb-4 sm:mb-5"
                >
                  {sectionHeading}
                </h2>
                <span className="inline-block w-14 h-px bg-white/30" aria-hidden="true" />
              </motion.div>

              {/* Scroll-driven year numeral */}
              <div className="flex justify-center mb-10 sm:mb-12 md:mb-14 h-[80px] sm:h-[96px] md:h-[110px] items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={stop.year}
                    variants={yearVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="text-white font-light leading-none tracking-tight text-6xl sm:text-7xl md:text-8xl"
                  >
                    {stop.year === 'Present' ? '∞' : stop.year}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Stat / narrative split */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={stop.year}
                  variants={panelVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="grid grid-cols-1 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] gap-6 sm:gap-8 md:gap-14"
                >
                  {/* Left — position in the timeline as the standout mark */}
                  <div>
                    <span className="block text-white font-light leading-none text-4xl sm:text-5xl tracking-tight mb-2">
                      {String(activeIndex + 1).padStart(2, '0')}
                      <span className="text-white/35 text-xl sm:text-2xl">
                        {' '}
                        / {String(stops.length).padStart(2, '0')}
                      </span>
                    </span>
                    <p className="text-white/50 text-[0.8rem] sm:text-[0.85rem] font-light leading-relaxed max-w-[220px]">
                      {stop.caption}
                    </p>
                  </div>

                  {/* Right — title + description */}
                  <div>
                    <h3 className="text-white text-[0.95rem] sm:text-[1.1rem] lg:text-[1.25rem] font-medium tracking-tight mb-3 sm:mb-4">
                      {stop.eyebrow}
                      {stop.isPresent ? ' (Today)' : ''}
                    </h3>
                    <div className="flex flex-col gap-2.5 sm:gap-3">
                      {stop.beats.map((beat, i) => (
                        <p key={i} className="text-white/65 text-[0.8rem] sm:text-[0.85rem] font-light leading-relaxed">
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
    </section>
  );
};

export default OurJourney;