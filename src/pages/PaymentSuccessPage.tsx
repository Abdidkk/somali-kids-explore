import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const { refreshUserState } = useAuth();
  const { checkSubscription } = useSubscription();

  useEffect(() => {
    // Refresh subscription status after successful payment
    const refreshStatus = async () => {
      await checkSubscription();
      await refreshUserState();
      
      // Redirect to add children page after a brief delay
      setTimeout(() => {
        navigate('/add-children', { replace: true });
      }, 3000);
    };

    refreshStatus();
  }, [checkSubscription, refreshUserState, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Betaling gennemført!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Din betaling er blevet behandlet med succes. Du bliver omdirigeret til næste trin om få sekunder.
          </p>
          <Button 
            onClick={() => navigate('/add-children')}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Fortsæt til børneprofiler
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;