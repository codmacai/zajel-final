export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCategory {
  id: string;
  /** Short label used on the tab */
  title: string;
  /** Full heading shown above the questions */
  heading: string;
  questions: FaqItem[];
}

export const CONTACT = {
  email: 'sales@zajel.com',
  phone: '600 53 11 11',
  phoneHref: 'tel:600531111',
  office: 'Dubai Office, Al Ittihad Rd',
} as const;

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'about',
    title: 'About Zajel',
    heading: 'About Zajel Logistic Services',
    questions: [
      {
        q: 'What is Zajel Logistic Services?',
        a: 'Zajel is a UAE-based logistics company founded in 2008, originally established to deliver Emirates IDs and passports on behalf of UAE government entities. Since then, Zajel has grown into a full-service logistics provider offering courier delivery, e-commerce fulfillment, air freight, sea freight, land freight, customs clearance, and warehousing services. We have delivered over 45 million shipments across 195 countries and more than 500 destinations worldwide.',
      },
      {
        q: 'Where is Zajel based and which regions do you cover?',
        a: 'Zajel is headquartered in Dubai, UAE, with additional offices and operations in Abu Dhabi, Sharjah, and Ajman. Domestically, we cover all seven emirates. Internationally, our network spans 195 countries through our direct freight forwarding operations and strategic partnerships within the DF Alliance (by DP World), JCtrans, and IATA NAFL networks.',
      },
      {
        q: 'What certifications does Zajel hold?',
        a: 'Zajel holds four ISO certifications: ISO 9001 (Quality Management), ISO 14001 (Environmental Management), ISO 45001 (Occupational Health and Safety), and ISO 27001 (Information Security Management). These certifications are independently audited and reflect the operational standards we apply across all services.',
      },
      {
        q: 'Is Zajel licensed for customs brokerage?',
        a: "Yes. Zajel's customs clearance team includes licensed brokers authorized to manage import, export, and transit customs procedures across all UAE ports, airports, free zones, and land borders.",
      },
    ],
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    heading: 'Getting Started with Shipping in the UAE',
    questions: [
      {
        q: 'How do I open a business account with Zajel?',
        a: 'You can open a business account by contacting our sales team directly at sales@zajel.com or by calling 600 53 11 11. A dedicated account manager will guide you through the onboarding process, which includes setting up portal access, defining your shipping requirements, and configuring your preferred services.',
      },
      {
        q: 'What information do I need to request a freight quote?',
        a: 'To provide an accurate freight quote, we need the following: your cargo type and description, the weight and dimensions of the shipment, the origin and destination addresses, your preferred transport mode (air, sea, or land), your preferred delivery arrangement (door to door, port to port, or another combination), and any special requirements such as temperature control, dangerous goods handling, or specific delivery timelines.',
      },
      {
        q: 'Does Zajel offer contract rates for regular shippers?',
        a: 'Yes. Businesses with regular shipping volumes can arrange contract rates with Zajel. These are negotiated based on your shipping frequency, volume, routes, and service requirements. Contact our business solutions team to discuss contract arrangements.',
      },
      {
        q: 'Can I use Zajel for a single shipment or do I need an account?',
        a: 'You can use Zajel for a single shipment without setting up a formal business account. Simply request a quote through our website, by email at sales@zajel.com, or by phone. If you plan to ship regularly, a business account provides benefits including portal access, a dedicated account manager, and potentially better rates.',
      },
    ],
  },
  {
    id: 'air-freight',
    title: 'Air Freight',
    heading: 'Air Freight',
    questions: [
      {
        q: 'How fast is air freight from the UAE?',
        a: 'Transit time depends on the destination and service type. Standard air freight typically delivers within two to four days for most international destinations. Charter air freight provides a dedicated aircraft for large or time-critical loads. AOG (Aircraft on Ground) service delivers critical aircraft parts with immediate priority, often within hours.',
      },
      {
        q: 'What is AOG shipping?',
        a: "AOG stands for Aircraft on Ground. It is an emergency logistics service designed to deliver critical replacement parts to a grounded aircraft as quickly as possible. Zajel's AOG service prioritizes these shipments for immediate pickup and the most direct routing available to minimize aircraft downtime.",
      },
      {
        q: 'Can Zajel move oversized or specialized cargo by air?',
        a: 'Yes. Our project logistics team handles air freight for cargo that exceeds standard dimensions or requires specialized handling. This includes heavy equipment, industrial machinery, and other non-standard shipments. Charter air freight is available when cargo requires a dedicated aircraft.',
      },
      {
        q: 'Does Zajel offer delivery arrangements other than door to door for air freight?',
        a: 'Yes. While door to door is our most common arrangement and covers the full journey from pickup to final delivery, we also offer door to airport, airport to door, and airport to airport arrangements for businesses that manage part of the logistics themselves.',
      },
      {
        q: 'Does Zajel handle customs clearance for air freight?',
        a: 'Yes. Customs clearance is managed as part of every air freight service. Our licensed customs brokers prepare documentation, file declarations, coordinate inspections where required, and secure cargo release so your shipment moves through customs without unnecessary delays.',
      },
      {
        q: 'How do I get an air freight quote?',
        a: 'You can request an air freight quote through the quote form on our Air Freight page, by emailing sales@zajel.com, or by calling 600 53 11 11. Provide your cargo type, weight, dimensions, origin, destination, and preferred delivery arrangement, and our team will respond with a tailored quote, typically within 30 minutes during business hours.',
      },
    ],
  },
  {
    id: 'sea-freight',
    title: 'Sea Freight',
    heading: 'Sea Freight',
    questions: [
      {
        q: 'What is the difference between FCL and LCL?',
        a: 'FCL (Full Container Load) reserves an entire container for your cargo alone. It is suited to large or high-volume shipments where you have enough goods to fill a 20ft or 40ft container. LCL (Less than Container Load) shares container space with other shipments, which reduces cost when you do not have enough cargo to fill an entire container.',
      },
      {
        q: 'Does Zajel handle RoRo, breakbulk, or bulk cargo?',
        a: 'Yes. In addition to containerized shipping (FCL and LCL), Zajel provides RoRo (Roll on Roll off) services for vehicles and wheeled equipment, breakbulk services for cargo too large or irregular for standard containers, and bulk shipping for unpackaged cargo shipped in volume.',
      },
      {
        q: 'Does Zajel ship dangerous goods or temperature sensitive cargo by sea?',
        a: 'Yes. Zajel is certified to handle dangerous goods (DG) shipping by sea in full compliance with IMDG regulations. We also offer reefer (refrigerated) container services for temperature-sensitive cargo including pharmaceuticals, food products, and perishable goods.',
      },
      {
        q: 'How long does sea freight take from the UAE?',
        a: 'Transit time varies by destination and service type. As a general reference from Jebel Ali Port: shipments to India (Nhava Sheva) take approximately 6 days, to Saudi Arabia (Dammam) approximately 3 days, to East Africa (Mombasa) approximately 11 days, and to Europe (Rotterdam) approximately 22 days. These are port-to-port times; door-to-door delivery adds time for pickup, customs clearance, and last-mile delivery at each end.',
      },
      {
        q: 'What kind of cargo is sea freight best suited to?',
        a: 'Sea freight is ideal for large-volume shipments, heavy or oversized cargo, and shipments where cost efficiency is more important than speed. It is commonly used for raw materials, manufactured goods, vehicles, industrial equipment, and bulk commodities.',
      },
      {
        q: 'Does Zajel handle import, export, and cross trade shipments?',
        a: 'Yes. Zajel manages import shipments into the UAE, export shipments from the UAE to international destinations, and cross-trade shipments where cargo moves between two countries neither of which is the UAE, coordinated through our Dubai operations.',
      },
      {
        q: 'Does Zajel handle port clearance?',
        a: 'Yes. Zajel manages full port clearance at Jebel Ali Port and Khalifa Port, including customs declaration filing, duty assessment, inspection coordination, and cargo release. Port clearance is included as part of our sea freight service when customs clearance is requested.',
      },
      {
        q: 'How do I get a sea freight quote?',
        a: 'Request a sea freight quote through the form on our Sea Freight page, by email at sales@zajel.com, or by phone at 600 53 11 11. Include your cargo type, volume, weight, origin port, destination port, and preferred container type (FCL, LCL, or special equipment) for the most accurate quote.',
      },
    ],
  },
  {
    id: 'land-freight',
    title: 'Land Freight',
    heading: 'Land Freight',
    questions: [
      {
        q: 'What is the difference between FTL and LTL?',
        a: 'FTL (Full Truckload) reserves an entire truck for your cargo alone. It is suited to large shipments where you have enough goods to fill a full trailer. LTL (Less than Truckload) shares truck space with other shipments, reducing cost when your cargo does not require a complete vehicle.',
      },
      {
        q: 'Which countries does Zajel deliver to by land?',
        a: "Zajel's land freight network covers the entire UAE domestically and extends across the GCC to Saudi Arabia, Oman, Bahrain, Kuwait, and Qatar. Cross-border road freight also reaches Iraq, Jordan, Syria, Turkey, and onward into Europe through established overland corridors.",
      },
      {
        q: 'Does Zajel offer domestic land freight within the UAE?',
        a: 'Yes. Zajel provides domestic land freight across all seven emirates, covering city-to-city distribution within the UAE. This includes FTL and LTL services, as well as specialized truck types for different cargo requirements.',
      },
      {
        q: 'What truck types are available?',
        a: "Zajel's land freight fleet includes pickup trucks for smaller loads, flatbed trucks for oversized or open-deck cargo, curtain-side trucks for palletized or mixed goods, closed box trucks for secure weather-protected transit, reefer trucks for temperature-controlled cargo, and specialized heavy transport including lowbed trailers, low loaders, car carriers, and recovery vehicles.",
      },
      {
        q: 'Can Zajel move oversized or hazardous cargo by land?',
        a: 'Yes. Our fleet includes specialized vehicles for oversized and heavy cargo, and our team is certified to handle hazardous materials by road in compliance with ADR regulations and GCC transport standards. Route planning, permits, and border clearance for oversized loads are managed by our project logistics team.',
      },
      {
        q: 'How do I get a land freight quote?',
        a: 'Request a quote through the form on our Land Freight page, by email at sales@zajel.com, or by phone at 600 53 11 11. Provide your cargo type, weight, dimensions, origin, destination, truck type preference, and any special handling requirements for a tailored quote.',
      },
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    heading: 'E-commerce Logistics',
    questions: [
      {
        q: 'Does Zajel support Cash on Delivery for e-commerce orders?',
        a: 'Yes. Zajel collects COD payments at the point of delivery and remits them to your business as a standard part of the service. Both prepaid and COD orders move through the same fulfillment and delivery process with no additional steps required from your team.',
      },
      {
        q: 'Do I get a dedicated account manager?',
        a: 'Yes. Every e-commerce business account is assigned a dedicated logistics contact who manages your shipping operations directly. This means you work with a named individual who understands your business, not a shared support queue.',
      },
      {
        q: 'Which areas does Zajel deliver to for e-commerce?',
        a: 'Zajel provides e-commerce delivery across every emirate in the UAE, including same-day and next-day options. This nationwide coverage ensures your delivery area never limits your potential customer base.',
      },
      {
        q: "How do I get started with Zajel's e-commerce solutions?",
        a: 'Getting started involves three steps: first, you are onboarded by a dedicated account manager who sets up your business profile and portal access. Second, you begin submitting orders through the Zajel portal. Third, Zajel handles delivery, COD collection, and remittance from that point forward. Contact our team at sales@zajel.com to begin the onboarding process.',
      },
    ],
  },
  {
    id: 'warehousing',
    title: 'Warehousing',
    heading: 'Warehousing and Distribution',
    questions: [
      {
        q: 'Does Zajel offer warehousing services?',
        a: 'Yes. Zajel operates dedicated warehouse facilities in Dubai, providing short-term and long-term storage, e-commerce fulfillment warehousing, temperature-controlled and cold chain storage, and specialized storage for dangerous goods and oversized cargo.',
      },
      {
        q: 'Can I monitor my inventory in real time?',
        a: "Yes. Zajel's warehouse management system provides real-time stock visibility, movement history, and order status through the Zajel portal. You can track stock levels, monitor dispatches, and receive automated low-stock alerts.",
      },
      {
        q: 'Does Zajel offer pick, pack, and fulfillment services?',
        a: 'Yes. Our warehousing includes value-added services such as pick and pack, kitting and assembly, labeling and branding, quality inspection on arrival, and returns processing for e-commerce businesses.',
      },
      {
        q: 'Can Zajel store temperature-sensitive or dangerous goods?',
        a: 'Yes. Our facilities include temperature-controlled warehousing with continuous monitoring for pharmaceuticals, food products, and perishable goods. We also accommodate dangerous goods storage with the required infrastructure, permits, and trained personnel.',
      },
      {
        q: "Is warehousing connected to Zajel's freight and delivery services?",
        a: "Yes. Goods stored in our facilities can move directly into Zajel's air, sea, or land freight network, or into our last-mile delivery operation. This means cargo can go from port clearance to warehouse to final delivery through a single provider.",
      },
    ],
  },
  {
    id: 'customs',
    title: 'Customs',
    heading: 'Customs, Duties, and Documentation',
    questions: [
      {
        q: 'What documents are required for customs clearance in the UAE?',
        a: 'The core documents required are a commercial invoice (itemized and matching packing list totals), a packing list (item counts, weights, and dimensions), a bill of lading or airway bill, a certificate of origin, an import or export declaration filed through the Mirsal 2 system, and a valid trade license. Regulated goods such as pharmaceuticals, food products, chemicals, and electronics require additional category-specific permits.',
      },
      {
        q: 'What is the standard customs duty rate for imports into the UAE?',
        a: 'The standard customs duty rate is 5%, calculated on the CIF (Cost, Insurance, Freight) value of imported goods. Import VAT of 5% is applied on top of the CIF value plus duty. Higher rates apply to specific categories: 50% duty on alcohol and 100% duty on tobacco products. VAT-registered businesses can reclaim import VAT on their periodic returns.',
      },
      {
        q: 'How long does customs clearance typically take?',
        a: 'Standard general cargo clears in one to two business days. Air cargo with compliant documentation can clear on the same day. Free zone transit processing takes two to three business days. Shipments requiring inspection or involving dangerous or restricted goods typically take three to five business days, though pre-approval and pre-clearance documentation can reduce this timeframe.',
      },
      {
        q: 'What happens if my shipment is held at customs?',
        a: "Shipments are most commonly held due to incorrect HS codes, value discrepancies between invoice and declaration, vague goods descriptions, missing category-specific permits, or incomplete consignee details. Zajel's customs team identifies the specific hold reason, prepares corrective documentation, coordinates with customs authorities, and works to release your cargo as quickly as possible.",
      },
      {
        q: 'What are the benefits of shipping through a UAE free zone?',
        a: 'Goods stored within UAE free zones such as JAFZA, DAFZA, KIZAD, and DMCC are exempt from standard customs duty while they remain within the zone. This is particularly advantageous for businesses that import goods for re-export or regional distribution, as it eliminates duty costs on goods that never enter the UAE mainland market. When goods move from a free zone to the mainland, the standard 5% duty and 5% VAT apply at the point of transfer.',
      },
      {
        q: 'Does Zajel handle restricted or dangerous goods clearance?',
        a: "Yes. Zajel's licensed customs brokers manage clearance for hazardous materials, chemicals, pharmaceuticals, controlled substances, and other restricted categories. This includes obtaining necessary permits from relevant UAE authorities, coordinating specialized inspections, and ensuring full regulatory compliance throughout the clearance process.",
      },
    ],
  },
  {
    id: 'packaging',
    title: 'Packaging & Insurance',
    heading: 'Packaging, Insurance, and Cargo Protection',
    questions: [
      {
        q: 'How should I package my freight shipment?',
        a: 'Proper packaging depends on the cargo type and transport mode. General guidelines include using sturdy, sealed containers or crates appropriate to the weight and fragility of your goods. Palletized cargo should be securely wrapped and strapped. Fragile items require cushioning material and clear handling labels. For hazardous goods, packaging must comply with IATA (air), IMDG (sea), or ADR (road) regulations depending on the transport mode. Your Zajel contact can advise on specific packaging requirements for your shipment.',
      },
      {
        q: 'Does Zajel offer cargo insurance?',
        a: 'Zajel can arrange cargo insurance to cover loss or damage during transit. Insurance options and coverage levels vary depending on the shipment value, cargo type, and route. We recommend discussing insurance requirements when you request a freight quote so that coverage can be included from the outset.',
      },
      {
        q: 'What happens if my shipment is damaged during transit?',
        a: 'If your shipment arrives damaged, notify Zajel immediately and document the damage with photographs. File a claim through our support process, providing the shipment reference number, a description of the damage, supporting photographs, and any relevant delivery documentation. Our claims team will investigate and process your case.',
      },
      {
        q: 'Are there items that Zajel cannot ship?',
        a: 'Zajel cannot ship items that are prohibited by UAE law or international transport regulations. These include counterfeit goods, certain controlled substances, and items restricted by destination country import laws. Specific restrictions may also apply depending on the transport mode. For hazardous materials and other regulated goods, Zajel can ship these under the appropriate permits and compliance procedures. Contact our team if you are unsure whether your goods can be transported.',
      },
    ],
  },
  {
    id: 'tracking',
    title: 'Tracking & Delivery',
    heading: 'Shipment Tracking and Delivery in the UAE',
    questions: [
      {
        q: 'How do I track my shipment with Zajel?',
        a: 'You can track your shipment in real time through the Zajel website, the Zajel mobile app (available on iOS and Android), or by contacting your dedicated account manager. Enter your AWB or tracking number on our Track Shipment page to see the current status, location, and estimated delivery time for your shipment.',
      },
      {
        q: 'What should I do if my shipment is delayed?',
        a: 'If your shipment appears delayed, check the tracking status on the Zajel portal or app for the latest update. If you need further information, contact our support team by raising a support ticket through the website or calling 600 53 11 11. Common causes of delay include customs processing, adverse weather conditions, and port or airport congestion. Our team will provide a status update and an expected delivery timeline.',
      },
      {
        q: 'Does Zajel provide proof of delivery?',
        a: 'Yes. Zajel provides proof of delivery for all shipments, including delivery confirmation with recipient name, signature, date, and time. This information is accessible through the Zajel portal and can be provided as a document upon request.',
      },
      {
        q: 'Can I change the delivery address after booking?',
        a: 'Address changes may be possible depending on the current status of your shipment. If your shipment has not yet been dispatched or is still in transit, contact your account manager or our support team as early as possible to request the change. Changes to shipments already out for delivery may not be possible, and re-routing may incur additional charges.',
      },
    ],
  },
  {
    id: 'billing',
    title: 'Billing & Payments',
    heading: 'Billing and Payments',
    questions: [
      {
        q: 'What payment methods does Zajel accept?',
        a: 'Zajel accepts bank transfers, corporate credit arrangements, and other standard B2B payment methods. For e-commerce sellers using our fulfillment services, COD collection and remittance is handled as part of the delivery process. Specific payment terms are arranged during account setup.',
      },
      {
        q: 'How does COD remittance work for e-commerce sellers?',
        a: 'When Zajel delivers an order with Cash on Delivery, payment is collected from the recipient at the point of delivery. Collected COD amounts are then remitted to your business on a regular cycle as agreed during onboarding. Both prepaid and COD orders move through the same fulfillment workflow with no separate process required on your end.',
      },
      {
        q: 'Are customs duties and taxes included in freight quotes?',
        a: "Standard freight quotes cover the transportation and handling of your shipment. Customs duties, import VAT, and any additional government fees are typically quoted separately, as these depend on the HS code classification, declared value, and destination-specific tariff rates for your goods. Zajel's customs team can provide an estimate of applicable duties as part of the clearance process.",
      },
    ],
  },
];
