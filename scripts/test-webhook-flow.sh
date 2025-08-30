#!/bin/bash

# Automated Webhook Flow Testing Script
# Tests the complete subscription flow from trial to active

echo "🧪 Testing Stripe webhook flow..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Stripe CLI is available
if ! command -v stripe &> /dev/null; then
    echo -e "${RED}❌ Stripe CLI not found. Please install it first.${NC}"
    exit 1
fi

echo -e "${BLUE}🎯 Available Test Scenarios:${NC}"
echo "1. Test trial-to-active transition (invoice.payment_succeeded)"
echo "2. Test checkout completion (checkout.session.completed)"
echo "3. Test payment failure (invoice.payment_failed)"
echo "4. Test subscription update (customer.subscription.updated)"
echo "5. Test subscription cancellation (customer.subscription.deleted)"
echo "6. Run all tests sequentially"
echo ""

read -p "Choose test scenario (1-6): " test_choice

function trigger_and_wait() {
    local event_type=$1
    local description=$2
    
    echo -e "${YELLOW}🚀 Triggering: ${description}${NC}"
    stripe trigger "$event_type"
    echo -e "${BLUE}⏳ Waiting 3 seconds for webhook processing...${NC}"
    sleep 3
    echo -e "${GREEN}✅ Event triggered: ${event_type}${NC}"
    echo ""
}

function run_test() {
    case $1 in
        1)
            echo -e "${BLUE}🔄 Testing trial-to-active transition...${NC}"
            trigger_and_wait "invoice.payment_succeeded" "Trial-to-active payment"
            echo -e "${GREEN}✨ Check your UI - subscription should now show as 'Active'${NC}"
            ;;
        2)
            echo -e "${BLUE}💳 Testing checkout completion...${NC}"
            trigger_and_wait "checkout.session.completed" "New subscription checkout"
            echo -e "${GREEN}✨ Check transaction logs and subscriber records${NC}"
            ;;
        3)
            echo -e "${BLUE}❌ Testing payment failure...${NC}"
            trigger_and_wait "invoice.payment_failed" "Payment failure"
            echo -e "${GREEN}✨ Check error logs and retry logic${NC}"
            ;;
        4)
            echo -e "${BLUE}🔄 Testing subscription update...${NC}"
            trigger_and_wait "customer.subscription.updated" "Subscription modification"
            echo -e "${GREEN}✨ Check subscription details and billing changes${NC}"
            ;;
        5)
            echo -e "${BLUE}🗑️ Testing subscription cancellation...${NC}"
            trigger_and_wait "customer.subscription.deleted" "Subscription cancellation"
            echo -e "${GREEN}✨ Check that subscription status becomes inactive${NC}"
            ;;
        6)
            echo -e "${BLUE}🎪 Running complete test suite...${NC}"
            run_test 1
            run_test 2
            run_test 3
            run_test 4
            run_test 5
            echo -e "${GREEN}🎉 All tests completed!${NC}"
            ;;
        *)
            echo -e "${RED}❌ Invalid choice. Please select 1-6.${NC}"
            exit 1
            ;;
    esac
}

# Run the selected test
run_test "$test_choice"

echo ""
echo -e "${BLUE}🔍 Verification Checklist:${NC}"
echo "□ Check UI real-time updates (countdown timer, status badges)"
echo "□ Verify database changes in subscribers table"
echo "□ Review Edge Function logs for any errors"
echo "□ Test manual subscription refresh if needed"
echo ""
echo -e "${YELLOW}📊 Monitoring Links:${NC}"
echo "• Edge Function Logs: https://supabase.com/dashboard/project/jednyqvexkcrwxubxici/functions/stripe-webhooks/logs"
echo "• Database Logs: https://supabase.com/dashboard/project/jednyqvexkcrwxubxici/logs/postgres-logs"
echo "• Stripe Dashboard: https://dashboard.stripe.com/test/events"