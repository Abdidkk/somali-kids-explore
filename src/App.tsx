import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MainNavbar from "./components/MainNavbar";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import ChoosePlanPage from "./pages/ChoosePlanPage";
import ManageKidsPage from "./pages/ManageKidsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
