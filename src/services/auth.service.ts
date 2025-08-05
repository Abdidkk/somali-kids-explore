/**
 * Authentication Service
 * Centralized authentication logic for better maintainability
 */

import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { validateEmail, validatePassword } from "@/utils/validation";

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

class AuthService {
  private getRedirectUrl(path: string = '/dashboard'): string {
    return `${window.location.origin}${path}`;
  }

  async signUp({ email, password, name }: AuthCredentials): Promise<AuthResult> {
    try {
      // Validate inputs
      if (!validateEmail(email)) {
        return { success: false, error: "Indtast en gyldig email adresse" };
      }

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return { 
          success: false, 
          error: `Adgangskoden opfylder ikke kravene: ${passwordValidation.errors.join(', ')}` 
        };
      }

      if (name && name.trim().length < 2) {
        return { success: false, error: "Navn skal være mindst 2 tegn" };
      }

      // Perform signup
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: this.getRedirectUrl('/choose-plan'),
          data: name ? { name: name.trim() } : undefined
        }
      });

      if (error) {
        // Handle specific Supabase errors
        if (error.message?.includes('User already registered')) {
          return { success: false, error: "Bruger findes allerede. Prøv at logge ind i stedet." };
        }
        return { success: false, error: error.message };
      }

      if (data.user && !data.session) {
        return { 
          success: true, 
          requiresConfirmation: true 
        };
      }

      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: "Der opstod en uventet fejl" };
    }
  }

  async signIn({ email, password }: AuthCredentials): Promise<AuthResult> {
    try {
      if (!validateEmail(email)) {
        return { success: false, error: "Indtast en gyldig email adresse" };
      }

      if (!password || password.length < 6) {
        return { success: false, error: "Adgangskode skal være mindst 6 tegn" };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) {
        // Handle specific Supabase errors
        if (error.message?.includes('Invalid login credentials')) {
          return { success: false, error: "Forkert email eller adgangskode" };
        }
        if (error.message?.includes('Email not confirmed')) {
          return { success: false, error: "Email ikke bekræftet. Tjek din indbakke." };
        }
        return { success: false, error: error.message };
      }

      if (!data.session) {
        return { success: false, error: "Login mislykkedes. Prøv igen." };
      }

      return { success: true };
    } catch (error) {
      console.error('Signin error:', error);
      return { success: false, error: "Der opstod en uventet fejl" };
    }
  }

  async signInWithProvider(provider: 'google' | 'facebook', redirectPath: string = '/dashboard'): Promise<AuthResult> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: this.getRedirectUrl(redirectPath),
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error(`${provider} signin error:`, error);
      return { success: false, error: `Der opstod en fejl ved ${provider} login` };
    }
  }

  async signOut(): Promise<AuthResult> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error && error.message !== 'Auth session missing!') {
        console.error('Signout error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Signout error:', error);
      return { success: false, error: "Der opstod en fejl ved logud" };
    }
  }

  async resetPassword(email: string): Promise<AuthResult> {
    try {
      if (!validateEmail(email)) {
        return { success: false, error: "Indtast en gyldig email adresse" };
      }

      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        {
          redirectTo: this.getRedirectUrl('/reset-password')
        }
      );

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Reset password error:', error);
      return { success: false, error: "Der opstod en fejl ved nulstilling af adgangskode" };
    }
  }

  async updatePassword(newPassword: string): Promise<AuthResult> {
    try {
      const passwordValidation = validatePassword(newPassword);
      if (!passwordValidation.isValid) {
        return { 
          success: false, 
          error: `Adgangskoden opfylder ikke kravene: ${passwordValidation.errors.join(', ')}` 
        };
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Update password error:', error);
      return { success: false, error: "Der opstod en fejl ved opdatering af adgangskode" };
    }
  }
}

export const authService = new AuthService();