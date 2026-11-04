import { cmsMetadata } from '@/lib/cms/server';
import { SecureMailHero, SecureMailProtocol, SecureMailDetails } from '@/components/services/secure-mail';

export const generateMetadata = cmsMetadata('secure-mail', '/secure-mail');

export default function SecureMailPage() {
  return (
    <main className="bg-white overflow-x-clip selection:bg-[#36B936] selection:text-white">
      <SecureMailHero />
      <SecureMailProtocol />
      <SecureMailDetails />
    </main>
  );
}
