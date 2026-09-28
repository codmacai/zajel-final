"use client";

import { useSharedRevealObserver, useReveal } from "@/lib/useReveal";
import { BRAND, CIRCLE_SIZE, STEP_IMAGE_CONFIG, howItWorksContent as content } from "@/data/howItWorks";
import StepImage from "./StepImage";
import "./HowItWorks.css";

export default function HowItWorks() {
  const { register } = useSharedRevealObserver();
  const { ref: sectionRef, isVisible } = useReveal<HTMLElement>(register);

  return (
    <section
      ref={sectionRef}
      className="wciw-section w-full flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: BRAND.paper, paddingTop: "clamp(64px, 10vh, 128px)", paddingBottom: "clamp(64px, 10vh, 128px)" }}
    >
      <div className="w-full mx-auto px-4 sm:px-6" style={{ maxWidth: "clamp(1000px, 82vw, 1400px)" }}>
        <div className={`wciw-header text-center ${isVisible ? "is-visible" : ""}`} style={{ marginBottom: "clamp(40px, 8vh, 96px)" }}>
          <span className="wciw-eyebrow">{content.eyebrow}</span>
          <h2 className="wciw-heading">{content.heading}</h2>
        </div>

        <div className="wciw-grid grid grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, i) => (
            <div key={step.id} className={`wciw-step wciw-step-delay-${i % 4} flex flex-col items-center text-center gap-3 sm:gap-4 ${isVisible ? "is-visible" : ""}`}>
              <div className="relative flex-shrink-0 flex items-end justify-center w-full" style={{ height: `calc(${CIRCLE_SIZE} + ${STEP_IMAGE_CONFIG[step.imageKey].popHeight})` }}>
                <div className="absolute bottom-0 w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] md:w-[160px] md:h-[160px] rounded-full blur-xl opacity-30 scale-90" style={{ backgroundColor: BRAND.leaf }} />
                <div className="absolute bottom-0 w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] md:w-[160px] md:h-[160px] rounded-full shadow-[0_20px_40px_-15px_rgba(24,40,25,0.25)]" style={{ background: `linear-gradient(155deg, ${BRAND.leaf} 0%, ${BRAND.leafDark} 100%)` }} />
                <div className="absolute bottom-0 z-10 drop-shadow-[0_14px_20px_rgba(0,0,0,0.22)]">
                  <StepImage src={step.imageUrl} alt={step.imageAlt} imageKey={step.imageKey} />
                </div>
              </div>
              <div>
                <span className="wciw-step-label">Step {String(step.id).padStart(2, "0")}</span>
                <h3 className="wciw-step-title">{step.title}</h3>
                <p className="wciw-step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}