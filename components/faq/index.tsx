import Link from 'next/link';
import { ArrowRight, Building2, Mail, Phone } from 'lucide-react';
import Eyebrow from '@/components/ui copy/eyebrow';
import { typo } from '@/components/ui copy/typography';
import { CONTACT, FAQ_CATEGORIES } from './data';
import FaqExplorer from './faq-explorer';

interface FaqPageProps {
  /** Where "Request a Quote" goes. */
  quoteHref?: string;
}

/** Pure server component: only <FaqExplorer /> ships client JS. */
export default function FaqPage({ quoteHref = '/contact' }: FaqPageProps) {
  return (
    <div className="w-full bg-white font-sans text-[#1b4332]">
      {/* Hero */}
      <section className="relative w-full overflow-hidden border-b border-[#1b4332]/5 bg-white pb-10 pt-16 sm:pb-16 sm:pt-24 lg:pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[10%] -top-[10%] h-[70%] w-[50%] rounded-full bg-[#36B936]/10 blur-[120px]"
        />
        <div className="relative mx-auto max-w-[1100px] px-5 sm:px-8">
          <div className="mx-auto max-w-[760px] text-center">
            <Eyebrow className="mb-4">FAQ / Knowledge Base</Eyebrow>

            <h1 className={`${typo.h1Long} mb-4 text-[#1b4332] sm:mb-5`}>
              Shipping FAQ UAE: Frequently Asked Questions on Freight and Logistics
            </h1>

            <p className={`${typo.lead} mx-auto max-w-[58ch] text-[#2d6a4f]`}>
              Find answers to the most common shipping and logistics questions in the UAE, from courier delivery and
              freight forwarding to customs clearance, warehousing, and e-commerce fulfillment. Select a category below
              to explore specific topics.
            </p>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="w-full py-10 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <FaqExplorer categories={FAQ_CATEGORIES} />
        </div>
      </section>

      {/* CTA */}
      <section className="w-full pb-10 sm:pb-16 lg:pb-24">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-[#36B936]/30 bg-gradient-to-br from-[#f0fbf0] via-[#e2f7e2] to-[#ebfaeb] p-6 shadow-[0_20px_50px_rgba(54,185,54,0.15)] sm:rounded-[2rem] sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-[5%] -top-[15%] h-[80%] w-[50%] rounded-full bg-[#36B936]/25 blur-[100px]"
            />

            <div className="relative mx-auto max-w-[680px] text-center">
              <Eyebrow className="mb-3">Need Personal Assistance?</Eyebrow>

              <h2 className={`${typo.h2} mb-3.5 text-[#1b4332]`}>Still Have Questions?</h2>

              <p className={`${typo.body} mx-auto mb-7 max-w-[54ch] text-[#2d6a4f]`}>
                Our support team and dedicated logistics account managers are ready to help you navigate your shipping
                requirements across the UAE and worldwide.
              </p>

              <ul className="mb-8 flex flex-col items-center gap-3 text-[13px] font-normal text-[#2d6a4f] sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-10 sm:text-[14px]">
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-[#1b4332]">
                    <Mail className="h-4 w-4 text-[#36B936]" aria-hidden="true" />
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-[#1b4332]">
                    <Phone className="h-4 w-4 text-[#36B936]" aria-hidden="true" />
                    <span dir="ltr">{CONTACT.phone}</span>
                  </a>
                </li>
                <li className="inline-flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[#36B936]" aria-hidden="true" />
                  {CONTACT.office}
                </li>
              </ul>

              <Link
                href={quoteHref}
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#1b4332] py-2.5 pe-2.5 ps-6 text-[13px] font-medium tracking-tight text-white shadow-[0_6px_20px_rgba(27,67,50,0.2)] transition-[background-color,box-shadow] duration-300 hover:bg-[#36B936] hover:shadow-[0_8px_25px_rgba(54,185,54,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#36B936] focus-visible:ring-offset-2 sm:py-3 sm:text-[14px]"
              >
                <span>Request a Quote</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1b4332] transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" strokeWidth={1.75} aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
