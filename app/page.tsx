import CompactSaaSBanner from "@/components/home/appdownload";
import LatestNews from "@/components/home/blog";
import CertificationsGrid from "@/components/home/CertificationsGrid";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ZajelNowBanner from "@/components/home/ZajelNowBanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesSection/>
      <WhyChooseUs/>
      <HowItWorks/>
      <ZajelNowBanner/>
      
      <LatestNews/>
      <CompactSaaSBanner/>
      <CertificationsGrid/>
      <FeaturedProjects/>
    </main>
  );
}