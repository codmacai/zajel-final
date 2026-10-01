"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import Chevron from "./Chevron";
import SolutionsMegaMenu from "./SolutionsMegaMenu";
import FlatMegaMenu from "./FlatMegaMenu";
import MobileMenu from "./MobileMenu";
import { aboutItems, resourcesItems } from "@/data/navigation";
import "./Navbar.css";

// Ignore tiny scroll movements so the bar doesn't flicker.
const SCROLL_DELTA = 6;
// Never hide the navbar while the page is near the top.
const HIDE_AFTER = 80;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navOuterRef = useRef<HTMLElement | null>(null);
  const lastY = useRef(0);

  const openMenu = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(key);
  };

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 100);
  };

  // Scroll behaviour: scroll down → hide, scroll up → show, top of page → always show.
  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = Math.max(window.scrollY, 0);
      setScrolled(y > 10);

      if (y <= HIDE_AFTER) {
        setHidden(false);
        lastY.current = y;
        return;
      }

      const diff = y - lastY.current;
      if (Math.abs(diff) < SCROLL_DELTA) return;

      setHidden(diff > 0);
      lastY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const setNavHeight = () => {
      if (navOuterRef.current) {
        const h = navOuterRef.current.getBoundingClientRect().height;
        document.documentElement.style.setProperty("--navbar-h", `${h}px`);
      }
    };
    setNavHeight();
    window.addEventListener("resize", setNavHeight);
    const ro = new ResizeObserver(setNavHeight);
    if (navOuterRef.current) ro.observe(navOuterRef.current);
    return () => {
      window.removeEventListener("resize", setNavHeight);
      ro.disconnect();
    };
  }, [scrolled]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleMenu = (key: string) => setActiveMenu((p) => (p === key ? null : key));

  const navLinks = [{ label: "Track", path: "/track" }];

  // Keep the bar visible whenever a menu is open.
  const isHidden = hidden && !activeMenu && !mobileOpen;

  return (
    <>
      <nav ref={navOuterRef} className={`nav-outer ${isHidden ? "nav-outer-hidden" : ""}`}>
        <div className={`nav-shell ${scrolled || activeMenu ? "nav-snapped" : "nav-top-glass"}`}>
          <div className="nav-inner">
            <div className="logo-mark" style={{ flexShrink: 0, display: "flex" }}>
              <Link href="/" style={{ textDecoration: "none" }} onClick={() => setActiveMenu(null)}>
                <Logo />
              </Link>
            </div>

            <div
              className="desktop-nav"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(20px, 2.5vw, 36px)", flex: 1 }}
            >
              {navLinks.map(({ label, path }) => (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setActiveMenu(null)}
                  onMouseEnter={closeMenu}
                  className="nav-link"
                  style={{ fontSize: 14, textDecoration: "none" }}
                >
                  {label}
                </Link>
              ))}

              {[
                { key: "solutions", label: "Solutions" },
                { key: "about", label: "About Us" },
                { key: "resources", label: "Resources" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => toggleMenu(key)}
                  onMouseEnter={() => openMenu(key)}
                  className="nav-link"
                  style={{
                    fontSize: 14,
                    background: "none",
                    border: "none",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    cursor: "pointer",
                    color: activeMenu === key ? "#2BA735" : "",
                    opacity: activeMenu === key ? 1 : undefined,
                  }}
                >
                  {label}
                  <Chevron open={activeMenu === key} />
                </button>
              ))}
            </div>

            <div
              className="desktop-nav"
              style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "clamp(12px, 1.5vw, 20px)", flexShrink: 0 }}
            >
              <Link href="/#download-app" className="btn-quote" onClick={() => setActiveMenu(null)}>
                Download the app
              </Link>
              <LanguageSwitcher />
              <Link href="/login" className="btn-login" onClick={() => setActiveMenu(null)}>
                Login
              </Link>
            </div>

            <div className="mobile-only" style={{ display: "none" }}>
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                style={{ background: "none", border: "none", cursor: "pointer", color: "#0A4D26", padding: 8 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SolutionsMegaMenu isOpen={activeMenu === "solutions"} onClose={closeMenu} onMouseEnter={() => openMenu("solutions")} />
      <FlatMegaMenu title="About Us" items={aboutItems} columns={3} isOpen={activeMenu === "about"} onClose={closeMenu} onMouseEnter={() => openMenu("about")} />
      <FlatMegaMenu title="Resources" items={resourcesItems} columns={2} isOpen={activeMenu === "resources"} onClose={closeMenu} onMouseEnter={() => openMenu("resources")} />

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}