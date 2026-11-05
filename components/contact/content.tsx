// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

export const CONTACT_PAGE_SVGBASE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...CONTACT_PAGE_SVGBASE}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </svg>
  );
}

export function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...CONTACT_PAGE_SVGBASE}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

export function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...CONTACT_PAGE_SVGBASE}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" {...CONTACT_PAGE_SVGBASE}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.985l4.258 5.63 4.751-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function LinkedInIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" {...CONTACT_PAGE_SVGBASE}>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function FacebookIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" {...CONTACT_PAGE_SVGBASE}>
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

export const CONTACT_ITEMS: {
  icon: React.ReactNode;
  label: string;
  primary: string;
  secondary?: string;
  href?: string;
}[] = [
  { icon: <PhoneIcon />, label: 'Phone', primary: '+971 60 053 1111', href: 'tel:+971600531111' },
  { icon: <ClockIcon />, label: 'Business hours', primary: 'Mon – Sat: 8 AM – 5 PM' },
  { icon: <PinIcon />, label: 'Headquarters', primary: 'Dubai, United Arab Emirates', secondary: 'ZAJEL Courier Services' },
  { icon: <PinIcon />, label: 'Branch office', primary: 'Abu Dhabi, United Arab Emirates', secondary: 'ZAJEL Courier Services' },
];

export const SOCIALS: { label: string; href: string; icon: React.ReactNode }[] = [
  { label: 'Instagram', href: 'https://instagram.com/', icon: <InstagramIcon /> },
  { label: 'X', href: 'https://x.com/', icon: <XIcon /> },
  { label: 'LinkedIn', href: 'https://linkedin.com/', icon: <LinkedInIcon /> },
  { label: 'Facebook', href: 'https://facebook.com/', icon: <FacebookIcon /> },
];

export const CONTACT_PAGE = {
  heading: "Get in touch",
  description: "We're here to help with your shipments, services and general inquiries.",
  followLabel: "Follow us",
  sentTitle: "Message sent",
  sentText: "Thanks for reaching out. We typically reply within 24 hours.",
  sendAnotherLabel: "Send another message",
  formTitle: "Send us a message",
  sendingLabel: "Sending…",
  sendLabel: "Send message",
  replyNote: "We typically respond within 24 hours.",
  nameLabel: "Full name",
  namePlaceholder: "John Doe",
  emailLabel: "Email address",
  emailPlaceholder: "john@example.com",
  phoneLabel: "Phone number",
  subjectLabel: "Subject",
  subjectPlaceholder: "How can we help?",
  details: CONTACT_ITEMS,
  socials: SOCIALS,
};
export type CONTACT_PAGEContent = typeof CONTACT_PAGE;
