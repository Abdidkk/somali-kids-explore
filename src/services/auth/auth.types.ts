
/**
 * Authentication Types
 * Centralized type definitions for authentication
 */

export interface AuthCredentials {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  requiresConfirmation?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  emailValid: boolean;
  passwordValid: boolean;
  nameValid: boolean;
  error?: string;
  errors: string[];
}
