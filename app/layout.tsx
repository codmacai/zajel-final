import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { arabic } from "./fonts";
import I18nRuntime from "@/components/i18n/I18nRuntime";
import { I18N_BOOT_SCRIPT } from "@/lib/i18n/translator";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/Footer"; // Adjust the import path based on where your Footer component is located
import { SITE } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "courier UAE",
    "same day delivery Dubai",
    "international shipping UAE",
    "air freight UAE",
    "sea freight UAE",
    "land freight GCC",
    "customs clearance UAE",
    "warehousing Dubai",
    "e-commerce fulfilment UAE",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: "/",
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#36B936",
};

// Tells search engines who Zajel is: name, logo, contact details and locations.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}${SITE.logo}`,
  description: SITE.description,
  foundingDate: SITE.foundingYear,
  email: SITE.email,
  telephone: SITE.phone,
  areaServed: ["AE", "Worldwide"],
  address: SITE.addresses.map((a) => ({
    "@type": "PostalAddress",
    addressLocality: a.locality,
    addressCountry: a.country,
  })),
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      email: SITE.email,
      contactType: "customer service",
      areaServed: "AE",
      availableLanguage: ["English", "Arabic"],
    },
  ],
  ...(SITE.socialProfiles.length ? { sameAs: SITE.socialProfiles } : {}),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  publisher: { "@id": `${SITE.url}/#organization` },
  inLanguage: "en",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${arabic.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Arabic visitors: right-to-left before first paint (see lib/i18n/translator.ts) */}
        <script dangerouslySetInnerHTML={{ __html: I18N_BOOT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">
        <I18nRuntime />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationJsonLd, websiteJsonLd]).replace(/</g, "\\u003c") }}
        />
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
