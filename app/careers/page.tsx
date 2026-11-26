import { cmsMetadata, getSection, notFoundIfHidden } from '@/lib/cms/server';
import { CareerHero, CareerValues, JobOpenings, LifeAtZajel, CareerBenefits } from '@/components/career';
import { CAREERS_JOBS } from '@/components/career/job-openings/data';
import { CAREERS_PORTAL_URL, getJobOpenings } from '@/lib/careers/jobFeed';

// Re-render at most hourly so new feed postings show up (matches the feed fetch cache).
export const revalidate = 3600;

export const generateMetadata = cmsMetadata('careers', '/careers');

export default async function CareersPage() {
  await notFoundIfHidden('careers');
  const [jobs, jobsText] = await Promise.all([getJobOpenings(), getSection('careers.jobs', CAREERS_JOBS)]);

  return (
    <main>
      <CareerHero />
      <CareerValues />
      {jobsText && <JobOpenings jobs={jobs} portalUrl={CAREERS_PORTAL_URL} content={jobsText} />}
      <LifeAtZajel />
      <CareerBenefits />
    </main>
  );
}
