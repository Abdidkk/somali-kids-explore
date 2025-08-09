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
        // Allow onboarding pages even if payment is not completed yet
        if (requirePayment) {
          navigate('/choose-plan');
        }
        break;
        
      case 'paid':
        // User has paid but needs to add children
        if (requireOnboarding) {
          navigate('/add-children');
        }
        break;
        
      case 'onboarding':
        // User has children but needs to complete onboarding
        // Only redirect if the page explicitly doesn't allow onboarding users
        if (!requireOnboarding) {
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