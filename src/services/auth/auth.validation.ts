
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

  // Password validation - let Supabase handle all password security including leaked passwords
  const passwordValid = password && password.length > 0;
  if (!passwordValid) {
    errors.push("Adgangskode er påkrævet");
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
  return input.trim()
    .replace(/[<>&"']/g, (match) => {
      const htmlEntities: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#39;'
      };
      return htmlEntities[match] || match;
    })
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '');
}

export function validateInput(input: string, maxLength: number = 255): {
  isValid: boolean;
  sanitized: string;
  error?: string;
} {
  if (!input || input.trim().length === 0) {
    return { isValid: false, sanitized: '', error: 'Input er påkrævet' };
  }
  
  if (input.length > maxLength) {
    return { isValid: false, sanitized: '', error: `Input må ikke være længere end ${maxLength} tegn` };
  }
  
  const sanitized = sanitizeInput(input);
  return { isValid: true, sanitized };
}
