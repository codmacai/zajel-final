import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { SecureIdHero, SecureIdProtocol, SecureIdVerificationDetails } from '@/components/services/secure-id';

export const metadata: Metadata = pageMetadata({
  title: "Secure ID Delivery in the UAE",
  description:
    "Passports, Emirates ID cards and licences delivered across the UAE with recipient verification at the door.",
  path: '/secure-id',
});

export default function SecureIdPage() {
  return (
    <main className="bg-white overflow-x-clip selection:bg-[#36B936] selection:text-white">
      <SecureIdHero />
      <SecureIdProtocol />
      <SecureIdVerificationDetails />
    </main>
  );
}
