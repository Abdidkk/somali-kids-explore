/**
 * Unified Authentication Page
 * Handles both login and signup in a single, streamlined interface
 */

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, User, Facebook, ArrowLeft } from "lucide-react";
import SomaliFlag from "@/components/landing/SomaliFlag";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SocialLoginButton from "@/components/SocialLoginButton";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { validatePassword } from "@/utils/validation";
import { authService } from "@/services/auth.service";

const HERO_BLUE = "#4CA6FE";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  // Check for tab parameter in URL
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'signup') {
      setActiveTab('signup');
    }
  }, [searchParams]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setSignupPassword(newPassword);
    
    if (newPassword) {
      const validation = validatePassword(newPassword);
      setPasswordErrors(validation.errors);
    } else {
      setPasswordErrors([]);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await authService.signIn({
        email: loginEmail,
        password: loginPassword
      });

      if (result.success) {
        toast.success("Velkommen tilbage!");
        navigate('/dashboard');
      } else {
        toast.error(result.error || "Der opstod en fejl ved login");
      }
    } catch (error) {
      toast.error("Der opstod en uventet fejl");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await authService.signUp({
        email: signupEmail,
        password: signupPassword,
        name: signupName
      });

      if (result.success) {
        if (result.requiresConfirmation) {
          toast.success("Bekræftelsesmail sendt! Tjek din indbakke.");
          navigate(`/email-confirmation?email=${encodeURIComponent(signupEmail)}`);
        } else {
          toast.success("Konto oprettet!");
          navigate('/choose-plan');
        }
      } else {
        toast.error(result.error || "Der opstod en fejl ved oprettelse af konto");
        if (result.error?.includes("kravene")) {
          const validation = validatePassword(signupPassword);
          setPasswordErrors(validation.errors);
        }
      }
    } catch (error) {
      toast.error("Der opstod en uventet fejl");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'facebook') => {
    const redirectPath = activeTab === 'signup' ? '/choose-plan' : '/dashboard';
    const result = await authService.signInWithProvider(provider, redirectPath);
    
    if (!result.success) {
      const providerName = provider === 'google' ? 'Google' : 'Facebook';
      toast.error(result.error || `Der opstod en fejl ved ${providerName} login`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 via-white to-white px-4 py-12 animate-fade-in">
      <div className="absolute left-0 top-0 mt-6 ml-6 z-10">
        <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
          <ArrowLeft size={20} />
          <SomaliFlag className="w-8 h-8" />
        </Link>
      </div>
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl px-8 py-9 border border-blue-100 relative">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Log Ind</TabsTrigger>
            <TabsTrigger value="signup">Opret Bruger</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2" style={{ color: HERO_BLUE }}>
                Velkommen tilbage
              </h1>
              <p className="text-base text-gray-500">
                Log ind for at fortsætte til Dugsi
              </p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Mail size={20} className="text-gray-400" />
                  <span className="text-base font-medium">Email</span>
                </div>
                <Input
                  type="email"
                  placeholder="din@email.dk"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="bg-blue-50 focus:bg-white"
                  autoComplete="email"
                />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Lock size={20} className="text-gray-400" />
                  <span className="text-base font-medium">Adgangskode</span>
                </div>
                <Input
                  type="password"
                  placeholder="●●●●●●●●"
                  required
                  minLength={6}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="bg-blue-50 focus:bg-white"
                  autoComplete="current-password"
                />
              </div>
              
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 transition"
              >
                {loading ? "Logger ind..." : "Log ind"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2" style={{ color: HERO_BLUE }}>
                Opret Bruger
              </h1>
              <p className="text-base text-gray-500">
                Lav en ny konto for at få adgang til Dugsi
              </p>
            </div>
            
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <User size={20} className="text-gray-400" />
                  <span className="text-base font-medium">Navn</span>
                </div>
                <Input
                  type="text"
                  placeholder="Dit navn"
                  required
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="bg-blue-50 focus:bg-white"
                  autoComplete="name"
                />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Mail size={20} className="text-gray-400" />
                  <span className="text-base font-medium">Email</span>
                </div>
                <Input
                  type="email"
                  placeholder="din@email.dk"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="bg-blue-50 focus:bg-white"
                  autoComplete="email"
                />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Lock size={20} className="text-gray-400" />
                  <span className="text-base font-medium">Adgangskode</span>
                </div>
                <Input
                  type="password"
                  placeholder="●●●●●●●●"
                  required
                  value={signupPassword}
                  onChange={handlePasswordChange}
                  className="bg-blue-50 focus:bg-white"
                  autoComplete="new-password"
                />
                {passwordErrors.length > 0 && (
                  <div className="mt-2 text-xs text-red-600 space-y-1">
                    <p className="font-medium">Adgangskoden skal opfylde:</p>
                    <ul className="list-disc list-inside space-y-0.5">
                      {passwordErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 transition"
              >
                {loading ? "Opretter konto..." : "Opret konto"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="my-7 flex items-center justify-center">
          <span className="h-px bg-gray-200 w-1/5" />
          <span className="mx-3 text-gray-400 text-xs">eller fortsæt med</span>
          <span className="h-px bg-gray-200 w-1/5" />
        </div>
        
        <div className="flex flex-col gap-3">
          <SocialLoginButton
            icon={Mail}
            label="Fortsæt med Gmail"
            colorClass="border-[#ea384c] text-[#ea384c] hover:border-[#d32e22]/90"
            onClick={() => handleSocialAuth('google')}
          />
          <SocialLoginButton
            icon={Facebook}
            label="Fortsæt med Facebook"
            colorClass="border-[#1877f3] text-[#1877f3] hover:border-[#1557b8]/90"
            onClick={() => handleSocialAuth('facebook')}
          />
        </div>
      </div>
    </div>
  );
}