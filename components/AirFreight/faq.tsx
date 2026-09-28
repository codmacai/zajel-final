"use client";

import FaqSection from "@/components/shared/faq-section";
import { Air_Freight_Faq } from "@/data/air-freight-faqs";

export default function AirFreightFaq() {
  return (
    <FaqSection
      eyebrow="FAQ"
      heading="Frequently Asked Questions"
      items={Air_Freight_Faq}
    />
  );
}
