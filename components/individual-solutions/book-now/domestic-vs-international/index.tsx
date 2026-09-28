'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.2, 0.8, 0.2, 1] as const;

interface ComparisonRow {
  feature: string;
  domestic: string;
  international: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: 'Coverage', domestic: 'All 7 UAE emirates', international: '195 countries worldwide' },
  {
    feature: 'Speed',
    domestic: 'Same-day and next-day delivery',
    international: '2 to 7 business days depending on destination',
  },
  {
    feature: 'Best for',
    domestic: 'Documents, parcels, and packages within the UAE',
    international: 'Documents, packages, gifts, and personal items abroad',
  },
  { feature: 'Tracking', domestic: 'Real-time via app and portal', international: 'Real-time via app and portal' },
  { feature: 'Pickup', domestic: 'From your door', international: 'From your door' },
  { feature: 'Customs', domestic: 'Not required', international: 'Handled by Zajel' },
];

interface DomesticVsInternationalProps {
  onDomesticClick?: () => void;
  onInternationalClick?: () => void;
  domesticHref?: string;
  internationalHref?: string;
}

export default function DomesticVsInternational({
  onDomesticClick,
  onInternationalClick,
  domesticHref = '/domestic-courier',
  internationalHref = '/international-courier',
}: DomesticVsInternationalProps) {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-16 font-sans sm:px-6 sm:py-20 md:px-12 lg:px-20 lg:py-24">
      <div className="mx-auto max-w-[1320px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto flex w-full max-w-[1320px] flex-col items-center pb-10 text-center sm:pb-14"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 bg-[#36B936]" />
            <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-[#36B936]">
              Service Comparison
            </span>
          </div>
          <h2 className="mx-auto max-w-[720px] text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.15] tracking-tight text-[#0A4D26]">
            Which Service Do You Need?
          </h2>
          <p className="mt-4 sm:mt-5 max-w-[560px] text-xs sm:text-sm md:text-base font-light leading-relaxed text-[#0A4D26]/75">
            Compare our domestic on-demand solutions with global international shipping to find the
            ideal match for your shipment requirements.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="overflow-hidden rounded-[1.75rem] border border-[#0A3D2D]/50 bg-gradient-to-b from-[#0A3D2D] to-[#05241A] text-white shadow-[0_25px_60px_-15px_rgba(5,36,26,0.45)]"
        >
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04]">
                <th className="w-[28%] px-4 py-3.5 sm:px-6 sm:py-5 md:px-8 md:py-6 text-[10px] sm:text-[11px] md:text-[12px] font-medium uppercase tracking-[0.14em] text-white/50">
                  Feature
                </th>
                <th className="w-[36%] border-x border-white/[0.06] px-4 py-3.5 sm:px-6 sm:py-5 md:px-8 md:py-6 text-[10px] sm:text-[11px] md:text-[12px] font-medium uppercase tracking-[0.14em] text-[#36B936]">
                  Domestic On-Demand
                </th>
                <th className="w-[36%] px-4 py-3.5 sm:px-6 sm:py-5 md:px-8 md:py-6 text-[10px] sm:text-[11px] md:text-[12px] font-medium uppercase tracking-[0.14em] text-white/90">
                  International Shipping
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="group transition-colors duration-300 hover:bg-white/[0.06]">
                  <td className="px-4 py-3.5 sm:px-6 sm:py-5 md:px-8 md:py-6 align-middle text-xs sm:text-sm font-medium text-white/95">
                    {row.feature}
                  </td>
                  <td className="border-x border-white/[0.06] px-4 py-3.5 sm:px-6 sm:py-5 md:px-8 md:py-6 align-middle text-xs sm:text-sm font-light text-white/90">
                    {row.domestic}
                  </td>
                  <td className="px-4 py-3.5 sm:px-6 sm:py-5 md:px-8 md:py-6 align-middle text-xs sm:text-sm font-light text-white/80">
                    {row.international}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* CTAs as aligned inline text links */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="mt-[clamp(2.5rem,5vw,3.5rem)] flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          <Link
            href={domesticHref}
            onClick={onDomesticClick ? (e) => { e.preventDefault(); onDomesticClick(); } : undefined}
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#0A4D26] transition-colors duration-200 hover:text-[#36B936]"
          >
            <span className="border-b border-[#0A4D26]/40 transition-colors duration-200 group-hover:border-[#36B936]">
              Ship Domestically
            </span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
          </Link>

          <Link
            href={internationalHref}
            onClick={onInternationalClick ? (e) => { e.preventDefault(); onInternationalClick(); } : undefined}
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#0A4D26] transition-colors duration-200 hover:text-[#36B936]"
          >
            <span className="border-b border-[#0A4D26]/40 transition-colors duration-200 group-hover:border-[#36B936]">
              Ship Internationally
            </span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}