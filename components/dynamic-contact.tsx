'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.2, 0.8, 0.2, 1] as const;

export interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
}

export interface CtaItem {
  label: string;
  url: string;
}

export interface ContactBandProps {
  badgeText?: string;
  title?: string;
  descriptionLead?: string;
  descriptionDetail?: string;
  contactInfo?: ContactInfo;
  primaryCta?: CtaItem;
  secondaryCta?: CtaItem;
  onCtaClick?: () => void;
  isRtl?: boolean;
}

const DEFAULT_CONTACT_INFO: ContactInfo = {
  email: 'sales@zajel.com',
  phone: '600 53 11 11',
  address: 'Dubai Office, Al Rostamani Building, Al Ittihad Rd, E11, Dubai',
};

export default function ContactBand({
  badgeText = 'Global Logistics Network',
  title = 'Connect With Our Network',
  descriptionLead = "Whether you are shipping a single consignment to a new market or establishing regular freight routes across multiple continents, Zajel's network provides the coverage, reliability, and coordination to keep your cargo moving.",
  descriptionDetail = 'Contact our team to discuss your shipping requirements, explore route options, or request a freight quote.',
  contactInfo = DEFAULT_CONTACT_INFO,
  primaryCta = {
    label: 'Request a Freight Quote',
    url: '/contact',
  },
  secondaryCta,
  onCtaClick,
  isRtl = false,
}: ContactBandProps) {
  const mergedContact = { ...DEFAULT_CONTACT_INFO, ...contactInfo };

  return (
    <section className="w-full bg-[#F9FAFB] py-12 sm:py-18 lg:py-20 px-4 sm:px-8 md:px-12 lg:px-16 font-sans overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#36B936]/25 bg-gradient-to-b from-[#0B1D14] via-[#0A3D2D] to-[#041A12] p-6 sm:p-9 md:p-12 lg:p-14 text-white shadow-[0_22px_55px_-15px_rgba(4,26,18,0.65)]"
        >
          {/* Top Emerald Gradient Highlight Beam */}
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#36B936]/70 to-transparent" />

          {/* Luxury Ambient Glow Orbs */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[360px] w-[460px] rounded-full bg-[#36B936]/12 blur-[100px]" />
            <div className="absolute -bottom-24 right-[-10%] h-[300px] w-[300px] rounded-full bg-[#0A4D26]/35 blur-[95px]" />
          </div>

          {/* Content Wrapper */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Eyebrow Badge */}
            {badgeText && (
              <div className="mb-3 flex items-center justify-center gap-2.5">
                <span className="text-xs font-medium uppercase tracking-wider text-[#36B936]">
                  {badgeText}
                </span>
              </div>
            )}

            {/* Main Title */}
            <h2 className="max-w-[26ch] text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-[1.18] text-white">
              {title}
            </h2>

            {/* Paragraph Descriptions */}
            <div className="mt-3.5 sm:mt-5 max-w-[64ch] space-y-2.5 text-xs sm:text-sm md:text-base font-light text-white/80 leading-relaxed">
              {descriptionLead && <p>{descriptionLead}</p>}
              {descriptionDetail && (
                <p className="text-white/70">{descriptionDetail}</p>
              )}
            </div>

            {/* Dynamic Glassmorphism Contact Details */}
            {(mergedContact.email || mergedContact.phone || mergedContact.address) && (
              <div className="mt-7 sm:mt-9 grid w-full max-w-[940px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {mergedContact.email && (
                  <a
                    href={`mailto:${mergedContact.email}`}
                    className="group flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:p-4.5 backdrop-blur-md transition-all duration-300 hover:border-[#36B936]/40 hover:bg-white/[0.08]"
                  >
                    <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[#36B936]/15 text-[#36B936] transition-transform duration-300 group-hover:scale-105">
                      <Mail className="h-4.5 w-4.5" strokeWidth={1.75} />
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-white/50">
                      Email Us
                    </span>
                    <span className="mt-0.5 text-xs sm:text-sm font-medium text-white/95 truncate max-w-full">
                      {mergedContact.email}
                    </span>
                  </a>
                )}

                {mergedContact.phone && (
                  <a
                    href={`tel:${mergedContact.phone.replace(/\s+/g, '')}`}
                    className="group flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:p-4.5 backdrop-blur-md transition-all duration-300 hover:border-[#36B936]/40 hover:bg-white/[0.08]"
                  >
                    <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[#36B936]/15 text-[#36B936] transition-transform duration-300 group-hover:scale-105">
                      <Phone className="h-4.5 w-4.5" strokeWidth={1.75} />
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-white/50">
                      Call Directly
                    </span>
                    <span className="mt-0.5 text-xs sm:text-sm font-medium text-white/95 truncate max-w-full">
                      {mergedContact.phone}
                    </span>
                  </a>
                )}

                {mergedContact.address && (
                  <div className="group flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:p-4.5 backdrop-blur-md transition-all duration-300 hover:border-[#36B936]/40 hover:bg-white/[0.08] sm:col-span-2 lg:col-span-1">
                    <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[#36B936]/15 text-[#36B936] transition-transform duration-300 group-hover:scale-105">
                      <MapPin className="h-4.5 w-4.5" strokeWidth={1.75} />
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-white/50">
                      Headquarters
                    </span>
                    <span className="mt-0.5 text-xs sm:text-sm font-medium text-white/95 text-center leading-snug line-clamp-2">
                      {mergedContact.address}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Signature CTA Buttons */}
            {(primaryCta || secondaryCta) && (
              <div className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-3">
                {primaryCta && (
                  <Link
                    href={primaryCta.url}
                    onClick={(e) => {
                      if (onCtaClick) {
                        e.preventDefault();
                        onCtaClick();
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-[#36B936] px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-[#0B140F] transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {primaryCta.label}
                    <span aria-hidden="true">{isRtl ? '←' : '→'}</span>
                  </Link>
                )}

                {secondaryCta && (
                  <Link
                    href={secondaryCta.url}
                    className="inline-flex items-center rounded-full border border-white/30 px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white/90 transition-colors hover:border-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}