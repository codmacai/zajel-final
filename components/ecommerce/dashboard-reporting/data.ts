import type { DashboardFeature } from './types';

export const EYEBROW = 'Dashboard and Reporting';
export const HEADING = 'Your E-commerce Command Center';
export const INTRO =
  'Every Zajel e-commerce account includes access to a dedicated merchant dashboard. Track orders, monitor deliveries, reconcile COD payments, and pull performance reports from a single interface.';

export const DASHBOARD_IMAGE = '/ecommerce/business-dashboard.png';

export const FEATURES: DashboardFeature[] = [
  {
    title: 'Live Order Tracking',
    description: 'See every order from the moment it enters our system to final delivery with real-time status filters.',
  },
  {
    title: 'COD Reconciliation',
    description: 'Track Cash on Delivery collections, daily summaries, and payment transfer timelines effortlessly.',
  },
  {
    title: 'Delivery Performance',
    description: 'Weekly and monthly reports covering success rates, transit times, and return rates. Export to CSV or PDF.',
  },
  {
    title: 'Bulk Operations',
    description: 'Upload orders in bulk via CSV, generate shipping labels in batch, and schedule pickups instantly.',
  },
  {
    title: 'Customer Notifications',
    description: 'Automated SMS and email updates sent to customers at each milestone, branded with your store name.',
  },
];
