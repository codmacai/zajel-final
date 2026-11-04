'use client';

import { useSupportAction } from '@/hooks/useSupportAction';
import { ArrowRight, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { type DeliveryTerm, INTERNATIONAL_CUSTOMS, type INTERNATIONAL_CUSTOMSContent } from '../content';
import { cmsSection } from '@/components/cms/CmsProvider';

const EASE = [0.2, 0.8, 0.2, 1] as const;

// Shared brand palette constants
const FOREST = '#0A4D26';
const LIME = '#36B936';

// ---------------------------------------------------------------------------
// Single term card
// ---------------------------------------------------------------------------
interface TermCardProps {
  term: DeliveryTerm;
  onSelect?: () => void;
}

const TermCard = ({ term, onSelect, bestForLabel }: TermCardProps & { bestForLabel: string }) => {
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
            {bestForLabel}
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

const CustomsDutyGuide = ({ content, onGetQuote: onGetQuoteProp, onContactSupport: onContactSupportProp }: CustomsDutyGuideProps & { content: INTERNATIONAL_CUSTOMSContent }) => {
  const onGetQuote = useSupportAction(onGetQuoteProp);
  const onContactSupport = useSupportAction(onContactSupportProp);
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
            <span className="text-xs sm:text-sm font-medium tracking-widest uppercase" style={{ color: LIME }}>
              {content.eyebrow}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0A4D26] font-medium tracking-tight leading-[1.2] max-w-[820px] mx-auto px-2">
            {content.heading}
          </h2>

          <p className="mt-5 text-[#2D6A4F] font-light text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed max-w-[560px] mx-auto px-2">
            {content.intro}
          </p>
        </motion.div>

        <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#e2ece9] max-w-5xl mx-auto">
          <TermCard term={content.term} onSelect={onGetQuote} bestForLabel={content.bestForLabel} />
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
              <span className="font-medium text-white">{content.noteLabel}</span> {content.noteText}
            </p>
          </div>
        </motion.div>

        {/* CTA */}
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
            className="inline-flex items-center gap-2 rounded-full bg-[#36B936] px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.55rem,1vw,0.85rem)] text-xs sm:text-sm font-medium text-[#0B140F] shadow-md transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A4D26] whitespace-nowrap"
          >
            <span>{content.quoteLabel}</span>
            <span aria-hidden="true">→</span>
          </button>

          <button
            type="button"
            onClick={onContactSupport}
            className="group inline-flex items-center gap-1.5 text-[#0A4D26] font-medium text-xs sm:text-sm tracking-tight transition-all duration-200 hover:text-[#36B936] bg-transparent border-none p-0 cursor-pointer whitespace-nowrap"
          >
            <span className="relative pb-0.5 border-b border-[#0A4D26]/30 group-hover:border-[#36B936] transition-colors">
              {content.contactLabel}
            </span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5" strokeWidth={1.75} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default cmsSection('international-courier.customs-guide', INTERNATIONAL_CUSTOMS, CustomsDutyGuide);
