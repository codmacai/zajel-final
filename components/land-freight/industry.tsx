import MarqueeSection from "../shared/marquee-section";
import { LAND_INDUSTRIES, type LAND_INDUSTRIESContent } from './content';
import { serverSection } from '@/lib/cms/server';

const IndustriesWeServe = ({ content }: { content: LAND_INDUSTRIESContent }) => (
  <section className="w-full overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
    <div className="w-full max-w-[1600px] mx-auto">
      <MarqueeSection
        eyebrow={content.eyebrow}
        heading={content.heading}
        description={content.description}
        items={content.items}
        ctaLabel={content.ctaLabel}
        ctaDescription={content.ctaDescription}
        ctaTag={content.ctaTag}
      />
    </div>
  </section>
);

export default serverSection('land-freight.industries', LAND_INDUSTRIES, IndustriesWeServe);
