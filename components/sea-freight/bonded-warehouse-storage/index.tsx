'use client';

import { ArrowRight, type LucideIcon, Warehouse, CheckCircle2, Clock, Repeat } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.2, 0.8, 0.2, 1] as const;

type StorageRowItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const ITEMS: StorageRowItem[] = [
  {
    icon: Warehouse,
    title: 'What Is Bonded Storage',
    description:
      'Customs-approved storage for imported goods, held under supervision before duties and taxes are paid.',
  },
  {
    icon: CheckCircle2,
    title: "What's Included",
    description:
      'Secure storage, inventory reporting, inspection access, and coordination on clearance documentation.',
  },
  {
    icon: Clock,
    title: 'After the Free Period',
    description: 'Per-CBM, per-day rates apply after the first 14 days, based on cargo type and volume.',
  },
  {
    icon: Repeat,
    title: 'Re-Export Option',
    description: 'Move bonded goods on to another country without paying UAE import duties.',
  },
];

// ---------------------------------------------------------------------------
// Row — full-bleed, border-separated, on a white field. A brand-green sweep
// fills in from the left on hover; text and icon flip to white against it
// for contrast. Description is hidden until hover on sm+ (mobile shows it
// inline, since there's no hover there).
// ---------------------------------------------------------------------------

function StorageRow({ item, index }: { item: StorageRowItem; index: number }) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.09 }}
      className="group relative flex w-full flex-1 items-center border-b border-[#0A4D26]/10 last:border-b-0"
    >
      {/* brand-green sweep, hover only (sm+) */}
      <div
        aria-hidden
        className="absolute inset-0 origin-left scale-x-0 bg-[#36B936] transition-transform duration-500 ease-out sm:group-hover:scale-x-100"
      />

      <div className="relative grid w-full grid-cols-1 items-center gap-3 px-4 py-5 sm:grid-cols-12 sm:gap-4 sm:px-8 sm:py-0 sm:min-h-[110px] md:gap-6 md:px-10 lg:px-16">
        <div className="flex items-center gap-3 sm:col-span-1 sm:block">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#0A4D26]/5 transition-colors duration-500 sm:h-11 sm:w-11 sm:group-hover:bg-white/15">
            <Icon className="h-4.5 w-4.5 text-[#36B936] transition-colors duration-500 sm:group-hover:text-white" strokeWidth={1.75} />
          </div>
          <span className="pointer-events-none select-none font-mono text-xs text-[#0A4D26]/30 sm:hidden">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className="text-base xs:text-lg font-medium tracking-tight text-[#0A4D26] transition-colors duration-500 sm:col-span-6 sm:text-[1.3rem] sm:group-hover:text-white lg:text-[1.4rem]">
          {item.title}
        </h3>

        <p className="text-sm font-light leading-relaxed text-[#0A4D26]/60 transition-all duration-500 sm:col-span-4 sm:overflow-hidden sm:text-[0.95rem] sm:opacity-0 sm:max-h-0 sm:group-hover:max-h-40 sm:group-hover:opacity-100 sm:group-hover:text-white/85">
          {item.description}
        </p>

        <span
          aria-hidden
          className="flex justify-start text-[#0A4D26] opacity-100 transition-all duration-500 ease-out sm:col-span-1 sm:justify-end sm:opacity-0 sm:group-hover:translate-x-1 sm:group-hover:text-white sm:group-hover:opacity-100"
        >
          <ArrowRight className="h-5 w-5" strokeWidth={2} />
        </span>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

interface BondedWarehouseStorageProps {
  onLearnMore?: () => void;
  contactHref?: string;
}

export default function BondedWarehouseStorage({
  onLearnMore,
  contactHref = '#contact',
}: BondedWarehouseStorageProps) {
  return (
    <section
      id="bonded-storage"
      aria-label="Bonded warehouse storage"
      className="flex w-full flex-col bg-white px-4 py-[clamp(3rem,8vw,6rem)] sm:px-6 lg:px-10 font-sans"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mx-auto flex w-full max-w-[1320px] flex-col items-center text-center pb-8 sm:pb-14"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-[#36B936] font-medium text-xs sm:text-sm tracking-wider uppercase">
            Storage Solutions
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#0A4D26] leading-[1.15] max-w-[720px] mx-auto">
          Bonded Warehouse Storage
        </h2>
        <p className="mt-4 sm:mt-5 text-[#0A4D26]/75 font-light text-sm sm:text-lg leading-relaxed max-w-[560px]">
          Every sea freight shipment through Zajel includes 14 days of complimentary bonded storage at our
          warehouse facility — time to arrange customs clearance, coordinate onward distribution, or
          consolidate incoming shipments before final delivery.
        </p>
      </motion.div>

      <div className="mx-auto flex w-full max-w-6xl flex-col border-t border-[#0A4D26]/10">
        {ITEMS.map((item, index) => (
          <StorageRow key={item.title} item={item} index={index} />
        ))}
      </div>

      {/* CTA — centered */}
      <div className="mx-auto mt-[clamp(2.5rem,6vw,4.5rem)] flex flex-col items-center gap-5 text-center">
        {/* Same button style as the solutions cards */}
        <button
          type="button"
          onClick={onLearnMore}
          className="bg-[#36B936] hover:bg-[#31a631] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-[#0B140F] rounded-full inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-[13px] shadow-sm font-medium tracking-wide"
        >
          <span>Learn More About Our Warehousing</span>
          <span aria-hidden="true">→</span>
        </button>

        <a
          href={contactHref}
          className="text-sm text-[#0A4D26]/60 underline decoration-[#0A4D26]/20 underline-offset-4 transition-colors duration-300 hover:text-[#0A4D26] hover:decoration-[#36B936]"
        >
          Contact Us for Storage Rates
        </a>
      </div>
    </section>
  );
}