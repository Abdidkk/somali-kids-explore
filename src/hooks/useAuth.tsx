import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  userState: 'loading' | 'unauthenticated' | 'authenticated' | 'needs_payment' | 'paid' | 'onboarding';
  refreshUserState: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userState, setUserState] = useState<'loading' | 'unauthenticated' | 'authenticated' | 'needs_payment' | 'paid' | 'onboarding'>('loading');

  const determineUserState = async (currentUser: User | null, currentSession: Session | null) => {
    if (!currentUser) {
      setUserState('unauthenticated');
      return;
    }

    setUserState('authenticated');

    // Check subscription status with proper session validation
    const checkUserState = async (retries = 2) => {
      try {
        // Use current session or get fresh one
        let sessionToUse = currentSession;
        if (!sessionToUse?.access_token) {
          const { data: { session: freshSession } } = await supabase.auth.getSession();
          sessionToUse = freshSession;
        }

        if (!sessionToUse?.access_token) {
          console.log('No valid session, defaulting to needs_payment');
          setUserState('needs_payment');
          return;
        }

        // Check subscription with exponential backoff for rate limits
        const { data: subscriptionData, error } = await supabase.functions.invoke('check-subscription', {
          headers: { Authorization: `Bearer ${sessionToUse.access_token}` }
        });

        if (error) {
          console.error('Subscription check error:', error);
          if (retries > 0 && (error.message?.includes('rate limit') || error.message?.includes('Rate limit'))) {
            // Wait longer for rate limit errors
            setTimeout(() => checkUserState(retries - 1), 2000 * (3 - retries));
            return;
          }
          setUserState('needs_payment');
          return;
        }

        if (subscriptionData?.subscribed) {
          // Check if user has children profiles
          const { data: childrenData } = await supabase
            .from('child_profiles')
            .select('id')
            .eq('parent_user_id', currentUser.id)
            .limit(1);

          if (childrenData && childrenData.length > 0) {
            setUserState('paid');
          } else {
            setUserState('onboarding');
          }
        } else {
          setUserState('needs_payment');
        }
      } catch (error) {
        console.error('Error determining user state:', error);
        if (retries > 0) {
          setTimeout(() => checkUserState(retries - 1), 1000);
        } else {
          setUserState('needs_payment');
        }
      }
    };

    // Delay to avoid immediate calls during auth state changes
    setTimeout(() => checkUserState(), 500);
  };

  const refreshUserState = async () => {
    // Ensure we get a fresh session before checking user state
    const { data: { session: freshSession } } = await supabase.auth.getSession();
    setSession(freshSession);
    setUser(freshSession?.user ?? null);
    await determineUserState(freshSession?.user ?? null, freshSession);
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          // Defer profile creation to prevent deadlocks
          setTimeout(() => {
            ensureUserProfile(newSession.user);
          }, 0);
        }
        
        await determineUserState(newSession?.user ?? null, newSession);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      if (initialSession?.user) {
        await ensureUserProfile(initialSession.user);
      }
      await determineUserState(initialSession?.user ?? null, initialSession);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const ensureUserProfile = async (user: User) => {
    try {
      // Check if user exists in our users table
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();

      if (fetchError) {
        console.error('Error checking user profile:', fetchError);
        return;
      }

      // If user doesn't exist, create profile
      if (!existingUser) {
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email || '',
            name: user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Bruger'
          });

        if (insertError) {
          console.error('Error creating user profile:', insertError);
        }
      }
    } catch (error) {
      console.error('Error in ensureUserProfile:', error);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error && error.message !== 'Auth session missing!') {
        console.error('Error signing out:', error);
        throw error;
      }
      // Clear local state regardless of server response
      setUser(null);
      setSession(null);
      setUserState('unauthenticated');
    } catch (error) {
      console.error('Error in signOut:', error);
      // Clear local state even if signOut fails
      setUser(null);
      setSession(null);
      setUserState('unauthenticated');
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