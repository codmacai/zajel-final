"use client";

import Image from "next/image";
import type { LocationCard } from "@/data/strategic-locations";

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");
const ANIMATE_BASE = "transition-all duration-800 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
const fade = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8");

const LIME = "#36B936";

interface LocationImageCardProps extends LocationCard {
  isVisible: boolean;
  delay: number;
}

export default function LocationImageCard({
  icon: Icon,
  image,
  title,
  body,
  tag,
  isVisible,
  delay,
}: LocationImageCardProps) {
  return (
    <div
      className={cx(
        "group relative overflow-hidden h-[280px] sm:h-[340px] lg:h-[440px]",
        ANIMATE_BASE,
        fade(isVisible)
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        loading="lazy"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#04150B]/90 via-[#04150B]/40 to-[#04150B]/10" />

      <div className="relative h-full flex flex-col justify-end p-4 sm:p-5 lg:p-6">
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center mb-3 sm:mb-3.5">
          <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" style={{ color: LIME }} strokeWidth={1.8} />
        </div>

        <h3 className="text-white font-medium text-[0.95rem] sm:text-[1rem] lg:text-[1.1rem] mb-1.5 sm:mb-2 leading-snug">
          {title}
        </h3>

        <p className="text-white/75 text-[11.5px] sm:text-[12px] lg:text-[12.5px] font-normal leading-relaxed mb-3 sm:mb-3.5 line-clamp-3">
          {body}
        </p>

        <div>
          <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 font-normal rounded-full px-3 py-1 text-[10.5px] sm:text-[11px] lg:text-[11.5px] leading-none whitespace-nowrap">
            {tag}
          </span>
        </div>
      </div>
    </div>
  );
}
