import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Stagger, StaggerItem } from '../shared/motion';
import { typo } from '@/components/ui copy/typography';
import SectionHeading from '../shared/section-heading';
import { CAREERS_JOBS } from './data';
import { serverSection } from '@/lib/cms/server';

const JobOpenings = ({ content }: { content: typeof CAREERS_JOBS }) => {
  const jobs = content.jobs;
  if (jobs.length === 0) return null;

  return (
    // id = target of the hero CTA (#open-positions)
    <section
      id="open-positions"
      className="w-full scroll-mt-20 overflow-hidden bg-[#FDFDFD] px-4 py-10 sm:px-6 sm:py-16 lg:px-24 lg:py-24"
    >
      <div className="mx-auto flex max-w-[1300px] flex-col items-center">
        <SectionHeading
          title={
            <>
              {content.headingLine1} <br /> {content.headingLine2}
            </>
          }
          description={content.description}
        />

        <Stagger stagger={0.15} margin="-100px" className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {jobs.map((job) => (
            <StaggerItem
              key={job.id}
              y={30}
              className="group flex min-h-[320px] flex-col rounded-[1.5rem] border border-[#1b4332]/10 bg-white p-6 transition-colors duration-500 hover:border-[#36B936]/30 md:min-h-[420px] md:rounded-[2rem] md:p-8 lg:p-10"
            >
              <h3 className="mb-3 text-[18px] font-medium leading-tight tracking-tight text-[#1b4332] sm:text-[20px] md:mb-4 lg:text-[22px]">
                {job.title}
              </h3>

              <p className={`${typo.body} mb-5 max-w-[260px] text-[#2d6a4f] md:mb-6`}>
                {job.description}
              </p>

              <p className={`${typo.meta} mb-auto uppercase text-[#2d6a4f] sm:text-[12px]`}>
                {job.location} | {job.type}
              </p>

              <Link
                href={job.href}
                className="mt-8 flex w-fit items-center gap-3 rounded-xl border border-[#1b4332]/20 px-6 py-3 text-[13px] font-medium tracking-tight text-[#1b4332] transition-all duration-300 hover:bg-[#1b4332] hover:text-white active:scale-95 md:mt-12 md:px-8 md:py-3.5 md:text-[14px]"
              >
                <span>
                  {content.buttonLabel}<span className="sr-only"> — {job.title}</span>
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default serverSection('careers.jobs', CAREERS_JOBS, JobOpenings);
