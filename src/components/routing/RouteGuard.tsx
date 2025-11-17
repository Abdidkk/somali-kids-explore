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

    const currentPath = window.location.pathname;

    // Define navigation logic based on user state and requirements
    switch (userState) {
      case 'unauthenticated':
        if (requireAuth || requirePayment || requireOnboarding) {
          navigate('/auth');
        }
        break;
        
      case 'authenticated':
      case 'needs_payment':
        // Users who haven't paid should be redirected to choose-plan
        if (requirePayment || requireOnboarding) {
          navigate('/choose-plan', { replace: true });
        }
        break;
        
      case 'paid':
        // Paid users should never see choose-plan
        if (currentPath === '/choose-plan') {
          navigate('/dashboard', { replace: true });
        }
        break;
        
      case 'onboarding':
        // Users completing onboarding should be on add-children
        if (requireOnboarding && currentPath !== '/add-children') {
          navigate('/add-children', { replace: true });
        }
        if (currentPath === '/choose-plan') {
          navigate('/add-children', { replace: true });
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