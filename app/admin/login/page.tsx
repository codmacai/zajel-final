import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdmin, safeNext } from '@/lib/cms/auth';
import { cmsConfigured } from '@/lib/cms/config';
import LoginForm from '@/components/cms/admin/LoginForm';
import { BIRD, ZajelBird, ZajelLogotype } from '@/components/cms/admin/Brand';

export const metadata: Metadata = { title: 'Sign in' };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeNext((await searchParams).next);
  if (await getAdmin()) redirect(next);
  return (
    <div className="c-login">
      <aside className="c-login-art">
        <div className="c-login-aurora" aria-hidden="true"><i /><i /><i /></div>
        <svg className="c-login-glow" viewBox="890 402 232 236" aria-hidden="true">
          <path d={BIRD} fill="#4fe05a" />
        </svg>
        <svg className="c-login-bird" viewBox="890 402 232 236" aria-hidden="true">
          <defs>
            <linearGradient id="loginBird" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.34" />
              <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="loginBirdEdge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={BIRD} fill="url(#loginBird)" stroke="url(#loginBirdEdge)" strokeWidth="0.6" />
        </svg>
        <div className="c-login-frame" aria-hidden="true" />
        <div className="c-login-copy">
          <h2>Intelligent Movement,<span>Nationwide and Beyond</span></h2>
          <div className="c-login-rule" aria-hidden="true" />
          <p>Across the UAE and to 195 countries, since 2008.</p>
        </div>
        <div className="c-login-foot">
          <ZajelLogotype height={34} inverse />
          <span>© {new Date().getFullYear()} ZAJEL Courier Services · Dubai · Abu Dhabi</span>
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
