'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const EASE = [0.2, 0.8, 0.2, 1] as const;

const BASE_IMAGE_SRC = '/choose/ChatGPT Image Sep 28, 2026, 03_27_16 PM.png';
const CUTOUT_IMAGE_SRC = '/choose/ChatGPT Image Sep 28, 2026, 03_27_25 PM (2).png';

const OTHER_ARRANGEMENTS_LINE =
  'Also available on request: Door-to-Port, Port-to-Door, and Port-to-Port arrangements — for businesses managing part of the logistics themselves.';

const COMPLIANCE_HEADING = 'Compliance & Customs Expertise';

const COMPLIANCE_BODY_SENTENCES = [
  'Moving cargo by sea involves documentation, duty, and port clearance requirements that vary by cargo and destination.',
  'Zajel manages customs clearance and compliance on your behalf, so your shipment moves through port without unnecessary delays.',
];

const ChooseDeliveryAndComplianceSea = () => {
  return (
    <>
      {/* Delivery Arrangement block — white surface */}
      <section className="w-full overflow-hidden bg-white font-sans">
        <div className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-12">
          <div className="max-w-[1320px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-center mb-10 sm:mb-14 lg:mb-16"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-8 h-[2px]" style={{ backgroundColor: '#36B936' }} />
                <span className="text-[#36B936] font-medium text-xs sm:text-sm tracking-wider uppercase">
                  Delivery Arrangements
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75xl] font-medium tracking-tight text-[#1b4332] leading-[1.15] max-w-[720px] mx-auto px-2">
                Choose Your Delivery Arrangement
              </h2>

              <p className="mt-4 sm:mt-5 text-[#2d6a4f] font-light text-sm sm:text-base lg:text-[1.1rem] leading-relaxed max-w-[520px] mx-auto px-2">
                Select the ideal transport flow tailored to your supply chain requirements.
              </p>
            </motion.div>

            {/* Door-to-Door feature block (no overflow-hidden so the cutout can pop out) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative mt-12 sm:mt-16 lg:mt-20 border border-white/10 rounded-[1.25rem] sm:rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_56px_-16px_rgba(5,54,26,0.22)]"
              style={{ background: 'linear-gradient(180deg, #0A3D22 0%, #073018 55%, #052611 100%)' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-stretch">
                {/* Text side */}
                <div className="p-6 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1 relative z-10">
                  <h3 className="text-white font-medium leading-[1.08] text-2xl sm:text-[2.2rem] lg:text-[2.6rem] tracking-tight mb-3 sm:mb-4">
                    Door-to-Door
                  </h3>

                  <div className="w-10 h-px bg-white/15 mb-4 sm:mb-5" />

                  <p className="text-white/75 font-light leading-[1.65] text-sm sm:text-base lg:text-[1.1rem] tracking-tight mb-6 sm:mb-8 max-w-[46ch]">
                    Pickup at your origin address, delivered straight to the final destination — no extra
                    coordination required on your end. This is how most Zajel sea freight shipments move,
                    start to finish.
                  </p>

                  <Link
                    href="/quote?arrangement=door-to-door"
                    className="group inline-flex w-full sm:w-fit items-center justify-center gap-2.5 bg-[#36B936] hover:bg-[#2fa32f] active:bg-[#2a8f2a] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 text-white font-medium rounded-full px-6 py-3.5 text-xs sm:text-sm tracking-wide shadow-[0_10px_28px_rgba(54,185,54,0.25)]"
                  >
                    <span>Request Door-to-Door Quote</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1 text-sm leading-none" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>

                {/* Image side: base + cutout share the exact same box so they always line up */}
                <div className="relative order-1 lg:order-2 min-h-[260px] sm:min-h-[340px] lg:min-h-full">
                  {/* Base layer: clipped to the card shape, but sized like the cutout */}
                  <div className="absolute inset-0 overflow-hidden rounded-t-[1.25rem] sm:rounded-t-[2rem] lg:rounded-t-none lg:rounded-r-[2.5rem]">
                    <div className="absolute inset-x-0 bottom-0 -top-10 sm:-top-14 lg:-top-[4.5rem]">
                      <Image
                        src={BASE_IMAGE_SRC}
                        alt="Door-to-Door sea freight background"
                        fill
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-contain object-bottom"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden pointer-events-none" />
                  </div>

                  {/* Cutout layer: identical box and fit, not clipped, so the head pops out */}
                  <div className="absolute inset-x-0 bottom-0 -top-10 sm:-top-14 lg:-top-[4.5rem] pointer-events-none z-20">
                    <Image
                      src={CUTOUT_IMAGE_SRC}
                      alt="Door-to-Door pop-out graphic"
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-contain object-bottom drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
              className="text-center text-[#4B5750] font-light text-xs sm:text-sm lg:text-base leading-[1.65] max-w-[52rem] mx-auto mt-6 sm:mt-10 px-2"
            >
              {OTHER_ARRANGEMENTS_LINE}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Compliance & Customs block — dark green section */}
      <section
        className="w-full overflow-hidden font-sans"
        style={{ background: 'linear-gradient(180deg, #0A3D22 0%, #073018 55%, #052611 100%)' }}
      >
        <div className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6">
          <div className="max-w-[860px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex items-center justify-center gap-3 mb-4 sm:mb-6"
            >
              <span className="w-8 h-[2px]" style={{ backgroundColor: '#36B936' }} />
              <span className="text-[#36B936] font-medium text-xs sm:text-sm tracking-wider uppercase">
                Compliance &amp; Customs
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl text-white font-medium tracking-tight leading-[1.15] mb-4 sm:mb-8 px-2 max-w-[720px] mx-auto"
            >
              {COMPLIANCE_HEADING}
            </motion.h2>

            <p className="max-w-[540px] mx-auto text-white/75 font-light leading-[1.65] sm:leading-[1.7] text-sm sm:text-base lg:text-[1.15rem] tracking-tight px-2">
              {COMPLIANCE_BODY_SENTENCES.map((sentence, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.15 }}
                  className="inline"
                >
                  {sentence}
                  {i < COMPLIANCE_BODY_SENTENCES.length - 1 ? ' ' : ''}
                </motion.span>
              ))}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChooseDeliveryAndComplianceSea;