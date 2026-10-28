import { Suspense } from 'react';
import type { Metadata } from 'next';
import RequireAuth from '@/components/auth/RequireAuth';
import AccountDashboard from '@/components/account/AccountDashboard';

export const metadata: Metadata = {
  title: 'My account',
  description: 'Your Zajel shipments, saved addresses and profile.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/account' },
};

// ?tab=overview|profile|addresses|shipments|tickets|support selects a section.
export default function AccountPage() {
  return (
    <main className="w-full bg-white px-4 pb-20 pt-32 sm:px-6 md:pt-40 lg:px-8">
      <Suspense fallback={null}>
        <RequireAuth>
          <AccountDashboard />
        </RequireAuth>
      </Suspense>
    </main>
  );
}
