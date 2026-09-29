import { FileText, Gavel, Landmark } from 'lucide-react';
import type {
  HeroContent,
  FeatureSectionContent,
  ProtocolSectionContent,
} from '../shared';

// Default (hardcoded) copy. Edit freely, no backend involved.

export const SECURE_DOCS_HERO: HeroContent = {
  eyebrow: "Secure Document Courier",
  title: "Legal & Official Papers,\nHandled With Care",
  description: "Contracts, court filings and official records moved with strict custody controls and confirmed delivery.",
  primaryLabel: "Send a Document",
  primaryHref: "/contact",
  secondaryLabel: "Track Shipment",
  secondaryHref: "/track",
  image: "/securesol/ChatGPT Image May 12, 2026, 02_14_43 PM.png",
  imageAlt: "Sealed legal documents prepared for secure courier delivery",
};

export const SECURE_DOCS_PROTOCOL: ProtocolSectionContent = {
  title: "Legal Protocol",
  subtitle: "Custody controls suited to documents where originals matter.",
  cards: [
    {
      Icon: Gavel,
      title: "Court-Ready Handling",
      content: "Filings and legal papers are delivered on time and documented for your records.",
    },
    {
      Icon: Landmark,
      title: "Official Submissions",
      content: "Delivery to government offices and authorities, with receipt confirmation.",
    },
    {
      Icon: FileText,
      title: "Originals Preserved",
      content: "Originals are protected from damage and never copied unless you ask us to.",
    },
  ],
};

export const SECURE_DOCS_DETAILS: FeatureSectionContent = {
  title: "Confidential by\n",
  highlight: "Design",
  description: "Documents that carry legal weight need a process you can rely on. Ours is built around control and proof.",
  features: [
    { title: "Controlled Custody", desc: "Every handover is signed for, so you always know who holds your documents." },
    { title: "Strict Confidentiality", desc: "Contents stay private and are visible only to those authorised to handle them." },
    { title: "Deadline Management", desc: "Time-critical filings are scheduled and monitored against your cut-off." },
    { title: "Receipt Confirmation", desc: "Signed proof of delivery is captured and stored for your files." },
  ],
};
