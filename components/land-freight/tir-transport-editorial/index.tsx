'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, DollarSign, Globe, Layers, ShieldCheck, Zap } from 'lucide-react';

const EASE = [0.2, 0.8, 0.2, 1] as const;

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

function TirAccordionRow({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: TirItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = item.icon;
  const active = isOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.08 }}
      className="group relative flex w-full flex-col border-b border-[#1b4332]/10 overflow-hidden bg-white first:rounded-t-[1.5rem] last:rounded-b-[1.5rem]"
    >
      <div
        aria-hidden
        className={`absolute inset-0 bg-[#36B936] transition-opacity duration-300 ease-out pointer-events-none ${
          isOpen ? 'opacity-100' : 'opacity-0 sm:group-hover:opacity-100'
        }`}
      />

      <button
        type="button"
        onClick={onToggle}
        className="relative grid w-full grid-cols-1 sm:grid-cols-12 items-center gap-3 px-5 py-4 sm:px-7 sm:py-5 md:px-8 text-left cursor-pointer"
      >
        <div className="flex items-center gap-3 sm:col-span-1">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#36B936] text-white sm:h-9 sm:w-9">
            <Icon className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <span
            className={`pointer-events-none select-none font-mono text-[11px] font-light transition-colors duration-300 sm:hidden ${
              active ? 'text-white/70' : 'text-[#1b4332]/30'
            }`}
          >
            {item.id}
          </span>
        </div>

        <h4
          className={`text-base font-medium tracking-tight transition-colors duration-300 sm:col-span-10 sm:text-lg ${
            active ? 'text-white' : 'text-[#1b4332]/90 sm:group-hover:text-white'
          }`}
        >
          {item.title}
        </h4>

        <div className="flex justify-end sm:col-span-1">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-300 ${
              active ? 'bg-white/25 text-white' : 'text-[#1b4332]/40 sm:group-hover:text-white'
            }`}
          >
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} strokeWidth={1.75} />
          </div>
        </div>
      </button>

      <div
        className={`relative grid transition-all duration-300 ease-in-out px-5 sm:px-7 md:px-8 ${
          isOpen ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] pb-0 opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-1 pb-1 sm:pl-[48px] lg:pl-[52px] max-w-3xl text-left">
            <p className="text-sm leading-relaxed text-white/90 font-light">{item.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface TirTransportEditorialProps {
  heroImageSrc?: string;
  heroImageAlt?: string;
  onRequestQuote?: () => void;
  onLearnMoreCustoms?: () => void;
  customsHref?: string;
}

const TirTransportEditorial = ({
  heroImageSrc = '/landfreight/tir-transport.png',
  heroImageAlt = 'International Logistics and TIR Transport',
  onRequestQuote,
  onLearnMoreCustoms,
  customsHref = '/customs-clearance',
}: TirTransportEditorialProps) => {
  const [openId, setOpenId] = useState<string | null>('01');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full relative overflow-hidden py-[clamp(5rem,10vw,10rem)] bg-[#F8F9F8] text-[#1b4332] font-sans">
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[80%] h-[40%] pointer-events-none opacity-30 blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(54,185,54,0.15) 0%, rgba(255,255,255,0) 70%)' }}
      />

      <div className="max-w-[1240px] mx-auto px-[clamp(1.25rem,5vw,2.75rem)] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-[clamp(3rem,6vw,5rem)] max-w-[760px] text-left"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px]" style={{ backgroundColor: '#36B936' }} />
            <span className="text-[#36B936] font-medium text-xs sm:text-sm tracking-wider uppercase">
              Global Customs Transit
            </span>
          </div>
          <h2 className="text-[#1b4332] font-medium leading-[1.1] text-2xl sm:text-3xl md:text-4xl tracking-tight">
            TIR: Simplified International Road Transport
          </h2>
          <p className="mt-4 text-[#2d6a4f] font-light text-sm sm:text-base leading-[1.65]">
            Zajel utilizes the TIR (Transports Internationaux Routiers) system for international road freight shipments, enabling faster border crossings and simplified customs procedures across multiple countries in a single journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="relative rounded-[2rem] overflow-hidden border border-[#36B936]/20 shadow-[0_20px_50px_-15px_rgba(54,185,54,0.25)] bg-[#36B936] mb-12"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImageSrc}
              alt={heroImageAlt}
              fill
              sizes="(min-width: 1024px) 1240px, 100vw"
              className="object-cover object-center opacity-65 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#36B936]/95 via-[#36B936]/80 to-[#36B936]/40" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 p-[clamp(2rem,4vw,3.5rem)] items-center gap-8 text-left">
            <div className="lg:col-span-12 text-white">
              <span className="text-xs font-normal tracking-wider uppercase text-white block mb-2.5">
                Core Foundation
              </span>
              <h3 className="text-xl sm:text-2xl font-medium tracking-tight mb-3 text-white">
                What is TIR?
              </h3>
              <p className="text-white/85 font-light text-sm sm:text-base leading-[1.65]">
                The TIR Convention is an international customs transit system administered by the International Road Transport Union (IRU). It allows goods to move across international borders in sealed vehicles or containers with minimal customs intervention at each crossing point. Instead of inspecting and processing cargo at every border, customs authorities accept the{' '}
                <strong className="text-white font-medium underline decoration-white decoration-1 underline-offset-4">
                  TIR Carnet
                </strong>{' '}
                as a guarantee, significantly reducing clearance times.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left"
        >
          <div>
            <span className="text-xs font-normal tracking-wider uppercase text-[#2d6a4f] block mb-1">
              Advantages
            </span>
            <h3 className="text-lg sm:text-xl font-medium text-[#1b4332] tracking-tight">
              How TIR benefits your shipment:
            </h3>
          </div>
        </motion.div>

        <div className="flex flex-col rounded-[1.5rem] border border-[#1b4332]/10 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] mb-12 overflow-hidden">
          {TIR_BENEFITS.map((item, index) => (
            <TirAccordionRow key={item.title} item={item} index={index} isOpen={openId === item.id} onToggle={() => toggleItem(item.id)} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="rounded-[2rem] border border-[#1b4332]/15 bg-gradient-to-br from-[#1b4332] to-[#0d2219] text-white p-[clamp(2rem,3.5vw,3rem)] shadow-[0_15px_40px_-12px_rgba(27,67,50,0.25)] text-left"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
            <div className="lg:col-span-7">
              <span className="text-xs font-normal tracking-wider uppercase text-[#36B936] block mb-2">
                Operational Scope
              </span>
              <h4 className="text-lg sm:text-xl font-medium tracking-tight mb-2.5 text-white">
                When Zajel uses TIR:
              </h4>
              <p className="text-white/80 font-light text-sm leading-[1.65]">
                TIR is applied on international land freight routes that cross two or more borders, particularly on corridors from the UAE through Saudi Arabia, Jordan, and Turkey into European destinations. Our team determines the optimal customs transit method for each shipment based on the route and cargo type.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-end gap-4 lg:border-l lg:border-white/10 lg:pl-8">
              <button
                type="button"
                onClick={onRequestQuote}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 bg-white text-[#1b4332] font-medium rounded-full pl-6 pr-2 py-3.5 text-sm tracking-tight transition-all duration-200 hover:bg-neutral-100 shadow-sm cursor-pointer"
              >
                <span>Request a Land Freight Quote</span>
                <span className="w-8 h-8 rounded-full bg-[#1b4332] text-[#36B936] flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          className="mt-8 text-center"
        >
          <a
            href={customsHref}
            onClick={(e) => {
              if (onLearnMoreCustoms) {
                e.preventDefault();
                onLearnMoreCustoms();
              }
            }}
            className="text-[#1b4332] font-medium text-sm tracking-tight underline underline-offset-4 decoration-[#36B936] transition-colors duration-200 hover:text-[#36B936]"
          >
            Learn More About Our Customs Clearance Services
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TirTransportEditorial;