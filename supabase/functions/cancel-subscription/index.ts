import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const logStep = (step: string, details?: any) => {
  console.log(`[CANCEL-SUBSCRIPTION] ${step}`, details ? `- ${JSON.stringify(details)}` : '');
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')!;

  if (!supabaseUrl || !supabaseServiceKey || !stripeSecretKey) {
    logStep('Environment variables missing');
    return new Response(
      JSON.stringify({ error: 'Server configuration error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2023-10-16' });

  try {
    logStep('Function started');
    
    // Get the Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      logStep('No authorization header');
      return new Response(
        JSON.stringify({ error: 'Authorization header missing' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    logStep('Authorization header found');

    // Authenticate the user
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      logStep('User authentication failed', { error: authError });
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    logStep('User authenticated', { userId: user.id, email: user.email });

    // Get subscriber info
    const { data: subscriber, error: subscriberError } = await supabase
      .from('subscribers')
      .select('stripe_customer_id, status, subscribed, trial_end, trial_end_local')
      .eq('user_id', user.id)
      .single();

    if (subscriberError || !subscriber) {
      logStep('Subscriber not found', { error: subscriberError });
      return new Response(
        JSON.stringify({ error: 'Subscription not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    logStep('Subscriber found', subscriber);

    // Check if user is in trial period using Danish timezone
    const danishNow = new Date().toLocaleString("en-US", {timeZone: "Europe/Copenhagen"});
    const currentTime = new Date(danishNow);
    const trialEndLocal = subscriber.trial_end_local ? new Date(subscriber.trial_end_local) : null;
    const isInTrial = trialEndLocal && currentTime < trialEndLocal;

    logStep('Trial status check', { 
      isInTrial, 
      currentTime: currentTime.toISOString(),
      trialEndLocal: trialEndLocal?.toISOString()
    });

    // If user has a Stripe customer ID and subscription, cancel it
    if (subscriber.stripe_customer_id) {
      logStep('Cancelling Stripe subscription');
      
      try {
        // Get all active subscriptions for this customer
        const subscriptions = await stripe.subscriptions.list({
          customer: subscriber.stripe_customer_id,
          status: 'active',
        });

        logStep('Found subscriptions', { count: subscriptions.data.length });

        // Cancel all active subscriptions
        for (const subscription of subscriptions.data) {
          if (isInTrial) {
            // If in trial, cancel immediately to prevent any charges
            await stripe.subscriptions.cancel(subscription.id);
            logStep('Subscription cancelled immediately (trial)', { subscriptionId: subscription.id });
          } else {
            // If past trial, cancel at period end to honor paid period
            await stripe.subscriptions.update(subscription.id, {
              cancel_at_period_end: true,
            });
            logStep('Subscription set to cancel at period end', { subscriptionId: subscription.id });
          }
        }
      } catch (stripeError) {
        logStep('Stripe cancellation error', { error: (stripeError as any).message });
        // Continue with database update even if Stripe fails
      }
    }

    // Update subscriber status in database
    const updateData = {
      subscribed: false,
      status: isInTrial ? 'trial_cancelled' : 'cancelled',
      updated_at: new Date().toISOString(),
    };

    const { error: updateError } = await supabase
      .from('subscribers')
      .update(updateData)
      .eq('user_id', user.id);

    if (updateError) {
      logStep('Database update error', { error: updateError });
      return new Response(
        JSON.stringify({ error: 'Failed to update subscription status' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    logStep('Subscriber status updated');

    // Log the cancellation event
    await supabase.rpc('log_event', {
      p_event_type: 'subscription_cancelled_by_user',
      p_user_id: user.id,
      p_metadata: {
        was_in_trial: isInTrial,
        cancellation_type: isInTrial ? 'immediate' : 'at_period_end',
        stripe_customer_id: subscriber.stripe_customer_id
      },
      p_severity: 'INFO'
    });

    logStep('Cancellation event logged');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: isInTrial 
          ? 'Abonnement opsagt. Du vil ikke blive opkrævet.'
          : 'Abonnement opsagt. Adgang fortsætter indtil næste faktureringsperiode.'
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  } catch (error) {
    logStep('Unexpected error', { error: (error as any).message });
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
});