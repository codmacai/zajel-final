"use client";

import Image from "next/image";
import Link from "next/link";
import type { SVGProps } from "react";
import { useInView } from "@/hooks/useInView";
import { FREIGHT_CARDS } from "@/data/air-freight/solutions";
import type { FreightCard } from "@/data/air-freight/solutions";

const ANIMATE_BASE = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
const fadeIn = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10");
const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

const CARD_DELAY_STEP_MS = 150;

type IconProps = SVGProps<SVGSVGElement>;

const baseProps: IconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
};

function PlaneIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path
        d="M17.8 19.2 16 11l3.5-3.5c.7-.7.7-1.8 0-2.5s-1.8-.7-2.5 0L13.5 8.5 5.3 6.7c-.4-.1-.9 0-1.2.3l-.5.5c-.4.4-.3 1 .2 1.3l6 3.6-3 3-2.3-.5c-.3-.1-.6 0-.8.2l-.3.3c-.3.3-.3.8.1 1l3 1.8 1.8 3c.2.4.7.4 1 .1l.3-.3c.2-.2.3-.5.2-.8l-.5-2.3 3-3 3.6 6c.3.5.9.6 1.3.2l.5-.5c.3-.3.4-.8.3-1.2Z"
        stroke="#36B936"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CharterIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="4" width="18" height="17" rx="2" stroke="#36B936" strokeWidth="1.75" />
      <path d="M3 9H21" stroke="#36B936" strokeWidth="1.75" />
      <path d="M8 2V6" stroke="#36B936" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M16 2V6" stroke="#36B936" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M8 14L10.5 16.5L16 11" stroke="#36B936" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AogIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 2 2 21H22L12 2Z" stroke="#36B936" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M12 9V14" stroke="#36B936" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M12 17.5H12.01" stroke="#36B936" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

const ICONS_BY_ID: Record<FreightCard["id"], React.ComponentType<IconProps>> = {
  standard: PlaneIcon,
  charter: CharterIcon,
  aog: AogIcon,
};

interface FreightCardTileProps extends FreightCard {
  isVisible: boolean;
  delayOffset: number;
}

function FreightCardTile({
  id,
  image,
  title,
  description,
  buttonLabel,
  buttonUrl,
  isVisible,
  delayOffset,
}: FreightCardTileProps) {
  const Icon = ICONS_BY_ID[id] || PlaneIcon;

  return (
    <div
      className={cx(
        "bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gray-200/50",
        ANIMATE_BASE,
        fadeIn(isVisible)
      )}
      style={{ transitionDelay: `${150 + delayOffset}ms` }}
    >
      <div className="relative shrink-0 h-32 sm:h-36 lg:h-44">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        <div
          className={cx(
            "absolute -bottom-5 sm:-bottom-6 left-5 sm:left-7 w-11 h-11 sm:w-14 sm:h-14 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-md z-10",
            ANIMATE_BASE,
            isVisible ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-45 scale-50"
          )}
          style={{ transitionDelay: `${300 + delayOffset}ms` }}
        >
          <Icon />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 pt-8 sm:p-7 sm:pt-10 lg:p-8 lg:pt-11">
        <h3
          className={cx(
            "text-[#1b4332] font-medium tracking-tight leading-tight whitespace-pre-line text-lg sm:text-xl lg:text-[1.65rem]",
            ANIMATE_BASE,
            fadeIn(isVisible)
          )}
          style={{ transitionDelay: `${400 + delayOffset}ms` }}
        >
          {title}
        </h3>

        <p
          className={cx(
            "text-[#2d6a4f]/80 font-normal leading-relaxed mt-3 flex-1 text-xs sm:text-sm lg:text-base whitespace-pre-line",
            ANIMATE_BASE,
            fadeIn(isVisible)
          )}
          style={{ transitionDelay: `${500 + delayOffset}ms` }}
        >
          {description}
        </p>

        <div className={cx("mt-6", ANIMATE_BASE, fadeIn(isVisible))} style={{ transitionDelay: `${600 + delayOffset}ms` }}>
          <Link
            href={buttonUrl}
            className="bg-[#36B936] hover:bg-[#2da32d] hover:scale-105 transition-all duration-200 text-white rounded-full inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium tracking-wide shadow-sm"
          >
            <span className="text-sm leading-none">+</span>
            <span>{buttonLabel}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AirFreightSolutions() {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-white overflow-hidden font-['Manrope',sans-serif]"
    >
      <div className="mx-auto max-w-7xl">
        <div className={cx("text-center mb-6 sm:mb-8", ANIMATE_BASE, fadeIn(isVisible))}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#1b4332] tracking-tight whitespace-pre-line leading-tight px-2">
            Our Air Freight Solutions
          </h2>
        </div>

        <div className={cx("max-w-3xl mx-auto text-center mb-10 sm:mb-16 px-2", ANIMATE_BASE, fadeIn(isVisible))}>
          <p className="text-[#2d6a4f] font-normal leading-relaxed text-sm sm:text-base md:text-lg">
            Reliable, high-speed air cargo charters and scheduled network routing designed to keep your supply chain moving globally without interruption.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FREIGHT_CARDS.map((card, i) => (
            <FreightCardTile
              key={card.id}
              {...card}
              isVisible={isVisible}
              delayOffset={i * CARD_DELAY_STEP_MS}
            />
          ))}
        </div>
      </div>
    </section>
  );
}