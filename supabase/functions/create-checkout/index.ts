
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  // Service role client for logging and transactions
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

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      logStep("Authentication failed", { error: "No authorization header provided" });
      throw new Error("Authentication error: No authorization header provided");
    }
    
    const token = authHeader.replace("Bearer ", "");
    logStep("Authenticating user with token");
    
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) {
      logStep("Authentication failed", { error: userError.message });
      throw new Error(`Authentication error: ${userError.message}`);
    }
    
    const user = userData.user;
    if (!user?.email) {
      logStep("No user or email found");
      throw new Error("Authentication error: User not authenticated or email not available");
    }
    
    logStep("User authenticated", { userId: user.id, email: user.email });

    const { priceId, planName, billingInterval = "monthly", numKids = 0, childrenOnly = false } = await req.json();
    logStep("Request data received", { priceId, planName, billingInterval, numKids, childrenOnly });

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { 
      apiVersion: "2023-10-16" 
    });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      logStep("No existing customer found");
    }

    // Build line items based on whether this is children only or full subscription
    let lineItems;
    if (childrenOnly) {
      // Only add children profiles, no base subscription
      lineItems = [{ price: priceId, quantity: numKids }];
      logStep("Creating children-only checkout", { priceId, quantity: numKids });
    } else {
      // Original logic for full subscriptions
      lineItems = [{ price: priceId, quantity: 1 }];
      if (numKids > 0) {
        const kidPriceId = billingInterval === "monthly" ? 
          "price_test_kid_monthly" : "price_test_kid_yearly"; // Using test placeholders
        lineItems.push({ price: kidPriceId, quantity: numKids });
      }
      logStep("Creating full subscription checkout", { basePrice: priceId, kidPrice: numKids > 0 ? (billingInterval === "monthly" ? "price_test_kid_monthly" : "price_test_kid_yearly") : null, numKids });
    }

    // Resolve origin with robust fallback
    const originUrl =
      req.headers.get("origin") ||
      (req.headers.get("x-forwarded-proto") && req.headers.get("x-forwarded-host")
        ? `${req.headers.get("x-forwarded-proto")}://${req.headers.get("x-forwarded-host")}`
        : null) ||
      "https://preview--dugsi.lovable.app";
    logStep("Resolved origin for checkout URLs", { origin: originUrl });

    // Build session configuration
    const sessionConfig: any = {
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: lineItems,
      mode: "subscription",
      payment_method_types: ["card"],
      success_url: `${originUrl}/payment-success`,
      cancel_url: `${originUrl}/payment-cancel`,
      metadata: {
        plan_name: planName,
        user_id: user.id,
        billing_interval: billingInterval,
        num_kids: numKids.toString(),
        children_only: childrenOnly.toString(),
      },
    };

    // Only add trial period for full subscriptions, not for children-only purchases
    if (!childrenOnly) {
      sessionConfig.subscription_data = {
        trial_period_days: 1,
      };
      logStep("Added trial period for full subscription");
    } else {
      logStep("Skipping trial period for children-only purchase");
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    // Calculate total amount from line items (for logging)
    let totalAmount = 0;
    for (const item of lineItems) {
      try {
        const price = await stripe.prices.retrieve(item.price);
        totalAmount += (price.unit_amount || 0) * item.quantity;
      } catch (priceError) {
        console.error('Failed to retrieve price for amount calculation:', priceError);
      }
    }

    // Log transaction creation
    try {
      await supabaseService.from('transactions').insert({
        user_id: user.id,
        stripe_session_id: session.id,
        amount: totalAmount / 100, // Convert from cents to currency units
        currency: 'DKK',
        status: 'pending',
        subscription_tier: planName,
        billing_interval: billingInterval,
        num_kids: numKids,
        metadata: {
          children_only: childrenOnly,
          line_items: lineItems,
          stripe_metadata: sessionConfig.metadata
        }
      });
      logStep("Transaction logged", { sessionId: session.id, amount: totalAmount / 100 });
    } catch (transactionError) {
      console.error('Transaction logging failed:', transactionError);
    }

    // Log checkout event
    await logEvent('checkout_session_created', user.id, {
      session_id: session.id,
      plan_name: planName,
      billing_interval: billingInterval,
      num_kids: numKids,
      children_only: childrenOnly,
      amount: totalAmount / 100
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    
    // Check if this is an authentication error
    if (errorMessage.includes('Authentication error') || errorMessage.includes('Session')) {
      return new Response(JSON.stringify({ 
        error: "Session udløbet. Prøv at logge ind igen.",
        details: errorMessage 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    
    // Handle specific Stripe errors with Danish messages
    let userMessage = errorMessage;
    if (errorMessage.includes("set an account or business name")) {
      userMessage = "Du skal indstille et firmanavn i din Stripe-konto før du kan oprette betalinger. Gå til https://dashboard.stripe.com/account og udfyld 'Business Information'.";
    } else if (errorMessage.includes('No such price') || errorMessage.includes('Invalid price')) {
      userMessage = "FEJL: Ugyldig Stripe pris ID. Test price IDs skal opdateres til korrekte værdier fra Stripe dashboard.";
    } else if (errorMessage.includes('price_test_')) {
      userMessage = "TEST MODE FEJL: Placeholder price IDs skal erstattes med faktiske Stripe test price IDs.";
    }
    
    return new Response(JSON.stringify({ 
      error: userMessage,
      details: errorMessage 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
