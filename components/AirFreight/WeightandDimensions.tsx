"use client";

import { motion } from "framer-motion";
import {
  WEIGHT_DIMENSION_NOTES,
  WEIGHT_DIMENSION_ROWS,
} from "@/data/air-freight/weightanddimensions";

const EASE = [0.2, 0.8, 0.2, 1] as const;

interface WeightDimensionGuidelinesProps {
  onGetQuote?: () => void;
  contactHref?: string;
}

export default function WeightDimensionGuidelines({
  onGetQuote,
  contactHref = "#contact",
}: WeightDimensionGuidelinesProps) {
  return (
    <section
      className="relative w-full overflow-hidden px-4 py-12 xs:px-6 sm:py-16 lg:px-12 lg:py-24"
      style={{
        background: "radial-gradient(120% 140% at 78% 85%, #1F7A45 0%, #0F5C2E 32%, #0A4D26 58%, #073A1D 100%)",
      }}
    >
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute bottom-[-10%] right-[-8%] h-[85%] w-[55%]"
        style={{ background: "radial-gradient(closest-side, rgba(123,224,123,0.22) 0%, rgba(123,224,123,0) 70%)" }}
      />
      <div
        className="pointer-events-none absolute left-[-5%] top-[10%] h-[65%] w-[45%] opacity-40 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(54,185,54,0.3) 0%, rgba(10,77,38,0) 70%)" }}
      />

      {/* Fine top sheen border */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }}
      />

      <div className="relative z-10 mx-auto max-w-[1240px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-8 xs:mb-10 text-center sm:mb-[clamp(2rem,6vw,4rem)]"
        >
          <div className="mb-3 xs:mb-4 flex items-center justify-center gap-3 sm:gap-4">
            <span className="h-[2px] w-6 xs:w-8" style={{ backgroundColor: "#36B936" }} />
            <span className="text-xs sm:text-sm font-medium tracking-wider uppercase" style={{ color: "#36B936" }}>
              Cargo Parameters
            </span>
            <span className="h-[2px] w-6 xs:w-8" style={{ backgroundColor: "#36B936" }} />
          </div>

          <h2 className="mx-auto max-w-[720px] text-2xl xs:text-3xl font-medium leading-[1.15] tracking-tight text-white md:text-4xl px-2">
            Air Freight Weight &amp; Dimension Guidelines
          </h2>

          <p className="mx-auto mt-3 xs:mt-4 sm:mt-5 max-w-[520px] text-xs xs:text-[13.5px] font-light leading-relaxed text-white/70 sm:text-[14px] px-2">
            Understanding air freight weight and size limits helps you plan shipments and choose
            the right service configuration through Zajel.
          </p>
        </motion.div>

        {/* True Responsive Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="overflow-hidden rounded-2xl sm:rounded-[2rem] border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] shadow-[0_30px_70px_-15px_rgba(4,32,15,0.6)] backdrop-blur-2xl"
        >
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04]">
                  <th className="w-[28%] p-3.5 xs:p-4 sm:p-6 text-[10px] xs:text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.12em] sm:tracking-[0.14em] text-white/50">
                    Category
                  </th>
                  <th className="w-[36%] p-3.5 xs:p-4 sm:p-6 text-[10px] xs:text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#36B936]">
                    Standard Air Freight
                  </th>
                  <th className="w-[36%] p-3.5 xs:p-4 sm:p-6 text-[10px] xs:text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.12em] sm:tracking-[0.14em] text-white/95">
                    Charter / Heavy Lift
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {WEIGHT_DIMENSION_ROWS.map((row) => (
                  <tr key={row.label} className="group transition-colors duration-300 hover:bg-white/[0.06]">
                    <td className="p-3.5 xs:p-4 sm:p-6 align-top text-xs xs:text-sm sm:text-base font-medium text-white/95">
                      {row.label}
                    </td>
                    <td className="p-3.5 xs:p-4 sm:p-6 align-top text-[11px] xs:text-xs sm:text-sm font-light leading-relaxed text-white/70">
                      {row.standard}
                    </td>
                    <td className="p-3.5 xs:p-4 sm:p-6 align-top text-[11px] xs:text-xs sm:text-sm font-light leading-relaxed text-white/70">
                      {row.charter}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Key notes grid */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mt-8 xs:mt-10 sm:mt-12 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2"
        >
          {WEIGHT_DIMENSION_NOTES.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-5 xs:p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#36B936]/40 hover:from-white/[0.08] hover:via-[#36B936]/10 hover:to-white/[0.02]"
            >
              <div>
                <div className="mb-4 xs:mb-6 flex items-center justify-between">
                  <div className="flex h-11 w-11 xs:h-12 xs:w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#36B936] shadow-sm transition-all duration-300 group-hover:border-transparent group-hover:bg-[#36B936] group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.25} />
                  </div>
                  <span className="text-[11px] font-medium tracking-wide text-white/30 transition-colors duration-300 group-hover:text-white/70">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                </div>

                <h3 className="mb-2 text-sm xs:text-base sm:text-lg font-medium tracking-tight text-white">
                  {title}
                </h3>
              </div>

              <p className="mt-2 text-xs xs:text-[13px] sm:text-sm font-light leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-white/85">
                {description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="mt-8 xs:mt-10 sm:mt-14 flex flex-col items-center gap-4 text-center"
        >
          <button
            type="button"
            onClick={onGetQuote}
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#36B936] px-6 py-3 xs:px-7 xs:py-3.5 text-xs xs:text-sm font-medium tracking-tight text-white shadow-[0_10px_28px_rgba(54,185,54,0.25)] transition-all duration-200 hover:scale-[1.02] hover:bg-[#2fa32f] active:scale-100"
          >
            <span>Get an Air Freight Quote</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </button>

          <a
            href={contactHref}
            className="text-xs xs:text-sm font-medium text-white/60 underline decoration-white/20 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-[#36B936]"
          >
            Contact Us for Heavy or Oversized Cargo
          </a>
        </motion.div>
      </div>
    </section>
  );
}