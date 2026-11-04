// components/customclearance/HowClearanceWorks.tsx
"use client";

import { useInView } from '../../hooks/useInView';
import ProcessStepsSection from '../shared/Steps';
import { CUSTOMS_STEPS, type CUSTOMS_STEPSContent } from './content';
import { cmsSection } from '@/components/cms/CmsProvider';

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const animateBase = 'transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]';
const fade = (isVisible: boolean) => (isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10');

// ---------------------------------------------------------------------------
// Timeline table content
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Timeline table (Forced 2-column layout across all devices)
// ---------------------------------------------------------------------------

const ClearanceTimelineTable = ({ content }: { content: CUSTOMS_STEPSContent }) => {
  const { ref: tableRef, isVisible } = useInView<HTMLDivElement>();

  return (
    <section
      ref={tableRef}
      className="w-full relative overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-white font-['Manrope',system-ui,sans-serif]"
    >
      <div className="mx-auto max-w-5xl">
        <div className={cx('text-center mb-8 sm:mb-10 px-2', animateBase, fade(isVisible))}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span style={{ color: '#36B936' }} className="font-medium text-xs sm:text-sm tracking-wider uppercase">
              {content.timelineEyebrow}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl text-[#0D2A22] font-light tracking-tight leading-[1.15]">
            {content.timelineLabel}
          </h3>
        </div>

        {/* Container — Deeper dark green surface (#0A3D2D / #05241A) with #36b936 accents */}
        <div
          className={cx(
            'rounded-2xl sm:rounded-[2rem] border border-[#0A3D2D]/50 bg-gradient-to-b from-[#0A3D2D] to-[#05241A] text-white shadow-[0_25px_60px_-15px_rgba(5,36,26,0.45)] overflow-hidden',
            animateBase,
            fade(isVisible)
          )}
          style={{ transitionDelay: '150ms' }}
        >
          {/* Two-column table active on mobile, tablet, and desktop */}
          <table className="w-full border-collapse text-left table-fixed">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04]">
                <th className="p-3.5 sm:p-[clamp(1.1rem,2.4vw,1.65rem)] text-[11px] sm:text-[12px] font-medium text-white/50 tracking-[0.14em] uppercase w-[58%]">
                  {content.columnCargo}
                </th>
                <th 
                  className="p-3.5 sm:p-[clamp(1.1rem,2.4vw,1.65rem)] text-[11px] sm:text-[12px] font-medium tracking-[0.14em] uppercase w-[42%]"
                  style={{ color: '#36b936' }}
                >
                  {content.columnTimeline}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {content.timelineRows.map((row) => (
                <tr
                  key={row.cargoType}
                  className="group transition-colors duration-300 hover:bg-white/[0.06]"
                >
                  <td className="p-3.5 sm:p-[clamp(1.1rem,2.4vw,1.65rem)] text-[13px] sm:text-[clamp(0.85rem,1.5vw,0.95rem)] font-medium text-white/95 align-middle leading-snug">
                    {row.cargoType}
                  </td>
                  <td 
                    className="p-3.5 sm:p-[clamp(1.1rem,2.4vw,1.65rem)] text-[13px] sm:text-[clamp(0.85rem,1.5vw,0.95rem)] font-medium align-middle leading-snug"
                    style={{ color: '#36b936' }}
                  >
                    {row.timeline}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

const HowClearanceWorks = ({ content }: { content: CUSTOMS_STEPSContent }) => (
  <>
    <ProcessStepsSection
      eyebrow={content.eyebrow}
      heading={<>{content.headingLine1}<br />{content.headingLine2}</>}
      description={content.description}
      steps={content.steps}
    />

    <ClearanceTimelineTable content={content} />
  </>
);

export default cmsSection('customs-clearance.how-it-works', CUSTOMS_STEPS, HowClearanceWorks);
