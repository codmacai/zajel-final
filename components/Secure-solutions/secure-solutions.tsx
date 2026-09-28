'use client';

/**
 * app/secure-solutions/SecureSolutions.tsx   (Next.js App Router)
 *
 * Usage in app/secure-solutions/page.tsx:
 *
 *   import type { Metadata } from 'next';
 *   import SecureSolutions from './SecureSolutions';
 *   export const metadata: Metadata = {
 *     title: 'Secure Solutions | Zajel',
 *     description: 'Dedicated, highly secure courier services for UAE government entities and institutions.',
 *   };
 *   export default function Page() { return <SecureSolutions />; }
 *
 * Hero image: rename the file to /public/images/secure-hero.png
 * (no spaces / commas in file names) and update HERO_IMAGE below.
 */

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Manrope } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const HERO_IMAGE = '/images/secure-hero.png';

const heroData = {
  eyebrow: 'Government & High-Security',
  title: 'Secure Solutions',
  description:
    'When trust is non-negotiable. We provide dedicated, highly secure courier services relied upon by leading UAE government entities and institutions.',
  buttonLabel: 'Contact Secure Team',
  buttonUrl: '/contact',
};

const isRtl = false;

/* -------------------------------------------------------------------------- */
/* Type scale (fluid, one place to tweak)                                     */
/* -------------------------------------------------------------------------- */

const T = {
  h2: 'text-[clamp(1.625rem,1.2rem+1.9vw,2.75rem)]',
  cardLead: 'text-[clamp(1.05rem,0.95rem+0.5vw,1.3rem)]',
  body: 'text-[clamp(0.875rem,0.84rem+0.2vw,1rem)]',
  small: 'text-[clamp(0.8125rem,0.79rem+0.12vw,0.9rem)]',
  label: 'text-[clamp(0.6875rem,0.66rem+0.12vw,0.75rem)]',
};

/* -------------------------------------------------------------------------- */
/* Reveal (respects prefers-reduced-motion)                                   */
/* -------------------------------------------------------------------------- */

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

const svgBase = {
  fill: 'none',
  stroke: 'currentColor',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true,
} as const;

const GovIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" {...svgBase}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5 12 4l9 5.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 9.5V19M9 9.5V19M12 9.5V19M15 9.5V19M19 9.5V19" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 19h18M2.5 21.5h19" />
  </svg>
);

const IdIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" {...svgBase}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
  </svg>
);

const DocsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" {...svgBase}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" {...svgBase}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`shrink-0 mt-[3px] ${className}`}
    {...svgBase}
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const ContactIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...svgBase}>
    <path d="M3.5 8.5 12 4l8.5 4.5v7L12 20l-8.5-4.5v-7Z" />
    <path d="M3.8 8.3 12 12.7l8.2-4.4" />
    <path d="M12 12.7V20" />
  </svg>
);

const NetworkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...svgBase}>
    <circle cx="12" cy="5" r="2.4" />
    <circle cx="5" cy="19" r="2.4" />
    <circle cx="19" cy="19" r="2.4" />
    <path d="M12 7.4V13m0 0-5.4 4M12 13l5.4 4" />
  </svg>
);

/* Large decorative silhouettes (sized by parent via className) */

const CleanGovBuildingIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M50 4 L92 26 H8 Z" fill="currentColor" fillOpacity="0.95" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    <circle cx="50" cy="17.5" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.8" />
    <rect x="8" y="26" width="84" height="6" fill="currentColor" fillOpacity="0.55" />
    {[16, 32, 48, 64, 80].map((cx) => (
      <g key={cx}>
        <rect x={cx - 4.2} y="30" width="8.4" height="3.6" fill="currentColor" fillOpacity="0.85" />
        <rect x={cx - 2.4} y="33.6" width="4.8" height="36.4" fill="currentColor" fillOpacity="0.92" />
        <rect x={cx - 4.2} y="70" width="8.4" height="3.6" fill="currentColor" fillOpacity="0.85" />
      </g>
    ))}
    <rect x="10" y="73.6" width="80" height="5" fill="currentColor" fillOpacity="0.7" />
    <rect x="6" y="78.6" width="88" height="5.4" fill="currentColor" fillOpacity="0.55" />
    <rect x="2" y="84" width="96" height="6" fill="currentColor" fillOpacity="0.4" />
  </svg>
);

const CleanIdCardIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect x="6" y="20" width="88" height="60" rx="7" fill="currentColor" fillOpacity="0.92" stroke="currentColor" strokeWidth="1" />
    <rect x="6" y="20" width="88" height="11" rx="7" fill="currentColor" fillOpacity="0.45" />
    <rect x="15" y="38" width="23" height="29" rx="3" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.5" />
    <g stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.9" fill="none" strokeLinecap="round">
      <path d="M26.5 45.5a7.5 7.5 0 1 1 -7.2 9.5" />
      <path d="M26.5 49a4.2 4.2 0 1 1 -4 5.4" />
      <path d="M26.5 52.4a1 1 0 1 1 -1 1.3" />
    </g>
    <rect x="46" y="38.5" width="15" height="10.5" rx="1.6" fill="currentColor" fillOpacity="0.75" />
    <line x1="46" y1="42.3" x2="61" y2="42.3" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
    <line x1="46" y1="45.6" x2="61" y2="45.6" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
    <line x1="46" y1="55" x2="80" y2="55" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="46" y1="61" x2="72" y2="61" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="15" y1="72" x2="38" y2="72" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.2" strokeLinecap="round" />
    {[46, 49, 52, 55, 58, 61, 64, 67, 70, 73, 76, 79].map((x, i) => (
      <rect key={x} x={x} y="66" width="1.4" height={i % 3 === 0 ? 8 : 5} fill="currentColor" fillOpacity="0.55" />
    ))}
  </svg>
);

const CleanDocSealIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect x="27" y="15" width="51" height="70" rx="2" fill="currentColor" fillOpacity="0.35" />
    <path d="M18 8 H58 L70 20 V92 H18 Z" fill="currentColor" fillOpacity="0.92" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    <path d="M58 8 V20 H70 Z" fill="currentColor" fillOpacity="0.5" />
    <line x1="26" y1="32" x2="62" y2="32" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="26" y1="40" x2="62" y2="40" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="26" y1="48" x2="53" y2="48" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="26" y1="60" x2="62" y2="60" stroke="currentColor" strokeOpacity="0.22" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="26" y1="68" x2="48" y2="68" stroke="currentColor" strokeOpacity="0.22" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M60 84l-2.5 11.5 8-4.5 8 4.5-2.5-11.5" fill="currentColor" fillOpacity="0.55" />
    <circle cx="68" cy="72" r="15" fill="currentColor" fillOpacity="0.95" />
    <circle cx="68" cy="72" r="15" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="1.6 2.4" />
    <path d="M62 72.5 66.5 77 75.5 65" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CleanEnvelopeSealIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect x="4" y="22" width="92" height="58" rx="5" fill="currentColor" fillOpacity="0.9" stroke="currentColor" strokeWidth="1" />
    <path d="M4 24 L50 54 L96 24" stroke="currentColor" strokeWidth="1.6" strokeOpacity="0.45" fill="none" />
    <path d="M4 78 L34 55 M96 78 L66 55" stroke="currentColor" strokeWidth="1.6" strokeOpacity="0.3" fill="none" />
    <circle cx="50" cy="40" r="13" fill="currentColor" fillOpacity="0.95" />
    <path d="M50 31.5 L53.4 37.6 60.3 38.7 55.3 43.6 56.5 50.5 50 47.1 43.5 50.5 44.7 43.6 39.7 38.7 46.6 37.6 Z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M80 55c5 0 9 4 9 9c0 6.5-9 15-9 15s-9-8.5-9-15c0-5 4-9 9-9Z" fill="currentColor" fillOpacity="0.55" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.7" />
    <circle cx="80" cy="64" r="3" fill="currentColor" fillOpacity="0.95" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

interface ServiceCard {
  id: 'gov' | 'id' | 'docs' | 'mail';
  Icon: React.ComponentType;
  title: string;
  description: string;
  features: string[];
  buttonLabel: string;
  buttonUrl: string;
}

const serviceCards: ServiceCard[] = [
  {
    id: 'gov',
    Icon: GovIcon,
    title: 'Gov & Institutional',
    description: 'Compliant document handling for official and institutional paperwork.',
    features: ['Government & ministry document transport', 'Full audit trail on every handoff', 'Compliant with institutional protocols'],
    buttonLabel: 'Read More',
    buttonUrl: '/secure-gov',
  },
  {
    id: 'id',
    Icon: IdIcon,
    title: 'Secure ID',
    description: 'Your most sensitive personal identification, handled with specialized protocols.',
    features: ['Passport & Emirates ID handling', 'Tamper-evident secure packaging', 'Verified recipient signature'],
    buttonLabel: 'Read More',
    buttonUrl: '/secure-id',
  },
  {
    id: 'docs',
    Icon: DocsIcon,
    title: 'Secure Docs',
    description: 'Courts, MOFA and Customs — critical legal filings handled with discretion.',
    features: ['Courts, MOFA & Customs filings', 'Documented chain-of-custody', 'Discreet, time-sensitive routing'],
    buttonLabel: 'Read More',
    buttonUrl: '/secure-docs',
  },
  {
    id: 'mail',
    Icon: MailIcon,
    title: 'Secure Mail',
    description: 'Confidential corporate mail routing, fully protected end to end.',
    features: ['Confidential inter-office routing', 'GPS-monitored secure vehicles', 'Vetted courier personnel only'],
    buttonLabel: 'Read More',
    buttonUrl: '/secure-mail',
  },
];

const cleanIconMap: Record<ServiceCard['id'], React.ComponentType<{ className?: string }>> = {
  gov: CleanGovBuildingIcon,
  id: CleanIdCardIcon,
  docs: CleanDocSealIcon,
  mail: CleanEnvelopeSealIcon,
};

const standards = {
  eyebrow: 'Our Commitment',
  heading: 'Uncompromising Standards',
  intro:
    "We don't just deliver; we protect. Our Secure Solutions are built on a foundation of rigorous auditing, specialized personnel, and advanced technology.",
  points: [
    {
      title: 'Vetted Personnel Only',
      text: 'Every courier assigned to our secure network undergoes extensive background checks and specialized compliance training.',
    },
    {
      title: 'Strict Chain of Custody',
      text: 'Documented physical handoffs and digital signature verifications ensure you know exactly who handled your item at every step.',
    },
    {
      title: 'GPS Monitored Transit',
      text: 'Dedicated secure vehicles are actively tracked via GPS from the moment of collection to the final proof of delivery.',
    },
  ],
};

const ctaButtons = [
  { label: 'Contact Secure Team', url: '/contact', Icon: ContactIcon, variant: 'primary' as const },
  { label: 'Explore Secure Networks', url: '#secure-networks', Icon: NetworkIcon, variant: 'secondary' as const },
];

/* -------------------------------------------------------------------------- */
/* Styles (rendered once with the page — no runtime DOM injection, so no      */
/* flash of unstyled content and it is SSR-safe)                              */
/* -------------------------------------------------------------------------- */

const pageStyles = `
.sh-root {
  --zj-green-deep:  #0a2e1c;
  --zj-green-vivid: #36B936;
  --zj-green-btn:   #05361A;
  --zj-green-btn-h: #032d14;
  --zj-ink:         #0a2e1c;
  --zj-ink-soft:    #4b5a52;
  --zj-card-radius: clamp(1.25rem, 0.6rem + 1.6vw, 2rem);
}

/* Hero: min-height instead of a hard 100svh + overflow hidden, so nothing
   is ever clipped on short / landscape / zoomed screens. */
.sh-section {
  width: 100%;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding-inline: clamp(1rem, 2.5vw, 3rem);
  padding-block: clamp(1.5rem, 4vw, 3rem);
  background: #fff;
}

.sh-wrap {
  width: 100%;
  max-width: 1400px;
  margin-inline: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1.5rem, 4vw, 4rem);
  align-items: center;
}

.sh-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}

.sh-eyebrow {
  color: var(--zj-green-vivid);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: clamp(0.6875rem, 0.66rem + 0.15vw, 0.8125rem);
  margin: 0 0 clamp(0.6rem, 1vw, 1rem);
}

.sh-title {
  color: var(--zj-ink);
  font-weight: 400;
  font-size: clamp(2rem, 1.3rem + 3vw, 3.75rem);
  line-height: 1.08;
  letter-spacing: -0.025em;
  margin: 0 0 clamp(0.75rem, 1.2vw, 1.25rem);
  text-wrap: balance;
}

.sh-description {
  color: var(--zj-ink-soft);
  font-weight: 400;
  font-size: clamp(0.95rem, 0.88rem + 0.35vw, 1.125rem);
  line-height: 1.65;
  max-width: 46ch;
  margin: 0 0 clamp(1.25rem, 1rem + 1.2vw, 2.25rem);
}

.sh-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: clamp(0.875rem, 0.82rem + 0.25vw, 1rem);
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--zj-green-vivid);
  background: var(--zj-green-btn);
  border-radius: 999px;
  padding: clamp(0.7rem, 0.9vw, 0.9rem) clamp(1.25rem, 2vw, 1.85rem);
  min-height: 44px;
  text-decoration: none;
  box-shadow: 0 1px 4px rgba(5,54,26,0.4), 0 4px 12px rgba(5,54,26,0.3);
  outline-offset: 3px;
  transition: background 200ms ease, transform 240ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 200ms ease;
}
.sh-btn:hover {
  background: var(--zj-green-btn-h);
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 2px 8px rgba(5,54,26,0.45), 0 8px 22px rgba(5,54,26,0.35);
}
.sh-btn:active { transform: scale(0.97); box-shadow: none; }
.sh-btn:focus-visible { outline: 2px solid var(--zj-green-vivid); }

.sh-media {
  position: relative;
  width: 100%;
  aspect-ratio: 5 / 4;
  max-height: min(640px, 80svh);
  border-radius: var(--zj-card-radius);
  overflow: hidden;
  background: linear-gradient(135deg, #0a2e1c, #06371f);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 16px 48px rgba(0,0,0,0.22), 0 40px 80px rgba(0,0,0,0.14);
}
.sh-media-scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 35%, transparent 65%);
  pointer-events: none;
}

@media (max-width: 860px) {
  .sh-section { min-height: auto; align-items: flex-start; }
  .sh-wrap { grid-template-columns: 1fr; }
  .sh-media { order: -1; aspect-ratio: 16 / 11; max-height: 55svh; }
  .sh-description { max-width: none; }
}

/* CTA band */
.scta-heading {
  font-size: clamp(1.0625rem, 0.9rem + 1vw, 1.625rem);
  font-weight: 400;
  color: #fff;
  line-height: 1.4;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  max-width: 62ch;
  margin: 0 auto clamp(20px, 3vh, 28px);
  text-align: center;
  text-wrap: balance;
}
.scta-btn-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: clamp(12px, 2vw, 20px);
}
.scta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 clamp(22px, 2.6vw, 36px);
  border-radius: 999px;
  font-size: clamp(0.875rem, 0.82rem + 0.25vw, 1rem);
  font-weight: 500;
  text-decoration: none;
  text-align: center;
  transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease, background-color 0.25s ease;
}
@media (max-width: 520px) {
  .scta-btn { width: 100%; }
  .scta-btn-row { flex-direction: column; align-items: stretch; }
}
.scta-btn-primary { background: #fff; color: #164A16; box-shadow: 0 14px 28px -12px rgba(0,0,0,0.4); }
.scta-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 18px 34px -12px rgba(0,0,0,0.45); }
.scta-btn-secondary { background: rgba(255,255,255,0.12); color: #fff; border: 1.5px solid rgba(255,255,255,0.55); }
.scta-btn-secondary:hover { background: rgba(255,255,255,0.2); transform: translateY(-2px); }
.scta-deco {
  position: absolute;
  top: clamp(16px, 2.5vw, 28px);
  right: clamp(16px, 2.5vw, 28px);
  display: grid;
  grid-template-columns: repeat(2, 8px);
  grid-template-rows: repeat(2, 8px);
  gap: 4px;
}
.scta-deco span { background: rgba(255,255,255,0.55); border-radius: 2px; }
.scta-deco span:last-child { background: rgba(255,255,255,0.3); }

@media (prefers-reduced-motion: reduce) {
  .sh-btn, .scta-btn { transition: none; }
  .sh-btn:hover, .scta-btn:hover { transform: none; }
}
`;

/* -------------------------------------------------------------------------- */
/* Sections                                                                   */
/* -------------------------------------------------------------------------- */

const SecureHero: React.FC = () => (
  <section dir={isRtl ? 'rtl' : 'ltr'} className="sh-root sh-section">
    <div className="sh-wrap">
      <div className="sh-content">
        <p className="sh-eyebrow">{heroData.eyebrow}</p>
        <h1 className="sh-title">{heroData.title}</h1>
        <p className="sh-description">{heroData.description}</p>
        <Link href={heroData.buttonUrl} className="sh-btn">
          <span aria-hidden="true">+</span>
          <span>{heroData.buttonLabel}</span>
        </Link>
      </div>

      <div className="sh-media">
        <Image
          src={HERO_IMAGE}
          alt={heroData.title}
          fill
          priority
          sizes="(max-width: 860px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="sh-media-scrim" />
      </div>
    </div>
  </section>
);

const ServiceCardsSection: React.FC = () => (
  <section
    id="secure-networks"
    className="relative w-full overflow-hidden scroll-mt-4"
    style={{
      background:
        'linear-gradient(180deg, #0A5A2E 0%, #064423 30%, #053A20 55%, #04321C 75%, #042B18 100%)',
    }}
  >
    <div className="pointer-events-none absolute -top-24 -left-24 h-[320px] w-[320px] rounded-full bg-[#36B936]/[0.10] blur-[110px] sm:h-[520px] sm:w-[520px] sm:blur-[130px]" />
    <div className="pointer-events-none absolute top-[30%] -right-16 h-[280px] w-[280px] rounded-full bg-[#8FE38F]/[0.05] blur-[120px] sm:h-[460px] sm:w-[460px] sm:blur-[150px]" />

    <div className="relative z-10 mx-auto max-w-[1080px] px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
      <Reveal>
        <h2 className={`${T.h2} mb-8 text-center font-light leading-[1.15] tracking-[-0.01em] text-white sm:mb-14 lg:mb-16`}>
          Specialized Classified Networks
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-6 sm:auto-rows-fr">
        {serviceCards.map((card, i) => {
          const CardCleanIcon = cleanIconMap[card.id];
          const isGreen = (Math.floor(i / 2) + (i % 2)) % 2 === 0;

          return (
            <Reveal key={card.id} delay={(i % 2) * 120} className="h-full">
              <article
                className={`relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border p-6 sm:min-h-[320px] sm:rounded-[2rem] sm:p-8 lg:p-10 ${
                  isGreen
                    ? 'border-white/20 bg-gradient-to-br from-[#36B936] via-[#2A9E2A] to-[#1A681A] shadow-[0_20px_50px_rgba(54,185,54,0.18)]'
                    : 'border-[#0A5A2E]/[0.12] bg-gradient-to-br from-white via-[#F7FAF7] to-[#E8F3E9] shadow-[0_20px_50px_rgba(6,68,35,0.16)]'
                }`}
              >
                <div className="relative z-10 flex h-full flex-col">
                  <span
                    className={`mb-4 inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 sm:mb-5 ${
                      isGreen ? 'border border-white/20 bg-white/10' : 'bg-[#064423]'
                    }`}
                  >
                    <span className={isGreen ? 'text-white' : 'text-[#36B936]'}>
                      <card.Icon />
                    </span>
                    <span
                      className={`${T.label} font-medium uppercase tracking-[0.14em] ${
                        isGreen ? 'text-white' : 'text-[#36B936]'
                      }`}
                    >
                      {card.title}
                    </span>
                  </span>

                  <p
                    className={`${T.cardLead} mb-4 max-w-[90%] font-light leading-snug sm:mb-5 ${
                      isGreen ? 'text-white' : 'text-neutral-700'
                    }`}
                  >
                    {card.description}
                  </p>

                  <ul className="flex-1 space-y-2">
                    {card.features.map((feature) => (
                      <li
                        key={feature}
                        className={`${T.small} flex items-start gap-2.5 leading-snug ${
                          isGreen ? 'text-white/90' : 'text-neutral-600'
                        }`}
                      >
                        <CheckIcon className={isGreen ? 'text-white' : 'text-[#36B936]'} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <Link
                      href={card.buttonUrl}
                      className={`${T.small} inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-2.5 font-medium tracking-wide transition-transform duration-200 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#36B936] ${
                        isGreen
                          ? 'bg-[#05361A] text-[#36B936] hover:bg-[#03200F]'
                          : 'bg-[#064423] text-[#36B936] hover:bg-[#053018]'
                      }`}
                    >
                      <span>{card.buttonLabel}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>

                <div
                  className={`pointer-events-none absolute -right-5 -bottom-5 ${
                    isGreen ? 'text-white opacity-20' : 'text-[#064423] opacity-[0.08]'
                  }`}
                >
                  <CardCleanIcon className="h-[110px] w-[110px] sm:h-[160px] sm:w-[160px]" />
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

const StandardsSection: React.FC = () => (
  <section className="w-full overflow-hidden bg-[#FAFCFA] px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
    <div className="mx-auto max-w-[1080px]">
      <Reveal>
        <div className="rounded-[1.5rem] border border-[#0a2e1c]/[0.08] bg-white p-6 shadow-[0_20px_50px_rgba(6,68,35,0.10)] sm:rounded-[2rem] sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-14">
            <div className="flex flex-col justify-center lg:col-span-2">
              <p className={`${T.label} mb-3 font-semibold uppercase tracking-[0.16em] text-[#36B936]`}>
                {standards.eyebrow}
              </p>
              <h2 className={`${T.h2} mb-4 font-light leading-[1.15] tracking-[-0.01em] text-[#0a2e1c]`}>
                {standards.heading}
              </h2>
              <p className={`${T.body} leading-relaxed text-[#4b5a52]`}>{standards.intro}</p>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4 lg:col-span-3">
              {standards.points.map((point) => (
                <div
                  key={point.title}
                  className="flex items-start gap-4 rounded-2xl border border-[#0a2e1c]/[0.06] bg-[#FAFCFA] px-4 py-4 sm:px-5"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#36B936]/[0.12] text-[#36B936]">
                    <CheckIcon className="mt-0 text-[#36B936]" />
                  </span>
                  <div className="min-w-0">
                    <p className={`${T.body} mb-1 font-medium text-[#0a2e1c]`}>{point.title}</p>
                    <p className={`${T.small} leading-relaxed text-[#4b5a52]`}>{point.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const ConversionBandSection: React.FC = () => (
  <section className="w-full bg-[#FAFCFA] py-10 sm:py-16">
    <div className="mx-auto w-full px-4 sm:px-6" style={{ maxWidth: 'min(1440px, 100%)' }}>
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-3xl">
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(120% 160% at 6% 20%, #0A3D22 0%, #073018 40%, #052611 70%, #031a0d 100%)' }}
            />
            <div
              className="absolute inset-0 opacity-70 mix-blend-screen"
              style={{
                background:
                  'linear-gradient(115deg, transparent 30%, rgba(54,185,54,0.18) 45%, rgba(110,231,183,0.25) 50%, rgba(54,185,54,0.18) 55%, transparent 70%)',
              }}
            />
            <svg className="absolute inset-0 h-full w-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <pattern id="secure-cta-dots" width="26" height="26" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.4" fill="#ffffff" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#secure-cta-dots)" />
            </svg>
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-[200px] w-[360px] -translate-x-1/2 rounded-full opacity-40 blur-[90px] sm:h-[240px] sm:w-[520px]"
              style={{ background: 'radial-gradient(circle, rgba(54,185,54,0.5), transparent 70%)' }}
            />

            <div className="relative z-10" style={{ padding: 'clamp(40px, 7vw, 88px) clamp(20px, 6vw, 64px)' }}>
              <div className="scta-deco" aria-hidden="true">
                <span /><span /><span /><span />
              </div>

              <p className={`${T.label} mb-4 text-center font-medium uppercase tracking-[0.2em] text-[#36B936]`}>
                Need Highly Secure Logistics?
              </p>

              <p className="scta-heading">
                Speak directly with our Secure Solutions compliance team about your government or institutional shipment.
              </p>

              <div className="scta-btn-row">
                {ctaButtons.map((btn) => {
                  const cls = `scta-btn ${btn.variant === 'primary' ? 'scta-btn-primary' : 'scta-btn-secondary'}`;
                  const inner = (
                    <>
                      <btn.Icon />
                      {btn.label}
                    </>
                  );
                  // Hash links use a plain anchor; routes use next/link.
                  return btn.url.startsWith('#') ? (
                    <a key={btn.label} href={btn.url} className={cls}>{inner}</a>
                  ) : (
                    <Link key={btn.label} href={btn.url} className={cls}>{inner}</Link>
                  );
                })}
              </div>

              <p className={`${T.small} mt-8 text-center text-white/60`}>
                Secure Solutions from Zajel — trusted logistics for government and institutional partners.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function SecureSolutions() {
  return (
    <main className={`${manrope.className} min-h-screen overflow-x-hidden bg-[#FAFCFA]`}>
      <style>{pageStyles}</style>
      <SecureHero />
      <ServiceCardsSection />
      <StandardsSection />
      <ConversionBandSection />
    </main>
  );
}