"use client";

import { useInView } from "@/hooks/useInView";
import { REACH_IN_NUMBERS_EYEBROW, REACH_IN_NUMBERS_HEADING, REACH_IN_NUMBERS_STATS } from "@/data/reach-in-numbers";
import CountUp from "@/components/reach-in-numbers/count-up";

const LIME = "#36B936";

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");
const ANIMATE_BASE = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";
const fadeIn = (isVisible: boolean) => (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8");

const GLOSSY_DIVIDER_H =
  "linear-gradient(90deg, transparent 0%, rgba(27,67,50,0.08) 15%, rgba(54,185,54,0.6) 50%, rgba(27,67,50,0.08) 85%, transparent 100%)";
const GLOSSY_DIVIDER_MID =
  "linear-gradient(90deg, transparent 0%, rgba(27,67,50,0.08) 10%, rgba(54,185,54,0.5) 50%, rgba(27,67,50,0.08) 90%, transparent 100%)";
const GLOSSY_DIVIDER_V =
  "linear-gradient(180deg, transparent 0%, rgba(27,67,50,0.1) 20%, rgba(54,185,54,0.5) 50%, rgba(27,67,50,0.1) 80%, transparent 100%)";
const GLOSSY_DIVIDER_V_MOBILE = "linear-gradient(180deg, transparent 0%, rgba(54,185,54,0.4) 50%, transparent 100%)";
const GLOSSY_DIVIDER_H_MOBILE = "linear-gradient(90deg, transparent 0%, rgba(54,185,54,0.4) 50%, transparent 100%)";

export default function ReachInNumbersSection() {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>();

  return (
    <section ref={sectionRef} className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 font-['Manrope',sans-serif]">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 md:px-12 lg:px-20">
        <div className={cx("mb-10 sm:mb-12 md:mb-16 text-center", ANIMATE_BASE, fadeIn(isVisible))}>
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] sm:text-[12px]" style={{ color: LIME }}>
              {REACH_IN_NUMBERS_EYEBROW}
            </span>
          </div>

          <h2 className="mx-auto max-w-[720px] text-2xl sm:text-3xl font-medium leading-tight tracking-tight text-[#1b4332] md:text-4xl">
            {REACH_IN_NUMBERS_HEADING}
          </h2>
        </div>

        <div className={cx("relative py-4", ANIMATE_BASE, fadeIn(isVisible))} style={{ transitionDelay: "150ms" }}>
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px" style={{ background: GLOSSY_DIVIDER_H }} />

          <div className="relative grid grid-cols-2 md:grid-cols-3">
            <div
              className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden h-px -translate-y-1/2 md:block"
              style={{ background: GLOSSY_DIVIDER_MID }}
            />

            {REACH_IN_NUMBERS_STATS.map((stat, index) => {
              const isRightColMobile = index % 2 !== 0;
              const isMiddleColDesktop = index % 3 === 1;
              const isRightColDesktop = index % 3 === 2;

              return (
                <div
                  key={stat.label}
                  className="group relative flex flex-col items-center p-5 sm:p-8 lg:p-10 text-center transition-colors duration-300 hover:bg-[#36B936]/5"
                >
                  {isRightColMobile && (
                    <div
                      className="pointer-events-none absolute bottom-[10%] left-0 top-[10%] w-px md:hidden"
                      style={{ background: GLOSSY_DIVIDER_V_MOBILE }}
                    />
                  )}

                  {index >= 2 && (
                    <div
                      className="pointer-events-none absolute inset-x-[10%] top-0 h-px md:hidden"
                      style={{ background: GLOSSY_DIVIDER_H_MOBILE }}
                    />
                  )}

                  {(isMiddleColDesktop || isRightColDesktop) && (
                    <div
                      className="pointer-events-none absolute bottom-[12%] left-0 top-[12%] hidden w-px md:block"
                      style={{ background: GLOSSY_DIVIDER_V }}
                    />
                  )}

                  <div className="mb-2.5 text-3xl sm:text-4xl md:text-5xl font-semibold leading-none tracking-tight text-[#1b4332] transition-colors duration-300 group-hover:text-[#36B936]">
                    <CountUp end={stat.numericValue} prefix={stat.prefix} suffix={stat.suffix} startTrigger={isVisible} duration={2200} />
                  </div>

                  <h3 className="text-xs sm:text-sm md:text-base font-medium tracking-tight text-[#1b4332]">{stat.label}</h3>
                  <p className="mt-1 max-w-[24ch] text-[11px] sm:text-xs font-normal leading-relaxed text-[#2d6a4f] md:text-[13px]">
                    {stat.detail}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px" style={{ background: GLOSSY_DIVIDER_H }} />
        </div>
      </div>
    </section>
  );
}