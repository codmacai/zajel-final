'use client';

import type { FC } from 'react';
import { ArrowRight, PhoneCall, Package, Bike, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;
const smoothTransition = { duration: 0.7, ease: EASE };

interface ShippingTierRow {
  vehicleType: string;
  maxWeight: string;
  maxDimensions: string;
  bestFor: string;
  icon: React.ReactNode;
}

const SHIPPING_TIERS: ShippingTierRow[] = [
  {
    vehicleType: 'Motorbike',
    maxWeight: 'Up to 5 kg',
    maxDimensions: '40 x 30 x 20 cm',
    bestFor: 'Documents, small parcels, envelopes',
    icon: <Bike className="w-4 h-4 sm:w-5 sm:h-5 text-[#7BE07B]" />,
  },
  {
    vehicleType: 'Van',
    maxWeight: 'Up to 70 kg',
    maxDimensions: '120 x 80 x 80 cm',
    bestFor: 'Large boxes, multiple packages',
    icon: <Package className="w-4 h-4 sm:w-5 sm:h-5 text-[#7BE07B]" />,
  },
];

interface WhatYouCanShipProps {
  onBookShipment?: () => void;
  onContactTeam?: () => void;
  contactHref?: string;
}

const WhatYouCanShip: FC<WhatYouCanShipProps> = ({
  onBookShipment,
  onContactTeam,
  contactHref = '#contact',
}) => {
  return (
    <section
      className="w-full relative overflow-hidden py-16 sm:py-24 lg:py-32 font-sans"
      style={{
        background: 'radial-gradient(120% 140% at 22% 15%, #0F5C2E 0%, #0D2A22 45%, #081C16 100%)',
      }}
    >
      {/* Ambient background glows */}
      <div className="absolute left-[-5%] top-[-5%] w-[50%] h-[75%] pointer-events-none bg-[radial-gradient(closest-side,rgba(54,185,54,0.18)_0%,rgba(54,185,54,0)_70%)]" />
      <div className="absolute right-[-5%] bottom-[5%] w-[45%] h-[65%] pointer-events-none opacity-40 blur-[100px] bg-[radial-gradient(circle,rgba(123,224,123,0.2)_0%,rgba(13,42,34,0)_70%)]" />

      {/* Fine top sheen border */}
      <div className="absolute inset-x-0 top-0 h-px pointer-events-none z-10 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)]" />

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
            <span className="text-[#36B936] font-medium text-xs sm:text-sm tracking-wider uppercase">
              Cargo Specifications & Limits
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl text-white font-medium tracking-tight leading-[1.15] mb-4"
          >
            What You Can Ship
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.1 }}
            className="text-white/70 font-light text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed max-w-[520px] mx-auto px-2"
          >
            Choose the ideal vehicle class for your cargo. Review our approximate maximum weights, dimensions, and best-fit use cases below.
          </motion.p>
        </div>

        {/* Table Container (Uniform Table Layout Across All Screen Sizes) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ ...smoothTransition, delay: 0.15 }}
          className="rounded-2xl sm:rounded-[2rem] border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl shadow-[0_30px_70px_-15px_rgba(4,32,15,0.6)] overflow-hidden"
        >
          <div className="w-full">
            <table className="w-full border-collapse text-left table-fixed">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04]">
                  <th className="py-4 px-2.5 sm:p-6 lg:p-8 text-[10px] sm:text-[12px] font-medium text-white/50 tracking-[0.08em] sm:tracking-[0.14em] uppercase w-[27%] sm:w-[24%]">
                    Vehicle
                  </th>
                  <th className="py-4 px-2 sm:p-6 lg:p-8 text-[10px] sm:text-[12px] font-medium text-[#7BE07B] tracking-[0.08em] sm:tracking-[0.14em] uppercase w-[24%] sm:w-[22%] border-x border-white/[0.06]">
                    Max Weight
                  </th>
                  <th className="py-4 px-2 sm:p-6 lg:p-8 text-[10px] sm:text-[12px] font-medium text-white/80 tracking-[0.08em] sm:tracking-[0.14em] uppercase w-[25%] sm:w-[28%]">
                    Dimensions
                  </th>
                  <th className="py-4 px-2.5 sm:p-6 lg:p-8 text-[10px] sm:text-[12px] font-medium text-white/50 tracking-[0.08em] sm:tracking-[0.14em] uppercase w-[24%]">
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {SHIPPING_TIERS.map((tier) => (
                  <tr key={tier.vehicleType} className="group transition-colors duration-300 hover:bg-white/[0.06]">
                    <td className="py-3.5 px-2.5 sm:p-6 lg:p-8 align-middle sm:align-top">
                      <div className="flex items-center gap-2 sm:gap-3.5">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                          {tier.icon}
                        </div>
                        <span className="text-[11.5px] sm:text-[0.95rem] lg:text-[1.05rem] font-medium text-white/95 truncate">
                          {tier.vehicleType}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-2 sm:p-6 lg:p-8 text-[11.5px] sm:text-[0.9rem] lg:text-[0.95rem] font-light text-[#7BE07B] align-middle sm:align-top border-x border-white/[0.06]">
                      {tier.maxWeight}
                    </td>
                    <td className="py-3.5 px-2 sm:p-6 lg:p-8 text-[11.5px] sm:text-[0.9rem] lg:text-[0.95rem] font-light text-white/80 align-middle sm:align-top">
                      {tier.maxDimensions}
                    </td>
                    <td className="py-3.5 px-2.5 sm:p-6 lg:p-8 text-[11.5px] sm:text-[0.9rem] lg:text-[0.95rem] font-light leading-relaxed text-white/70 align-middle sm:align-top">
                      {tier.bestFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Note Box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ...smoothTransition, delay: 0.2 }}
          className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5 sm:p-6 flex items-start gap-4 text-white/70 font-light text-[13px] sm:text-[14px] leading-relaxed"
        >
          <div className="w-8 h-8 rounded-lg bg-[#36B936]/20 text-[#7BE07B] flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <span className="text-white font-medium block mb-1">Important Note</span>
            <p>
              Dimensions are approximate maximums. Items exceeding standard limits can be accommodated with advance booking. Contact our team for oversized or heavy shipments.
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ...smoothTransition, delay: 0.25 }}
          className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-center"
        >
          <button
            type="button"
            onClick={onBookShipment}
            className="group inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium rounded-full px-6 py-3 text-xs sm:text-sm tracking-wide transition-all duration-200 backdrop-blur-md shadow-lg shadow-black/10"
          >
            <span>Book a Shipment</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 text-[#7BE07B]" />
          </button>

          <a
            href={contactHref}
            onClick={(e) => {
              if (onContactTeam) {
                e.preventDefault();
                onContactTeam();
              }
            }}
            className="group inline-flex items-center gap-2 bg-transparent hover:bg-white/5 border border-white/10 text-white/80 hover:text-white font-medium rounded-full px-6 py-3 text-xs sm:text-sm tracking-wide transition-all duration-200"
          >
            <span>Contact Our Team</span>
            <PhoneCall className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatYouCanShip;