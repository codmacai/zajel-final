import { cmsMetadata } from '@/lib/cms/server';
import { SecureIdHero, SecureIdProtocol, SecureIdVerificationDetails } from '@/components/services/secure-id';
import CmsScope from '@/components/cms/CmsScope';

export const generateMetadata = cmsMetadata('secure-id', '/secure-id');

export default function SecureIdPage() {
  return (
    <CmsScope page="secure-id">
    <main className="bg-white overflow-x-clip selection:bg-[#36B936] selection:text-white">
      <SecureIdHero />
      <SecureIdProtocol />
      <SecureIdVerificationDetails />
    </main>
    </CmsScope>
  );
}
