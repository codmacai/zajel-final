import type { LandFreightCard } from './types';
import { TruckIcon, BoxesIcon } from './icons';

export const EYEBROW = 'Land Freight Solutions';
export const HEADING = 'Our Land Freight Services';
export const SUBHEADING = 'Flexible, dedicated, and shared ground transport configurations engineered for the region.';

export const LAND_FREIGHT_CARDS: LandFreightCard[] = [
  {
    id: 'ftl',
    Icon: TruckIcon,
    image: '/land-freight/full-truckload-ftl.webp',
    title: 'Full Truckload (FTL)',
    description: 'A dedicated truck for your cargo alone — suited to large or high-volume shipments.',
    buttonLabel: 'Learn More',
    buttonUrl: '/quotation',
  },
  {
    id: 'ltl',
    Icon: BoxesIcon,
    image: '/land-freight/less-than-truckload-ltl.webp',
    title: 'Less than Truckload (LTL)',
    description: "Shared truck space for smaller shipments — cost-effective when you don't need a full truck.",
    buttonLabel: 'Learn More',
    buttonUrl: '/quotation',
  },
];
