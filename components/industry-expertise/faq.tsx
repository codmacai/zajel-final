"use client";

import FaqSection from "@/components/shared/faq-section";
import { Industry_Faqs } from "@/data/industry-faqs";

export default function IndustryFaq() {
  return (
    <FaqSection
      eyebrow="FAQ"
      heading="Frequently Asked Questions"
      items={Industry_Faqs}
    />
  );
}
