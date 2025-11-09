
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

// Subscription pricing interface
interface SubscriptionPlan {
  trialHours: number;
  basePricePerChild: number;
  extraChildFee: number;
  includedChildren: number;
}

const DEFAULT_PLAN: SubscriptionPlan = {
  trialHours: 24,
  basePricePerChild: 45,
  extraChildFee: 15,
  includedChildren: 1,
};

function calculateTotal(children: number, plan: SubscriptionPlan = DEFAULT_PLAN): number {
  const extra = Math.max(0, children - plan.includedChildren);
  return plan.basePricePerChild + extra * plan.extraChildFee;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  const supabaseService = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

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
      throw new Error("No authorization header provided");
    }
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) {
      throw new Error(`Authentication error: ${userError.message}`);
    }
    
    const user = userData.user;
    if (!user?.email) {
      throw new Error("User not authenticated");
    }
    
    logStep("User authenticated", { userId: user.id, email: user.email });

    const requestBody = await req.json();
    const { numKids = 1 } = requestBody;
    
    logStep("Request data received", { numKids });

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
      const newCustomer = await stripe.customers.create({
        email: user.email,
        metadata: { user_id: user.id },
      });
      customerId = newCustomer.id;
      logStep("Created new customer", { customerId });
    }

    // Calculate total using interface
    const totalAmount = calculateTotal(numKids, DEFAULT_PLAN);
    logStep("Calculated price", { numKids, totalAmount });

    // Create ONE unified price (cannot be partially cancelled)
    const price = await stripe.prices.create({
      unit_amount: totalAmount * 100, // Convert to øre
      currency: 'dkk',
      recurring: { interval: 'month' },
      product_data: {
        name: `Abonnement - ${numKids} barn${numKids > 1 ? '' : ''}`,
      },
      metadata: {
        num_kids: numKids.toString(),
        base_price: DEFAULT_PLAN.basePricePerChild.toString(),
        extra_children: Math.max(0, numKids - DEFAULT_PLAN.includedChildren).toString(),
        extra_child_fee: DEFAULT_PLAN.extraChildFee.toString(),
        unified_pricing: 'true',
        price_breakdown: `${DEFAULT_PLAN.basePricePerChild} kr base + ${Math.max(0, numKids - DEFAULT_PLAN.includedChildren) * DEFAULT_PLAN.extraChildFee} kr ekstra`,
      },
    });

    logStep('Created unified price', { priceId: price.id, amount: totalAmount });

    const originUrl = req.headers.get("origin") || "https://www.laerdansk.dk";

    // Create subscription checkout (trial managed manually in database - 24 hours)
    // Stripe only supports whole days for trial_period_days, so we manage the exact 24-hour trial in our database
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer: customerId,
      success_url: `${originUrl}/payment-success`,
      cancel_url: `${originUrl}/payment-cancel`,
      subscription_data: {
        metadata: {
          user_id: user.id,
          num_kids: numKids.toString(),
          unified_pricing: 'true',
          trial_managed_manually: 'true',
          trial_hours: DEFAULT_PLAN.trialHours.toString(),
        },
      },
      metadata: {
        user_id: user.id,
        num_kids: numKids.toString(),
        unified_pricing: 'true',
        trial_managed_manually: 'true',
      },
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    // Log transaction
    await supabaseService.from('transactions').insert({
      user_id: user.id,
      stripe_session_id: session.id,
      amount: totalAmount,
      currency: 'DKK',
      status: 'pending',
      num_kids: numKids,
      subscription_tier: 'standard',
      billing_interval: 'monthly',
      metadata: {
        unified_pricing: true,
        children_count: numKids,
        base_price: DEFAULT_PLAN.basePricePerChild,
        extra_child_fee: DEFAULT_PLAN.extraChildFee,
      },
    });

    await logEvent('checkout_session_created', user.id, {
      session_id: session.id,
      num_kids: numKids,
      total_amount: totalAmount,
      unified_pricing: true,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
