import { createContext, useContext } from "react";
import { authService } from "@/services/auth/auth.service";
import { useAuthState, UserState } from "@/hooks/auth/useAuthState";
import { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  userState: UserState;
  refreshUserState: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, session, loading, userState, refreshUserState } = useAuthState();

  const signOut = async () => {
    const result = await authService.signOut();
    if (result.success) {
      // The auth state will be updated automatically by the onAuthStateChange listener
      await refreshUserState();
    } else {
      console.error('Signout error:', result.error);
      // Still refresh state to ensure consistency
      await refreshUserState();
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      signOut, 
      userState,
      refreshUserState
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}