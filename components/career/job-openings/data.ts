export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  /** Where "Join our Team" goes for this role. */
  href: string;
}

// Placeholder data (same role x3, as in the original). Replace with real roles,
// or pass a `jobs` prop to <JobOpenings /> from your CMS / API.
export const JOBS: Job[] = [
  {
    id: 'operations-executive-1',
    title: 'Operations Executive',
    description: 'Coordinate daily logistics operations, support drivers, and ensure SLA compliance.',
    location: 'Dubai, UAE',
    type: 'Full-Time',
    href: 'mailto:info@zajel.ae?subject=Application%3A%20Operations%20Executive',
  },
  {
    id: 'operations-executive-2',
    title: 'Operations Executive',
    description: 'Coordinate daily logistics operations, support drivers, and ensure SLA compliance.',
    location: 'Dubai, UAE',
    type: 'Full-Time',
    href: 'mailto:info@zajel.ae?subject=Application%3A%20Operations%20Executive',
  },
  {
    id: 'operations-executive-3',
    title: 'Operations Executive',
    description: 'Coordinate daily logistics operations, support drivers, and ensure SLA compliance.',
    location: 'Dubai, UAE',
    type: 'Full-Time',
    href: 'mailto:info@zajel.ae?subject=Application%3A%20Operations%20Executive',
  },
];
