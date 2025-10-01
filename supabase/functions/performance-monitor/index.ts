import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PerformanceMetrics {
  route: string;
  method: string;
  responseTime: number;
  status: number;
  timestamp: string;
  userAgent?: string;
  ip?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const startTime = performance.now();
  
  try {
    const { route, method, status, responseTime, userAgent, ip } = await req.json();
    
    const metrics: PerformanceMetrics = {
      route: route || new URL(req.url).pathname,
      method: method || req.method,
      responseTime: responseTime || 0,
      status: status || 200,
      timestamp: new Date().toISOString(),
      userAgent: userAgent || req.headers.get('user-agent') || undefined,
      ip: ip || req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || undefined
    };

    // Bestem severity baseret på performance
    let severity = 'INFO';
    if (metrics.responseTime > 2000) {
      severity = 'ERROR';
    } else if (metrics.responseTime > 1000) {
      severity = 'WARNING';
    } else if (metrics.status >= 400) {
      severity = metrics.status >= 500 ? 'ERROR' : 'WARNING';
    }

    // Log performance metrik
    await supabase.rpc('log_event', {
      p_event_type: 'performance_metric',
      p_user_id: null,
      p_metadata: metrics,
      p_severity: severity,
      p_ip_address: metrics.ip,
      p_user_agent: metrics.userAgent
    });

    // Log slow queries separat
    if (metrics.responseTime > 1000) {
      await supabase.rpc('log_event', {
        p_event_type: 'slow_request',
        p_user_id: null,
        p_metadata: {
          route: metrics.route,
          responseTime: metrics.responseTime,
          threshold: 1000
        },
        p_severity: 'WARNING',
        p_ip_address: metrics.ip,
        p_user_agent: metrics.userAgent
      });
    }

    const endTime = performance.now();
    const processingTime = endTime - startTime;

    return new Response(JSON.stringify({ 
      success: true,
      metrics,
      processingTime: Math.round(processingTime * 100) / 100
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Performance Monitor Error:', error);
    
    // Log fejl
    await supabase.rpc('log_event', {
      p_event_type: 'performance_monitor_error',
      p_user_id: null,
      p_metadata: {
        error: (error as any).message,
        route: new URL(req.url).pathname
      },
      p_severity: 'ERROR',
      p_ip_address: req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip'),
      p_user_agent: req.headers.get('user-agent')
    });

    return new Response(JSON.stringify({ error: 'Intern serverfejl' }), { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});