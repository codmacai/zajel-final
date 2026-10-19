/**
 * Events shown on /events.
 *
 * PLACEHOLDER CONTENT — replace with the real events before going live.
 * Each event lands under "Upcoming" or "Past" automatically, based on its end date.
 */

export type EventType = 'Exhibition' | 'Conference' | 'Webinar' | 'Workshop';

export interface ZajelEvent {
  title: string;
  type: EventType;
  /** ISO dates, YYYY-MM-DD. `endDate` only for multi-day events. */
  startDate: string;
  endDate?: string;
  city: string;
  venue: string;
  summary: string;
  /** Where "Register" / "Learn more" goes. Omit to hide the button. */
  href?: string;
}

export const EVENTS: ZajelEvent[] = [
  {
    title: 'Middle East Logistics & Supply Chain Expo',
    type: 'Exhibition',
    startDate: '2026-11-17',
    endDate: '2026-11-19',
    city: 'Dubai',
    venue: 'Dubai World Trade Centre',
    summary:
      'Visit the Zajel stand to see our air, sea and land freight solutions and meet the team behind them.',
    href: '/support',
  },
  {
    title: 'Cross-Border E-commerce Fulfilment in the GCC',
    type: 'Webinar',
    startDate: '2026-12-03',
    city: 'Online',
    venue: 'Live webinar',
    summary:
      'A practical session on duties, returns and last-mile delivery for online sellers shipping across the region.',
    href: '/support',
  },
  {
    title: 'Customs Compliance Workshop for Importers',
    type: 'Workshop',
    startDate: '2027-01-21',
    city: 'Abu Dhabi',
    venue: 'Zajel Abu Dhabi Office',
    summary:
      'Our customs brokers walk through documentation, HS codes and clearance timelines for UAE imports.',
    href: '/support',
  },
  {
    title: 'Future of Last-Mile Delivery Forum',
    type: 'Conference',
    startDate: '2026-09-24',
    city: 'Dubai',
    venue: 'Jumeirah Emirates Towers',
    summary:
      'Zajel joined industry leaders to discuss same-day delivery, route optimisation and sustainable fleets.',
  },
  {
    title: 'Secure Document Logistics Roundtable',
    type: 'Conference',
    startDate: '2026-06-11',
    city: 'Dubai',
    venue: 'Zajel Dubai Office',
    summary:
      'A closed session with government and institutional partners on chain-of-custody for sensitive documents.',
  },
];
