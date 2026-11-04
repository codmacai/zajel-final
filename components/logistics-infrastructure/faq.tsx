"use client";

import FaqSection from "@/components/shared/faq-section";
import { NETWORK_FAQ, type NETWORK_FAQContent } from '../logistics-network/content';
import { cmsSection } from '@/components/cms/CmsProvider';

function NetworkFaq({ content }: { content: NETWORK_FAQContent }) {
  return (
    <FaqSection
      eyebrow={content.eyebrow}
      heading={content.heading}
      items={content.items}
    />
  );
}

export default cmsSection('network.faq', NETWORK_FAQ, NetworkFaq);
