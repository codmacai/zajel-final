import Image from 'next/image';
import Link from 'next/link';
import { getSection, type Lang } from '../shared/get-section';
import styles from './career-hero.module.css';

interface CareersHeroData {
  title: string;
  description: string;
  buttonLabel: string;
  image_url: string;
}

const FALLBACK_IMAGE = '/career/career-hero-team.webp';

interface CareerHeroProps {
  lang?: Lang;
  /** Where the CTA goes. Defaults to the Job Openings section on the same page. */
  ctaHref?: string;
}

const CareerHero = async ({ lang = 'en', ctaHref = '#open-positions' }: CareerHeroProps) => {
  const content = await getSection<CareersHeroData>('careers_hero', lang);
  if (!content) return null;

  return (
    <section className="relative flex h-[100svh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-[#0B1111] font-sans">
      <div className="absolute inset-0 z-0">
        {/* LCP image: priority + full-width sizes */}
        <Image
          src={content.image_url || FALLBACK_IMAGE}
          alt="Zajel Team"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/10" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[720px] flex-col items-center px-6 text-center">
        <h1
          className={`${styles.title} mb-4 whitespace-pre-line text-balance text-[2rem] font-medium leading-[1.15] tracking-tight text-white sm:mb-6 sm:text-5xl lg:text-6xl`}
        >
          {content.title}
        </h1>

        <p
          className={`${styles.desc} mx-auto mb-8 max-w-[440px] text-sm font-light leading-relaxed tracking-tight text-white/90 sm:mb-10 sm:text-base md:text-lg`}
        >
          {content.description}
        </p>

        <div className={styles.cta}>
          <Link
            href={ctaHref}
            className="inline-flex h-[52px] min-w-[175px] items-center justify-center gap-2.5 whitespace-nowrap rounded-[30px] bg-[#004E09] px-8 text-[13px] font-medium tracking-tight text-white shadow-2xl transition-[transform,background-color] duration-200 hover:scale-[1.02] hover:bg-[#005f0c] active:scale-[0.98] sm:h-[60px] sm:text-[14px]"
          >
            <span className="text-lg leading-none" aria-hidden="true">
              +
            </span>
            {content.buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CareerHero;