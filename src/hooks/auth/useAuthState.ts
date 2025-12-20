/**
 * Auth State Management Hook
 * Separated from useAuth for better modularity
 */

import { useState, useEffect, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type UserState = 'loading' | 'unauthenticated' | 'authenticated' | 'needs_payment' | 'paid' | 'onboarding'| 'subscription_expired';;

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userState: UserState;
}

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userState, setUserState] = useState<UserState>('loading');

  const determineUserState = useCallback(async (currentUser: User | null, currentSession: Session | null) => {
    if (!currentUser) {
      setUserState('unauthenticated');
      return;
    }

    setUserState('authenticated');

    // Check subscription status with proper error handling
    const checkSubscriptionStatus = async (retries = 2) => {
      try {
        // Ensure we have a valid session
        let validSession = currentSession;
        if (!validSession?.access_token) {
          const { data: { session: freshSession } } = await supabase.auth.getSession();
          validSession = freshSession;
        }

        if (!validSession?.access_token) {
          console.log('No valid session available, defaulting to needs_payment');
          setUserState('needs_payment');
          return;
        }

        // Check subscription with proper error handling and timeout
        try {
          const { data: subscriptionData, error } = await supabase.functions.invoke('check-subscription', {
            headers: { 
              Authorization: `Bearer ${validSession.access_token}`,
              'Content-Type': 'application/json'
            }
          });

          if (error) {
            console.error('Subscription check error:', error);
            // Handle rate limiting with exponential backoff
            if (retries > 0 && (error.message?.includes('rate limit') || error.message?.includes('Rate limit'))) {
              const delay = 2000 * (3 - retries);
              setTimeout(() => checkSubscriptionStatus(retries - 1), delay);
              return;
            }
            
            // Fallback to needs_payment state on error
            setUserState('needs_payment');
            return;
          }

          if (subscriptionData?.subscribed) {
            // Aktivt abonnement
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
            // IKKE aktivt - men tjek om det er udløbet vs. aldrig betalt
            const { data: childrenData } = await supabase
              .from('child_profiles')
              .select('id')
              .eq('parent_user_id', currentUser.id)
              .limit(1);
          
            // Hvis bruger har børneprofiler, har de været betalende kunde før
            if (childrenData && childrenData.length > 0) {
              setUserState('subscription_expired');  // ⬅️ NY STATE
            } else {
              setUserState('needs_payment');  // Aldrig betalt
            }
          }
        } catch (subscriptionError) {
          console.error('Subscription check failed:', subscriptionError);
          
          if (retries > 0) {
            setTimeout(() => checkSubscriptionStatus(retries - 1), 1000);
          } else {
            setUserState('needs_payment');
          }
        }

      } catch (error) {
        console.error('Error determining user state:', error);
        
        if (retries > 0) {
          setTimeout(() => checkSubscriptionStatus(retries - 1), 1000);
        } else {
          setUserState('needs_payment');
        }
      }
    };

    // Add delay to prevent immediate calls during auth state changes
    setTimeout(() => checkSubscriptionStatus(), 500);
  }, []);

  const refreshUserState = useCallback(async () => {
    try {
      const { data: { session: freshSession } } = await supabase.auth.getSession();
      setSession(freshSession);
      setUser(freshSession?.user ?? null);
      await determineUserState(freshSession?.user ?? null, freshSession);
    } catch (error) {
      console.error('Error refreshing user state:', error);
      setUserState('unauthenticated');
    }
  }, [determineUserState]);

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (!mounted) return;

        console.log('Auth state changed:', event, !!newSession);
        
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          // Defer profile creation to prevent deadlocks
          setTimeout(() => {
            if (mounted) {
              ensureUserProfile(newSession.user);
            }
          }, 0);
        }
        
        await determineUserState(newSession?.user ?? null, newSession);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      if (!mounted) return;

      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      
      if (initialSession?.user) {
        await ensureUserProfile(initialSession.user);
      }
      
      await determineUserState(initialSession?.user ?? null, initialSession);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [determineUserState]);

  return {
    user,
    session,
    loading,
    userState,
    refreshUserState
  };
}

async function ensureUserProfile(user: User) {
  try {
    // Use UPSERT to avoid 409 conflicts when the user row already exists
    const { error: upsertError } = await supabase
      .from('users')
      .upsert(
        {
          id: user.id,
          email: user.email || '',
          name: user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Bruger'
        },
        { onConflict: 'id', ignoreDuplicates: true }
      );

    if (upsertError) {
      console.error('Error upserting user:', upsertError);
    }

    // Create subscriber record with 24-hour trial for new users
    const trialEnd = new Date();
    trialEnd.setHours(trialEnd.getHours() + 24);

    const { error: subscriberError } = await supabase
      .from('subscribers')
      .upsert(
        {
          user_id: user.id,
          email: user.email || '',
          subscribed: false,
          status: 'trial',
          trial_end: trialEnd.toISOString(),
          trial_end_local: trialEnd.toISOString(),
          subscription_tier: null,
          subscription_end: null,
          billing_interval: 'monthly',
          num_kids: 0
        },
        { onConflict: 'email', ignoreDuplicates: true }
      );

    if (subscriberError) {
      console.error('Error creating subscriber trial:', subscriberError);
    }
  } catch (error) {
    console.error('Error in ensureUserProfile:', error);
  }
}