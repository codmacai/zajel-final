'use client';

import { ArrowRight, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.2, 0.8, 0.2, 1] as const;

// Shared brand palette constants
const FOREST = '#0A4D26';
const LIME = '#36B936';

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
const EYEBROW = 'Customs Guide';
const HEADING = 'Understanding Customs Duties: Who Pays?';
const INTRO =
  'When shipping internationally, customs duties and import taxes may apply depending on the destination country and the value of the shipment. Zajel ships on Delivered Duty Unpaid (DDU) terms, so you always know how charges are handled before you book.';

interface DeliveryTerm {
  code: string;
  title: string;
  tagline: string;
  features: string[];
}

const TERM: DeliveryTerm = {
  code: 'DDU',
  title: 'Delivered Duty Unpaid',
  tagline:
    'The sender pays for shipping to the destination country. Customs duties, taxes, and import charges are paid by the recipient upon delivery or during customs clearance.',
  features: [
    'Business to business shipments where the importer handles their own customs charges',
    'Shipments where the recipient has an established import account or customs broker',
    'Situations where duty rates vary and the recipient prefers to manage clearance directly',
  ],
};

// ---------------------------------------------------------------------------
// Single term card
// ---------------------------------------------------------------------------
interface TermCardProps {
  term: DeliveryTerm;
  onSelect?: () => void;
}

const TermCard = ({ term, onSelect }: TermCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative w-full flex flex-col bg-white"
    >
      {/* Top accent bar so the card reads as distinct from the plain white page */}
      <div className="h-1 w-full" style={{ backgroundColor: LIME }} />

      <div className="h-full flex flex-col items-start gap-5 py-8 sm:py-10 px-6 sm:px-10 relative overflow-hidden">
        {/* Header section with code badge on top right */}
        <div className="w-full flex items-start justify-between gap-4">
          <div className="relative">
            <span className="leading-tight tracking-tight text-2xl sm:text-[1.65rem] font-medium block" style={{ color: FOREST }}>
              {term.code}
            </span>
            <span className="block mt-1 text-xs sm:text-[13px] font-light tracking-wide" style={{ color: `${FOREST}B3` }}>
              {term.title}
            </span>
          </div>

          <span
            className="shrink-0 inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-md tracking-wider uppercase"
            style={{ backgroundColor: 'rgba(10,77,38,0.08)', color: FOREST }}
          >
            {term.code}
          </span>
        </div>

        <p className="font-light leading-relaxed text-xs sm:text-sm max-w-2xl" style={{ color: `${FOREST}B3` }}>
          {term.tagline}
        </p>

        <div className="w-full pt-1" style={{ borderTop: `1px solid ${FOREST}1F` }} />

        <div className="w-full">
          <span className="block mb-2.5 text-[10px] font-medium tracking-[0.08em] uppercase" style={{ color: 'rgba(10,77,38,0.45)' }}>
            Best for:
          </span>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-3 w-full">
            {term.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <svg className="mt-0.5 shrink-0 w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="8" fill={FOREST} />
                  <path d="M4.8 8.2 L7 10.4 L11.2 5.8" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-light leading-snug text-xs sm:text-[13px]" style={{ color: `${FOREST}B3` }}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-2 w-full pt-4 sm:max-w-xs">
          <button
            type="button"
            onClick={onSelect}
            className="group inline-flex items-center justify-between w-full rounded-xl py-3 px-4 text-xs sm:text-sm font-medium transition-all duration-300 bg-[#0A4D26] text-white hover:bg-[#0d5c2f]"
          >
            <span>Get a Shipping Quote</span>
            <span className="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-0.5 bg-white/15 text-white">
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------
interface CustomsDutyGuideProps {
  onGetQuote?: () => void;
  onContactSupport?: () => void;
}

const CustomsDutyGuide = ({ onGetQuote, onContactSupport }: CustomsDutyGuideProps) => {
  return (
    <section className="w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-white overflow-hidden font-sans">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="mb-3 sm:mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-6 sm:w-8" style={{ backgroundColor: LIME }} />
            <span className="text-xs sm:text-sm font-medium tracking-widest uppercase" style={{ color: LIME }}>
              {EYEBROW}
            </span>
            <span className="h-[2px] w-6 sm:w-8" style={{ backgroundColor: LIME }} />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl text-[#0A4D26] font-medium tracking-tight leading-[1.15] max-w-[760px] mx-auto px-2">
            {HEADING}
          </h2>

          <p className="mt-5 text-[#2D6A4F] font-light text-[14px] sm:text-[16px] leading-relaxed max-w-[560px] mx-auto px-2">
            {INTRO}
          </p>
        </motion.div>

        <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#e2ece9] max-w-5xl mx-auto">
          <TermCard term={TERM} onSelect={onGetQuote} />
        </div>

        {/* Note / Disclaimer Box */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mt-10 max-w-5xl mx-auto overflow-hidden rounded-2xl ring-1 ring-[#0A4D26]/10 shadow-[0_1px_2px_rgba(10,77,38,0.04)] bg-[#0D2A22]"
        >
          <div className="flex items-start gap-4 p-[clamp(1.5rem,3.5vw,2.25rem)]">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#36B936]/15">
              <ShieldAlert className="h-4 w-4 text-[#36B936]" strokeWidth={1.75} />
            </div>
            <p className="text-[13px] sm:text-[14px] leading-relaxed text-white/70 font-light">
              <span className="font-medium text-white">Note:</span> Customs duties vary by country, item type, and declared value. Our team can
              advise on estimated duty rates for your destination when you book. For commercial shipments, Zajel handles all customs
              documentation on your behalf.
            </p>
          </div>
        </motion.div>

        {/* CTA (Primary button + inline clean text link) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-center"
        >
          <button
            type="button"
            onClick={onGetQuote}
            className="group inline-flex items-center gap-2 sm:gap-3 bg-[#36B936] text-white font-medium rounded-full pl-6 sm:pl-7 pr-2.5 py-3 sm:py-3.5 text-xs sm:text-sm tracking-tight shadow-[0_10px_30px_rgba(54,185,54,0.2)] transition-all duration-200 hover:bg-[#36B936]/90 whitespace-nowrap"
          >
            <span>Get a Shipping Quote</span>
            <span className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/15 text-white flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-0.5 shrink-0">
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2} />
            </span>
          </button>

          <button
            type="button"
            onClick={onContactSupport}
            className="group inline-flex items-center gap-1.5 text-[#0A4D26] font-medium text-xs sm:text-sm tracking-tight transition-all duration-200 hover:text-[#36B936] bg-transparent border-none p-0 cursor-pointer whitespace-nowrap"
          >
            <span className="relative pb-0.5 border-b border-[#0A4D26]/30 group-hover:border-[#36B936] transition-colors">
              Contact Us for Customs Advice
            </span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5" strokeWidth={1.75} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomsDutyGuide;