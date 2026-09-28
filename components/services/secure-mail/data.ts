import { Building2, EyeOff, Mail } from 'lucide-react';
import type {
  HeroContent,
  FeatureSectionContent,
  ProtocolSectionContent,
} from '../shared';

// Default (hardcoded) copy. Edit freely, no backend involved.

export const SECURE_MAIL_HERO: HeroContent = {
  eyebrow: "Secure Mail Service",
  title: "Confidential Mail,\nProtected End to End",
  description: "Sensitive correspondence is sealed, tracked and delivered directly to the named recipient.",
  primaryLabel: "Send Secure Mail",
  primaryHref: "/contact",
  secondaryLabel: "Track Shipment",
  secondaryHref: "/track",
  image: "/services/secure-mail/hero.png",
  imageAlt: "Sealed confidential envelope ready for secure delivery",
};

export const SECURE_MAIL_PROTOCOL: ProtocolSectionContent = {
  title: "Mail Security Protocol",
  subtitle: "Privacy is built into every step, from collection to delivery.",
  cards: [
    {
      Icon: Mail,
      title: "Sealed Correspondence",
      content: "Sealed at collection and kept sealed until it reaches the named recipient.",
    },
    {
      Icon: Building2,
      title: "Corporate Mailrooms",
      content: "Delivery routed to the right department or executive, with clear handover records.",
    },
    {
      Icon: EyeOff,
      title: "Discreet Handling",
      content: "Content stays private. Couriers see only the details needed for delivery.",
    },
  ],
};

export const SECURE_MAIL_DETAILS: FeatureSectionContent = {
  title: "Mail That Stays Between\nYou and the Recipient",
  description: "Confidential mail should never be casually handled. We keep the process tight so it arrives exactly as it left.",
  features: [
    { title: "Named-Recipient Delivery", desc: "Mail is released only to the person it is addressed to." },
    { title: "Tamper-Evident Seals", desc: "Any attempt to open a parcel in transit is immediately visible." },
    { title: "Live Tracking", desc: "Follow every item from collection to delivery." },
    { title: "Delivery Confirmation", desc: "Receive confirmation the moment your mail is handed over." },
  ],
};
