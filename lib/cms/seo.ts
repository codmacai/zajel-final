// Built-in Google title and description of each page. Editable in the CMS (each page's
// "Google title & description" section); pages read them through cmsMetadata().

export interface PageSeoContent {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoContent> = {
  home: {
    title: 'Courier, Freight & Logistics in the UAE',
    description:
      'Same-day courier, international shipping, air, sea and land freight, customs clearance and warehousing across the UAE and to 195 countries. Book, track and ship with Zajel.',
  },
};
