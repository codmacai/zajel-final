"use client";

import type { FC } from "react";
import { Manrope } from "next/font/google";
import { motion, type Variants } from "framer-motion";

// Next.js font optimisation: self-hosted, no layout shift
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// ---------------------------------------------------------------------------
// Content
// Put your PDFs in /public/documents/ and the paths below resolve as-is.
// ---------------------------------------------------------------------------
const content = {
  eyebrow: "Our Documents",
  heading: "Company Documents",
  description:
    "Download our company profile and IMS policy to learn more about our services, standards, and capabilities.",
  documents: [
    {
      title: "Company Profile",
      description: "An overview of our services, network, and capabilities.",
      fileUrl: "/documents/company-profile.pdf",
      theme: "light" as const,
    },
    {
      title: "IMS Policy",
      description:
        "Our Integrated Management System policy, covering quality, environmental, and health & safety standards.",
      fileUrl: "/documents/ims-policy.pdf",
      theme: "dark" as const,
    },
  ],
};

// ---------------------------------------------------------------------------
// Card shape
// Drawn in a fixed 618 x 532 box so the corner radii and the slanted folder
// tab keep their proportions at every size (the card holds this aspect ratio).
// ---------------------------------------------------------------------------
// Until a PDF is uploaded, its card asks for a copy by email instead of
// linking to a missing file. The about page passes which files exist.
const requestHref = (title: string) =>
  `mailto:info@zajel.ae?subject=${encodeURIComponent(`Request: Zajel ${title}`)}`;

const CARD_PATH =
  "M40 37 H250 Q267 37 284.7 27.6 L319.3 9.4 Q337 0 355 0 H582 A36 36 0 0 1 618 36 V492 A40 40 0 0 1 578 532 H40 A40 40 0 0 1 0 492 V77 A40 40 0 0 1 40 37 Z";

const themes = {
  light: {
    bg: "#FFFFFF",
    title: "text-[#36B936]",
    desc: "text-[#2A8F2A]",
    foot: "text-[#36B936]/80",
    arrow: "text-[#36B936]",
    shadow: "drop-shadow-[0_12px_28px_rgba(30,90,30,0.22)]",
  },
  dark: {
    bg: "#064423",
    title: "text-white",
    desc: "text-white/80",
    foot: "text-white/60",
    arrow: "text-white",
    shadow: "drop-shadow-[0_14px_28px_rgba(6,68,35,0.35)]",
  },
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
const ArrowUpRightIcon: FC = () => (
  <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4.5 19.5 19.5 4.5M8 4.5h11.5V16"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
/** `available`: file names in /public/documents that exist (checked on the server). */
const CompanyDocuments: FC<{ available?: string[] }> = ({ available = [] }) => {
  return (
    <section
      className={`${manrope.className} w-full overflow-hidden bg-white px-4 py-16 sm:px-8 sm:py-28 md:py-32 lg:px-20 lg:py-40`}
      aria-labelledby="company-documents-heading"
    >
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="flex flex-col items-center"
        >
          {/* Header */}
          <div className="mx-auto mb-10 flex max-w-[800px] flex-col items-center text-center sm:mb-12 lg:mb-16">
            <motion.span
              variants={fadeUp}
              className="mb-3 block text-xs sm:text-sm font-medium uppercase tracking-wider text-[#36B936] sm:mb-4"
            >
              {content.eyebrow}
            </motion.span>

            <motion.h2
              id="company-documents-heading"
              variants={fadeUp}
              className="mb-4 text-balance text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.15] tracking-tight text-[#064423]"
            >
              {content.heading}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="max-w-[62ch] text-[13px] sm:text-[13.5px] lg:text-[14px] font-light leading-relaxed text-[#064423]/70"
            >
              {content.description}
            </motion.p>
          </div>

          {/* Cards: narrow, near-square folder shape */}
          <div className="mx-auto grid w-full max-w-[820px] grid-cols-1 justify-items-center gap-4 sm:gap-8 md:grid-cols-2">
            {content.documents.map((doc) => {
              const ready = available.includes(doc.fileUrl.split("/").pop() ?? "");
              const t = themes[doc.theme];
              return (
                <motion.article
                  key={doc.title}
                  variants={fadeUp}
                  className={`group w-full max-w-[380px] ${t.shadow} transition-transform duration-500 hover:-translate-y-1`}
                >
                  <a
                    href={ready ? doc.fileUrl : requestHref(doc.title)}
                    {...(ready ? { target: "_blank", rel: "noopener noreferrer", download: true } : {})}
                    aria-label={ready ? `Download ${doc.title} PDF` : `Request the ${doc.title} by email`}
                    className="relative block aspect-[618/532] w-full rounded-[2rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#36B936]"
                  >
                    {/* Folder shape */}
                    <svg
                      className="absolute inset-0 h-full w-full"
                      viewBox="0 0 618 532"
                      fill={t.bg}
                      aria-hidden="true"
                    >
                      <path d={CARD_PATH} />
                    </svg>

                    {/* Arrow */}
                    <span
                      className={`absolute right-[10%] top-[14%] aspect-square w-[7.5%] ${t.arrow} transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5`}
                    >
                      <ArrowUpRightIcon />
                    </span>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col px-[12%] pb-[7%] pt-[19%]">
                      <h3
                        className={`mb-2.5 max-w-[14ch] text-[1.25rem] font-semibold leading-[1.25] tracking-tight sm:mb-3 sm:text-[1.375rem] ${t.title}`}
                      >
                        {doc.title}
                      </h3>

                      <p className={`max-w-[34ch] text-[13px] font-normal leading-relaxed ${t.desc}`}>
                        {doc.description}
                      </p>

                      <span className={`mt-auto pt-3 text-[11px] font-medium sm:text-xs ${t.foot}`}>
                        {ready ? "PDF · Ready to download" : "PDF · Request a copy"}
                      </span>
                    </div>
                  </a>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyDocuments;