export interface SupplyChainWarehousingContent {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  highlightLine: string;
  image: {
    src: string;
    alt: string;
  };
}

export const SUPPLY_CHAIN_WAREHOUSING_CONTENT: SupplyChainWarehousingContent = {
  eyebrow: "Supply Chain Integration",
  heading: "Storage Connected to Your Entire Supply Chain",
  paragraphs: [
    "Warehousing works when it connects to what comes before and after it. Cargo arrives from a port, an airport, or a supplier. It needs to be received, stored under the right conditions, and dispatched on time, whether to a customer across Dubai or a distributor in another country. A gap at any stage creates a delay that compounds through the rest of the chain.",
    "Zajel's warehouse facilities in Dubai sit within our own logistics network. Goods arriving by sea through Jebel Ali Port, by air through Dubai International Airport, or by road from across the GCC move directly into our storage without changing hands. When it is time to dispatch, they move out through the same network: into our freight services for international shipments, or into our last-mile delivery operation for orders across the UAE.",
  ],
  highlightLine:
    "One provider from arrival to storage to delivery means fewer handoffs, fewer delays, and full visibility at every stage.",
  image: {
    src:"/warehouse/warehouse-port-airport-aerial.webp",
    alt: "State-of-the-art warehousing and logistics facility in Dubai",
  },
};
