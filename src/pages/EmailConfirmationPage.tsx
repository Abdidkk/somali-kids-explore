import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mail, RefreshCw, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { PageContainer } from "@/components/ui/page-container";

export default function EmailConfirmationPage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const email = searchParams.get('email') || '';

  // Check if user is already confirmed
  useEffect(() => {
    if (user?.email_confirmed_at) {
      navigate('/choose-plan');
    }
  }, [user, navigate]);

  const handleResendEmail = async () => {
    if (!email) {
      toast.error("Ingen email adresse fundet");
      return;
    }

    setResendLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });

      if (error) {
        toast.error("Fejl ved afsendelse af email: " + error.message);
      } else {
        toast.success("Bekræftelsesmail sendt igen!");
      }
    } catch (error) {
      toast.error("Der opstod en fejl ved afsendelse af email");
    } finally {
      setResendLoading(false);
    }
  };

  const handleCheckConfirmation = async () => {
    setLoading(true);
    try {
      const { data: { user: currentUser }, error } = await supabase.auth.getUser();
      
      if (error) {
        toast.error("Fejl ved kontrol af bekræftelse");
        return;
      }

      if (currentUser?.email_confirmed_at) {
        toast.success("Email bekræftet! Omdirigerer...");
        navigate('/choose-plan');
      } else {
        toast.info("Email endnu ikke bekræftet. Tjek din indbakke.");
      }
    } catch (error) {
      toast.error("Der opstod en fejl");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl px-8 py-9 border border-blue-100 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-blue-600 mb-2">Bekræft din email</h1>
          <p className="text-gray-600 mb-4">
            Vi har sendt en bekræftelsesmail til:
          </p>
          <p className="font-semibold text-gray-800 bg-gray-50 px-4 py-2 rounded-lg mb-6">
            {email}
          </p>
          <p className="text-sm text-gray-500">
            Tjek din indbakke og klik på bekræftelseslinket for at aktivere din konto.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleCheckConfirmation}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Mail className="w-4 h-4 mr-2" />
            )}
            {loading ? "Kontrollerer..." : "Jeg har bekræftet min email"}
          </Button>

          <Button
            variant="outline"
            onClick={handleResendEmail}
            disabled={resendLoading || !email}
            className="w-full"
          >
            {resendLoading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            {resendLoading ? "Sender..." : "Send email igen"}
          </Button>

          <div className="pt-4 border-t">
            <Link 
              to="/auth" 
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Tilbage til login
            </Link>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-600 mb-2 font-medium">Kan ikke finde emailen?</p>
          <p className="text-xs text-gray-600">
            Tjek din spam-mappe eller prøv at sende emailen igen.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}