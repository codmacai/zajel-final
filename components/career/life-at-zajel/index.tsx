import Image from 'next/image';
import { typo } from '@/components/ui copy/typography';
import { Reveal, Stagger, StaggerItem } from '../shared/motion';

// Below the fold -> Next lazy-loads these by default. `sizes` tells the browser
// the rendered width at each breakpoint so phones never download desktop images.
const PHOTOS = {
  exhibition: { src: '/career/image copy 8.png', alt: 'Zajel Exhibition' },
  team: { src: '/career/image copy 9.png', alt: 'Team' },
  award: { src: '/career/image copy 10.png', alt: 'Employee Award' },
  operations: { src: '/career/image copy 11.png', alt: 'Operations' },
} as const;

interface PhotoProps {
  src: string;
  alt: string;
  sizes: string;
}

const Photo = ({ src, alt, sizes }: PhotoProps) => (
  <Image
    src={src}
    alt={alt}
    fill
    sizes={sizes}
    className="object-cover motion-safe:transition-transform motion-safe:duration-1000 motion-safe:group-hover:scale-105"
  />
);

const LifeAtZajel = () => {
  return (
    <section className="w-full overflow-hidden bg-[#FDFDFD] px-4 py-10 sm:px-6 sm:py-16 lg:px-24 lg:py-24">
      <div className="mx-auto max-w-[1300px]">
        {/* Top */}
        <div className="mb-6 grid grid-cols-1 items-start gap-6 md:mb-10 lg:grid-cols-12 lg:gap-12">
          <Reveal x={-30} y={0} className="pt-1 lg:col-span-5">
            <h2 className={`${typo.h2} mb-4 text-[#1b4332] sm:mb-5 lg:mb-6`}>
              Life at Zajel — More <br /> Than Just Work
            </h2>
            <p className={`${typo.body} max-w-[400px] text-[#2d6a4f]`}>
              We&apos;re building a culture where collaboration, curiosity, and care meet every day. Our people are our
              greatest delivery — and their growth is our priority.
            </p>
          </Reveal>

          <Reveal
            scale={0.95}
            className="group relative h-[220px] overflow-hidden rounded-[20px] sm:h-[300px] lg:col-span-7 lg:h-[400px]"
          >
            <Photo {...PHOTOS.exhibition} sizes="(min-width: 1024px) 55vw, 100vw" />
          </Reveal>
        </div>

        {/* Bottom */}
        <Stagger stagger={0.15} margin="-100px" className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <StaggerItem
            scale={0.95}
            className="group relative h-[220px] overflow-hidden rounded-[20px] md:col-span-3 md:h-[380px]"
          >
            <Photo {...PHOTOS.team} sizes="(min-width: 768px) 25vw, 100vw" />
          </StaggerItem>

          <StaggerItem
            scale={0.95}
            className="group relative h-[220px] overflow-hidden rounded-[20px] md:col-span-6 md:h-[380px]"
          >
            <Photo {...PHOTOS.award} sizes="(min-width: 768px) 50vw, 100vw" />
          </StaggerItem>

          <StaggerItem
            scale={0.95}
            className="group relative h-[220px] overflow-hidden rounded-[20px] md:col-span-3 md:h-[380px]"
          >
            <Photo {...PHOTOS.operations} sizes="(min-width: 768px) 25vw, 100vw" />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
};

export default LifeAtZajel;
