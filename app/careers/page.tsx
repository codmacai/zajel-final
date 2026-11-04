import { cmsMetadata } from '@/lib/cms/server';
import { CareerHero, CareerValues, JobOpenings, LifeAtZajel, CareerBenefits } from '@/components/career';

export const generateMetadata = cmsMetadata('careers', '/careers');

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
