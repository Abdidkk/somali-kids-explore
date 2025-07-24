import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Avanceret Rate Limiter med Redis-lignende sliding window
class RateLimiter {
  private limits: Map<string, number[]> = new Map();
  
  constructor(
    private maxRequests: number = 10,
    private windowMs: number = 60000 // 1 minute
  ) {}

  check(key: string): { allowed: boolean, remainingRequests: number } {
    const now = Date.now();
    const requests = this.limits.get(key) || [];
    
    const validRequests = requests.filter(time => now - time < this.windowMs);
    const remainingRequests = this.maxRequests - validRequests.length;
    
    if (remainingRequests <= 0) {
      return { allowed: false, remainingRequests: 0 };
    }
    
    validRequests.push(now);
    this.limits.set(key, validRequests);
    
    return { allowed: true, remainingRequests };
  }
}

// Konfigurer rate limiters
const loginRateLimiter = new RateLimiter(5, 60000);     // 5 login forsøg per minut
const signupRateLimiter = new RateLimiter(3, 300000);   // 3 signup forsøg per 5 minutter
const passwordResetRateLimiter = new RateLimiter(2, 3600000); // 2 password reset per time

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const url = new URL(req.url);
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  
  try {
    const { action } = await req.json();
    
    let rateLimiter: RateLimiter;
    let actionType: string;
    
    switch(action) {
      case 'login':
        rateLimiter = loginRateLimiter;
        actionType = 'login';
        break;
      
      case 'signup':
        rateLimiter = signupRateLimiter;
        actionType = 'signup';
        break;

      case 'password-reset':
        rateLimiter = passwordResetRateLimiter;
        actionType = 'password_reset';
        break;
        
      default:
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
    
    const check = rateLimiter.check(ip);
    
    if (!check.allowed) {
      await logRateLimitEvent(supabase, ip, userAgent, actionType, check.remainingRequests);
      return new Response(JSON.stringify({
        error: `For mange ${actionType} forsøg. Prøv igen om lidt.`,
        remainingAttempts: check.remainingRequests,
        allowed: false
      }), { 
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      allowed: true,
      remainingAttempts: check.remainingRequests 
    }), { 
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Rate Limiter Error:', error);
    
    // Log fejl med den nye log_event funktion
    await supabase.rpc('log_event', {
      p_event_type: 'rate_limiter_error',
      p_user_id: null,
      p_metadata: { error: error.message },
      p_severity: 'ERROR',
      p_ip_address: ip,
      p_user_agent: userAgent
    });
    
    return new Response(JSON.stringify({ error: 'Intern serverfejl' }), { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

// Log rate limit hændelser
async function logRateLimitEvent(
  supabase: any, 
  ip: string, 
  userAgent: string,
  action: string, 
  remainingAttempts: number
) {
  try {
    await supabase.rpc('log_event', {
      p_event_type: `rate_limit_${action}`,
      p_user_id: null,
      p_metadata: {
        action: action,
        remaining_attempts: remainingAttempts
      },
      p_severity: 'WARNING',
      p_ip_address: ip,
      p_user_agent: userAgent
    });
  } catch (error) {
    console.error('Logging failed:', error);
  }
}