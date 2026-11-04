'use client';

import { useSupportAction } from '@/hooks/useSupportAction';
import { ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { INTERNATIONAL_TIMES, type INTERNATIONAL_TIMESContent } from '../content';
import { cmsSection } from '@/components/cms/CmsProvider';

const SMOOTH_TRANSITION = {
  type: 'spring' as const,
  damping: 25,
  stiffness: 120,
};

const LIGHT_GREEN = '#36B936';

interface InternationalShippingTimesProps {
  onGetQuote?: () => void;
  onContactSupport?: () => void;
  /** Cover photo for the express-delivery banner (courier/rider/van, etc.) */
  bannerImageSrc?: string;
  bannerImageAlt?: string;
}

const InternationalShippingTimes = ({ content,
  onGetQuote: onGetQuoteProp,
  onContactSupport: onContactSupportProp,
}: InternationalShippingTimesProps & { content: INTERNATIONAL_TIMESContent }) => {
  const onGetQuote = useSupportAction(onGetQuoteProp);
  const onContactSupport = useSupportAction(onContactSupportProp);
  const { bannerImageSrc, bannerImageAlt } = content;
  return (
    <section className="w-full relative overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 bg-white font-['Manrope',sans-serif]">
      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ...SMOOTH_TRANSITION, duration: 0.7 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <div className="mb-2.5 flex items-center justify-center gap-2.5">
            <span className="text-xs sm:text-sm font-medium tracking-widest uppercase" style={{ color: LIGHT_GREEN }}>
              {content.eyebrow}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0A4D26] font-medium tracking-tight leading-[1.2] max-w-[820px] mx-auto px-2">
            {content.heading}
          </h2>

          <p className="mt-3 text-[#2D6A4F] font-light text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed max-w-[520px] mx-auto px-2">
            {content.description}
          </p>
        </motion.div>

        {/* Minimal Banner */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...SMOOTH_TRANSITION, duration: 0.7, delay: 0.1 }}
          className="relative w-full overflow-hidden rounded-2xl border border-[#0A4D26]/10 aspect-[4/3] sm:aspect-[2/1] lg:aspect-[21/8] bg-[#0A4D26]/[0.04]"
        >
          {bannerImageSrc ? (
            <Image
              src={bannerImageSrc}
              alt={bannerImageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1100px"
              className="object-cover object-center"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0A4D26]/[0.03] to-[#36B936]/[0.08]">
              <span className="text-[#0A4D26]/50 text-sm font-medium">Add banner image</span>
            </div>
          )}

          {/* Light bottom gradient just for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#051F10]/70 via-[#051F10]/10 to-transparent" />

          {/* Overlay */}
          <div className="absolute left-5 bottom-5 sm:left-8 sm:bottom-8 max-w-[90%]">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-[10px] font-normal tracking-wider uppercase mb-2">
              <span className="w-1 h-1 rounded-full bg-[#36B936]" />
              <span>{content.badge}</span>
            </div>

            <div className="flex items-baseline gap-2.5">
              <span className="text-white font-normal tracking-tight leading-none text-[clamp(2rem,5vw,3.25rem)]">
                {content.days}
              </span>
              <div className="flex flex-col">
                <span className="text-white/90 font-medium text-[clamp(0.85rem,1.6vw,1.1rem)] tracking-tight leading-none mb-0.5">
                  {content.daysLabel}
                </span>
                <span className="text-white/60 font-light text-[11px] tracking-wide">
                  {content.daysNote}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Note & Disclaimer Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 }}
            className="flex gap-4 rounded-2xl border border-[#0A4D26]/10 bg-white p-[clamp(1.25rem,2.5vw,2rem)] shadow-[0_12px_30px_-18px_rgba(10,77,38,0.2)] transition-all duration-300 hover:border-[#0A4D26]/30"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0A4D26]/10 text-[#0A4D26]">
              <Clock className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <h4 className="text-sm font-medium text-[#0F1A14] mb-1.5 tracking-tight">{content.noteTitle}</h4>
              <p className="text-[#4b5a52] font-light text-[13px] sm:text-[14px] leading-[1.7]">
                {content.noteText}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
            className="flex gap-4 rounded-2xl border border-[#0A4D26]/10 bg-white p-[clamp(1.25rem,2.5vw,2rem)] shadow-[0_12px_30px_-18px_rgba(10,77,38,0.2)] transition-all duration-300 hover:border-[#0A4D26]/30"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0A4D26]/10 text-[#0A4D26]">
              <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <h4 className="text-sm font-medium text-[#0F1A14] mb-1.5 tracking-tight">{content.trackingTitle}</h4>
              <p className="text-[#4b5a52] font-light text-[13px] sm:text-[14px] leading-[1.7]">
                {content.trackingText}
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ...SMOOTH_TRANSITION, duration: 0.8, delay: 0.25 }}
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

export default cmsSection('international-courier.shipping-times', INTERNATIONAL_TIMES, InternationalShippingTimes);
