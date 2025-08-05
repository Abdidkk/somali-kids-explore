
/**
 * Auth Operations Hook
 * Handles authentication operations with proper error handling
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authService } from "@/services/auth/auth.service";
import { AuthCredentials } from "@/services/auth/auth.types";

export function useAuthOperations() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async ({ email, password, name }: AuthCredentials) => {
    setLoading(true);
    try {
      const result = await authService.signUp({ email, password, name });

      if (result.success) {
        if (result.requiresConfirmation) {
          toast.success("Bekræftelsesmail sendt! Tjek din indbakke.");
          navigate(`/email-confirmation?email=${encodeURIComponent(email)}`);
        } else {
          toast.success("Konto oprettet!");
          navigate('/choose-plan');
        }
      } else {
        toast.error(result.error || "Der opstod en fejl ved oprettelse af konto");
      }

      return result;
    } catch (error) {
      console.error('SignUp operation error:', error);
      toast.error("Der opstod en uventet fejl");
      return { success: false, error: "Der opstod en uventet fejl" };
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async ({ email, password }: AuthCredentials) => {
    setLoading(true);
    try {
      const result = await authService.signIn({ email, password });

      if (result.success) {
        toast.success("Velkommen tilbage!");
        navigate('/dashboard');
      } else {
        toast.error(result.error || "Der opstod en fejl ved login");
      }

      return result;
    } catch (error) {
      console.error('SignIn operation error:', error);
      toast.error("Der opstod en uventet fejl");
      return { success: false, error: "Der opstod en uventet fejl" };
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'facebook', redirectPath?: string) => {
    try {
      const result = await authService.signInWithProvider(provider, redirectPath);
      
      if (!result.success) {
        const providerName = provider === 'google' ? 'Google' : 'Facebook';
        toast.error(result.error || `Der opstod en fejl ved ${providerName} login`);
      }

      return result;
    } catch (error) {
      console.error(`${provider} auth operation error:`, error);
      const providerName = provider === 'google' ? 'Google' : 'Facebook';
      toast.error(`Der opstod en fejl ved ${providerName} login`);
      return { success: false, error: `Der opstod en fejl ved ${providerName} login` };
    }
  };

  return {
    loading,
    handleSignUp,
    handleSignIn,
    handleSocialAuth
  };
}
