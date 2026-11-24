export const isValidEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const isValidPassword = (value: string): boolean =>
  // Min 8 chars, at least one uppercase, one number, one symbol — matches the hint text shown on signup.
  /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value);

export function validateLogin(email: string, password: string): string | null {
  if (!email || !password) return 'Email and password are required.';
  if (!isValidEmail(email)) return 'Enter a valid email address.';
  return null;
}

export function validateSignup(fields: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}): string | null {
  const { firstName, lastName, email, password, confirmPassword, agreeToTerms } = fields;
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return 'Please fill in all required fields.';
  }
  if (!isValidEmail(email)) return 'Enter a valid email address.';
  if (!isValidPassword(password)) return 'Password must be 8+ characters with an uppercase letter, a number, and a symbol.';
  if (password !== confirmPassword) return 'Passwords do not match.';
  if (!agreeToTerms) return 'You must agree to the Terms of Service and Privacy Policy.';
  return null;
}

export function validateForgotPassword(email: string): string | null {
  if (!email) return 'Email is required.';
  if (!isValidEmail(email)) return 'Enter a valid email address.';
  return null;
}

// UAE-only for now — matches trackingApi.ts's normalizeUaePhoneNumber, which is the same
// constraint the real RequestOtp/VerifyOtp endpoints enforce.
export const isValidUaePhone = (value: string): boolean => /^(\+?971|0)?5\d{8}$/.test(value.trim());

export function validateOtpPhone(phone: string): string | null {
  if (!phone) return 'Phone number is required.';
  if (!isValidUaePhone(phone)) return 'Enter a valid UAE mobile number.';
  return null;
}

export function validateOtpCode(code: string): string | null {
  if (!code) return 'Enter the verification code.';
  if (!/^\d{4,8}$/.test(code.trim())) return 'Enter the code exactly as received.';
  return null;
}
