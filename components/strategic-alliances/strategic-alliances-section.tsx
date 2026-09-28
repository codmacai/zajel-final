"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import {
  STRATEGIC_ALLIANCES,
  STRATEGIC_ALLIANCES_EYEBROW,
  STRATEGIC_ALLIANCES_HEADING,
  STRATEGIC_ALLIANCES_INTRO,
  type AllianceCardData,
} from "@/data/strategic-alliances";

const LIME = "#36B936";

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");
const ANIMATE_BASE = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
const fadeIn = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8");

interface AllianceCardProps {
  card: AllianceCardData;
  isVisible: boolean;
  delayMs: number;
}

function AllianceCard({ card, isVisible, delayMs }: AllianceCardProps) {
  return (
    <div
      className={cx(
        "group relative flex min-h-[340px] sm:min-h-[380px] flex-col justify-between rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 sm:p-8 shadow-[0_20px_50px_-10px_rgba(4,32,15,0.6)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-white/30 hover:from-white/[0.12] hover:to-white/[0.04]",
        ANIMATE_BASE,
        fadeIn(isVisible)
      )}
      style={{ transitionDelay: `${150 + delayMs}ms` }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#36B936]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 mb-5 flex h-20 sm:h-24 w-full shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white p-4 shadow-md transition-transform duration-300 group-hover:scale-[1.02] lg:h-28">
        <Image
          src={card.logoSrc}
          alt={card.logoAlt}
          width={180}
          height={80}
          className="h-auto max-h-14 sm:max-h-16 w-auto max-w-[180px] object-contain lg:max-h-20"
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-end">
        <h3 className="mb-2 text-lg sm:text-xl font-medium tracking-tight leading-snug text-white transition-colors duration-300 group-hover:text-[#36B936]">
          {card.title}
        </h3>
        <p className="text-xs sm:text-sm font-normal leading-relaxed text-white/85">
          {card.description}
        </p>
      </div>
    </div>
  );
}

export default function StrategicAlliancesSection() {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[650px] w-full flex-col justify-center overflow-hidden py-16 sm:py-20 lg:py-24 font-['Manrope',sans-serif] text-white"
      style={{
        background: "radial-gradient(120% 140% at 78% 85%, #1F7A45 0%, #0F5C2E 32%, #0A4D26 58%, #073A1D 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute bottom-[-10%] right-[-8%] h-[85%] w-[55%]"
        style={{ background: "radial-gradient(closest-side, rgba(123,224,123,0.22) 0%, rgba(123,224,123,0) 70%)" }}
      />
      <div
        className="pointer-events-none absolute left-[-5%] top-[10%] h-[65%] w-[45%] opacity-40 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(54,185,54,0.3) 0%, rgba(10,77,38,0) 70%)" }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }}
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1240px] flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20">
        <div className={cx("mx-auto mb-10 sm:mb-12 max-w-[850px] shrink-0 text-center lg:mb-16", ANIMATE_BASE, fadeIn(isVisible))}>
          <span className="mb-2 block text-[11px] font-medium uppercase tracking-widest" style={{ color: LIME }}>
            {STRATEGIC_ALLIANCES_EYEBROW}
          </span>

          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white md:text-4xl leading-tight">
            {STRATEGIC_ALLIANCES_HEADING}
          </h2>

          <p className="mx-auto mt-3 max-w-[65ch] text-xs sm:text-sm lg:text-base font-normal leading-relaxed text-white/70">
            {STRATEGIC_ALLIANCES_INTRO}
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {STRATEGIC_ALLIANCES.map((card, index) => (
            <AllianceCard key={card.title} card={card} isVisible={isVisible} delayMs={index * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}