
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Crown, RefreshCw, Settings, ExternalLink, Trash2, UserX, AlertTriangle, ChevronDown } from "lucide-react";
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
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [trialTimeLeft, setTrialTimeLeft] = useState<string>("");
  const [trialEndDate, setTrialEndDate] = useState<Date | null>(null);
  const [hasExistingPlan, setHasExistingPlan] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const { subscribed, inTrial, subscriptionTier, subscriptionEnd, status, checkSubscription } = useSubscription();
  const { session, user } = useAuth();
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

  const handleDeleteAccount = async () => {
    if (confirmationEmail !== user?.email) {
      toast({
        title: "Fejl",
        description: "Email bekræftelse matcher ikke din konto",
        variant: "destructive",
      });
      return;
    }

    setDeleteLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('delete-user-account', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: { confirmationEmail }
      });

      if (error) {
        console.error('Error deleting account:', error);
        toast({
          title: "Fejl",
          description: "Kunne ikke slette kontoen. Prøv igen senere.",
          variant: "destructive",
        });
        return;
      }

      if (data?.success) {
        toast({
          title: "Konto slettet",
          description: "Din konto er nu permanent slettet",
        });
        // Sign out and redirect to homepage
        await supabase.auth.signOut();
        navigate("/");
      } else {
        toast({
          title: "Fejl",
          description: data?.error || "Der opstod en uventet fejl",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error in handleDeleteAccount:', error);
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved sletning af kontoen",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!session) {
      toast({
        title: "Fejl",
        description: "Du skal være logget ind for at opsige dit abonnement",
        variant: "destructive",
      });
      return;
    }

    setCancelLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('cancel-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        console.error('Error cancelling subscription:', error);
        toast({
          title: "Fejl",
          description: "Kunne ikke opsige abonnement. Prøv igen senere.",
          variant: "destructive",
        });
        return;
      }

      if (data?.success) {
        toast({
          title: "Abonnement opsagt",
          description: data.message,
        });
        // Refresh subscription status
        await checkSubscription();
      } else {
        toast({
          title: "Fejl",
          description: data?.error || "Der opstod en fejl ved opsigelse",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error in handleCancelSubscription:', error);
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved opsigelse af abonnement",
        variant: "destructive",
      });
    } finally {
      setCancelLoading(false);
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

  // Update countdown timer every minute using Danish timezone
  useEffect(() => {
    if (!trialEndDate || !inTrial) return;

    const updateTimer = () => {
      // Get current time in Danish timezone
      const danishNow = new Date().toLocaleString("en-US", {timeZone: "Europe/Copenhagen"});
      const now = new Date(danishNow);
      
      // Convert trial end to Danish timezone for accurate comparison
      const trialEndDanish = new Date(trialEndDate.toLocaleString("en-US", {timeZone: "Europe/Copenhagen"}));
      const timeDiff = trialEndDanish.getTime() - now.getTime();
      
      if (timeDiff <= 0) {
        setTrialTimeLeft("Prøveperioden er udløbet - automatisk betaling starter nu");
        // Trigger subscription refresh when trial expires
        setTimeout(() => {
          checkSubscription();
        }, 2000);
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
  }, [trialEndDate, inTrial, checkSubscription]);

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

      <CardContent className="space-y-4">
        {/* Compact overview - always visible */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Status:</span>
            <Badge 
              variant={subscribed ? "default" : status === 'trial' ? "secondary" : "destructive"}
              className={subscribed ? "bg-green-600" : status === 'trial' ? "bg-blue-600" : ""}
            >
              {subscribed ? "Aktiv" : status === 'trial' ? "Prøveperiode" : "Inaktiv"}
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

          {/* Show urgent trial countdown in compact view */}
          {status === 'trial' && !subscribed && trialTimeLeft && isUrgent() && (
            <div className="border rounded-lg p-3 bg-blue-50 border-blue-200">
              <p className="font-semibold text-blue-800 text-sm">
                🎉 Du er i din gratis prøveperiode – betaling sker automatisk efter udløb
              </p>
              <p className="text-sm text-blue-700 mt-1 font-medium">
                Tid tilbage: {trialTimeLeft}
              </p>
            </div>
          )}
        </div>

        {/* Collapsible section for detailed information */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
              <span className="text-sm text-muted-foreground">
                {isExpanded ? "Skjul detaljer" : "Se flere detaljer"}
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4 pt-3">
            {subscriptionEnd && (
              <div className="flex items-center justify-between">
                <span className="font-medium">Næste fakturering:</span>
                <span className="text-sm text-gray-600">
                  {formatDate(subscriptionEnd)}
                </span>
              </div>
            )}

            {/* Non-urgent trial countdown in expanded view */}
            {status === 'trial' && !subscribed && trialTimeLeft && !isUrgent() && (
              <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                <div className="space-y-2">
                  <p className="font-semibold text-blue-800">
                    🎉 Du er i din gratis prøveperiode – betaling sker automatisk efter udløb
                  </p>
                  <p className="text-sm font-medium text-blue-700">
                    Tid tilbage: {trialTimeLeft}
                  </p>
                </div>
              </div>
            )}

            {/* Show success message when transition from trial to active happens */}
            {status === 'active' && subscribed && (
              <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                <div className="space-y-2">
                  <p className="font-semibold text-green-800 flex items-center gap-2">
                    ✅ Dit abonnement er nu aktivt!
                  </p>
                  <p className="text-sm text-green-700">
                    Du har nu fuld adgang til alle funktioner.
                  </p>
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

            <div className="space-y-3 pt-2">
              {/* Cancel Subscription Button - show if subscribed or in trial */}
              {(subscribed || inTrial) && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="w-full bg-red-600 hover:bg-red-700"
                      disabled={cancelLoading}
                    >
                      {cancelLoading ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <UserX className="mr-2 h-4 w-4" />
                          <span>Opsig abonnement</span>
                        </>
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="h-5 w-5" />
                        Opsig abonnement
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {inTrial ? (
                          <div className="space-y-2">
                            <p>Du er i din gratis prøveperiode.</p>
                            <p className="font-semibold text-orange-600">
                              Hvis du opsiger nu, vil du ikke blive opkrævet, og adgang til læringsmodulet vil blive fjernet med det samme.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <p>Dit abonnement vil blive opsagt.</p>
                            <p className="font-semibold text-blue-600">
                              Du vil have adgang indtil din næste faktureringsperiode, hvorefter adgang til læringsmodulet fjernes.
                            </p>
                          </div>
                        )}
                        <p className="mt-3 text-sm text-gray-600">
                          Du kan altid genaktivere dit abonnement senere.
                        </p>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuller</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleCancelSubscription}
                        disabled={cancelLoading}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        {cancelLoading ? (
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Opsig abonnement
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              <Button
                variant="outline"
                onClick={handleManageSubscription}
                disabled={portalLoading}
                className="w-full"
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
              
              <p className="text-xs text-muted-foreground text-center">
                Åbner Stripe kundeportal i en ny fane
              </p>
              
              <div className="flex gap-3">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="flex-1">
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

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 flex-1"
                    >
                      <UserX className="mr-2 h-4 w-4" />
                      Slet konto
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-md">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="h-5 w-5" />
                        Slet konto permanent
                      </AlertDialogTitle>
                      <AlertDialogDescription className="space-y-3">
                        <p className="text-sm text-gray-600">
                          <strong>⚠️ ADVARSEL:</strong> Denne handling kan ikke fortrydes!
                        </p>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Ved at slette din konto vil følgende blive permanent fjernet:</p>
                          <ul className="list-disc list-inside ml-2 space-y-1">
                            <li>Alle børneprofiler og deres fremskridt</li>
                            <li>Quiz resultater og point</li>
                            <li>Abonnements- og betalingshistorik</li>
                            <li>Alle personlige data</li>
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmEmail" className="text-sm font-medium">
                            Indtast din email for at bekræfte:
                          </Label>
                          <Input
                            id="confirmEmail"
                            type="email"
                            placeholder={user?.email || "din@email.com"}
                            value={confirmationEmail}
                            onChange={(e) => setConfirmationEmail(e.target.value)}
                            className="text-sm"
                          />
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel 
                        onClick={() => setConfirmationEmail("")}
                        disabled={deleteLoading}
                      >
                        Annuller
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        disabled={deleteLoading || confirmationEmail !== user?.email}
                        className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                      >
                        {deleteLoading ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Sletter...
                          </>
                        ) : (
                          <>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Slet konto permanent
                          </>
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
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
