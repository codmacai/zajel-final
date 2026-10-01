'use client';

import { ArrowRight, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.2, 0.8, 0.2, 1] as const;

const DARK = '#0D2A22';
const LIGHT = '#ffffff';
const LIME = '#36b936';

const HEADING = 'Marine Cargo Insurance';

const INTRO =
  'Protect your sea freight shipment against loss, damage, or delay during transit. Cargo insurance is available as a value added service across all Zajel freight services, including sea freight, air freight, and land freight.';

type Tone = 'dark' | 'light' | 'lime';

interface CoverageTier {
  letter: string;
  title: string;
  category: string;
  tagline: string;
  premium: string;
  features: string[];
  tag: string;
  tone: Tone;
}

const TIERS: CoverageTier[] = [
  {
    letter: 'C',
    title: 'Institute Cargo Clause C',
    category: 'Named Perils',
    tagline: 'Essential protection for standard, lower-risk cargo and routes',
    premium: 'Lower premium',
    features: ['Vessel sinking or stranding', 'Fire or collision', 'General average contribution', 'Basic transit cover'],
    tag: 'Named Perils',
    tone: 'dark',
  },
  {
    letter: 'A',
    title: 'Institute Cargo Clause A',
    category: 'All Risks',
    tagline: 'Our recommended level for high-value or sensitive cargo',
    premium: 'Broadest coverage',
    features: [
      'All physical loss or damage',
      'Except specific exclusions',
      'Water damage & handling incidents',
      'Theft, pilferage & non-delivery',
      'Priority claims handling',
    ],
    tag: 'Most Selected',
    tone: 'lime',
  },
  {
    letter: 'B',
    title: 'Institute Cargo Clause B',
    category: 'Broader Named Perils',
    tagline: 'Wider protection than Clause C at a moderate premium',
    premium: 'Mid premium',
    features: ['Everything in Clause C', 'Water damage', 'Cargo handling incidents', 'Earthquake & volcanic eruption'],
    tag: 'Broader Perils',
    tone: 'light',
  },
];

const toneStyles: Record<Tone, { bg: string; text: string; textMuted: string; tagBorder: string; divider: string }> = {
  dark: {
    bg: DARK,
    text: LIME,
    textMuted: 'rgba(54, 185, 54, 0.8)',
    tagBorder: 'rgba(54, 185, 54, 0.35)',
    divider: 'rgba(255,255,255,0.14)',
  },
  light: {
    bg: LIGHT,
    text: LIME,
    textMuted: `${LIME}B3`,
    tagBorder: `${LIME}4D`,
    divider: `${DARK}1F`,
  },
  lime: {
    bg: LIME,
    text: DARK,
    textMuted: `${DARK}B3`,
    tagBorder: `${DARK}59`,
    divider: `${DARK}26`,
  },
};

const FacetTag = ({ label, borderColor, textColor }: { label: string; borderColor: string; textColor: string }) => (
  <span
    className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 border text-xs sm:text-[13px] font-light shrink-0 whitespace-nowrap"
    style={{
      borderColor,
      color: textColor,
      clipPath: 'polygon(14px 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 14px 100%, 0 50%)',
    }}
  >
    {label}
  </span>
);

interface TierCardProps {
  tier: CoverageTier;
  index: number;
  onSelect?: () => void;
}

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

const TierCard = ({ tier, index, onSelect }: TierCardProps) => {
  const t = toneStyles[tier.tone];
  const isDarkTone = tier.tone === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.15 }}
      className="relative flex-1 min-w-0 flex flex-col"
      style={{ backgroundColor: t.bg }}
    >
      <div className="h-full flex flex-col items-start gap-5 sm:gap-6 py-10 sm:py-16 lg:py-20 px-5 sm:px-10 lg:px-12 relative overflow-hidden">
        {/* watermark clause letter */}
        <span
          aria-hidden
          className={cx(
            'pointer-events-none absolute right-4 top-2 select-none font-semibold leading-none tracking-tighter',
            isDarkTone ? 'text-white/[0.04]' : tier.tone === 'lime' ? 'text-white/[0.1]' : 'text-[#0A4D26]/[0.04]'
          )}
          style={{ fontSize: 'clamp(6rem,12vw,9rem)' }}
        >
          {tier.letter}
        </span>

        <div className="relative inline-block">
          <span
            className="leading-tight tracking-tight text-[1.05rem] sm:text-[1.15rem] font-medium"
            style={{ color: isDarkTone ? '#ffffff' : t.text }}
          >
            {tier.title}
          </span>
          <span className="block mt-2 text-sm font-light tracking-wide" style={{ color: t.textMuted }}>
            {tier.category}
          </span>
        </div>

        <div>
          <p
            className="font-light leading-relaxed text-sm sm:text-[15px] mb-4"
            style={{ color: isDarkTone ? 'rgba(255,255,255,0.75)' : t.textMuted }}
          >
            {tier.tagline}
          </p>
          <FacetTag label={tier.tag} borderColor={t.tagBorder} textColor={t.textMuted} />
        </div>

        <div className="w-full pt-2" style={{ borderTop: `1px solid ${t.divider}` }} />

        <div className="w-full">
          <span
            className="block mb-3 text-[11px] font-medium tracking-[0.04em]"
            style={{ color: isDarkTone ? 'rgba(255,255,255,0.45)' : 'rgba(10,77,38,0.4)' }}
          >
            COVERAGE INCLUDES
          </span>
          <ul className="space-y-3 sm:space-y-3.5 w-full">
            {tier.features.map((feature, i) => (
              <li
                key={feature}
                className="flex items-start gap-3 pb-3 sm:pb-3.5"
                style={{ borderBottom: i < tier.features.length - 1 ? `1px solid ${t.divider}` : undefined }}
              >
                <svg className="mt-1 shrink-0 w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="8" fill={isDarkTone ? LIME : t.text} />
                  <path
                    d="M4.8 8.2 L7 10.4 L11.2 5.8"
                    stroke={isDarkTone ? DARK : t.bg}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className="font-light leading-relaxed text-sm sm:text-[0.95rem]"
                  style={{ color: isDarkTone ? 'rgba(255,255,255,0.85)' : t.textMuted }}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto w-full pt-4 sm:pt-6 flex flex-col gap-4">
          <span
            className="inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-medium"
            style={{
              backgroundColor: isDarkTone ? 'rgba(255,255,255,0.1)' : tier.tone === 'lime' ? 'rgba(13,42,34,0.1)' : 'rgba(10,77,38,0.05)',
              color: isDarkTone ? '#fff' : t.text,
            }}
          >
            {tier.premium}
          </span>

          <button
            type="button"
            onClick={onSelect}
            className={cx(
              'w-full rounded-xl py-3 text-sm font-medium transition-all duration-300',
              tier.tone === 'lime'
                ? 'bg-[#0D2A22] text-white hover:bg-[#154235]'
                : isDarkTone
                ? 'bg-white text-[#0A4D26] hover:bg-white/90'
                : 'bg-[#0A4D26] text-white hover:bg-[#08391c]'
            )}
          >
            Get a Quote
          </button>
        </div>
      </div>
    </motion.div>
  );
};

interface MarineCargoInsuranceProps {
  onRequestQuote?: () => void;
  seaFreightQuoteHref?: string;
}

const MarineCargoInsurance = ({ onRequestQuote, seaFreightQuoteHref = '#sea-freight-quote' }: MarineCargoInsuranceProps) => {
  return (
    <section className="w-full py-12 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-white overflow-hidden font-sans">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto flex w-full max-w-[1320px] flex-col items-center text-center pb-8 sm:pb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-[#36B936] font-medium text-xs sm:text-sm tracking-wider uppercase">
              Cargo Protection
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#0A4D26] leading-[1.15] max-w-[720px] mx-auto">
            {HEADING}
          </h2>
          <p className="mt-4 sm:mt-5 text-[#0A4D26]/75 font-light text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed max-w-[560px]">
            {INTRO}
          </p>
        </motion.div>

        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-[#e2ece9]">
          <div className="flex flex-col lg:flex-row">
            {TIERS.map((tier, index) => (
              <TierCard key={tier.title} tier={tier} index={index} onSelect={onRequestQuote} />
            ))}
          </div>
        </div>

        {/* Detail panel & liability note */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="mt-8 sm:mt-12 overflow-hidden rounded-xl sm:rounded-2xl ring-1 ring-[#0A4D26]/10 shadow-[0_1px_2px_rgba(10,77,38,0.04)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-[#0A4D26]/10 bg-white">
            <div className="p-[clamp(1.5rem,4vw,2.75rem)]">
              <h3 className="mb-2.5 text-[clamp(1rem,1.7vw,1.1rem)] font-medium tracking-tight text-[#0A4D26]">
                What&apos;s Covered
              </h3>
              <p className="text-[13.5px] leading-relaxed text-[#0A4D26]/60 font-light">
                Marine cargo insurance covers physical loss or damage to your goods while in transit by sea
                — including vessel sinking, collision, fire, water damage, and cargo handling incidents
                during loading and unloading.
              </p>
            </div>

            <div className="p-[clamp(1.5rem,4vw,2.75rem)] border-t border-[#0A4D26]/10 md:border-t-0">
              <h3 className="mb-2.5 text-[clamp(1rem,1.7vw,1.1rem)] font-medium tracking-tight text-[#0A4D26]">
                How to Add Insurance
              </h3>
              <p className="text-[13.5px] leading-relaxed text-[#0A4D26]/60 font-light">
                Insurance can be added at the time of booking or before your shipment departs. Coverage is
                calculated as a percentage of the declared cargo value — contact our team for a quote based
                on your shipment details.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-t border-[#0A4D26]/10 bg-[#0D2A22] p-[clamp(1.25rem,3.5vw,2.25rem)]">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#36B936]/15">
              <ShieldAlert className="h-5 w-5 text-[#36B936]" strokeWidth={1.75} />
            </div>
            <p className="text-[13.5px] leading-relaxed text-white/70 font-light">
              <span className="font-medium text-white">Standard carrier liability</span> under international
              shipping conventions provides limited coverage based on weight, not value. Cargo insurance
              ensures your goods are protected at their full declared value.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="mt-[clamp(2.5rem,6vw,4.5rem)] flex flex-col items-center gap-5 text-center"
        >
          <button
            type="button"
            onClick={onRequestQuote}
            className="group inline-flex items-center gap-3 rounded-full bg-[#36B936] py-2.5 pl-6 pr-2.5 sm:pl-7 text-sm font-medium text-white shadow-[0_1px_2px_rgba(10,77,38,0.15)] transition-shadow duration-300 hover:shadow-[0_10px_24px_rgba(10,77,38,0.28)]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
              Request an Insurance Quote
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[135deg]">
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </span>
          </button>

          <a
            href={seaFreightQuoteHref}
            className="text-sm font-medium text-[#0A4D26]/60 underline decoration-[#0A4D26]/20 underline-offset-4 transition-colors duration-300 hover:text-[#0A4D26] hover:decoration-[#36B936]"
          >
            Get a Sea Freight Quote
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default MarineCargoInsurance;
