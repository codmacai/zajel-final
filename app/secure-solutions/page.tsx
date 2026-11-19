import { cmsMetadata, notFoundIfHidden } from '@/lib/cms/server';
import CmsScope from '@/components/cms/CmsScope';
import SecureSolutions from '@/components/Secure-solutions/secure-solutions';

export const generateMetadata = cmsMetadata('secure-solutions', '/secure-solutions');

export default async function Page() {
  // Switched off in the CMS: "page not found".
  await notFoundIfHidden('secure-solutions');
  return (
    <CmsScope page="secure-solutions">
      <SecureSolutions />
    </CmsScope>
  );
}