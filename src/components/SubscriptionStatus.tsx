
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, RefreshCw, Settings } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const SubscriptionStatus = () => {
  const [loading, setLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
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
    if (!session) return;

    setPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Error opening customer portal:', error);
        toast({
          title: "Fejl",
          description: "Kunne ikke åbne kundeportal. Prøv igen.",
          variant: "destructive",
        });
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error in handleManageSubscription:', error);
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
              <Settings className="mr-2 h-4 w-4" />
              {portalLoading ? "Åbner..." : "Administrer abonnement"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionStatus;
