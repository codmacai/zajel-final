'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Building2, Loader2, Phone, Search, ShieldCheck } from 'lucide-react';
import { useAuthContext } from '@/components/providers/AuthProvider';
import { getSafeReturnUrl } from '@/lib/auth/returnUrl';
import OtpLoginForm from './OtpLoginForm';

const EASE = [0.22, 1, 0.36, 1] as const;

const ACTIONS = [
  {
    Icon: Search,
    title: 'Track a shipment',
    description: 'No sign-in needed — use the AWB from your receipt or SMS.',
    href: '/track',
  },
  {
    Icon: Building2,
    title: 'Business account',
    description: 'Contract rates, invoicing and a dedicated account manager.',
    href: '/business-solutions',
  },
] as const;

const card = 'rounded-[1.25rem] border border-[#E5EBE7] bg-white shadow-[0_8px_30px_rgba(6,68,35,0.04)] sm:rounded-[1.75rem]';

export default function LoginView() {
  const { ready, isAuthenticated, isPendingRegistration } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const signedIn = isAuthenticated || isPendingRegistration;

  // Already signed in (or just finished OTP) — go straight to wherever they were heading.
  useEffect(() => {
    if (ready && signedIn) router.replace(getSafeReturnUrl(searchParams));
  }, [ready, signedIn, router, searchParams]);

  return (
    <div className="mx-auto w-full max-w-[1000px]">
      <div className="mx-auto max-w-[560px] text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-[#36B936] sm:text-sm">Zajel account</p>
        <h1 className="mt-3 text-[28px] font-medium leading-tight tracking-tight text-[#064423] sm:text-4xl md:text-[44px]">
          Sign in to Zajel
        </h1>
        <p className="mx-auto mt-4 max-w-[480px] text-[14px] leading-relaxed text-[#064423]/65 sm:text-[15px]">
          Book shipments, save addresses and see your shipment history. New to Zajel? The same code gets you started.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`${card} mx-auto mt-10 w-full max-w-[460px] p-5 sm:mt-12 sm:p-8`}
      >
        {ready && signedIn ? (
          <div className="flex items-center justify-center py-10" aria-busy="true">
            <Loader2 className="h-6 w-6 animate-spin text-[#36B936]" aria-label="Signing you in" />
          </div>
        ) : (
          <OtpLoginForm />
        )}
        <p className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-[#9CA3AF] sm:text-[12px]">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Protected by reCAPTCHA. We never share your number.
        </p>
      </motion.div>

      <div className="mx-auto mt-8 grid max-w-[700px] grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2">
        {ACTIONS.map(({ Icon, title, description, href }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-start gap-4 rounded-2xl border border-[#E5EBE7] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#36B936]/60"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#36B936]/10 text-[#36B936]">
              <Icon size={18} strokeWidth={1.8} aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-[15px] font-medium text-[#064423]">{title}</span>
              <span className="mt-1 block text-[13px] leading-relaxed text-[#064423]/60">{description}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="mx-auto mt-6 flex max-w-[700px] flex-col items-center justify-center gap-3 rounded-2xl bg-[#F4F8F5] px-6 py-5 text-center sm:flex-row sm:gap-5 sm:text-left">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#36B936]">
          <Phone size={18} strokeWidth={1.8} aria-hidden />
        </span>
        <p className="text-[14px] text-[#064423]/75">
          Trouble signing in? Call{' '}
          <a href="tel:+971600531111" className="font-medium text-[#064423] underline-offset-4 hover:underline">
            600 53 1111
          </a>{' '}
          or{' '}
          <Link href="/support" className="font-medium text-[#064423] underline-offset-4 hover:underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
