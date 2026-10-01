'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileCheck2, Warehouse, PackageOpen, ShieldPlus, ArrowRight, type LucideIcon } from 'lucide-react';
import { valueAddedServices } from '../data';

const EASE = [0.2, 0.8, 0.2, 1] as const;

const iconMap: Record<string, LucideIcon> = {
  customs: FileCheck2,
  warehousing: Warehouse,
  packing: PackageOpen,
  insurance: ShieldPlus,
};

// Primary button — pill, brand green, dark text, arrow.
const primaryButton =
  'inline-flex items-center justify-center gap-2 rounded-full bg-[#36B936] ' +
  'px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.55rem,1vw,0.85rem)] ' +
  'text-xs sm:text-sm font-medium text-[#0B140F] shadow-md ' +
  'transition-transform hover:scale-[1.03] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A4D26]';

interface ValueAddedServicesProps {
  quoteHref?: string;
  contactHref?: string;
}

export default function ValueAddedServices({ quoteHref = '/quote', contactHref = '#contact' }: ValueAddedServicesProps) {
  return (
    <section className="w-full bg-white px-4 py-12 font-['Manrope',sans-serif] sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
      <div className="mx-auto max-w-[1320px]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto mb-10 max-w-[640px] text-center sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight text-[#0A4D26]">
            More Ways We Support Your Business
          </h2>
        </motion.div>

        {/* 2 x 2 on phones and tablets, 4 across on large screens.
            gap-px over a tinted background draws even divider lines with no doubled outer borders. */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#0A4D26]/15 bg-[#0A4D26]/15 shadow-sm lg:grid-cols-4"
        >
          {valueAddedServices.map(({ id, title, description, href }, i) => {
            const Icon = iconMap[id];
            return (
              <div
                key={id}
                className="group flex min-w-0 flex-col justify-between bg-white p-4 transition-colors duration-300 hover:bg-[#36B936] active:bg-[#36B936] min-[400px]:p-5 sm:p-6 md:p-8"
              >
                <div>
                  <span className="mb-3 block text-[10px] font-medium tracking-wide text-[#0A4D26]/40 transition-colors duration-300 group-hover:text-white/70 sm:mb-6 sm:text-[11px] md:mb-8">
                    {String(i + 1).padStart(2, '0')}.
                  </span>

                  <Icon
                    className="mb-3 h-6 w-6 text-[#36B936] transition-colors duration-300 group-hover:text-white group-active:text-white sm:mb-6 sm:h-8 sm:w-8 md:mb-8 md:h-10 md:w-10"
                    strokeWidth={1.25}
                  />

                  <h3 className="mb-1.5 text-[0.95rem] font-medium leading-snug tracking-tight text-[#0A4D26] transition-colors duration-300 group-hover:text-white group-active:text-white sm:mb-2 sm:text-base md:text-xl">
                    {title}
                  </h3>

                  <p className="text-[11px] font-normal leading-relaxed text-[#2d6a4f] transition-colors duration-300 group-hover:text-white/85 group-active:text-white/85 sm:text-xs md:text-sm">
                    {description}
                  </p>
                </div>

                {href && (
                  <div className="mt-4 sm:mt-6">
                    <Link
                      href={href}
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#0A4D26] transition-colors duration-300 group-hover:text-white group-active:text-white sm:text-xs md:text-sm"
                    >
                      Learn More
                      <ArrowRight
                        className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5"
                        strokeWidth={2}
                      />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mt-10 flex flex-col items-center gap-4 text-center sm:mt-12 sm:gap-5 md:mt-16"
        >
          <Link href={quoteHref} className={primaryButton}>
            <span>Request a Quote</span>
            <span aria-hidden="true">→</span>
          </Link>

          <Link
            href={contactHref}
            className="px-2 text-xs font-medium text-[#0A4D26]/60 underline decoration-[#0A4D26]/20 underline-offset-4 transition-colors duration-300 hover:text-[#0A4D26] hover:decoration-[#36B936] sm:text-sm"
          >
            Contact Us for Special Cargo Requirements
          </Link>
        </motion.div>
      </div>
    </section>
  );
}