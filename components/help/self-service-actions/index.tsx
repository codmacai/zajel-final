'use client';

import { Calculator, CalendarCheck, MessageSquare, Search, Smartphone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.2, 0.8, 0.2, 1] as const;

interface ActionCard {
  href: string;
  Icon: LucideIcon;
  title: string;
  description: string;
}

const TOP_ROW: ActionCard[] = [
  {
    href: '#track',
    Icon: Search,
    title: 'Track Your Shipment',
    description: 'Enter your tracking number to see real-time status updates for your shipment.',
  },
  {
    href: '#schedule',
    Icon: CalendarCheck,
    title: 'Schedule a Pickup',
    description: 'Book a pickup for your next shipment. Select location, time, and details.',
  },
  {
    href: '#quote',
    Icon: Calculator,
    title: 'Get a Quote',
    description: 'Calculate shipping rates for domestic or international deliveries instantly.',
  },
];

const BOTTOM_ROW: ActionCard[] = [
  {
    href: '#contact',
    Icon: MessageSquare,
    title: 'Contact Our Team',
    description: 'Reach our support team by phone, email, or through the portal for any inquiry.',
  },
  {
    href: '#app',
    Icon: Smartphone,
    title: 'Download App',
    description: 'Access tracking, booking, and support directly from your mobile device.',
  },
];

function ActionCardTile({ href, Icon, title, description, index }: ActionCard & { index: number }) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
      className="group flex flex-col items-center rounded-3xl border border-[#0A4D26]/8 bg-white p-8 text-center shadow-[0_10px_30px_rgba(6,68,35,0.04)] transition-all hover:border-[#36B936]/30 hover:shadow-[0_20px_40px_rgba(54,185,54,0.1)]"
    >
      <div className="mb-6 text-[#36B936] transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-14 w-14 stroke-[1.5]" />
      </div>
      <h3 className="mb-2 text-lg font-medium tracking-tight text-[#0A4D26]">{title}</h3>
      <p className="text-sm leading-relaxed text-[#0A4D26]/50">{description}</p>
    </motion.a>
  );
}

export default function SelfServiceActions() {
  return (
    <section className="w-full bg-[#FDFDFD] px-[clamp(1.5rem,5vw,6rem)] pt-[clamp(6rem,9vw,9rem)] pb-[clamp(1rem,3vw,2rem)] font-sans">
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-[clamp(1.5rem,2.5vw,2rem)] font-medium tracking-tight text-[#0A4D26]">
            How Can We Help?
          </h2>
          <p className="mx-auto max-w-[600px] text-[clamp(13px,1.3vw,15px)] font-light text-[#0A4D26]/60">
            Explore our most common self-service tools before raising a ticket.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TOP_ROW.map((card, i) => (
              <ActionCardTile key={card.href} {...card} index={i} />
            ))}
          </div>
          <div className="mx-auto grid w-full max-w-[860px] grid-cols-1 gap-6 md:grid-cols-2">
            {BOTTOM_ROW.map((card, i) => (
              <ActionCardTile key={card.href} {...card} index={i + TOP_ROW.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
