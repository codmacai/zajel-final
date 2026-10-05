import type { FaqQuestion } from "@/components/shared/faq-section";

export const Ecommerce_Faqs: FaqQuestion[] = [
    {
        question: 'Can I integrate Zajel with Shopify?',
        answer: 'Yes. Zajel offers direct Shopify integration using REST APIs. Orders sync automatically from your Shopify store to our fulfillment system, and shipment status updates push back to your Shopify order page in real time.',
      },
      {
        question: 'Does Zajel integrate with WooCommerce?',
        answer: 'Yes. Zajel provides a direct WooCommerce integration using REST APIs. Install the connection, and new orders route to our system automatically with status updates synced back to WooCommerce.',
      },
      {
        question: 'What if I use a platform other than Shopify or WooCommerce?',
        answer: 'Zajel provides REST API access so your development team can build a custom integration with any order management system, marketplace, or ERP. Our technical team supports onboarding and provides full API documentation.',
      },
      {
        question: 'How does returns management work?',
        answer: 'You log a return in the Zajel portal or it syncs through your integration. Our driver picks up the item from the customer, it is inspected at our facility against your return criteria, and approved items are restocked to your inventory. You receive a return report with item condition and updated stock counts.',
      },
      {
        question: 'Can I use Zajel for COD in all emirates?',
        answer: 'Yes. Zajel handles Cash on Delivery collection and reconciliation across all seven emirates. COD amounts are tracked in your dashboard and transferred on a regular settlement schedule.',
      },
      {
        question: 'What happens if a customer refuses a COD delivery?',
        answer: 'If a customer refuses a COD shipment, the item is returned to our facility. You are notified through the portal with the reason for refusal. The item is held for redelivery, return to your inventory, or disposed of based on your instructions.',
      },
      {
        question: 'What reports do I get as a merchant?',
        answer: 'Your merchant dashboard includes live order tracking, daily COD collection summaries, weekly and monthly delivery performance reports (success rates, transit times, return rates), and export options for CSV and PDF.',
      },
      {
        question: 'Is there a minimum number of orders to use Zajel?',
        answer: 'No. Zajel serves merchants from 1 order per day to thousands. There are no minimum volume requirements and no long-term contracts required to get started. Pricing scales with your volume.',
      }
];
