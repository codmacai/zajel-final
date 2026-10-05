"use client";

import type { InventoryTile } from "@/data/inventory-management";

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");
const ANIMATE_BASE = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
const fade = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8");

const DARK = "#1b4332";
const LIME = "#36B936";

interface InventoryTileCardProps {
  tile: InventoryTile;
  index: number;
  isVisible: boolean;
  delay: number;
  className?: string;
}

export default function InventoryTileCard({ tile, index, isVisible, delay, className }: InventoryTileCardProps) {
  const Icon = tile.icon;

  return (
    <div
      className={cx(
        "group relative rounded-xl p-3.5 sm:p-5 lg:p-6 bg-white",
        "transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:-translate-y-1",
        "aspect-square w-full max-w-[240px] mx-auto flex flex-col items-center text-center justify-between overflow-hidden",
        ANIMATE_BASE,
        fade(isVisible),
        className
      )}
      style={{
        border: `1px solid ${DARK}1F`,
        boxShadow: "0 16px 32px -16px rgba(13,42,34,0.35)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="w-full flex items-center justify-between">
        <span className="block text-[10px] sm:text-[11px] font-medium tracking-wide" style={{ color: LIME }}>
          {String(index + 1).padStart(2, "0")}.
        </span>
      </div>

      <div className="my-auto py-1 sm:py-2">
        <div
          className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#f8faf9] flex items-center justify-center mx-auto mb-2 sm:mb-3"
          style={{ color: LIME }}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" strokeWidth={1.4} />
        </div>
        <h3
          className="text-[0.78rem] sm:text-[0.9rem] lg:text-[0.95rem] font-medium tracking-tight mb-1"
          style={{ color: DARK }}
        >
          {tile.title}
        </h3>

        <p className="text-[10.5px] sm:text-[12px] leading-snug line-clamp-3 text-[#2d6a4f] font-normal">
          {tile.description}
        </p>
      </div>

      <div className="w-full" />
    </div>
  );
}
