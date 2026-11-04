import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdmin, safeNext } from '@/lib/cms/auth';
import { cmsConfigured } from '@/lib/cms/config';
import LoginForm from '@/components/cms/admin/LoginForm';

export const metadata: Metadata = { title: 'Sign in' };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeNext((await searchParams).next);
  if (await getAdmin()) redirect(next);
  return (
    <div className="c-login">
      <aside className="c-login-art">
        <div className="c-mark" aria-hidden="true">z</div>
        <div>
          <h2>Everything on zajel.com, in one place.</h2>
          <p>Edit the text, images and Arabic of every page. Changes go live in seconds.</p>
        </div>
        <small>Zajel CMS</small>
      </aside>
      <main className="c-login-form">
        <div className="c-login-box">
          <h1>Sign in</h1>
          <p>Use the email and password your admin set up for you.</p>
          <LoginForm next={next} configured={cmsConfigured} />
          <p className="foot">Forgotten your password? Ask an admin to reset it in Supabase.</p>
        </div>
      </main>
    </div>
  );
}
