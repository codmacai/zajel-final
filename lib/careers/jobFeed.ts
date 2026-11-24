// Server-side loader for the open roles on /careers. Same source the old ASP.NET site used
// (CareerController.GetJobPostingsFromFeed): the Emaratech careers XML feed, cached for 1 hour.

import { XMLParser } from 'fast-xml-parser';
import type { Job } from '@/components/career/job-openings/data';

const FEED_URL = process.env.CAREERS_FEED_URL || 'https://careers.emaratech.ae/feed/425222';
/** Where the "no openings" fallback sends people. */
export const CAREERS_PORTAL_URL = 'https://careers.emaratech.ae/zajel/';

const REVALIDATE_SECONDS = 3600;
const SUMMARY_MAX_CHARS = 160;

interface FeedJob {
  title?: string;
  created?: string;
  url?: string;
  city?: string;
  country?: string;
  location?: string;
  jobtype?: string;
  department?: string;
  description?: string;
  ID?: string;
}

const parser = new XMLParser({
  parseTagValue: false, // keep IDs / dates as strings
  trimValues: true,
  isArray: (_name, jpath) => jpath === 'source.jobs.job',
});

export async function getJobOpenings(): Promise<Job[]> {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const doc = parser.parse(await res.text());
    const feedJobs: FeedJob[] = doc?.source?.jobs?.job ?? [];

    return feedJobs
      .filter((j) => j.title && j.url)
      .map((j) => ({ job: j, posted: parseFeedDate(j.created) }))
      .sort((a, b) => b.posted - a.posted)
      .map(({ job }, i) => ({
        id: job.ID || `job-${i}`,
        title: job.title!,
        description: summarize(job.description ?? ''),
        location: formatLocation(job),
        type: job.jobtype ?? '',
        href: job.url!,
      }));
  } catch (err) {
    console.error('[careers] failed to load job feed:', err);
    return [];
  }
}

/** Feed dates look like "Wed, 14 10 2026 00:00:00 GMT" (day month year, numeric month). */
function parseFeedDate(value?: string): number {
  const m = value?.match(/(\d{1,2})\s+(\d{1,2})\s+(\d{4})/);
  return m ? Date.UTC(+m[3], +m[2] - 1, +m[1]) : 0;
}

function formatLocation(job: FeedJob): string {
  const raw = job.location || [job.city, job.country].filter(Boolean).join(', ');
  return raw.replace(/,\s*AE$/i, ', UAE');
}

/**
 * The description is a full HTML job ad. For the card, take the "Position Summary" paragraph
 * (falling back to the first text in the ad) as plain text, trimmed to a sentence-ish length.
 */
function summarize(html: string): string {
  const afterHeading = html.split(/<h\d[^>]*>\s*Position Summary\s*<\/h\d>/i)[1];
  const section = (afterHeading ?? html).split(/<h\d[^>]*>/i)[0];
  const text = decodeEntities(section.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= SUMMARY_MAX_CHARS) return text;
  const cut = text.slice(0, SUMMARY_MAX_CHARS);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '')}…`;
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};

function decodeEntities(s: string): string {
  return s.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] === '#') {
      const n = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : match;
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? match;
  });
}
