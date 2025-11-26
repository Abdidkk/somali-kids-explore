// src/components/routing/RouteGuard.tsx

import { Navigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const currentPath = location.pathname;

  // Vis loading spinner mens auth-state indlæses
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Deklarative redirects baseret på userState
  switch (userState) {
    case 'unauthenticated':
      // Hvis brugeren ikke er logget ind og siden kræver auth
      if ((requireAuth || requirePayment || requireOnboarding) && currentPath !== '/auth') {
        return <Navigate to="/auth" replace />;
      }
      break;
      
    case 'authenticated':
    case 'needs_payment':
      // Brugere der ikke har betalt skal til choose-plan
      if ((requirePayment || requireOnboarding) && currentPath !== '/choose-plan') {
        return <Navigate to="/choose-plan" replace />;
      }
      break;
      
    case 'paid':
      // Betalte brugere skal aldrig se choose-plan
      if (currentPath === '/choose-plan') {
        return <Navigate to="/dashboard" replace />;
      }
      break;
      
    case 'onboarding':
      // Brugere i onboarding skal være på add-children
      if (requireOnboarding && currentPath !== '/add-children') {
        return <Navigate to="/add-children" replace />;
      }
      // Hvis de prøver at gå til choose-plan under onboarding
      if (currentPath === '/choose-plan') {
        return <Navigate to="/add-children" replace />;
      }
      break;
  }

  // Håndter specifik redirectTo prop
  if (redirectTo && currentPath !== redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  // Alt er OK - vis children
  return <>{children}</>;
}
