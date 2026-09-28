import type { Metadata } from 'next';
import { CareerHero, CareerValues, JobOpenings, LifeAtZajel, CareerBenefits } from '@/components/career';

export const metadata: Metadata = {
  title: 'Careers | Zajel',
  description: "Join a team that's transforming the way the UAE moves — powered by technology and trust.",
};

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
