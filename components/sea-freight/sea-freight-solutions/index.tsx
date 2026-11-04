"use client";

// Icons are passed as component props, so this wrapper must be a client component.
import DynamicSolutions from "@/components/freightsolutions/DynamicSolutions";

import { SEA_SOLUTIONS, type SEA_SOLUTIONSContent } from '../content';
import { cmsSection } from '@/components/cms/CmsProvider';

const SeaFreightSolutions = ({ content }: { content: SEA_SOLUTIONSContent }) => (
  <DynamicSolutions
    eyebrow={content.eyebrow}
    heading={content.heading}
    subheading={content.subheading}
    cards={content.cards}
    columns={4}
    bgClassName="bg-white"
  />
);

export default cmsSection('sea-freight.solutions', SEA_SOLUTIONS, SeaFreightSolutions);
