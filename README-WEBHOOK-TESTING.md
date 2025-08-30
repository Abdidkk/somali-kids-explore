# Webhook Testing Setup - Complete Guide

This guide provides everything you need to test Stripe webhooks locally with automatic trial-to-active subscription flow.

## 🚀 Quick Start

1. **Run the setup script:**
   ```bash
   chmod +x scripts/setup-webhooks.sh
   ./scripts/setup-webhooks.sh
   ```

2. **Copy the webhook secret** from the terminal output to your Supabase secrets

3. **Test the flow:**
   ```bash
   stripe trigger invoice.payment_succeeded
   ```

4. **Monitor real-time updates** in your app UI

## 📁 Files Created

### Setup Scripts
- `scripts/setup-webhooks.sh` - Main setup script for webhook forwarding
- `scripts/test-webhook-flow.sh` - Automated testing script for all webhook scenarios
- `scripts/webhook-health-check.js` - Health monitoring and connectivity testing

### Enhanced Components
- `src/components/SystemTestPanel.tsx` - Complete webhook testing UI with tabs
- Enhanced webhook handler with improved logging and error handling

## 🔧 Manual Setup (Alternative)

If you prefer manual setup:

### 1. Start Stripe CLI
```bash
# For cloud Supabase (recommended)
stripe listen --forward-to https://jednyqvexkcrwxubxici.supabase.co/functions/v1/stripe-webhooks

# For local Supabase development
supabase start
stripe listen --forward-to http://localhost:54321/functions/v1/stripe-webhooks
```

### 2. Update Webhook Secret
Copy the webhook secret (whsec_...) from Stripe CLI output and update `STRIPE_WEBHOOK_SECRET` in your Supabase Edge Function secrets.

### 3. Test Events
```bash
# Test trial-to-active transition
stripe trigger invoice.payment_succeeded

# Test other events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.updated
stripe trigger customer.subscription.deleted
```

## 🧪 Testing Features

### Automated Test Scripts

**Complete flow testing:**
```bash
chmod +x scripts/test-webhook-flow.sh
./scripts/test-webhook-flow.sh
```

**Health monitoring:**
```bash
node scripts/webhook-health-check.js
```

### UI Testing Panel

Access the testing panel at `/system-test` with four main tabs:

1. **Overview** - System status dashboard
2. **Webhook Test** - Connectivity and endpoint testing
3. **Database Test** - Supabase connection verification
4. **Subscription** - Real-time subscription monitoring

## 🔍 Real-time Flow Verification

The complete trial-to-active flow works as follows:

1. **User in trial status** (countdown timer visible)
2. **Webhook event triggers** (`invoice.payment_succeeded`)
3. **Database updates** (`subscribers.status = 'active'`)
4. **Real-time listener activates** (Supabase real-time)
5. **UI updates automatically** (countdown disappears, "Aktiv" badge appears)

## 📊 Monitoring & Debugging

### Log Sources
- **Stripe CLI logs** - Real-time webhook events
- **Edge Function logs** - Webhook processing details
- **Browser console** - Real-time subscription updates
- **Supabase logs** - Database operations

### Useful Links
- [Edge Function Logs](https://supabase.com/dashboard/project/jednyqvexkcrwxubxici/functions/stripe-webhooks/logs)
- [Database Logs](https://supabase.com/dashboard/project/jednyqvexkcrwxubxici/logs/postgres-logs)
- [Stripe Test Events](https://dashboard.stripe.com/test/events)

## 🛠️ Troubleshooting

### Common Issues

1. **Webhook signature verification fails**
   - Ensure `STRIPE_WEBHOOK_SECRET` is correctly set
   - Check that the secret matches the Stripe CLI output

2. **No real-time updates**
   - Verify Supabase real-time is enabled
   - Check browser console for WebSocket connections
   - Ensure RLS policies allow updates

3. **Database updates not working**
   - Check Edge Function logs for errors
   - Verify `SUPABASE_SERVICE_ROLE_KEY` is set
   - Ensure trial status exists before testing

### Debug Steps

1. Run health check: `node scripts/webhook-health-check.js`
2. Test webhook connectivity via UI panel
3. Monitor Edge Function logs during webhook events
4. Check database directly for subscription status changes

## 🎯 Test Scenarios

The testing scripts cover these scenarios:

1. **Trial-to-active transition** - Primary use case
2. **Checkout completion** - New subscription creation
3. **Payment failure** - Error handling
4. **Subscription update** - Plan changes
5. **Subscription cancellation** - Account deactivation

## 📋 Verification Checklist

After setup, verify these work:

- [ ] Webhook endpoint responds to health checks
- [ ] Stripe CLI forwards events successfully
- [ ] Database updates when webhook events fire
- [ ] UI updates in real-time (no page refresh needed)
- [ ] Countdown timer disappears on trial-to-active
- [ ] "Aktiv" subscription badge appears
- [ ] Manual refresh button works as backup

## 🔄 Automation

The setup is designed for **zero-configuration testing**:

1. Run the setup script once
2. Copy webhook secret to Supabase
3. All future testing is automated via scripts or UI

No manual configuration needed for each test session!