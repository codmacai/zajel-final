"use client";

import { TONE_STYLES } from "@/data/customs-documentation-compliance";
import type { ColumnData } from "@/data/customs-documentation-compliance";
import { ColumnBody } from "./column-body";
import { FacetTag } from "./facet-tag";

const ANIMATE_BASE = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
const fadeIn = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10");
const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

interface StatColumnProps extends ColumnData {
  isVisible: boolean;
  delayOffset: number;
}

export function StatColumn({ value, suffix, label, tag, tone, body, isVisible, delayOffset }: StatColumnProps) {
  const t = TONE_STYLES[tone];
  const isDarkTone = tone === "dark";

  return (
    <div
      className={cx("relative flex-1 min-w-0", ANIMATE_BASE, fadeIn(isVisible))}
      style={{ backgroundColor: t.bg, transitionDelay: `${150 + delayOffset}ms` }}
    >
      <div className="h-full flex flex-col items-start gap-6 py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-12">
        <div className="relative inline-block">
          <span className="leading-none tracking-tight text-5xl sm:text-6xl lg:text-7xl font-medium" style={{ color: t.text }}>
            {value}
          </span>
          <span className="absolute -top-1 -right-4 sm:-right-5 text-xl sm:text-2xl font-medium" style={{ color: t.text }}>
            {suffix}
          </span>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-medium mb-4 tracking-tight" style={{ color: isDarkTone ? "#ffffff" : t.text }}>
            {label}
          </h3>
          <FacetTag label={tag} borderColor={t.tagBorder} textColor={t.textMuted} />
        </div>

        <div className="w-full pt-2" style={{ borderTop: `1px solid ${t.divider}` }} />

        <ColumnBody
          body={body}
          textColor={t.text}
          mutedColor={isDarkTone ? "rgba(255,255,255,0.85)" : t.textMuted}
          dividerColor={t.divider}
          bgColor={t.bg}
          isDarkTone={isDarkTone}
        />
      </div>
    </div>
  );
}
