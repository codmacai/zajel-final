import Eyebrow from '@/components/ui copy/eyebrow';
import { typo } from '@/components/ui copy/typography';
// Adjust this import path to wherever ContactBand lives in your project.
import { CONTACT, FAQ_CATEGORIES } from './data';
import FaqExplorer from './faq-explorer';
import ContactBand from '../dynamic-contact';

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

      {/* Contact band */}
      <ContactBand
        badgeText="Need Personal Assistance?"
        title="Still Have Questions?"
        descriptionLead="Our support team and dedicated logistics account managers are ready to help you navigate your shipping requirements across the UAE and worldwide."
        descriptionDetail="Reach out by email or phone, or request a quote and we'll get back to you."
        contactInfo={{
          email: CONTACT.email,
          phone: CONTACT.phone,
          address: CONTACT.office,
        }}
        primaryCta={{
          label: 'Request a Quote',
          url: quoteHref,
        }}
      />
    </div>
  );
}