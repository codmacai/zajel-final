import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import FaqPage from '@/components/faq';
import { FAQ_CATEGORIES } from '@/components/faq/data';

export const metadata: Metadata = pageMetadata({
  title: "Shipping FAQ UAE | Freight & Logistics Questions",
  description:
    "Answers to common shipping questions in the UAE: courier, air, sea and land freight, customs clearance, warehousing and e-commerce fulfillment.",
  path: '/faq',
});

// FAQPage structured data (helps Google show rich results)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_CATEGORIES.flatMap((c) =>
    c.questions.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  ),
};

export default function Page() {
  return (
    <main>
      <script
        type="application/ld+json"
        // `<` escaped so answer text can never close the script tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <FaqPage quoteHref="/contact" />
    </main>
  );
}
