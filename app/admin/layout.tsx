import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './admin.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

export const metadata: Metadata = {
  title: { absolute: 'Zajel CMS', template: '%s · Zajel CMS' },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2f4f3' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0c0b' },
  ],
};

/** The admin is English-only and left-to-right, whatever language the visitor chose on the site. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`cms ${geist.variable} ${geistMono.variable}`} dir="ltr" lang="en" data-no-translate>
      {children}
    </div>
  );
}
