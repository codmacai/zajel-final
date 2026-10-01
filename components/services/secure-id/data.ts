import { Fingerprint, ShieldCheck, UserCheck } from 'lucide-react';
import type {
  HeroContent,
  FeatureSectionContent,
  ProtocolSectionContent,
} from '../shared';

// Default (hardcoded) copy. Edit freely, no backend involved.

export const SECURE_ID_HERO: HeroContent = {
  eyebrow: "Secure ID Delivery",
  title: "Identity Documents,\nDelivered With Certainty",
  description: "Passports, national ID cards and licences travel with recipient verification at the door, so sensitive documents reach only the person they belong to.",
  primaryLabel: "Track Shipment",
  primaryHref: "/track",
  secondaryLabel: "Contact Support",
  secondaryHref: "/contact",
  image: "/securesol/ChatGPT Image May 12, 2026, 02_20_41 PM.webp",
  imageAlt: "Courier verifying a recipient before handing over an identity document",
};

export const SECURE_ID_PROTOCOL: ProtocolSectionContent = {
  title: "Identity Protocol",
  subtitle: "Every handover is verified before a document is released.",
  cards: [
    {
      Icon: ShieldCheck,
      title: "Sealed Packaging",
      content: "Tamper-evident packaging shows immediately if a parcel has been opened in transit.",
    },
    {
      Icon: UserCheck,
      title: "Recipient Verification",
      content: "ID is checked against the named recipient before release. No verification, no handover.",
    },
    {
      Icon: Fingerprint,
      title: "Signed Confirmation",
      content: "A signed, time-stamped proof of delivery is recorded for every document.",
    },
  ],
};

export const SECURE_ID_DETAILS: FeatureSectionContent = {
  title: "Verified at\n",
  highlight: "Every Step",
  description: "From collection to doorstep, each stage is checked and recorded so identity documents never change hands unverified.",
  features: [
    { title: "Collection Check", desc: "Documents are counted and sealed at pickup, and the sender receives a record." },
    { title: "In-Transit Tracking", desc: "Follow progress in real time and get notified at every key milestone." },
    { title: "Doorstep Verification", desc: "Couriers confirm the recipient's identity before the parcel is handed over." },
    { title: "Proof of Delivery", desc: "A digital confirmation is stored and available whenever you need it." },
  ],
};
