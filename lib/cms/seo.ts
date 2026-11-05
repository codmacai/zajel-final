// Built-in Google title and description of each page. Editable in the CMS (each page's
// "Google title & description" section); pages read them through cmsMetadata().

export interface PageSeoContent {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoContent> = {
  home: {
    title: 'Courier, Freight & Logistics in the UAE',
    description:
      'Same-day courier, international shipping, air, sea and land freight, customs clearance and warehousing across the UAE and to 195 countries. Book, track and ship with Zajel.',
  },
  "international-courier": {
    title: "International Shipping",
    description:
      "Ship internationally from the UAE to 195 countries with reliable express and standard delivery, real-time tracking, and full customs clearance support.",
  },
  "warehouse": {
    title: "Warehousing Services in Dubai",
    description:
      "Secure Dubai warehousing and distribution services with real-time inventory management, connected directly to Zajel's air, sea, and land freight network.",
  },
  "secure-mail": {
    title: "Secure Mail Service in the UAE",
    description:
      "Confidential correspondence sealed, tracked and delivered by hand to the named recipient anywhere in the UAE.",
  },
  "sea-freight": {
    title: "Sea Freight Shipping in the UAE",
    description:
      "FCL and LCL sea freight from UAE ports to destinations worldwide, with clear pricing, container guidance, bonded storage, marine insurance and customs clearance.",
  },
  "industry": {
    title: "Industry Logistics Solutions in the UAE",
    description:
      "Industry logistics solutions across the UAE shaped by your sector — from cold chain pharma to oversized oil and gas cargo, backed by 60M+ shipments and 4 ISO certifications.",
  },
  "domestic-courier": {
    title: "Domestic On-Demand Delivery",
    description:
      "Same-day and next-day doorstep delivery across the UAE. Choose your vehicle, check transit times, and book on-demand delivery with Zajel.",
  },
  "projects": {
    title: "Project Logistics",
    description:
      "Oversized and project cargo logistics across the UAE — engineered routes, cleared permits, and delivered project moves across air, sea, and land.",
  },
  "land-freight": {
    title: "Land Freight Services",
    description:
      "Full truckload and less-than-truckload road freight across the UAE, GCC, and cross-border routes to Jordan, Turkey, and Europe — with TIR customs transit, cold chain, and dedicated fleet coverage.",
  },
  "secure-solutions": {
    title: "Secure Solutions",
    description:
      "Dedicated, highly secure courier services relied upon by leading UAE government entities and institutions.",
  },
  "network": {
    title: "Our Logistics Network in the UAE",
    description:
      "Zajel's logistics network spans 195 countries and 500+ destinations — connected coverage from Dubai last-mile delivery to global multimodal freight.",
  },
  "air-freight": {
    title: "Air Freight Forwarding in the UAE",
    description:
      "Fast, secure air freight from the UAE to worldwide destinations: express and consolidated cargo, dangerous goods handling, customs clearance and door-to-door delivery.",
  },
  "events": {
    title: "Logistics Events UAE | Exhibitions, Conferences & Webinars",
    description:
      "Meet Zajel at logistics exhibitions, conferences, webinars and workshops across the UAE. See upcoming events and where our team has been.",
  },
  "careers": {
    title: "Careers",
    description:
      "Explore careers at Zajel. Join a UAE logistics team transforming how the country moves, powered by technology and trust.",
  },
  "trackresults": {
    title: "Shipment Details",
    description:
      "Live status, route and delivery details for your Zajel shipment.",
  },
  "ecommerce": {
    title: "Ecommerce Fulfillment",
    description:
      "Connect your store to Zajel for order fulfillment, nationwide delivery, COD collection, and merchant reporting.",
  },
  "secure-docs": {
    title: "Secure Document Courier in the UAE",
    description:
      "Legal and official documents moved across the UAE with strict chain-of-custody controls, tamper-evident packaging and confirmed delivery.",
  },
  "track": {
    title: "Track Your Shipment",
    description:
      "Track your Zajel shipment with your AWB or mobile number and get real-time delivery updates across the UAE and worldwide.",
  },
  "secure-id": {
    title: "Secure ID Delivery in the UAE",
    description:
      "Passports, Emirates ID cards and licences delivered across the UAE with recipient verification at the door.",
  },
  "help": {
    title: "Help",
    description:
      "Get help with your Zajel shipment.",
  },
  "customs-clearance": {
    title: "Customs Clearance UAE",
    description:
      "End to end customs clearance and brokerage services across the UAE — air, sea, and land, handled by licensed customs brokers.",
  },
  "individual-solutions": {
    title: "Individual Solutions",
    description:
      "Whatever you're sending, wherever it's going — same day across the UAE, or international to 195 countries.",
  },
  "secure-gov": {
    title: "Government & Institutional Logistics",
    description:
      "Secure, documented and compliant courier and logistics services for UAE government entities and public institutions.",
  },
  "send-shipment": {
    title: "Send a Shipment",
    description:
      "Book a domestic or international courier pickup in about two minutes. Doorstep collection across the UAE and delivery to 195 countries.",
  },
  "about": {
    title: "About Us",
    description:
      "Zajel Logistic Services — founded in Dubai in 2008, now a full logistics partner across express delivery, e-commerce, fulfillment, and freight forwarding.",
  },
  "faq": {
    title: "Shipping FAQ UAE | Freight & Logistics Questions",
    description:
      "Answers to common shipping questions in the UAE: courier, air, sea and land freight, customs clearance, warehousing and e-commerce fulfillment.",
  },
  "business-solutions": {
    title: "Business Solutions",
    description:
      "Whether you're fulfilling online orders or moving freight across borders, Zajel supports the operation — not just the shipment.",
  },
  "contact": {
    title: "Contact Us",
    description:
      "Contact Zajel by phone, email or our contact form. Customer support for courier, freight and logistics services in Dubai, Abu Dhabi and across the UAE.",
  },
  "support": {
    title: "Customer Support",
    description:
      "Track a shipment, raise a support ticket or find answers about deliveries, pickups and returns with Zajel customer support.",
  },
  "quotation": {
    title: "Courier Rate Calculator",
    description:
      "Get an instant courier quote for domestic and international shipments from the UAE. Enter weight and destination to compare delivery options.",
  },
  legal: {
    title: 'Legal',
    description: 'Zajel privacy, PDPL, terms and accessibility information.',
  },
};
