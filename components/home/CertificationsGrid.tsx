"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useSharedRevealObserver, useReveal } from "@/lib/useReveal";
import "./CertificationsGrid.css";

type CertItem = {
  id: string;
  name: string; // used for alt text and aria-label
  logo: string; // path inside /public
};

const certs: CertItem[] = [
  { id: "1", name: "ISO 9001:2015", logo: "/Homepage/alliances/magnific_photo-five-logos-displaye_ovriEs7829 copy 2.png" },
  { id: "2", name: "ISO 14001:2015", logo: "/Homepage/alliances/magnific_photo-five-logos-displaye_ovriEs7829 copy 3.png" },
  { id: "3", name: "ISO 45001:2018", logo: "/Homepage/alliances/magnific_photo-five-logos-displaye_ovriEs7829 copy 4.png" },
  { id: "4", name: "FIATA Alliance", logo: "/Homepage/alliances/magnific_photo-five-logos-displaye_ovriEs7829 copy 5.png" },
  { id: "5", name: "IATA Cargo Agent", logo: "/Homepage/alliances/magnific_photo-five-logos-displaye_ovriEs7829 copy 6.png" },
  { id: "6", name: "TAPA Certified", logo: "/Homepage/alliances/magnific_photo-five-logos-displaye_ovriEs7829 copy.png" },
];

export default function CertificationsGrid() {
  const { register } = useSharedRevealObserver();
  const { ref: sectionRef, isVisible } = useReveal<HTMLElement>(register);

  return (
    <section ref={sectionRef} className={`cg-section ${isVisible ? "is-visible" : ""}`}>
      <div className="cg-container">
        {/* Header */}
        <div className="cg-header">
          <span className="cg-eyebrow">Accreditations &amp; Alliances</span>
          <h2 className="cg-heading">Certified for global trust</h2>
        </div>

        {/* 3x2 grid, 3 columns on every device */}
        <div className="cg-grid">
          {certs.map((item, index) => (
            <Link
              href="/about#certifications"
              key={item.id}
              className={`cg-cell cg-delay-${index}`}
              aria-label={item.name}
            >
              <div className="cg-logo-wrapper">
                <img
                  src={item.logo}
                  alt={`${item.name} certification`}
                  className="cg-logo-img"
                  loading="lazy"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Link below the grid */}
        <div className="cg-footer cg-delay-6">
          <Link href="/about#certifications" className="cg-link">
            <span>View all in About Us</span>
            <ArrowUpRight className="cg-link-icon" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}