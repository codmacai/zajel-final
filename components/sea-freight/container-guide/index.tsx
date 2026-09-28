'use client';

import { useState, useEffect, type ComponentType } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, PackageOpen, Layers, Snowflake, Droplet, Check, Maximize2 } from 'lucide-react';

const BRAND = {
  deepA: '#0A5A2E',
  deepB: '#064423',
  deepC: '#053A20',
  deepD: '#04321C',
  accent: '#36B936',
  ink: '#064423',
  hairline: 'rgba(6,68,35,0.12)',
};

const EASE = [0.22, 1, 0.36, 1] as const;
const smoothTransition = { duration: 0.5, ease: EASE };

type ContainerEntry = {
  size: string;
  name: string;
  dims: string;
  door: string;
  capacity: string;
  tare: string;
  maxCargo: string;
  description: string;
  image: string;
};

type Category = {
  id: 'dry' | 'open-top' | 'flat-rack' | 'reefer' | 'tank';
  label: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  entries: ContainerEntry[];
};

const CATEGORIES: Category[] = [
  {
    id: 'dry',
    label: 'Dry Container',
    icon: Box,
    entries: [
      {
        size: "20'",
        name: "20' Standard",
        dims: '5.895 × 2.350 × 2.392 m',
        door: '2.340 × 2.292 m',
        capacity: '33 CBM',
        tare: '2,230 kg',
        maxCargo: '28,230 kg',
        description:
          'Standard, weatherproof container for general dry cargo — furniture, clothing, electronics, packaged goods. Fully enclosed with end doors for loading/unloading.',
        image: '/containers/dry-standard.png',
      },
      {
        size: "40'",
        name: "40' Standard",
        dims: '12.029 × 2.350 × 2.392 m',
        door: '2.340 × 2.292 m',
        capacity: '67 CBM',
        tare: '3,780 kg',
        maxCargo: '26,700 kg',
        description:
          "Same general-purpose use as the 20' Standard, with double the length for cargo where space matters more than weight.",
        image: '/containers/dry-standard.png',
      },
      {
        size: "40' HC",
        name: "40' High Cube",
        dims: '12.024 × 2.350 × 2.697 m',
        door: '2.340 × 2.597 m',
        capacity: '76 CBM',
        tare: '4,020 kg',
        maxCargo: '26,460 kg',
        description: "Same footprint as the 40' Standard but taller, for cargo that needs extra headroom.",
        image: '/containers/dry-standard.png',
      },
      {
        size: "45' HC",
        name: "45' High Cube",
        dims: '13.556 × 2.352 × 2.700 m',
        door: '2.340 × 2.597 m',
        capacity: '86 CBM',
        tare: '4,800 kg',
        maxCargo: '27,700 kg',
        description: "Extra length and height beyond the 40' HC — maximum volume for larger shipments.",
        image: '/containers/dry-standard.png',
      },
    ],
  },
  {
    id: 'open-top',
    label: 'Open-Top',
    icon: PackageOpen,
    entries: [
      {
        size: "20'",
        name: "20' Open-Top",
        dims: '5.888 × 2.345 × 2.315 m',
        door: '2.286 × 2.184 m',
        capacity: '32 CBM',
        tare: '2,250 kg',
        maxCargo: '30,480 kg',
        description:
          "For over-height or awkward dry cargo that won't fit through standard doors. Removable roof bows and tarpaulin allow top-loading of machinery, pipes, timber, and construction equipment.",
        image: '/containers/open-top.png',
      },
      {
        size: "40'",
        name: "40' Open-Top",
        dims: '12.029 × 2.342 × 2.326 m',
        door: '2.341 × 2.274 m',
        capacity: '65 CBM',
        tare: '3,810 kg',
        maxCargo: '26,670 kg',
        description: "Same top-loading design as the 20' Open-Top, with extra length for bulkier oversized cargo.",
        image: '/containers/open-top.png',
      },
    ],
  },
  {
    id: 'flat-rack',
    label: 'Flat-Rack',
    icon: Layers,
    entries: [
      {
        size: "20'",
        name: "20' Flat-Rack",
        dims: '5.698 × 2.230 × 2.255 m',
        door: 'N/A',
        capacity: '—',
        tare: '2,500 kg',
        maxCargo: '21,500 kg',
        description:
          'Open-sided flat platform with fixed or collapsible end walls, for heavy or irregularly shaped cargo — machinery, yachts, vehicles, industrial equipment.',
        image: '/containers/flat-rack.png',
      },
      {
        size: "40'",
        name: "40' Flat-Rack",
        dims: '11.832 × 2.228 × 1.981 m',
        door: 'N/A',
        capacity: '—',
        tare: '4,200 kg',
        maxCargo: '40,800 kg',
        description: 'Longer platform version of the Flat-Rack, for larger, heavier shipments that exceed standard container dimensions.',
        image: '/containers/flat-rack.png',
      },
    ],
  },
  {
    id: 'reefer',
    label: 'Reefer',
    icon: Snowflake,
    entries: [
      {
        size: "20'",
        name: "20' Reefer",
        dims: '5.724 × 2.286 × 2.014 m',
        door: '2.286 × 2.067 m',
        capacity: '26 CBM',
        tare: '2,550 kg',
        maxCargo: '21,450 kg',
        description:
          'Temperature-controlled container with an integrated refrigeration unit, for perishable and sensitive goods — food, pharmaceuticals, meat, seafood, chemicals.',
        image: '/containers/reefer.png',
      },
      {
        size: "40'",
        name: "40' Reefer",
        dims: '11.840 × 2.286 × 2.120 m',
        door: '2.286 × 2.195 m',
        capacity: '60 CBM',
        tare: '3,850 kg',
        maxCargo: '26,630 kg',
        description: "Same temperature-controlled function as the 20' Reefer, sized for larger volumes of perishable cargo.",
        image: '/containers/reefer.png',
      },
    ],
  },
  {
    id: 'tank',
    label: 'ISO Tank',
    icon: Droplet,
    entries: [
      {
        size: "20'",
        name: "20' ISO Tank",
        dims: '6.058 × 2.438 × 2.438 m',
        door: 'N/A',
        capacity: '24,000–26,000 L',
        tare: '4,190 kg',
        maxCargo: '26,290 kg',
        description:
          'For safe transport of bulk liquids — chemicals, food-grade products, fuel, gases — under regulated pressure. Available in classifications (T11, T14, T50, T75) for hazardous and non-hazardous substances; can include insulation or heating for temperature-sensitive liquids.',
        image: '/containers/iso-tank.png',
      },
    ],
  },
];

function specHighlights(entry: ContainerEntry): string[] {
  const lines: string[] = [];
  if (entry.capacity !== '—') lines.push(`Holds up to ${entry.capacity} of cargo`);
  if (entry.door !== 'N/A') lines.push(`Door opening of ${entry.door}`);
  lines.push(`Rated for ${entry.maxCargo} of payload`);
  return lines;
}

function EntryPanel({ category, entry }: { category: Category; entry: ContainerEntry }) {
  const highlights = specHighlights(entry);

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-[40px_1fr_1.1fr] rounded-[1.25rem] sm:rounded-[1.75rem] overflow-hidden border bg-white shadow-2xl"
      style={{ borderColor: BRAND.hairline, boxShadow: '0 30px 70px -25px rgba(0,0,0,0.45)' }}
    >
      <div className="hidden lg:flex flex-col items-center gap-4 py-10 border-r" style={{ borderColor: BRAND.hairline }} />

      {/* Editorial copy */}
      <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
        <span className="lg:hidden inline-block text-[12px] font-medium mb-3" style={{ color: BRAND.accent }}>
          {category.label}
        </span>

        <h3 className="text-neutral-900 text-[1.5rem] xs:text-[1.7rem] sm:text-[2.15rem] font-medium leading-[1.12] tracking-tight mb-3 sm:mb-4">
          {entry.name}
        </h3>

        <p className="text-neutral-600 text-[0.9rem] sm:text-[0.98rem] leading-relaxed mb-5 sm:mb-6 max-w-md">
          {entry.description}
        </p>

        <ul className="flex flex-col gap-2.5 sm:gap-3 mb-6 sm:mb-7">
          {highlights.map((line) => (
            <li key={line} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0"
                style={{ background: BRAND.ink }}
              >
                <Check size={12} strokeWidth={3} color="#FFFFFF" />
              </span>
              <span className="text-[0.88rem] sm:text-[0.95rem] text-neutral-700">{line}</span>
            </li>
          ))}
        </ul>

        <div className="pl-5 border-l-2" style={{ borderColor: BRAND.accent }}>
          <p className="text-neutral-700 text-[0.85rem] sm:text-[0.9rem] leading-relaxed">
            Inside the box: <span className="font-medium text-neutral-900">{entry.dims}</span>, tare weight{' '}
            <span className="font-medium text-neutral-900">{entry.tare}</span>.
          </p>
        </div>
      </div>

      {/* Photo frame */}
      <div
        className="relative min-h-[260px] xs:min-h-[300px] lg:min-h-[440px] m-3 sm:m-5 lg:my-6 lg:mr-6 rounded-[1rem] sm:rounded-[1.25rem] overflow-hidden flex items-center justify-center"
        style={{
          background: `linear-gradient(180deg, ${BRAND.deepA} 0%, ${BRAND.deepB} 35%, ${BRAND.deepC} 65%, ${BRAND.deepD} 100%)`,
        }}
      >
        {category.entries.length > 1 && (
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex flex-wrap gap-2 justify-end max-w-[200px] z-20">
            {category.entries.map((e) => (
              <span
                key={e.size}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full backdrop-blur-md"
                style={
                  e.size === entry.size
                    ? { background: '#FFFFFF', color: BRAND.deepB }
                    : { background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.9)' }
                }
              >
                {e.size}
              </span>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={entry.image + entry.size}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative w-full h-full"
          >
            <Image
              src={entry.image}
              alt={entry.name}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          aria-label="View larger"
          className="absolute bottom-4 right-4 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center shadow-lg z-20 hover:scale-105 transition-transform"
        >
          <Maximize2 size={16} strokeWidth={2.2} color={BRAND.ink} />
        </button>
      </div>
    </div>
  );
}

export default function ContainerGuide() {
  const [activeCatId, setActiveCatId] = useState<Category['id']>(CATEGORIES[0].id);
  const activeCategory = CATEGORIES.find((c) => c.id === activeCatId)!;
  const [activeSize, setActiveSize] = useState<string>(activeCategory.entries[0].size);

  useEffect(() => {
    setActiveSize(activeCategory.entries[0].size);
  }, [activeCatId, activeCategory.entries]);

  const entry = activeCategory.entries.find((e) => e.size === activeSize) ?? activeCategory.entries[0];

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-20 font-sans"
      style={{ background: `linear-gradient(180deg, ${BRAND.deepB} 0%, ${BRAND.deepD} 100%)` }}
    >
      <div className="max-w-[1320px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={smoothTransition}
          className="text-center mb-[clamp(2rem,6vw,4rem)]"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px]" style={{ backgroundColor: '#36B936' }} />
            <span className="text-[#36B936] font-medium text-xs sm:text-sm tracking-wider uppercase">
              Container Guide
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white leading-[1.15] max-w-[720px] mx-auto">
            Containers used in sea freight
          </h2>

          <p className="mt-4 sm:mt-5 text-white/75 font-light text-sm sm:text-lg leading-relaxed max-w-[520px] mx-auto">
            Types, specification, purpose and feature.
          </p>
        </motion.div>

        {/* Category tabs — horizontally scrollable on small screens so nothing wraps awkwardly */}
        <div className="flex gap-2.5 mb-5 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center sm:overflow-visible no-scrollbar">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === activeCatId;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCatId(cat.id)}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0"
                style={
                  isActive
                    ? {
                        background: `linear-gradient(135deg, ${BRAND.accent} 0%, ${BRAND.deepA} 100%)`,
                        color: '#FFFFFF',
                        boxShadow: '0 10px 24px -8px rgba(54,185,54,0.5)',
                      }
                    : {
                        background: '#FFFFFF',
                        color: BRAND.ink,
                        border: `1px solid ${BRAND.hairline}`,
                      }
                }
              >
                <Icon size={15} strokeWidth={2.2} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Size sub-tabs */}
        {activeCategory.entries.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {activeCategory.entries.map((e) => {
              const isActive = e.size === activeSize;
              return (
                <button
                  key={e.size}
                  onClick={() => setActiveSize(e.size)}
                  className="px-4 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-200"
                  style={
                    isActive
                      ? { background: BRAND.ink, color: '#FFFFFF', boxShadow: '0 6px 16px -6px rgba(6,68,35,0.45)' }
                      : { background: '#FFFFFF', border: `1px solid ${BRAND.hairline}`, color: 'rgba(6,68,35,0.55)' }
                  }
                >
                  {e.size}
                </button>
              );
            })}
          </div>
        )}
        {activeCategory.entries.length === 1 && <div className="mb-8" />}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCatId}-${activeSize}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={smoothTransition}
          >
            <EntryPanel category={activeCategory} entry={entry} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}