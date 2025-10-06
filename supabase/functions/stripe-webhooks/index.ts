import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';

// Helper function to get customer email from Stripe
async function getCustomerEmail(stripe: Stripe, customerId: string): Promise<string | null> {
  try {
    console.log(`[EMAIL-DEBUG] 🔍 Fetching customer email for ID: ${customerId}`);
    const customer = await stripe.customers.retrieve(customerId);
    const email = (customer as Stripe.Customer).email;
    console.log(`[EMAIL-DEBUG] ✅ Found customer email: ${email || 'null'}`);
    return email;
  } catch (error) {
    console.log(`[EMAIL-DEBUG] ❌ Failed to fetch customer email:`, (error as any).message);
    return null;
  }
}

// Enhanced subscriber matching function
async function findAndUpdateSubscriber(
  supabase: any, 
  stripe: Stripe,
  customerId: string | null, 
  email: string | null, 
  userId: string | null,
  updateData: any
): Promise<boolean> {
  console.log(`[SUBSCRIBER-DEBUG] 🔍 Finding subscriber with:`, { customerId, email, userId });

  // Strategy 1: Match by stripe_customer_id (most reliable)
  if (customerId) {
    const { data: subscriber, error } = await supabase
      .from('subscribers')
      .select('id, email, user_id, subscribed, status')
      .eq('stripe_customer_id', customerId)
      .maybeSingle();
    
    if (!error && subscriber) {
      console.log(`[SUBSCRIBER-DEBUG] ✅ Found subscriber by customer_id:`, subscriber);
      const { error: updateError } = await supabase
        .from('subscribers')
        .update(updateData)
        .eq('stripe_customer_id', customerId);
      
      if (updateError) {
        console.log(`[SUBSCRIBER-DEBUG] ❌ Update failed:`, updateError);
        return false;
      }
      console.log(`[SUBSCRIBER-DEBUG] ✅ Successfully updated subscriber`);
      return true;
    }
  }

  // Strategy 2: If no customer ID match, try to get email from Stripe and match by email
  let resolvedEmail = email;
  if (!resolvedEmail && customerId) {
    resolvedEmail = await getCustomerEmail(stripe, customerId);
  }

  if (resolvedEmail) {
    console.log(`[SUBSCRIBER-DEBUG] 🔍 Trying to match by email: ${resolvedEmail}`);
    const { data: subscriber, error } = await supabase
      .from('subscribers')
      .select('id, email, user_id, subscribed, status')
      .eq('email', resolvedEmail)
      .maybeSingle();
    
    if (!error && subscriber) {
      console.log(`[SUBSCRIBER-DEBUG] ✅ Found subscriber by email:`, subscriber);
      // Update with both the data and the stripe_customer_id if we have it
      const finalUpdateData = { ...updateData };
      if (customerId) finalUpdateData.stripe_customer_id = customerId;
      
      const { error: updateError } = await supabase
        .from('subscribers')
        .update(finalUpdateData)
        .eq('email', resolvedEmail);
      
      if (updateError) {
        console.log(`[SUBSCRIBER-DEBUG] ❌ Update failed:`, updateError);
        return false;
      }
      console.log(`[SUBSCRIBER-DEBUG] ✅ Successfully updated subscriber by email`);
      return true;
    }
  }

  // Strategy 3: Match by user_id if available
  if (userId) {
    console.log(`[SUBSCRIBER-DEBUG] 🔍 Trying to match by user_id: ${userId}`);
    const { data: subscriber, error } = await supabase
      .from('subscribers')
      .select('id, email, user_id, subscribed, status')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (!error && subscriber) {
      console.log(`[SUBSCRIBER-DEBUG] ✅ Found subscriber by user_id:`, subscriber);
      // Update with all available data
      const finalUpdateData = { ...updateData };
      if (customerId) finalUpdateData.stripe_customer_id = customerId;
      if (resolvedEmail) finalUpdateData.email = resolvedEmail;
      
      const { error: updateError } = await supabase
        .from('subscribers')
        .update(finalUpdateData)
        .eq('user_id', userId);
      
      if (updateError) {
        console.log(`[SUBSCRIBER-DEBUG] ❌ Update failed:`, updateError);
        return false;
      }
      console.log(`[SUBSCRIBER-DEBUG] ✅ Successfully updated subscriber by user_id`);
      return true;
    }
  }

  console.log(`[SUBSCRIBER-DEBUG] ❌ No subscriber found with any strategy`);
  return false;
}

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
        console.log(`[WEBHOOK-DEBUG] ERROR: Signature verification failed: ${(verificationError as any).message}`);
        await logEvent('stripe_webhook_verification_failed', { 
          error: (verificationError as any).message,
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
        await handleCheckoutCompleted(supabase, stripe, event.data.object as Stripe.Checkout.Session);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(supabase, stripe, event.data.object as Stripe.Invoice);
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

      case 'customer.subscription.trial_will_end':
        await handleTrialWillEnd(supabase, event.data.object as Stripe.Subscription);
        break;

      case 'invoice.upcoming':
        await handleInvoiceUpcoming(supabase, event.data.object as Stripe.Invoice);
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
        error: (error as any).message,
        headers: Object.fromEntries(req.headers.entries())
      },
      p_severity: 'ERROR'
    });

    return new Response(`Webhook Error: ${(error as any).message}`, { 
      status: 400,
      headers: corsHeaders 
    });
  }
});

async function handleCheckoutCompleted(supabase: any, stripe: Stripe, session: Stripe.Checkout.Session) {
  const { user_id, tier, interval, plan_name, billing_interval, num_kids, children_only, price_id, kid_price_id } = (session.metadata || {}) as any;

  console.log(`[CHECKOUT-DEBUG] 🛒 Processing checkout session: ${session.id}`);
  console.log(`[CHECKOUT-DEBUG] Mode: ${session.mode}`);
  console.log(`[CHECKOUT-DEBUG] Customer ID: ${session.customer}`);
  console.log(`[CHECKOUT-DEBUG] Customer email in session: ${session.customer_email}`);
  console.log(`[CHECKOUT-DEBUG] Customer details email: ${session.customer_details?.email}`);
  console.log(`[CHECKOUT-DEBUG] User ID from metadata: ${user_id}`);

  const customerId = (session.customer as string) || null;
  let email = session.customer_email || session.customer_details?.email || null;

  // If no email in session, fetch from Stripe customer
  if (!email && customerId) {
    console.log(`[CHECKOUT-DEBUG] ⚠️ No email in session, fetching from Stripe customer`);
    email = await getCustomerEmail(stripe, customerId);
  }

  if (!user_id && !email && !customerId) {
    console.error('[CHECKOUT-DEBUG] ❌ Missing all identifiers in session - cannot process');
    return;
  }

  // Handle SETUP mode - create subscription with 24-hour trial
  if (session.mode === 'setup' && !children_only) {
    console.log(`[CHECKOUT-DEBUG] 🔧 SETUP MODE detected - creating scheduled subscription with 24-hour trial`);
    
    try {
      // Get setup intent to retrieve payment method
      const setupIntent = await stripe.setupIntents.retrieve(session.setup_intent as string);
      const paymentMethodId = setupIntent.payment_method as string;
      
      console.log(`[CHECKOUT-DEBUG] Payment method: ${paymentMethodId}`);
      
      // Calculate 24-hour trial end in Danish time (UTC+1)
      const now = new Date();
      const danishNow = new Date(now.getTime() + 60 * 60 * 1000); // Add 1 hour for CET
      const trialEnd24h = new Date(danishNow.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours
      const billingCycleAnchor = Math.floor(trialEnd24h.getTime() / 1000); // Unix timestamp
      
      console.log(`[CHECKOUT-DEBUG] 📅 Trial period:`);
      console.log(`[CHECKOUT-DEBUG] - Start (Danish): ${danishNow.toISOString()}`);
      console.log(`[CHECKOUT-DEBUG] - End (Danish): ${trialEnd24h.toISOString()}`);
      console.log(`[CHECKOUT-DEBUG] - Billing cycle anchor: ${billingCycleAnchor}`);
      
      // Build subscription items
      const subscriptionItems: any[] = [{ price: price_id, quantity: 1 }];
      if (num_kids > 0 && kid_price_id) {
        subscriptionItems.push({ price: kid_price_id, quantity: parseInt(num_kids, 10) });
      }
      
      // Create scheduled subscription
      const subscription = await stripe.subscriptions.create({
        customer: customerId!,
        items: subscriptionItems,
        billing_cycle_anchor: billingCycleAnchor,
        proration_behavior: 'none',
        default_payment_method: paymentMethodId,
        metadata: {
          user_id,
          plan_name,
          billing_interval: billing_interval || 'monthly',
          trial_start_danish: danishNow.toISOString(),
          trial_end_danish: trialEnd24h.toISOString()
        }
      });
      
      console.log(`[CHECKOUT-DEBUG] ✅ Subscription created: ${subscription.id}`);
      console.log(`[CHECKOUT-DEBUG] Status: ${subscription.status}`);
      
      // Update subscriber with trial info
      const subscriberUpdateData = {
        subscribed: false, // Will be true after first payment
        status: 'trial',
        trial_end: trialEnd24h.toISOString(),
        trial_end_local: trialEnd24h.toISOString(),
        subscription_tier: plan_name || 'Premium',
        billing_interval: billing_interval || 'monthly',
        num_kids: parseInt(num_kids || '0', 10),
        stripe_subscription_id: subscription.id,
        updated_at: new Date().toISOString(),
      };

      const updateSuccess = await findAndUpdateSubscriber(
        supabase, 
        stripe,
        customerId, 
        email, 
        user_id,
        subscriberUpdateData
      );

      if (!updateSuccess && email) {
        console.log(`[CHECKOUT-DEBUG] 🆕 Creating new subscriber for trial`);
        await supabase.from('subscribers').upsert({
          email,
          user_id: user_id || null,
          stripe_customer_id: customerId,
          ...subscriberUpdateData
        }, { onConflict: 'email' });
      }
      
      console.log(`[CHECKOUT-DEBUG] ✅ 24-hour trial activated successfully`);
      
      // Log event
      await supabase.rpc('log_event', {
        p_event_type: 'stripe_24h_trial_started',
        p_user_id: user_id || null,
        p_metadata: {
          session_id: session.id,
          subscription_id: subscription.id,
          trial_start: danishNow.toISOString(),
          trial_end: trialEnd24h.toISOString(),
          plan_name,
          num_kids
        },
        p_severity: 'INFO'
      });
      
      return; // Exit early - setup mode handled
    } catch (error) {
      console.error('[CHECKOUT-DEBUG] ❌ Error creating scheduled subscription:', error);
      
      await supabase.rpc('log_event', {
        p_event_type: 'stripe_setup_subscription_error',
        p_user_id: user_id || null,
        p_metadata: { 
          error: (error as any).message,
          session_id: session.id 
        },
        p_severity: 'ERROR'
      });
      
      throw error;
    }
  }

  try {
    // Insert transaction record
    console.log(`[CHECKOUT-DEBUG] 📝 Creating transaction record`);
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: user_id || null,
        stripe_session_id: session.id,
        stripe_transaction_id: session.payment_intent,
        amount: (session.amount_total || 0) / 100,
        currency: (session.currency || 'dkk').toUpperCase(),
        status: 'completed',
        subscription_tier: tier || plan_name || null,
        billing_interval: interval || billing_interval || null,
        num_kids: parseInt((num_kids as string) || '0', 10),
        metadata: session
      });

    if (transactionError) {
      console.log(`[CHECKOUT-DEBUG] ❌ Transaction creation failed:`, transactionError);
      throw transactionError;
    }
    console.log(`[CHECKOUT-DEBUG] ✅ Transaction created successfully`);

    // Update subscriber status to active - THIS IS THE KEY FIX
    console.log(`[CHECKOUT-DEBUG] 🔄 Updating subscriber to active status`);
    const subscriberUpdateData = {
      subscribed: true,
      status: 'active',
      subscription_tier: tier || plan_name || 'Premium',
      billing_interval: interval || billing_interval || 'monthly',
      num_kids: parseInt((num_kids as string) || '0', 10),
      updated_at: new Date().toISOString(),
    };

    const updateSuccess = await findAndUpdateSubscriber(
      supabase, 
      stripe,
      customerId, 
      email, 
      user_id,
      subscriberUpdateData
    );

    if (updateSuccess) {
      console.log(`[CHECKOUT-DEBUG] ✅ Subscriber activated successfully`);
    } else {
      console.log(`[CHECKOUT-DEBUG] ⚠️ Subscriber update failed or no subscriber found`);
      
      // As fallback, create a new subscriber if we have email
      if (email) {
        console.log(`[CHECKOUT-DEBUG] 🆕 Creating new subscriber as fallback`);
        await supabase.from('subscribers').upsert({
          email,
          user_id: user_id || null,
          stripe_customer_id: customerId,
          ...subscriberUpdateData
        }, { onConflict: 'email' });
      }
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

async function handlePaymentSucceeded(supabase: any, stripe: Stripe, invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  let email = invoice.customer_email || null;
  
  console.log(`[PAYMENT-DEBUG] 💳 Processing payment succeeded: ${invoice.id}`);
  console.log(`[PAYMENT-DEBUG] Customer ID: ${customerId}`);
  console.log(`[PAYMENT-DEBUG] Customer email in invoice: ${email}`);
  console.log(`[PAYMENT-DEBUG] Billing reason: ${invoice.billing_reason}`);
  console.log(`[PAYMENT-DEBUG] Subscription ID: ${invoice.subscription}`);
  console.log(`[PAYMENT-DEBUG] Amount paid: ${(invoice.amount_paid || 0) / 100}`);

  // Get customer email if not in invoice
  if (!email && customerId) {
    console.log(`[PAYMENT-DEBUG] ⚠️ No customer email found in invoice, fetching from Stripe`);
    email = await getCustomerEmail(stripe, customerId);
  }
  
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
      console.log(`[PAYMENT-DEBUG] 🔄 Activating subscription for customer: ${customerId}`);
      
      // Use enhanced subscriber matching to activate subscription
      const subscriberUpdateData = {
        subscribed: true,
        status: 'active',
        updated_at: new Date().toISOString(),
      };

      const updateSuccess = await findAndUpdateSubscriber(
        supabase, 
        stripe,
        customerId, 
        email, 
        null, // We don't have user_id in invoice context
        subscriberUpdateData
      );

      if (updateSuccess) {
        console.log(`[PAYMENT-DEBUG] ✅ Subscriber activated via payment succeeded`);
        
        // Log the activation
        await supabase.rpc('log_event', {
          p_event_type: 'stripe_subscription_activated',
          p_user_id: null,
          p_metadata: {
            invoice_id: invoice.id,
            customer_id: customerId,
            amount: (invoice.amount_paid || 0) / 100,
            email: email,
            billing_reason: invoice.billing_reason,
            activation_method: 'payment_succeeded'
          },
          p_severity: 'INFO'
        });
      } else {
        console.log(`[PAYMENT-DEBUG] ⚠️ Failed to find/update subscriber for customer ${customerId}`);
      }
    } else {
      console.log(`[PAYMENT-DEBUG] Not a subscription payment - skipping subscriber update`);
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
  
  console.log(`[SUBSCRIPTION-DELETE] Processing subscription deletion: ${subscription.id}`);
  console.log(`[SUBSCRIPTION-DELETE] Customer ID: ${customerId}`);
  console.log(`[SUBSCRIPTION-DELETE] Status: ${subscription.status}`);
  console.log(`[SUBSCRIPTION-DELETE] Cancelled reason: ${subscription.cancellation_details?.reason || 'unknown'}`);
  
  try {
    // Update subscriber status to unsubscribed
    const { data: subscriber, error: findError } = await supabase
      .from('subscribers')
      .select('id, email, user_id, subscribed')
      .eq('stripe_customer_id', customerId)
      .single();

    if (findError || !subscriber) {
      console.log(`[SUBSCRIPTION-DELETE] Subscriber not found for customer: ${customerId}`);
      return;
    }

    console.log(`[SUBSCRIPTION-DELETE] Found subscriber:`, subscriber);

    // Update subscription status
    const { error: updateError } = await supabase
      .from('subscribers')
      .update({
        subscribed: false,
        status: 'cancelled',
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_customer_id', customerId);

    if (updateError) {
      console.error(`[SUBSCRIPTION-DELETE] Failed to update subscriber:`, updateError);
    } else {
      console.log(`[SUBSCRIPTION-DELETE] Subscriber status updated to cancelled`);
    }

    await supabase.rpc('log_event', {
      p_event_type: 'stripe_subscription_deleted',
      p_user_id: subscriber.user_id,
      p_metadata: {
        subscription_id: subscription.id,
        customer_id: subscription.customer,
        canceled_at: subscription.canceled_at,
        cancellation_reason: subscription.cancellation_details?.reason || 'unknown',
        cancellation_comment: subscription.cancellation_details?.comment || null
      },
      p_severity: 'INFO'
    });
  } catch (error) {
    console.error(`[SUBSCRIPTION-DELETE] Error processing subscription deletion:`, error);
    
    await supabase.rpc('log_event', {
      p_event_type: 'stripe_subscription_deleted_error',
      p_user_id: null,
      p_metadata: {
        error: (error as any).message,
        subscription_id: subscription.id,
        customer_id: subscription.customer
      },
      p_severity: 'ERROR'
    });
  }
}

async function handleTrialWillEnd(supabase: any, subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  
  console.log(`[TRIAL-WILL-END] Trial ending soon for subscription: ${subscription.id}`);
  
  await supabase.rpc('log_event', {
    p_event_type: 'stripe_trial_will_end',
    p_user_id: null,
    p_metadata: {
      subscription_id: subscription.id,
      customer_id: customerId,
      trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null
    },
    p_severity: 'INFO'
  });
}

async function handleInvoiceUpcoming(supabase: any, invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  
  console.log(`[INVOICE-UPCOMING] Upcoming invoice for customer: ${customerId}`);
  console.log(`[INVOICE-UPCOMING] Billing reason: ${invoice.billing_reason}`);
  
  // Check if this customer has cancelled their subscription during trial
  const { data: subscriber } = await supabase
    .from('subscribers')
    .select('status, trial_end_local')
    .eq('stripe_customer_id', customerId)
    .single();

  if (subscriber && subscriber.status === 'trial_cancelled') {
    console.log(`[INVOICE-UPCOMING] Customer has cancelled during trial - subscription should not be charged`);
    
    await supabase.rpc('log_event', {
      p_event_type: 'invoice_upcoming_cancelled_trial',
      p_user_id: null,
      p_metadata: {
        invoice_id: invoice.id,
        customer_id: customerId,
        status: subscriber.status,
        billing_reason: invoice.billing_reason
      },
      p_severity: 'WARNING'
    });
  }

  await supabase.rpc('log_event', {
    p_event_type: 'stripe_invoice_upcoming',
    p_user_id: null,
    p_metadata: {
      invoice_id: invoice.id,
      customer_id: customerId,
      amount: (invoice.amount_due || 0) / 100,
      billing_reason: invoice.billing_reason
    },
    p_severity: 'INFO'
  });
}