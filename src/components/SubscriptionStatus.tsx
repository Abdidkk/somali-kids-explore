
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, RefreshCw, Settings, ExternalLink } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SubscriptionStatus = () => {
  const [loading, setLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);
  const { subscribed, inTrial, subscriptionTier, subscriptionEnd, checkSubscription } = useSubscription();
  const { session } = useAuth();
  const navigate = useNavigate();

  const handleRefresh = async () => {
    setLoading(true);
    await checkSubscription();
    setLoading(false);
    toast({
      title: "Opdateret",
      description: "Abonnementsstatus er blevet opdateret",
    });
  };

  const handleManageSubscription = async () => {
    if (!session) {
      toast({
        title: "Fejl",
        description: "Du skal være logget ind for at administrere dit abonnement",
        variant: "destructive",
      });
      return;
    }

    setPortalLoading(true);
    setPortalError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Error opening customer portal:', error);
        setPortalError("Kunne ikke åbne kundeportalen. Kontakt venligst support.");
        toast({
          title: "Fejl",
          description: "Kunne ikke åbne kundeportal. Prøv igen senere.",
          variant: "destructive",
        });
        return;
      }

      if (data?.url) {
        // Open in a new tab instead of redirecting
        window.open(data.url, '_blank');
        toast({
          title: "Kundeportal",
          description: "Kundeportalen er åbnet i en ny fane",
        });
      } else {
        setPortalError("Ingen portal URL returneret. Kontakt venligst support.");
        toast({
          title: "Fejl",
          description: "Kunne ikke åbne kundeportal. Prøv igen senere.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error in handleManageSubscription:', error);
      setPortalError("Der opstod en teknisk fejl. Kontakt venligst support.");
      toast({
        title: "Fejl",
        description: "Der opstod en fejl. Prøv igen senere.",
        variant: "destructive",
      });
    } finally {
      setPortalLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('da-DK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Crown className="text-[#4CA6FE]" size={20} />
              Abonnementsstatus
            </CardTitle>
            <CardDescription>
              Administrer dit abonnement og se detaljer
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="font-medium">Status:</span>
          <Badge 
            variant={subscribed ? "default" : inTrial ? "secondary" : "destructive"}
            className={subscribed ? "bg-green-600" : inTrial ? "bg-blue-600" : ""}
          >
            {subscribed ? "Aktiv" : inTrial ? "Prøveperiode" : "Inaktiv"}
          </Badge>
        </div>

        {subscriptionTier && (
          <div className="flex items-center justify-between">
            <span className="font-medium">Plan:</span>
            <Badge variant="outline" className="font-semibold">
              {subscriptionTier}
            </Badge>
          </div>
        )}

        {subscriptionEnd && (
          <div className="flex items-center justify-between">
            <span className="font-medium">Næste fakturering:</span>
            <span className="text-sm text-gray-600">
              {formatDate(subscriptionEnd)}
            </span>
          </div>
        )}

        {inTrial && !subscribed && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              🎉 Du er i din gratis prøveperiode! Vælg en plan for at fortsætte efter prøveperioden.
            </p>
          </div>
        )}

        {portalError && (
          <Alert variant="destructive">
            <AlertDescription>
              {portalError}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-3 pt-4">
          {!subscribed ? (
            <Button 
              onClick={() => navigate('/choose-plan')}
              className="bg-[#4CA6FE] hover:bg-[#3b95e9] flex-1"
            >
              Vælg plan
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={handleManageSubscription}
              disabled={portalLoading}
              className="flex-1"
            >
              {portalLoading ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Administrer abonnement</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
        
        {subscribed && (
          <p className="text-xs text-gray-500 text-center mt-2">
            Kundeportalen åbnes i en ny fane, hvor du kan ændre betalingsmetode, 
            skifte abonnement eller opsige dit abonnement.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionStatus;
