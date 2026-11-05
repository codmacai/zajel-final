// Built-in content for these sections. The CMS (/admin) edits it; anything not edited
// there shows exactly as written here.

import { Search, CalendarCheck, Calculator, MessageSquare, Smartphone, Box, FileText, Phone, type LucideIcon } from 'lucide-react';
export const ACTIONS: { href: string; icon: LucideIcon; title: string; text: string }[] = [
  { href: '/track', icon: Search, title: 'Track your shipment', text: 'Enter your tracking number to see real-time status updates.' },
  { href: '/send-shipment', icon: CalendarCheck, title: 'Schedule a pickup', text: 'Choose a location, time and details for your next shipment.' },
  { href: '/quotation', icon: Calculator, title: 'Get a quote', text: 'Calculate domestic and international shipping rates instantly.' },
  { href: '#contact', icon: MessageSquare, title: 'Contact our team', text: 'Reach support by phone, email or through the portal.' },
  { href: '/#download-app', icon: Smartphone, title: 'Download the app', text: 'Track, book and get support from your mobile device.' },
];

export const QUICK_LINKS: { href: string; icon: LucideIcon; label: string }[] = [
  { href: '/track', icon: Box, label: 'Track your shipment' },
  { href: '/faq', icon: FileText, label: 'View FAQs' },
  { href: '#contact', icon: Phone, label: 'Contact support' },
];

export const SUPPORT_PAGE = {
  heading: "How can we help?",
  description: "Try a self-service option first. If you still need us, raise a ticket below.",
  ticketTitle: "Raise a support ticket",
  ticketText: "Signed-in customers can raise a ticket here or from their account. We'll reply by email or phone.",
  quickTitle: "Need quick help?",
  quickText: "Before raising a ticket, you may try:",
  hoursTitle: "Support hours",
  weekdays: "Monday – Saturday",
  weekdayHours: "8:00 AM – 5:00 PM",
  sunday: "Sunday",
  sundayHours: "Closed",
  emergencyTitle: "Emergency support",
  emergencyPhone: "600 53 11 11",
  actions: ACTIONS,
  quickLinks: QUICK_LINKS,
};
export type SUPPORT_PAGEContent = typeof SUPPORT_PAGE;
