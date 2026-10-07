export interface AllianceCardData {
    title: string;
    description: string;
    logoSrc: string;
    logoAlt: string;
  }
  
  export const STRATEGIC_ALLIANCES_EYEBROW = "Global Partnerships";
  export const STRATEGIC_ALLIANCES_HEADING = "Strategic Alliances Powering Our Logistics Network";
  export const STRATEGIC_ALLIANCES_INTRO =
    "Zajel's global coverage is strengthened by our membership in established international logistics networks. These alliances extend our physical reach to markets and routes where our partners maintain on-the-ground operations.";
  
  export const STRATEGIC_ALLIANCES: AllianceCardData[] = [
    {
      title: "DF Alliance by DP World",
      description:
        "A global freight forwarder network spanning more than 190 countries. Membership gives Zajel access to vetted logistics partners in every major trade market, ensuring reliable handling and local expertise for shipments moving to or through destinations where we do not maintain a direct presence.",
      logoSrc: "/Homepage/alliances/df-alliance-logo.png",
      logoAlt: "DF Alliance by DP World Logo",
    },
    {
      title: "JCtrans Premium Membership",
      description:
        "One of the world's leading international freight forwarding networks, connecting logistics providers across Asia, Europe, the Americas, and Africa. This membership strengthens Zajel's coverage on key trade lanes, particularly routes connecting the UAE with Asian manufacturing and export markets.",
      logoSrc: "/Homepage/alliances/jctrans-logo.png",
      logoAlt: "JCtrans Logo",
    },
    {
      title: "IATA NAFL Accreditation",
      description:
        "Membership through the UAE's National Association of Freight and Logistics, linked to the International Air Transport Association. This accreditation supports our air freight operations with industry-standard protocols, carrier relationships, and regulatory compliance across international air cargo routes.",
      logoSrc: "/Homepage/alliances/iata-logo.png",
      logoAlt: "IATA NAFL Logo",
    },
  ];