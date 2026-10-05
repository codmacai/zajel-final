import type { FaqQuestion } from "@/components/shared/faq-section";

/**
 * FAQPage structured data for a page's FAQ section. The accordion only renders
 * an answer while it is open, so this keeps every question and answer in the
 * server HTML for search engines (and makes the page eligible for FAQ rich results).
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
