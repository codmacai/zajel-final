'use client';

import { motion } from 'framer-motion';
import { AppIcon, PickupIcon } from '../icons';
import { APP_DOWNLOAD_URL } from '../data';

const EASE = [0.2, 0.8, 0.2, 1] as const;

export default function BookNow() {
  return (
    <section className="w-full px-4 py-10 font-sans sm:px-6 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative mx-auto max-w-[1300px] overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0A4D26] via-[#0C3D20] to-[#082C17] px-6 py-12 shadow-[0_20px_50px_-20px_rgba(10,77,38,0.5)] sm:px-10 sm:py-16 lg:px-16 lg:py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#36B936]/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/5 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-[720px] text-center">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#36B936]">
            Ready to Ship?
          </p>

          <p className="mx-auto mb-7 max-w-[62ch] text-[clamp(20px,2.2vw,26px)] font-medium uppercase leading-[1.4] tracking-[0.01em] text-white">
            Same day or international — book either service on zajel.com, or download the app for booking on the go.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5">
            <a
              href={APP_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[clamp(52px,5.5vw,60px)] items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-white px-[clamp(28px,3vw,40px)] text-[clamp(15px,1.4vw,16px)] font-medium tracking-[0.01em] text-[#0A4D26] shadow-[0_14px_28px_-12px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <PickupIcon />
              Get the App
            </a>
            <a
              href={APP_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[clamp(52px,5.5vw,60px)] items-center justify-center gap-2.5 whitespace-nowrap rounded-full border-[1.5px] border-white/55 bg-white/10 px-[clamp(28px,3vw,40px)] text-[clamp(15px,1.4vw,16px)] font-medium tracking-[0.01em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
            >
              <AppIcon />
              Download the Zajel App
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
