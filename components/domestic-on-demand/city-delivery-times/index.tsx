'use client';

import type { FC } from 'react';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;
const smoothTransition = { duration: 0.7, ease: EASE };

interface CityDeliveryRow {
  route: string;
  sameDay: string;
  nextDay: string;
}

const CITY_DELIVERY_ROWS: CityDeliveryRow[] = [
  { route: 'Within Dubai', sameDay: '1 to 3 hours', nextDay: 'By 12:00 PM' },
  { route: 'Within Abu Dhabi', sameDay: '1 to 3 hours', nextDay: 'By 12:00 PM' },
  { route: 'Dubai to Abu Dhabi', sameDay: '3 to 4 hours', nextDay: 'By 12:00 PM' },
  { route: 'Dubai to Sharjah', sameDay: '1 to 2 hours', nextDay: 'By 12:00 PM' },
  { route: 'Dubai to Ajman', sameDay: '1 to 3 hours', nextDay: 'By 12:00 PM' },
  { route: 'Dubai to Ras Al Khaimah', sameDay: '3 to 4 hours', nextDay: 'By 12:00 PM' },
  { route: 'Dubai to Fujairah', sameDay: '3 to 5 hours', nextDay: 'By 12:00 PM' },
  { route: 'Dubai to Umm Al Quwain', sameDay: '2 to 3 hours', nextDay: 'By 12:00 PM' },
  { route: 'Abu Dhabi to Sharjah', sameDay: '3 to 4 hours', nextDay: 'By 12:00 PM' },
  { route: 'Abu Dhabi to Al Ain', sameDay: '2 to 3 hours', nextDay: 'By 12:00 PM' },
];

interface CityDeliveryTimesProps {
  onBookSameDay?: () => void;
  onCalculateRate?: () => void;
  quotationHref?: string;
}

const CityDeliveryTimes: FC<CityDeliveryTimesProps> = ({
  onBookSameDay,
  onCalculateRate,
  quotationHref = '/quotation',
}) => {
  return (
    <section className="w-full relative overflow-hidden py-16 sm:py-24 lg:py-32 bg-white text-[#0D2A22] font-sans">
      {/* Background Glows */}
      <div className="absolute right-[-5%] top-[-5%] w-[45%] h-[65%] pointer-events-none opacity-40 blur-[120px] bg-[radial-gradient(circle,rgba(54,185,54,0.12)_0%,rgba(255,255,255,0)_70%)]" />
      <div className="absolute left-[-5%] bottom-[-5%] w-[45%] h-[65%] pointer-events-none opacity-30 blur-[120px] bg-[radial-gradient(circle,rgba(13,42,34,0.08)_0%,rgba(255,255,255,0)_70%)]" />

      {/* Top Sheen Border */}
      <div className="absolute inset-x-0 top-0 h-px pointer-events-none z-10 bg-[linear-gradient(90deg,transparent,rgba(13,42,34,0.1),transparent)]" />

      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="max-w-[680px] mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
            className="flex items-center justify-center gap-3 sm:gap-4 mb-4"
          >
            <span className="w-6 sm:w-8 h-[2px] bg-[#36B936]" />
            <span className="text-[#36B936] font-medium text-xs sm:text-sm tracking-wider uppercase">
              UAE Domestic Transit
            </span>
            <span className="w-6 sm:w-8 h-[2px] bg-[#36B936]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl text-[#1b4332] font-medium tracking-tight leading-[1.15] mb-4"
          >
            Estimated Delivery Times Across the UAE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.1 }}
            className="text-[#2d6a4f] font-light text-[13px] sm:text-[14px] leading-relaxed max-w-[520px] mx-auto px-2"
          >
            Reliable express shipping connecting all emirates. Explore our estimated transit windows for same-day and next-day deliveries below.
          </motion.p>
        </div>

        {/* Main Data Container */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ ...smoothTransition, delay: 0.15 }}
          className="rounded-2xl sm:rounded-[2rem] border border-[#0D2A22]/20 bg-gradient-to-b from-[#0D2A22] to-[#081C16] text-white shadow-[0_25px_60px_-15px_rgba(13,42,34,0.3)] overflow-hidden"
        >
          {/* Fully Visible Responsive Table (No scroll needed on mobile) */}
          <div className="w-full">
            <table className="w-full border-collapse text-left table-fixed">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04]">
                  <th className="py-4 px-2.5 sm:p-6 lg:p-8 text-[10px] sm:text-[12px] font-medium text-white/50 tracking-[0.08em] sm:tracking-[0.14em] uppercase w-[38%] sm:w-[40%]">
                    Route
                  </th>
                  <th className="py-4 px-2 sm:p-6 lg:p-8 text-[10px] sm:text-[12px] font-medium tracking-[0.08em] sm:tracking-[0.14em] uppercase w-[31%] sm:w-[30%] border-x border-white/[0.06] text-[#36b936]">
                    Same-Day
                  </th>
                  <th className="py-4 px-2 sm:p-6 lg:p-8 text-[10px] sm:text-[12px] font-medium text-white/90 tracking-[0.08em] sm:tracking-[0.14em] uppercase w-[31%] sm:w-[30%]">
                    Next-Day
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {CITY_DELIVERY_ROWS.map((row) => (
                  <tr key={row.route} className="group transition-colors duration-300 hover:bg-white/[0.06]">
                    <td className="py-3.5 px-2.5 sm:p-6 lg:p-8 align-middle sm:align-top">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#36b936]" />
                        <span className="text-[11.5px] sm:text-[0.95rem] lg:text-[1.05rem] font-light text-white/95 truncate">
                          {row.route}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-2 sm:p-6 lg:p-8 text-[11.5px] sm:text-[0.9rem] lg:text-[0.95rem] font-medium align-middle sm:align-top border-x border-white/[0.06] text-[#36b936]">
                      {row.sameDay}
                    </td>
                    <td className="py-3.5 px-2 sm:p-6 lg:p-8 text-[11.5px] sm:text-[0.9rem] lg:text-[0.95rem] font-light text-white/70 align-middle sm:align-top">
                      {row.nextDay}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Detail Panel & Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ...smoothTransition, delay: 0.2 }}
          className="mt-10 overflow-hidden rounded-2xl ring-1 ring-[#0A4D26]/10 shadow-[0_1px_2px_rgba(10,77,38,0.04)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-[#0A4D26]/10 bg-white">
            <div className="p-6 sm:p-8 lg:p-10">
              <h3 className="mb-2.5 text-base sm:text-lg font-medium tracking-tight text-[#0A4D26]">
                Booking Guidelines & Cut-off
              </h3>
              <p className="text-[13.5px] leading-relaxed text-[#0A4D26]/70 font-light">
                Times are estimated from pickup confirmation. Same-day delivery is available for bookings placed before{' '}
                <span className="font-medium text-[#0A4D26] underline decoration-[#36b936] decoration-1 underline-offset-2">
                  2:00 PM
                </span>
                . Actual delivery times may vary based on traffic conditions and pickup location.
              </p>
            </div>

            <div className="p-6 sm:p-8 lg:p-10 border-t border-[#0A4D26]/10 md:border-t-0">
              <h3 className="mb-2.5 text-base sm:text-lg font-medium tracking-tight text-[#0A4D26] flex items-center gap-2">
                <span>Real-Time Visibility</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse bg-[#36b936]" />
              </h3>
              <p className="text-[13.5px] leading-relaxed text-[#0A4D26]/70 font-light">
                All deliveries include live GPS tracking through the Zajel app and online merchant portal for total operational transparency.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-t border-[#0A4D26]/10 bg-[#0D2A22] p-6 sm:p-8">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#36B936]/15 text-[#36b936]">
              <Clock className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <p className="text-[13.5px] leading-relaxed text-white/80 font-light">
              <span className="font-medium text-white">Guaranteed express dispatch windows</span> ensure prompt routing across all Emirates. Partner with Zajel to streamline your domestic fulfillment workflows.
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons (Forced Single Line on All Devices) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ...smoothTransition, delay: 0.25 }}
          className="mt-12 sm:mt-16 flex flex-row items-center justify-center gap-2.5 sm:gap-4 text-center overflow-x-auto py-2"
        >
          <button
            type="button"
            onClick={onBookSameDay}
            className="group whitespace-nowrap inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#36B936] py-2.5 px-4 sm:py-3 sm:px-7 text-[11.5px] sm:text-sm font-medium text-white shadow-lg shadow-[#36B936]/20 transition-all duration-300 hover:shadow-xl hover:brightness-105 shrink-0"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-0.5">Book Same-Day Delivery</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
          </button>

          <a
            href={quotationHref}
            onClick={(e) => {
              if (onCalculateRate) {
                e.preventDefault();
                onCalculateRate();
              }
            }}
            className="group whitespace-nowrap inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#0A4D26]/20 bg-white py-2.5 px-4 sm:py-3 sm:px-7 text-[11.5px] sm:text-sm font-medium text-[#0A4D26] shadow-sm transition-all duration-300 hover:border-[#36B936] hover:bg-[#36B936]/5 shrink-0"
          >
            <span>Calculate Your Rate</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CityDeliveryTimes;