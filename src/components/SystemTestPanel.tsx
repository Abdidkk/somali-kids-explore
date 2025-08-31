import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSubscription } from '@/hooks/useSubscription';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, Clock, Zap, Database, Webhook, Settings } from 'lucide-react';
import { toast } from 'sonner';

export default function SystemTestPanel() {
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [isTestingDatabase, setIsTestingDatabase] = useState(false);
  const [webhookStatus, setWebhookStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [dbStatus, setDbStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  
  const { subscribed, inTrial, subscriptionTier, status, loading, checkSubscription } = useSubscription();

  const testWebhookConnectivity = async () => {
    setIsTestingWebhook(true);
    setWebhookStatus('testing');
    
    try {
      // Test webhook endpoint health
      const response = await fetch('https://jednyqvexkcrwxubxici.supabase.co/functions/v1/stripe-webhooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'stripe-signature': 'test_signature'
        },
        body: JSON.stringify({
          type: 'test_event',
          data: { test: true }
        })
      });
      
      if (response.status === 200 || response.status === 400) {
        setWebhookStatus('success');
        toast.success('Webhook endpoint is responding correctly');
      } else {
        setWebhookStatus('error');
        toast.error(`Webhook test failed with status: ${response.status}`);
      }
    } catch (error) {
      setWebhookStatus('error');
      toast.error('Webhook endpoint is not reachable');
      console.error('Webhook test error:', error);
    } finally {
      setIsTestingWebhook(false);
    }
  };

  const testDatabaseConnection = async () => {
    setIsTestingDatabase(true);
    setDbStatus('testing');
    
    try {
      // Test database read
      const { data, error } = await supabase
        .from('subscribers')
        .select('count')
        .limit(1);
      
      if (error) throw error;
      
      setDbStatus('success');
      toast.success('Database connection is healthy');
    } catch (error) {
      setDbStatus('error');
      toast.error('Database connection failed');
      console.error('Database test error:', error);
    } finally {
      setIsTestingDatabase(false);
    }
  };

  const triggerSubscriptionRefresh = async () => {
    try {
      await checkSubscription();
      toast.success('Subscription status refreshed');
    } catch (error) {
      toast.error('Failed to refresh subscription status');
      console.error('Subscription refresh error:', error);
    }
  };

  const manualSyncSubscription = async () => {
    try {
      console.log('[MANUAL-SYNC] Starting manual subscription sync...');
      toast.info('Syncing with Stripe...');
      
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) {
        console.error('[MANUAL-SYNC] Edge function error:', error);
        throw new Error(`Edge function error: ${error.message}`);
      }

      console.log('[MANUAL-SYNC] Edge function response:', data);
      
      // Also refresh the local subscription hook
      await checkSubscription();
      
      toast.success('Subscription synced successfully');
    } catch (error) {
      console.error('[MANUAL-SYNC] Manual sync failed:', error);
      toast.error(`Sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'testing':
        return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />;
      default:
        return <Settings className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (value: boolean | string | null, trueLabel = 'Active', falseLabel = 'Inactive') => {
    if (typeof value === 'boolean') {
      return (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? trueLabel : falseLabel}
        </Badge>
      );
    }
    return (
      <Badge variant={value ? 'default' : 'secondary'}>
        {value || 'Not set'}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="webhook">Webhook Test</TabsTrigger>
          <TabsTrigger value="database">Database Test</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Webhook Status</CardTitle>
                <Webhook className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(webhookStatus)}
                  <span className="text-sm">
                    {webhookStatus === 'idle' ? 'Not tested' : 
                     webhookStatus === 'testing' ? 'Testing...' :
                     webhookStatus === 'success' ? 'Healthy' : 'Error'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Database Status</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(dbStatus)}
                  <span className="text-sm">
                    {dbStatus === 'idle' ? 'Not tested' : 
                     dbStatus === 'testing' ? 'Testing...' :
                     dbStatus === 'success' ? 'Connected' : 'Error'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscription Status</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  {loading ? (
                    <Clock className="h-4 w-4 text-yellow-500 animate-spin" />
                  ) : subscribed ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">
                    {loading ? 'Loading...' : status || 'Unknown'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="webhook" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Connectivity Test</CardTitle>
              <CardDescription>
                Test the Stripe webhook endpoint connectivity and response
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Endpoint Health</p>
                  <p className="text-xs text-muted-foreground">
                    Tests if the webhook endpoint is reachable and responding
                  </p>
                </div>
                <Button 
                  onClick={testWebhookConnectivity}
                  disabled={isTestingWebhook}
                  variant="outline"
                  size="sm"
                >
                  {isTestingWebhook ? 'Testing...' : 'Test Webhook'}
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium">Webhook Setup Instructions</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>1. Install Stripe CLI: <code>npm install -g stripe-cli</code></p>
                  <p>2. Start webhook forwarding:</p>
                  <code className="block bg-muted p-2 rounded">
                    stripe listen --forward-to https://jednyqvexkcrwxubxici.supabase.co/functions/v1/stripe-webhooks
                  </code>
                  <p>3. Copy the webhook secret (whsec_...) to Supabase secrets</p>
                  <p>4. Test with: <code>stripe trigger invoice.payment_succeeded</code></p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Connectivity Test</CardTitle>
              <CardDescription>
                Test Supabase database connection and basic operations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Connection Health</p>
                  <p className="text-xs text-muted-foreground">
                    Tests if the database is reachable and responsive
                  </p>
                </div>
                <Button 
                  onClick={testDatabaseConnection}
                  disabled={isTestingDatabase}
                  variant="outline"
                  size="sm"
                >
                  {isTestingDatabase ? 'Testing...' : 'Test Database'}
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium">Real-time Testing</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Real-time updates are enabled for the subscribers table</p>
                  <p>• Status changes should appear instantly in the UI</p>
                  <p>• Monitor browser console for real-time events</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Status</CardTitle>
              <CardDescription>
                Current subscription information and manual refresh controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Current Status</p>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-xs">Subscribed:</span>
                      {getStatusBadge(subscribed)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">In Trial:</span>
                      {getStatusBadge(inTrial)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">Tier:</span>
                      {getStatusBadge(subscriptionTier)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">Status:</span>
                      {getStatusBadge(status)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Manual Controls</p>
                  <div className="space-y-2">
                    <Button 
                      onClick={triggerSubscriptionRefresh}
                      disabled={loading}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      {loading ? 'Refreshing...' : 'Refresh Status'}
                    </Button>
                    <Button 
                      onClick={manualSyncSubscription}
                      disabled={loading}
                      variant="secondary"
                      size="sm"
                      className="w-full"
                    >
                      <Zap className="h-4 w-4 mr-1" />
                      {loading ? 'Syncing...' : 'Force Sync with Stripe'}
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium">Testing Trial-to-Active Flow</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>1. Ensure user is in trial status</p>
                  <p>2. Run: <code>stripe trigger invoice.payment_succeeded</code></p>
                  <p>3. Watch for real-time status change to "active"</p>
                  <p>4. Verify countdown timer disappears</p>
                  <p>5. Check that "Aktiv" badge appears</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}