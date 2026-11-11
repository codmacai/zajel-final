// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import { CUSTOMS_CLEARANCE_CARDS, CUSTOMS_CLEARANCE_HEADING, CUSTOMS_CLEARANCE_INTRO } from '@/data/customs-clearance';
import { FREE_ZONE_NOTE, LOCATION_COVERAGE_HEADING, LOCATION_COVERAGE_INTRO, LOCATION_GROUPS } from '@/data/customs-location-coverage';
import { DOC_COMPLIANCE_COLUMNS, DOC_COMPLIANCE_HEADING, DOC_COMPLIANCE_INTRO } from '@/data/customs-documentation-compliance';
import { INDUSTRIES, INDUSTRIES_WE_SERVE_DESCRIPTION, INDUSTRIES_WE_SERVE_EYEBROW, INDUSTRIES_WE_SERVE_HEADING } from '@/data/industries-we-serve';
import { CUSTOMS_CLEARANCE_FAQS } from '@/data/customs-clearance-faqs';
export const CUSTOMS_SERVICES = {
  heading: CUSTOMS_CLEARANCE_HEADING,
  intro: CUSTOMS_CLEARANCE_INTRO,
  cards: CUSTOMS_CLEARANCE_CARDS,
};
export type CUSTOMS_SERVICESContent = typeof CUSTOMS_SERVICES;

export const CUSTOMS_LOCATIONS = {
  heading: LOCATION_COVERAGE_HEADING,
  intro: LOCATION_COVERAGE_INTRO,
  groups: LOCATION_GROUPS,
  freeZoneNote: FREE_ZONE_NOTE,
};
export type CUSTOMS_LOCATIONSContent = typeof CUSTOMS_LOCATIONS;

export const CUSTOMS_DOCUMENTS = {
  heading: DOC_COMPLIANCE_HEADING,
  intro: DOC_COMPLIANCE_INTRO,
  columns: DOC_COMPLIANCE_COLUMNS,
};
export type CUSTOMS_DOCUMENTSContent = typeof CUSTOMS_DOCUMENTS;

export const CUSTOMS_STEPS_TIMELINELABEL = 'Typical Clearance Timelines';

export interface TimelineRow {
  cargoType: string;
  timeline: string;
}

export const CUSTOMS_STEPS_TIMELINEROWS: TimelineRow[] = [
  { cargoType: 'Standard general cargo', timeline: '1 to 2 business days' },
  { cargoType: 'Air cargo (compliant docs)', timeline: 'Same day' },
  { cargoType: 'Free zone transit processing', timeline: '2 to 3 business days' },
  { cargoType: 'Inspection / restricted goods', timeline: '3 to 5 business days' },
];

export const CUSTOMS_STEPS = {
  eyebrow: "Customs Clearance",
  description: "A clear, four-step process from document prep to cargo release.",
  timelineEyebrow: "Efficiency & Timeframe",
  columnCargo: "Cargo Type",
  columnTimeline: "Timeline",
  headingLine1: "How Customs Clearance",
  headingLine2: "Works in the UAE",
  timelineLabel: CUSTOMS_STEPS_TIMELINELABEL,
  timelineRows: CUSTOMS_STEPS_TIMELINEROWS,
  steps: [
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
      ],
};
export type CUSTOMS_STEPSContent = typeof CUSTOMS_STEPS;

export const CUSTOMS_INDUSTRIES = {
  eyebrow: INDUSTRIES_WE_SERVE_EYEBROW,
  heading: INDUSTRIES_WE_SERVE_HEADING,
  description: INDUSTRIES_WE_SERVE_DESCRIPTION,
  items: INDUSTRIES,
  ctaLabel: "Don't see your industry?",
  ctaDescription: 'Get in touch — we tailor logistics solutions for every sector.',
  ctaTag: 'CTA',
};
export type CUSTOMS_INDUSTRIESContent = typeof CUSTOMS_INDUSTRIES;

export const CUSTOMS_FAQ = {
  eyebrow: "FAQ",
  heading: "Frequently Asked Questions",
  items: CUSTOMS_CLEARANCE_FAQS,
};
export type CUSTOMS_FAQContent = typeof CUSTOMS_FAQ;
