'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2, Phone } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { validateOtpCode, validateOtpPhone } from '@/lib/validation';
import { getSafeReturnUrl } from '@/lib/auth/returnUrl';
import OtpCodeInput from './OtpCodeInput';

const RESEND_COOLDOWN_SECONDS = 30;
// +971 5XXXXXXXX is the longest valid form we accept.
const PHONE_MAX_LENGTH = 13;
const EASE = [0.22, 1, 0.36, 1] as const;

type OtpStage = 'phone' | 'code';

const primaryButton =
  'inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#36B936] px-7 text-[14px] font-medium text-white ' +
  'outline-none transition-all duration-300 hover:bg-[#2EA32E] active:scale-[0.99] ' +
  'focus-visible:ring-2 focus-visible:ring-[#064423] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70';

/**
 * Phone + OTP is the only way in (same as the React app): RequestOtp/VerifyOtp handle a
 * returning and a brand-new number the same way. VerifyOtp tells us whether the number is
 * registered (full session) or not (routed to /account to finish the profile).
 */
export default function OtpLoginForm() {
  const { requestOtp, verifyOtp, loading, error, setError } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [stage, setStage] = useState<OtpStage>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const cooldownTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (cooldownTimer.current) clearInterval(cooldownTimer.current);
    };
  }, []);

  const startCooldown = () => {
    setCooldown(RESEND_COOLDOWN_SECONDS);
    if (cooldownTimer.current) clearInterval(cooldownTimer.current);
    cooldownTimer.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1 && cooldownTimer.current) clearInterval(cooldownTimer.current);
        return Math.max(0, prev - 1);
      });
    }, 1000);
  };

  const handleRequestOtp = async (e: FormEvent) => {
    e.preventDefault();
    const validationError = validateOtpPhone(phone);
    if (validationError) {
      setError(validationError);
      return;
    }
    const result = await requestOtp(phone);
    if (result.success) {
      setStage('code');
      setCode('');
      startCooldown();
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || loading) return;
    const result = await requestOtp(phone);
    if (result.success) startCooldown();
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    const validationError = validateOtpCode(code);
    if (validationError) {
      setError(validationError);
      return;
    }
    const result = await verifyOtp(phone, code);
    if (result.success) {
      router.replace(getSafeReturnUrl(searchParams));
    }
  };

  const editPhone = () => {
    setStage('phone');
    setCode('');
    setError(null);
    if (cooldownTimer.current) clearInterval(cooldownTimer.current);
    setCooldown(0);
  };

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl font-medium tracking-tight text-[#064423] sm:text-2xl">
          {stage === 'phone' ? "Let's get you in" : 'Check your messages'}
        </h2>
        <p className="mt-1 text-[13px] text-[#064423]/60 sm:text-[14px]">
          {stage === 'phone' ? "Enter your UAE mobile number and we'll text you a one-time code." : `Enter the 6-digit code we sent to ${phone}.`}
        </p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {stage === 'phone' ? (
          <motion.form
            key="phone"
            onSubmit={handleRequestOtp}
            noValidate
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col">
              <label htmlFor="otp-phone" className="mx-1 mb-2 text-[12px] text-[#064423] sm:text-[13px]">
                Mobile number
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#064423]/40" aria-hidden="true" />
                <input
                  id="otp-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="05X XXX XXXX"
                  value={phone}
                  maxLength={PHONE_MAX_LENGTH}
                  aria-invalid={!!error}
                  aria-describedby={error ? 'otp-error' : undefined}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d+]/g, '').slice(0, PHONE_MAX_LENGTH))}
                  className={`h-12 w-full rounded-[12px] border bg-white pl-10 pr-4 text-[14px] text-[#064423] outline-none transition-all placeholder:text-gray-400 focus:border-[#36B936] focus:ring-1 focus:ring-[#36B936] sm:rounded-[14px] ${
                    error ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
              </div>
            </div>

            {error && (
              <p id="otp-error" role="alert" className="mx-1 text-[12px] text-red-600">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className={primaryButton}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending code…
                </>
              ) : (
                <>
                  Send code <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.form
            key="code"
            onSubmit={handleVerifyOtp}
            noValidate
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col">
              <span className="mx-1 mb-2 text-[12px] text-[#064423] sm:text-[13px]">Verification code</span>
              <OtpCodeInput value={code} onChange={setCode} autoFocus invalid={!!error} />
            </div>

            <div className="flex items-center justify-between text-[13px]">
              <button
                type="button"
                onClick={editPhone}
                className="inline-flex items-center gap-1.5 rounded-full px-1 py-1 text-[#064423]/70 outline-none transition-colors hover:text-[#064423] focus-visible:ring-2 focus-visible:ring-[#36B936]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Change number
              </button>
              <button
                type="button"
                onClick={handleResend}
                disabled={cooldown > 0 || loading}
                className="rounded-full px-1 py-1 font-medium text-[#36B936] outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-[#36B936] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}
              </button>
            </div>

            {error && (
              <p role="alert" className="mx-1 text-[12px] text-red-600">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className={primaryButton}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Verifying…
                </>
              ) : (
                <>
                  Verify and continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
