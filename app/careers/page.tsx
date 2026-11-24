import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { CareerHero, CareerValues, JobOpenings, LifeAtZajel, CareerBenefits } from '@/components/career';
import { CAREERS_PORTAL_URL, getJobOpenings } from '@/lib/careers/jobFeed';

// Re-render at most hourly so new feed postings show up (matches the feed fetch cache).
export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: 'Careers',
  description:
    'Explore careers at Zajel. Join a UAE logistics team transforming how the country moves, powered by technology and trust.',
  path: '/careers',
});

export default async function CareersPage() {
  const jobs = await getJobOpenings();

  return (
    <main>
      <CareerHero />
      <CareerValues />
      <JobOpenings jobs={jobs} portalUrl={CAREERS_PORTAL_URL} />
      <LifeAtZajel />
      <CareerBenefits />
    </main>
  );
}
