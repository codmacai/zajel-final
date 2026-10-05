import {
  ContainerIcon,
  SharedContainerIcon,
  SpecialEquipmentIcon,
  RoRoIcon,
  BreakbulkIcon,
  BulkIcon,
  DangerousGoodsIcon,
  ReeferIcon,
} from './icons';
import type { FreightCard } from './types';

export const EYEBROW = 'Sea Network';
export const HEADING = 'Our Sea Freight Solutions';
export const SUBHEADING =
  'Comprehensive sea freight options tailored to cargo type, volume, and route.';

export const SEA_FREIGHT_CARDS: FreightCard[] = [
  {
    id: 'fcl',
    Icon: ContainerIcon,
    image: '/sea-freight/solutions/ChatGPT Image Sep 9, 2026, 03_57_24 AM.webp',
    title: 'Full Container Load (FCL)',
    description: 'A dedicated container for your cargo alone, suited to large or high-volume shipments.',
    buttonLabel: 'Request a Quote',
    buttonUrl: '/quotation',
  },
  {
    id: 'lcl',
    Icon: SharedContainerIcon,
    image: '/sea-freight/solutions/ChatGPT Image Sep 9, 2026, 03_59_45 AM.webp',
    title: 'Less than Container Load (LCL)',
    description:
      "Shared container space for smaller shipments, cost-effective when you don't need a full container.",
    buttonLabel: 'Request a Quote',
    buttonUrl: '/quotation',
  },
  {
    id: 'special-equipment',
    Icon: SpecialEquipmentIcon,
    image: '/sea-freight/solutions/ChatGPT Image Sep 9, 2026, 04_03_14 AM.webp',
    title: 'Special Equipment',
    description: 'Flat racks, open tops, and other specialized container equipment for non-standard cargo.',
    buttonLabel: 'Request a Quote',
    buttonUrl: '/quotation',
  },
  {
    id: 'roro',
    Icon: RoRoIcon,
    image: '/sea-freight/solutions/ChatGPT Image Sep 9, 2026, 04_04_23 AM.webp',
    title: 'RoRo (Roll-on Roll-off)',
    description: 'For vehicles and wheeled equipment driven directly onto and off the vessel.',
    buttonLabel: 'Request a Quote',
    buttonUrl: '/quotation',
  },
  {
    id: 'breakbulk',
    Icon: BreakbulkIcon,
    image: '/sea-freight/solutions/ChatGPT Image Sep 9, 2026, 04_05_14 AM.webp',
    title: 'Breakbulk',
    description: 'For cargo too large or irregular for standard containers, loaded individually.',
    buttonLabel: 'Request a Quote',
    buttonUrl: '/quotation',
  },
  {
    id: 'bulk',
    Icon: BulkIcon,
    image: '/sea-freight/solutions/what-is-bulk-carrier-cargo-ship_43376680b.webp',
    title: 'Bulk',
    description: 'For unpackaged cargo shipped in volume, loaded and unloaded directly.',
    buttonLabel: 'Request a Quote',
    buttonUrl: '/quotation',
  },
  {
    id: 'dg',
    Icon: DangerousGoodsIcon,
    image: '/sea-freight/solutions/ChatGPT Image Sep 9, 2026, 04_07_38 AM.webp',
    title: 'DG Shipping',
    description: 'Certified handling for hazardous and regulated cargo, to full compliance standards.',
    buttonLabel: 'Request a Quote',
    buttonUrl: '/quotation',
  },
  {
    id: 'temperature-controlled',
    Icon: ReeferIcon,
    image: '/magnific__ultrarealistic-premium-commercial-photograph-of-a-__67104.png',
    title: 'Reefer Containers',
    description: 'Temperature-controlled containers for perishables and sensitive cargo.',
    buttonLabel: 'Request a Quote',
    buttonUrl: '/quotation',
  },
];
