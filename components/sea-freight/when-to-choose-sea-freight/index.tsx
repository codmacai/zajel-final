'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const EASE = [0.2, 0.8, 0.2, 1] as const;

const IMAGE_SRC = '/sea-freight/whentochoose/ChatGPT Image Aug 20, 2026, 01_38_50 PM.png';

const bodyParts = [
  { text: 'Sea freight fits shipments where ', emphasis: false },
  { text: 'cost efficiency matters more than speed', emphasis: true },
  {
    text: ', such as bulk cargo, heavy or oversized loads, and shipments with flexible timelines. For urgent or time-critical cargo, ',
    emphasis: false,
  },
  { text: 'air freight is typically the faster option', emphasis: true },
  { text: '.', emphasis: false },
];

const AirplaneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-1 .1-1.3.5l-.7.9c-.4.4-.2 1.1.3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.4 5.9c.3.5 1 .7 1.4.3l.9-.7c.4-.3.6-.8.5-1.3z" />
  </svg>
);

const TruckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 3h15v13H1z" />
    <path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const routeLinks = [
  { href: '/air-freight', Icon: AirplaneIcon, label: 'Air Freight', note: 'Best for speed' },
  { href: '/land-freight', Icon: TruckIcon, label: 'Land Freight', note: 'Best for regional' },
];

const WhenToChooseSeaFreight = () => {
  return (
    <section className="w-full py-[clamp(2.5rem,6vw,6rem)] bg-white font-sans">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* Feature image block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE }}
          className="relative rounded-xl sm:rounded-2xl overflow-hidden h-[340px] xs:h-[380px] sm:h-[400px] lg:h-[440px] shadow-[0_16px_44px_-16px_rgba(5,54,26,0.4)]"
        >
          <Image
            src={IMAGE_SRC}
            alt="Sea freight vessel at port"
            fill
            sizes="(min-width: 1280px) 1320px, 100vw"
            className="object-cover object-center"
            priority
          />

          {/* Legibility scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 sm:bg-gradient-to-r sm:from-black/85 sm:via-black/55 sm:to-transparent" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-end p-4 xs:p-6 sm:p-8 lg:p-10">
            <div className="max-w-[42ch] sm:max-w-[52ch] lg:max-w-[62ch] flex flex-col gap-2 sm:gap-3.5">
              <h2 className="text-white font-medium leading-[1.15] text-xl xs:text-2xl sm:text-3xl md:text-4xl tracking-tight">
                When to Choose Sea Freight
              </h2>
              <p className="text-white/90 font-light leading-relaxed text-xs xs:text-[13px] sm:text-[14px] tracking-tight">
                {bodyParts.map((part, i) =>
                  part.emphasis ? (
                    <em key={i} className="not-italic font-medium text-[#7BE07B]">
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

        {/* Cross-sell banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE }}
          className="mt-4 sm:mt-6 relative rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-[#0A4D26] via-[#0C3D20] to-[#082C17] px-4 py-5 xs:p-6 sm:px-10 sm:py-9 shadow-[0_20px_50px_-20px_rgba(10,77,38,0.5)]"
        >
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#36B936]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 lg:gap-8">
            <div className="max-w-[46ch]">
              <span className="inline-block text-[10px] xs:text-[11px] sm:text-[12px] font-medium tracking-[0.14em] uppercase text-[#7BE07B] mb-1 sm:mb-2">
                Not the right fit?
              </span>
              <p className="text-white/90 text-xs xs:text-[13px] sm:text-[14px] font-light leading-relaxed tracking-tight">
                If sea freight isn&apos;t the right match for your cargo, explore Air Freight or Land Freight.
              </p>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-4 shrink-0">
              {routeLinks.map(({ href, Icon, label, note }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center gap-2.5 sm:gap-3 rounded-xl bg-white/[0.06] border border-white/10 px-3.5 py-2.5 sm:px-5 sm:py-3.5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#36B936]/15 text-[#7BE07B] group-hover:bg-[#36B936]/25 transition-colors duration-300 shrink-0">
                    <Icon />
                  </span>
                  <span className="flex flex-col min-w-0 flex-1">
                    <span className="text-white text-xs xs:text-[13px] sm:text-[14px] font-medium truncate">{label}</span>
                    <span className="text-white/50 text-[10.5px] sm:text-[11.5px] font-light truncate">{note}</span>
                  </span>
                  <ArrowRightIcon className="ml-auto w-4 h-4 text-white/40 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhenToChooseSeaFreight;