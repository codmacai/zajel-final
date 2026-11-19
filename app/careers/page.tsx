import { cmsMetadata, notFoundIfHidden } from '@/lib/cms/server';
import { CareerHero, CareerValues, JobOpenings, LifeAtZajel, CareerBenefits } from '@/components/career';

export const generateMetadata = cmsMetadata('careers', '/careers');

export default async function CareersPage() {
  // Switched off in the CMS: "page not found".
  await notFoundIfHidden('careers');
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
