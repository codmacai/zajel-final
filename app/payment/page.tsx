import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MessageSquare } from 'lucide-react';

// The last step of /send-shipment lands here. Online payment isn't live yet,
// so this page says so and gives the quickest ways to confirm the pickup.

export const metadata: Metadata = {
  title: 'Confirm your pickup',
  description: 'Online payment is on the way. Call or message Zajel to confirm your pickup and pay.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/payment' },
};

const WAYS = [
  { Icon: Phone, title: 'Call us', line: '600 53 1111', href: 'tel:+971600531111', note: 'Sun – Sat, 8 AM – 6 PM' },
  { Icon: Mail, title: 'Email us', line: 'info@zajel.ae', href: 'mailto:info@zajel.ae', note: 'We reply within 24 hours' },
  { Icon: MessageSquare, title: 'Send a message', line: 'Contact form', href: '/contact', note: 'Tell us about your shipment' },
] as const;

export default function PaymentPage() {
  return (
    <main className="w-full bg-white px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-10 md:pt-40 lg:px-20">
      <div className="mx-auto w-full max-w-[1000px]">
        <div className="mx-auto max-w-[620px] text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-[#36B936] sm:text-sm">Almost done</p>
          <h1 className="mt-3 text-[28px] font-medium leading-tight tracking-tight text-[#064423] sm:text-4xl md:text-[44px]">
            Let&apos;s confirm your pickup
          </h1>
          <p className="mx-auto mt-4 max-w-[520px] text-[14px] leading-relaxed text-[#064423]/65 sm:text-[15px]">
            Online payment is on the way. For now, our team will confirm your pickup and take payment with you
            directly. Reach us any of these ways and we&apos;ll take it from here.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3">
          {WAYS.map(({ Icon, title, line, href, note }) => {
            const inner = (
              <>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#36B936]/10 text-[#36B936]">
                  <Icon size={20} strokeWidth={1.8} aria-hidden />
                </span>
                <h2 className="mt-5 text-[17px] font-medium text-[#064423] sm:text-[18px]">{title}</h2>
                <p className="mt-1 text-[15px] font-medium text-[#36B936]">{line}</p>
                <p className="mt-2 text-[13px] text-[#064423]/55">{note}</p>
              </>
            );
            const cls =
              'flex flex-col rounded-2xl border border-[#E5EBE7] bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#36B936]/60 hover:shadow-[0_18px_40px_-24px_rgba(6,68,35,0.35)] sm:p-7';
            return href.startsWith('/') ? (
              <Link key={title} href={href} className={cls}>
                {inner}
              </Link>
            ) : (
              <a key={title} href={href} className={cls}>
                {inner}
              </a>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row">
          <Link
            href="/send-shipment"
            className="inline-flex h-11 items-center rounded-full border border-[#E5EBE7] px-6 text-[14px] text-[#064423] transition-colors hover:border-[#36B936]"
          >
            Back to booking
          </Link>
          <Link
            href="/track"
            className="inline-flex h-11 items-center rounded-full bg-[#36B936] px-6 text-[14px] font-medium text-white transition-colors hover:bg-[#2EA32E]"
          >
            Track a shipment
          </Link>
        </div>
      </div>
    </main>
  );
}
