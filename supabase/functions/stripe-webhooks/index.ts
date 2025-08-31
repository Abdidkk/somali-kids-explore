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

  // Enhanced logging for debugging
  const logEvent = async (eventType: string, metadata: any = {}, severity = 'INFO') => {
    try {
      await supabase.rpc('log_event', {
        p_event_type: eventType,
        p_user_id: null,
        p_metadata: metadata,
        p_severity: severity
      });
    } catch (error) {
      console.error('Failed to log event:', error);
    }
  };

  // Konfigurer Stripe
  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
    apiVersion: '2023-10-16'
  });

  try {
    const payload = await req.text();
    const signature = req.headers.get('stripe-signature');
    const origin = req.headers.get('origin') || 'unknown';

    console.log(`[WEBHOOK-DEBUG] Webhook received from ${origin}`);
    console.log(`[WEBHOOK-DEBUG] Signature: ${signature ? 'present' : 'missing'}`);
    console.log(`[WEBHOOK-DEBUG] Payload length: ${payload.length}`);

    await logEvent('stripe_webhook_received', { 
      origin, 
      has_signature: !!signature,
      payload_length: payload.length 
    }, 'INFO');

    if (!signature) {
      console.log(`[WEBHOOK-DEBUG] ERROR: Missing stripe-signature header`);
      await logEvent('stripe_webhook_no_signature', { origin }, 'WARNING');
      throw new Error('Missing stripe-signature header');
    }

    // Verificer webhook (kun hvis STRIPE_WEBHOOK_SECRET er sat)
    let event: Stripe.Event;
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    
    if (webhookSecret) {
      try {
        event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
        console.log(`[WEBHOOK-DEBUG] Signature verified successfully`);
      } catch (verificationError) {
        console.log(`[WEBHOOK-DEBUG] ERROR: Signature verification failed: ${verificationError.message}`);
        await logEvent('stripe_webhook_verification_failed', { 
          error: verificationError.message,
          origin 
        }, 'ERROR');
        throw verificationError;
      }
    } else {
      // Fallback: parse payload direkte (kun til test)
      event = JSON.parse(payload);
      console.warn(`[WEBHOOK-DEBUG] WARNING: STRIPE_WEBHOOK_SECRET not set - webhook verification skipped`);
      await logEvent('stripe_webhook_unverified', { 
        event_type: event.type,
        origin 
      }, 'WARNING');
    }

    console.log(`[WEBHOOK-DEBUG] Processing webhook event: ${event.type}`);
    console.log(`[WEBHOOK-DEBUG] Event ID: ${event.id}`);
    
    await logEvent('stripe_webhook_processing', { 
      event_type: event.type,
      event_id: event.id,
      origin 
    }, 'INFO');

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
  const { user_id, tier, interval, plan_name, billing_interval, num_kids } = (session.metadata || {}) as any;

  if (!user_id && !session.customer_email && !session.customer_details?.email) {
    console.error('Missing identifiers in session metadata');
    return;
  }

  try {
    // Insert transaction record
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: user_id || null,
        stripe_session_id: session.id,
        stripe_transaction_id: session.payment_intent,
        amount: (session.amount_total || 0) / 100,
        currency: (session.currency || 'dkk').toUpperCase(),
        status: 'succeeded',
        subscription_tier: tier || plan_name || null,
        billing_interval: interval || billing_interval || null,
        num_kids: parseInt((num_kids as string) || '0', 10),
        metadata: session
      });

    if (transactionError) throw transactionError;

    // Ensure a subscriber row exists and store Stripe customer id/email
    const customerId = (session.customer as string) || null;
    const email = session.customer_email || session.customer_details?.email || null;

    if (email) {
      await supabase.from('subscribers').upsert({
        email,
        user_id: user_id || null,
        stripe_customer_id: customerId,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email' });
    } else if (customerId) {
      // Update by customer id if email is unknown
      await supabase.from('subscribers')
        .update({ stripe_customer_id: customerId, updated_at: new Date().toISOString() })
        .eq('user_id', user_id);
    }

    // Log event
    await supabase.rpc('log_event', {
      p_event_type: 'stripe_checkout_completed',
      p_user_id: user_id || null,
      p_metadata: {
        session_id: session.id,
        amount: (session.amount_total || 0) / 100,
        tier: tier || plan_name,
        interval: interval || billing_interval
      },
      p_severity: 'INFO'
    });

    console.log(`Checkout completed for user ${user_id}, amount: ${(session.amount_total || 0) / 100}`);
  } catch (error) {
    console.error('Error handling checkout completed:', error);

    await supabase.rpc('log_event', {
      p_event_type: 'stripe_checkout_error',
      p_user_id: user_id || null,
      p_metadata: { 
        error: (error as any).message,
        session_id: session.id 
      },
      p_severity: 'ERROR'
    });
  }
}

async function handlePaymentSucceeded(supabase: any, invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  
  console.log(`[PAYMENT-DEBUG] Processing payment succeeded for customer: ${customerId}`);
  console.log(`[PAYMENT-DEBUG] Invoice ID: ${invoice.id}`);
  console.log(`[PAYMENT-DEBUG] Billing reason: ${invoice.billing_reason}`);
  console.log(`[PAYMENT-DEBUG] Subscription ID: ${invoice.subscription}`);
  console.log(`[PAYMENT-DEBUG] Amount paid: ${(invoice.amount_paid || 0) / 100}`);
  
  // Enhanced payment succeeded handler with trial-to-active logic
  try {
    // Check if this is a successful subscription payment - expand conditions for trial transitions
    const isSubscriptionPayment = invoice.subscription && (
      invoice.billing_reason === 'subscription_cycle' ||
      invoice.billing_reason === 'subscription_create' ||
      invoice.billing_reason === 'subscription_update'
    );
    
    console.log(`[PAYMENT-DEBUG] Is subscription payment: ${isSubscriptionPayment}`);
    
    if (isSubscriptionPayment) {
      // Get subscriber info to check current status
      console.log(`[PAYMENT-DEBUG] Looking up subscriber with customer ID: ${customerId}`);
      
      const { data: subscriberData, error: subscriberError } = await supabase
        .from('subscribers')
        .select('status, trial_end, email, user_id, subscribed')
        .eq('stripe_customer_id', customerId)
        .single();

      console.log(`[PAYMENT-DEBUG] Subscriber lookup result:`, subscriberData);
      if (subscriberError) {
        console.log(`[PAYMENT-DEBUG] Subscriber lookup error:`, subscriberError);
      }

      if (subscriberData) {
        // Determine if this is a trial-to-active transition
        const wasInTrial = subscriberData.status === 'trial' || 
                          subscriberData.status === 'expired' ||
                          !subscriberData.subscribed ||
                          (subscriberData.trial_end && new Date(subscriberData.trial_end) > new Date());

        console.log(`[PAYMENT-DEBUG] Was in trial: ${wasInTrial}`);
        console.log(`[PAYMENT-DEBUG] Current status: ${subscriberData.status}`);
        console.log(`[PAYMENT-DEBUG] Currently subscribed: ${subscriberData.subscribed}`);

        // Update subscriber to active status
        const updateResult = await supabase
          .from('subscribers')
          .update({
            subscribed: true,
            status: 'active',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId);

        console.log(`[PAYMENT-DEBUG] Subscriber update result:`, updateResult);
        
        if (updateResult.error) {
          console.log(`[PAYMENT-DEBUG] ERROR updating subscriber:`, updateResult.error);
        } else {
          console.log(`[PAYMENT-DEBUG] Successfully updated subscriber to active status`);
        }

        // Log trial-to-active transition
        if (wasInTrial) {
          console.log(`[PAYMENT-DEBUG] Logging trial-to-active transition`);
          
          await supabase.rpc('log_event', {
            p_event_type: 'stripe_trial_to_active',
            p_user_id: subscriberData.user_id || null,
            p_metadata: {
              invoice_id: invoice.id,
              customer_id: customerId,
              amount: (invoice.amount_paid || 0) / 100,
              email: subscriberData.email,
              billing_reason: invoice.billing_reason,
              previous_status: subscriberData.status,
              transition: 'trial_to_active'
            },
            p_severity: 'INFO'
          });

          console.log(`[PAYMENT-DEBUG] Trial-to-active transition completed for customer ${customerId}`);
        }
      } else {
        console.log(`[PAYMENT-DEBUG] WARNING: No subscriber found for customer ${customerId}`);
      }
    } else {
      console.log(`[PAYMENT-DEBUG] Not a subscription payment - skipping subscriber update`);
    }
    }

    console.log(`[PAYMENT-DEBUG] Logging payment succeeded event`);
    
    await supabase.rpc('log_event', {
      p_event_type: 'stripe_payment_succeeded',
      p_user_id: null,
      p_metadata: {
        invoice_id: invoice.id,
        customer_id: customerId,
        amount: (invoice.amount_paid || 0) / 100,
        billing_reason: invoice.billing_reason,
        subscription_id: invoice.subscription
      },
      p_severity: 'INFO'
    });
    
    console.log(`[PAYMENT-DEBUG] Payment succeeded handler completed successfully`);
  } catch (error) {
    console.error(`[PAYMENT-DEBUG] ERROR in payment succeeded handler:`, error);
    
    await supabase.rpc('log_event', {
      p_event_type: 'stripe_payment_succeeded_error',
      p_user_id: null,
      p_metadata: {
        error: (error as any).message,
        invoice_id: invoice.id,
        customer_id: customerId,
        billing_reason: invoice.billing_reason
      },
      p_severity: 'ERROR'
    });
  }
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
  const customerId = subscription.customer as string;
  const status = subscription.status;
  const isActive = ['active', 'trialing'].includes(status as any);
  const billingInterval = subscription.items.data[0].price.recurring?.interval === 'year' ? 'yearly' : 'monthly';
  const numKids = subscription.items.data.length > 1 ? (subscription.items.data[1].quantity || 0) : 0;
  const subscriptionEnd = subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null;

  // Update subscribers row for this customer
  await supabase.from('subscribers')
    .update({
      stripe_customer_id: customerId,
      subscribed: isActive,
      subscription_tier: billingInterval === 'monthly' ? 'Månedlig' : 'Årlig',
      subscription_end: subscriptionEnd,
      billing_interval: billingInterval,
      num_kids: numKids,
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', customerId);

  await supabase.rpc('log_event', {
    p_event_type: 'stripe_subscription_updated',
    p_user_id: null,
    p_metadata: {
      subscription_id: subscription.id,
      customer_id: customerId,
      status: subscription.status,
      current_period_end: subscription.current_period_end
    },
    p_severity: 'INFO'
  });
}

async function handleSubscriptionDeleted(supabase: any, subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  // Mark subscriber as unsubscribed
  await supabase.from('subscribers')
    .update({
      subscribed: false,
      subscription_tier: null,
      subscription_end: null,
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', customerId);

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