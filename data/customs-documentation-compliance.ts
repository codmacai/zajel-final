export const DARK = "#0D2A22";
export const LIGHT = "#ffffff";
export const LIME = "#36b936";

export const DOC_COMPLIANCE_HEADING = "Customs Clearance Documentation and UAE Compliance";

export const DOC_COMPLIANCE_INTRO =
  "Accurate documentation is the foundation of smooth customs clearance. Zajel prepares and verifies every required document before submission, reducing the risk of queries, inspections, or rejections that cause delays.";

export type Tone = "dark" | "light" | "lime";
export type Body = { kind: "list"; items: string[] } | { kind: "paragraph"; text: string };

export interface ColumnData {
  id: string;
  value: string;
  suffix: string;
  label: string;
  tag: string;
  tone: Tone;
  body: Body;
}

export const DOC_COMPLIANCE_COLUMNS: readonly ColumnData[] = [
  {
    id: "documents",
    value: "07",
    suffix: "+",
    label: "Core Documents Required",
    tag: "always verified",
    tone: "dark",
    body: {
      kind: "list",
      items: [
        "Commercial Invoice (itemized and matching packing list totals)",
        "Packing List (item counts, weights, and dimensions)",
        "Bill of Lading or Airway Bill",
        "Certificate of Origin",
        "Import or Export Declaration (filed through Mirsal 2)",
        "Trade License verification",
        "Category-specific permits for regulated goods",
      ],
    },
  },
  {
    id: "hs-code",
    value: "12",
    suffix: "+",
    label: "HS Code Classification",
    tag: "since 2026",
    tone: "light",
    body: {
      kind: "paragraph",
      text:
        "We support clients in determining the appropriate Harmonized System (HS) code for their shipments. When classification requires further clarification, our clearance team coordinates with the customs authority, supported by product specifications and shipment documents, to help confirm the correct HS code. This approach helps reduce classification discrepancies, customs delays and potential penalties.",
    },
  },
  {
    id: "duty-tax",
    value: "05",
    suffix: "%",
    label: "Duty and Tax Assessment",
    tag: "on CIF value",
    tone: "lime",
    body: {
      kind: "paragraph",
      text:
        "The standard UAE customs duty rate is generally 5%, calculated on the CIF (Cost, Insurance and Freight) value of the goods. Certain products may be subject to higher tariff rates (up to 100%) or other applicable rates, while preferential or reduced tariff rates may apply to eligible goods originating from countries covered by UAE trade agreements, including Comprehensive Economic Partnership Agreements (CEPAs), subject to applicable rules of origin and supporting documentation. A 5% VAT generally applies to taxable imports, in accordance with prevailing UAE tax regulations.",
    },
  },
] as const;

interface ToneStyle {
  bg: string;
  text: string;
  textMuted: string;
  tagBorder: string;
  divider: string;
}

const toneStylesMap: Record<string, ToneStyle> = {
  dark: {
    bg: DARK,
    text: LIME,
    textMuted: "rgba(54, 185, 54, 0.8)",
    tagBorder: "rgba(54, 185, 54, 0.35)",
    divider: "rgba(255,255,255,0.14)",
  },
  light: {
    bg: LIGHT,
    text: LIME,
    textMuted: LIME + "B3",
    tagBorder: LIME + "4D",
    divider: DARK + "1F",
  },
  lime: {
    bg: LIME,
    text: LIGHT,
    textMuted: LIGHT + "CC",
    tagBorder: LIGHT + "59",
    divider: LIGHT + "26",
  },
};

export const TONE_STYLES = toneStylesMap as Record<Tone, ToneStyle>;