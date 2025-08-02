/**
 * Validation utility functions
 */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 6) {
    errors.push("Adgangskoden skal være mindst 6 tegn");
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

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}