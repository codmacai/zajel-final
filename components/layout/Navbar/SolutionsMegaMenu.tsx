"use client";

import Link from "next/link";
import { solutionsCategories } from "@/data/navigation";
import Badge from "./Badge";
import IconPlaceholder from "./IconPlaceholder";

export default function SolutionsMegaMenu({
  isOpen,
  onClose,
  onMouseEnter,
}: {
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
              padding: "52px 56px",
            }}
          >
            <div className="solutions-columns">
              {solutionsCategories.map((cat) => (
                <div key={cat.id} className="solutions-col">
                  <span className={`solutions-col-header ${cat.highlight ? "solutions-col-header-highlight" : ""}`}>
                    {cat.columnLabel}
                  </span>

                  <div className="solutions-items-grid">
                    {cat.items.map((item, idx) => (
                      <Link key={idx} href={item.path} onClick={() => onClose()} className="solutions-item">
                        <div className="solutions-item-icon">{item.icon ?? <IconPlaceholder />}</div>
                        <div className="solutions-item-text">
                          <span className="solutions-item-name">
                            {item.name}
                            {item.badge && <Badge type={item.badge} />}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="solutions-item-arrow">
                              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          <span className="solutions-item-desc">{item.desc}</span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <Link href={cat.path} onClick={() => onClose()} className="solutions-view-all">
                    {cat.viewAllLabel}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}