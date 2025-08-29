import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CUSTOMER-PORTAL] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Get user's Stripe customer ID
    // First check the subscribers table
    const { data: subscriberData, error: subscriberError } = await supabaseClient
      .from('subscribers')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();
      
    if (subscriberError && subscriberError.code !== 'PGRST116') {
      logStep("Error fetching subscriber data", { error: subscriberError });
    }
    
    let customerId;
    
    // If we found a customer ID in our database, use it
    if (subscriberData?.stripe_customer_id) {
      customerId = subscriberData.stripe_customer_id;
      logStep("Found customer ID in database", { customerId });
    } else {
      // Otherwise look it up in Stripe
      const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      
      if (customers.data.length === 0) {
        // Create a new customer for trial users who want to access portal
        const newCustomer = await stripe.customers.create({
          email: user.email,
          metadata: {
            user_id: user.id
          }
        });
        customerId = newCustomer.id;
        logStep("Created new Stripe customer for trial user", { customerId });
      } else {
        customerId = customers.data[0].id;
        logStep("Found Stripe customer via API", { customerId });
      }
      
      // Update our database with the customer ID for future reference
      if (customerId) {
        const { error: updateError } = await supabaseClient
          .from('subscribers')
          .upsert({ 
            user_id: user.id, 
            email: user.email, 
            stripe_customer_id: customerId,
            updated_at: new Date().toISOString()
          }, { onConflict: 'email' });
          
        if (updateError) {
          logStep("Error updating subscriber record", { error: updateError });
        }
      }
    }

    // Get the origin to set a proper return URL
    const origin = req.headers.get("origin") || "http://localhost:3000";
    
    // Create Stripe customer portal session
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    logStep("Creating customer portal session", { 
      customerId, 
      returnUrl: `${origin}/dashboard` 
    });
    
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/dashboard`,
    });
    
    logStep("Customer portal session created", { 
      sessionId: portalSession.id, 
      url: portalSession.url 
    });

    return new Response(JSON.stringify({ url: portalSession.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in customer-portal", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
