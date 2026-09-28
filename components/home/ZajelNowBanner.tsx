"use client";

import React from "react";

/**
 * ZAJEL NOW / Logistics promo banner with Pixel-Perfect Pop-Out
 * Matched to the exact card width and mobile sizing of the download banner.
 */

const DARK_1 = "#064423";
const DARK_2 = "#0B3A24";
const ACCENT = "#36B936";
const ACCENT_LIGHT = "#7ED957";
const PANEL_1 = "#0B3A24";
const PANEL_2 = "#10241A";

// Scale applies ONLY to the pop-out cutout (top layer).
const IMG_SCALE = 0.65;
const IMG_ORIGIN = "70% 100%";
const IMG_ORIGIN_MOBILE = "100% 100%";
const IMG_SHIFT_Y_MOBILE = "22%";

const DARK_PANEL_BG = `
  radial-gradient(120% 140% at 0% 0%, ${ACCENT}22 0%, transparent 45%),
  radial-gradient(90% 120% at 100% 100%, #000000 0%, transparent 55%),
  linear-gradient(155deg, ${DARK_1} 0%, #08341B 35%, ${DARK_2} 65%, #041E10 100%)
`;

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700&display=swap";

export default function EmxBanner() {
  return (
    <div
      className="flex w-full items-center justify-center bg-white p-4 sm:p-6 md:p-8"
      style={{
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      <link rel="stylesheet" href={FONT_LINK} />

      {/* Soft-fade mask styles for middle dark panel */}
      <style jsx global>{`
        .emx-cutout {
          transform: none;
        }
        @media (max-width: 767px) {
          .emx-cutout {
            transform: translateY(${IMG_SHIFT_Y_MOBILE});
            transform-origin: ${IMG_ORIGIN_MOBILE};
          }
        }
        @media (min-width: 768px) {
          .emx-cutout {
            transform: scale(${IMG_SCALE});
            transform-origin: ${IMG_ORIGIN};
          }
        }

        @media (max-width: 767px) {
          .emx-cutout-wrap {
            -webkit-clip-path: inset(-100vh 0 0 0 round 0 0 28px 28px);
            clip-path: inset(-100vh 0 0 0 round 0 0 28px 28px);
          }
        }
        @media (min-width: 640px) and (max-width: 767px) {
          .emx-cutout-wrap {
            -webkit-clip-path: inset(-100vh 0 0 0 round 0 0 28px 28px);
            clip-path: inset(-100vh 0 0 0 round 0 0 28px 28px);
          }
        }

        .emx-clip-panel, .emx-clip-panel-shadow {
          -webkit-mask-image: linear-gradient(168deg, #000 50%, transparent 74%);
          mask-image: linear-gradient(168deg, #000 50%, transparent 74%);
        }
        .emx-clip-panel-shadow {
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), inset 1px 0 0 rgba(255,255,255,0.06);
        }

        @media (min-width: 480px) and (max-width: 767px) {
          .emx-clip-panel, .emx-clip-panel-shadow {
            -webkit-mask-image: linear-gradient(168deg, #000 46%, transparent 70%);
            mask-image: linear-gradient(168deg, #000 46%, transparent 70%);
          }
        }

        @media (min-width: 768px) {
          .emx-clip-panel, .emx-clip-panel-shadow {
            -webkit-mask-image: linear-gradient(137deg, #000 34%, transparent 58%);
            mask-image: linear-gradient(137deg, #000 34%, transparent 58%);
          }
        }
      `}</style>

      {/* Outer Card Wrapper Matched to CompactSaaSBanner dimensions */}
      <div
        className="relative my-16 w-full max-w-[1140px] rounded-[28px] shadow-[0_20px_60px_-15px_rgba(6,68,35,0.55)] overflow-visible"
      >
        <div
          className="relative min-h-[560px] sm:min-h-[300px] md:min-h-[270px] rounded-[28px] overflow-visible"
          style={{ background: `linear-gradient(135deg, ${PANEL_1} 0%, ${PANEL_2} 100%)` }}
        >
          {/* ========================================================= */}
          {/* SHARED IMAGE CANVAS FRAME                                 */}
          {/* ========================================================= */}
          <div className="absolute inset-x-0 bottom-0 -top-1.5 sm:-top-2 md:-top-3 pointer-events-none overflow-visible">

            {/* LAYER 1: Background Base Image */}
            <div
              className="absolute inset-0 overflow-hidden rounded-[28px]"
              style={{ top: "0.5rem" }}
            >
              <img
                src="/ChatGPT Image Sep 16, 2026, 10_20_26 AM.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-[66%_bottom] sm:object-[63%_bottom] md:object-center"
              />
              <div
                className="absolute top-3 sm:top-4 right-3 sm:right-5 left-[50%] md:left-[54%] h-px transition-all duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${ACCENT_LIGHT}88, transparent)` }}
              />
              <div
                className="absolute bottom-12 sm:bottom-16 right-3 sm:right-5 left-[40%] md:left-[54%] h-px transition-all duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${ACCENT_LIGHT}88, transparent)` }}
              />
            </div>

            {/* LAYER 2: Diagonal Dark Green Panel + Text Content */}
            <div
              className="absolute inset-x-0 bottom-0 z-10 flex items-start md:items-center emx-clip-panel transition-all duration-300 rounded-[28px] overflow-hidden"
              style={{
                top: "0.5rem",
                background: DARK_PANEL_BG,
                filter:
                  "drop-shadow(0 16px 28px rgba(0,0,0,0.5)) drop-shadow(0 6px 12px rgba(0,0,0,0.38)) drop-shadow(4px 0 8px rgba(0,0,0,0.32))",
              }}
            >
              <div className="absolute inset-0 pointer-events-none emx-clip-panel-shadow transition-all duration-300" />

              <div className="relative z-10 w-full pt-12 pl-6 pr-4 xs:pt-16 xs:pl-8 sm:pt-7 md:pt-0 md:pl-8 lg:pl-10 max-w-[95%] xs:max-w-[88%] sm:max-w-[75%] md:max-w-sm">
                <TextBlock />
              </div>
            </div>

            {/* LAYER 3: Overlay Cutout */}
            <div
              className="emx-cutout-wrap absolute inset-x-0 bottom-0 z-20 top-2 md:-top-64 overflow-visible"
            >
              <img
                src="/magnific_make-the-img1-realistic-h_5jNGRUBKxe (1).png"
                alt=""
                className="emx-cutout absolute inset-0 h-full w-full object-cover object-[66%_bottom] sm:object-[63%_bottom] md:object-center drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextBlock() {
  return (
    <>
      <h2
        className="font-light leading-[0.9] text-white text-4xl xs:text-5xl sm:text-4xl lg:text-[2.6rem] tracking-tight lowercase"
        style={{ fontWeight: 300 }}
      >
        zajel
        <br />
        <span style={{ color: ACCENT, fontWeight: 400 }}>now</span>
      </h2>

      <p
        className="mt-4 xs:mt-5 sm:mt-3 lg:mt-4 font-light leading-snug text-white/90 text-base xs:text-lg sm:text-base max-w-[92%] lowercase"
        style={{ fontWeight: 300 }}
      >
        instant city-wide pickups and deliveries,{" "}
        <span style={{ color: ACCENT_LIGHT }}>on demand</span>.
      </p>
    </>
  );
}