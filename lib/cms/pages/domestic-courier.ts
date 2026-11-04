import type { PageDef } from '../registry';
import * as C from '@/components/domestic-on-demand/content';
import { CTA_HINTS, FAQ_HINTS, HERO_HINTS, STEPS_HINTS } from './shared-hints';

export const DOMESTIC_COURIER: PageDef = {
  id: 'domestic-courier',
  label: 'Domestic Courier',
  path: '/domestic-courier',
  group: 'Services',
  sections: [
    { id: 'hero', label: 'Hero', defaults: C.DOMESTIC_HERO, hints: HERO_HINTS },
    { id: 'delivery-speed', label: 'Delivery speed', defaults: C.DOMESTIC_SPEED, hints: { data: { label: 'Content' } } },
    { id: 'coverage', label: 'Coverage', defaults: C.DOMESTIC_COVERAGE, hints: { citiesRow1: { label: 'Cities, row 1', itemLabel: 'City' }, citiesRow2: { label: 'Cities, row 2', itemLabel: 'City' }, mapAlt: { label: 'Map description' } } },
    { id: 'why-zajel', label: 'Why Zajel', defaults: C.DOMESTIC_WHY, hints: { cards: { itemLabel: 'Card', fixed: true, help: 'Each card keeps its icon.' } } },
    { id: 'how-it-works', label: 'How it works', defaults: C.DOMESTIC_STEPS, hints: STEPS_HINTS },
    { id: 'vehicles', label: 'Choose your vehicle', defaults: C.DOMESTIC_VEHICLES, hints: { data: { label: 'Content' } } },
    { id: 'what-you-can-ship', label: 'What you can ship', defaults: C.DOMESTIC_LIMITS, hints: { tiers: { label: 'Vehicle limits', itemLabel: 'Vehicle', fixed: true } } },
    { id: 'app-steps', label: 'Book through the app', defaults: C.DOMESTIC_APP_STEPS, hints: { steps: { itemLabel: 'Step' } } },
    { id: 'faq', label: 'FAQs', defaults: C.DOMESTIC_FAQ, hints: FAQ_HINTS },
    { id: 'cta', label: 'Bottom banner', defaults: C.DOMESTIC_CTA, hints: CTA_HINTS },
  ],
};
