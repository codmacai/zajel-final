/**
 * Local page content (no CMS / Supabase). Edit the text here.
 * `ar` is optional: if missing, English is used.
 */

export interface SectionContent {
  enabled?: boolean;
  en: unknown;
  ar?: unknown;
}

export const CONTENT: Record<string, SectionContent> = {
  careers_hero: {
    en: {
      title: 'Deliver Your Future\nwith Zajel',
      description: "Join a team that's transforming the way the UAE moves — powered by technology and trust.",
      buttonLabel: 'Open positions',
      image_url: '', // empty -> falls back to /career/hero.png
    },
  },

  careers_values: {
    en: {
      heading: 'A Place Where\nPassion Meets Purpose',
      description:
        "At Zajel, we believe logistics isn't just about movement — it's about momentum. Every member of our team contributes to delivering reliability, innovation, and human connection.",
      // Exactly 6, to match the 6 icons in career-values/icons.tsx
      values: [
        { title: 'Integrity in Every Mile', desc: "We do what's right — even when no one's watching." },
        { title: 'Speed with Precision', desc: 'Fast is good; accurate is better. We strive for both.' },
        { title: 'Innovation Everyday', desc: 'From AI-driven tracking to eco-delivery, we lead with ideas.' },
        { title: 'Customer-First Mindset', desc: 'Every parcel, every client, every moment — we care.' },
        { title: 'Sustainability Commitment', desc: 'Reducing waste, optimizing routes, and going green.' },
        { title: 'People Over Processes', desc: 'Because great teams make great deliveries.' },
      ],
    },
  },

  careers_benefits: {
    en: {
      heading: 'Benefits That Keep\nYou Moving',
      description: 'We reward your effort with support, balance, and opportunities.',
      // `icon` = a lucide icon name from ICONS in career-benefits/index.tsx
      benefits: [
        { title: 'Career Growth', desc: 'Structured training & promotion paths.', icon: 'growth' },
        { title: 'Competitive Pay', desc: 'Rewarding packages for every role.', icon: 'pay' },
        { title: 'Flexible Shifts', desc: 'Balanced schedules for work-life harmony.', icon: 'shifts' },
        { title: 'Health & Wellness', desc: 'Medical insurance and wellness programs.', icon: 'health' },
        { title: 'Paid Leave & Holidays', desc: 'Rest, recharge, and return stronger.', icon: 'leave' },
        { title: 'Training Programs', desc: 'Onboarding, logistics courses & skill workshops.', icon: 'training' },
      ],
    },
  },
};
