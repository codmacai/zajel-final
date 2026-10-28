'use client';

import { useState } from 'react';
import { apiFetch, ApiError } from '@/lib/api/client';
import { tokenStore } from '@/lib/auth/tokenStore';
import { getRecaptchaToken } from '@/lib/auth/recaptcha';
import { getDeviceId } from '@/lib/auth/deviceId';
import type { AuthResult, LoginPayload, SignupPayload, ForgotPasswordPayload } from '@/types/auth';

interface TokenResponse {
  accessToken: string;
  expiresAtUtc: string;
  email: string | null;
}

// Raw shape Zajel.ZAPP.API's Account/VerifyOtp actually returns (passed through unchanged by
// our backend — see AuthService.VerifyOtpAsync). Deliberately NOT the same shape as
// TokenResponse above: this is a different issuer/signer entirely (its own JWT), and the
// unregistered-phone case has a structurally different, smaller shape (no refreshToken/
// expiresAt/tokenType, and `user` only has `phone` instead of the full profile fields).
interface VerifyOtpApiResponse {
  token: string;
  expiresAt?: string;
  user?: { userId?: string; phoneNumber?: string; phone?: string; firstName?: string; lastName?: string };
  isRegistered: boolean;
  message?: string;
}

/**
 * Auth hook wired to the real Zajel.PrePaid.Api endpoints (ported from
 * zajel_site_new_angular's AuthService — same endpoints, same TokenResponse shape).
 */
export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginPayload): Promise<AuthResult> => {
    return runWithLoadingState(async () => {
      const response = await apiFetch('/api/auth/login', {
        method: 'POST',
        skipAuthRetry: true,
        body: JSON.stringify({ email: payload.email, password: payload.password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await parseTokenResponse(response, 'Invalid email or password.');
      tokenStore.set(data);
      return { success: true };
    }, setLoading, setError, 'Invalid email or password.');
  };

  const signup = async (payload: SignupPayload): Promise<AuthResult> => {
    return runWithLoadingState(async () => {
      const response = await apiFetch('/api/auth/register', {
        method: 'POST',
        skipAuthRetry: true,
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          displayName: `${payload.firstName} ${payload.lastName}`.trim(),
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await parseTokenResponse(response, 'Registration failed. Please try again.');
      tokenStore.set(data);
      return { success: true };
    }, setLoading, setError, 'Registration failed. Please try again.');
  };

  const forgotPassword = async (payload: ForgotPasswordPayload): Promise<AuthResult> => {
    return runWithLoadingState(async () => {
      const response = await apiFetch('/api/auth/forgot-password', {
        method: 'POST',
        skipAuthRetry: true,
        body: JSON.stringify({ email: payload.email }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }
      return { success: true, message: 'If an account exists for that email, a reset link is on its way.' };
    }, setLoading, setError, 'Something went wrong. Please try again.');
  };

  /**
   * POST /api/auth/otp/request — the backend must proxy this to the real
   * Account/RequestOtp endpoint server-side (that endpoint needs an X-AUTH-API-KEY that must
   * never ship in browser JS). We only ever obtain the reCAPTCHA token client-side and hand it
   * to our own backend as X-Recaptcha-Token equivalent — the backend forwards it on.
   */
  const requestOtp = async (phone: string): Promise<AuthResult> => {
    return runWithLoadingState(async () => {
      const recaptchaToken = await getRecaptchaToken('otp_request');
      const response = await apiFetch('/api/auth/otp/request', {
        method: 'POST',
        skipAuthRetry: true,
        body: JSON.stringify({ phone, recaptchaToken }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error("Couldn't send the verification code. Check the number and try again.");
      }
      return { success: true };
    }, setLoading, setError, "Couldn't send the verification code. Check the number and try again.");
  };

  /**
   * POST /api/auth/otp/verify — our backend passes Zajel.ZAPP.API's Account/VerifyOtp
   * response straight through unchanged (see AuthService.VerifyOtpAsync). That token is
   * signed by Zajel.ZAPP.API itself, not our own Zajel.PrePaid.Api — we store it as-is and
   * send it back as the bearer token on every subsequent call; our backend validates it via
   * a second "ZajelJwt" scheme (see Program.cs) rather than re-wrapping it in our own JWT.
   *
   * Two distinct outcomes, both HTTP 200 from the real API:
   *  - isRegistered: true  -> a real session (token/expiresAt/full user profile).
   *  - isRegistered: false -> the OTP itself was valid, but there's no account for this phone
   *    yet — `token` is empty (no usable session). We still record the phone so the UI can
   *    show a "finish your profile" state instead of treating this as a failed login.
   */
  const verifyOtp = async (phone: string, code: string): Promise<AuthResult> => {
    return runWithLoadingState(async () => {
      const response = await apiFetch('/api/auth/otp/verify', {
        method: 'POST',
        skipAuthRetry: true,
        body: JSON.stringify({ phone, code, deviceId: getDeviceId() }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = (await response.json().catch(() => null)) as VerifyOtpApiResponse | null;
      if (!response.ok) {
        throw new Error(data?.message || 'That code is invalid or expired. Please try again.');
      }
      if (!data) {
        throw new Error('That code is invalid or expired. Please try again.');
      }

      if (data.isRegistered && data.token) {
        tokenStore.set({
          accessToken: data.token,
          expiresAtUtc: data.expiresAt ?? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          email: null,
          phone: data.user?.phoneNumber ?? phone,
          firstName: data.user?.firstName ?? null,
          lastName: data.user?.lastName ?? null,
          isRegistered: true,
        });
        return { success: true };
      }

      // Verified, but no account yet — not a real session (no accessToken), but worth
      // remembering so the UI can prompt profile completion instead of showing "signed out".
      tokenStore.set({
        accessToken: '',
        expiresAtUtc: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        email: null,
        phone: data.user?.phone ?? data.user?.phoneNumber ?? phone,
        isRegistered: false,
      });
      return { success: true, message: 'pending-registration' };
    }, setLoading, setError, 'That code is invalid or expired. Please try again.');
  };

  // Google/Apple sign-in needs their JS SDKs wired up to obtain an idToken to exchange with
  // /api/auth/google/exchange (/apple/exchange) — that SDK integration doesn't exist in this
  // project yet, so this is left as an honest "not available" rather than faking success.
  const loginWithProvider = async (provider: 'google' | 'apple'): Promise<AuthResult> => {
    const providerLabel = provider === 'google' ? 'Google' : 'Apple';
    const message = `${providerLabel} sign-in isn't set up yet — please use email/password for now.`;
    setError(message);
    return { success: false, message };
  };

  return { login, signup, forgotPassword, requestOtp, verifyOtp, loginWithProvider, loading, error, setError };
}

async function parseTokenResponse(response: Response, fallbackMessage: string): Promise<TokenResponse> {
  if (!response.ok) {
    throw new Error(fallbackMessage);
  }
  return (await response.json()) as TokenResponse;
}

async function runWithLoadingState(
  action: () => Promise<AuthResult>,
  setLoading: (value: boolean) => void,
  setError: (value: string | null) => void,
  fallbackMessage: string,
): Promise<AuthResult> {
  setLoading(true);
  setError(null);
  try {
    return await action();
  } catch (err) {
    const message = describeError(err, fallbackMessage);
    setError(message);
    return { success: false, message };
  } finally {
    setLoading(false);
  }
}

function describeError(err: unknown, fallbackMessage: string): string {
  if (err instanceof ApiError) return err.message || fallbackMessage;
  if (err instanceof Error) return err.message || fallbackMessage;
  return fallbackMessage;
}
