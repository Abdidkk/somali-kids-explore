#!/bin/bash

# Stripe Webhook Setup Script for Local Development
# This script automates the entire webhook testing setup

echo "🚀 Setting up Stripe webhooks for local development..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Stripe CLI is installed
if ! command -v stripe &> /dev/null; then
    echo -e "${RED}❌ Stripe CLI not found. Please install it first:${NC}"
    echo "   npm install -g stripe-cli"
    echo "   Or visit: https://stripe.com/docs/stripe-cli"
    exit 1
fi

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo -e "${YELLOW}⚠️  Supabase CLI not found. Some features may be limited.${NC}"
    echo "   npm install -g supabase"
fi

echo -e "${BLUE}🔧 Configuration Options:${NC}"
echo "1. Cloud Supabase (Production/Staging)"
echo "2. Local Supabase (Development)"
read -p "Choose your setup (1 or 2): " setup_choice

# Set webhook URL based on choice
if [ "$setup_choice" = "2" ]; then
    WEBHOOK_URL="http://localhost:54321/functions/v1/stripe-webhooks"
    echo -e "${YELLOW}📦 Starting local Supabase...${NC}"
    if command -v supabase &> /dev/null; then
        supabase start
    else
        echo -e "${RED}❌ Supabase CLI not found. Cannot start local instance.${NC}"
        exit 1
    fi
else
    WEBHOOK_URL="https://jednyqvexkcrwxubxici.supabase.co/functions/v1/stripe-webhooks"
fi

echo -e "${BLUE}📡 Webhook URL: ${WEBHOOK_URL}${NC}"

# Start Stripe listener and capture the webhook secret
echo -e "${YELLOW}🎯 Starting Stripe webhook listener...${NC}"
echo -e "${BLUE}💡 This will show webhook events in real-time${NC}"
echo -e "${BLUE}💡 Copy the webhook secret (whsec_...) to update STRIPE_WEBHOOK_SECRET${NC}"
echo ""

# Run Stripe listen with proper event filtering
stripe listen \
    --forward-to "$WEBHOOK_URL" \
    --events checkout.session.completed,invoice.payment_succeeded,invoice.payment_failed,customer.subscription.updated,customer.subscription.deleted \
    --print-secret

echo -e "${GREEN}✅ Webhook listener started successfully!${NC}"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo "1. Copy the webhook secret (whsec_...) from above"
echo "2. Update STRIPE_WEBHOOK_SECRET in your Supabase secrets"
echo "3. Test with: stripe trigger invoice.payment_succeeded"
echo "4. Monitor your app's UI for real-time updates"
echo ""
echo -e "${BLUE}🔍 Debugging Tips:${NC}"
echo "• Check Edge Function logs: https://supabase.com/dashboard/project/jednyqvexkcrwxubxici/functions/stripe-webhooks/logs"
echo "• Monitor database changes in real-time"
echo "• Use browser dev tools to see real-time subscription updates"