import { FileCheck, History, Landmark } from 'lucide-react';
import type {
  HeroContent,
  FeatureSectionContent,
  ProtocolSectionContent,
} from '../shared';

// Default (hardcoded) copy. Edit freely, no backend involved.

export const GOV_HERO: HeroContent = {
  eyebrow: "Government & Institutional",
  title: "Trusted Logistics for\nGovernment Entities",
  description: "Secure, documented and fully compliant shipping for ministries, public authorities and institutions, handled with the discipline official cargo demands.",
  primaryLabel: "Request a Quote",
  primaryHref: "/contact",
  secondaryLabel: "Track Shipment",
  secondaryHref: "/track",
  image: "/services/government/hero.png",
  imageAlt: "Government logistics team handling an official consignment",
};

export const GOV_PROTOCOL: ProtocolSectionContent = {
  title: "Institutional Protocols",
  subtitle: "Structured handling built around the requirements of public-sector clients.",
  cards: [
    {
      Icon: Landmark,
      title: "Authorised Handling",
      content: "Shipments are handled only by vetted personnel, with clear accountability at every handover from pickup to delivery.",
    },
    {
      Icon: FileCheck,
      title: "Documented Process",
      content: "Every consignment is logged with complete paperwork, so your records stand up to internal and external review.",
    },
    {
      Icon: History,
      title: "Full Audit Trail",
      content: "A time-stamped record of each movement gives your team a reliable history for reporting and audits.",
    },
  ],
};

export const GOV_DETAILS: FeatureSectionContent = {
  title: "Meeting Every\n",
  highlight: "Regulatory Requirement",
  description: "Public-sector shipping comes with rules. We work within them so your consignments clear, arrive and stay on the record.",
  features: [
    { title: "Customs Documentation", desc: "Accurate preparation and submission of declarations and supporting documents for smooth clearance." },
    { title: "Chain of Custody", desc: "Controlled handovers with signed records, so responsibility is clear at all times." },
    { title: "Secure Storage", desc: "Access-controlled facilities for consignments awaiting clearance or onward movement." },
    { title: "Dedicated Coordination", desc: "A named point of contact who manages your shipments and keeps your team informed." },
  ],
};
