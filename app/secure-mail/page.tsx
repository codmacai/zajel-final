import { cmsMetadata } from '@/lib/cms/server';
import { SecureMailHero, SecureMailProtocol, SecureMailDetails } from '@/components/services/secure-mail';
import CmsScope from '@/components/cms/CmsScope';

export const generateMetadata = cmsMetadata('secure-mail', '/secure-mail');

export default function SecureMailPage() {
  return (
    <CmsScope page="secure-mail">
    <main className="bg-white overflow-x-clip selection:bg-[#36B936] selection:text-white">
      <SecureMailHero />
      <SecureMailProtocol />
      <SecureMailDetails />
    </main>
    </CmsScope>
  );
}
