import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { History, Languages, Zap } from 'lucide-react';
import { getAdmin, safeNext } from '@/lib/cms/auth';
import { cmsConfigured } from '@/lib/cms/config';
import LoginForm from '@/components/cms/admin/LoginForm';
import { ZajelBird, ZajelLogotype } from '@/components/cms/admin/Brand';

export const metadata: Metadata = { title: 'Sign in' };

const POINTS = [
  { icon: Languages, title: 'English and Arabic', text: 'Side by side, with the site’s translations filled in.' },
  { icon: Zap, title: 'Live in seconds', text: 'Save a section and zajel.com updates straight away.' },
  { icon: History, title: 'Every version kept', text: 'Look back at any change and restore it in one click.' },
];

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeNext((await searchParams).next);
  if (await getAdmin()) redirect(next);
  return (
    <div className="c-login">
      <aside className="c-login-art">
        <ZajelBird className="c-login-watermark" size={720} color="currentColor" />
        <div className="c-login-top">
          <ZajelLogotype height={42} inverse />
          <span className="c-login-tag">CMS</span>
        </div>
        <div className="c-login-copy">
          <span className="c-login-eyebrow">Content studio</span>
          <h2>Every page of zajel.com, edited in one place.</h2>
          <p>Text, images and Arabic for every section of the site, published the moment you save.</p>
          <ul className="c-login-points">
            {POINTS.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className="ic"><Icon aria-hidden="true" /></span>
                <span>
                  <b>{title}</b>
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="c-login-foot">
          <span>© {new Date().getFullYear()} ZAJEL Courier Services</span>
          <span>Dubai · Abu Dhabi</span>
        </div>
      </aside>
      <main className="c-login-form">
        <div className="c-login-box">
          <div className="c-login-badge"><ZajelBird size={30} color="#fff" /></div>
          <h1>Sign in</h1>
          <p>Use the email and password your admin set up for you.</p>
          <LoginForm next={next} configured={cmsConfigured} />
          <p className="foot">Forgotten your password? Ask an admin to reset it in Supabase.</p>
        </div>
      </main>
    </div>
  );
}
