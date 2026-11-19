import type { ReactNode } from 'react';
import { cmsMetadata, notFoundIfHidden } from '@/lib/cms/server';
import CmsScope from '@/components/cms/CmsScope';

export const generateMetadata = cmsMetadata('support', '/support');

export default async function Layout({ children }: { children: ReactNode }) {
  // Switched off in the CMS: "page not found".
  await notFoundIfHidden('support');
  return (
    <CmsScope page="support">
      <main>{children}</main>
    </CmsScope>
  );
}
