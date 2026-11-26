import Link from "next/link";

// Site-wide fraud warning, shown above the navbar on every page. Not dismissible.
// Navbar.tsx measures it into --site-alert-h so page content starts below it.
// Arabic copy lives in locales/ar.json; the full guide is app/scam-alert.
export default function ScamAlertBanner() {
  return (
    <div role="alert" data-site-alert className="bg-[#9F1D14] text-white">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="hidden h-9 w-9 shrink-0 sm:block">
          <path fill="#FFC107" d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <path stroke="#3B1A00" strokeWidth="2.2" strokeLinecap="round" d="M12 9v4.5M12 17.2h.01" />
        </svg>

        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-extrabold uppercase leading-tight tracking-wide sm:text-[15px]">
            <span>Scam warning: do not pay through SMS links</span>
          </p>
          <p className="mt-1 text-[12.5px] leading-snug text-white/90 sm:text-[13.5px]">
            <span>Zajel will never ask for payment, OTP, card details or Emirates ID by SMS.</span>{" "}
            {/* The example domain is desktop-only to keep the banner short on phones */}
            <span className="hidden sm:inline">
              <span>Fake links look like</span>{" "}
              <span data-no-translate className="rounded bg-black/30 px-1.5 py-px font-mono text-[12px] font-semibold">
                zajel.zznwd.cfd
              </span>
              .{" "}
            </span>
            <span>Our only website is</span>{" "}
            <strong data-no-translate className="font-bold text-white">zajel.com</strong>.{" "}
            <Link href="/scam-alert" className="font-bold underline underline-offset-2 sm:hidden">
              How to spot a fake
            </Link>
          </p>
        </div>

        <Link
          href="/scam-alert"
          className="hidden shrink-0 rounded-full bg-white px-3.5 py-2 text-[12.5px] font-bold text-[#9F1D14] shadow-sm transition-colors hover:bg-[#FFF4D6] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#9F1D14] sm:inline-flex sm:px-4 sm:text-[13.5px]"
        >
          How to spot a fake
        </Link>
      </div>
    </div>
  );
}
