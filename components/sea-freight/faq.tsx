"use client";

import FaqSection from "@/components/shared/faq-section";
import { SeaFreight_FAQS } from "@/data/sea-freight-faq";

export default function SeaFreightFAQS() {
  return (
    <FaqSection
      eyebrow="FAQ"
      heading="Frequently Asked Questions"
      items={SeaFreight_FAQS}
    />
  );
}
