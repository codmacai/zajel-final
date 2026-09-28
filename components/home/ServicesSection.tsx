"use client";

import { useTranslation } from "react-i18next";
import { useSharedRevealObserver, useReveal } from "@/lib/useReveal";
import { SERVICE_CATEGORIES } from "@/data/services";
import ServiceColumn from "./ServiceColumn";
import styles from "./ServicesSection.module.css";

const ANIMATE_BASE = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
const fadeIn = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10");
const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

export default function ServicesSection() {
  const { t } = useTranslation();
  const { register } = useSharedRevealObserver();
  const { ref, isVisible } = useReveal<HTMLElement>(register);

  return (
    <section 
      ref={ref} 
      className={`w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#FAFAF8] overflow-hidden ${styles.servicesSection}`}
    >
      <div className="mx-auto max-w-[1200px]">
        
        {/* Section Heading with tiny mobile sizing */}
        <div className={cx("text-center mb-4 sm:mb-6", ANIMATE_BASE, fadeIn(isVisible))}>
          <span className="text-[#36B936] text-[10px] sm:text-xs font-medium tracking-widest uppercase block mb-1.5 sm:mb-3">
            {t("services.eyebrow", "Our Services")}
          </span>
          <h2 className={`${styles.servicesHeading} text-xs sm:text-xl md:text-3xl font-normal text-[#0A4D26] tracking-tight whitespace-pre-line leading-[1.3] px-2`}>
            {t("services.heading", "Logistics services in the UAE, built around you")}
          </h2>
        </div>

        {/* Section Intro / Subheading */}
        <div className={cx("max-w-2xl mx-auto text-center mb-10 sm:mb-16 px-2", ANIMATE_BASE, fadeIn(isVisible))}>
          <p className={`${styles.servicesHeaderDesc} text-[#0A4D26]/70 font-light leading-relaxed text-xs sm:text-sm md:text-base`}>
            {t(
              "services.subheading",
              "Whether you're sending a single parcel or running a fleet of shipments, there's a track built for how you work."
            )}
          </p>
        </div>

        {/* Services Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 ${styles.servicesGrid}`}>
          {SERVICE_CATEGORIES.map((category, index) => (
            <ServiceColumn
              key={category.id}
              category={category}
              index={index}
              register={register}
            />
          ))}
        </div>

      </div>
    </section>
  );
}