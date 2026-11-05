import { cmsMetadata } from '@/lib/cms/server';
import CmsScope from '@/components/cms/CmsScope';
import SecureSolutions from '@/components/Secure-solutions/secure-solutions';

export const generateMetadata = cmsMetadata('secure-solutions', '/secure-solutions');

export default function Page() {
  return (
    <CmsScope page="secure-solutions">
      <SecureSolutions />
    </CmsScope>
  );
}