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
