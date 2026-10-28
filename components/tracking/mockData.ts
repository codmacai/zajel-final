import type { Shipment } from './types';

// Sample shipment in the real view-model shape — handy for designing the results page
// offline. NOT used at runtime anymore: tracking goes through /api/track (real data).
// Safe to delete if nobody needs it.
export const MOCK_SHIPMENT: Shipment = {
  trackingNumber: 'ZAJEL123456789',
  status: 'delivered',
  statusLabel: 'Delivered',
  sender: {
    name: 'ABC Trading L.L.C',
    addressLine: 'Dubai Marina, Dubai, UAE',
    phone: '+971 50 123 4567',
  },
  receiver: {
    name: 'John Smith',
    addressLine: 'Downtown, Abu Dhabi, UAE',
    phone: '+971 50 765 4321',
  },
  origin: 'Dubai, United Arab Emirates',
  destination: 'Abu Dhabi, United Arab Emirates',
  originCoordinates: null,
  destinationCoordinates: null,
  service: {
    serviceType: 'ZAJEL Express',
    weightKg: 2.5,
    pieces: 1,
  },
  deliveredAtLabel: 'Jan 5, 2026',
  deliveredOnLabel: 'Jan 5, 2026',
  timeline: [
    { status: 'pickup_completed', label: 'Picked Up', location: 'Dubai, United Arab Emirates', dateLabel: 'Jan 5, 2026 10:30 AM', done: true, isActive: false },
    { status: 'inscan_at_hub', label: 'At Hub', location: 'Dubai, United Arab Emirates', dateLabel: 'Jan 5, 2026', done: true, isActive: false },
    { status: 'accept', label: 'Out for Delivery', location: 'Abu Dhabi, United Arab Emirates', dateLabel: 'Jan 5, 2026 2:15 PM', done: true, isActive: false },
    { status: 'delivered', label: 'Delivered', location: 'Abu Dhabi, United Arab Emirates', dateLabel: 'Jan 5, 2026 3:45 PM', done: true, isActive: true },
  ],
  proofOfDelivery: {
    receivedBy: 'John Smith',
    deliveryDate: 'Jan 5, 2026',
    deliveryTime: '3:45 PM',
    deliveryNotes: 'Package delivered to reception desk as per instructions',
    photoUrl: '',
  },
};
