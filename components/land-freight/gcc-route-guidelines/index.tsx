'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.2, 0.8, 0.2, 1] as const;

interface RouteTableRow {
  route: string;
  estimatedTransitTime: string;
  distance: string;
}

const ROUTE_ROWS: RouteTableRow[] = [
  { route: 'Dubai to Abu Dhabi', estimatedTransitTime: 'Same day', distance: '140 km' },
  { route: 'Dubai to Muscat, Oman', estimatedTransitTime: '12 to 14 hours', distance: '450 km' },
  { route: 'Dubai to Riyadh, Saudi Arabia', estimatedTransitTime: '24 to 28 hours', distance: '1,100 km' },
  { route: 'Dubai to Jeddah, Saudi Arabia', estimatedTransitTime: '30 to 36 hours', distance: '1,900 km' },
  { route: 'Dubai to Dammam, Saudi Arabia', estimatedTransitTime: '14 to 18 hours', distance: '800 km' },
  { route: 'Dubai to Kuwait City', estimatedTransitTime: '30 to 36 hours', distance: '1,300 km' },
  { route: 'Dubai to Bahrain (via Saudi)', estimatedTransitTime: '18 to 22 hours', distance: '900 km' },
  { route: 'Dubai to Doha, Qatar', estimatedTransitTime: '10 to 14 hours', distance: '700 km' },
  { route: 'Dubai to Amman, Jordan', estimatedTransitTime: '3 to 4 days', distance: '2,500 km' },
  { route: 'Dubai to Istanbul, Turkey', estimatedTransitTime: '6 to 8 days', distance: '4,200 km' },
  { route: 'Dubai to Europe (via Turkey)', estimatedTransitTime: '8 to 12 days', distance: '5,500+ km' },
];

interface GccRouteGuidelinesProps {
  onGetQuote?: () => void;
  contactHref?: string;
}

const GccRouteGuidelines = ({ onGetQuote, contactHref = '/contact' }: GccRouteGuidelinesProps) => {
  return (
    <section
      className="w-full relative overflow-hidden py-[clamp(4.5rem,10vw,9rem)] font-sans"
      style={{
        background: 'radial-gradient(120% 140% at 78% 85%, #1F7A45 0%, #0F5C2E 32%, #0A4D26 58%, #073A1D 100%)',
      }}
    >
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

      <div className="max-w-[1240px] mx-auto px-[clamp(1.25rem,5vw,2.75rem)] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-[clamp(3rem,6vw,5rem)] max-w-[720px] mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-[#36B936] font-medium text-xs sm:text-sm tracking-wider uppercase">
              Land Freight Routes and Transit Times
            </span>
          </div>
          <h2 className="text-white font-medium leading-[1.12] text-2xl sm:text-3xl md:text-4xl tracking-tight">
            GCC &amp; Middle East Route Details
          </h2>
          <p className="mt-5 text-white/70 font-light text-[13px] sm:text-[13.5px] lg:text-[14px] leading-[1.65] max-w-[56ch] mx-auto">
            Zajel operates daily land freight departures from the UAE to all GCC countries and extended overland routes reaching Turkey, Jordan, and Europe. Below are estimated transit times for our most active road freight corridors.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          className="overflow-x-auto rounded-[2rem] border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl shadow-[0_30px_70px_-15px_rgba(4,32,15,0.6)] text-left"
        >
          <table className="w-full min-w-[680px] border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04]">
                <th className="p-[clamp(1.1rem,2.4vw,1.65rem)] text-xs sm:text-sm font-medium text-white/50 tracking-wider uppercase w-[40%]">
                  Route
                </th>
                <th className="p-[clamp(1.1rem,2.4vw,1.65rem)] text-xs sm:text-sm font-medium text-[#36B936] tracking-wider uppercase w-[35%]">
                  Estimated Transit Time
                </th>
                <th className="p-[clamp(1.1rem,2.4vw,1.65rem)] text-xs sm:text-sm font-medium text-white/90 tracking-wider uppercase">
                  Distance (approx)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {ROUTE_ROWS.map((row) => (
                <tr key={row.route} className="group transition-colors duration-300 hover:bg-white/[0.06]">
                  <td className="p-[clamp(1.1rem,2.4vw,1.65rem)] text-sm font-medium text-white/95 align-top">
                    {row.route}
                  </td>
                  <td className="p-[clamp(1.1rem,2.4vw,1.65rem)] text-sm font-light leading-relaxed text-white/70 align-top">
                    {row.estimatedTransitTime}
                  </td>
                  <td className="p-[clamp(1.1rem,2.4vw,1.65rem)] text-sm font-light leading-relaxed text-white/70 align-top">
                    {row.distance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE, delay: 0.25 }}
          className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-[clamp(1.25rem,2.5vw,2rem)] text-white/70 font-light text-sm leading-[1.7] space-y-3 text-left"
        >
          <p>
            Transit times are estimates for full truckload (FTL) shipments and include standard border crossing and customs clearance time. Actual delivery depends on border conditions, cargo type, and any required inspections.
          </p>
          <p className="text-white/90">
            All land freight shipments include GPS tracking and real-time status updates through the Zajel portal.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE, delay: 0.35 }}
          className="mt-[clamp(3.5rem,7vw,5.5rem)] flex flex-col items-center text-center gap-6"
        >
          <button
            type="button"
            onClick={onGetQuote}
            className="group inline-flex items-center gap-3 bg-white text-[#1b4332] font-medium rounded-full pl-7 pr-2.5 py-3.5 text-sm tracking-tight shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-200 hover:bg-white/95"
          >
            <span>Get a Land Freight Quote</span>
            <span className="w-9 h-9 rounded-full bg-[#1b4332] text-[#36B936] flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-0.5">
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </span>
          </button>

          <a
            href={contactHref}
            className="text-xs sm:text-sm font-medium text-white/65 underline underline-offset-4 decoration-white/25 hover:text-white hover:decoration-[#36B936] transition-colors duration-300"
          >
            Contact Us for Custom or Specialized Cargo Requirements
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GccRouteGuidelines;
