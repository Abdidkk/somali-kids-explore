
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, RefreshCw, Settings, ExternalLink, Trash2 } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SubscriptionStatus = () => {
  const [loading, setLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);
  const [resetLoading, setResetLoading] = useState(false);
  const [trialTimeLeft, setTrialTimeLeft] = useState<string>("");
  const [trialEndDate, setTrialEndDate] = useState<Date | null>(null);
  const [hasExistingPlan, setHasExistingPlan] = useState(false);
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

  const handleResetData = async () => {
    if (!session) {
      toast({
        title: "Fejl",
        description: "Du skal være logget ind for at nulstille data",
        variant: "destructive",
      });
      return;
    }

    setResetLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('reset-user-data', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Error resetting user data:', error);
        toast({
          title: "Fejl",
          description: "Kunne ikke nulstille data. Prøv igen senere.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Data nulstillet",
        description: "Quiz resultater og fremskridt er blevet nulstillet",
      });
    } catch (error) {
      console.error('Error in handleResetData:', error);
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved nulstilling af data",
        variant: "destructive",
      });
    } finally {
      setResetLoading(false);
    }
  };

  // Fetch trial end date and check if user has existing plan
  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('subscribers')
          .select('trial_end, stripe_customer_id, subscription_tier')
          .eq('user_id', session.user.id)
          .single();
        
        if (data && !error) {
          if (data.trial_end && inTrial) {
            setTrialEndDate(new Date(data.trial_end));
          }
          // User has existing plan if they have a customer ID or subscription tier
          setHasExistingPlan(!!(data.stripe_customer_id || data.subscription_tier));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [session?.user?.id, inTrial, subscriptionTier]);

  // Update countdown timer every minute
  useEffect(() => {
    if (!trialEndDate || !inTrial) return;

    const updateTimer = () => {
      const now = new Date();
      const timeDiff = trialEndDate.getTime() - now.getTime();
      
      if (timeDiff <= 0) {
        setTrialTimeLeft("Prøveperioden er udløbet");
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTrialTimeLeft(`${days} dage, ${hours} timer tilbage`);
      } else if (hours > 0) {
        setTrialTimeLeft(`${hours} timer, ${minutes} minutter tilbage`);
      } else {
        setTrialTimeLeft(`${minutes} minutter tilbage`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [trialEndDate, inTrial]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('da-DK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isUrgent = () => {
    if (!trialEndDate) return false;
    const now = new Date();
    const timeDiff = trialEndDate.getTime() - now.getTime();
    return timeDiff <= (24 * 60 * 60 * 1000); // Less than 24 hours
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

        {inTrial && !subscribed && trialTimeLeft && (
          <div className={`border rounded-lg p-4 ${isUrgent() ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-semibold ${isUrgent() ? 'text-red-800' : 'text-blue-800'}`}>
                  {isUrgent() ? '⚠️ Prøveperioden udløber snart!' : '🎉 Du er i din gratis prøveperiode'}
                </p>
                <p className={`text-sm mt-1 ${isUrgent() ? 'text-red-700' : 'text-blue-700'}`}>
                  {trialTimeLeft}
                </p>
                {hasExistingPlan && (
                  <p className={`text-xs mt-1 ${isUrgent() ? 'text-red-600' : 'text-blue-600'}`}>
                    Betalingen vil automatisk blive trukket når prøveperioden udløber
                  </p>
                )}
              </div>
              {!hasExistingPlan && (
                <Button 
                  onClick={() => navigate('/choose-plan')}
                  size="sm"
                  className={isUrgent() ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}
                >
                  Vælg plan nu
                </Button>
              )}
            </div>
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
          {!subscribed && !hasExistingPlan ? (
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
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Nulstil data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Nulstil alle data?</AlertDialogTitle>
                <AlertDialogDescription>
                  Dette vil permanent slette alle quiz resultater og fremskridt for din konto. 
                  Denne handling kan ikke fortrydes.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuller</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleResetData}
                  disabled={resetLoading}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {resetLoading ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Nulstil data
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        
        {(subscribed || hasExistingPlan) && (
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
