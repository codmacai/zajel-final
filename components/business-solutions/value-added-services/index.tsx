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

interface ValueAddedServicesProps {
  quoteHref?: string;
  contactHref?: string;
}

export default function ValueAddedServices({ quoteHref = '/quote', contactHref = '#contact' }: ValueAddedServicesProps) {
  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-20 lg:py-24 font-['Manrope',sans-serif]">
      <div className="mx-auto max-w-[1320px]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto mb-10 sm:mb-12 md:mb-16 max-w-[640px] text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight text-[#0A4D26]">
            More Ways We Support Your Business
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[#0A4D26]/15 shadow-sm lg:grid-cols-4"
        >
          {valueAddedServices.map(({ id, title, description, href }, i) => {
            const Icon = iconMap[id];
            return (
              <div
                key={id}
                className="group flex flex-col justify-between border-b border-r border-[#0A4D26]/15 bg-white p-5 sm:p-6 md:p-8 transition-colors duration-300 hover:bg-[#36B936]"
              >
                <div>
                  <span className="mb-4 sm:mb-6 md:mb-8 block text-[10px] sm:text-[11px] font-medium tracking-wide text-[#0A4D26]/40 transition-colors duration-300 group-hover:text-white/70">
                    {String(i + 1).padStart(2, '0')}.
                  </span>

                  <Icon
                    className="mb-4 sm:mb-6 md:mb-8 h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-[#36B936] transition-colors duration-300 group-hover:text-white"
                    strokeWidth={1.25}
                  />

                  <h3 className="mb-1.5 sm:mb-2 text-sm sm:text-base md:text-xl font-medium tracking-tight text-[#0A4D26] transition-colors duration-300 group-hover:text-white">
                    {title}
                  </h3>

                  <p className="text-[11px] sm:text-xs md:text-sm font-normal leading-relaxed text-[#2d6a4f] transition-colors duration-300 group-hover:text-white/85">
                    {description}
                  </p>
                </div>

                {href && (
                  <div className="mt-4 sm:mt-6">
                    <Link
                      href={href}
                      className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs md:text-sm font-medium text-[#0A4D26] transition-colors duration-300 group-hover:text-white"
                    >
                      Learn More
                      <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />
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
          className="mt-10 sm:mt-12 md:mt-16 flex flex-col items-center gap-5 text-center"
        >
          <Link
            href={quoteHref}
            className="group inline-flex items-center gap-3 rounded-full bg-[#36B936] py-3 pl-7 pr-3 text-sm font-medium text-white shadow-[0_1px_2px_rgba(10,77,38,0.15)] transition-all duration-300 hover:shadow-[0_10px_24px_rgba(10,77,38,0.28)] hover:scale-[1.02]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-0.5">Request a Quote</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[135deg]">
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </span>
          </Link>

          <Link
            href={contactHref}
            className="text-xs sm:text-sm font-medium text-[#0A4D26]/60 underline decoration-[#0A4D26]/20 underline-offset-4 transition-colors duration-300 hover:text-[#0A4D26] hover:decoration-[#36B936]"
          >
            Contact Us for Special Cargo Requirements
          </Link>
        </motion.div>
      </div>
    </section>
  );
}