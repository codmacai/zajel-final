import { Suspense } from 'react';
import type { Metadata } from 'next';
import LoginView from '@/components/auth/LoginView';

// Phone + one-time-code sign-in (Zajel.PrePaid.Api → Zajel.ZAPP.API RequestOtp/VerifyOtp).
// Accepts ?returnUrl=/path (or ?next=/path) to send people back where they came from.

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to Zajel with your mobile number to book shipments, save addresses and see your shipment history.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/login' },
};

export default function LoginPage() {
  return (
    <main className="w-full bg-white px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-10 md:pt-40 lg:px-20">
      {/* useSearchParams() in the client view requires a Suspense boundary. */}
      <Suspense fallback={null}>
        <LoginView />
      </Suspense>
    </main>
  );
}
