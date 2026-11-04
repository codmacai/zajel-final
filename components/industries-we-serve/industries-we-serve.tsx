import { MarqueeSection } from "@/components/shared/marquee-section";
import { CUSTOMS_INDUSTRIES, type CUSTOMS_INDUSTRIESContent } from '../customs-clearance/content';
import { serverSection } from '@/lib/cms/server';

function IndustriesWeServe({ content }: { content: CUSTOMS_INDUSTRIESContent }) {
  return (
    <section className="w-full overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="w-full max-w-[1600px] mx-auto">
        <MarqueeSection
          eyebrow={content.eyebrow}
          heading={content.heading}
          description={content.description}
          items={content.items}
        />
      </div>
    </section>
  );
}

export default serverSection('customs-clearance.industries', CUSTOMS_INDUSTRIES, IndustriesWeServe);
