import type { PageDef } from '../registry';
import * as I from '@/components/individual-solutions/content';
import * as B from '@/components/business-solutions/content';
import { CTA_HINTS } from './shared-hints';

const HERO = {
  hero: { label: 'Hero' },
  'hero.heroImage': { kind: 'image' as const, label: 'Image' },
  appDownloadUrl: { label: 'App download link' },
};

export const INDIVIDUAL_SOLUTIONS: PageDef = {
  id: 'individual-solutions',
  label: 'Individual Solutions',
  path: '/individual-solutions',
  group: 'Solutions',
  sections: [
    { id: 'hero', label: 'Hero', defaults: I.INDIVIDUAL_HERO, hints: HERO },
    { id: 'services', label: 'Service cards', defaults: I.INDIVIDUAL_SERVICES, hints: { cards: { itemLabel: 'Card', fixed: true }, 'cards.*.features': { itemLabel: 'Feature' } } },
    { id: 'why', label: 'Why ship with Zajel', defaults: I.INDIVIDUAL_WHY, hints: { cards: { label: 'Cards' }, backedBy: { label: 'Backed by', itemLabel: 'Point', fixed: true } } },
    { id: 'compare', label: 'Domestic vs international', defaults: I.INDIVIDUAL_COMPARE, hints: { rows: { label: 'Comparison table', itemLabel: 'Row' } } },
    { id: 'what-to-send', label: 'What you can send', defaults: I.INDIVIDUAL_WHAT_TO_SEND, hints: { limits: { itemLabel: 'Row' }, tips: { itemLabel: 'Tip' }, prohibited: { itemLabel: 'Item' } } },
    { id: 'cta', label: 'Bottom banner', defaults: I.INDIVIDUAL_CTA, hints: CTA_HINTS },
  ],
};

export const BUSINESS_SOLUTIONS: PageDef = {
  id: 'business-solutions',
  label: 'Business Solutions',
  path: '/business-solutions',
  group: 'Solutions',
  sections: [
    { id: 'hero', label: 'Hero', defaults: B.BUSINESS_HERO, hints: HERO },
    { id: 'services', label: 'Service cards', defaults: B.BUSINESS_SERVICES, hints: { cards: { itemLabel: 'Card' } } },
    { id: 'value-added', label: 'More ways we support you', defaults: B.BUSINESS_VALUE_ADDED, hints: { services: { itemLabel: 'Service' } } },
    { id: 'built-for', label: 'Built for your business', defaults: B.BUSINESS_BUILT_FOR, hints: { blocks: { itemLabel: 'Block' } } },
    { id: 'technology', label: 'Technology & visibility', defaults: B.BUSINESS_TECHNOLOGY, hints: { text: { label: 'Text' }, 'text.image': { kind: 'image' }, features: { itemLabel: 'Feature' } } },
    { id: 'why', label: 'Why businesses choose Zajel', defaults: B.BUSINESS_WHY, hints: { header: { label: 'Heading & button' }, items: { itemLabel: 'Reason' } } },
    { id: 'cta', label: 'Bottom banner', defaults: B.BUSINESS_CTA, hints: CTA_HINTS },
  ],
};
