/**
 * Single source of truth for type on the Career + FAQ pages.
 * Scale taken from the Industries (MarqueeSection) reference:
 *   family  Manrope           weights  400 (body) / 500 (everything else)
 *   ink     #1b4332 (headings)  muted #2d6a4f (body)  accent #36B936
 *
 * Colour is deliberately NOT included (except eyebrow) so these also work on
 * dark / green backgrounds: add `text-[#1b4332]`, `text-[#2d6a4f]` or `text-white` at the call site.
 */
export const INK = 'text-[#1b4332]';
export const MUTED = 'text-[#2d6a4f]';

export const typo = {
  /** small uppercase label above a heading (12 -> 14px) */
  eyebrow: 'text-xs sm:text-sm font-medium uppercase tracking-wider text-[#36B936]',

  /** page hero h1 (32 -> 56px) */
  h1: 'text-[2rem] sm:text-[2.5rem] md:text-5xl lg:text-[3.5rem] font-medium tracking-tight leading-[1.1]',
  /** h1 for long, sentence-style titles (28 -> 48px) */
  h1Long: 'text-balance text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-5xl font-medium tracking-tight leading-[1.12]',

  /** section heading (24 -> 36px) — same as the reference */
  h2: 'text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-[1.15]',
  /** in-page sub heading, e.g. an FAQ category title (20 -> 24px) */
  subheading: 'text-xl sm:text-2xl font-medium tracking-tight leading-[1.15]',

  /** hero paragraph (14 -> 16px) */
  lead: 'text-sm sm:text-[15px] lg:text-base font-normal leading-relaxed',
  /** section description (13 -> 14px) — same as the reference */
  body: 'text-[13px] sm:text-[13.5px] lg:text-[14px] font-normal leading-relaxed',

  /** card title (14 -> 16px) — same as the reference */
  cardTitle: 'text-[14px] sm:text-[15px] lg:text-[16px] font-medium tracking-tight',
  /** card text (12 -> 12.5px) — same as the reference */
  cardBody: 'text-[12px] sm:text-[12.5px] font-normal leading-relaxed',
  /** "01." style index / small meta (11px) */
  meta: 'text-[11px] font-medium tracking-wide',
} as const;
