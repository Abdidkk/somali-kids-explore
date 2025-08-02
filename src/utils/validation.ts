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

  if (password.length < 8) {
    errors.push("Adgangskoden skal være mindst 8 tegn");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Adgangskoden skal indeholde mindst ét lille bogstav");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Adgangskoden skal indeholde mindst ét stort bogstav");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Adgangskoden skal indeholde mindst ét tal");
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    errors.push("Adgangskoden skal indeholde mindst ét specialtegn");
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