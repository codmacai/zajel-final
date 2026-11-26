export interface Job {
  id: string;
  title: string;
  /** Short plain-text summary for the card. */
  description: string;
  location: string;
  /** Employment type ("Full-Time", ...). May be empty — the feed often leaves it blank. */
  type: string;
  /** Where "Join our Team" goes for this role (the job's page on the careers portal). */
  href: string;
}

export const CAREERS_JOBS = {
  headingLine1: 'Opportunities That',
  headingLine2: 'Move You Forward',
  description: "Explore our current openings and become part of one of the UAE's most trusted courier brands.",
  buttonLabel: 'Join our Team',
  emptyText: 'There are no open positions at the moment. Please check back later or visit our careers portal.',
  portalLabel: 'Visit Careers Portal',
};
