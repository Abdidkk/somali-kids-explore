
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { SubscriptionProvider } from "@/hooks/useSubscription";
import { RouteGuard } from "@/components/routing/RouteGuard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MainNavbar from "./components/MainNavbar";
import AuthPage from "./pages/AuthPage";
import ChoosePlanPage from "./pages/ChoosePlanPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentCancelPage from "./pages/PaymentCancelPage";
import AddChildProfilesPage from "./pages/AddChildProfilesPage";
import CongratulationsPage from "./pages/CongratulationsPage";
import DashboardPage from "./pages/DashboardPage";

import SystemTestPage from "./pages/SystemTestPage";
import LearnCategoriesPage from "./pages/LearnCategoriesPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import SubjectsPage from "./pages/SubjectsPage";
import PricingPage from "./pages/PricingPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import MereOmPriserPage from "./pages/MereOmPriserPage";
import EmailConfirmationPage from "./pages/EmailConfirmationPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SubscriptionProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <MainNavbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/signup" element={<AuthPage />} />
              <Route path="/email-confirmation" element={<EmailConfirmationPage />} />
              <Route path="/choose-plan" element={
                <RouteGuard requireAuth>
                  <ChoosePlanPage />
                </RouteGuard>
              } />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              <Route path="/payment-cancel" element={<PaymentCancelPage />} />
              <Route path="/add-children" element={
                <RouteGuard requireAuth requireOnboarding>
                  <AddChildProfilesPage />
                </RouteGuard>
              } />
              <Route path="/congratulations" element={
                <RouteGuard requireAuth requireOnboarding>
                  <CongratulationsPage />
                </RouteGuard>
              } />
              <Route path="/dashboard" element={
                <RouteGuard requireAuth requireOnboarding>
                  <DashboardPage />
                </RouteGuard>
              } />
              <Route path="/system-test" element={<SystemTestPage />} />
              <Route path="/learning" element={
                <RouteGuard requireAuth requireOnboarding>
                  <LearnCategoriesPage />
                </RouteGuard>
              } />
              <Route path="/laer" element={<Navigate to="/learning" replace />} />
              <Route path="/kontakt" element={<ContactPage />} />
              <Route path="/om-os" element={<AboutPage />} />
              <Route path="/fag" element={<SubjectsPage />} />
              <Route path="/priser" element={<PricingPage />} />
              <Route path="/priser/mere-info" element={<MereOmPriserPage />} />
              <Route path="/privatlivspolitik" element={<PrivacyPolicyPage />} />
              <Route path="/servicevilkaar" element={<TermsOfServicePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SubscriptionProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
