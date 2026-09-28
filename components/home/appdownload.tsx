import React from "react";

/**
 * CompactSaaSBanner
 * -------------------
 * ZAJEL app download banner. Brand lime (#36B936) gradient card, white headline
 * and description, dark store buttons; uses separate image props for
 * mobile and desktop.
 */

const BANNER_BG = `
  radial-gradient(70% 90% at 82% 55%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 60%),
  radial-gradient(60% 80% at 0% 0%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 65%),
  radial-gradient(80% 60% at 100% 100%, rgba(10,77,38,0.35) 0%, rgba(10,77,38,0) 60%),
  linear-gradient(135deg, #3CC23C 0%, #36B936 50%, #2FA82F 100%)
`;
const PATTERN = "#FFFFFF";

interface CompactSaaSBannerProps {
  headlineLine1?: string;
  headlineLine2?: string;
  description?: string;
  phoneImageSrc?: string;        // Used for mobile view
  desktopImageSrc?: string;      // Used for desktop view (overflows top, anchored to bottom)
  appStoreUrl?: string;
  playStoreUrl?: string;
  onAppStoreClick?: () => void;
  onPlayStoreClick?: () => void;
}

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden="true">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path d="M3.6 1.6v20.8L14 12z" fill="#00D0FF" />
    <path d="M3.6 1.6L17.4 9.4 14 12z" fill="#00F076" />
    <path d="M3.6 22.4L17.4 14.6 14 12z" fill="#FF3A44" />
    <path d="M17.4 9.4l3.9 2.2c.7.4.7 1.4 0 1.8l-3.9 2.2L14 12z" fill="#FFD500" />
  </svg>
);

const StoreButton: React.FC<{
  href: string;
  onClick?: () => void;
  label: string;
  icon: React.ReactNode;
}> = ({ href, onClick, label, icon }) => (
  <a
    href={href}
    onClick={onClick}
    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#0B140F] px-3.5 py-2 text-white shadow-md transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
  >
    {icon}
    <span className="flex flex-col text-left leading-tight">
      <span className="text-[9px] font-medium text-white/75">Download on the</span>
      <span className="text-xs font-medium sm:text-sm">{label}</span>
    </span>
  </a>
);

const CompactSaaSBanner: React.FC<CompactSaaSBannerProps> = ({
  headlineLine1 = "Download the",
  headlineLine2 = "ZAJEL App",
  description = "Track shipments, get instant updates, and manage your deliveries anytime, anywhere.",
  phoneImageSrc = "/phone-mockup.png",
  desktopImageSrc = "/phone-mockup-desktop.png",
  appStoreUrl = "#",
  playStoreUrl = "#",
  onAppStoreClick,
  onPlayStoreClick,
}) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4 sm:p-6 md:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap');
        .compact-banner { font-family: 'Manrope', ui-sans-serif, system-ui, -apple-system, sans-serif; font-weight: 500; }
      `}</style>

      {/* Main Banner Card: overflow-visible on desktop allows top overflow */}
      <div
        className="compact-banner relative my-16 w-full max-w-[1140px] overflow-hidden rounded-[28px] shadow-[0_20px_60px_-15px_rgba(54,185,54,0.55)] sm:overflow-visible"
        style={{ background: BANNER_BG }}
      >
        {/* Desktop pattern: outlined diamonds behind the phone */}
        <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block" aria-hidden="true">
          <div className="absolute right-[6%] top-1/2 h-[460px] w-[460px] -translate-y-1/2 rotate-45 border" style={{ borderColor: `${PATTERN}8C` }} />
          <div className="absolute right-[-6%] top-[62%] h-[420px] w-[420px] -translate-y-1/2 rotate-45 border" style={{ borderColor: `${PATTERN}59` }} />
        </div>

        <div className="relative z-10 flex flex-col sm:min-h-[400px] sm:flex-row sm:items-center">
          {/* Left column: copy and CTA */}
          <div className="relative z-20 w-full px-6 pb-6 pt-12 text-center sm:w-[58%] sm:py-14 sm:pl-16 sm:pr-4 sm:text-left md:pl-20">
            <h1
              className="mx-auto max-w-[560px] font-semibold leading-[1.15] tracking-tight text-white [text-shadow:0_2px_12px_rgba(10,77,38,0.35)] sm:mx-0"
              style={{ fontSize: "clamp(1.5rem, 1.1rem + 1.4vw, 2.25rem)" }}
            >
              {headlineLine1}
              <br />
              {headlineLine2}
            </h1>

            <p
              className="mx-auto mt-4 max-w-[380px] font-medium leading-relaxed text-white [text-shadow:0_1px_8px_rgba(10,77,38,0.3)] sm:mx-0"
              style={{ fontSize: "clamp(0.75rem, 0.7rem + 0.2vw, 0.85rem)" }}
            >
              {description}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <StoreButton
                href={appStoreUrl}
                onClick={onAppStoreClick}
                label="App Store"
                icon={<AppleIcon />}
              />
              <StoreButton
                href={playStoreUrl}
                onClick={onPlayStoreClick}
                label="Google Play"
                icon={<PlayIcon />}
              />
            </div>
          </div>

          {/* Right column: shifted further left using sm:right-16 (adjust number if needed) */}
          <div className="relative flex w-full justify-center overflow-hidden sm:absolute sm:inset-y-0 sm:right-16 sm:w-[40%] sm:overflow-visible">
            {/* Mobile pattern */}
            <div className="pointer-events-none absolute inset-0 sm:hidden" aria-hidden="true">
              <div className="absolute left-1/2 top-[52%] aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rotate-45 border" style={{ borderColor: `${PATTERN}8C` }} />
              <div className="absolute left-1/2 top-[68%] aspect-square w-[110%] -translate-x-1/2 -translate-y-1/2 rotate-45 border" style={{ borderColor: `${PATTERN}59` }} />
            </div>

            {/* Mobile Image */}
            {phoneImageSrc && (
              <img
                src={phoneImageSrc}
                alt="ZAJEL app preview mobile"
                className="pointer-events-none relative mb-[-45%] h-auto w-[58%] max-w-[260px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)] sm:hidden"
              />
            )}

            {/* Desktop Image */}
            {desktopImageSrc && (
              <img
                src={desktopImageSrc}
                alt="ZAJEL app preview desktop"
                className="pointer-events-none hidden sm:block sm:absolute sm:bottom-0 sm:right-0 sm:h-[115%] sm:w-auto sm:object-contain sm:drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)]"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactSaaSBanner;