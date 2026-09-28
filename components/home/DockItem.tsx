"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import styles from "./Hero.module.css";

interface DockItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  sublabel: string;
  isActive: boolean;
  variant: "mobile" | "desktop";
  onActivate: () => void;
  onReset: () => void;
}

const sizeClasses = {
  mobile: {
    item: "flex-shrink-0 w-[clamp(58px,15vw,68px)] py-1.5",
    icon: "w-[clamp(38px,10vw,44px)] h-[clamp(38px,10vw,44px)]",
    iconGlyph: "w-[clamp(16px,4.2vw,19px)] h-[clamp(16px,4.2vw,19px)]",
    label: "text-[clamp(8px,2.3vw,9px)]",
    sublabel: "text-[clamp(6.5px,1.9vw,7.5px)]",
  },
  desktop: {
    item: "flex-1 min-w-0 py-3 px-2",
    icon: "w-[clamp(42px,3.6vw,50px)] h-[clamp(42px,3.6vw,50px)]",
    iconGlyph: "w-[clamp(19px,1.7vw,23px)] h-[clamp(19px,1.7vw,23px)]",
    label: "text-[clamp(11.5px,0.95vw,14px)]",
    sublabel: "text-[clamp(10px,0.82vw,12px)]",
  },
};

export default function DockItem({
  href,
  icon: Icon,
  label,
  sublabel,
  isActive,
  variant,
  onActivate,
  onReset,
}: DockItemProps) {
  const sizes = sizeClasses[variant];
  const bgClass = variant === "mobile" ? styles.dockBgDefault : styles.dockTileBgDefault;
  const bgPrimaryClass = variant === "mobile" ? styles.dockBgPrimary : styles.dockTileBgPrimary;
  const shapeClass = variant === "mobile" ? "rounded-full" : "rounded-[clamp(18px,2vw,24px)]";

  return (
    <Link
      href={href}
      onMouseEnter={onActivate}
      onMouseLeave={onReset}
      onFocus={onActivate}
      onBlur={onReset}
      className={`${styles.dockItem} ${
        variant === "mobile" && !isActive ? styles.dockItemDefault : ""
      } ${sizes.item} flex flex-col items-center text-center gap-1.5 outline-none relative overflow-hidden ${shapeClass}`}
    >
      <span
        className={`${styles.dockBgLayer} ${bgClass} ${shapeClass}`}
        style={{ opacity: isActive ? 0 : 1 }}
      />
      <span
        className={`${styles.dockBgLayer} ${bgPrimaryClass} ${shapeClass}`}
        style={{ opacity: isActive ? 1 : 0 }}
      />

      <div
        className={`${styles.dockIconWrap} ${styles.dockIcon} ${sizes.icon} rounded-full flex items-center justify-center relative overflow-hidden`}
        style={
          variant === "desktop"
            ? { background: isActive ? "rgba(255,255,255,0.15)" : "#F2F4F3" }
            : undefined
        }
      >
        <Icon
          className={sizes.iconGlyph}
          style={{ color: isActive ? "#FFFFFF" : "#0F1A12" }}
          strokeWidth={1.6}
        />
      </div>

      <span
        className={`${styles.dockLabel} ${sizes.label} leading-tight font-semibold ${
          isActive ? styles.dockLabelPrimary : styles.dockLabelDefault
        }`}
      >
        {label}
      </span>
      <span
        className={`${styles.dockLabel} ${sizes.sublabel} leading-tight font-normal ${
          isActive ? styles.dockSublabelPrimary : styles.dockSublabelDefault
        }`}
      >
        {sublabel}
      </span>
    </Link>
  );
}