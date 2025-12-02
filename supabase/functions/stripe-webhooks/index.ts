import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';

// Sanitize update data to only include allowed fields
function sanitizeSubscriberUpdate(data: any): any {
  const allowedFields = [
    'subscribed', 'status', 'trial_end', 'trial_end_local', 
    'subscription_tier', 'billing_interval', 'num_kids', 
    'updated_at', 'stripe_customer_id', 'user_id', 'email',
    'subscription_end'
  ];
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedFields.includes(key))
  );
}

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
        .update(sanitizeSubscriberUpdate(updateData))
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
      if (userId) finalUpdateData.user_id = userId; // Auto-heal user_id
      
      const { error: updateError } = await supabase
        .from('subscribers')
        .update(sanitizeSubscriberUpdate(finalUpdateData))
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
        .update(sanitizeSubscriberUpdate(finalUpdateData))
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
  const { user_id, num_kids, unified_pricing, type } = (session.metadata || {}) as any;

  console.log(`[CHECKOUT-DEBUG] 🛒 Processing checkout session: ${session.id}`);
  console.log(`[CHECKOUT-DEBUG] Mode: ${session.mode}`);
  console.log(`[CHECKOUT-DEBUG] Customer ID: ${session.customer}`);
  console.log(`[CHECKOUT-DEBUG] User ID: ${user_id}`);
  console.log(`[CHECKOUT-DEBUG] Unified pricing: ${unified_pricing}`);
  console.log(`[CHECKOUT-DEBUG] Type: ${type}`);

  const customerId = (session.customer as string) || null;
  let email = session.customer_email || session.customer_details?.email || null;

  if (!email && customerId) {
    console.log(`[CHECKOUT-DEBUG] ⚠️ No email in session, fetching from Stripe customer`);
    email = await getCustomerEmail(stripe, customerId);
  }

  if (!user_id && !email && !customerId) {
    console.error('[CHECKOUT-DEBUG] ❌ Missing all identifiers - cannot process');
    return;
  }

  // Handle "add_child" type - one-time purchase to increase num_kids
  if (type === 'add_child') {
    console.log(`[CHECKOUT-DEBUG] 🧒 ADD CHILD MODE - incrementing num_kids`);
    
    try {
      // Find the subscriber
      const { data: subscriber, error: findError } = await supabase
        .from('subscribers')
        .select('id, num_kids, email, user_id')
        .or(`stripe_customer_id.eq.${customerId},email.eq.${email},user_id.eq.${user_id}`)
        .maybeSingle();
      
      if (findError || !subscriber) {
        console.error('[CHECKOUT-DEBUG] ❌ Could not find subscriber for add_child');
        return;
      }
      
      const currentNumKids = subscriber.num_kids ?? 0;
      const newNumKids = currentNumKids + 1;
      
      console.log(`[CHECKOUT-DEBUG] Current num_kids: ${currentNumKids}, New num_kids: ${newNumKids}`);
      
      // Update num_kids
      const { error: updateError } = await supabase
        .from('subscribers')
        .update({ 
          num_kids: newNumKids,
          updated_at: new Date().toISOString() 
        })
        .eq('id', subscriber.id);
      
      if (updateError) {
        console.error('[CHECKOUT-DEBUG] ❌ Failed to update num_kids:', updateError);
        return;
      }
      
      console.log(`[CHECKOUT-DEBUG] ✅ Successfully increased num_kids to ${newNumKids}`);
      
      // Log transaction for add_child payment
      const addChildAmount = session.amount_total ? session.amount_total / 100 : 15;
      await supabase.from('transactions').insert({
        user_id: subscriber.user_id || user_id || null,
        stripe_session_id: session.id,
        stripe_transaction_id: null,
        amount: addChildAmount,
        currency: 'DKK',
        status: 'completed',
        num_kids: newNumKids,
        subscription_tier: 'extra_child',
        billing_interval: null,
        metadata: {
          type: 'add_child',
          previous_num_kids: currentNumKids,
          new_num_kids: newNumKids,
        },
      });
      
      console.log(`[CHECKOUT-DEBUG] ✅ Transaction logged for add_child: ${addChildAmount} kr`);
      
      // Log event
      await supabase.rpc('log_event', {
        p_event_type: 'add_child_granted',
        p_user_id: user_id || null,
        p_metadata: {
          session_id: session.id,
          previous_num_kids: currentNumKids,
          new_num_kids: newNumKids,
          amount: addChildAmount,
        },
        p_severity: 'INFO'
      });
      
      // Activate children based on new num_kids count
      if (subscriber.user_id) {
        const totalAllowedKids = newNumKids + 1; // +1 for base subscription
        
        const { data: children } = await supabase
          .from('child_profiles')
          .select('id')
          .eq('parent_user_id', subscriber.user_id)
          .order('created_at', { ascending: true });
        
        if (children) {
          const activeChildIds = children.slice(0, totalAllowedKids).map((c: any) => c.id);
          
          if (activeChildIds.length > 0) {
            await supabase
              .from('child_profiles')
              .update({ is_active: true })
              .in('id', activeChildIds);
            
            console.log(`[CHECKOUT-DEBUG] ✅ Activated ${activeChildIds.length} children after payment`);
          }
        }
      }
      
    } catch (error) {
      console.error('[CHECKOUT-DEBUG] ❌ Error in add_child handler:', error);
    }
    
    return; // Exit early for add_child
  }

  // Handle subscription mode with unified pricing
  if (session.mode === 'subscription') {
    console.log(`[CHECKOUT-DEBUG] 🔄 SUBSCRIPTION MODE - unified pricing model`);
    
    const subscriptionId = session.subscription as string;
    if (!subscriptionId) {
      console.error('[CHECKOUT-DEBUG] ❌ No subscription ID found');
      return;
    }

    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      console.log(`[CHECKOUT-DEBUG] Subscription: ${subscription.id}, Status: ${subscription.status}`);

      // Calculate trial end (24 hours) - managed manually since Stripe only supports whole days
      const trialEnd = new Date();
      trialEnd.setHours(trialEnd.getHours() + 24);
      
      // Calculate Danish timezone version
      const trialEndDanish = new Date(trialEnd.toLocaleString("en-US", {timeZone: "Europe/Copenhagen"}));

      console.log(`[CHECKOUT-DEBUG] Trial end (UTC): ${trialEnd.toISOString()}`);
      console.log(`[CHECKOUT-DEBUG] Trial end (Danish): ${trialEndDanish.toISOString()}`);

      // Get subscription amount
      let subscriptionAmount = 0;
      subscription.items.data.forEach((item: any) => {
        subscriptionAmount += (item.price.unit_amount || 0) * item.quantity;
      });
      subscriptionAmount = subscriptionAmount / 100; // Convert from øre to kr

      console.log(`[CHECKOUT-DEBUG] Subscription amount: ${subscriptionAmount} kr`);

      // Update subscriber with trial info
      const subscriberUpdateData = {
        subscribed: false, // Will be true after first payment
        status: 'trial',
        trial_end: trialEnd.toISOString(),
        trial_end_local: trialEndDanish.toISOString(),
        subscription_tier: 'standard',
        billing_interval: 'monthly',
        num_kids: parseInt(num_kids || '1', 10),
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
        const newSubscriberData = {
          email,
          user_id: user_id || null,
          stripe_customer_id: customerId,
          ...subscriberUpdateData
        };
        await supabase.from('subscribers').upsert(
          sanitizeSubscriberUpdate(newSubscriberData), 
          { onConflict: 'email' }
        );
      }

      // Try to update existing pending transaction first
      const { data: existingTransaction } = await supabase
        .from('transactions')
        .select('id, status, amount')
        .eq('stripe_session_id', session.id)
        .eq('status', 'pending')
        .maybeSingle();

      if (existingTransaction) {
        // Update existing pending transaction to completed
        const { error: updateError } = await supabase
          .from('transactions')
          .update({
            stripe_transaction_id: subscriptionId,
            status: 'completed',
            amount: subscriptionAmount,
            updated_at: new Date().toISOString(),
            metadata: {
              unified_pricing: true,
              subscription_id: subscriptionId,
              updated_from_pending: true,
            },
          })
          .eq('id', existingTransaction.id);
        
        if (updateError) {
          console.error(`[CHECKOUT-DEBUG] ❌ Failed to update transaction:`, updateError);
        } else {
          console.log(`[CHECKOUT-DEBUG] ✅ Updated existing transaction ${existingTransaction.id} from pending to completed`);
        }
      } else {
        // No pending transaction found, create new one (fallback for old sessions)
        const { error: insertError } = await supabase.from('transactions').insert({
          user_id: user_id || null,
          stripe_session_id: session.id,
          stripe_transaction_id: subscriptionId,
          amount: subscriptionAmount,
          currency: 'DKK',
          status: 'completed',
          num_kids: parseInt(num_kids || '1', 10),
          subscription_tier: 'standard',
          billing_interval: 'monthly',
          metadata: {
            unified_pricing: true,
            subscription_id: subscriptionId,
            created_without_pending: true,
          },
        });
        
        if (insertError) {
          console.error(`[CHECKOUT-DEBUG] ❌ Failed to insert transaction:`, insertError);
        } else {
          console.log(`[CHECKOUT-DEBUG] ✅ Created new completed transaction (no pending found)`);
        }
      }
      
      console.log(`[CHECKOUT-DEBUG] ✅ 24-hour trial activated successfully`);
      
      // Log event
      await supabase.rpc('log_event', {
        p_event_type: 'stripe_24h_trial_started',
        p_user_id: user_id || null,
        p_metadata: {
          session_id: session.id,
          subscription_id: subscriptionId,
          trial_end_utc: trialEnd.toISOString(),
          trial_end_danish: trialEndDanish.toISOString(),
          num_kids: num_kids,
          unified_pricing: true,
          trial_hours: 24,
        },
        p_severity: 'INFO'
      });
    } catch (error) {
      console.error('[CHECKOUT-DEBUG] ❌ Error processing subscription:', error);
      
      await supabase.rpc('log_event', {
        p_event_type: 'stripe_subscription_error',
        p_user_id: user_id || null,
        p_metadata: { 
          error: (error as any).message,
          session_id: session.id 
        },
        p_severity: 'ERROR'
      });
    }
  } else {
    console.log(`[CHECKOUT-DEBUG] ⚠️ Ignoring non-subscription mode: ${session.mode}`);
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
        
        // Check if num_kids is missing or 0 - fallback to fetch from Stripe subscription
        const { data: subscriber } = await supabase
          .from('subscribers')
          .select('id, num_kids')
          .eq('stripe_customer_id', customerId)
          .maybeSingle();
        
        if (subscriber && (!subscriber.num_kids || subscriber.num_kids === 0) && invoice.subscription) {
          console.log(`[PAYMENT-DEBUG] ⚠️ num_kids is ${subscriber.num_kids}, fetching from Stripe subscription`);
          try {
            const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
            const numKidsFromPrice = parseInt(
              (subscription.items.data[0]?.price?.metadata?.num_kids as string) || '1', 
              10
            );
            console.log(`[PAYMENT-DEBUG] Found num_kids in Stripe metadata: ${numKidsFromPrice}`);
            
            await supabase
              .from('subscribers')
              .update({ 
                num_kids: numKidsFromPrice, 
                updated_at: new Date().toISOString() 
              })
              .eq('id', subscriber.id);
            
            console.log(`[PAYMENT-DEBUG] ✅ Updated num_kids to ${numKidsFromPrice}`);
          } catch (error) {
            console.error(`[PAYMENT-DEBUG] ❌ Failed to fetch/update num_kids:`, error);
          }
        }
        
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
  const subscriptionEnd = subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null;

  // VIGTIGT: Opdater UDEN at overskrive num_kids (den er sat korrekt ved checkout)
  const { data: subscriberData } = await supabase.from('subscribers')
    .update({
      stripe_customer_id: customerId,
      subscribed: isActive,
      status: isActive ? 'active' : status,
      subscription_tier: billingInterval === 'monthly' ? 'Månedlig' : 'Årlig',
      subscription_end: subscriptionEnd,
      billing_interval: billingInterval,
      // num_kids FJERNET - bevares fra checkout
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', customerId)
    .select('user_id, num_kids')
    .single();
  
  console.log(`[SUBSCRIPTION-UPDATE] Customer: ${customerId}, Status: ${status}, num_kids from DB: ${subscriberData?.num_kids}`);

  // Update children activation status based on num_kids
  if (subscriberData?.user_id) {
    const totalAllowedKids = (subscriberData.num_kids || 0) + 1; // +1 for base subscription
    
    // Fetch all children sorted by created_at (oldest first)
    const { data: children } = await supabase
      .from('child_profiles')
      .select('id')
      .eq('parent_user_id', subscriberData.user_id)
      .order('created_at', { ascending: true });
    
    if (children) {
      // Activate the first N children
      const activeChildIds = children.slice(0, totalAllowedKids).map((c: any) => c.id);
      const inactiveChildIds = children.slice(totalAllowedKids).map((c: any) => c.id);
      
      if (activeChildIds.length > 0) {
        await supabase
          .from('child_profiles')
          .update({ is_active: true })
          .in('id', activeChildIds);
      }
      
      if (inactiveChildIds.length > 0) {
        await supabase
          .from('child_profiles')
          .update({ is_active: false })
          .in('id', inactiveChildIds);
      }
      
      console.log(`[SUBSCRIPTION-UPDATE] Activated ${activeChildIds.length} children, deactivated ${inactiveChildIds.length}`);
    }
  }

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

    // Deactivate all children except the first one (base subscription includes 1 child)
    if (subscriber.user_id) {
      const { data: children } = await supabase
        .from('child_profiles')
        .select('id')
        .eq('parent_user_id', subscriber.user_id)
        .order('created_at', { ascending: true });
      
      if (children && children.length > 0) {
        const allChildIds = children.map((c: any) => c.id);
        
        await supabase
          .from('child_profiles')
          .update({ is_active: false })
          .in('id', allChildIds);
        
        console.log(`[SUBSCRIPTION-DELETE] Deactivated ALL ${allChildIds.length} children`);
      }
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