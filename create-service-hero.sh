#!/usr/bin/env bash
set -e
mkdir -p components/sections/ServiceHero

cat > components/sections/ServiceHero/types.ts << 'EOF'
import type { LucideIcon } from "lucide-react";

export interface ServiceHeroIconStat {
  type: "icon";
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export interface ServiceHeroNumericStat {
  type: "numeric";
  value: number | string;
  suffix?: string;
  label: string;
  /** Animate with CountUp. Defaults to true when value is a number, false otherwise. */
  animate?: boolean;
}

export type ServiceHeroStat = ServiceHeroIconStat | ServiceHeroNumericStat;

export interface ServiceHeroData {
  /** Unique key, also used as the React key when a page renders more than one hero */
  slug: string;

  /** Eyebrow badge text shown above the heading */
  badgeText: string;

  /** The heading is always two lines: a plain line and a brand-green highlighted line */
  headingPrimary: string;
  headingHighlight: string;
  /** "standard" matches customs/warehouse/industry sizing, "large" matches the network page */
  headingSize?: "standard" | "large";

  /** Two supporting paragraphs: a stronger lead line and a lighter detail line */
  leadParagraph: string;
  detailParagraph: string;

  ctaText: string;
  ctaHref: string;
  /** "circle" = green pill with a circular arrow badge, "arrow" = pill with an inline arrow icon */
  ctaVariant?: "circle" | "arrow";

  backgroundImage: string;
  backgroundImageAlt: string;

  /** Hex value for the card's base background, e.g. "#0B140F" */
  cardBg: string;
  /** Tailwind class for the section background, e.g. "bg-white" or "bg-[#F9FAFB]" */
  sectionBg: string;
  /** 0–1 opacity applied to the background image (defaults to 1) */
  imageOpacity?: number;
  /** "standard" = dot grain + side/bottom gradients, "network" = denser dot grain + top-to-bottom gradient only */
  overlayVariant?: "standard" | "network";
  /** Adds the two soft blurred glow orbs used on the warehousing page */
  showGlowOrbs?: boolean;

  /** Renders as an icon-based dock if any entry is type "icon", otherwise a numeric CountUp dock */
  stats: ServiceHeroStat[];
}
EOF

cat > components/sections/ServiceHero/CountUp.tsx << 'EOF'
"use client";

import { useEffect, useState } from "react";

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export default function CountUp({ end, suffix = "", duration = 2000 }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}
EOF

cat > components/sections/ServiceHero/ServiceHero.css << 'EOF'
.hero-font {
  font-family: var(--font-manrope), system-ui, sans-serif;
}

@keyframes heroRise {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes heroScaleIn {
  from { opacity: 0; transform: scale(0.97); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes heroDockRise {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

.anim-title-d    { animation: heroRise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; animation-delay: 0.15s; }
.anim-subtitle-d { animation: heroRise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; animation-delay: 0.25s; }
.anim-btn-d      { animation: heroRise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; animation-delay: 0.35s; }
.anim-banner-d   { animation: heroScaleIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) both; animation-delay: 0.05s; }
.anim-dock-d     { animation: heroDockRise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; animation-delay: 0.45s; }

.dock-card {
  background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(252,253,252,0.94) 100%);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  border: 1px solid rgba(255,255,255,0.7);
  position: relative;
}

@media (prefers-reduced-motion: reduce) {
  .anim-title-d, .anim-subtitle-d, .anim-btn-d, .anim-banner-d, .anim-dock-d {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
EOF

cat > components/sections/ServiceHero/ServiceHero.tsx << 'EOF'
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CountUp from "./CountUp";
import type { ServiceHeroData } from "./types";
import "./ServiceHero.css";

export default function ServiceHero({ data }: { data: ServiceHeroData }) {
  const {
    badgeText,
    headingPrimary,
    headingHighlight,
    headingSize = "standard",
    leadParagraph,
    detailParagraph,
    ctaText,
    ctaHref,
    ctaVariant = "circle",
    backgroundImage,
    backgroundImageAlt,
    cardBg,
    sectionBg,
    imageOpacity = 1,
    overlayVariant = "standard",
    showGlowOrbs = false,
    stats,
  } = data;

  const hasIconStats = stats.some((s) => s.type === "icon");

  const headingClass =
    headingSize === "large"
      ? "font-extralight text-[clamp(2.25rem,3.5vw,4rem)] leading-[1.1]"
      : "font-light text-[clamp(1.75rem,3.2vw,3.5rem)] leading-[1.12]";

  return (
    <section
      className={`w-full ${sectionBg} flex flex-col items-center justify-center hero-font overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-24 sm:pb-32 mb-12 sm:mb-16 select-none`}
      style={{ paddingTop: "var(--navbar-h, 76px)" }}
    >
      <div className="relative w-full max-w-[1600px] mx-auto px-[clamp(1.5rem,4vw,3.5rem)]">
        {/* Main hero card */}
        <div
          className="anim-banner-d relative w-full min-h-[clamp(500px,45vw,640px)] rounded-[clamp(20px,2vw,32px)] overflow-hidden shadow-xl flex flex-col justify-between"
          style={{ backgroundColor: cardBg }}
        >
          {/* Background image */}
          {backgroundImage && (
            <Image
              src={backgroundImage}
              alt={backgroundImageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center z-0"
              style={{ opacity: imageOpacity }}
            />
          )}

          {/* Overlays */}
          {overlayVariant === "network" ? (
            <>
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#36B936_1px,transparent_1px)] [background-size:24px_24px] z-[1]" />
              <div
                className="absolute inset-0 z-[2]"
                style={{ background: `linear-gradient(to bottom, ${cardBg}E6 0%, ${cardBg}BF 60%, ${cardBg}F2 100%)` }}
              />
            </>
          ) : (
            <>
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#36B936_1px,transparent_1px)] [background-size:24px_24px] z-[1]" />
              <div
                className="absolute inset-0 z-[2]"
                style={{ background: `linear-gradient(to right, ${cardBg}D9 0%, ${cardBg}99 55%, ${cardBg}4D 100%)` }}
              />
              <div
                className="absolute inset-0 z-[2]"
                style={{ background: `linear-gradient(to top, ${cardBg}BF 0%, transparent 60%, transparent 100%)` }}
              />
            </>
          )}

          {showGlowOrbs && (
            <>
              <div className="absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-[#36B936]/15 blur-[140px] pointer-events-none z-[2]" />
              <div className="absolute left-[-15%] bottom-0 h-[420px] w-[420px] rounded-full bg-[#2E5C3A]/25 blur-[120px] pointer-events-none z-[2]" />
            </>
          )}

          {/* Content */}
          <div className="relative z-10 p-[clamp(1.75rem,4vw,4rem)] pb-[clamp(6rem,10vw,9rem)] flex flex-col items-start justify-between h-full">
            {/* Eyebrow badge */}
            <div className="anim-title-d inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#36B936]/20 border border-[#36B936]/40 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#36B936] animate-pulse" />
              <span className="text-[clamp(10px,0.8vw,12px)] font-medium tracking-widest text-[#4ade80] uppercase">
                {badgeText}
              </span>
            </div>

            {/* Heading + CTA / copy grid */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
              <div className="flex flex-col items-start gap-4 sm:gap-6">
                <h1 className={`anim-title-d text-[#F4F2EA] tracking-tight ${headingClass}`}>
                  {headingPrimary}
                  <br />
                  <span className="text-[#36B936] font-normal">{headingHighlight}</span>
                </h1>

                <div className="anim-btn-d">
                  {ctaVariant === "arrow" ? (
                    <Link
                      href={ctaHref}
                      className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-[#36B936] hover:bg-[#2ea22e] text-white text-sm font-medium tracking-wide shadow-lg shadow-[#36B936]/30 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      {ctaText}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  ) : (
                    <Link
                      href={ctaHref}
                      className="group inline-flex items-center gap-2.5 bg-[#36B936] hover:bg-[#32ae32] text-white font-light rounded-full pl-6 pr-2 py-3 text-[clamp(0.8rem,1.4vw,0.9rem)] tracking-tight shadow-[0_8px_24px_rgba(54,185,54,0.25)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(54,185,54,0.35)] hover:-translate-y-0.5"
                    >
                      <span>{ctaText}</span>
                      <span className="w-8 h-8 rounded-full bg-[#0B140F]/10 text-[#0B140F] flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                      </span>
                    </Link>
                  )}
                </div>
              </div>

              <div className="anim-subtitle-d space-y-4 text-left">
                <p className="text-[#F4F2EA]/95 text-[clamp(0.875rem,1.05vw,1.1rem)] font-normal leading-relaxed">
                  {leadParagraph}
                </p>
                <p className="text-[#D1DDD0]/90 text-[clamp(0.8rem,0.95vw,0.975rem)] font-light leading-relaxed">
                  {detailParagraph}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating stats dock */}
        <div
          className="anim-dock-d absolute bottom-0 left-1/2 z-30 w-full flex flex-col items-center px-[clamp(1rem,3vw,2rem)]"
          style={{ transform: "translate(-50%, 50%)" }}
        >
          {hasIconStats ? (
            <div className="w-full max-w-[clamp(680px,64vw,1040px)] rounded-[clamp(22px,2.5vw,36px)] bg-white/95 backdrop-blur-xl border border-gray-100 shadow-[0_20px_45px_-10px_rgba(11,20,15,0.08)] px-[clamp(1.25rem,2.5vw,2.5rem)] py-[clamp(1.25rem,1.75vw,1.75rem)] relative">
              <div className="absolute top-0 inset-x-0 h-1 rounded-t-[clamp(22px,2.5vw,36px)] bg-gradient-to-r from-transparent via-[#36B936] to-transparent" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-gray-100">
                {stats.map((stat, index) => {
                  if (stat.type !== "icon") return null;
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.title}
                      className={`group flex items-center gap-4 text-left transition-all duration-200 ${
                        index > 0 ? "pt-4 sm:pt-0" : ""
                      } ${index !== stats.length - 1 ? "lg:pr-4" : ""}`}
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F4F6F4] border border-gray-200 text-[#36B936] transition-all duration-300 group-hover:border-[#36B936]/40 group-hover:bg-[#36B936]/10 group-hover:scale-105">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-sm sm:text-base font-light tracking-tight text-[#0B140F] group-hover:text-[#258a25] transition-colors leading-tight mb-0.5">
                          {stat.title}
                        </h3>
                        <p className="text-[0.75rem] font-light leading-snug text-gray-500">{stat.subtitle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="dock-card w-full max-w-[clamp(680px,64vw,1040px)] rounded-[clamp(22px,2.5vw,36px)] shadow-[0_24px_50px_-12px_rgba(6,68,35,0.25)] px-[clamp(1.25rem,2.5vw,2.5rem)] py-[clamp(1.25rem,1.75vw,1.75rem)]">
              <div className="absolute top-0 inset-x-0 h-1 rounded-t-[clamp(22px,2.5vw,36px)] bg-gradient-to-r from-transparent via-[#36B936] to-transparent" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                {stats.map((stat, idx) => {
                  if (stat.type !== "numeric") return null;
                  const animate = stat.animate ?? typeof stat.value === "number";
                  return (
                    <div
                      key={stat.label}
                      className={`flex flex-col items-center text-center ${
                        idx > 0 && idx % 2 === 0 ? "pt-6 md:pt-0" : idx > 1 ? "pt-6 md:pt-0" : ""
                      }`}
                    >
                      <div className="text-[clamp(1.75rem,2.8vw,3.25rem)] font-light text-[#0B140F] tracking-tight mb-1 leading-none">
                        {animate ? (
                          <CountUp end={stat.value as number} suffix={stat.suffix} />
                        ) : (
                          <span>
                            {stat.value}
                            {stat.suffix}
                          </span>
                        )}
                      </div>
                      <div className="text-[clamp(0.7rem,0.85vw,0.875rem)] text-gray-500 font-light tracking-tight">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
EOF

cat > components/sections/ServiceHero/serviceHeroData.ts << 'EOF'
import { Anchor, ShieldCheck, Zap, Award } from "lucide-react";
import type { ServiceHeroData } from "./types";

export const serviceHeroData: Record<"customs" | "warehouse" | "industry" | "network", ServiceHeroData> = {
  customs: {
    slug: "customs",
    badgeText: "Customs Clearance & Brokerage",
    headingPrimary: "Customs Clearance UAE:",
    headingHighlight: "Every Border, Every Document, Handled",
    leadParagraph:
      "Customs clearance in the UAE is a critical step in every international shipment. A single error in HS code classification, a missing permit, or an outdated document can hold your cargo for days and cost your business far more than the delay itself.",
    detailParagraph:
      "Zajel provides end to end customs clearance and brokerage services across the UAE, managing every step from document preparation to final cargo release. Whether your shipment arrives by air, sea, or land, our team handles the regulatory process so your goods move through borders without unnecessary delays.",
    ctaText: "Get a Clearance Quote",
    ctaHref: "/contact",
    ctaVariant: "circle",
    backgroundImage: "/ChatGPT Image Sep 9, 2026, 12_08_04 PM.png",
    backgroundImageAlt: "Customs Clearance UAE",
    cardBg: "#0B140F",
    sectionBg: "bg-white",
    imageOpacity: 0.65,
    overlayVariant: "standard",
    stats: [
      { type: "icon", icon: Anchor, title: "All UAE", subtitle: "Ports, Airports & Free Zones" },
      { type: "icon", icon: ShieldCheck, title: "12-Digit", subtitle: "HS Code Compliance (2026)" },
      { type: "icon", icon: Zap, title: "Same Day", subtitle: "Air Cargo Clearance" },
      { type: "icon", icon: Award, title: "Licensed", subtitle: "Customs Brokers" },
    ],
  },

  warehouse: {
    slug: "warehouse",
    badgeText: "Warehousing & Distribution",
    headingPrimary: "Warehousing Services in Dubai:",
    headingHighlight: "Secure Storage, Intelligent Fulfillment",
    leadParagraph:
      "Warehousing services in Dubai are a critical link in the supply chain for businesses importing, distributing, and fulfilling orders across the UAE and the wider region. What happens between cargo arrival and final delivery, where goods are stored, how inventory is managed, and how quickly orders can be dispatched, determines whether your logistics operation delivers value or creates bottlenecks.",
    detailParagraph:
      "Zajel operates dedicated warehouse facilities in Dubai, providing secure storage, real-time inventory management, and distribution services that connect directly to our air, sea, and land freight networks.",
    ctaText: "Get a Warehousing Quote",
    ctaHref: "/contact",
    ctaVariant: "circle",
    backgroundImage: "/ChatGPT Image Sep 9, 2026, 12_08_04 PM.png",
    backgroundImageAlt: "Dubai Warehousing and Distribution",
    cardBg: "#0B140F",
    sectionBg: "bg-[#F9FAFB]",
    imageOpacity: 0.75,
    overlayVariant: "standard",
    showGlowOrbs: true,
    stats: [
      { type: "numeric", value: "Dubai", label: "Based Facilities", animate: false },
      { type: "numeric", value: 4, label: "ISO Certifications" },
      { type: "numeric", value: "24/7", label: "Inventory Monitoring", animate: false },
      { type: "numeric", value: 45, suffix: "M+", label: "Shipments Delivered" },
    ],
  },

  industry: {
    slug: "industry",
    badgeText: "Industries Served",
    headingPrimary: "Industry Logistics Solutions in the UAE:",
    headingHighlight: "Shaped by Your Sector",
    leadParagraph:
      "Every industry moves different goods under different conditions, and the logistics requirements that come with each are rarely interchangeable. A pharmaceutical shipment that must maintain cold chain integrity from warehouse to clinic has nothing in common with an oversized oil and gas module being transported by break bulk from Jebel Ali to a project site in Iraq. The documentation, the handling, the timelines, and the compliance standards are entirely different.",
    detailParagraph:
      "Zajel provides industry logistics solutions across the UAE that are designed around the specific requirements of each sector we serve. With over 45 million shipments delivered across 195 countries and four ISO certifications governing our operations, Zajel brings both scale and precision to every sector.",
    ctaText: "Find Your Industry",
    ctaHref: "/contact",
    ctaVariant: "circle",
    backgroundImage: "/images (4).jpeg",
    backgroundImageAlt: "Industry Logistics Solutions",
    cardBg: "#0B140F",
    sectionBg: "bg-white",
    imageOpacity: 0.65,
    overlayVariant: "standard",
    stats: [
      { type: "numeric", value: 195, suffix: "+", label: "Countries Covered" },
      { type: "numeric", value: 500, suffix: "+", label: "Destinations Worldwide" },
      { type: "numeric", value: 45, suffix: "M+", label: "Shipments Delivered" },
      { type: "numeric", value: 4, label: "ISO Certifications" },
    ],
  },

  network: {
    slug: "network",
    badgeText: "Global Coverage, Local Precision",
    headingPrimary: "Our Logistics Network",
    headingHighlight: "in the UAE",
    headingSize: "large",
    leadParagraph:
      "A logistics network is only as strong as the infrastructure, partnerships, and operational reach behind it. What determines on-time delivery and seamless customs clearance is the power of the network executing it.",
    detailParagraph:
      "Zajel operates from the UAE spanning 195 countries and 500+ destinations. Through local operations and global freight alliances, we provide connected coverage from Dubai last-mile delivery to multimodal transport across continents.",
    ctaText: "Explore Our Network",
    ctaHref: "#explore-network",
    ctaVariant: "arrow",
    backgroundImage: "/photorealistic-scene-with-warehouse-logistics-operations_23-2151468805.avif",
    backgroundImageAlt: "Global warehouse logistics operations network",
    cardBg: "#0D2A22",
    sectionBg: "bg-[#F9FAFB]",
    imageOpacity: 1,
    overlayVariant: "network",
    stats: [
      { type: "numeric", value: 195, label: "Countries Covered" },
      { type: "numeric", value: 500, suffix: "+", label: "Destinations Worldwide" },
      { type: "numeric", value: 45, suffix: "M+", label: "Shipments Delivered" },
      { type: "numeric", value: 3, label: "Global Alliances" },
    ],
  },
};

export type ServiceHeroKey = keyof typeof serviceHeroData;
EOF

echo "ServiceHero files created in components/sections/ServiceHero"