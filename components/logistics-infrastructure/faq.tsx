"use client";

import FaqSection from "@/components/shared/faq-section";
import { Network_Faq } from "@/data/Network-faqs";

export default function NetworkFaq() {
  return (
    <FaqSection
      eyebrow="FAQ"
      heading="Frequently Asked Questions"
      items={Network_Faq}
    />
  );
}
