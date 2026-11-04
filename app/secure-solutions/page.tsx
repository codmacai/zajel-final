import { cmsMetadata } from '@/lib/cms/server';
import SecureSolutions from '@/components/Secure-solutions/secure-solutions';

export const generateMetadata = cmsMetadata('secure-solutions', '/secure-solutions');

export default function Page() {
  return <SecureSolutions />;
}