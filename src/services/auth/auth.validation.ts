
/**
 * Authentication Validation
 * Simplified validation to work optimally with Supabase's leaked password protection
 */

import { AuthCredentials, ValidationResult } from "./auth.types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAuthCredentials({ email, password, name }: AuthCredentials): ValidationResult {
  const errors: string[] = [];
  
  // Email validation
  const emailValid = EMAIL_REGEX.test(email?.trim() || '');
  if (!emailValid) {
    errors.push("Indtast en gyldig email adresse");
  }

  // Password validation - minimal requirements to let Supabase handle security
  const passwordValid = password && password.length >= 6;
  if (!passwordValid) {
    errors.push("Adgangskode skal være mindst 6 tegn");
  }

  // Name validation (optional)
  const nameValid = !name || (name.trim().length >= 2 && name.trim().length <= 50);
  if (name && !nameValid) {
    errors.push("Navn skal være mellem 2 og 50 tegn");
  }

  const isValid = emailValid && passwordValid && nameValid;

  return {
    isValid,
    emailValid,
    passwordValid,
    nameValid,
    error: errors.length > 0 ? errors[0] : undefined,
    errors
  };
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}
