'use client';

import { ArrowRight, Anchor } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.2, 0.8, 0.2, 1] as const;

interface SeaRouteRow {
  route: string;
  fclTime: string;
  lclTime: string;
}

const SEA_ROUTE_ROWS: SeaRouteRow[] = [
  { route: 'UAE to India (Nhava Sheva/Mumbai)', fclTime: '4 to 6 days', lclTime: '7 to 10 days' },
  { route: 'UAE to China (Shanghai/Ningbo)', fclTime: '12 to 16 days', lclTime: '16 to 22 days' },
  { route: 'UAE to Pakistan (Karachi)', fclTime: '3 to 5 days', lclTime: '6 to 9 days' },
  { route: 'UAE to Turkey (Mersin/Istanbul)', fclTime: '10 to 14 days', lclTime: '14 to 20 days' },
  { route: 'UAE to United Kingdom (Felixstowe)', fclTime: '18 to 22 days', lclTime: '22 to 28 days' },
  { route: 'UAE to Germany (Hamburg)', fclTime: '18 to 22 days', lclTime: '22 to 28 days' },
  { route: 'UAE to Kenya (Mombasa)', fclTime: '8 to 12 days', lclTime: '12 to 16 days' },
  { route: 'UAE to Tanzania (Dar es Salaam)', fclTime: '10 to 14 days', lclTime: '14 to 18 days' },
  { route: 'UAE to South Africa (Durban)', fclTime: '16 to 20 days', lclTime: '20 to 26 days' },
  { route: 'UAE to United States (New York/LA)', fclTime: '22 to 28 days', lclTime: '28 to 35 days' },
];

interface SeaFreightRoutesProps {
  onGetQuote?: () => void;
  contactHref?: string;
}

const SeaFreightRoutes = ({ onGetQuote, contactHref = '/contact' }: SeaFreightRoutesProps) => {
  return (
    <section
      className="w-full relative overflow-hidden py-[clamp(3.5rem,10vw,9rem)] font-sans"
      style={{
        background: 'radial-gradient(120% 140% at 78% 85%, #1F7A45 0%, #0F5C2E 32%, #0A4D26 58%, #073A1D 100%)',
      }}
    >
      {/* Ambient glow background details matching other sections */}
      <div
        className="absolute right-[-8%] bottom-[-10%] w-[55%] h-[85%] pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(123,224,123,0.22) 0%, rgba(123,224,123,0) 70%)' }}
      />
      <div
        className="absolute left-[-5%] top-[10%] w-[45%] h-[65%] pointer-events-none opacity-40 blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(54,185,54,0.3) 0%, rgba(10,77,38,0) 70%)' }}
      />
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-[clamp(1.25rem,5vw,2.75rem)] relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE }}
          className="mx-auto flex w-full max-w-[1320px] flex-col items-center text-center pb-8 sm:pb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-[#7BE07B] font-medium text-xs sm:text-sm tracking-wider uppercase">
              Sailing Routes and Transit Times
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white leading-[1.15] max-w-[720px] mx-auto">
            Sea Freight Routes from the UAE
          </h2>
          <p className="mt-4 sm:mt-5 text-white/75 font-light text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed max-w-[560px]">
            Zajel operates sea freight services from Jebel Ali Port and Khalifa Port to major ports across
            Asia, Europe, Africa, and the Americas. Below are estimated transit times for our most active
            trade lanes.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          className="overflow-x-auto rounded-2xl sm:rounded-[2rem] border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl shadow-[0_30px_70px_-15px_rgba(4,32,15,0.6)]"
        >
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04]">
                <th className="p-[clamp(1.1rem,2.4vw,1.65rem)] text-[11px] sm:text-[12px] font-medium text-white/50 tracking-[0.14em] uppercase w-[40%]">
                  Route
                </th>
                <th className="p-[clamp(1.1rem,2.4vw,1.65rem)] text-[11px] sm:text-[12px] font-medium text-[#7BE07B] tracking-[0.14em] uppercase w-[30%]">
                  FCL Transit Time
                </th>
                <th className="p-[clamp(1.1rem,2.4vw,1.65rem)] text-[11px] sm:text-[12px] font-medium text-white/90 tracking-[0.14em] uppercase">
                  LCL Transit Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {SEA_ROUTE_ROWS.map((row) => (
                <tr key={row.route} className="group transition-colors duration-300 hover:bg-white/[0.06]">
                  <td className="p-[clamp(1.1rem,2.4vw,1.65rem)] text-[clamp(0.85rem,1.5vw,0.95rem)] font-light text-white/95 align-top">
                    {row.route}
                  </td>
                  <td className="p-[clamp(1.1rem,2.4vw,1.65rem)] text-[clamp(0.85rem,1.5vw,0.95rem)] font-light leading-relaxed text-white/70 align-top">
                    {row.fclTime}
                  </td>
                  <td className="p-[clamp(1.1rem,2.4vw,1.65rem)] text-[clamp(0.85rem,1.5vw,0.95rem)] font-light leading-relaxed text-white/70 align-top">
                    {row.lclTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Informational notes */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-[clamp(1.1rem,2.5vw,2rem)] text-white/70 font-light text-[13px] sm:text-[14px] leading-[1.7]">
            <p>
              Transit times are port to port estimates and do not include customs clearance at origin or
              destination. Actual delivery times depend on sailing schedules, port congestion, and customs
              processing.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-[clamp(1.1rem,2.5vw,2rem)] text-white/70 font-light text-[13px] sm:text-[14px] leading-[1.7]">
            <p>
              <strong className="text-white font-medium">FCL (Full Container Load)</strong> shipments move
              on a dedicated container. <strong className="text-white font-medium">LCL (Less than
              Container Load)</strong> shipments are consolidated and may require additional handling time
              at origin and destination.
            </p>
          </div>
        </motion.div>

        {/* CTA — dual buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          className="mt-[clamp(2.5rem,7vw,5.5rem)] flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-center"
        >
          <button
            type="button"
            onClick={onGetQuote}
            className="group inline-flex items-center gap-3 bg-white text-[#0A4D26] font-medium rounded-full pl-6 pr-2.5 sm:pl-7 py-3 sm:py-3.5 text-[clamp(0.85rem,1.6vw,0.95rem)] tracking-tight shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-200 hover:bg-white/95 hover:shadow-[0_12px_36px_rgba(54,185,54,0.25)]"
          >
            <span>Get a Sea Freight Quote</span>
            <span className="w-9 h-9 rounded-full bg-[#0A4D26] text-white flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-0.5">
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </span>
          </button>

          <a
            href={contactHref}
            className="group inline-flex items-center gap-3 bg-white/10 border border-white/20 text-white font-medium rounded-full pl-6 pr-2.5 sm:pl-7 py-3 sm:py-3.5 text-[clamp(0.85rem,1.6vw,0.95rem)] tracking-tight backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:border-white/40"
          >
            <span>Contact Our Shipping Team</span>
            <span className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-0.5">
              <Anchor className="w-4 h-4" strokeWidth={1.75} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SeaFreightRoutes;
