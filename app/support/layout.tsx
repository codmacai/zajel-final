import type { ReactNode } from 'react';
import { cmsMetadata } from '@/lib/cms/server';

export const generateMetadata = cmsMetadata('support', '/support');

export default function Layout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
