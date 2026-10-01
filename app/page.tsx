import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import CompactSaaSBanner from "@/components/home/appdownload";
import BrandFilm from "@/components/home/BrandFilm";
import LatestNews from "@/components/home/blog";
import CertificationsGrid from "@/components/home/CertificationsGrid";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ZajelNowBanner from "@/components/home/ZajelNowBanner";

export const metadata: Metadata = pageMetadata({
  title: "Courier, Freight & Logistics in the UAE",
  description:
    "Same-day courier, international shipping, air, sea and land freight, customs clearance and warehousing across the UAE and to 195 countries. Book, track and ship with Zajel.",
  path: '/',
});

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesSection/>
      <BrandFilm/>
      <WhyChooseUs/>
      <HowItWorks/>
      <ZajelNowBanner/>
      
      <LatestNews/>
      <CompactSaaSBanner
        phoneImageSrc="/domestic/app/step-2.webp"
        desktopImageSrc="/domestic/app/step-2.webp"
        mobileImageFull
      />
      <CertificationsGrid/>
      <FeaturedProjects/>
    </main>
  );
}