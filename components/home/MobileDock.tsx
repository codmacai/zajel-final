"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { dockItems, type DockItemConfig } from "@/data/dockItems";

// Notch geometry: the button is centred on the bar's top edge.
// Cut-out radius = button radius (28) + gap (7), so the arc is concentric with the button.
const BUTTON = 56;
const NOTCH_R = BUTTON / 2 + 7; // 35
const NOTCH_MASK = `radial-gradient(circle ${NOTCH_R}px at 50% 0, transparent ${NOTCH_R - 1}px, #000 ${NOTCH_R}px)`;

// Short labels so five items fit on a phone. Override via i18n key "<labelKey base>.short".
const SHORT_LABELS: Record<string, string> = {
  "/quotation": "Rates",
  "/track": "Track",
  "/send-shipment": "Send",
  "/business-solutions": "Business",
  "/network": "Find Us",
};

// Extra pages that should keep a dock item highlighted, keyed by the item's href.
const RELATED_PATHS: Record<string, string[]> = {
  "/track": ["/trackresults", "/shipment-timeline"],
};

export default function MobileDock() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const centerIndex = (() => {
    const p = dockItems.findIndex((i) => i.primary);
    return p >= 0 ? p : Math.floor(dockItems.length / 2);
  })();
  const left = dockItems.slice(0, centerIndex);
  const center = dockItems[centerIndex];
  const right = dockItems.slice(centerIndex + 1);

  const labelFor = (item: DockItemConfig) =>
    t(item.labelKey.replace(/\.label$/, ".short"), SHORT_LABELS[item.href] ?? item.labelDefault);

  // An item is "current" on its own href or any related page listed in RELATED_PATHS
  // (e.g. Track stays highlighted on /trackresults and /shipment-timeline).
  const isCurrent = (item: DockItemConfig) =>
    [item.href, ...(RELATED_PATHS[item.href] ?? [])].some(
      (p) => pathname === p || pathname?.startsWith(`${p}/`)
    );

  const SideItem = ({ item }: { item: DockItemConfig }) => {
    const Icon = item.icon;
    const active = isCurrent(item);
    return (
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className="flex h-16 min-w-0 flex-1 flex-col items-center justify-center gap-1 outline-none transition-transform duration-200 active:scale-90 motion-reduce:transition-none"
      >
        <span
          className={`flex h-7 w-11 items-center justify-center rounded-full transition-colors duration-300 motion-reduce:transition-none ${
            active ? "bg-[#36B936]/15" : "bg-transparent"
          }`}
        >
          <Icon
            className={`h-[21px] w-[21px] transition-colors duration-200 ${active ? "text-[#1F9E1F]" : "text-[#0A4D26]/55"}`}
            strokeWidth={active ? 2 : 1.6}
          />
        </span>
        <span
          className={`max-w-full truncate px-0.5 text-[10px] leading-none tracking-tight transition-colors duration-200 ${
            active ? "font-semibold text-[#0A4D26]" : "font-medium text-[#0A4D26]/55"
          }`}
        >
          {labelFor(item)}
        </span>
      </Link>
    );
  };

  const CenterIcon = center.icon;

  return (
    <nav
      aria-label="Quick actions"
      className="pointer-events-none fixed inset-x-0 z-50 px-4"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 14px)" }}
    >
      <div className="pointer-events-auto relative mx-auto w-full max-w-[400px]">
        {/* Soft brand glow, sits behind the glass */}
        <div aria-hidden className="absolute inset-x-8 -bottom-3 top-8 -z-10 rounded-full bg-[#36B936]/25 blur-2xl" />

        {/* Glass bar with a true circular notch (mask), concentric with the button */}
        <div
          className="relative flex h-16 w-full items-stretch rounded-[28px] border border-white/70
                     bg-gradient-to-b from-white/75 to-white/45
                     backdrop-blur-2xl backdrop-saturate-[1.8]
                     shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(10,77,38,0.06)]"
          style={{ WebkitMaskImage: NOTCH_MASK, maskImage: NOTCH_MASK }}
        >
          <div className="flex min-w-0 flex-1">
            {left.map((item) => (
              <SideItem key={item.href} item={item} />
            ))}
          </div>

          {/* Centre spacer: wider than the notch so labels never touch the arc */}
          <div className="w-[84px] shrink-0" aria-hidden />

          <div className="flex min-w-0 flex-1">
            {right.map((item) => (
              <SideItem key={item.href} item={item} />
            ))}
          </div>
        </div>

        {/* Rim along the carved arc (lower half of a circle, same radius as the notch) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 overflow-hidden"
          style={{ width: NOTCH_R * 2, height: NOTCH_R }}
        >
          <div
            className="rounded-full border border-white/80 shadow-[inset_0_-6px_12px_-6px_rgba(10,77,38,0.12)]"
            style={{ width: NOTCH_R * 2, height: NOTCH_R * 2 }}
          />
        </div>

        {/* Centre action: centred on the bar's top edge */}
        <Link
          href={center.href}
          aria-current={isCurrent(center) ? "page" : undefined}
          aria-label={labelFor(center)}
          className="group absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 outline-none"
        >
          <span
            className="flex items-center justify-center rounded-full border border-white/40 bg-gradient-to-b from-[#6BE36B] via-[#36B936] to-[#1F7A12] shadow-[0_10px_22px_-4px_rgba(54,185,54,0.6),inset_0_1px_0_rgba(255,255,255,0.55)] transition-transform duration-200 group-active:scale-90 motion-reduce:transition-none"
            style={{ width: BUTTON, height: BUTTON }}
          >
            <CenterIcon className="h-6 w-6 text-white" strokeWidth={1.8} />
          </span>
        </Link>

        {/* Centre label, inside the bar below the arc */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-[11px] left-1/2 -translate-x-1/2 text-[10px] font-semibold leading-none tracking-tight text-[#0A4D26]"
        >
          {labelFor(center)}
        </span>
      </div>
    </nav>
  );
}