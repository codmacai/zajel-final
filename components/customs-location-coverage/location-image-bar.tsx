"use client";

import Image from "next/image";
import type { LocationGroup } from "@/data/customs-location-coverage";

const ANIMATE_BASE = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
const fadeIn = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10");
const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

interface LocationImageBarProps extends LocationGroup {
  isVisible: boolean;
  delayOffset: number;
}

export function LocationImageBar({ Icon, image, label, tags, isVisible, delayOffset }: LocationImageBarProps) {
  return (
    <div
      className={cx(
        "group relative overflow-hidden flex flex-col min-h-[300px] sm:min-h-[360px] lg:min-h-[440px]",
        ANIMATE_BASE,
        fadeIn(isVisible)
      )}
      style={{ transitionDelay: `${150 + delayOffset}ms` }}
    >
      <Image
        src={image}
        alt={label}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#04150B]/95 via-[#04150B]/40 to-[#04150B]/10" />

      <div className="relative z-10 flex flex-col flex-1 p-5 sm:p-6 lg:p-7">
        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center shrink-0">
          <Icon />
        </div>

        <div className="mt-auto pt-6">
          <h3 className="text-white font-medium text-lg sm:text-xl lg:text-2xl mb-3 tracking-tight">{label}</h3>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 rounded-full px-3 py-1 text-xs leading-normal whitespace-nowrap font-normal"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
