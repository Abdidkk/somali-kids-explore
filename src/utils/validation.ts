
/**
 * Validation utility functions
 * Simplified and optimized for Supabase integration
 */

export { validateAuthCredentials as validateEmail, sanitizeInput } from "@/services/auth/auth.validation";

// Legacy password validation - simplified for Supabase compatibility
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Minimal validation - let Supabase handle all password security including leaked passwords
  if (password.length === 0) {
    errors.push("Adgangskode er påkrævet");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateChildName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 50;
}

export function validateAge(age: number): boolean {
  return age >= 1 && age <= 18;
}
