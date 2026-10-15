import type { FaqQuestion } from "@/components/shared/faq-section";

/**
 * FAQPage structured data for a page's FAQ section — makes the page eligible for FAQ rich
 * results. components/shared/faq-section.tsx emits it automatically; use it directly only for
 * a FAQ that isn't built with that component.
 */
export default function FaqJsonLd({ items }: { items: FaqQuestion[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      // `<` escaped so answer text can never close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
