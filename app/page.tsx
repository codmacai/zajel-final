import CompactSaaSBanner from "@/components/home/appdownload";
import BrandFilm from "@/components/home/BrandFilm";
import LatestNews from "@/components/home/blog";
import CertificationsGrid from "@/components/home/CertificationsGrid";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import CmsScope from "@/components/cms/CmsScope";
import { cmsMetadata, getSection } from "@/lib/cms/server";
import { HOME_APP_DOWNLOAD } from "@/components/home/content";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ZajelNowBanner from "@/components/home/ZajelNowBanner";

export const generateMetadata = cmsMetadata('home', '/');

export default async function Home() {
  const appDownload = await getSection("home.app-download", HOME_APP_DOWNLOAD);
  return (
    <CmsScope page={["home", "projects", "news"]}>
    <main>
      <Hero />
      <ServicesSection/>
      <BrandFilm/>
      <WhyChooseUs/>
      <HowItWorks/>
      <ZajelNowBanner/>
      
      <LatestNews/>
      {appDownload && <CompactSaaSBanner {...appDownload} mobileImageFull />}
      <CertificationsGrid/>
      <FeaturedProjects/>
    </main>
    </CmsScope>
  );
}