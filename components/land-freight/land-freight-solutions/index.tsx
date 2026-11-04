"use client";

// Icons are passed as component props, so this wrapper must be a client component.
import DynamicSolutions from "@/components/freightsolutions/DynamicSolutions";
import { LAND_SOLUTIONS, type LAND_SOLUTIONSContent } from '../content';
import { cmsSection } from '@/components/cms/CmsProvider';

const LandFreightSolutions = ({ content }: { content: LAND_SOLUTIONSContent }) => (
  <DynamicSolutions
    eyebrow={content.eyebrow}
    heading={content.heading}
    subheading={content.subheading}
    cards={content.cards}
    columns={2}
    bgClassName="bg-[#F9FAFB]"
  />
);

export default cmsSection('land-freight.solutions', LAND_SOLUTIONS, LandFreightSolutions);
