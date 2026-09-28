"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CROSS_SELL_ROUTES,
  SMOOTH_TRANSITION,
  TRANSIT_GUIDE_BODY,
  TRANSIT_GUIDE_IMAGE_SRC,
  type RouteLinkData,
} from "@/data/air-freight/choose";

function SeaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 xs:h-5 xs:w-5">
      <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
      <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
      <path d="M12 10v4" />
      <path d="M12 2v3" />
    </svg>
  );
}

function LandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 xs:h-5 xs:w-5">
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

const ICONS_BY_HREF: Record<string, React.ComponentType> = {
  "/sea-freight": SeaIcon,
  "/land-freight": LandIcon,
};

function RouteLink({ href, label, sublabel }: RouteLinkData) {
  const Icon = ICONS_BY_HREF[href];

  return (
    <Link
      href={href}
      className="group relative flex flex-1 items-center gap-2.5 xs:gap-3 rounded-xl sm:rounded-2xl border border-black/[0.04] bg-white px-3.5 py-3 xs:px-4 xs:py-3.5 shadow-[0_1px_2px_rgba(10,77,38,0.06),0_10px_24px_-8px_rgba(10,77,38,0.28)] hover:-translate-y-[2px] transition-all duration-300"
    >
      <span className="relative flex h-9 w-9 xs:h-10 xs:w-10 shrink-0 items-center justify-center rounded-full bg-[#36B936]/12 text-[#36B936]">
        {Icon ? <Icon /> : null}
      </span>

      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate text-xs xs:text-[13px] font-medium text-[#0A4D26] sm:text-sm">{label}</span>
        <span className="mt-0.5 truncate text-[10.5px] xs:text-[11px] font-light text-[#0A4D26]/50 sm:text-[11.5px]">
          {sublabel}
        </span>
      </span>

      <svg className="ml-auto h-3.5 w-3.5 xs:h-4 xs:w-4 shrink-0 text-[#0A4D26]/35 group-hover:text-[#36B936] group-hover:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </Link>
  );
}

export default function WhenToChooseAirFreight() {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-24">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-4 sm:gap-6 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="group relative flex min-h-[340px] xs:min-h-[380px] flex-col justify-end overflow-hidden rounded-2xl sm:rounded-[2rem] border border-[#0A4D26]/10 shadow-[0_20px_50px_-15px_rgba(5,54,26,0.35)] sm:min-h-[420px] lg:min-h-[460px]"
        >
          <Image
            src={TRANSIT_GUIDE_IMAGE_SRC}
            alt="Air freight in transit"
            fill
            sizes="(min-width: 1280px) 1320px, 100vw"
            className="scale-105 object-cover transition-transform duration-1000 group-hover:scale-100"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 sm:bg-gradient-to-r sm:from-black/85 sm:via-black/55 sm:to-transparent md:w-[75%] lg:w-[60%]" />

          <div className="relative z-10 flex max-w-2xl flex-col gap-2.5 xs:gap-3 p-4 xs:p-6 sm:gap-4 sm:p-10 lg:p-12">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-6 xs:w-8 bg-[#36B936]" />
              <span className="text-[11px] xs:text-xs font-semibold tracking-wider uppercase text-[#36B936] sm:text-sm">
                Transit Guide
              </span>
            </div>

            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.15] tracking-tight text-white">
              When to Choose Air Freight
            </h2>

            <p className="text-xs xs:text-[0.85rem] sm:text-[1rem] font-light leading-relaxed tracking-wide text-white/85">
              {TRANSIT_GUIDE_BODY.map((part, i) =>
                part.emphasis ? (
                  <span key={i} className="font-medium text-[#36B936]">
                    {part.text}
                  </span>
                ) : (
                  <span key={i}>{part.text}</span>
                )
              )}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 }}
          className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-[#0A4D26] via-[#0C3D20] to-[#082C17] p-5 xs:p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_-20px_rgba(10,77,38,0.5)]"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#36B936]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-4 xs:gap-6 lg:flex-row lg:items-center lg:gap-8">
            <div className="max-w-xl">
              <span className="mb-1.5 xs:mb-2 inline-block text-[10.5px] xs:text-xs font-semibold uppercase tracking-[0.14em] text-[#36B936]">
                Alternative Options
              </span>
              <p className="text-xs xs:text-sm sm:text-lg font-light leading-snug tracking-tight text-white">
                Not the right fit? Explore our robust Sea Freight and Land Freight networks.
              </p>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:flex sm:flex-row sm:gap-4 shrink-0">
              {CROSS_SELL_ROUTES.map((route) => (
                <RouteLink key={route.href} {...route} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}