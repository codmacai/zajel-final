import { MarqueeSection } from "@/components/shared/marquee-section";
import {
  INDUSTRIES,
  INDUSTRIES_WE_SERVE_DESCRIPTION,
  INDUSTRIES_WE_SERVE_EYEBROW,
  INDUSTRIES_WE_SERVE_HEADING,
} from "@/data/industries-we-serve";

export function IndustriesWeServe() {
  return (
    <section className="w-full overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="w-full max-w-[1600px] mx-auto">
        <MarqueeSection
          eyebrow={INDUSTRIES_WE_SERVE_EYEBROW}
          heading={INDUSTRIES_WE_SERVE_HEADING}
          description={INDUSTRIES_WE_SERVE_DESCRIPTION}
          items={INDUSTRIES}
        />
      </div>
    </section>
  );
}

export default IndustriesWeServe;
