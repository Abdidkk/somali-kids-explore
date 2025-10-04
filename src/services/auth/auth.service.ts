
/**
 * Core Authentication Service
 * Handles the main authentication operations
 */

import { supabase } from "@/integrations/supabase/client";
import { AuthCredentials, AuthResult } from "./auth.types";
import { validateAuthCredentials } from "./auth.validation";

class AuthService {
  private getRedirectUrl(path: string = '/dashboard'): string {
    return `${window.location.origin}${path}`;
  }

  async signUp({ email, password, name }: AuthCredentials): Promise<AuthResult> {
    try {
      // Validate inputs using centralized validation
      const validation = validateAuthCredentials({ email, password, name });
      if (!validation.isValid) {
        return { success: false, error: validation.error };
      }

      // Perform signup with minimal configuration to enable leaked password protection
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: this.getRedirectUrl('/choose-plan'),
          data: name ? { name: name.trim() } : undefined
        }
      });

      if (error) {
        console.error('Signup error:', error);
        return this.handleAuthError(error);
      }

      if (data.user && !data.session) {
        return { 
          success: true, 
          requiresConfirmation: true 
        };
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected signup error:', error);
      return { success: false, error: "Der opstod en uventet fejl" };
    }
  }

  async signIn({ email, password }: AuthCredentials): Promise<AuthResult> {
    try {
      const validation = validateAuthCredentials({ email, password });
      if (!validation.isValid) {
        return { success: false, error: validation.error };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) {
        console.error('Signin error:', error);
        return this.handleAuthError(error);
      }

      if (!data.session) {
        return { success: false, error: "Login mislykkedes. Prøv igen." };
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected signin error:', error);
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
        console.error(`${provider} signin error:`, error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error(`Unexpected ${provider} signin error:`, error);
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
      console.error('Unexpected signout error:', error);
      return { success: false, error: "Der opstod en fejl ved logud" };
    }
  }

  async resetPassword(email: string): Promise<AuthResult> {
    try {
      const validation = validateAuthCredentials({ email, password: 'dummy' });
      if (!validation.emailValid) {
        return { success: false, error: "Indtast en gyldig email adresse" };
      }

      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        {
          redirectTo: 'https://jednyqvexkcrwxubxici.supabase.co/auth/v1/verify'
        }
      );

      if (error) {
        console.error('Reset password error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected reset password error:', error);
      return { success: false, error: "Der opstod en fejl ved nulstilling af adgangskode" };
    }
  }

  async updatePassword(newPassword: string): Promise<AuthResult> {
    try {
      const validation = validateAuthCredentials({ email: 'dummy@example.com', password: newPassword });
      if (!validation.passwordValid) {
        return { success: false, error: validation.error };
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        console.error('Update password error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected update password error:', error);
      return { success: false, error: "Der opstod en fejl ved opdatering af adgangskode" };
    }
  }

  private handleAuthError(error: any): AuthResult {
    if (error.message?.includes('User already registered')) {
      return { success: false, error: "Bruger findes allerede. Prøv at logge ind i stedet." };
    }
    if (error.message?.includes('Invalid login credentials')) {
      return { success: false, error: "Forkert email eller adgangskode" };
    }
    if (error.message?.includes('Email not confirmed')) {
      return { success: false, error: "Email ikke bekræftet. Tjek din indbakke." };
    }
    return { success: false, error: error.message };
  }
}

export const authService = new AuthService();
