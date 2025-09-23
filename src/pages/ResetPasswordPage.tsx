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
import SomaliFlag from "@/components/landing/SomaliFlag";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const { loading, handleResetPassword, handleUpdatePassword } = useAuthOperations();
  
  // Check if this is a password update flow (has access_token and type=recovery)
  const accessToken = searchParams.get('access_token');
  const type = searchParams.get('type');
  const isPasswordUpdate = accessToken && type === 'recovery';
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailSent, setEmailSent] = useState(false);

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

  const handleNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Adgangskoderne stemmer ikke overens');
      return;
    }
    
    if (password.length < 6) {
      alert('Adgangskoden skal være mindst 6 tegn');
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
                Indtast din nye adgangskode nedenfor
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                  />
                </div>
                
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-blue-500 hover:bg-blue-600 transition"
                >
                  {loading ? "Opdaterer..." : "Opdater adgangskode"}
                </Button>
              </form>
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