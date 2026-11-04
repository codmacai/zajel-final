"use client";

import { useSharedRevealObserver, useReveal } from "@/lib/useReveal";
import ServiceColumn from "./ServiceColumn";
import styles from "./ServicesSection.module.css";
import { cmsSection } from "@/components/cms/CmsProvider";
import { HOME_SERVICES, type HomeServicesContent } from "./content";

const ANIMATE_BASE = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none";
const fadeIn = (isVisible: boolean) =>
  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 motion-reduce:translate-y-0";
const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

function ServicesSection({ content }: { content: HomeServicesContent }) {
  const { register } = useSharedRevealObserver();
  const { ref, isVisible } = useReveal<HTMLElement>(register);

  return (
    <section
      ref={ref}
      id="solutions"
      className={`scroll-mt-24 w-full py-14 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-20 bg-[#FAFAF8] overflow-hidden ${styles.servicesSection}`}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Section Heading */}
        <div className={cx("text-center mb-3 sm:mb-5", ANIMATE_BASE, fadeIn(isVisible))}>
          <span className="text-[#36B936] text-xs sm:text-sm font-medium tracking-widest uppercase block mb-2 sm:mb-3">
            {content.eyebrow}
          </span>
          <h2
            className={`${styles.servicesHeading} mx-auto max-w-[22ch] sm:max-w-[28ch] md:max-w-none text-balance text-2xl sm:text-3xl md:text-4xl font-medium text-[#0A4D26] tracking-tight whitespace-pre-line leading-[1.2] px-2`}
          >
            {content.heading}
          </h2>
        </div>

        {/* Section Intro */}
        <div className={cx("max-w-2xl mx-auto text-center mb-10 sm:mb-14 lg:mb-16 px-2", ANIMATE_BASE, fadeIn(isVisible))}>
          <p
            className={`${styles.servicesHeaderDesc} text-[#0A4D26]/70 font-light leading-relaxed text-[13px] sm:text-sm md:text-base`}
          >
            {content.subheading}
          </p>
        </div>

        {/* Services Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 ${styles.servicesGrid}`}>
          {content.categories.map((category, index) => (
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
export default cmsSection('home.services', HOME_SERVICES, ServicesSection);
