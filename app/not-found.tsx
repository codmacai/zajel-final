import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

const LINKS = [
  { label: 'Track a shipment', href: '/track' },
  { label: 'Send a shipment', href: '/send-shipment' },
  { label: 'Get a quote', href: '/quotation' },
  { label: 'Contact us', href: '/contact' },
];

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-white px-4 pb-20 pt-32 text-center sm:px-6 md:pt-40">
      <p className="text-xs font-medium uppercase tracking-wider text-[#36B936] sm:text-sm">Error 404</p>
      <h1 className="mt-3 text-2xl font-medium tracking-tight text-[#064423] sm:text-3xl md:text-4xl">
        This page has moved or doesn&apos;t exist
      </h1>
      <p className="mt-4 max-w-[460px] text-[13px] leading-relaxed text-[#064423]/60 sm:text-[14px]">
        The link may be out of date. Here are a few places to pick up from.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-full bg-[#36B936] px-6 text-[14px] font-medium text-white transition-colors hover:bg-[#2EA32E]"
        >
          Back to home
        </Link>
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="inline-flex h-11 items-center rounded-full border border-[#E5EBE7] px-5 text-[14px] text-[#064423] transition-colors hover:border-[#36B936]"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
