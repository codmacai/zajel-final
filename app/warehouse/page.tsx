import type { Metadata } from "next";
import ServiceHero from "@/components/sections/ServiceHero/ServiceHero";
import SupplyChainWarehousingSection from "@/components/warehouse/supply-chain-warehousing-section";
import InventoryManagement from "@/components/warehouse/inventory-management";
import StrategicLocations from "@/components/warehouse/strategic-locations";
import WarehousingSolutions from "@/components/warehouse/warehousing-solutions";
import IndustriesWeServe from "@/components/warehouse/industry";
import { Warehouse_FAQS } from "@/data/warehouse-faq";
import WarehouseFaqSection from "@/components/warehouse/faq";

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

      {/* Rest of the Warehousing page content goes below. */}
    </main>
  );
}