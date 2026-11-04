// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import { INDUSTRIES, INDUSTRY_EXPERTISE_EYEBROW } from '@/data/industry-expertise';
import { Industry_Faqs } from '@/data/industry-faqs';
import type { ContactBandProps } from '@/components/dynamic-contact';
export const INDUSTRY_EXPERTISE = {
  eyebrow: INDUSTRY_EXPERTISE_EYEBROW,
  industries: INDUSTRIES,
};
export type INDUSTRY_EXPERTISEContent = typeof INDUSTRY_EXPERTISE;

export const INDUSTRY_FAQ = {
  eyebrow: "FAQ",
  heading: "Frequently Asked Questions",
  items: Industry_Faqs,
};
export type INDUSTRY_FAQContent = typeof INDUSTRY_FAQ;

export const INDUSTRY_CONTACT: ContactBandProps = {
  badgeText: "Specialized Logistics Solutions",
  title: "Your Industry, Our Expertise",
  descriptionLead: "The industries listed here represent the sectors where Zajel has established deep operational experience. But logistics requirements are not limited to a fixed list of verticals. If your industry requires specialized handling, specific compliance standards, or tailored logistics solutions that go beyond standard transport, our team is equipped to design and deliver a solution that fits.",
  descriptionDetail: "Contact us to discuss the logistics requirements of your industry and how Zajel can support your operations.",
  contactInfo: {
          email: "sales@zajel.com",
          phone: "600 53 11 11",
          address: "Dubai Office, Al Rostamani Building, Al Ittihad Rd, E11, Dubai",
        },
  primaryCta: { label: "Contact Our Team", url: "/support" },
};
