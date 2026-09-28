'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const EASE = [0.2, 0.8, 0.2, 1] as const;

const IMAGE_URL = '/landfreight/when-to-choose-land-freight.png';

const bodyParts = [
  { text: 'Land freight fits regional distribution and cross-border shipments where ', emphasis: false },
  { text: 'road access makes sense', emphasis: true },
  {
    text: '— domestic delivery across the UAE, or cross-border cargo to neighboring markets. It offers a ',
    emphasis: false,
  },
  { text: 'flexible middle ground', emphasis: true },
  { text: ' between the speed of air freight and the bulk cost-efficiency of sea freight.', emphasis: false },
];

const WhenToChooseLandFreight = () => {
  return (
    <section className="w-full bg-white font-sans py-[clamp(2.5rem,6vw,5.5rem)] px-[clamp(1rem,4vw,3.5rem)] overflow-hidden">
      <div className="mx-auto max-w-[1320px]">
        
        {/* Main Hero Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative min-h-[340px] h-[clamp(340px,40vw,440px)] w-full overflow-hidden rounded-2xl sm:rounded-[1.25rem] shadow-[0_16px_44px_-16px_rgba(5,54,26,0.35)]"
        >
          {/* Background Image */}
          <Image
            src={IMAGE_URL}
            alt="When to choose land freight"
            fill
            sizes="(min-width: 1280px) 1320px, 100vw"
            className="object-cover"
            priority
          />

          {/* Gradient Overlays for Readability */}
          <div className="absolute inset-y-0 left-0 w-full sm:w-[80%] md:w-[70%] lg:w-[60%] bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Banner Content */}
          <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="flex max-w-[42ch] sm:max-w-[54ch] lg:max-w-[64ch] flex-col gap-2.5 sm:gap-3.5 text-left">
              
              {/* Responsive Medium Desktop Heading */}
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.125rem] font-medium leading-[1.2] tracking-tight text-white">
                When to Choose Land Freight
              </h2>

              <p className="text-xs sm:text-sm md:text-base font-light leading-relaxed tracking-normal text-white/90">
                {bodyParts.map((part, i) =>
                  part.emphasis ? (
                    <em key={i} className="font-medium not-italic text-[#36B936]">
                      {part.text}
                    </em>
                  ) : (
                    <span key={i}>{part.text}</span>
                  )
                )}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Cross-Sell Alternative Solutions Banner */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="relative mt-6 sm:mt-8 overflow-hidden rounded-2xl sm:rounded-[1.25rem] bg-gradient-to-br from-[#1b4332] via-[#0C3D20] to-[#082C17] p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_-20px_rgba(10,77,38,0.45)]"
        >
          {/* Ambient Background Glows */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#36B936]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center lg:gap-8 text-left">
            
            {/* Text Column */}
            <div className="max-w-[48ch]">
              <span className="mb-1.5 inline-block text-[clamp(0.6875rem,0.75vw,0.8125rem)] font-semibold uppercase tracking-wider text-[#36B936]">
                Not the right fit?
              </span>
              <p className="text-sm sm:text-base font-light leading-relaxed tracking-tight text-white/90">
                If land freight isn&apos;t the right match for your cargo requirements, explore our dedicated Air Freight or Sea Freight services.
              </p>
            </div>

            {/* Quick Link Navigation Buttons */}
            <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-3 shrink-0">
              
              {/* Air Freight Option */}
              <Link
                href="/services/air-freight"
                className="group flex w-full sm:w-auto items-center justify-between sm:justify-start gap-3.5 rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 sm:px-5 sm:py-3.5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-white/25 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#36B936]/15 text-[#36B936] transition-colors duration-300 group-hover:bg-[#36B936]/25">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-1 .1-1.3.5l-.7.9c-.4.4-.2 1.1.3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.4 5.9c.3.5 1 .7 1.4.3l.9-.7c.4-.3.6-.8.5-1.3z" />
                    </svg>
                  </span>
                  <span className="flex flex-col text-left">
                    <span className="text-sm font-medium text-white">Air Freight</span>
                    <span className="text-xs font-light text-white/50">Best for speed</span>
                  </span>
                </div>
                <svg className="h-4 w-4 text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>

              {/* Sea Freight Option */}
              <Link
                href="/services/sea-freight"
                className="group flex w-full sm:w-auto items-center justify-between sm:justify-start gap-3.5 rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 sm:px-5 sm:py-3.5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-white/25 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#36B936]/15 text-[#36B936] transition-colors duration-300 group-hover:bg-[#36B936]/25">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                      <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
                      <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
                      <path d="M12 10v4" />
                      <path d="M12 2v3" />
                    </svg>
                  </span>
                  <span className="flex flex-col text-left">
                    <span className="text-sm font-medium text-white">Sea Freight</span>
                    <span className="text-xs font-light text-white/50">Best for volume</span>
                  </span>
                </div>
                <svg className="h-4 w-4 text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhenToChooseLandFreight;