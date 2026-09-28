'use client';

import Link from 'next/link';
import { MapPin, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.2, 0.8, 0.2, 1] as const;

interface BorderCrossingRow {
  crossing: string;
  countries: string;
}

const heading = 'Border Crossings & Customs Clearance';

const intro =
  'Cross-border land freight requires customs clearance at each border point along the route. We manage all documentation and coordination so your cargo moves without unnecessary delays.';

const BORDER_CROSSING_ROWS: BorderCrossingRow[] = [
  { crossing: 'Al Ghuwaifat', countries: 'UAE to Saudi' },
  { crossing: 'Hatta / Al Ain', countries: 'UAE to Oman' },
  { crossing: 'Al Batha', countries: 'Saudi to UAE' },
  { crossing: 'Sila (Abu Samra)', countries: 'Saudi to Qatar' },
  { crossing: 'King Fahad Causeway', countries: 'Saudi to Bahrain' },
  { crossing: 'Al Haditha / Karameh', countries: 'Saudi to Jordan' },
  { crossing: 'Habur / Cilvegozu', countries: 'Turkey to Europe' },
];

export interface CtaItem {
  label: string;
  url: string;
}

interface BorderCrossingsProps {
  onContactRoutePlanning?: () => void;
  contactHref?: string;
  primaryCta?: CtaItem;
  secondaryCta?: CtaItem;
  isRtl?: boolean;
}

const BorderCrossings = ({
  onContactRoutePlanning,
  contactHref = '/contact',
  primaryCta,
  secondaryCta,
  isRtl = false,
}: BorderCrossingsProps) => {
  const activePrimaryCta: CtaItem = primaryCta || {
    label: 'Contact Us for Route Planning',
    url: contactHref,
  };

  return (
    <section className="w-full py-12 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-white overflow-hidden font-sans">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto flex w-full max-w-[1320px] flex-col items-center text-center pb-8 sm:pb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
            <span className="w-8 h-[2px]" style={{ backgroundColor: '#36B936' }} />
            <span className="text-[#36B936] font-medium text-xs sm:text-sm tracking-wider uppercase">
              Cross-Border Logistics
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#0A4D26] leading-[1.15] max-w-[720px] mx-auto">
            {heading}
          </h2>
          <p className="mt-3 sm:mt-5 text-[#0A4D26]/75 font-light text-xs sm:text-base leading-relaxed max-w-[560px]">
            {intro}
          </p>
        </motion.div>

        {/* Border Crossings Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="w-full overflow-hidden rounded-xl sm:rounded-[1.75rem] border border-[#0A3D2D]/50 bg-gradient-to-b from-[#0A3D2D] to-[#05241A] text-white shadow-[0_25px_60px_-15px_rgba(5,36,26,0.45)]"
        >
          <table className="w-full table-fixed border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04]">
                <th className="w-[52%] xs:w-[55%] p-3 sm:p-5 lg:p-6 text-[0.7rem] xs:text-xs sm:text-sm font-medium text-white/50 tracking-wider uppercase">
                  Border Crossing
                </th>
                <th className="w-[48%] xs:w-[45%] p-3 sm:p-5 lg:p-6 text-[0.7rem] xs:text-xs sm:text-sm font-medium text-white/90 tracking-wider uppercase border-l border-white/[0.06]">
                  Countries
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {BORDER_CROSSING_ROWS.map((row) => (
                <tr key={row.crossing} className="group transition-colors duration-300 hover:bg-white/[0.06]">
                  <td className="p-3 sm:p-5 lg:p-6 align-top">
                    <div className="flex items-start xs:items-center gap-1.5 sm:gap-2.5">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 mt-0.5 xs:mt-0 text-[#36b936]" />
                      <span className="text-xs sm:text-sm font-medium text-white/95 leading-snug break-words">
                        {row.crossing}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 sm:p-5 lg:p-6 text-xs sm:text-sm font-light text-white/80 align-top border-l border-white/[0.06] leading-snug break-words">
                    {row.countries}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Logistics Information Cards */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="mt-8 sm:mt-12 overflow-hidden rounded-2xl sm:rounded-[1.75rem] ring-1 ring-[#0A4D26]/10 shadow-[0_1px_2px_rgba(10,77,38,0.04)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-[#0A4D26]/10 bg-white">
            <div className="p-5 sm:p-8 lg:p-10">
              <h3 className="mb-2 sm:mb-2.5 text-base sm:text-lg font-medium tracking-tight text-[#0A4D26]">
                What We Handle at Every Border
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-[#0A4D26]/60 font-light mb-4">
                Pre-filed customs manifests, direct coordination with certified brokers, and real-time tracking updates as your shipment clears each border.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#0A4D26]/70 font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#36B936] shrink-0" />
                  <span>Manifest submission prior to arrival</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#36B936] shrink-0" />
                  <span>Active resolution of inspection holds</span>
                </li>
              </ul>
            </div>

            <div className="p-5 sm:p-8 lg:p-10 border-t border-[#0A4D26]/10 md:border-t-0">
              <h3 className="mb-2 sm:mb-2.5 text-base sm:text-lg font-medium tracking-tight text-[#0A4D26]">
                Clearance Guidelines &amp; Estimates
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-[#0A4D26]/60 font-light">
                Clearance times are estimates and vary depending on cargo type, time of day, and border traffic volume. Special cargo types like hazardous or oversized freight may require additional inspection time.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 sm:gap-4 border-t border-[#0A4D26]/10 bg-[#0D2A22] p-5 sm:p-8 lg:p-9">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#36B936]/15">
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-[#36B936]" strokeWidth={1.75} />
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-white/70 font-light">
              <span className="font-medium text-white">Seamless border coordination</span> ensures your cross-border land shipments experience minimal dwell times and smooth regulatory compliance across all transit corridors.
            </p>
          </div>
        </motion.div>

        {/* Updated CTA Group */}
        {(activePrimaryCta || secondaryCta) && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
            className="mt-8 sm:mt-[clamp(1.75rem,4vw,2.75rem)] flex flex-wrap items-center justify-center gap-[clamp(0.5rem,1.2vw,0.85rem)]"
          >
            {activePrimaryCta && (
              <Link
                href={activePrimaryCta.url}
                onClick={(e) => {
                  if (onContactRoutePlanning) {
                    e.preventDefault();
                    onContactRoutePlanning();
                  }
                }}
                className="inline-flex items-center gap-2 rounded-full bg-[#36B936] px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.55rem,1vw,0.85rem)] text-[clamp(0.8rem,1.4vw,0.9rem)] font-medium text-[#0B140F] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A4D26]"
              >
                {activePrimaryCta.label}
                <span aria-hidden="true">{isRtl ? '←' : '→'}</span>
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.url}
                className="inline-flex items-center rounded-full border border-[#0A4D26]/25 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.55rem,1vw,0.85rem)] text-[clamp(0.8rem,1.4vw,0.9rem)] font-medium text-[#0A4D26] transition-colors hover:border-[#0A4D26]/60 hover:bg-[#0A4D26]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A4D26]"
              >
                {secondaryCta.label}
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BorderCrossings;