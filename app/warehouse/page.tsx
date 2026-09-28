import type { Metadata } from "next";
import ServiceHero from "@/components/sections/ServiceHero/ServiceHero";
import SupplyChainWarehousingSection from "@/components/warehouse/supply-chain-warehousing-section";
import InventoryManagement from "@/components/warehouse/inventory-management";
import StrategicLocations from "@/components/warehouse/strategic-locations";
import WarehousingSolutions from "@/components/warehouse/warehousing-solutions";
import IndustriesWeServe from "@/components/warehouse/industry";
import { Warehouse_FAQS } from "@/data/warehouse-faq";
import WarehouseFaqSection from "@/components/warehouse/faq";
import ContactBand from "@/components/dynamic-contact";

export const metadata: Metadata = {
  title: "Warehousing Services in Dubai | Zajel",
  description:
    "Secure Dubai warehousing and distribution services with real-time inventory management, connected directly to Zajel's air, sea, and land freight network.",
};

export default function WarehousePage() {
  return (
    <main>
      <ServiceHero variant="warehouse" />
      <SupplyChainWarehousingSection/>
      <WarehousingSolutions/>
      <InventoryManagement/>
      <StrategicLocations/>
      <IndustriesWeServe/>
      <WarehouseFaqSection/>
      <ContactBand
  badgeText="Get a Warehousing Services Quote"
  title="Get a Warehousing Services Quote"
  descriptionLead="Whether you need short-term holding for goods in transit, full-service e-commerce fulfillment, or temperature-controlled storage for regulated products, Zajel's warehousing team can design a solution around your supply chain."
  descriptionDetail="Contact us to discuss your storage requirements, tour our facilities, or request a warehousing quote."
  contactInfo={{
    email: "sales@zajel.com",
    phone: "600 53 11 11",
    address: "Dubai Office, Al Rostamani Building, Al Ittihad Rd, E11, Dubai",
  }}
  primaryCta={{ 
    label: "Get a Warehousing Quote", 
    url: "/contact" 
  }}
/>

      {/* Rest of the Warehousing page content goes below. */}
    </main>
  );
}