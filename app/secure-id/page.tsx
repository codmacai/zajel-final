import { cmsMetadata, notFoundIfHidden } from '@/lib/cms/server';
import { SecureIdHero, SecureIdProtocol, SecureIdVerificationDetails } from '@/components/services/secure-id';
import CmsScope from '@/components/cms/CmsScope';

export const generateMetadata = cmsMetadata('secure-id', '/secure-id');

export default async function SecureIdPage() {
  // Switched off in the CMS: "page not found".
  await notFoundIfHidden('secure-id');
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
