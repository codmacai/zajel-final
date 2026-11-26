import type { ReactNode } from 'react';
import { cmsMetadata, notFoundIfHidden } from '@/lib/cms/server';

export const generateMetadata = cmsMetadata('quotation', '/quotation');

export default async function Layout({ children }: { children: ReactNode }) {
  await notFoundIfHidden('quotation');
  return <main>{children}</main>;
}
