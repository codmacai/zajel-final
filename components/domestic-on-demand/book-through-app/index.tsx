'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;
const smoothTransition = { duration: 0.7, ease: EASE };

interface AppStep {
  number: string;
  title: string;
  description: string;
  /** Mobile UI screenshot shown in the top of the card. Leave unset to show a placeholder. */
  image?: string;
  imageAlt: string;
}

// Drop the app screenshots into public/domestic/app/ and set `image`
// on each step, e.g. image: '/domestic/app/step-1.png'
const APP_STEPS: AppStep[] = [
  {
    number: '01',
    title: 'Open the Zajel App',
    description: 'Download the app and sign in, then tap “Domestic Delivery” to start a new booking.',
    imageAlt: 'Zajel app home screen',
  },
  {
    number: '02',
    title: 'Add Pickup & Drop-off',
    description: 'Enter the pickup and delivery addresses anywhere across the UAE.',
    imageAlt: 'Entering pickup and drop-off addresses in the Zajel app',
  },
  {
    number: '03',
    title: 'Pick Vehicle & Time',
    description: 'Choose a motorbike or van and select the day and time slot that suits you.',
    imageAlt: 'Choosing a vehicle and time slot in the Zajel app',
  },
  {
    number: '04',
    title: 'Pay & Track Live',
    description: 'Confirm and pay in the app, then follow your courier in real time until delivery.',
    imageAlt: 'Live shipment tracking in the Zajel app',
  },
];

const BookThroughApp: FC = () => {
  return (
    <section className="w-full relative overflow-hidden bg-white py-16 sm:py-24 lg:py-32 font-sans">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-[680px] mx-auto text-center mb-10 sm:mb-14 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
            className="flex items-center justify-center gap-3 sm:gap-4 mb-4"
          >
            <span className="text-[#36B936] font-medium text-xs sm:text-sm tracking-wider uppercase">
              Zajel App
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl text-[#0D2A22] font-medium tracking-tight leading-[1.15] mb-4"
          >
            How to Book Through the App
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothTransition, delay: 0.1 }}
            className="text-[#0D2A22]/65 font-light text-[13px] sm:text-[14px] leading-relaxed max-w-[520px] mx-auto px-2"
          >
            Book a same-day or next-day delivery from your phone in four quick steps.
          </motion.p>
        </div>

        {/* Cards: 2 per row on mobile, 4 per row on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {APP_STEPS.map((step, i) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...smoothTransition, delay: 0.1 + i * 0.08 }}
              className="group flex flex-col rounded-2xl sm:rounded-3xl border border-[#0D2A22]/10 bg-white overflow-hidden shadow-[0_20px_50px_-25px_rgba(13,42,34,0.35)] transition-shadow duration-300 hover:shadow-[0_28px_60px_-25px_rgba(13,42,34,0.45)]"
            >
              {/* Mobile UI preview */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[radial-gradient(120%_120%_at_50%_0%,#E8F8E8_0%,#F4FBF4_55%,#FFFFFF_100%)]">
                {step.image ? (
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 280px"
                    className="object-contain object-bottom pt-4 sm:pt-6 px-3 sm:px-6 transition-transform duration-500 ease-out group-hover:-translate-y-1"
                  />
                ) : (
                  <div className="absolute inset-x-[18%] top-5 sm:top-7 bottom-0 rounded-t-[1.25rem] sm:rounded-t-[1.75rem] border-[5px] sm:border-[6px] border-b-0 border-[#0D2A22] bg-white flex items-center justify-center">
                    <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-[#36B936]/40" aria-hidden />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-3.5 sm:p-5 lg:p-6 border-t border-[#0D2A22]/[0.06]">
                <span className="text-[#36B936] font-medium text-[11px] sm:text-xs tracking-wider mb-1.5 sm:mb-2">
                  STEP {step.number}
                </span>
                <h3 className="text-[#0D2A22] font-medium text-[13px] sm:text-base lg:text-[1.05rem] leading-snug mb-1.5 sm:mb-2">
                  {step.title}
                </h3>
                <p className="text-[#0D2A22]/60 font-light text-[11.5px] sm:text-[13px] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookThroughApp;
