"use client";

import { useEffect, useRef, useState } from "react";
import type { Industry } from "@/data/industry-expertise";

interface IndustryBlockProps {
  industry: Industry;
  zIndex: number;
}

export default function IndustryBlock({ industry, zIndex }: IndustryBlockProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isGreen = industry.tone === "green";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const bg = isGreen ? "#36B936" : "#FFFFFF";
  const textPrimary = isGreen ? "#FFFFFF" : "#0B140F";
  const textMuted = isGreen ? "rgba(255,255,255,0.8)" : "#4B5750";
  const badgeBg = isGreen ? "rgba(255,255,255,0.18)" : "rgba(54, 185, 54, 0.12)";
  const badgeText = isGreen ? "#FFFFFF" : "#36B936";
  const dividerColor = isGreen ? "rgba(255,255,255,0.2)" : "rgba(11, 20, 15, 0.1)";
  const featureIconBg = isGreen ? "rgba(255,255,255,0.16)" : "rgba(54, 185, 54, 0.12)";
  const featureIconColor = isGreen ? "#FFFFFF" : "#36B936";

  return (
    <div
      ref={ref}
      className="sticky top-0 w-full min-h-screen flex items-center transition-shadow duration-300 font-['Manrope',sans-serif]"
      style={{
        backgroundColor: bg,
        zIndex,
        boxShadow: isGreen
          ? "0 -20px 40px rgba(0,0,0,0.12)"
          : "0 -20px 40px rgba(0,0,0,0.06)",
      }}
    >
      <div className="w-full py-16 sm:py-20 px-5 sm:px-8 md:px-12 lg:px-20 my-auto">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-16">
          
          {/* Left Column: Index Badge, Subheader, Paragraphs & Proof Metrics */}
          <div className="min-w-0">
            {/* Minimal Index Pill */}
            <div className="mb-3.5 sm:mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1" style={{ backgroundColor: badgeBg }}>
              <span className="font-mono text-xs font-semibold tracking-wider" style={{ color: badgeText }}>
                //{industry.index}
              </span>
            </div>

            <h3
              className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight tracking-tight"
              style={{ color: textPrimary, maxWidth: "20ch" }}
            >
              {industry.subheader}
            </h3>

            <div className="mt-4 sm:mt-6 space-y-3">
              {industry.paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-xs sm:text-sm md:text-base font-normal leading-relaxed"
                  style={{ color: textMuted, maxWidth: "58ch" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {industry.proof && industry.proof.length > 0 && (
              <div
                className="mt-6 sm:mt-8 pt-5 sm:pt-6 flex flex-wrap gap-6 sm:gap-10"
                style={{ borderTop: `1px solid ${dividerColor}` }}
              >
                {industry.proof.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight" style={{ color: textPrimary }}>
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-xs sm:text-sm font-normal leading-snug" style={{ color: textMuted, maxWidth: "16ch" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: 2-Column Capability Grid */}
          <div
            className="grid min-w-0 grid-cols-2 gap-4 sm:gap-6 lg:gap-8 pt-6 lg:pt-0"
            style={{
              borderTop: `1px solid ${dividerColor}`,
            }}
          >
            {industry.capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-start"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(12px)",
                    transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`,
                  }}
                >
                  <span
                    className="mb-2.5 sm:mb-3 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl transition-transform hover:scale-105"
                    style={{ backgroundColor: featureIconBg }}
                  >
                    <Icon size={18} strokeWidth={1.75} color={featureIconColor} aria-hidden="true" />
                  </span>
                  <p className="text-xs sm:text-sm font-normal leading-relaxed" style={{ color: textPrimary }}>
                    {cap.text}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}