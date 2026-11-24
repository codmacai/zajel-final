import Image from 'next/image';
import Link from 'next/link';
import { getSection, type Lang } from '../shared/get-section';

interface CareersHeroData {
  eyebrow?: string;
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

// Same layout as the E-commerce hero (components/ecommerce/hero.tsx): on md+ one rounded
// card with the photo as background and the copy overlaid on a left-side gradient;
// on mobile the copy sits above the photo.
const CareerHero = async ({ lang = 'en', ctaHref = '#open-positions' }: CareerHeroProps) => {
  const content = await getSection<CareersHeroData>('careers_hero', lang);
  if (!content) return null;

  return (
    <section
      aria-labelledby="career-hero-title"
      className="box-border h-svh max-h-svh w-full overflow-hidden bg-[#F9FAFB] pb-[clamp(0.75rem,2vw,1.5rem)] font-sans"
      style={{ paddingTop: 'calc(var(--navbar-h, 76px) + 0.5rem)' }}
    >
      <div className="mx-auto flex h-full w-full max-w-[1600px] items-center px-[clamp(1rem,4vw,3.5rem)]">
        <div className="relative flex h-full max-h-full w-full flex-col md:block md:h-[clamp(500px,45vw,640px)] md:overflow-hidden md:rounded-[clamp(20px,2vw,32px)] md:bg-[#0B140F] md:text-white md:shadow-xl">
          {/* Picture: alone on mobile, background on md+ (LCP image) */}
          <div className="relative min-h-[140px] flex-1 overflow-hidden rounded-[1.25rem] bg-[#0B140F] shadow-lg sm:rounded-[1.5rem] md:absolute md:inset-0 md:min-h-0 md:rounded-none md:shadow-none">
            <Image
              src={content.image_url || FALLBACK_IMAGE}
              alt="The Zajel team outside the Dubai headquarters"
              fill
              priority
              sizes="(max-width: 1600px) 100vw, 1600px"
              className="object-cover object-center"
            />

            {/* Overlay: tablet/desktop only */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-black/80 via-black/55 to-black/20 md:block"
            />
          </div>

          {/* Text: above the image on mobile, overlaid on the left on md+ */}
          <div className="order-first shrink-0 pb-[clamp(0.75rem,3vw,1.25rem)] pt-1 md:absolute md:inset-0 md:z-10 md:flex md:items-center md:p-[clamp(1.75rem,4vw,4rem)]">
            <div className="w-full md:max-w-[clamp(420px,42vw,680px)]">
              {content.eyebrow && (
                <div className="mb-[clamp(0.375rem,1.2vw,1rem)] flex items-center gap-3">
                  <span className="text-[clamp(0.6875rem,0.75vw,0.875rem)] font-medium uppercase tracking-wider text-[#36B936] md:text-[#7BE07B]">
                    {content.eyebrow}
                  </span>
                </div>
              )}

              <h1
                id="career-hero-title"
                className="max-w-[24ch] whitespace-pre-line text-balance break-words font-medium leading-[1.15] tracking-tight text-[#0A4D26] text-[clamp(1.375rem,min(1rem_+_2.4vw,5.5svh),3.5rem)] md:text-white"
              >
                {content.title}
              </h1>

              <p className="mt-[clamp(0.375rem,1.4vw,1.25rem)] max-w-[46ch] font-light leading-relaxed text-[#0A4D26]/75 text-[clamp(0.8125rem,min(0.6rem_+_0.7vw,2.6svh),1.1rem)] md:text-white/80">
                {content.description}
              </p>

              <Link
                href={ctaHref}
                className="mt-[clamp(0.75rem,2vw,1.75rem)] inline-flex items-center gap-2 rounded-full bg-[#36B936] px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.55rem,1vw,0.85rem)] text-[clamp(0.8rem,1.4vw,0.9rem)] font-medium text-[#0B140F] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A4D26] md:focus-visible:outline-white"
              >
                {content.buttonLabel}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerHero;
