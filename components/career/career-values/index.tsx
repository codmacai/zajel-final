import { getSection, type Lang } from '../shared/get-section';
import { typo } from '@/components/ui copy/typography';
import { Reveal, Stagger, StaggerItem } from '../shared/motion';
import { VALUE_ICONS } from './icons';

interface CareersValuesData {
  heading: string;
  description: string;
  values: { title: string; desc: string }[];
}

const CareerValues = async ({ lang = 'en' }: { lang?: Lang }) => {
  const content = await getSection<CareersValuesData>('careers_values', lang);
  if (!content) return null;

  const values = content.values ?? [];

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-to-br from-[#36B936] via-[#32A832] to-[#247A24]">
      {/* ⚠️ PASTE YOUR DECORATIVE BOXES HERE — they were elided ("...decorative boxes unchanged...")
          in the code you sent. Keep them `absolute` + `aria-hidden="true"` + `pointer-events-none`. */}

      <div className="relative z-10 flex min-h-[100svh] w-full items-center px-5 py-28 pb-48 sm:px-8 sm:py-32 sm:pb-52 md:px-12 lg:px-24 lg:py-24 lg:pb-24">
        <div className="mx-auto grid w-full max-w-[1300px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal x={-40} y={0} margin="-100px">
            {/* h2, not h1 — the page's single h1 lives in <CareerHero /> */}
            <h2 className={`${typo.h1} mb-4 whitespace-pre-line text-white sm:mb-6`}>
              {content.heading}
            </h2>
            <p className={`${typo.body} max-w-[480px] text-white/90`}>
              {content.description}
            </p>
          </Reveal>

          <Stagger
            stagger={0.15}
            delay={0.2}
            margin="-100px"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 sm:gap-y-12"
          >
            {values.map((val, idx) => {
              const Icon = VALUE_ICONS[idx];
              return (
                <StaggerItem key={`${idx}-${val.title}`} y={30} className="group flex flex-col items-start">
                  <div className="mb-3 opacity-90 motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105 sm:mb-4">
                    {Icon && <Icon />}
                  </div>
                  <h3 className={`${typo.cardTitle} mb-1.5 text-white sm:mb-2`}>
                    {val.title}
                  </h3>
                  <p className={`${typo.cardBody} max-w-full whitespace-pre-line text-white/90 sm:max-w-[210px]`}>
                    {val.desc}
                  </p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
};

export default CareerValues;
