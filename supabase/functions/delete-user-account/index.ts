import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[DELETE-USER-ACCOUNT] ${step}${detailsStr}`);
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
      { 
        auth: { 
          persistSession: false,
          autoRefreshToken: false
        }
      }
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

    // Parse request body for email confirmation
    const body = await req.json();
    const { confirmationEmail } = body;
    
    if (!confirmationEmail || confirmationEmail !== user.email) {
      throw new Error("Email confirmation does not match user email");
    }
    logStep("Email confirmation verified");

    // Initialize Stripe (with error handling for missing key)
    let stripe = null;
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (stripeKey) {
      stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
      logStep("Stripe initialized");
    } else {
      logStep("Warning: No Stripe key found, skipping Stripe operations");
    }

    // Get user's Stripe customer ID if exists
    let stripeCustomerId = null;
    if (stripe) {
      try {
        const { data: subscriber } = await supabaseService
          .from("subscribers")
          .select("stripe_customer_id")
          .eq("user_id", user.id)
          .single();
        
        stripeCustomerId = subscriber?.stripe_customer_id;
        logStep("Stripe customer ID retrieved", { customerId: stripeCustomerId });
      } catch (error) {
        logStep("No subscriber record found or error retrieving it", { error: (error as any).message });
      }
    }

    // Delete Stripe customer if exists
    if (stripe && stripeCustomerId) {
      try {
        await stripe.customers.del(stripeCustomerId);
        logStep("Stripe customer deleted successfully", { customerId: stripeCustomerId });
      } catch (stripeError) {
        logStep("Warning: Failed to delete Stripe customer (may already be deleted)", { 
          error: (stripeError as any).message,
          customerId: stripeCustomerId 
        });
        // Don't fail the whole operation if Stripe deletion fails
      }
    }

    // Log the account deletion action for audit purposes
    try {
      await supabaseService.rpc('log_event', {
        p_event_type: 'account_deletion_initiated',
        p_user_id: user.id,
        p_metadata: {
          action: 'delete_user_account',
          email: user.email,
          stripe_customer_deleted: !!stripeCustomerId,
          timestamp: new Date().toISOString()
        },
        p_severity: 'WARNING'
      });
      logStep("Account deletion logged successfully");
    } catch (logError) {
      logStep("Warning: Failed to log account deletion", { error: logError });
      // Don't fail the operation if logging fails
    }

    // Delete user data from all tables (in order to respect foreign key constraints)
    const deletionResults = {
      quiz_results: 0,
      progress: 0,
      child_profiles: 0,
      transactions: 0,
      subscribers: 0,
      user_roles: 0,
      users: 0
    };

    // Delete quiz results
    try {
      const { error: quizError, count } = await supabaseService
        .from("quiz_results")
        .delete({ count: 'exact' })
        .eq("user_id", user.id);
      
      if (quizError) throw quizError;
      deletionResults.quiz_results = count || 0;
      logStep("Quiz results deleted", { count });
    } catch (error) {
      logStep("Error deleting quiz results", { error: (error as any).message });
    }

    // Delete progress records
    try {
      const { error: progressError, count } = await supabaseService
        .from("progress")
        .delete({ count: 'exact' })
        .eq("user_id", user.id);
      
      if (progressError) throw progressError;
      deletionResults.progress = count || 0;
      logStep("Progress records deleted", { count });
    } catch (error) {
      logStep("Error deleting progress", { error: (error as any).message });
    }

    // Delete child profiles
    try {
      const { error: childError, count } = await supabaseService
        .from("child_profiles")
        .delete({ count: 'exact' })
        .eq("parent_user_id", user.id);
      
      if (childError) throw childError;
      deletionResults.child_profiles = count || 0;
      logStep("Child profiles deleted", { count });
    } catch (error) {
      logStep("Error deleting child profiles", { error: (error as any).message });
    }

    // Delete transactions
    try {
      const { error: transactionError, count } = await supabaseService
        .from("transactions")
        .delete({ count: 'exact' })
        .eq("user_id", user.id);
      
      if (transactionError) throw transactionError;
      deletionResults.transactions = count || 0;
      logStep("Transactions deleted", { count });
    } catch (error) {
      logStep("Error deleting transactions", { error: (error as any).message });
    }

    // Delete subscriber record
    try {
      const { error: subscriberError, count } = await supabaseService
        .from("subscribers")
        .delete({ count: 'exact' })
        .eq("user_id", user.id);
      
      if (subscriberError) throw subscriberError;
      deletionResults.subscribers = count || 0;
      logStep("Subscriber record deleted", { count });
    } catch (error) {
      logStep("Error deleting subscriber", { error: (error as any).message });
    }

    // Delete user roles
    try {
      const { error: rolesError, count } = await supabaseService
        .from("user_roles")
        .delete({ count: 'exact' })
        .eq("user_id", user.id);
      
      if (rolesError) throw rolesError;
      deletionResults.user_roles = count || 0;
      logStep("User roles deleted", { count });
    } catch (error) {
      logStep("Error deleting user roles", { error: (error as any).message });
    }

    // Delete from users table
    try {
      const { error: usersError, count } = await supabaseService
        .from("users")
        .delete({ count: 'exact' })
        .eq("id", user.id);
      
      if (usersError) throw usersError;
      deletionResults.users = count || 0;
      logStep("User record deleted", { count });
    } catch (error) {
      logStep("Error deleting user record", { error: (error as any).message });
    }

    // Finally, delete the user from Supabase Auth
    try {
      const { error: authDeleteError } = await supabaseService.auth.admin.deleteUser(user.id);
      if (authDeleteError) throw authDeleteError;
      logStep("User deleted from Supabase Auth successfully");
    } catch (authError) {
      logStep("Error deleting user from Auth", { error: (authError as any).message });
      throw new Error(`Failed to delete user from authentication: ${(authError as any).message}`);
    }

    // Log final completion
    try {
      await supabaseService.rpc('log_event', {
        p_event_type: 'account_deletion_completed',
        p_user_id: null, // User no longer exists
        p_metadata: {
          action: 'delete_user_account_completed',
          original_user_id: user.id,
          email: user.email,
          deletion_results: deletionResults,
          stripe_customer_deleted: !!stripeCustomerId,
          timestamp: new Date().toISOString()
        },
        p_severity: 'INFO'
      });
      logStep("Account deletion completion logged");
    } catch (logError) {
      logStep("Warning: Failed to log completion", { error: logError });
    }

    logStep("User account deletion completed successfully", { deletionResults });

    return new Response(JSON.stringify({
      success: true,
      message: "Your account has been permanently deleted",
      deletionResults
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in delete-user-account", { message: errorMessage });
    return new Response(JSON.stringify({ 
      error: errorMessage,
      success: false 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});