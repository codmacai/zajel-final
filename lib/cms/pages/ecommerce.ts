import type { PageDef } from '../registry';
import * as C from '@/components/ecommerce/content';
import { CTA_HINTS, FAQ_HINTS, HERO_HINTS, STEPS_HINTS } from './shared-hints';

export const ECOMMERCE: PageDef = {
  id: 'ecommerce',
  label: 'E-commerce',
  path: '/ecommerce',
  group: 'Services',
  sections: [
    { id: 'hero', label: 'Hero', defaults: C.ECOMMERCE_HERO, hints: HERO_HINTS },
    { id: 'benefits', label: 'What your business gets', defaults: C.ECOMMERCE_BENEFITS, hints: { cards: { itemLabel: 'Card' } } },
    { id: 'cod', label: 'Cash on delivery', defaults: C.ECOMMERCE_COD, hints: { rows: { itemLabel: 'Row' }, headingHighlight: { label: 'Highlighted words', help: 'Shown in green inside the heading' } } },
    { id: 'getting-started', label: 'Getting started', defaults: C.ECOMMERCE_GETTING_STARTED, hints: STEPS_HINTS },
    { id: 'integrations', label: 'Platform integrations', defaults: C.ECOMMERCE_INTEGRATIONS, hints: { integrations: { itemLabel: 'Platform' }, api: { label: 'API access card' } } },
    { id: 'dashboard', label: 'Dashboard & reporting', defaults: C.ECOMMERCE_DASHBOARD, hints: { image: { kind: 'image' }, features: { itemLabel: 'Feature' } } },
    { id: 'pricing', label: 'Pricing tiers', defaults: C.ECOMMERCE_PRICING, hints: { tiers: { itemLabel: 'Tier' } } },
    { id: 'how-it-works', label: 'How it works', defaults: C.ECOMMERCE_HOW, hints: STEPS_HINTS },
    { id: 'faq', label: 'FAQs', defaults: C.ECOMMERCE_FAQ, hints: FAQ_HINTS },
    { id: 'cta', label: 'Bottom banner', defaults: C.ECOMMERCE_CTA, hints: CTA_HINTS },
  ],
};
