import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata, SITE } from '@/lib/seo';

// Linked from the scam banner above the navbar (components/layout/ScamAlertBanner.tsx).
// The sample message is a real one customers reported; keep it in English (data-no-translate).

export const metadata: Metadata = pageMetadata({
  title: 'Scam Alert: Fake Zajel SMS Messages',
  description:
    'Fraudsters are sending fake Zajel delivery texts with links to non-zajel.com websites. Learn the red flags, what Zajel will never ask for, and what to do if you paid.',
  path: '/scam-alert',
});

const PHONE_DISPLAY = '600 53 11 11';

const RED_FLAGS = [
  'The link is not on zajel.com (for example .cfd, .top or a random-looking address)',
  'It rushes you: "expires in 5 minutes" or "collect now"',
  'Odd steps: "reply Y, close the SMS and reopen it to activate the link"',
  'It asks for an OTP, card details, Emirates ID or a payment',
  'It comes from an unknown or international number, or has spelling and formatting mistakes',
];

const ZAJEL_NEVER = [
  'Send you links on any website other than zajel.com',
  'Ask for your OTP, card details, password or Emirates ID by SMS',
  'Ask you to pay a fee through a text message link to release or redeliver a parcel',
  'Tell you to reply with a code to "activate" a link',
  'Pressure you with countdowns to collect a parcel',
];

const IF_PAID = [
  {
    title: 'Call your bank now',
    text: 'Ask them to block your card and dispute the payment. The sooner you call, the better the chance of stopping it.',
  },
  {
    title: 'Change your passwords',
    text: 'If you typed a password, OTP or any login details on the fake site, change them straight away.',
  },
  {
    title: 'Report it to the police',
    text: 'Use the Dubai Police eCrime platform (https://www.dubaipolice.gov.ae/app/services/ecrime) or the Abu Dhabi Police Aman service on 800 2626.',
  },
  {
    title: 'Tell us',
    text: `Call Zajel customer care on ${PHONE_DISPLAY} so we can warn other customers.`,
  },
];

// The fake SMS, split into plain text and numbered red-flag highlights.
type Segment = string | { flag: number; text: string };
const FAKE_SMS: Segment[] = [
  'Zajel – Your Parcel Location Update\n\nYour package ZJ758341205 is scheduled to arrive today between 14:00 and 18:00, though some Emirate details may be missing from the provided address.\n\nUpdate your Emirate here:\n',
  { flag: 2, text: 'https://zajel.zznwd.cfd/ae.en' },
  '\n\n',
  { flag: 3, text: '(Simply reply with "Y", then close the SMS and reopen it to activate the link.)' },
  '\n\n• If you do not update your delivery address, your parcel will be held at the designated EMX Parcel Locker.\n\n• ',
  { flag: 4, text: 'Your collection code is 485426 and will expire in 5 minutes.' },
  '\n\nZajel Delivery Team',
];

const FLAG_NOTES = [
  { n: 1, title: 'Unknown international number', text: 'Zajel texts do not come from random foreign numbers like +855.' },
  { n: 2, title: 'Fake website', text: 'The address is zajel.zznwd.cfd, not zajel.com. The word "zajel" at the start is a trick.' },
  { n: 3, title: 'Strange instructions', text: 'Replying "Y" and reopening the SMS is a trick to get past your phone\'s link protection.' },
  { n: 4, title: 'False urgency', text: 'A 5-minute countdown is there to stop you from thinking or checking.' },
];

function FlagBadge({ n }: { n: number }) {
  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D92D20] text-[11px] font-bold leading-none text-white">
      {n}
    </span>
  );
}

function CrossIcon({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`h-5 w-5 shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9l-6 6M9 9l6 6" />
    </svg>
  );
}

export default function ScamAlertPage() {
  return (
    <main className="w-full bg-[#FAFAF8] pb-16 sm:pb-20">
      {/* Hero */}
      {/* A card rather than a full-bleed band: the navbar's dark text sits on the light page above it */}
      <section className="px-4 pt-24 sm:px-6 sm:pt-28 md:pt-32">
        <div className="mx-auto flex w-full max-w-[1000px] items-start justify-between gap-8 rounded-3xl bg-[#064423] px-6 py-10 text-white sm:px-10 sm:py-12">
          <div className="max-w-[640px]">
            <span className="inline-block rounded-full bg-[#D92D20] px-3 py-1 text-[11px] font-bold uppercase tracking-wider sm:text-xs">
              Security alert
            </span>
            <h1 className="mt-4 text-[32px] font-bold leading-[1.1] tracking-tight sm:text-[44px] md:text-[52px]">
              Beware of scams sent in the name of Zajel
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed text-white/80 sm:text-[17px]">
              Fraudsters are texting people pretending to be Zajel. They say your parcel can&apos;t be delivered and send
              you to a fake website to pay or enter your card details. People have lost money this way.
            </p>
            <p className="mt-4 rounded-xl border border-[#FFC107]/40 bg-[#FFC107]/10 px-4 py-3 text-[15px] font-semibold text-[#FFE08A] sm:text-[16px]">
              If you get one of these messages: don&apos;t click the link, don&apos;t reply and don&apos;t pay.
            </p>
          </div>
          <svg aria-hidden viewBox="0 0 24 24" className="hidden h-36 w-36 shrink-0 md:block">
            <path fill="#FFC107" d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <path stroke="#064423" strokeWidth="2.2" strokeLinecap="round" d="M12 9v4.5M12 17.2h.01" />
          </svg>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1000px] px-4 sm:px-6">
        {/* Example message */}
        <section className="mt-12 sm:mt-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#D92D20] sm:text-sm">Real example</p>
          <h2 className="mt-2 text-[24px] font-semibold text-[#064423] sm:text-[30px]">What the fake message looks like</h2>
          <p className="mt-3 max-w-[640px] text-[14px] leading-relaxed text-[#064423]/70 sm:text-[15px]">
            This is a real scam text our customers received. The numbers show what gives it away.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,380px)_1fr] md:items-start">
            {/* Phone mock-up */}
            <div className="rounded-[28px] bg-[#111] p-3 shadow-xl">
              <div data-no-translate className="rounded-[20px] bg-black px-4 pb-6 pt-4 text-white">
                <div className="flex flex-col items-center gap-1 border-b border-white/10 pb-3">
                  <div className="h-10 w-10 rounded-full bg-white/20" />
                  <div className="flex items-center gap-2 text-[14px] font-semibold">
                    <span>+855 61 262 362</span>
                    <FlagBadge n={1} />
                  </div>
                  <span className="text-[11px] text-white/50">iMessage · Today 12:22 PM</span>
                </div>
                <div className="mt-4 max-w-[92%] whitespace-pre-line rounded-2xl rounded-bl-md bg-[#2C2C2E] px-3.5 py-3 text-[13.5px] leading-[1.45]">
                  {FAKE_SMS.map((seg, i) =>
                    typeof seg === 'string' ? (
                      <span key={i}>{seg}</span>
                    ) : (
                      <span key={i} className="inline">
                        <mark className="rounded bg-[#D92D20]/30 px-0.5 text-white ring-1 ring-[#D92D20]">{seg.text}</mark>{' '}
                        <FlagBadge n={seg.flag} />
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* What gives it away */}
            <ol className="space-y-4">
              {FLAG_NOTES.map((f) => (
                <li key={f.n} className="flex gap-3 rounded-2xl border border-[#E5EBE7] bg-white p-4 sm:p-5">
                  <FlagBadge n={f.n} />
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#064423] sm:text-[16px]">{f.title}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-[#064423]/70">{f.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Red flags + Zajel will never */}
        <section className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-[#E5EBE7] bg-white">
            <h2 className="bg-[#064423] px-5 py-4 text-[14px] font-bold uppercase tracking-wider text-[#7EDB7E]">
              Red flags to watch for
            </h2>
            <ul className="space-y-3.5 px-5 py-5">
              {RED_FLAGS.map((t) => (
                <li key={t} className="flex gap-3 text-[14.5px] leading-snug text-[#1F2937]">
                  <CrossIcon className="text-[#D92D20]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl bg-[#2EA22E] text-white">
            <h2 className="px-5 pt-5 text-[14px] font-bold uppercase tracking-wider text-[#D9F7D9]">Zajel will never</h2>
            <ul className="space-y-3.5 px-5 py-5">
              {ZAJEL_NEVER.map((t) => (
                <li key={t} className="flex gap-3 text-[14.5px] leading-snug">
                  <CrossIcon />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Already paid */}
        <section className="mt-14">
          <h2 className="text-[24px] font-semibold text-[#064423] sm:text-[30px]">Already clicked the link or paid?</h2>
          <p className="mt-3 max-w-[640px] text-[14px] leading-relaxed text-[#064423]/70 sm:text-[15px]">
            Act quickly. Do these in order:
          </p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {IF_PAID.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl border border-[#E5EBE7] bg-white p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#064423] text-[14px] font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#064423]">{s.title}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-[#064423]/70">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* If in doubt */}
        <section className="mt-14 flex flex-col gap-5 rounded-2xl bg-[#064423] p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-wider text-[#FFC107]">If in doubt</p>
            <p className="mt-2 text-[18px] font-semibold sm:text-[20px]">
              Don&apos;t click. Track your parcel on zajel.com or call customer care.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/track"
              className="rounded-full bg-[#36B936] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#2EA22E]"
            >
              Track a shipment
            </Link>
            <a
              href={`tel:${SITE.phone}`}
              className="rounded-full border border-white/40 px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
