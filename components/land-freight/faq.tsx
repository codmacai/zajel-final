"use client";

import FaqSection from "@/components/shared/faq-section";
import { LandFreight_FAQS } from "@/data/land-freight-faq";

export default function LandFreightFAQS() {
  return (
    <FaqSection
      eyebrow="FAQ"
      heading="Frequently Asked Questions"
      items={LandFreight_FAQS}
    />
  );
}
