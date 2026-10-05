// components/customclearance/HowClearanceWorks.tsx
"use client";

import { useInView } from '../../hooks/useInView';
import ProcessStepsSection from '../shared/Steps';

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');
const animateBase = 'transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]';
const fade = (isVisible: boolean) => (isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10');

// ---------------------------------------------------------------------------
// Timeline table content
// ---------------------------------------------------------------------------

const timelineLabel = 'Typical Clearance Timelines';

interface TimelineRow {
  cargoType: string;
  timeline: string;
}

const timelineRows: TimelineRow[] = [
  { cargoType: 'Standard general cargo', timeline: '1 to 2 business days' },
  { cargoType: 'Air cargo (compliant docs)', timeline: 'Same day' },
  { cargoType: 'Free zone transit processing', timeline: '2 to 3 business days' },
  { cargoType: 'Inspection / restricted goods', timeline: '3 to 5 business days' },
];

// ---------------------------------------------------------------------------
// Timeline table (Forced 2-column layout across all devices)
// ---------------------------------------------------------------------------

const ClearanceTimelineTable = () => {
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
              Efficiency & Timeframe
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl text-[#0D2A22] font-light tracking-tight leading-[1.15]">
            {timelineLabel}
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
                  Cargo Type
                </th>
                <th 
                  className="p-3.5 sm:p-[clamp(1.1rem,2.4vw,1.65rem)] text-[11px] sm:text-[12px] font-medium tracking-[0.14em] uppercase w-[42%]"
                  style={{ color: '#36b936' }}
                >
                  Timeline
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {timelineRows.map((row) => (
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

const HowClearanceWorks = () => (
  <>
    <ProcessStepsSection
      eyebrow="Customs Clearance"
      heading={<>How Customs Clearance<br />Works in the UAE</>}
      description="A clear, four-step process from document prep to cargo release."
      steps={[
        {
          number: '01',
          title: 'Document Preparation',
          description:
            'We gather and verify all shipment documents, ensuring consistency between the commercial invoice, packing list, and transport documents. Any discrepancies are resolved before submission.',
        },
        {
          number: '02',
          title: 'Declaration Filing',
          description:
            'Our licensed brokers submit the customs declaration through the Mirsal 2 system on the Dubai Trade Portal, where automated validation checks data against current regulations.',
        },
        {
          number: '03',
          title: 'Assessment and Inspection',
          description:
            'Customs authorities assess applicable duties and may select the shipment for physical or X-ray inspection. We coordinate the inspection process and provide all supporting documentation to minimize hold times.',
        },
        {
          number: '04',
          title: 'Payment and Release',
          description:
            'Once approved, we process duty payments electronically and secure the release order for your cargo to be collected or delivered to its final destination.',
        },
      ]}
    />

    <ClearanceTimelineTable />
  </>
);

export default HowClearanceWorks;