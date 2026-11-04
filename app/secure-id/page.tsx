import { cmsMetadata } from '@/lib/cms/server';
import { SecureIdHero, SecureIdProtocol, SecureIdVerificationDetails } from '@/components/services/secure-id';

export const generateMetadata = cmsMetadata('secure-id', '/secure-id');

export default function SecureIdPage() {
  return (
    <main className="bg-white overflow-x-clip selection:bg-[#36B936] selection:text-white">
      <SecureIdHero />
      <SecureIdProtocol />
      <SecureIdVerificationDetails />
    </main>
  );
}
