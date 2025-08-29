import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[RESET-USER-DATA] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Create Supabase clients
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.id) throw new Error("User not authenticated");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Delete quiz results for the user
    const { error: quizError } = await supabaseService
      .from("quiz_results")
      .delete()
      .eq("user_id", user.id);

    if (quizError) {
      logStep("Error deleting quiz results", { error: quizError.message });
      throw new Error(`Failed to delete quiz results: ${quizError.message}`);
    }
    logStep("Quiz results deleted successfully");

    // Delete progress for the user
    const { error: progressError } = await supabaseService
      .from("progress")
      .delete()
      .eq("user_id", user.id);

    if (progressError) {
      logStep("Error deleting progress", { error: progressError.message });
      throw new Error(`Failed to delete progress: ${progressError.message}`);
    }
    logStep("Progress deleted successfully");

    // Log the action for audit purposes
    try {
      await supabaseService.rpc('log_event', {
        p_event_type: 'user_data_reset',
        p_user_id: user.id,
        p_metadata: {
          action: 'reset_user_data',
          tables_cleared: ['quiz_results', 'progress'],
          timestamp: new Date().toISOString()
        },
        p_severity: 'INFO'
      });
      logStep("Event logged successfully");
    } catch (logError) {
      logStep("Warning: Failed to log event", { error: logError });
      // Don't fail the whole operation if logging fails
    }

    logStep("User data reset completed successfully");

    return new Response(JSON.stringify({
      success: true,
      message: "All quiz results and progress have been successfully deleted"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in reset-user-data", { message: errorMessage });
    return new Response(JSON.stringify({ 
      error: errorMessage,
      success: false 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});