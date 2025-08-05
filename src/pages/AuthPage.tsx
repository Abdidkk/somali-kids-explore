
/**
 * Unified Authentication Page
 * Handles both login and signup in a single, streamlined interface
 */

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import SomaliFlag from "@/components/landing/SomaliFlag";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AuthForm } from "@/components/auth/AuthForm";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";

const HERO_BLUE = "#4CA6FE";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
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
            
            <AuthForm mode="login" />
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
            
            <AuthForm mode="signup" />
          </TabsContent>
        </Tabs>
        
        <div className="my-7 flex items-center justify-center">
          <span className="h-px bg-gray-200 w-1/5" />
          <span className="mx-3 text-gray-400 text-xs">eller fortsæt med</span>
          <span className="h-px bg-gray-200 w-1/5" />
        </div>
        
        <SocialAuthButtons mode={activeTab as 'login' | 'signup'} />
      </div>
    </div>
  );
}
