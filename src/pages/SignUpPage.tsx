
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, LogIn, Facebook } from "lucide-react";
import SomaliFlag from "@/components/landing/SomaliFlag";
import { Link } from "react-router-dom";
import SocialLoginButton from "@/components/SocialLoginButton";

const HERO_BLUE = "#4CA6FE";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-purple-100 via-white to-white px-4 py-12 animate-fade-in">
      <div className="absolute left-0 top-0 mt-6 ml-6 z-10">
        <SomaliFlag className="w-8 h-8" />
      </div>
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl px-8 py-9 border border-purple-100 relative">
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
              className="bg-purple-50 focus:bg-white"
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
              className="bg-purple-50 focus:bg-white"
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
              className="bg-purple-50 focus:bg-white"
              autoComplete="new-password"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 transition"
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
          />
          <SocialLoginButton
            icon={Facebook}
            label="Fortsæt med Facebook"
            colorClass="border-[#1877f3] text-[#1877f3] hover:border-[#1557b8]/90"
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
