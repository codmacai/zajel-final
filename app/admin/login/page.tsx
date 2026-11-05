import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdmin, safeNext } from '@/lib/cms/auth';
import { cmsConfigured } from '@/lib/cms/config';
import LoginForm from '@/components/cms/admin/LoginForm';
import { ZajelBird, ZajelLogotype } from '@/components/cms/admin/Brand';

export const metadata: Metadata = { title: 'Sign in' };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeNext((await searchParams).next);
  if (await getAdmin()) redirect(next);
  return (
    <div className="c-login">
      <aside className="c-login-art">
        <ZajelBird className="c-login-watermark" size={720} color="currentColor" />
        <div className="c-login-top">
          <ZajelLogotype height={44} inverse />
        </div>
        <div className="c-login-copy">
          <h2>Intelligent Movement, Nationwide and Beyond</h2>
          <p>Across the UAE and to 195 countries, since 2008.</p>
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
