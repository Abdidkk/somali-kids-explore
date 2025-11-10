
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Use the anon key for user authentication
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  // Service role client for database operations that bypass RLS
  const supabaseService = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  // Enhanced logging function
  const logEvent = async (event_type: string, user_id: string, metadata: Record<string, any>) => {
    try {
      await supabaseService.from('event_logs').insert({
        event_type,
        user_id,
        metadata,
        ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
        user_agent: req.headers.get('user-agent')
      });
    } catch (error) {
      console.error('Event logging failed:', error);
    }
  };

  try {
    logStep("Function started");

    // We now rely on the database (updated by webhooks) instead of querying Stripe directly
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) {
      logStep("Authentication failed", { error: userError.message });
      throw new Error(`Authentication error: ${userError.message}`);
    }
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Read subscriber row from DB; create if missing (subscribed=false by default)
    const { data: existing, error: selectErr } = await supabaseService
      .from('subscribers')
      .select('*')
      .or(`user_id.eq.${user.id},email.eq.${user.email}`)
      .maybeSingle();

    if (selectErr) {
      console.warn('Failed to fetch subscriber row', selectErr);
    }

    if (!existing) {
      logStep('No subscriber row found, creating 24-hour trial');
      
      // Create 24-hour trial for new users
      const trialEnd = new Date();
      trialEnd.setHours(trialEnd.getHours() + 24);
      
      // Calculate Danish timezone version
      const trialEndDanish = new Date(trialEnd.toLocaleString("en-US", {timeZone: "Europe/Copenhagen"}));
      
      await supabaseService.from('subscribers').upsert({
        email: user.email,
        user_id: user.id,
        subscribed: false,
        status: 'trial',
        trial_end: trialEnd.toISOString(),
        trial_end_local: trialEndDanish.toISOString(),
        subscription_tier: null,
        subscription_end: null,
        billing_interval: 'monthly',
        num_kids: 0,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email' });

      return new Response(JSON.stringify({
        subscribed: false,
        inTrial: true,
        status: 'trial',
        subscription_tier: null,
        subscription_end: null,
        billing_interval: 'monthly',
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
    
    // Auto-healing: Hvis user_id mangler eller er forkert, opdater den
    if (!existing.user_id || existing.user_id !== user.id) {
      logStep('Auto-healing: Updating user_id', { 
        current_user_id: existing.user_id, 
        new_user_id: user.id 
      });
      
      await supabaseService.from('subscribers')
        .update({ 
          user_id: user.id,
          updated_at: new Date().toISOString() 
        })
        .eq('id', existing.id);
    }

    // Return the current DB state
    logStep('Returning subscriber state from DB', { subscribed: existing.subscribed, tier: existing.subscription_tier });

    // Optional: sanity checks to avoid false positives
    let subscribed = !!existing.subscribed;
    // If we don't have a Stripe customer, user cannot be subscribed
    if (!existing.stripe_customer_id) {
      subscribed = false;
    }
    // Expired period -> not subscribed
    if (existing.subscription_end && new Date(existing.subscription_end).getTime() < Date.now()) {
      subscribed = false;
    }

    // Determine status using Danish timezone for trial expiry
    let status = existing.status || 'trial';
    if (subscribed) {
      status = 'active';
    } else if (existing.trial_end) {
      // Check trial expiry in Danish timezone
      const danishNow = new Date().toLocaleString("en-US", {timeZone: "Europe/Copenhagen"});
      const trialEndDanish = existing.trial_end_local ? 
        new Date(existing.trial_end_local) : 
        new Date(new Date(existing.trial_end).toLocaleString("en-US", {timeZone: "Europe/Copenhagen"}));
      
      if (new Date(danishNow) < trialEndDanish) {
        status = 'trial';
      } else {
        status = 'expired';
      }
    } else {
      status = 'expired';
    }

    // Persist correction if value changed
    if (subscribed !== existing.subscribed || status !== existing.status) {
      await supabaseService.from('subscribers')
        .update({ 
          subscribed, 
          status,
          updated_at: new Date().toISOString() 
        })
        .eq('id', existing.id);
    }

    // Log subscription check event
    await logEvent('subscription_status_checked', user.id, {
      from: 'database',
      subscribed,
      status,
      subscription_tier: existing.subscription_tier,
      subscription_end: existing.subscription_end,
      customer_id: existing.stripe_customer_id
    });

    return new Response(JSON.stringify({
      subscribed,
      inTrial: !subscribed && status === 'trial',
      subscription_tier: existing.subscription_tier,
      subscription_end: existing.subscription_end,
      billing_interval: existing.billing_interval,
      status: status
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
