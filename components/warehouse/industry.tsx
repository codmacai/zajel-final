import MarqueeSection from '../shared/marquee-section';
import { WAREHOUSE_INDUSTRIES, type WAREHOUSE_INDUSTRIESContent } from './content';
import { serverSection } from '@/lib/cms/server';

const IndustriesWeServe = ({ content }: { content: WAREHOUSE_INDUSTRIESContent }) => (
  <section className="w-full overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
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

export default serverSection('warehouse.industries', WAREHOUSE_INDUSTRIES, IndustriesWeServe);
