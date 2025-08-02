
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, Facebook } from "lucide-react";
import SomaliFlag from "@/components/landing/SomaliFlag";
import { Link, useNavigate } from "react-router-dom";
import SocialLoginButton from "@/components/SocialLoginButton";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { validatePassword, validateEmail } from "@/utils/validation";

const HERO_BLUE = "#4CA6FE";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    if (newPassword) {
      const validation = validatePassword(newPassword);
      setPasswordErrors(validation.errors);
    } else {
      setPasswordErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!validateEmail(email)) {
      toast.error("Indtast en gyldig email adresse");
      return;
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      toast.error("Adgangskoden opfylder ikke kravene");
      setPasswordErrors(passwordValidation.errors);
      return;
    }

    // Validate name
    if (name.trim().length < 2) {
      toast.error("Indtast dit fulde navn");
      return;
    }

    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/choose-plan`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: name
          }
        }
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Bekræftelsesmail sendt! Tjek din indbakke.");
        navigate('/choose-plan');
      }
    } catch (error) {
      toast.error("Der opstod en fejl ved oprettelse af konto");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/choose-plan`
        }
      });
      
      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("Der opstod en fejl ved Google signup");
    }
  };

  const handleFacebookSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/choose-plan`
        }
      });
      
      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("Der opstod en fejl ved Facebook signup");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 via-white to-white px-4 py-12 animate-fade-in">
      <div className="absolute left-0 top-0 mt-6 ml-6 z-10">
        <SomaliFlag className="w-8 h-8" />
      </div>
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl px-8 py-9 border border-blue-100 relative">
        <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: HERO_BLUE }}>Opret Bruger</h1>
        <p className="mb-7 text-base text-gray-500 text-center">Lav en ny konto for at få adgang til Dugsi.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <User size={20} className="text-gray-400" />
              <span className="text-base font-medium">Navn</span>
            </div>
            <Input
              type="text"
              placeholder="Dit navn"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={handlePasswordChange}
              className="bg-blue-50 focus:bg-white"
              autoComplete="new-password"
            />
            {passwordErrors.length > 0 && (
              <div className="mt-2 text-xs text-red-600 space-y-1">
                <p className="font-medium">Adgangskoden skal indeholde:</p>
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
            {loading ? "Opretter konto..." : (<><User className="mr-2" />Opret konto</>)}
          </Button>
        </form>
        <div className="my-7 flex items-center justify-center">
          <span className="h-px bg-gray-200 w-1/5" />
          <span className="mx-3 text-gray-400 text-xs">eller fortsæt med</span>
          <span className="h-px bg-gray-200 w-1/5" />
        </div>
        <div className="flex flex-col gap-3 mb-2">
          <SocialLoginButton
            icon={Mail}
            label="Fortsæt med Gmail"
            colorClass="border-[#ea384c] text-[#ea384c] hover:border-[#d32e22]/90"
            onClick={handleGoogleSignup}
          />
          <SocialLoginButton
            icon={Facebook}
            label="Fortsæt med Facebook"
            colorClass="border-[#1877f3] text-[#1877f3] hover:border-[#1557b8]/90"
            onClick={handleFacebookSignup}
          />
        </div>
        <div className="mt-3 flex flex-col items-center space-y-1">
          <span className="text-xs text-gray-400">Har du allerede en konto?</span>
          <Link to="/login" className="text-sm text-[#4CA6FE] hover:underline">
            Log ind
          </Link>
        </div>
      </div>
    </div>
  );
}
