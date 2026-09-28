import type { Metadata } from 'next';
import { SecureIdHero, SecureIdProtocol, SecureIdVerificationDetails } from '@/components/services/secure-id';

export const metadata: Metadata = {
  title: "Secure ID Delivery",
  description: "Passports, ID cards and licences delivered with recipient verification at the door.",
};

export default function SecureIdPage() {
  return (
    <main className="bg-white overflow-x-clip selection:bg-[#36B936] selection:text-white">
      <SecureIdHero />
      <SecureIdProtocol />
      <SecureIdVerificationDetails />
    </main>
  );
}
