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
        // authenticated users should NOT be redirected to choose-plan
        if (requireOnboarding && currentPath !== '/dashboard') {
          navigate('/add-children');
        }
        break;

        case 'needs_payment':
          // Altid redirect til choose-plan MEDMINDRE de allerede er der eller på auth
          if (currentPath !== '/choose-plan' && currentPath !== '/auth' && currentPath !== '/') {
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

        case 'subscription_expired':
          // Udløbne brugere med børn kan SE dashboard med "sat i bero" alert
          // Men de kan IKKE tilgå /learning (kræver aktivt abonnement)
          if (currentPath === '/choose-plan') {
            // De må gerne besøge choose-plan for at genaktivere
            break;
          }
          if (currentPath === '/learning' || currentPath.startsWith('/learning')) {
            navigate('/dashboard', { replace: true });
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