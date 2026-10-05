import type { Metadata } from 'next';
import Link from 'next/link';
import { Package, Search, Building2, Phone } from 'lucide-react';

// Online accounts aren't live yet. Until they are, /login explains that and
// sends people straight to the things they can already do.

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Zajel online accounts are on the way. Send a shipment as a guest, track a parcel or talk to our team today.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/login' },
};

const ACTIONS = [
  {
    Icon: Package,
    title: 'Send a shipment',
    description: 'Book a pickup as a guest. No account needed, it takes about two minutes.',
    href: '/send-shipment',
    cta: 'Book a pickup',
  },
  {
    Icon: Search,
    title: 'Track a shipment',
    description: 'Follow your parcel with the tracking number from your receipt or SMS.',
    href: '/track',
    cta: 'Track now',
  },
  {
    Icon: Building2,
    title: 'Business account',
    description: 'Contract rates, invoicing and a dedicated account manager for your business.',
    href: '/business-solutions',
    cta: 'Explore business',
  },
] as const;

export default function LoginPage() {
  return (
    <main className="w-full bg-white px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-10 md:pt-40 lg:px-20">
      <div className="mx-auto w-full max-w-[1100px]">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-[#36B936] sm:text-sm">Zajel account</p>
          <h1 className="mt-3 text-[28px] font-medium leading-tight tracking-tight text-[#064423] sm:text-4xl md:text-[44px]">
            Online accounts are on the way
          </h1>
          <p className="mx-auto mt-4 max-w-[520px] text-[14px] leading-relaxed text-[#064423]/65 sm:text-[15px]">
            Soon you&apos;ll be able to sign in to save addresses, see your shipment history and book faster. Until
            then, everything you need is a click away.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3">
          {ACTIONS.map(({ Icon, title, description, href, cta }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-2xl border border-[#E5EBE7] bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#36B936]/60 hover:shadow-[0_18px_40px_-24px_rgba(6,68,35,0.35)] sm:p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#36B936]/10 text-[#36B936]">
                <Icon size={20} strokeWidth={1.8} aria-hidden />
              </span>
              <h2 className="mt-5 text-[17px] font-medium text-[#064423] sm:text-[18px]">{title}</h2>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#064423]/60 sm:text-[14px]">{description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#36B936]">
                {cta}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#F4F8F5] px-6 py-6 text-center sm:mt-10 sm:flex-row sm:gap-5 sm:text-left">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#36B936]">
            <Phone size={18} strokeWidth={1.8} aria-hidden />
          </span>
          <p className="text-[14px] text-[#064423]/75">
            Need help with an existing shipment or account? Call{' '}
            <a href="tel:+971600531111" className="font-medium text-[#064423] underline-offset-4 hover:underline">
              600 53 1111
            </a>{' '}
            or{' '}
            <Link href="/contact" className="font-medium text-[#064423] underline-offset-4 hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
