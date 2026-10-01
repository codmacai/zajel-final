'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Snowflake, Thermometer, Wifi, ShieldCheck } from 'lucide-react';

const EASE = [0.2, 0.8, 0.2, 1] as const;

type ColdChainCard = {
  id: string;
  number: string;
  title: string;
  description: string;
  tag: string;
  icon: typeof Thermometer;
};

const COLD_CHAIN_CARDS: ColdChainCard[] = [
  {
    id: 'range',
    number: '01',
    title: 'Temperature range',
    tag: '-25°C to +25°C',
    description:
      'Our refrigerated fleet supports a range from minus 25 degrees Celsius to plus 25 degrees Celsius, covering frozen, chilled, and ambient-controlled requirements.',
    icon: Thermometer,
  },
  {
    id: 'monitoring',
    number: '02',
    title: 'Real-time monitoring',
    tag: 'Live Data Logs',
    description:
      'Every temperature-controlled shipment is equipped with monitoring devices that record temperature readings throughout the journey.',
    icon: Wifi,
  },
  {
    id: 'compliance',
    number: '03',
    title: 'GDP compliance',
    tag: 'Pharmaceutical Grade',
    description:
      'For pharmaceutical shipments, our cold chain processes align with Good Distribution Practice (GDP) requirements, ensuring that medicines and healthcare products maintain their required temperature conditions from pickup to delivery.',
    icon: ShieldCheck,
  },
];

const SUITABLE_FOR_ITEMS = [
  'Pharmaceutical products and healthcare supplies',
  'Fresh and frozen food products',
  'Beverages',
  'Chemical products requiring temperature stability',
  'Biological samples and laboratory materials',
];

interface ColdChainGridSectionProps {
  heroImageSrc?: string;
  heroImageAlt?: string;
  onRequestQuote?: () => void;
  onContactTeam?: () => void;
  contactHref?: string;
}

export default function ColdChainGridSection({
  heroImageSrc = '/landfreight/cold-chain-hero.png',
  heroImageAlt = 'Temperature Controlled Cold Chain Logistics',
  onRequestQuote,
  onContactTeam,
  contactHref = '/contact',
}: ColdChainGridSectionProps) {
  const [activeCard, setActiveCard] = useState<string>('range');

  return (
    <section
      aria-label="Temperature Controlled Land Freight"
      className="w-full relative overflow-hidden py-[clamp(4.5rem,10vw,9rem)] text-white font-sans"
      style={{
        background: 'radial-gradient(120% 140% at 78% 85%, #1F7A45 0%, #0F5C2E 32%, #0A4D26 58%, #073A1D 100%)',
      }}
    >
      <div
        className="absolute right-[-8%] bottom-[-10%] w-[55%] h-[85%] pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(54,185,54,0.25) 0%, rgba(54,185,54,0) 70%)' }}
      />
      <div
        className="absolute left-[-5%] top-[10%] w-[45%] h-[65%] pointer-events-none opacity-40 blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(54,185,54,0.3) 0%, rgba(10,77,38,0) 70%)' }}
      />
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }}
      />

      <div className="max-w-[1240px] mx-auto px-[clamp(1.25rem,5vw,2.75rem)] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-[clamp(3rem,6vw,5rem)]"
        >
          <div className="max-w-[700px]">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-[#36B936]/30 px-3 py-1 text-xs sm:text-sm font-normal tracking-wider uppercase bg-white/5 backdrop-blur-xs mb-4"
              style={{ color: '#36B936' }}
            >
              <Snowflake className="w-3 h-3" style={{ color: '#36B936' }} />
              Cold Chain Logistics
            </span>
            <h2 className="font-medium leading-[1.12] text-2xl sm:text-3xl md:text-4xl tracking-tight text-white">
              Temperature Controlled Land Freight
            </h2>
            <p className="mt-4 text-white/70 font-light text-[13px] sm:text-[13.5px] lg:text-[14px] leading-[1.65]">
              For pharmaceutical, food and beverage, chemical, and other temperature-sensitive cargo, Zajel provides dedicated cold chain land freight services across the UAE and GCC.
            </p>

            <div className="mt-8">
              <button
                type="button"
                onClick={onRequestQuote}
                className="group inline-flex items-center gap-2 rounded-full bg-[#36B936] px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.55rem,1vw,0.85rem)] text-[clamp(0.8rem,1.4vw,0.9rem)] font-medium text-[#0B140F] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:focus-visible:outline-white cursor-pointer"
              >
                <span>Request a Cold Chain Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12"
        >
          <div className="lg:col-span-7 relative rounded-[2rem] overflow-hidden border border-white/15 bg-[#06331A] min-h-[420px] flex flex-col justify-end p-8 sm:p-10 shadow-[0_30px_70px_-15px_rgba(4,32,15,0.5)]">
            <div className="absolute inset-0 z-0">
              <Image
                src={heroImageSrc}
                alt={heroImageAlt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover object-center opacity-55 transition-transform duration-1000 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06331A] via-[#06331A]/70 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-light text-white mb-4">
                <Thermometer className="w-3.5 h-3.5" style={{ color: '#36B936' }} />
                <span>Precision Range: -25°C to +25°C</span>
              </div>
              <h3 className="text-lg sm:text-xl font-medium tracking-tight text-white mb-2">
                Uncompromising Thermal Integrity
              </h3>
              <p className="text-white/70 font-light text-sm leading-relaxed max-w-xl">
                Engineered for maximum reliability across long-haul regional corridors, protecting sensitive goods under strict environmental controls.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            {COLD_CHAIN_CARDS.map((card) => {
              const Icon = card.icon;
              const isActive = activeCard === card.id;

              return (
                <div
                  key={card.id}
                  onClick={() => setActiveCard(card.id)}
                  className={`group relative rounded-[1.75rem] border p-6 transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-xl ${
                    isActive
                      ? 'bg-white/[0.12] border-[#36B936]/50 shadow-lg shadow-black/20'
                      : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <div
                    aria-hidden
                    className={`absolute left-0 top-0 bottom-0 w-1 transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ backgroundColor: '#36B936' }}
                  />

                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                          isActive ? 'text-[#0B140F]' : 'bg-white/10 text-white/90 group-hover:text-white'
                        }`}
                        style={isActive ? { backgroundColor: '#36B936' } : undefined}
                      >
                        <Icon className="w-4 h-4" strokeWidth={1.75} />
                      </div>
                      <h4 className="text-base sm:text-lg font-medium text-white tracking-tight capitalize">{card.title}</h4>
                    </div>

                    <span
                      className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/10 border border-white/10"
                      style={{ color: '#36B936' }}
                    >
                      {card.tag}
                    </span>
                  </div>

                  <p className="text-white/70 font-light text-sm leading-relaxed pl-12">{card.description}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          <div className="lg:col-span-7 rounded-[2rem] border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl p-8 sm:p-10 shadow-[0_30px_70px_-15px_rgba(4,32,15,0.5)]">
            <span className="text-xs font-normal tracking-wider uppercase block mb-2" style={{ color: '#36B936' }}>
              Suitable for
            </span>
            <h3 className="text-lg sm:text-xl font-medium tracking-tight mb-6 text-white">Cargo Applications:</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUITABLE_FOR_ITEMS.map((text, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white/[0.04] border border-white/10 rounded-xl p-3.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#36B936' }} strokeWidth={1.75} />
                  <span className="text-white/85 text-sm font-light leading-snug">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/[0.1] to-white/[0.03] backdrop-blur-2xl p-8 sm:p-10 flex flex-col justify-between shadow-[0_30px_70px_-15px_rgba(4,32,15,0.5)]">
            <div>
              <span className="text-xs font-normal tracking-wider uppercase block mb-2" style={{ color: '#36B936' }}>
                Inquiries
              </span>
              <h3 className="text-lg sm:text-xl font-medium tracking-tight mb-3 text-white">
                Need expert logistics assistance?
              </h3>
              <p className="text-white/70 font-light text-sm leading-relaxed mb-6">
                Connect directly with our logistics team to discuss your temperature-controlled transit requirements across the UAE and GCC.
              </p>
            </div>

            <div>
              <a
                href={contactHref}
                onClick={(e) => {
                  if (onContactTeam) {
                    e.preventDefault();
                    onContactTeam();
                  }
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/35 px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.55rem,1vw,0.85rem)] text-[clamp(0.8rem,1.4vw,0.9rem)] font-medium text-white/90 transition-colors hover:border-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:focus-visible:outline-white"
              >
                <span>Contact Our Logistics Team</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}