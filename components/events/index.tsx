import Eyebrow from '@/components/ui copy/eyebrow';
import { typo } from '@/components/ui copy/typography';
import ContactBand from '../dynamic-contact';
import { EVENTS } from './data';
import EventsExplorer from './events-explorer';

/** Pure server component: only <EventsExplorer /> ships client JS. */
export default function EventsPage() {
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
            <Eyebrow className="mb-4">Events</Eyebrow>

            <h1 className={`${typo.h1} mb-4 text-[#1b4332] sm:mb-5`}>Where Logistics Leaders Meet</h1>

            <p className={`${typo.lead} mx-auto max-w-[58ch] text-[#2d6a4f]`}>
              Join Zajel at the exhibitions, conferences and workshops shaping logistics across the UAE and the
              region. Meet our specialists, explore new solutions and see where we have been.
            </p>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="w-full py-10 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <EventsExplorer events={EVENTS} />
        </div>
      </section>

      <ContactBand
        badgeText="Book a Meeting"
        title="Planning to Attend?"
        descriptionLead="Schedule time with our team at any upcoming event to discuss your courier, freight, customs or warehousing requirements."
        descriptionDetail="Reach out by email or phone and we'll arrange a meeting at the venue or at one of our offices."
        primaryCta={{ label: 'Contact Our Team', url: '/support' }}
      />
    </div>
  );
}
