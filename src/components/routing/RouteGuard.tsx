import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requirePayment?: boolean;
  requireOnboarding?: boolean;
  redirectTo?: string;
}

export function RouteGuard({ 
  children, 
  requireAuth = false, 
  requirePayment = false, 
  requireOnboarding = false,
  redirectTo 
}: RouteGuardProps) {
  const { userState, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    // Define navigation logic based on user state and requirements
    switch (userState) {
      case 'unauthenticated':
        if (requireAuth || requirePayment || requireOnboarding) {
          navigate('/auth');
        }
        break;
        
      case 'authenticated':
      case 'needs_payment':
        if (requirePayment || requireOnboarding) {
          navigate('/choose-plan');
        }
        break;
        
      case 'paid':
        if (requireOnboarding) {
          navigate('/congratulations');
        }
        break;
        
      case 'onboarding':
        if (!requireOnboarding && !window.location.pathname.includes('congratulations')) {
          navigate('/congratulations');
        }
        break;
    }

    // Handle specific redirects
    if (redirectTo) {
      navigate(redirectTo);
    }
  }, [userState, loading, navigate, requireAuth, requirePayment, requireOnboarding, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
}