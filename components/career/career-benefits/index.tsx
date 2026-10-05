import { Banknote, Clock, GraduationCap, HeartPulse, Palmtree, TrendingUp, type LucideIcon } from 'lucide-react';
import { getSection, type Lang } from '../shared/get-section';
import { typo } from '@/components/ui copy/typography';
import { Stagger, StaggerItem } from '../shared/motion';
import SectionHeading from '../shared/section-heading';

export interface CareersBenefitCard {
  title: string;
  desc: string;
  /** key of ICONS below */
  icon?: string;
}

const ICONS: Record<string, LucideIcon> = {
  growth: TrendingUp,
  pay: Banknote,
  shifts: Clock,
  health: HeartPulse,
  leave: Palmtree,
  training: GraduationCap,
}

export interface CareersBenefitsContent {
  heading: string;
  description: string;
  benefits: CareersBenefitCard[];
}

const COLUMNS = 3; // md+ grid columns (must match `md:grid-cols-3` below)

/**
 * Divider lines between cells. Only draws a border where a neighbour exists, so
 * the outer card border is never doubled (the old version doubled it when there
 * were <= 3 items, or when the last row was incomplete).
 * `border-e` is the logical property, so this also works when the page is RTL.
 */
function cellBorders(idx: number, total: number) {
  const isLast = idx === total - 1;
  const hasRowBelow = idx + COLUMNS < total;
  const hasCellAfterInRow = !isLast && (idx + 1) % COLUMNS !== 0;

  return [
    !isLast ? 'border-b' : '',
    hasRowBelow ? 'md:border-b' : 'md:border-b-0',
    hasCellAfterInRow ? 'md:border-e' : '',
  ].join(' ');
}

const CareerBenefits = async ({ lang = 'en' }: { lang?: Lang }) => {
  const data = await getSection<CareersBenefitsContent>('careers_benefits', lang);
  const benefits = data?.benefits ?? [];
  if (!data || benefits.length === 0) return null;

  return (
    <section className="w-full bg-[#FDFDFD] px-4 py-10 sm:px-6 sm:py-16 lg:px-24 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading title={data.heading} description={data.description} />

        <Stagger
          scale={0.98}
          stagger={0.1}
          delay={0.2}
          margin="-100px"
          className="grid grid-cols-1 overflow-hidden rounded-[1.5rem] border border-[#1b4332]/10 bg-white shadow-[0_20px_50px_rgba(6,68,35,0.02)] md:grid-cols-3 md:rounded-[2.5rem]"
        >
          {benefits.map((item, idx) => {
            const Icon = item.icon ? ICONS[item.icon] : undefined;
            return (
            <StaggerItem
              key={`${idx}-${item.title}`}
              className={`group flex flex-col items-start border-[#1b4332]/10 p-6 text-start transition-colors duration-500 hover:bg-[#F9FBF9] md:p-10 lg:p-14 ${cellBorders(idx, benefits.length)}`}
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-start motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-110 md:mb-8">
                {Icon ? (
                  <Icon className="h-full w-full text-[#36B936]" strokeWidth={1.5} aria-hidden="true" />
                ) : (
                  <div className="h-8 w-8 rounded bg-[#1b4332]/10" aria-hidden="true" />
                )}
              </div>
              <h3 className={`${typo.cardTitle} mb-2 text-[#1b4332] md:mb-3`}>
                {item.title}
              </h3>
              <p className={`${typo.cardBody} max-w-[220px] whitespace-pre-line text-[#2d6a4f]`}>
                {item.desc}
              </p>
            </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
};

export default CareerBenefits;
