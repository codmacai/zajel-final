import type { ReactNode } from 'react';
import Eyebrow from '@/components/ui copy/eyebrow';
import { typo } from '@/components/ui copy/typography';
import { Reveal } from './motion';

interface SectionHeadingProps {
  title: ReactNode;
  description?: string;
  /** Optional line + uppercase label above the title (same as the Industries section) */
  eyebrow?: string;
  /** Tailwind classes for spacing below the heading */
  className?: string;
  /** Tailwind max-width class for the paragraph */
  descriptionWidth?: string;
}

const SectionHeading = ({
  title,
  description,
  eyebrow,
  className = 'mb-8 sm:mb-12 lg:mb-14',
  descriptionWidth = 'max-w-[520px]',
}: SectionHeadingProps) => (
  <Reveal className={`text-center ${className}`}>
    {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
    {/* whitespace-pre-line keeps line breaks typed in content.ts */}
    <h2 className={`${typo.h2} mx-auto max-w-[720px] whitespace-pre-line text-[#1b4332]`}>{title}</h2>
    {description && (
      <p className={`${typo.body} mx-auto mt-3.5 whitespace-pre-line text-[#2d6a4f] ${descriptionWidth}`}>
        {description}
      </p>
    )}
  </Reveal>
);

export default SectionHeading;
