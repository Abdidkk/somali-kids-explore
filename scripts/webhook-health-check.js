#!/usr/bin/env node

/**
 * Webhook Health Check and Monitoring Tool
 * Tests webhook connectivity and monitors real-time updates
 */

const https = require('https');
const readline = require('readline');

const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

class WebhookHealthChecker {
    constructor() {
        this.webhookUrl = 'https://jednyqvexkcrwxubxici.supabase.co/functions/v1/stripe-webhooks';
        this.testStartTime = new Date();
    }

    log(message, color = 'reset') {
        const timestamp = new Date().toISOString();
        console.log(`${colors[color]}[${timestamp}] ${message}${colors.reset}`);
    }

    async checkWebhookEndpoint() {
        this.log('🔍 Checking webhook endpoint health...', 'blue');
        
        return new Promise((resolve) => {
            const postData = JSON.stringify({
                type: 'health_check',
                data: { test: true }
            });

            const options = {
                hostname: 'jednyqvexkcrwxubxici.supabase.co',
                port: 443,
                path: '/functions/v1/stripe-webhooks',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData),
                    'stripe-signature': 'test_signature'
                }
            };

            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode === 200 || res.statusCode === 400) {
                        this.log('✅ Webhook endpoint is responding', 'green');
                        resolve(true);
                    } else {
                        this.log(`❌ Webhook endpoint returned status: ${res.statusCode}`, 'red');
                        resolve(false);
                    }
                });
            });

            req.on('error', (error) => {
                this.log(`❌ Webhook endpoint error: ${error.message}`, 'red');
                resolve(false);
            });

            req.setTimeout(5000, () => {
                this.log('❌ Webhook endpoint timeout', 'red');
                resolve(false);
            });

            req.write(postData);
            req.end();
        });
    }

    async checkSupabaseConnection() {
        this.log('🔍 Checking Supabase connection...', 'blue');
        
        return new Promise((resolve) => {
            const options = {
                hostname: 'jednyqvexkcrwxubxici.supabase.co',
                port: 443,
                path: '/rest/v1/subscribers?select=count',
                method: 'GET',
                headers: {
                    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZG55cXZleGtjcnd4dWJ4aWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMjMxOTIsImV4cCI6MjA2Nzg5OTE5Mn0.lP_JsX-G5xxJwDCa9tpVGCx_34yrycOJbzMjs7ADhT8',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZG55cXZleGtjcnd4dWJ4aWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMjMxOTIsImV4cCI6MjA2Nzg5OTE5Mn0.lP_JsX-G5xxJwDCa9tpVGCx_34yrycOJbzMjs7ADhT8'
                }
            };

            const req = https.request(options, (res) => {
                if (res.statusCode === 200) {
                    this.log('✅ Supabase connection is healthy', 'green');
                    resolve(true);
                } else {
                    this.log(`❌ Supabase connection failed: ${res.statusCode}`, 'red');
                    resolve(false);
                }
            });

            req.on('error', (error) => {
                this.log(`❌ Supabase connection error: ${error.message}`, 'red');
                resolve(false);
            });

            req.setTimeout(5000, () => {
                this.log('❌ Supabase connection timeout', 'red');
                resolve(false);
            });

            req.end();
        });
    }

    displayInstructions() {
        this.log('📋 Webhook Testing Instructions:', 'cyan');
        console.log('');
        console.log('1. Make sure Stripe CLI is running:');
        console.log('   stripe listen --forward-to https://jednyqvexkcrwxubxici.supabase.co/functions/v1/stripe-webhooks');
        console.log('');
        console.log('2. Test webhook events:');
        console.log('   stripe trigger invoice.payment_succeeded');
        console.log('   stripe trigger checkout.session.completed');
        console.log('');
        console.log('3. Monitor real-time updates in your app');
        console.log('');
        console.log('4. Check logs:');
        console.log('   • Edge Functions: https://supabase.com/dashboard/project/jednyqvexkcrwxubxici/functions/stripe-webhooks/logs');
        console.log('   • Database: https://supabase.com/dashboard/project/jednyqvexkcrwxubxici/logs/postgres-logs');
        console.log('');
    }

    async runHealthCheck() {
        this.log('🏥 Starting webhook health check...', 'yellow');
        console.log('');

        const webhookHealthy = await this.checkWebhookEndpoint();
        const supabaseHealthy = await this.checkSupabaseConnection();

        console.log('');
        this.log('📊 Health Check Results:', 'cyan');
        console.log(`  Webhook Endpoint: ${webhookHealthy ? '✅ Healthy' : '❌ Unhealthy'}`);
        console.log(`  Supabase Connection: ${supabaseHealthy ? '✅ Healthy' : '❌ Unhealthy'}`);
        console.log('');

        if (webhookHealthy && supabaseHealthy) {
            this.log('🎉 All systems operational! Ready for webhook testing.', 'green');
        } else {
            this.log('⚠️  Some issues detected. Check the logs above.', 'yellow');
        }

        console.log('');
        this.displayInstructions();
    }
}

// Run health check
const checker = new WebhookHealthChecker();
checker.runHealthCheck().catch(console.error);