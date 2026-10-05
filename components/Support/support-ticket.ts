// Put this file at: data/support-ticket.ts
import {
    Search,
    CalendarCheck,
    Calculator,
    MessageSquare,
    Smartphone,
    Box,
    FileText,
    Phone,
    type LucideIcon,
  } from "lucide-react";
  
  // ---------------------------------------------------------------------------
  // Types
  // ---------------------------------------------------------------------------
  
  export type FieldKind = "text" | "email" | "tel" | "select" | "textarea";
  
  export interface FieldDef {
    name: string;
    label: string;
    kind?: FieldKind;          // default "text"
    placeholder?: string;
    hint?: string;
    options?: string[];        // for kind: "select"
    required?: boolean;        // default true
    autoComplete?: string;
    rows?: number;             // for kind: "textarea"
  }
  
  export interface FormSection {
    title: string;
    columns: 1 | 2;
    fields: FieldDef[];
  }
  
  export interface ActionCardDef {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
  }
  
  export interface QuickLinkDef {
    label: string;
    href: string;
    icon: LucideIcon;
  }
  
  // ---------------------------------------------------------------------------
  // Copy
  // ---------------------------------------------------------------------------
  
  export const HELP_HEADING = "How Can We Help?";
  export const HELP_SUBHEADING = "Explore our most common self-service tools before raising a ticket.";
  
  export const EMERGENCY_PHONE = { display: "600 53 11 11", href: "tel:600531111" }; // TODO: confirm dialable number
  
  export const SUPPORT_HOURS = [
    { day: "Monday - Friday", time: "8:00 AM - 6:00 PM" },
    { day: "Saturday", time: "9:00 AM - 2:00 PM" },
  ];
  export const SUPPORT_CLOSED_NOTE = "Sunday: Closed";
  
  export const SUCCESS_COPY = {
    title: "Ticket submitted",
    message: "Thanks for reaching out. Our support team will review your request and reply by email.",
  };
  
  // ---------------------------------------------------------------------------
  // Self-service cards (routes are placeholders: point them at your real pages)
  // ---------------------------------------------------------------------------
  
  export const ACTION_CARDS: ActionCardDef[] = [
    {
      title: "Track Your Shipment",
      description: "Enter your tracking number to see real-time status updates for your shipment.",
      href: "/track",
      icon: Search,
    },
    {
      title: "Schedule a Pickup",
      description: "Book a pickup for your next shipment. Select location, time, and details.",
      href: "/send-shipment",
      icon: CalendarCheck,
    },
    {
      title: "Get a Quote",
      description: "Calculate shipping rates for domestic or international deliveries instantly.",
      href: "/quotation",
      icon: Calculator,
    },
    {
      title: "Contact Our Team",
      description: "Reach our support team by phone, email, or through the portal for any inquiry.",
      href: "/contact-us",
      icon: MessageSquare,
    },
    {
      title: "Download App",
      description: "Access tracking, booking, and support directly from your mobile device.",
      href: "/#download-app",
      icon: Smartphone,
    },
  ];
  
  export const QUICK_LINKS: QuickLinkDef[] = [
    { label: "Track Your Shipment", href: "/track", icon: Box },
    { label: "View FAQs", href: "/faq", icon: FileText },
    { label: "Contact Support", href: "/contact-us", icon: Phone },
  ];
  
  // ---------------------------------------------------------------------------
  // Form (option lists are placeholders: replace with your real values)
  // ---------------------------------------------------------------------------
  
  export const FORM_SECTIONS: FormSection[] = [
    {
      title: "Service Information",
      columns: 1,
      fields: [
        {
          name: "product",
          label: "Product",
          kind: "select",
          placeholder: "Select a product",
          hint: "Choose the service related to your issue",
          options: ["Express Delivery", "Air Freight", "Sea Freight", "Project Logistics", "E-commerce Fulfilment"],
        },
        {
          name: "ticketType",
          label: "Ticket Type",
          kind: "select",
          placeholder: "Select a ticket type",
          hint: "This helps us route your request faster",
          options: ["Inquiry", "Complaint", "Service Request", "Feedback"],
        },
        {
          name: "issueRelatedTo",
          label: "Issue Related To",
          kind: "select",
          placeholder: "Select an issue",
          hint: "Select the closest match to your concern",
          options: ["Delayed shipment", "Damaged shipment", "Lost shipment", "Billing", "Customs clearance", "Other"],
        },
      ],
    },
    {
      title: "Personal Details",
      columns: 2,
      fields: [
        { name: "firstName", label: "First Name", placeholder: "Enter your first name", autoComplete: "given-name" },
        { name: "lastName", label: "Last Name", placeholder: "Enter your last name", autoComplete: "family-name" },
        {
          name: "email",
          label: "Email Address",
          kind: "email",
          placeholder: "Enter your email address",
          hint: "Ticket updates will be sent to this email",
          autoComplete: "email",
        },
        {
          name: "phone",
          label: "Phone Number",
          kind: "tel",
          placeholder: "Enter your mobile number",
          hint: "Used only if urgent clarification is required",
          autoComplete: "tel",
        },
      ],
    },
    {
      title: "Shipment Identifier",
      columns: 1,
      fields: [
        {
          name: "awb",
          label: "AWB / Application Number",
          placeholder: "Enter AWB or application number (if available)",
          hint: "Providing this helps us resolve your issue faster",
          required: false,
        },
      ],
    },
    {
      title: "Issue Details",
      columns: 1,
      fields: [
        {
          name: "message",
          label: "Message",
          kind: "textarea",
          rows: 5,
          placeholder:
            "Please describe your issue in detail. Include shipment status, dates, locations, or any relevant information.",
          hint: "The more details you provide, the faster we can assist you.",
        },
      ],
    },
  ];