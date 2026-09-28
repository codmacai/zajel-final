"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { dockItems } from "@/data/dockItems";
import DockItem from "./DockItem"; // desktop dock item
import MobileDock from "./MobileDock"; // mobile notch dock (separate file)
import styles from "./Hero.module.css";

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleTrackSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector("input");
    if (input && input.value.trim()) {
      router.push(`/track?awb=${encodeURIComponent(input.value.trim())}`);
    } else {
      router.push("/track");
    }
  };

  const defaultActiveIndex = dockItems.findIndex((item) => item.primary);
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const activateItem = (i: number) => setActiveIndex(i);
  const resetItem = () => setActiveIndex(defaultActiveIndex);

  // Desktop dock only (mobile uses <MobileDock />)
  const renderDesktopDock = () => (
    <>
      {dockItems.map((item, i) => {
        const isActive = i === activeIndex;
        return (
          <React.Fragment key={item.href}>
            <DockItem
              href={item.href}
              icon={item.icon}
              label={t(item.labelKey, item.labelDefault)}
              sublabel={t(item.sublabelKey, item.sublabelDefault)}
              isActive={isActive}
              variant="desktop"
              onActivate={() => activateItem(i)}
              onReset={resetItem}
            />
            {i < dockItems.length - 1 && (
              <span
                className={`${styles.dockDivider} w-px self-center flex-shrink-0 my-3`}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );

  return (
    <>
      {/* MOBILE LAYOUT (< md) */}
      <section
        className={`md:hidden w-full bg-[#FAFCFA] ${styles.heroFont} px-4 pb-32 ${styles.mobileHero}`}
      >
        <div className="mx-auto flex w-full max-w-[480px] flex-col items-center text-center">
          <div className="w-full">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="h-[2px] w-6 bg-[#36B936]" />
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#36B936]">
                {t("hero.eyebrow", "Zajel Express")}
              </span>
            </div>

            <h1 className="text-2xl font-medium leading-[1.18] tracking-tight text-[#0A4D26] sm:text-3xl">
              {t("hero.title.line1", "Intelligent Movement,")}
              <br />
              {t("hero.title.line2", "Nationwide and Beyond")}
            </h1>

            <form
              onSubmit={handleTrackSubmit}
              className="mt-5 flex w-full items-center rounded-full border border-[#0A4D26]/15 bg-white p-1 shadow-sm"
            >
              <input
                type="text"
                placeholder={t("hero.search.placeholder", "Enter AWB number to track")}
                className={`${styles.n2Style} min-w-0 flex-1 bg-transparent px-4 text-xs text-[#0A4D26] outline-none placeholder:text-[#9CA3AF]`}
              />
              <button
                type="submit"
                className="flex-shrink-0 rounded-full bg-[#36B936] px-5 py-2.5 text-xs font-medium text-white transition-colors active:bg-[#2ea22e]"
              >
                {t("hero.search.button", "Track")}
              </button>
            </form>
          </div>

          <div className="relative mt-6 h-[clamp(220px,36svh,340px)] w-full overflow-hidden rounded-[1.5rem] border border-[#0A3D2D]/20 shadow-md">
            <Image
              src="/warehouse/magnific_aeroplane-should-be-white_ksi8V3F16B.png"
              alt="Cargo ship and airplane"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05241A]/60 via-[#0A3D2D]/20 to-transparent" />
          </div>
        </div>

        {/* Floating bottom navigation (mobile only) */}
        <MobileDock />
      </section>

      {/* DESKTOP / TABLET LAYOUT (md and up) */}
      <section
        className={`hidden md:flex md:min-h-screen w-full bg-[#F9FAFB] flex-col items-center justify-center ${styles.heroFont} overflow-hidden py-10 pb-12`}
      >
        <div className="relative mx-auto w-full max-w-[1600px] px-[clamp(1.5rem,4vw,3.5rem)]">
          <div
            className={`${styles.animBannerD} relative h-[clamp(440px,40vw,620px)] w-full overflow-hidden rounded-[clamp(20px,2vw,32px)] bg-gray-800 shadow-sm`}
          >
            <Image
              src="/hero-banner.jpg"
              alt="Cargo ship and airplane"
              fill
              priority
              sizes="100vw"
              className="scale-110 object-cover"
            />
            <div className={`${styles.bannerOverlay} absolute inset-0`} />

            <div className="absolute inset-x-0 top-0 flex flex-wrap items-start justify-between gap-10 px-[clamp(1.5rem,3.5vw,3.5rem)] pt-[clamp(1.75rem,3vw,3rem)] lg:flex-nowrap">
              <div className="flex-shrink-0">
                <h1
                  className={`${styles.animTitleD} ${styles.h1StyleLight} mb-6 text-[clamp(1.9rem,2.6vw,3rem)] leading-[1.15] tracking-tight`}
                >
                  {t("hero.title.line1", "Intelligent Movement,")}
                  <br />
                  {t("hero.title.line2", "Nationwide and Beyond")}
                </h1>

                <form
                  onSubmit={handleTrackSubmit}
                  className={`${styles.animSearchD} flex max-w-[clamp(360px,26vw,430px)] items-center rounded-full bg-white p-[6px] shadow-[0_10px_30px_rgba(0,0,0,0.25)]`}
                >
                  <span
                    className={`${styles.n2Style} whitespace-nowrap border-r border-gray-200 pl-4 pr-3 text-[clamp(0.7rem,0.75vw,0.8rem)] font-medium uppercase tracking-wide text-[#9CA3AF]`}
                  >
                    {t("hero.search.label", "AWB")}
                  </span>
                  <input
                    type="text"
                    placeholder={t("hero.search.placeholder", "Enter your AWB number to track")}
                    className={`${styles.n2Style} min-w-0 flex-1 bg-transparent px-4 text-[clamp(0.8rem,0.85vw,0.875rem)] outline-none placeholder:text-[#9CA3AF]`}
                  />
                  <button
                    type="submit"
                    className="flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#36B936] px-[clamp(1.25rem,1.8vw,1.75rem)] py-2.5 text-[clamp(0.8rem,0.85vw,0.875rem)] font-medium text-white transition-colors hover:bg-[#2ea22e]"
                  >
                    {t("hero.search.button", "Track")}
                  </button>
                </form>
              </div>

              <p
                className={`${styles.animSubtitleD} ${styles.bc1StyleLight} max-w-[min(32vw,420px)] pt-2 text-left text-[clamp(0.95rem,1.05vw,1.125rem)] leading-relaxed`}
              >
                {t(
                  "hero.subtitle",
                  "From a single shipment to a full supply chain, Zajel moves what matters, across the UAE and to 200+ countries beyond it"
                )}
              </p>
            </div>
          </div>

          <div
            className={`${styles.animDockD} absolute inset-x-0 -bottom-[clamp(2rem,3.2vw,3.5rem)] z-30 flex flex-col items-center px-[clamp(1rem,3vw,2rem)]`}
          >
            <div
              className={`${styles.dockCard} flex w-full max-w-[clamp(680px,58vw,920px)] items-stretch justify-between gap-0 rounded-[clamp(26px,3vw,36px)] px-[clamp(1.25rem,2vw,2rem)] py-[clamp(0.9rem,1.3vw,1.25rem)] shadow-[0_24px_50px_-12px_rgba(6,68,35,0.3)]`}
            >
              {renderDesktopDock()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;