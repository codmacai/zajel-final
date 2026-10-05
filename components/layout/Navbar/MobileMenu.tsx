"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { solutionsCategories, aboutItems, resourcesItems, type NavItem } from "@/data/navigation";
import Badge from "./Badge";
import IconPlaceholder from "./IconPlaceholder";
import Chevron from "./Chevron";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";

export default function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [mobileSubCat, setMobileSubCat] = useState<Record<string, number | null>>({});

  const toggle = (key: string) => setOpenSection((p) => (p === key ? null : key));
  const toggleSub = (key: string, idx: number) => setMobileSubCat((p) => ({ ...p, [key]: p[key] === idx ? null : idx }));

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Track", path: "/track" },
  ];

  const megaItems: { key: string; label: string; categories?: typeof solutionsCategories; items?: NavItem[] }[] = [
    { key: "solutions", label: "Solutions", categories: solutionsCategories },
    { key: "about", label: "About Us", items: aboutItems },
    { key: "resources", label: "Resources", items: resourcesItems },
  ];

  const renderFlatItem = (item: NavItem, iIdx: number) => (
    <Link
      key={iIdx}
      href={item.path}
      onClick={() => onClose()}
      style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 24px 12px 32px", textDecoration: "none" }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "#fafafa",
          border: "1px solid rgba(0,0,0,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#0A4D26",
          flexShrink: 0,
        }}
      >
        {item.icon ?? <IconPlaceholder />}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#0A4D26", display: "flex", alignItems: "center", gap: 6 }}>
          {item.name}
          {item.badge && <Badge type={item.badge} />}
        </p>
        <p style={{ margin: "4px 0 0", fontSize: 12, fontWeight: 300, color: "#6b7280" }}>{item.desc}</p>
      </div>
    </Link>
  );

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          // blur only while open: an invisible full-screen blur still costs every frame on phones
          backdropFilter: isOpen ? "blur(6px)" : "none",
          WebkitBackdropFilter: isOpen ? "blur(6px)" : "none",
          zIndex: 58,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      />

      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(85vw, 400px)",
          background: "#fff",
          zIndex: 59,
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          // once closed it is hidden: its shadow no longer leaks onto the page edge,
          // and its links can't be reached by keyboard while it's off screen
          visibility: isOpen ? "visible" : "hidden",
          transition: isOpen
            ? "transform 0.5s cubic-bezier(0.16,1,0.3,1)"
            : "transform 0.5s cubic-bezier(0.16,1,0.3,1), visibility 0s linear 0.5s",
          willChange: "transform",
          boxShadow: isOpen ? "-30px 0 60px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            height: 72,
            borderBottom: "1px solid rgba(0,0,0,0.04)",
            flexShrink: 0,
          }}
        >
          <Logo />
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#6b7280",
              transition: "color 0.2s",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "12px 0" }}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => onClose()}
              style={{
                display: "block",
                padding: "16px 24px",
                fontSize: 15,
                fontWeight: 400,
                color: "#0A4D26",
                textDecoration: "none",
                borderBottom: "1px solid rgba(0,0,0,0.03)",
              }}
            >
              {item.label}
            </Link>
          ))}

          {megaItems.map(({ key, label, categories, items }) => (
            <div key={key} style={{ borderBottom: "1px solid rgba(0,0,0,0.03)" }}>
              <button
                onClick={() => toggle(key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "16px 24px",
                  fontSize: 15,
                  fontWeight: 400,
                  color: "#0A4D26",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {label}
                <Chevron open={openSection === key} />
              </button>

              {openSection === key && (
                <div style={{ paddingBottom: 16 }}>
                  {categories &&
                    categories.map((cat, catIdx) => (
                      <div key={cat.id}>
                        <button
                          onClick={() => toggleSub(key, catIdx)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            padding: "12px 24px 12px 32px",
                            fontSize: 11,
                            fontWeight: cat.highlight ? 700 : 600,
                            color: cat.highlight ? "#0A4D26" : "#9ca3af",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          {cat.columnLabel}
                          <Chevron open={mobileSubCat[key] === catIdx} />
                        </button>

                        {mobileSubCat[key] === catIdx && cat.items.map((item, iIdx) => renderFlatItem(item, iIdx))}
                      </div>
                    ))}

                  {items && items.map((item, iIdx) => renderFlatItem(item, iIdx))}
                </div>
              )}
            </div>
          ))}

          <div style={{ padding: "24px" }}>
            <LanguageSwitcher />
          </div>
        </div>

        <div
          style={{
            padding: "20px 24px 32px",
            background: "#fafafa",
            borderTop: "1px solid rgba(0,0,0,0.03)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <Link href="/login" className="btn-login" style={{ width: "100%", textAlign: "center" }}>
            Login
          </Link>
          <Link
            href="/quotation"
            className="btn-quote"
            style={{ width: "100%", textAlign: "center", justifyContent: "center", display: "flex" }}
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </>
  );
}