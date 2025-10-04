/**
 * Reset Password Page
 * Handles both forgot password request and new password setup
 */

import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { useAuthOperations } from "@/hooks/auth/useAuthOperations";
import { validateInput } from "@/services/auth/auth.validation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SomaliFlag from "@/components/landing/SomaliFlag";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const { loading, handleResetPassword, handleUpdatePassword } = useAuthOperations();
  
  // Helper function to get tokens from both query params and URL hash
  const getTokenFromUrl = (param: string): string | null => {
    // Check query params first (for custom redirects)
    const queryValue = searchParams.get(param);
    if (queryValue) return queryValue;
    
    // Check URL hash (for Supabase hosted flow)
    const hash = window.location.hash.substring(1); // Remove '#'
    const hashParams = new URLSearchParams(hash);
    return hashParams.get(param);
  };
  
  // Check if this is a password update flow (has access_token and type=recovery)
  const accessToken = getTokenFromUrl('access_token');
  const type = getTokenFromUrl('type');
  const isPasswordUpdate = accessToken && type === 'recovery';
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailValidation = validateInput(email, 255);
    if (!emailValidation.isValid) {
      alert(emailValidation.error || 'Ugyldig email');
      return;
    }

    const result = await handleResetPassword(emailValidation.sanitized);
    if (result.success) {
      setEmailSent(true);
    }
  };

  // Handle session establishment from URL parameters
  useEffect(() => {
    const establishSession = async () => {
      if (!isPasswordUpdate) return;
      
      setSessionLoading(true);
      
      try {
        const refreshToken = getTokenFromUrl('refresh_token');
        
        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (error) {
            console.error('Session establishment error:', error);
            toast.error('Linket er udløbet eller ugyldigt. Anmod om et nyt link.');
            return;
          }
          
          setSessionReady(true);
          toast.success('Klar til at opdatere adgangskode');
        } else {
          toast.error('Manglende tokens i URL. Anmod om et nyt link.');
        }
      } catch (error) {
        console.error('Session error:', error);
        toast.error('Der opstod en fejl. Prøv igen.');
      } finally {
        setSessionLoading(false);
      }
    };

    establishSession();
  }, [isPasswordUpdate, accessToken, searchParams]);

  const handleNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sessionReady) {
      toast.error('Vent venligst mens sessionen etableres...');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Adgangskoderne stemmer ikke overens');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Adgangskoden skal være mindst 6 tegn');
      return;
    }

    await handleUpdatePassword(password);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="p-4">
          <Link 
            to="/auth?tab=login" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <SomaliFlag />
            Tilbage til login
          </Link>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">E-mail sendt!</CardTitle>
              <CardDescription>
                Vi har sendt et link til nulstilling af din adgangskode til {email}. 
                Tjek din e-mail og følg instruktionerne.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Link 
                  to="/auth?tab=login"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Tilbage til login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isPasswordUpdate) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="p-4">
          <Link 
            to="/auth?tab=login" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <SomaliFlag />
            Tilbage til login
          </Link>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Ny adgangskode</CardTitle>
              <CardDescription>
                {sessionLoading ? "Forbereder session..." : "Indtast din nye adgangskode nedenfor"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sessionLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner size="lg" />
                </div>
              ) : (
                <form onSubmit={handleNewPassword} className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Lock size={20} className="text-gray-400" />
                      <span className="text-base font-medium">Ny adgangskode</span>
                    </div>
                    <Input
                      type="password"
                      placeholder="●●●●●●●●"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-blue-50 focus:bg-white"
                      autoComplete="new-password"
                      disabled={!sessionReady}
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Lock size={20} className="text-gray-400" />
                      <span className="text-base font-medium">Bekræft adgangskode</span>
                    </div>
                    <Input
                      type="password"
                      placeholder="●●●●●●●●"
                      required
                      minLength={6}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-blue-50 focus:bg-white"
                      autoComplete="new-password"
                      disabled={!sessionReady}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading || !sessionReady}
                    className="w-full bg-blue-500 hover:bg-blue-600 transition"
                  >
                    {loading ? "Opdaterer..." : sessionReady ? "Opdater adgangskode" : "Venter på session..."}
                  </Button>
                  
                  {!sessionReady && !sessionLoading && (
                    <p className="text-sm text-red-600 text-center">
                      Linket er muligvis udløbet. <Link to="/reset-password" className="underline">Anmod om nyt link</Link>
                    </p>
                  )}
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="p-4">
        <Link 
          to="/auth?tab=login" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft size={20} />
          <SomaliFlag />
          Tilbage til login
        </Link>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Glemt kodeord?</CardTitle>
            <CardDescription>
              Indtast din e-mail adresse, så sender vi dig et link til at nulstille din adgangskode.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Mail size={20} className="text-gray-400" />
                  <span className="text-base font-medium">E-mail</span>
                </div>
                <Input
                  type="email"
                  placeholder="din@email.dk"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-blue-50 focus:bg-white"
                  autoComplete="email"
                />
              </div>
              
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 transition"
              >
                {loading ? "Sender..." : "Send nulstillingslink"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}