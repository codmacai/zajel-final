// Built-in content of the legal page. Editable in the CMS: Legal → Page content.

export const LEGAL_PAGE = {
  eyebrow: 'Legal',
  heading: 'Policies & terms',
  introBefore: 'The full documents are being updated. For a copy of any of them, email',
  email: 'info@zajel.ae',
  introAfter: "and we'll send it the same day.",
  sections: [
    {
      id: 'privacy',
      title: 'Privacy Policy',
      text: 'We collect only the details needed to pick up, move and deliver your shipments, and to keep you updated about them. We never sell your personal data.',
    },
    {
      id: 'pdpl',
      title: 'PDPL',
      text: 'Zajel handles personal data in line with the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021), including your rights to access and correct your data.',
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      text: 'Every shipment is carried under our standard terms of carriage, which cover liability, prohibited items, claims and delivery times.',
    },
    {
      id: 'accessibility',
      title: 'Accessibility',
      text: 'We want everyone to be able to use our website. If something is hard to use, tell us and we will help, and fix it.',
    },
  ],
  requestLabel: 'Request a copy',
  footerText: 'Questions about a claim or your data?',
  footerLinkLabel: 'Contact us',
  footerLinkHref: '/support',
};
