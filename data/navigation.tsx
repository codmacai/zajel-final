export interface NavItem {
    name: string;
    desc: string;
    path: string;
    icon: React.ReactNode;
    badge?: string;
  }
  
  export interface SolutionsCategory {
    id: string;
    label: string;
    columnLabel: string;
    tagline: string;
    path: string;
    viewAllLabel: string;
    highlight: boolean;
    items: NavItem[];
  }
  
  export const solutionsCategories: SolutionsCategory[] = [
    {
      id: "individual",
      label: "Individual Business",
      columnLabel: "Individual",
      tagline: "Personal delivery solutions",
      path: "/individual-solutions",
      viewAllLabel: "Individual Solutions",
      highlight: true,
      items: [
        {
          name: "On Demand Express",
          desc: "Instant solutions for urgent deliveries.",
          path: "/domestic-courier",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          ),
        },
        {
          name: "International Shipping",
          desc: "Global reach with local expertise.",
          path: "/international-courier",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          ),
        },
      ],
    },
    {
      id: "business",
      label: "Business Solutions",
      columnLabel: "Business",
      tagline: "Scale with confidence",
      path: "/business-solutions",
      viewAllLabel: "Business Solutions",
      highlight: true,
      items: [
        {
          name: "Ecommerce",
          desc: "First, mid, and last-mile perfection.",
          path: "/ecommerce",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          ),
        },
        {
          name: "Air Freight",
          desc: "Fast, time-critical cargo by air.",
          path: "/air-freight",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-1 .1-1.3.5l-.4.5c-.4.5-.2 1.2.3 1.5L9 12l-2 3H4l-1 1 4 1 1 4 1-1v-3l3-2 3.5 5.3c.3.5 1 .7 1.5.3l.5-.4c.4-.3.6-.8.5-1.3z" />
            </svg>
          ),
        },
        {
          name: "Land Freight",
          desc: "Full truckload and cross-border trucking.",
          path: "/land-freight",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
              <path d="M15 18H9" />
              <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
              <circle cx="17" cy="18" r="2" />
              <circle cx="7" cy="18" r="2" />
            </svg>
          ),
        },
        {
          name: "Sea Freight",
          desc: "FCL, LCL, and port-to-port shipping.",
          path: "/sea-freight",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
              <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a13.4 13.4 0 0 0 .464 3.844" />
              <path d="M21 14 18.4 6.8a2 2 0 0 0-1.9-1.4H7.5a2 2 0 0 0-1.9 1.4L3 14" />
              <path d="M8 10V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
            </svg>
          ),
        },
        {
          name: "Customs Clearance",
          desc: "Brokerage and documentation.",
          path: "/customs-clearance",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12c0 5-3.5 8.5-9 10-5.5-1.5-9-5-9-10V6l9-4 9 4z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          ),
        },
        {
          name: "Warehousing",
          desc: "Storage, bonded, and dangerous goods.",
          path: "/warehouse",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21V10l9-6 9 6v11" />
              <path d="M9 21v-6h6v6" />
              <path d="M3 10h18" />
            </svg>
          ),
        },
      ],
    },
    {
      id: "secure",
      label: "Secure Solutions",
      columnLabel: "Secure",
      tagline: "Certified, compliant, protected",
      path: "/secure-solutions",
      viewAllLabel: "Secure Solutions",
      highlight: true,
      items: [
        {
          name: "Gov & Institutional",
          desc: "Compliant document handling.",
          path: "/secure-gov",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="22" x2="21" y2="22" />
              <line x1="6" y1="18" x2="6" y2="11" />
              <line x1="10" y1="18" x2="10" y2="11" />
              <line x1="14" y1="18" x2="14" y2="11" />
              <line x1="18" y1="18" x2="18" y2="11" />
              <polygon points="12 2 20 7 4 7" />
            </svg>
          ),
        },
        {
          name: "Secure ID",
          desc: "Emirates ID & passport delivery.",
          path: "/secure-id",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <line x1="7" y1="15" x2="12" y2="15" />
              <line x1="7" y1="11" x2="9" y2="11" />
              <circle cx="17" cy="10" r="2" />
              <path d="M14 16c0-1.6 2-3 3-3s3 1.4 3 3" />
            </svg>
          ),
        },
        {
          name: "Secure Docs",
          desc: "Courts, MOFA, and Customs.",
          path: "/secure-docs",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
              <path d="M14 2v6h6" />
              <path d="M12 18s-3-2-3-5a3 3 0 0 1 6 0c0 3-3 5-3 5z" />
            </svg>
          ),
        },
        {
          name: "Secure Mail",
          desc: "Confidential corporate mail.",
          path: "/secure-mail",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          ),
        },
      ],
    },
  ];
  
  export const aboutItems: NavItem[] = [
    {
      name: "About Zajel",
      desc: "Our story, mission, and history.",
      path: "/about",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
    },
    {
      name: "Industries We Serve",
      desc: "Government, e-commerce, oil and gas, healthcare.",
      path: "/industry",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V7l7-4 7 4v14" />
          <path d="M9 9h.01" />
          <path d="M9 13h.01" />
          <path d="M9 17h.01" />
          <path d="M15 9h.01" />
          <path d="M15 13h.01" />
          <path d="M15 17h.01" />
        </svg>
      ),
    },
    {
      name: "Our Network",
      desc: "195 countries, 500+ destinations, 9 alliances.",
      path: "/network",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5" cy="6" r="2" />
          <circle cx="19" cy="6" r="2" />
          <circle cx="12" cy="18" r="2" />
          <path d="M5 8v3a4 4 0 0 0 4 4h1" />
          <path d="M19 8v3a4 4 0 0 1-4 4h-1" />
        </svg>
      ),
    },
    {
      name: "Projects",
      desc: "Case studies and completed work.",
      path: "/projects",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      ),
    },
    {
      name: "Careers",
      desc: "Join our logistics network.",
      path: "/careers",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      name: "Contact Us",
      desc: "Offices, phone, and email.",
      path: "/contact",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
  ];
  
  export const resourcesItems: NavItem[] = [
    {
      name: "Help Center",
      desc: "Support tickets and assistance.",
      path: "/support",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        </svg>
      ),
    },
    {
      name: "FAQ",
      desc: "Answers to common questions.",
      path: "/faq",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
    {
      name: "Blog",
      desc: "Guides, news, and industry insights.",
      path: "/blog",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </svg>
      ),
    },
    {
      name: "Shipment Tracking",
      desc: "Track your delivery in real time.",
      path: "/track",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      ),
    },
  ];