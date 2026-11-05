import { cmsMetadata, getSection } from '@/lib/cms/server';
import FaqPage from '@/components/faq';
import { FAQ_PAGE } from '@/components/faq/data';

export const generateMetadata = cmsMetadata('faq', '/faq');

// FAQPage structured data (helps Google show rich results)
function faqJsonLd(categories: typeof FAQ_PAGE.categories) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: categories.flatMap((c) =>
      c.questions.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    ),
  };
}

export default async function Page() {
  const page = (await getSection('faq.page', FAQ_PAGE)) ?? FAQ_PAGE;
  const jsonLd = faqJsonLd(page.categories);
  return (
    <main>
      <script
        type="application/ld+json"
        // `<` escaped so answer text can never close the script tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <FaqPage quoteHref="/support" />
    </main>
  );
}
