import MarqueeSection from '../shared/marquee-section';
import { SEA_INDUSTRIES, type SEA_INDUSTRIESContent } from './content';
import { serverSection } from '@/lib/cms/server';

const IndustriesWeServe = ({ content }: { content: SEA_INDUSTRIESContent }) => (
  <MarqueeSection
    eyebrow={content.eyebrow}
    heading={content.heading}
    description={content.description}
    items={content.items}
    ctaLabel={content.ctaLabel}
    ctaDescription={content.ctaDescription}
    ctaTag={content.ctaTag}
  />
);

export default serverSection('sea-freight.industries', SEA_INDUSTRIES, IndustriesWeServe);
