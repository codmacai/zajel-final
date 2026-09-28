'use client';

import { ArrowRight, Globe, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const SMOOTH_TRANSITION = {
  type: 'spring' as const,
  damping: 25,
  stiffness: 120,
};

const LIGHT_GREEN = '#36B936';

const EYEBROW = 'Global Transit Routes';
const HEADING = 'International Shipping Times from the UAE';
const DESCRIPTION =
  'Zajel connects the UAE to major global destinations with reliable delivery timelines tailored to your schedule and urgency.';

interface InternationalShippingTimesProps {
  onGetQuote?: () => void;
  onContactSupport?: () => void;
  /** Cover photo for the express-delivery banner (courier/rider/van, etc.) */
  bannerImageSrc?: string;
  bannerImageAlt?: string;
}

const InternationalShippingTimes = ({
  onGetQuote,
  onContactSupport,
  bannerImageSrc,
  bannerImageAlt = 'Zajel courier delivering an international shipment',
}: InternationalShippingTimesProps) => {
  return (
    <section className="w-full relative overflow-hidden py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-10 bg-white font-['Manrope',sans-serif]">
      {/* Background ambient glows */}
      <div
        className="absolute right-[-8%] bottom-[-10%] w-[55%] h-[85%] pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(10,77,38,0.06) 0%, rgba(10,77,38,0) 70%)' }}
      />
      <div
        className="absolute left-[-5%] top-[10%] w-[45%] h-[65%] pointer-events-none opacity-70 blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(10,77,38,0.04) 0%, rgba(10,77,38,0) 70%)' }}
      />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ...SMOOTH_TRANSITION, duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="mb-3 sm:mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-6 sm:w-8" style={{ backgroundColor: LIGHT_GREEN }} />
            <span className="text-xs sm:text-sm font-medium tracking-widest uppercase" style={{ color: LIGHT_GREEN }}>
              {EYEBROW}
            </span>
            <span className="h-[2px] w-6 sm:w-8" style={{ backgroundColor: LIGHT_GREEN }} />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl text-[#0A4D26] font-medium tracking-tight leading-[1.15] max-w-[760px] mx-auto px-2">
            {HEADING}
          </h2>

          <p className="mt-5 text-[#2D6A4F] font-light text-[14px] sm:text-[16px] leading-relaxed max-w-[560px] mx-auto px-2">
            {DESCRIPTION}
          </p>
        </motion.div>

        {/* Modernized & Minimal Hero Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...SMOOTH_TRANSITION, duration: 0.8, delay: 0.1 }}
          className="relative w-full overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-[#0A4D26]/15 aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] bg-[#0A4D26]/[0.04] shadow-[0_24px_60px_-15px_rgba(10,77,38,0.18)]"
        >
          {bannerImageSrc ? (
            <Image
              src={bannerImageSrc}
              alt={bannerImageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover object-center"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center border border-dashed border-[#0A4D26]/20 bg-gradient-to-br from-[#0A4D26]/[0.03] to-[#36B936]/[0.08]">
              <span className="text-[#0A4D26]/50 text-sm font-medium">Add banner image</span>
            </div>
          )}

          {/* Sophisticated multi-stop editorial gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#051F10]/90 via-[#051F10]/30 to-transparent" />

          {/* Minimal & Modernized Floating Overlay */}
          <div className="absolute left-6 bottom-6 sm:left-10 sm:bottom-10 lg:left-12 lg:bottom-12 max-w-[90%]">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...SMOOTH_TRANSITION, delay: 0.25 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-[10px] sm:text-[11px] font-normal tracking-wider uppercase mb-2.5 shadow-sm"
            >
              <span className="w-1 h-1 rounded-full bg-[#36B936]" />
              <span>Express Transit</span>
            </motion.div>

            <div className="flex items-baseline gap-2.5 sm:gap-3.5">
              <span className="text-white font-normal tracking-tight leading-none text-[clamp(2.5rem,7vw,4.5rem)]">
                3&ndash;4
              </span>
              <div className="flex flex-col">
                <span className="text-white/90 font-medium text-[clamp(0.95rem,2vw,1.35rem)] tracking-tight leading-none mb-0.5">
                  Business Days
                </span>
                <span className="text-white/60 font-light text-[11px] sm:text-xs tracking-wide">
                  Global Door-to-Door Delivery
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Note & Disclaimer Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
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
              <h4 className="text-sm font-medium text-[#0F1A14] mb-1.5 tracking-tight">Important Transit Note</h4>
              <p className="text-[#4b5a52] font-light text-[13px] sm:text-[14px] leading-[1.7]">
                Transit times are estimated from the date of shipment confirmation and may vary depending on customs clearance at the destination
                country. Express delivery includes priority handling and expedited customs processing.
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
              <h4 className="text-sm font-medium text-[#0F1A14] mb-1.5 tracking-tight">Real-Time Visibility</h4>
              <p className="text-[#4b5a52] font-light text-[13px] sm:text-[14px] leading-[1.7]">
                All international shipments include real-time tracking through the Zajel app and portal from pickup to final delivery.
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA (Primary button + inline clean text link matching Customs Duty guide) */}
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
              Contact Us for Transit Advice
            </span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5" strokeWidth={1.75} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default InternationalShippingTimes;