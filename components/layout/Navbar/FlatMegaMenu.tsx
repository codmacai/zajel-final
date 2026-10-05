"use client";

import Link from "next/link";
import type { NavItem } from "@/data/navigation";
import Badge from "./Badge";
import IconPlaceholder from "./IconPlaceholder";

export default function FlatMegaMenu({
  title,
  items,
  columns = 3,
  isOpen,
  onClose,
  onMouseEnter,
}: {
  title: string;
  items: NavItem[];
  columns?: number;
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
}) {
  return (
    <>
      <div
        onClick={onClose}
        className="mega-backdrop"
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.15)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 48,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => onClose()}
        className="mega-panel"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          zIndex: 49,
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0)" : "translateY(-12px)",
          pointerEvents: isOpen ? "auto" : "none",
          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
          willChange: "transform, opacity",
        }}
      >
        <div style={{ maxWidth: 1600, margin: "0 auto", padding: "0 clamp(20px, 4vw, 48px)" }}>
          <div
            style={{
              background: "#fff",
              borderRadius: "0 0 24px 24px",
              boxShadow: "0 24px 60px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.03)",
              overflow: "hidden",
              padding: "36px 48px",
            }}
          >
            <p style={{ fontSize: 20, fontWeight: 300, color: "#0A4D26", marginBottom: 24, letterSpacing: "-0.01em" }}>
              {title}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 8 }}>
              {items.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.path}
                  onClick={() => onClose()}
                  className="mega-item"
                  style={{ animationDelay: `${idx * 0.04}s` }}
                >
                  <div className="mega-icon">{item.icon ?? <IconPlaceholder />}</div>

                  <div className="mega-text">
                    <p
                      style={{
                        margin: 0,
                        fontSize: 14.5,
                        fontWeight: 500,
                        color: "#0A4D26",
                        lineHeight: 1.3,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      {item.name}
                      {item.badge && <Badge type={item.badge} />}
                    </p>
                    <p style={{ margin: "4px 0 0", fontSize: 12.5, fontWeight: 300, color: "#6b7280", lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>

                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mega-arrow">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}