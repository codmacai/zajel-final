import type { ReactNode } from 'react';
import { cmsMetadata, notFoundIfHidden } from '@/lib/cms/server';
import CmsScope from '@/components/cms/CmsScope';

export const generateMetadata = cmsMetadata('contact', '/contact');

export default async function Layout({ children }: { children: ReactNode }) {
  // Switched off in the CMS: "page not found".
  await notFoundIfHidden('contact');
  return (
    <CmsScope page="contact">
      <main>{children}</main>
    </CmsScope>
  );
}
