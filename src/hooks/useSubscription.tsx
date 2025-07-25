
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { supabase } from "@/integrations/supabase/client";

interface SubscriptionContextType {
  subscribed: boolean;
  inTrial: boolean;
  subscriptionTier: string | null;
  subscriptionEnd: string | null;
  loading: boolean;
  checkSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscribed, setSubscribed] = useState(false);
  const [inTrial, setInTrial] = useState(true);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, session } = useAuth();

  const checkSubscription = async () => {
    if (!user || !session) {
      setSubscribed(false);
      setInTrial(true);
      setSubscriptionTier(null);
      setSubscriptionEnd(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // Get a fresh session to avoid stale token issues
      const { data: { session: freshSession }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !freshSession) {
        console.warn('No valid session found, setting default values');
        setSubscribed(false);
        setInTrial(true);
        setSubscriptionTier(null);
        setSubscriptionEnd(null);
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${freshSession.access_token}`,
        },
      });

      if (error) {
        console.error('Error checking subscription:', error);
        // Set default values on error to prevent UI issues
        setSubscribed(false);
        setInTrial(true);
        setSubscriptionTier(null);
        setSubscriptionEnd(null);
        return;
      }

      console.log('Subscription data:', data);
      setSubscribed(data.subscribed || false);
      setInTrial(data.inTrial || false);
      setSubscriptionTier(data.subscription_tier || null);
      setSubscriptionEnd(data.subscription_end || null);
    } catch (error) {
      console.error('Error in checkSubscription:', error);
      // Set default values on error to prevent UI issues
      setSubscribed(false);
      setInTrial(true);
      setSubscriptionTier(null);
      setSubscriptionEnd(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && session) {
      // Delay initial check to avoid immediate rate limiting
      const timer = setTimeout(() => {
        checkSubscription();
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [user, session]);

  // Listen for page focus to refresh subscription status (when returning from Stripe)
  // But limit to avoid rate limits
  useEffect(() => {
    let lastCheck = 0;
    const handleFocus = () => {
      const now = Date.now();
      if (user && session && document.visibilityState === 'visible' && now - lastCheck > 5000) {
        console.log('Page focused - refreshing subscription status');
        lastCheck = now;
        checkSubscription();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
  }, [user, session]);

  return (
    <SubscriptionContext.Provider value={{ 
      subscribed, 
      inTrial,
      subscriptionTier, 
      subscriptionEnd, 
      loading, 
      checkSubscription 
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
