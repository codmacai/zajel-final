import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { CareerHero, CareerValues, JobOpenings, LifeAtZajel, CareerBenefits } from '@/components/career';

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "Explore careers at Zajel. Join a UAE logistics team transforming how the country moves, powered by technology and trust.",
  path: '/careers',
});

export default function CareersPage() {
  return (
    <main>
      <CareerHero />
      <CareerValues />
      <JobOpenings />
      <LifeAtZajel />
      <CareerBenefits />
    </main>
  );
}
