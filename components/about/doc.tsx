"use client";

import type { FC } from "react";
import { Manrope } from "next/font/google";
import { motion, type Variants } from "framer-motion";

// Next.js font optimisation: self-hosted, no layout shift
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// ---------------------------------------------------------------------------
// Content
// Put your PDFs in /public/documents/ and the paths below resolve as-is.
// ---------------------------------------------------------------------------
const content = {
  eyebrow: "Company Documents",
  documents: [
    {
      title: "Company Profile",
      description: "An overview of our services, network, and capabilities.",
      fileUrl: "/documents/company-profile.pdf",
    },
    {
      title: "IMS Policy",
      description:
        "Our Integrated Management System policy, covering quality, environmental, and health & safety standards.",
      fileUrl: "/documents/ims-policy.pdf",
    },
  ],
};

// ---------------------------------------------------------------------------
// Motion
// ---------------------------------------------------------------------------
const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------
const DocumentIcon: FC = () => (
  <svg className="h-[18px] w-[18px] sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 2.5h7l4 4V21a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z"
      stroke="#36B936"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="M14 2.5V7h4" stroke="#36B936" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M9 12.5h6M9 16h4" stroke="#36B936" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const DownloadIcon: FC = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const CompanyDocuments: FC = () => {
  return (
    <section
      className={`${manrope.className} w-full overflow-hidden bg-[#FAFBF8] px-5 py-14 sm:px-8 sm:py-20 md:py-24 lg:px-20`}
      aria-labelledby="company-documents-heading"
    >
      <h2 id="company-documents-heading" className="sr-only">
        {content.eyebrow}
      </h2>

      <div className="mx-auto max-w-[1280px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="flex flex-col"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2.5 sm:mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-[#36B936] sm:h-2 sm:w-2" />
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#064423]/70 sm:text-xs">
              {content.eyebrow}
            </span>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8">
            {content.documents.map((doc) => (
              <motion.div
                key={doc.title}
                variants={fadeUp}
                className="group relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-3xl border border-[#064423]/10 p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl sm:min-h-[280px] sm:rounded-[2rem] sm:p-8 lg:min-h-[300px] lg:p-10"
                style={{
                  background: "linear-gradient(135deg, #064423 0%, #042B18 50%, #02180D 100%)",
                }}
              >
                {/* Dot texture */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-15 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 1px, transparent 1px)",
                    backgroundSize: "8px 8px",
                  }}
                />

                {/* Glow accent */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#36B936]/15 blur-3xl transition-all duration-700 group-hover:bg-[#36B936]/25 sm:h-72 sm:w-72" />

                {/* Top: icon, title, description */}
                <div className="relative z-10">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 backdrop-blur-md sm:mb-7 sm:h-11 sm:w-11 sm:rounded-2xl">
                    <DocumentIcon />
                  </div>

                  <h3 className="mb-2 text-lg font-medium leading-snug tracking-tight text-white sm:text-xl lg:text-2xl">
                    {doc.title}
                  </h3>

                  <p className="max-w-[360px] text-[13px] font-normal leading-relaxed text-white/65 sm:text-sm">
                    {doc.description}
                  </p>
                </div>

                {/* Bottom: download */}
                <div className="relative z-10 pt-6 sm:pt-8">
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    aria-label={`Download ${doc.title} PDF`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-xs font-semibold tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:bg-[#36B936] hover:text-[#042B18] active:scale-95 sm:text-[13px]"
                  >
                    Download PDF
                    <DownloadIcon />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyDocuments;