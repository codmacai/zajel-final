"use client";

import Image from "next/image";
import Link from "next/link";
import type { SolutionCard } from "./types";

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");
const ANIMATE_BASE = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
const fade = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10");

interface SolutionCardTileProps extends SolutionCard {
  isVisible: boolean;
  delayOffset: number;
  sizes?: string;
}

export default function SolutionCardTile({
  Icon,
  image,
  title,
  description,
  buttonLabel = "Learn More",
  buttonUrl = "/contact",
  isVisible,
  delayOffset,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
}: SolutionCardTileProps) {
  return (
    <div
      className={cx(
        "bg-white rounded-2xl overflow-hidden flex flex-col border border-gray-100 shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gray-200/50 w-full",
        ANIMATE_BASE,
        fade(isVisible)
      )}
      style={{ transitionDelay: `${150 + delayOffset}ms` }}
    >
      <div className="relative shrink-0 h-36 sm:h-40 lg:h-44 w-full">
        <Image src={image} alt={title} fill sizes={sizes} loading="lazy" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        <div
          className={cx(
            "absolute -bottom-6 left-5 sm:left-6 lg:left-7 w-12 h-12 sm:w-14 sm:h-14 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-md text-[#36B936]",
            ANIMATE_BASE,
            isVisible ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-45 scale-50"
          )}
          style={{ transitionDelay: `${300 + delayOffset}ms` }}
        >
          <Icon className="h-5 w-5 text-[#36B936]" strokeWidth={1.8} />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 pt-10 sm:p-6 sm:pt-11 lg:p-8 lg:pt-11">
        <h3
          className={cx(
            "text-[#0D2A22] font-medium leading-tight whitespace-pre-line text-base sm:text-lg lg:text-[1.4rem]",
            ANIMATE_BASE,
            fade(isVisible)
          )}
          style={{ transitionDelay: `${400 + delayOffset}ms` }}
        >
          {title}
        </h3>

        <p
          className={cx(
            "text-[#0D2A22]/70 font-normal leading-relaxed mt-2.5 flex-1 text-[13px] sm:text-[14px] whitespace-pre-line",
            ANIMATE_BASE,
            fade(isVisible)
          )}
          style={{ transitionDelay: `${500 + delayOffset}ms` }}
        >
          {description}
        </p>

        <div
          className={cx("mt-5 sm:mt-6", ANIMATE_BASE, fade(isVisible))}
          style={{ transitionDelay: `${600 + delayOffset}ms` }}
        >
          <Link
            href={buttonUrl}
            className="bg-[#36B936] hover:bg-[#31a631] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-[#0B140F] rounded-full inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-[13px] shadow-sm font-medium tracking-wide"
          >
            <span>{buttonLabel}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}