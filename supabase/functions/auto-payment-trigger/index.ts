import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[AUTO-PAYMENT-TRIGGER] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Service role client for checking expired trials
  const supabaseService = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Checking for expired trials in Danish timezone");

    // Get current time in Danish timezone
    const danishNow = new Date().toLocaleString("en-US", {timeZone: "Europe/Copenhagen"});
    const danishNowDate = new Date(danishNow);
    
    logStep("Danish current time", { danishTime: danishNowDate.toISOString() });

    // Find subscribers with expired trials who haven't been processed
    const { data: expiredTrials, error } = await supabaseService
      .from('subscribers')
      .select('*')
      .eq('subscribed', false)
      .eq('status', 'trial')
      .not('trial_end_local', 'is', null)
      .lt('trial_end_local', danishNowDate.toISOString());

    if (error) {
      logStep("Error fetching expired trials", { error: error.message });
      throw error;
    }

    if (!expiredTrials || expiredTrials.length === 0) {
      logStep("No expired trials found");
      return new Response(JSON.stringify({ 
        message: "No expired trials found",
        processedCount: 0 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    logStep("Found expired trials", { count: expiredTrials.length });

    let processedCount = 0;
    const results = [];

    for (const subscriber of expiredTrials) {
      try {
        // Update status to expired
        const { error: updateError } = await supabaseService
          .from('subscribers')
          .update({ 
            status: 'expired',
            updated_at: new Date().toISOString()
          })
          .eq('id', subscriber.id);

        if (updateError) {
          logStep("Failed to update subscriber status", { 
            subscriberId: subscriber.id, 
            error: updateError.message 
          });
          continue;
        }

        // Log event for expired trial
        await supabaseService.from('event_logs').insert({
          event_type: 'trial_expired_auto',
          user_id: subscriber.user_id,
          metadata: {
            email: subscriber.email,
            trial_end_danish: subscriber.trial_end_local,
            processed_at: danishNowDate.toISOString()
          },
          severity: 'INFO'
        });

        processedCount++;
        results.push({
          email: subscriber.email,
          trialEndDanish: subscriber.trial_end_local,
          status: 'processed'
        });

        logStep("Processed expired trial", { 
          email: subscriber.email, 
          trialEnd: subscriber.trial_end_local 
        });

      } catch (processError) {
        logStep("Error processing subscriber", { 
          subscriberId: subscriber.id, 
          error: (processError as any).message 
        });
        results.push({
          email: subscriber.email,
          status: 'error',
          error: (processError as any).message
        });
      }
    }

    logStep("Completed processing expired trials", { 
      total: expiredTrials.length, 
      processed: processedCount 
    });

    return new Response(JSON.stringify({
      message: `Processed ${processedCount} expired trials`,
      processedCount,
      results
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in auto-payment-trigger", { message: errorMessage });
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      processedCount: 0 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});