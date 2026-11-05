import type { PageDef, SectionDef } from '../registry';
import type { Hints } from '../fields';
import * as Docs from '@/components/services/secure-docs/data';
import * as Gov from '@/components/services/government/data';
import * as Id from '@/components/services/secure-id/data';
import * as Mail from '@/components/services/secure-mail/data';
import { SECURE_PAGE } from '@/components/Secure-solutions/content';

const HERO: Hints = {
  title: { kind: 'textarea', help: 'Press Enter to start a new line' },
  primaryLabel: { label: 'Main button text' },
  primaryHref: { label: 'Main button link' },
  secondaryLabel: { label: 'Second button text' },
  secondaryHref: { label: 'Second button link' },
};
const sections = (hero: unknown, protocol: unknown, details: unknown): SectionDef[] => [
  { id: 'hero', label: 'Hero', defaults: hero, hints: HERO },
  { id: 'protocol', label: 'Protocol cards', defaults: protocol, hints: { cards: { itemLabel: 'Card' } } },
  { id: 'details', label: 'Details', defaults: details },
];

export const SECURE_SOLUTIONS: PageDef = {
  id: 'secure-solutions',
  label: 'Secure Solutions',
  path: '/secure-solutions',
  group: 'Solutions',
  sections: [
    {
      id: 'page',
      label: 'Page content',
      defaults: SECURE_PAGE,
      hints: { heroImage: { kind: 'image', label: 'Hero image' }, hero: { label: 'Hero' }, cards: { label: 'Secure services', itemLabel: 'Service' }, standards: { label: 'Our standards' }, 'standards.points': { itemLabel: 'Point' }, buttons: { label: 'Bottom buttons', itemLabel: 'Button', fixed: true } },
    },
  ],
};

export const SECURE_GOV: PageDef = { id: 'secure-gov', label: 'Gov & Institutional', path: '/secure-gov', group: 'Secure', sections: sections(Gov.GOV_HERO, Gov.GOV_PROTOCOL, Gov.GOV_DETAILS) };
export const SECURE_ID: PageDef = { id: 'secure-id', label: 'Secure ID', path: '/secure-id', group: 'Secure', sections: sections(Id.SECURE_ID_HERO, Id.SECURE_ID_PROTOCOL, Id.SECURE_ID_DETAILS) };
export const SECURE_DOCS: PageDef = { id: 'secure-docs', label: 'Secure Docs', path: '/secure-docs', group: 'Secure', sections: sections(Docs.SECURE_DOCS_HERO, Docs.SECURE_DOCS_PROTOCOL, Docs.SECURE_DOCS_DETAILS) };
export const SECURE_MAIL: PageDef = { id: 'secure-mail', label: 'Secure Mail', path: '/secure-mail', group: 'Secure', sections: sections(Mail.SECURE_MAIL_HERO, Mail.SECURE_MAIL_PROTOCOL, Mail.SECURE_MAIL_DETAILS) };
