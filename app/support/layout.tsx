import type { ReactNode } from 'react';
import { cmsMetadata } from '@/lib/cms/server';
import CmsScope from '@/components/cms/CmsScope';

export const generateMetadata = cmsMetadata('support', '/support');

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <CmsScope page="support">
      <main>{children}</main>
    </CmsScope>
  );
}
