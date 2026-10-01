"use client";

import { motion } from "framer-motion";
import { LIGHT_GREEN, VALUE_ADDED_SERVICES } from "@/data/air-freight/valueadded";

const EASE = [0.2, 0.8, 0.2, 1] as const;

interface ValueAddedServicesProps {
  onRequestQuote?: () => void;
  contactHref?: string;
}

export default function ValueAddedServices({
  onRequestQuote,
  contactHref = "#contact",
}: ValueAddedServicesProps) {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-12 xs:px-6 sm:py-16 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1320px]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-8 xs:mb-10 text-center sm:mb-[clamp(2rem,6vw,4rem)]"
        >
          <div className="mb-3 xs:mb-4 flex items-center justify-center gap-3 sm:gap-4">
            <span className="text-xs sm:text-sm font-medium tracking-wider uppercase" style={{ color: LIGHT_GREEN }}>
              Value Added Services
            </span>
          </div>

          <h2 className="mx-auto max-w-[720px] text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.15] tracking-tight text-[#0A4D26] px-2">
            Air Freight Value Added Services
          </h2>

          <p className="mx-auto mt-3 xs:mt-4 sm:mt-5 max-w-[520px] text-[13px] sm:text-[13.5px] lg:text-[14px] font-light leading-relaxed text-[#2D6A4F] px-2">
            Beyond standard air cargo transport, Zajel provides a full range of supporting
            services to ensure your shipment is prepared, protected, and compliant from origin
            to destination.
          </p>
        </motion.div>

        {/* Grid — bordered cells, numbered, brand-green hover fill */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="grid grid-cols-2 overflow-hidden rounded-2xl border-l border-t border-[#0A4D26]/15 shadow-sm lg:grid-cols-4"
        >
          {VALUE_ADDED_SERVICES.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="group flex flex-col justify-between border-b border-r border-[#0A4D26]/15 bg-white p-5 xs:p-6 sm:p-8 transition-colors duration-300 hover:bg-[#0A4D26]"
            >
              <div>
                <span className="mb-4 xs:mb-6 block text-[11px] font-medium tracking-wide text-[#0A4D26]/40 transition-colors duration-300 group-hover:text-white/70">
                  {String(i + 1).padStart(2, "0")}.
                </span>

                <Icon
                  className="mb-4 xs:mb-6 h-7 w-7 xs:h-8 xs:w-8 text-[#36B936] transition-colors duration-300 group-hover:text-[#36B936]"
                  strokeWidth={1.25}
                />

                <h3 className="mb-2 text-sm xs:text-base sm:text-lg font-medium tracking-tight text-[#0A4D26] transition-colors duration-300 group-hover:text-white">
                  {title}
                </h3>
              </div>

              <p className="mt-2 text-xs xs:text-[13px] sm:text-sm font-light leading-relaxed text-[#2D6A4F] transition-colors duration-300 group-hover:text-white/80">
                {description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* CTA — centered, minimal button and contact link matching other sections */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mt-8 xs:mt-10 sm:mt-12 flex flex-col items-center gap-4 text-center"
        >
          <button
            type="button"
            onClick={onRequestQuote}
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#36B936] px-6 py-3 xs:px-7 xs:py-3.5 text-xs xs:text-sm font-medium tracking-tight text-white shadow-[0_10px_28px_rgba(54,185,54,0.25)] transition-all duration-200 hover:scale-[1.02] hover:bg-[#2fa32f] active:scale-100"
          >
            <span>Request a Quote</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </button>

          <a
            href={contactHref}
            className="text-xs xs:text-sm font-medium text-[#0A4D26]/60 underline decoration-[#0A4D26]/25 underline-offset-4 transition-colors duration-300 hover:text-[#0A4D26] hover:decoration-[#36B936]"
          >
            Contact Us for Special Cargo Requirements
          </a>
        </motion.div>
      </div>
    </section>
  );
}