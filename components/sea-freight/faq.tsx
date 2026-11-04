"use client";

import FaqSection from "@/components/shared/faq-section";

import { SEA_FAQ, type SEA_FAQContent } from './content';
import { cmsSection } from '@/components/cms/CmsProvider';

function SeaFreightFAQS({ content }: { content: SEA_FAQContent }) {
  return (
    <FaqSection
      eyebrow={content.eyebrow}
      heading={content.heading}
      items={content.items}
    />
  );
}

export default cmsSection('sea-freight.faq', SEA_FAQ, SeaFreightFAQS);
