export type AuthView = 'login' | 'signup' | 'forgot';

export type AccountType = 'individual' | 'business';

export interface LoginPayload {
  email: string;
  password: string;
  remember: boolean;
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  accountType: AccountType;
  agreeToTerms: boolean;
}

export interface ForgotPasswordPayload {
  email: string;
}

/** Backs the OTP login flow — POST /api/auth/otp/request then /api/auth/otp/verify. */
export interface RequestOtpPayload {
  phone: string;
}

export interface VerifyOtpPayload {
  phone: string;
  code: string;
}

/** Shape returned by the auth hook — matches what most API clients (Supabase, custom REST) resolve to. */
export interface AuthResult {
  success: boolean;
  message?: string;
}
