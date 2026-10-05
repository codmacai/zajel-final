import type { Metadata } from 'next';
import Link from 'next/link';

// The footer's legal links land here. The full documents are being finalised;
// until they're published, each one says how to get a copy.

export const metadata: Metadata = {
  title: 'Legal',
  description: 'Zajel privacy, PDPL, terms and accessibility information.',
  alternates: { canonical: '/legal' },
};

const SECTIONS = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    text: 'We collect only the details needed to pick up, move and deliver your shipments, and to keep you updated about them. We never sell your personal data.',
  },
  {
    id: 'pdpl',
    title: 'PDPL',
    text: 'Zajel handles personal data in line with the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021), including your rights to access and correct your data.',
  },
  {
    id: 'terms',
    title: 'Terms & Conditions',
    text: 'Every shipment is carried under our standard terms of carriage, which cover liability, prohibited items, claims and delivery times.',
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    text: 'We want everyone to be able to use our website. If something is hard to use, tell us and we will help, and fix it.',
  },
] as const;

export default function LegalPage() {
  return (
    <main className="w-full bg-white px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-10 md:pt-40 lg:px-20">
      <div className="mx-auto w-full max-w-[860px]">
        <p className="text-xs font-medium uppercase tracking-wider text-[#36B936] sm:text-sm">Legal</p>
        <h1 className="mt-3 text-[28px] font-medium leading-tight tracking-tight text-[#064423] sm:text-4xl md:text-[44px]">
          Policies &amp; terms
        </h1>
        <p className="mt-4 max-w-[600px] text-[14px] leading-relaxed text-[#064423]/65 sm:text-[15px]">
          The full documents are being updated. For a copy of any of them, email{' '}
          <a href="mailto:info@zajel.ae" className="font-medium text-[#064423] underline-offset-4 hover:underline">
            info@zajel.ae
          </a>{' '}
          and we&apos;ll send it the same day.
        </p>

        <div className="mt-10 divide-y divide-[#E5EBE7] border-y border-[#E5EBE7]">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-28 py-7 sm:py-8">
              <h2 className="text-[19px] font-medium text-[#064423] sm:text-[22px]">{s.title}</h2>
              <p className="mt-3 max-w-[680px] text-[14px] leading-relaxed text-[#064423]/65 sm:text-[15px]">{s.text}</p>
              <a
                href={`mailto:info@zajel.ae?subject=${encodeURIComponent(`Request: ${s.title}`)}`}
                className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#36B936]"
              >
                Request a copy <span aria-hidden>→</span>
              </a>
            </section>
          ))}
        </div>

        <p className="mt-8 text-[14px] text-[#064423]/65">
          Questions about a claim or your data?{' '}
          <Link href="/contact" className="font-medium text-[#064423] underline-offset-4 hover:underline">
            Contact us
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
