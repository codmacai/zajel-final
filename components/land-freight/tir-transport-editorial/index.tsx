'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { ChevronDown, DollarSign, Globe, Layers, ShieldCheck, Zap } from 'lucide-react';

/*
  Palette (same as the rest of the site, used consistently):
    • Accent   #36B936  – eyebrows, icons, active states, primary button
    • Deep     #064423  – headings, dark hero card, borders/muted text at low opacity
    • Surface  #FAFBF8 (section) / white (cards)

  Breakpoints used:
    mobile  < 640px      (base)
    sm      ≥ 640px      large phones / small tablets
    md      ≥ 768px      tablets
    lg      ≥ 1024px     laptops / desktop (two-column layouts start here)
    xl      ≥ 1280px     desktop
    2xl     ≥ 1536px     large desktop
    1920px+              extra-large / ultrawide
*/

const EASE = [0.2, 0.8, 0.2, 1] as const;

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: EASE, delay },
});

type TirItem = {
  id: string;
  title: string;
  description: string;
  icon: typeof Zap;
};

const TIR_BENEFITS: TirItem[] = [
  {
    id: '01',
    title: 'Faster border crossings',
    description:
      'TIR-covered shipments pass through customs with reduced inspections and paperwork at each border, saving hours or even days on multi-country routes.',
    icon: Zap,
  },
  {
    id: '02',
    title: 'Single guarantee system',
    description:
      'The TIR Carnet serves as an internationally recognized customs guarantee, eliminating the need for separate bonds or deposits at each country of transit.',
    icon: ShieldCheck,
  },
  {
    id: '03',
    title: 'Sealed container integrity',
    description:
      'Goods travel in sealed vehicles from origin to destination. The seal is verified at borders without unloading, reducing handling risk and transit time.',
    icon: Layers,
  },
  {
    id: '04',
    title: 'Multi-country coverage',
    description:
      'TIR is recognized in over 77 countries across Europe, the Middle East, Central Asia, and North Africa, making it the standard for overland trade on routes from the UAE through the GCC, Jordan, Turkey, and into Europe.',
    icon: Globe,
  },
  {
    id: '05',
    title: 'Cost efficiency',
    description:
      'By reducing border delays and eliminating the need for multiple transit guarantees, TIR lowers the overall cost of multi-border land freight operations.',
    icon: DollarSign,
  },
];

const HERO_CHIPS = ['Administered by the IRU', '77+ countries', 'Sealed vehicles'];

/* Primary button: same recipe as the site's main CTA (min-h keeps a comfortable touch target) */
const PRIMARY_BTN =
  'inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#36B936] px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.55rem,1vw,0.85rem)] text-xs font-medium text-[#0B140F] shadow-md transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#064423] sm:w-auto sm:text-sm cursor-pointer';

function TirAccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: TirItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = item.icon;
  const triggerId = `tir-trigger-${item.id}`;
  const panelId = `tir-panel-${item.id}`;

  return (
    <div className={`relative transition-colors duration-300 ${isOpen ? 'bg-[#36B936]/[0.05]' : 'hover:bg-[#064423]/[0.02]'}`}>
      {/* Active indicator */}
      <span
        aria-hidden
        className={`pointer-events-none absolute left-0 top-0 h-full w-[3px] origin-top bg-[#36B936] transition-transform duration-300 ${
          isOpen ? 'scale-y-100' : 'scale-y-0'
        }`}
      />

      <button
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center gap-3 px-4 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#36B936] min-[400px]:gap-4 min-[400px]:px-5 sm:px-6 sm:py-5 2xl:px-8 2xl:py-6"
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 2xl:h-10 2xl:w-10 ${
            isOpen ? 'bg-[#36B936] text-white' : 'bg-[#36B936]/10 text-[#36B936]'
          }`}
        >
          <Icon className="h-[18px] w-[18px] 2xl:h-5 2xl:w-5" strokeWidth={1.6} />
        </span>

        <span className="min-w-0 flex-1 text-[0.9375rem] font-medium leading-snug tracking-tight text-[#064423] sm:text-base 2xl:text-lg">
          {item.title}
        </span>

        <span className="hidden text-xs font-medium tabular-nums text-[#064423]/30 sm:block">{item.id}</span>

        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-[#36B936]' : 'text-[#064423]/40'
          }`}
          strokeWidth={1.75}
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={`grid px-4 transition-all duration-300 ease-in-out min-[400px]:px-5 sm:px-6 2xl:px-8 ${
          isOpen ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] pb-0 opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          {/* Left padding lines the text up with the title (icon 36px + gap) */}
          <p className="max-w-2xl pr-2 text-sm font-light leading-relaxed text-[#064423]/70 pl-12 min-[400px]:pl-[52px] 2xl:pl-14 2xl:text-base">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

interface TirTransportEditorialProps {
  heroImageSrc?: string;
  heroImageAlt?: string;
  onRequestQuote?: () => void;
  /** If set, the quote button renders as a link to this URL (onRequestQuote still fires on click). */
  quoteHref?: string;
  onLearnMoreCustoms?: () => void;
  customsHref?: string;
}

const TirTransportEditorial = ({
  heroImageSrc = '/landfreight/tir-transport.png',
  heroImageAlt = 'International Logistics and TIR Transport',
  onRequestQuote,
  quoteHref,
  onLearnMoreCustoms,
  customsHref = '/customs-clearance',
}: TirTransportEditorialProps) => {
  const [openId, setOpenId] = useState<string | null>('01');

  const toggleItem = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  const quoteLabel = (
    <>
      <span>Request a Land Freight Quote</span>
      <span aria-hidden="true">→</span>
    </>
  );

  return (
    <section className="relative w-full overflow-hidden bg-[#FAFBF8] py-[clamp(3.5rem,9vw,8rem)] font-['Manrope',sans-serif] text-[#064423]">
      <div className="relative mx-auto flex max-w-[1240px] flex-col gap-[clamp(2.5rem,6vw,5rem)] px-[clamp(1rem,5vw,2.75rem)] 2xl:max-w-[1400px] min-[1920px]:max-w-[1560px]">
        {/* Header */}
        <motion.div {...reveal()} className="max-w-[760px] text-left 2xl:max-w-[880px]">
          <div className="mb-3 flex items-center gap-3 sm:mb-4">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#36B936] sm:text-xs md:text-sm">
              Global Customs Transit
            </span>
          </div>
          <h2 className="text-balance text-[1.625rem] font-medium leading-[1.15] tracking-tight text-[#064423] min-[400px]:text-[1.75rem] sm:text-3xl md:text-4xl lg:text-[2.5rem] 2xl:text-[3rem]">
            TIR: Simplified International Road Transport
          </h2>
          <p className="mt-3 max-w-[62ch] text-[0.9375rem] font-light leading-relaxed text-[#064423]/70 sm:mt-4 sm:text-base 2xl:max-w-[70ch] 2xl:text-lg">
            Zajel utilizes the TIR (Transports Internationaux Routiers) system for international road freight shipments,
            enabling faster border crossings and simplified customs procedures across multiple countries in a single
            journey.
          </p>
        </motion.div>

        {/* What is TIR: deep green card over the photo */}
        <motion.div
          {...reveal(0.05)}
          className="relative overflow-hidden rounded-[1.5rem] bg-[#064423] shadow-[0_24px_60px_-24px_rgba(6,68,35,0.45)] sm:rounded-[2rem]"
        >
          <div className="absolute inset-0" aria-hidden>
            <Image
              src={heroImageSrc}
              alt={heroImageAlt}
              fill
              sizes="(min-width: 1920px) 1560px, (min-width: 1536px) 1400px, (min-width: 1024px) 1240px, 100vw"
              className="object-cover object-center opacity-40"
            />
            {/* Top-to-bottom on small screens (text spans full width); left-to-right from md up */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#064423]/95 to-[#064423]/80 md:bg-gradient-to-r md:from-[#064423] md:via-[#064423]/90 md:to-[#064423]/40" />
          </div>

          <div className="relative p-[clamp(1.5rem,4vw,3.5rem)] text-left text-white 2xl:p-16">
            <div className="max-w-3xl 2xl:max-w-4xl">
              <span className="mb-2.5 block text-[11px] font-medium uppercase tracking-wider text-[#36B936] sm:mb-3 sm:text-xs">
                Core Foundation
              </span>
              <h3 className="mb-3 text-[1.375rem] font-medium tracking-tight text-white sm:mb-4 sm:text-[1.75rem] 2xl:text-[2rem]">
                What is TIR?
              </h3>
              <p className="text-[0.875rem] font-light leading-[1.7] text-white/75 sm:text-base 2xl:text-[1.0625rem]">
                The TIR Convention is an international customs transit system administered by the International Road
                Transport Union (IRU). It allows goods to move across international borders in sealed vehicles or
                containers with minimal customs intervention at each crossing point. Instead of inspecting and
                processing cargo at every border, customs authorities accept the{' '}
                <strong className="font-medium text-white underline decoration-[#36B936] decoration-2 underline-offset-4">
                  TIR Carnet
                </strong>{' '}
                as a guarantee, significantly reducing clearance times.
              </p>

              <ul className="mt-5 flex flex-wrap gap-2 sm:mt-6">
                {HERO_CHIPS.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-sm sm:px-3.5 sm:text-xs"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Advantages: stacked on mobile/tablet, side-by-side from lg */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <motion.div
            {...reveal()}
            className="min-w-0 text-left lg:sticky lg:top-28 lg:col-span-5 lg:self-start xl:col-span-4"
          >
            <span className="mb-2.5 block text-[11px] font-medium uppercase tracking-wider text-[#36B936] sm:mb-3 sm:text-xs md:text-sm">
              Advantages
            </span>
            <h3 className="text-balance text-[1.375rem] font-medium leading-[1.2] tracking-tight text-[#064423] sm:text-[1.75rem] 2xl:text-[2rem]">
              How TIR benefits your shipment
            </h3>
            <p className="mt-2 text-sm font-light text-[#064423]/60 sm:mt-3">{TIR_BENEFITS.length} key advantages</p>
          </motion.div>

          <motion.div
            {...reveal(0.1)}
            className="min-w-0 overflow-hidden rounded-[1.25rem] border border-[#064423]/10 bg-white shadow-[0_1px_2px_rgba(6,68,35,0.04),0_16px_40px_-20px_rgba(6,68,35,0.12)] sm:rounded-[1.5rem] lg:col-span-7 xl:col-span-8"
          >
            <div className="divide-y divide-[#064423]/10">
              {TIR_BENEFITS.map((item) => (
                <TirAccordionRow
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => toggleItem(item.id)}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Operational scope + CTA */}
        <motion.div
          {...reveal()}
          className="rounded-[1.5rem] border border-[#064423]/10 bg-white p-[clamp(1.25rem,3.5vw,2.75rem)] text-left shadow-[0_1px_2px_rgba(6,68,35,0.04),0_16px_40px_-20px_rgba(6,68,35,0.12)] sm:rounded-[2rem] 2xl:p-14"
        >
          <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-8">
              <span className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-[#36B936] sm:text-xs">
                Operational Scope
              </span>
              <h4 className="mb-2 text-lg font-medium tracking-tight text-[#064423] sm:mb-2.5 sm:text-2xl 2xl:text-[1.75rem]">
                When Zajel uses TIR
              </h4>
              <p className="max-w-[68ch] text-sm font-light leading-[1.7] text-[#064423]/70 sm:text-[0.9375rem] 2xl:max-w-[76ch] 2xl:text-base">
                TIR is applied on international land freight routes that cross two or more borders, particularly on
                corridors from the UAE through Saudi Arabia, Jordan, and Turkey into European destinations. Our team
                determines the optimal customs transit method for each shipment based on the route and cargo type.
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-4 sm:items-start lg:col-span-4 lg:items-end">
              {quoteHref ? (
                <Link href={quoteHref} onClick={onRequestQuote} className={PRIMARY_BTN}>
                  {quoteLabel}
                </Link>
              ) : (
                <button type="button" onClick={onRequestQuote} className={PRIMARY_BTN}>
                  {quoteLabel}
                </button>
              )}

              <a
                href={customsHref}
                onClick={(e) => {
                  if (onLearnMoreCustoms) {
                    e.preventDefault();
                    onLearnMoreCustoms();
                  }
                }}
                className="text-center text-sm font-medium tracking-tight text-[#064423]/80 underline decoration-[#36B936]/60 underline-offset-4 transition-colors duration-200 hover:text-[#36B936] sm:text-left lg:text-right"
              >
                Learn more about our customs clearance services
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TirTransportEditorial;