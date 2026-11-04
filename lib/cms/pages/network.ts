import type { PageDef } from '../registry';
import * as C from '@/components/logistics-network/content';
import { serviceHeroData } from '@/components/sections/ServiceHero/serviceHeroData';
import { CONTACT_BAND_HINTS, FAQ_HINTS, SERVICE_HERO_HINTS } from './shared-hints';

export const NETWORK: PageDef = {
  id: 'network',
  label: 'Network',
  path: '/network',
  group: 'Company',
  sections: [
    { id: 'hero', label: 'Hero', defaults: serviceHeroData.network, hints: SERVICE_HERO_HINTS },
    { id: 'hub', label: 'Logistics hub', defaults: C.NETWORK_HUB, hints: { imageSrc: { kind: 'image', label: 'Image' }, paragraph1: { kind: 'textarea' }, paragraph2: { kind: 'textarea' } } },
    { id: 'regional-coverage', label: 'Regional coverage', defaults: C.NETWORK_REGIONAL, hints: { columns: { itemLabel: 'Column' } } },
    { id: 'freight-services', label: 'Freight services', defaults: C.NETWORK_FREIGHT, hints: { cards: { itemLabel: 'Card' } } },
    { id: 'alliances', label: 'Strategic alliances', defaults: C.NETWORK_ALLIANCES, hints: { cards: { itemLabel: 'Alliance' } } },
    { id: 'infrastructure', label: 'Logistics infrastructure', defaults: C.NETWORK_INFRASTRUCTURE, hints: { cards: { itemLabel: 'Card' } } },
    { id: 'numbers', label: 'Reach in numbers', defaults: C.NETWORK_NUMBERS, hints: { stats: { itemLabel: 'Number' } } },
    { id: 'faq', label: 'FAQs', defaults: C.NETWORK_FAQ, hints: FAQ_HINTS },
    { id: 'contact', label: 'Contact band', defaults: C.NETWORK_CONTACT, hints: CONTACT_BAND_HINTS },
  ],
};
