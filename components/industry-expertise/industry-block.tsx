"use client";

import { useEffect, useRef, useState } from "react";
import type { Industry } from "@/data/industry-expertise";
import IndustryIcon from "./industry-icons";

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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const bg = isGreen ? "#36B936" : "#FFFFFF";
  const textPrimary = isGreen ? "#FFFFFF" : "#0B140F";
  const textMuted = isGreen ? "rgba(255,255,255,0.78)" : "#4B5750";
  const indexColor = isGreen ? "rgba(11,20,15,0.65)" : "#36B936";
  const dividerColor = isGreen ? "rgba(255,255,255,0.22)" : "rgba(11, 20, 15, 0.1)";
  const iconColor = isGreen ? "#FFFFFF" : "#36B936";
  const featureIconBg = isGreen ? "rgba(255,255,255,0.16)" : "rgba(54, 185, 54, 0.12)";
  const featureIconColor = isGreen ? "#FFFFFF" : "#36B936";

  return (
    <div
      ref={ref}
      className="sticky top-0 flex min-h-screen w-full items-center overflow-y-auto"
      style={{
        backgroundColor: bg,
        zIndex,
        padding: "clamp(40px, 6vw, 88px) clamp(1.25rem, 4vw, 3rem)",
        boxShadow: isGreen ? "0 -24px 48px rgba(0,0,0,0.10)" : "0 -24px 48px rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="mx-auto grid w-full max-w-[1280px] grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] my-auto"
        style={{ gap: "clamp(28px, 4vw, 64px)" }}
      >
        {/* Left: large icon, index, subheader, paragraphs */}
        <div className="min-w-0">
          <div
            style={{
              width: "clamp(56px, 6.4vw, 96px)",
              height: "clamp(56px, 6.4vw, 96px)",
              marginBottom: "clamp(18px, 2.4vw, 28px)",
              color: iconColor,
            }}
          >
            <IndustryIcon name={industry.icon} />
          </div>

          <span
            className="block font-['Manrope',sans-serif] font-normal"
            style={{
              fontSize: "clamp(0.75rem, 1vw, 0.85rem)",
              color: indexColor,
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "0.02em",
              marginBottom: "clamp(10px, 1.4vw, 14px)",
            }}
          >
            {industry.index}
          </span>

          <h3
            className="font-['Manrope',sans-serif] font-medium"
            style={{
              fontSize: "clamp(1.35rem, 2.6vw, 2.1rem)",
              lineHeight: 1.2,
              color: textPrimary,
              maxWidth: "18ch",
            }}
          >
            {industry.subheader}
          </h3>

          <div style={{ marginTop: "clamp(14px, 2vw, 20px)" }}>
            {industry.paragraphs.map((p, i) => (
              <p
                key={i}
                className="font-['Manrope',sans-serif] font-normal"
                style={{
                  fontSize: "clamp(0.85rem, 1.15vw, 1rem)",
                  lineHeight: 1.6,
                  color: textMuted,
                  maxWidth: "58ch",
                  marginTop: i === 0 ? 0 : "12px",
                }}
              >
                {p}
              </p>
            ))}
          </div>

          {industry.proof && (
            <div
              className="flex flex-wrap"
              style={{
                gap: "clamp(20px, 3vw, 36px)",
                marginTop: "clamp(20px, 3vw, 32px)",
                paddingTop: "clamp(16px, 2.4vw, 24px)",
                borderTop: `1px solid ${dividerColor}`,
              }}
            >
              {industry.proof.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-['Manrope',sans-serif] font-semibold"
                    style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.9rem)", color: textPrimary }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="font-['Manrope',sans-serif] font-normal"
                    style={{
                      fontSize: "clamp(0.65rem, 0.85vw, 0.78rem)",
                      color: textMuted,
                      marginTop: "2px",
                      maxWidth: "16ch",
                      lineHeight: 1.35,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: capabilities as a two-column feature grid, icon-led */}
        <div
          className="grid min-w-0 grid-cols-2"
          style={{
            gap: "clamp(24px, 2.8vw, 36px) clamp(24px, 3vw, 44px)",
            borderTop: `1px solid ${dividerColor}`,
            paddingTop: "clamp(28px, 3.4vw, 40px)",
          }}
        >
          {industry.capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={i}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(6px)",
                  transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`,
                }}
              >
                <span
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: "clamp(34px, 3.4vw, 42px)",
                    height: "clamp(34px, 3.4vw, 42px)",
                    backgroundColor: featureIconBg,
                    marginBottom: "12px",
                  }}
                >
                  <Icon size={18} strokeWidth={1.75} color={featureIconColor} aria-hidden="true" />
                </span>
                <p
                  className="font-['Manrope',sans-serif] font-normal"
                  style={{ fontSize: "clamp(0.82rem, 1.05vw, 0.94rem)", lineHeight: 1.5, color: textPrimary }}
                >
                  {cap.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}