'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Layers, MapPin, TrendingUp, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { choiceItems, whyChooseHeader } from '../data';

const EASE = [0.2, 0.8, 0.2, 1] as const;
const GRID_COLUMNS_MOBILE = 2;
const GRID_COLUMNS_DESKTOP = 4;

const iconMap: Record<string, LucideIcon> = {
  trust: ShieldCheck,
  'single-provider': Layers,
  presence: MapPin,
  scale: TrendingUp,
};

interface WhyBusinessesChooseProps {
  ctaHref?: string;
}

export default function WhyBusinessesChoose({ ctaHref }: WhyBusinessesChooseProps) {
  const remainderMobile = choiceItems.length % GRID_COLUMNS_MOBILE;
  const emptyCellsMobile = remainderMobile === 0 ? 0 : GRID_COLUMNS_MOBILE - remainderMobile;

  const remainderDesktop = choiceItems.length % GRID_COLUMNS_DESKTOP;
  const emptyCellsDesktop = remainderDesktop === 0 ? 0 : GRID_COLUMNS_DESKTOP - remainderDesktop;

  const ctaContent = (
    <div className="flex h-full flex-col justify-between">
      <div>
        <ArrowRight
          className="mb-4 sm:mb-6 md:mb-8 h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-[#36B936] transition-colors duration-300 group-hover:text-white"
          strokeWidth={1.25}
        />
        <h3 className="mb-1.5 sm:mb-2 text-sm sm:text-base md:text-xl font-medium tracking-tight text-[#36B936] transition-colors duration-300 group-hover:text-white">
          {whyChooseHeader.ctaLabel}
        </h3>
      </div>
      <p className="mt-2 text-[11px] sm:text-xs md:text-sm font-light leading-relaxed text-[#36B936]/80 transition-colors duration-300 group-hover:text-white/80">
        {whyChooseHeader.ctaDescription}
      </p>
    </div>
  );

  const ctaClassName =
    'group flex flex-col justify-between border-b border-r border-[#1b4332]/15 bg-[#1b4332] p-5 sm:p-6 md:p-8 text-left transition-colors duration-300 hover:bg-[#36B936]';

  const renderCta = (visibilityClass: string, span: number) =>
    ctaHref ? (
      <Link href={ctaHref} className={`${ctaClassName} ${visibilityClass}`} style={{ gridColumn: `span ${span} / span ${span}` }}>
        {ctaContent}
      </Link>
    ) : (
      <div className={`${ctaClassName} ${visibilityClass}`} style={{ gridColumn: `span ${span} / span ${span}` }}>
        {ctaContent}
      </div>
    );

  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-20 lg:py-24 font-['Manrope',sans-serif]">
      <div className="mx-auto max-w-[1320px]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-10 sm:mb-12 md:mb-16 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <h2 className="text-xs sm:text-sm font-medium uppercase tracking-wider text-[#36B936]">{whyChooseHeader.eyebrow}</h2>
          </div>

          <h2 className="mx-auto max-w-[720px] text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight text-[#1b4332]">
            {whyChooseHeader.heading}
          </h2>

          <p className="mx-auto mt-4 sm:mt-5 max-w-[520px] text-xs sm:text-sm font-light leading-relaxed text-[#2d6a4f]">
            {whyChooseHeader.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[#1b4332]/15 shadow-sm lg:grid-cols-4"
        >
          {choiceItems.map((item, i) => {
            const Icon = iconMap[item.id];
            return (
              <div
                key={item.id}
                className="group flex flex-col justify-between border-b border-r border-[#1b4332]/15 bg-white p-5 sm:p-6 md:p-8 transition-colors duration-300 hover:bg-[#36B936]"
              >
                <div className="flex-1">
                  <span className="mb-4 sm:mb-6 md:mb-8 block text-[10px] sm:text-[11px] font-medium tracking-wide text-[#1b4332]/40 transition-colors duration-300 group-hover:text-white/70">
                    {String(i + 1).padStart(2, '0')}.
                  </span>

                  <Icon
                    className="mb-4 sm:mb-6 md:mb-8 h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-[#36B936] transition-colors duration-300 group-hover:text-white"
                    strokeWidth={1.25}
                  />

                  <h3 className="mb-1.5 sm:mb-2 text-sm sm:text-base md:text-xl font-medium tracking-tight text-[#1b4332] transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h3>
                </div>

                <p className="mt-2 text-[11px] sm:text-xs md:text-sm font-light leading-relaxed text-[#2d6a4f] transition-colors duration-300 group-hover:text-white/85">
                  {item.description}
                </p>
              </div>
            );
          })}

          {emptyCellsMobile > 0 && renderCta('max-lg:flex lg:hidden', emptyCellsMobile)}
          {emptyCellsDesktop > 0 && renderCta('hidden lg:flex', emptyCellsDesktop)}
        </motion.div>
      </div>
    </section>
  );
}