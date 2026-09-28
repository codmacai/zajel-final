"use client";

import Image from "next/image";
import Link from "next/link";
import type { ClearanceCard } from "@/data/customs-clearance";

const ANIMATE_BASE = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
const fadeIn = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10");
const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

interface ClearanceCardTileProps extends ClearanceCard {
  isVisible: boolean;
  delayOffset: number;
}

export function ClearanceCardTile({
  Icon,
  image,
  title,
  description,
  buttonLabel,
  buttonUrl,
  isVisible,
  delayOffset,
  span,
}: ClearanceCardTileProps) {
  return (
    <div
      className={cx(
        "bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gray-200/50",
        span === "full" ? "md:col-span-2 lg:col-span-3" : "",
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