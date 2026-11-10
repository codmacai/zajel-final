import type { PageDef } from '../registry';
import { EVENTS_LIST, EVENTS_PAGE } from '@/components/events/data';
import { FAQ_PAGE } from '@/components/faq/data';
import { LEGAL_PAGE } from '@/components/legal-content';
import { CONTACT_PAGE } from '@/components/contact/content';
import { SUPPORT_PAGE } from '@/components/Support/content';
import { CONTACT_BAND_HINTS } from './shared-hints';

export const EVENTS: PageDef = {
  id: 'events',
  label: 'Events',
  path: '/events',
  group: 'Company',
  sections: [
    { id: 'page', label: 'Page text', defaults: EVENTS_PAGE, hints: { contact: { label: 'Contact band' }, ...Object.fromEntries(Object.entries(CONTACT_BAND_HINTS).map(([k, v]) => [`contact.${k}`, v])) } },
    {
      id: 'list',
      label: 'Events',
      defaults: EVENTS_LIST,
      note: 'Each event also has its own page',
      hints: {
        events: { itemLabel: 'Event', allowEmpty: true, help: 'Each event moves from “Upcoming” to “Past” by itself after its last day' },
        'events.*.slug': { kind: 'slug', label: 'Page address', prefix: '/events/', help: 'Lowercase words joined by hyphens. Must be different for each event.' },
        'events.*.type': { kind: 'select', label: 'Type', options: ['Exhibition', 'Conference', 'Webinar', 'Workshop'] },
        'events.*.startDate': { kind: 'date', label: 'Start date' },
        'events.*.endDate': { kind: 'date', label: 'End date', optional: true, help: 'Leave empty for a one-day event' },
        'events.*.time': { label: 'Time', help: 'For example 10:00 – 17:00 GST. Leave empty to hide.' },
        'events.*.description': { label: 'Description', itemLabel: 'Paragraph' },
        'events.*.highlights': { itemLabel: 'Highlight', allowEmpty: true },
        'events.*.gallery': { label: 'Photo gallery', itemLabel: 'Photo', allowEmpty: true },
        'events.*.cover': { label: 'Cover photo' },
        'events.*.href': { label: '“Register interest” link', help: 'Leave empty to hide the button' },
      },
    },
  ],
};

export const FAQ: PageDef = {
  id: 'faq',
  label: 'FAQ',
  path: '/faq',
  group: 'Help',
  sections: [
    {
      id: 'page',
      label: 'Questions & answers',
      defaults: FAQ_PAGE,
      hints: { categories: { label: 'Categories', itemLabel: 'Category' }, 'categories.*.questions': { label: 'Questions', itemLabel: 'Question' }, 'categories.*.questions.*.q': { label: 'Question' }, 'categories.*.questions.*.a': { label: 'Answer', kind: 'textarea' }, contact: { label: 'Contact band' } },
    },
  ],
};

export const SUPPORT: PageDef = {
  id: 'support',
  label: 'Support',
  path: '/support',
  group: 'Help',
  sections: [{ id: 'page', label: 'Page text', defaults: SUPPORT_PAGE, hints: { actions: { label: 'Self-service options', itemLabel: 'Option' }, quickLinks: { label: 'Quick help links', itemLabel: 'Link' } } }],
};

export const CONTACT: PageDef = {
  id: 'contact',
  label: 'Contact',
  path: '/contact',
  group: 'Help',
  sections: [{ id: 'page', label: 'Page text', defaults: CONTACT_PAGE, note: 'The contact page currently redirects to Support', hints: { details: { label: 'Contact details', itemLabel: 'Detail' }, socials: { label: 'Social links', itemLabel: 'Profile', fixed: true } } }],
};

export const LEGAL: PageDef = {
  id: 'legal',
  label: 'Legal',
  path: '/legal',
  group: 'Help',
  sections: [{ id: 'page', label: 'Policies & terms', defaults: LEGAL_PAGE, hints: { sections: { label: 'Policies', itemLabel: 'Policy' }, 'sections.*.id': { hidden: true }, email: { kind: 'text', label: 'Email address' } } }],
};

/** Pages that are tools (tracking, booking): only their Google title and description are edited here. */
const toolPage = (id: string, label: string, path: string): PageDef => ({ id, label, path, group: 'Help', sections: [] });
export const TOOL_PAGES: PageDef[] = [
  toolPage('track', 'Track', '/track'),
  toolPage('trackresults', 'Tracking results', '/trackresults'),
  toolPage('send-shipment', 'Send shipment', '/send-shipment'),
  toolPage('quotation', 'Rate calculator', '/quotation'),
  toolPage('help', 'Help', '/help'),
];
