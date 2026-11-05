import Link from 'next/link';
import { cmsMetadata, getSection } from '@/lib/cms/server';
import { LEGAL_PAGE } from '@/components/legal-content';

// The footer's legal links land here. The full documents are being finalised;
// until they're published, each one says how to get a copy.

export const generateMetadata = cmsMetadata('legal', '/legal');


export default async function LegalPage() {
  const page = (await getSection('legal.page', LEGAL_PAGE)) ?? LEGAL_PAGE;
  return (
    <main className="w-full bg-white px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-10 md:pt-40 lg:px-20">
      <div className="mx-auto w-full max-w-[860px]">
        <p className="text-xs font-medium uppercase tracking-wider text-[#36B936] sm:text-sm">{page.eyebrow}</p>
        <h1 className="mt-3 text-[28px] font-medium leading-tight tracking-tight text-[#064423] sm:text-4xl md:text-[44px]">
          {page.heading}
        </h1>
        <p className="mt-4 max-w-[600px] text-[14px] leading-relaxed text-[#064423]/65 sm:text-[15px]">
          {page.introBefore}{' '}
          <a href={`mailto:${page.email}`} className="font-medium text-[#064423] underline-offset-4 hover:underline">
            {page.email}
          </a>{' '}
          {page.introAfter}
        </p>

        <div className="mt-10 divide-y divide-[#E5EBE7] border-y border-[#E5EBE7]">
          {page.sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-28 py-7 sm:py-8">
              <h2 className="text-[19px] font-medium text-[#064423] sm:text-[22px]">{s.title}</h2>
              <p className="mt-3 max-w-[680px] text-[14px] leading-relaxed text-[#064423]/65 sm:text-[15px]">{s.text}</p>
              <a
                href={`mailto:${page.email}?subject=${encodeURIComponent(`Request: ${s.title}`)}`}
                className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#36B936]"
              >
                {page.requestLabel} <span aria-hidden>→</span>
              </a>
            </section>
          ))}
        </div>

        <p className="mt-8 text-[14px] text-[#064423]/65">
          {page.footerText}{' '}
          <Link href={page.footerLinkHref} className="font-medium text-[#064423] underline-offset-4 hover:underline">
            {page.footerLinkLabel}
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
