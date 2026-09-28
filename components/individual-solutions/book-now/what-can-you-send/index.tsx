'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Package, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.2, 0.8, 0.2, 1] as const;

interface SizeLimitRow {
  shipmentType: string;
  maxWeight: string;
  maxDimensions: string;
}

const SIZE_LIMIT_ROWS: SizeLimitRow[] = [
  { shipmentType: 'Documents', maxWeight: 'Up to 2 kg', maxDimensions: 'A4 envelope or equivalent' },
  { shipmentType: 'Small Parcels', maxWeight: 'Up to 30 kg', maxDimensions: '120 cm longest side' },
  { shipmentType: 'Large Packages', maxWeight: 'Up to 70 kg', maxDimensions: '150 cm longest side' },
  { shipmentType: 'Heavy or Oversized', maxWeight: 'Above 70 kg', maxDimensions: 'Contact us for a quote' },
];

const PACKING_TIPS = [
  'Use a sturdy box or padded envelope appropriate for the contents.',
  'Remove or cover old shipping labels.',
  'Seal all openings securely with high-quality packing tape.',
  'Wrap fragile items individually with cushioning material on all sides.',
  'Ensure liquids are sealed in a leak-proof container inside a waterproof bag.',
];

const PROHIBITED_ITEMS = [
  'Flammable materials and hazardous substances',
  'Explosives and weapons/firearms',
  'Perishable food (unless cold chain arrangements are made)',
  'Live animals and illegal wildlife products',
  'Counterfeit goods and restricted media',
  'Any item prohibited by UAE law or destination country regulations',
];

interface WhatCanYouSendProps {
  onBookShipment?: () => void;
  onContactSpecialItems?: () => void;
  bookShipmentHref?: string;
  contactHref?: string;
}

export default function WhatCanYouSend({
  onBookShipment,
  onContactSpecialItems,
  bookShipmentHref = '/book-shipment',
  contactHref = '/contact',
}: WhatCanYouSendProps) {
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
              Guidelines &amp; Limits
            </span>
          </div>
          <h2 className="mx-auto max-w-[720px] text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.15] tracking-tight text-[#0A4D26]">
            What Can You Send?
          </h2>
          <p className="mt-4 sm:mt-5 max-w-[560px] text-xs sm:text-sm md:text-base font-light leading-relaxed text-[#0A4D26]/75">
            Zajel ships documents, parcels, and packages of all sizes. Here is a quick guide to what
            you can send and how to prepare your shipment.
          </p>
        </motion.div>

        {/* Size & weight table with consistent alignment and styling */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="overflow-hidden rounded-[1.75rem] border border-[#0A3D2D]/50 bg-gradient-to-b from-[#0A3D2D] to-[#05241A] text-white shadow-[0_25px_60px_-15px_rgba(5,36,26,0.45)]"
        >
          <div className="border-b border-white/10 p-5 sm:p-8">
            <h3 className="text-base sm:text-lg font-medium tracking-tight text-white">Size and Weight Limits</h3>
          </div>

          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04]">
                <th className="w-[32%] px-4 py-3.5 sm:px-6 sm:py-5 md:px-8 md:py-6 text-[10px] sm:text-[11px] md:text-[12px] font-medium uppercase tracking-[0.14em] text-[#36B936]">
                  Shipment Type
                </th>
                <th className="w-[30%] border-x border-white/[0.06] px-4 py-3.5 sm:px-6 sm:py-5 md:px-8 md:py-6 text-[10px] sm:text-[11px] md:text-[12px] font-medium uppercase tracking-[0.14em] text-white/90">
                  Max Weight
                </th>
                <th className="w-[38%] px-4 py-3.5 sm:px-6 sm:py-5 md:px-8 md:py-6 text-[10px] sm:text-[11px] md:text-[12px] font-medium uppercase tracking-[0.14em] text-white/70">
                  Max Dimensions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {SIZE_LIMIT_ROWS.map((row) => (
                <tr key={row.shipmentType} className="group transition-colors duration-300 hover:bg-white/[0.06]">
                  <td className="px-4 py-3.5 sm:px-6 sm:py-5 md:px-8 md:py-6 align-middle text-xs sm:text-sm font-medium text-white/95">
                    {row.shipmentType}
                  </td>
                  <td className="border-x border-white/[0.06] px-4 py-3.5 sm:px-6 sm:py-5 md:px-8 md:py-6 align-middle text-xs sm:text-sm font-light text-white/90">
                    {row.maxWeight}
                  </td>
                  <td className="px-4 py-3.5 sm:px-6 sm:py-5 md:px-8 md:py-6 align-middle text-xs sm:text-sm font-light text-white/80">
                    {row.maxDimensions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Packing Tips & Prohibited Items */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {/* Packing Tips */}
          <div className="flex flex-col justify-between rounded-[1.75rem] border border-[#0A4D26]/15 bg-white p-[clamp(1.75rem,4vw,2.5rem)] shadow-sm">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#36B936]/15 text-[#36B936]">
                  <Package className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg sm:text-xl font-medium tracking-tight text-[#0A4D26]">Packing Tips</h3>
              </div>
              <p className="mb-6 text-xs sm:text-sm font-light text-[#0A4D26]/70">
                Proper preparation ensures your items arrive safely and on schedule. Follow these
                guidelines before pickup.
              </p>
              <ul className="space-y-3.5">
                {PACKING_TIPS.map((tip) => (
                  <li key={tip} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#36B936]" strokeWidth={2} />
                    <span className="text-xs sm:text-sm font-light leading-relaxed text-[#0A4D26]/85">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Prohibited Items */}
          <div className="flex flex-col justify-between rounded-[1.75rem] border border-[#0A3D2D]/30 bg-[#0A3D2D] p-[clamp(1.75rem,4vw,2.5rem)] text-white shadow-md">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[#36B936]">
                  <ShieldAlert className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg sm:text-xl font-medium tracking-tight text-white">Prohibited Items</h3>
              </div>
              <p className="mb-6 text-xs sm:text-sm font-light text-white/70">
                Certain items cannot be shipped domestically or internationally. Regulations comply
                with strict local and international laws.
              </p>
              <ul className="mb-6 space-y-3.5">
                {PROHIBITED_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#36B936]" />
                    <span className="text-xs sm:text-sm font-light leading-relaxed text-white/85">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="border-t border-white/10 pt-4 text-xs font-light italic text-white/60">
                For international shipments, restrictions vary by destination country. Our team can
                advise on specific item eligibility when you book.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          className="mt-[clamp(2.5rem,5vw,3.5rem)] flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <Link
            href={bookShipmentHref}
            onClick={onBookShipment ? (e) => { e.preventDefault(); onBookShipment(); } : undefined}
            className="group inline-flex items-center gap-3 rounded-full bg-[#36B936] py-2.5 pl-7 pr-2.5 text-sm font-medium text-white shadow-[0_1px_2px_rgba(10,77,38,0.15)] transition-shadow duration-300 hover:shadow-[0_10px_24px_rgba(10,77,38,0.28)]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
              Book a Shipment
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[135deg]">
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </span>
          </Link>

          <Link
            href={contactHref}
            onClick={onContactSpecialItems ? (e) => { e.preventDefault(); onContactSpecialItems(); } : undefined}
            className="group inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#0A4D26] transition-colors duration-200 hover:text-[#36B936]"
          >
            <span className="border-b border-[#0A4D26]/40 transition-colors duration-200 group-hover:border-[#36B936]">
              Contact Us for Special Items
            </span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}