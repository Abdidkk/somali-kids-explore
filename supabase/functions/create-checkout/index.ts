
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

  try {
    logStep("Function started");

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
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
          "price_1RlZQVHugRjwpvWt7BKwjRTr" : "price_1RlZR3HugRjwpvWtv2fdRbkX";
        lineItems.push({ price: kidPriceId, quantity: numKids });
      }
      logStep("Creating full subscription checkout", { basePrice: priceId, kidPrice: numKids > 0 ? (billingInterval === "monthly" ? "price_1RlZQVHugRjwpvWt7BKwjRTr" : "price_1RlZR3HugRjwpvWtv2fdRbkX") : null, numKids });
    }

    // Build session configuration
    const sessionConfig: any = {
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: lineItems,
      mode: "subscription",
      payment_method_types: ["card"],
      success_url: `${req.headers.get("origin")}/congratulations`,
      cancel_url: `${req.headers.get("origin")}/choose-plan`,
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

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    logStep("ERROR in create-checkout", { message: error.message });
    
    // Handle specific Stripe errors with Danish messages
    let userMessage = error.message;
    if (error.message.includes("set an account or business name")) {
      userMessage = "Du skal indstille et firmanavn i din Stripe-konto før du kan oprette betalinger. Gå til https://dashboard.stripe.com/account og udfyld 'Business Information'.";
    }
    
    return new Response(JSON.stringify({ error: userMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
