
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { SubscriptionProvider } from "@/hooks/useSubscription";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MainNavbar from "./components/MainNavbar";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import ChoosePlanPage from "./pages/ChoosePlanPage";
import ManageKidsPage from "./pages/ManageKidsPage";
import CongratulationsPage from "./pages/CongratulationsPage";
import DashboardPage from "./pages/DashboardPage";
import LearnCategoriesPage from "./pages/LearnCategoriesPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import SubjectsPage from "./pages/SubjectsPage";
import PricingPage from "./pages/PricingPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import MereOmPriserPage from "./pages/MereOmPriserPage";

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
              <Route path="/login" element={<LogInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/choose-plan" element={<ChoosePlanPage />} />
              <Route path="/admin-kids" element={<ManageKidsPage />} />
              <Route path="/congratulations" element={<CongratulationsPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/laer" element={<LearnCategoriesPage />} />
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
