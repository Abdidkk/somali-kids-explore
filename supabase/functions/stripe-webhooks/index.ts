import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  // Konfigurer Stripe
  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
    apiVersion: '2023-10-16'
  });

  try {
    const payload = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      throw new Error('Missing stripe-signature header');
    }

    // Verificer webhook (kun hvis STRIPE_WEBHOOK_SECRET er sat)
    let event: Stripe.Event;
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } else {
      // Fallback: parse payload direkte (kun til test)
      event = JSON.parse(payload);
      console.warn('STRIPE_WEBHOOK_SECRET not set - webhook verification skipped');
    }

    console.log(`Processing webhook event: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(supabase, event.data.object as Stripe.Checkout.Session);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(supabase, event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(supabase, event.data.object as Stripe.Invoice);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(supabase, event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(supabase, event.data.object as Stripe.Subscription);
        break;

      default:
        console.log(`Unhandled webhook event type: ${event.type}`);
    }

    return new Response('Webhook modtaget', { 
      status: 200,
      headers: corsHeaders 
    });
  } catch (error) {
    console.error('Webhook Error:', error);
    
    // Log webhook fejl
    await supabase.rpc('log_event', {
      p_event_type: 'stripe_webhook_error',
      p_user_id: null,
      p_metadata: { 
        error: error.message,
        headers: Object.fromEntries(req.headers.entries())
      },
      p_severity: 'ERROR'
    });

    return new Response(`Webhook Error: ${error.message}`, { 
      status: 400,
      headers: corsHeaders 
    });
  }
});

async function handleCheckoutCompleted(supabase: any, session: Stripe.Checkout.Session) {
  const { user_id, subscriber_id, tier, interval, num_kids } = session.metadata || {};

  if (!user_id) {
    console.error('Missing user_id in session metadata');
    return;
  }

  try {
    // Log transaktion
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id,
        subscriber_id,
        stripe_session_id: session.id,
        stripe_transaction_id: session.payment_intent,
        amount: (session.amount_total || 0) / 100, // Konverter til decimal
        currency: (session.currency || 'dkk').toUpperCase(),
        status: 'succeeded',
        subscription_tier: tier,
        billing_interval: interval,
        num_kids: parseInt(num_kids || '0', 10),
        metadata: session
      });

    if (transactionError) throw transactionError;

    // Log event
    await supabase.rpc('log_event', {
      p_event_type: 'stripe_checkout_completed',
      p_user_id: user_id,
      p_metadata: {
        session_id: session.id,
        amount: (session.amount_total || 0) / 100,
        tier: tier,
        interval: interval
      },
      p_severity: 'INFO'
    });

    console.log(`Checkout completed for user ${user_id}, amount: ${(session.amount_total || 0) / 100}`);
  } catch (error) {
    console.error('Error handling checkout completed:', error);
    
    await supabase.rpc('log_event', {
      p_event_type: 'stripe_checkout_error',
      p_user_id: user_id,
      p_metadata: { 
        error: error.message,
        session_id: session.id 
      },
      p_severity: 'ERROR'
    });
  }
}

async function handlePaymentSucceeded(supabase: any, invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  
  await supabase.rpc('log_event', {
    p_event_type: 'stripe_payment_succeeded',
    p_user_id: null,
    p_metadata: {
      invoice_id: invoice.id,
      customer_id: customerId,
      amount: (invoice.amount_paid || 0) / 100
    },
    p_severity: 'INFO'
  });
}

async function handlePaymentFailed(supabase: any, invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  
  await supabase.rpc('log_event', {
    p_event_type: 'stripe_payment_failed',
    p_user_id: null,
    p_metadata: {
      invoice_id: invoice.id,
      customer_id: customerId,
      amount: (invoice.amount_due || 0) / 100,
      failure_reason: invoice.last_finalization_error?.message
    },
    p_severity: 'WARNING'
  });
}

async function handleSubscriptionUpdated(supabase: any, subscription: Stripe.Subscription) {
  await supabase.rpc('log_event', {
    p_event_type: 'stripe_subscription_updated',
    p_user_id: null,
    p_metadata: {
      subscription_id: subscription.id,
      customer_id: subscription.customer,
      status: subscription.status,
      current_period_end: subscription.current_period_end
    },
    p_severity: 'INFO'
  });
}

async function handleSubscriptionDeleted(supabase: any, subscription: Stripe.Subscription) {
  await supabase.rpc('log_event', {
    p_event_type: 'stripe_subscription_deleted',
    p_user_id: null,
    p_metadata: {
      subscription_id: subscription.id,
      customer_id: subscription.customer,
      canceled_at: subscription.canceled_at
    },
    p_severity: 'INFO'
  });
}