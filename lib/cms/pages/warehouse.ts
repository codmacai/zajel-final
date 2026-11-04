import type { PageDef } from '../registry';
import * as C from '@/components/warehouse/content';
import { serviceHeroData } from '@/components/sections/ServiceHero/serviceHeroData';
import { FAQ_HINTS, MARQUEE_HINTS, SERVICE_HERO_HINTS } from './shared-hints';

export const WAREHOUSE: PageDef = {
  id: 'warehouse',
  label: 'Warehouse',
  path: '/warehouse',
  group: 'Services',
  sections: [
    { id: 'hero', label: 'Hero', defaults: serviceHeroData.warehouse, hints: SERVICE_HERO_HINTS },
    { id: 'supply-chain', label: 'Supply chain warehousing', defaults: C.WAREHOUSE_SUPPLY_CHAIN },
    { id: 'solutions', label: 'Warehousing solutions', defaults: C.WAREHOUSE_SOLUTIONS, hints: { cards: { itemLabel: 'Card' } } },
    { id: 'inventory', label: 'Inventory management', defaults: C.WAREHOUSE_INVENTORY, hints: { tiles: { itemLabel: 'Tile', fixed: true, help: 'The layout needs exactly five tiles.' } } },
    { id: 'locations', label: 'Strategic locations', defaults: C.WAREHOUSE_LOCATIONS, hints: { cards: { itemLabel: 'Location' } } },
    { id: 'industries', label: 'Industries we serve', defaults: C.WAREHOUSE_INDUSTRIES, hints: MARQUEE_HINTS },
    { id: 'faq', label: 'FAQs', defaults: C.WAREHOUSE_FAQ, hints: FAQ_HINTS },
  ],
};
