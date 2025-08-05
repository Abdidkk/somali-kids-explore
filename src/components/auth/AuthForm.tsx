
/**
 * Authentication Form Component
 * Handles both login and signup forms
 */

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User } from "lucide-react";
import { useAuthOperations } from "@/hooks/auth/useAuthOperations";
import { validateAuthCredentials } from "@/services/auth/auth.validation";

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export function AuthForm({ mode }: AuthFormProps) {
  const { loading, handleSignUp, handleSignIn } = useAuthOperations();
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    if (mode === 'signup' && newPassword) {
      const validation = validateAuthCredentials({ 
        email: 'dummy@example.com', 
        password: newPassword 
      });
      setPasswordErrors(validation.errors.filter(error => 
        error.includes('Adgangskode')
      ));
    } else {
      setPasswordErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'signup') {
      await handleSignUp({ email, password, name });
    } else {
      await handleSignIn({ email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {mode === 'signup' && (
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
      )}
      
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
          minLength={6}
          value={password}
          onChange={handlePasswordChange}
          className="bg-blue-50 focus:bg-white"
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
        />
        {mode === 'signup' && passwordErrors.length > 0 && (
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
        {loading ? (
          mode === 'signup' ? "Opretter konto..." : "Logger ind..."
        ) : (
          mode === 'signup' ? "Opret konto" : "Log ind"
        )}
      </Button>
    </form>
  );
}
