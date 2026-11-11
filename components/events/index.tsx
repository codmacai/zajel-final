import Eyebrow from '@/components/ui copy/eyebrow';
import { typo } from '@/components/ui copy/typography';
import ContactBand from '../dynamic-contact';
import { EVENTS_PAGE } from './data';
import { getEvents } from './cms';
import { getSection } from '@/lib/cms/server';
import EventsExplorer from './events-explorer';

/** Pure server component: only <EventsExplorer /> ships client JS. */
export default async function EventsPage() {
  const [content, events] = await Promise.all([getSection('events.page', EVENTS_PAGE), getEvents()]);
  const page = content ?? EVENTS_PAGE;
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
            <Eyebrow className="mb-4">{page.eyebrow}</Eyebrow>

            <h1 className={`${typo.h1} mb-4 text-[#1b4332] sm:mb-5`}>{page.heading}</h1>

            <p className={`${typo.lead} mx-auto max-w-[58ch] text-[#2d6a4f]`}>{page.description}</p>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="w-full py-10 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <EventsExplorer events={events} labels={page.labels} />
        </div>
      </section>

      <ContactBand {...page.contact} />
    </div>
  );
}
