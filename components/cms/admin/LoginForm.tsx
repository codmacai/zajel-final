'use client';

import { useActionState } from 'react';
import { CircleAlert, LoaderCircle } from 'lucide-react';
import { loginAction } from '@/app/admin/actions';

export default function LoginForm({ next, configured }: { next: string; configured: boolean }) {
  const [error, action, pending] = useActionState(loginAction, configured ? null : 'Sign-in is not available right now. Please try again later.');
  return (
    <form action={action}>
      <input type="hidden" name="next" value={next} />
      <label>
        Email
        <input className="c-input" type="email" name="email" autoComplete="username" required autoFocus />
      </label>
      <label>
        Password
        <input className="c-input" type="password" name="password" autoComplete="current-password" required />
      </label>
      {error && (
        <div className="c-error" role="alert">
          <CircleAlert aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
      <button className="c-btn primary block" type="submit" disabled={pending}>
        {pending ? <LoaderCircle className="c-spin" aria-hidden="true" /> : null}
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
