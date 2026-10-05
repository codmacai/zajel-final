import { PortalIcon, ManagerIcon, DeliveryIcon } from './icons';
import type { BusinessCard } from './types';

export const HEADING = 'What Your Business Gets';

export const BUSINESS_CARDS: BusinessCard[] = [
  {
    Icon: PortalIcon,
    title: 'Your Own Portal',
    description: 'Book, manage, and track every order through the Zajel portal.',
  },
  {
    Icon: ManagerIcon,
    title: 'A Dedicated Account Manager',
    description: 'Direct access to a business logistics contact — not a shared support queue.',
  },
  {
    Icon: DeliveryIcon,
    title: 'Nationwide Delivery',
    description: 'Reach customers across every emirate, from a single pickup.',
  },
];
