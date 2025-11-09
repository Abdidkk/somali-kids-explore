
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Crown, Plus, Minus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { SubscriptionPlan, DEFAULT_PLAN, calculateTotal } from "@/types/subscription";

const ChoosePlanPage = () => {
  const [loading, setLoading] = useState(false);
  const [numKids, setNumKids] = useState(1); // Default to 1 child (included)
  const { user } = useAuth();
  const { subscribed } = useSubscription();
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setLoading(true);
    try {
      const { data: { session: freshSession } } = await supabase.auth.getSession();
      if (!freshSession?.access_token) {
        toast({
          title: "Session udløbet",
          description: "Prøv at logge ind igen.",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { numKids },
        headers: {
          Authorization: `Bearer ${freshSession.access_token}`,
        },
      });

      if (error) {
        console.error('Error creating checkout:', error);
        toast({
          title: "Fejl",
          description: "Kunne ikke oprette betalingssession. Prøv igen.",
          variant: "destructive",
        });
        return;
      }

      if (data?.url) {
        localStorage.setItem("paid_children_count", numKids.toString());
        const newTab = window.open(data.url, '_blank', 'noopener,noreferrer');
        if (!newTab) {
          window.location.href = data.url;
        }
      }
      
    } catch (error) {
      console.error('Error in handleSubscribe:', error);
      toast({
        title: "Fejl",
        description: "Der opstod en fejl. Prøv igen senere.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Vælg din plan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Du skal være logget ind for at vælge en plan
          </p>
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-[#4CA6FE] hover:bg-[#3b95e9]"
          >
            Log ind
          </Button>
        </div>
      </div>
    );
  }

  const totalPrice = calculateTotal(numKids);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Vælg den rigtige plan for din familie
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start med {DEFAULT_PLAN.trialHours} timers gratis prøveperiode. Kreditkort påkrævet - du betaler først efter prøveperioden.
          </p>
        </div>

        {/* Children Counter */}
        <div className="max-w-md mx-auto mb-12">
          <Card className="p-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hvor mange børneprofiler har du brug for?
              </h3>
              <p className="text-sm text-gray-600">
                {DEFAULT_PLAN.includedChildren} barn inkluderet, {DEFAULT_PLAN.extraChildFee} kr/måned pr. ekstra barn
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setNumKids(Math.max(1, numKids - 1))}
                disabled={numKids === 1}
              >
                <Minus size={16} />
              </Button>
              <div className="text-2xl font-bold text-gray-900 min-w-[3rem] text-center">
                {numKids}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setNumKids(numKids + 1)}
              >
                <Plus size={16} />
              </Button>
            </div>
            {numKids > DEFAULT_PLAN.includedChildren && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Ekstra omkostning: <span className="font-semibold">
                    {(numKids - DEFAULT_PLAN.includedChildren) * DEFAULT_PLAN.extraChildFee} kr/måned
                  </span>
                </p>
              </div>
            )}
          </Card>
        </div>

        <div className="flex justify-center max-w-2xl mx-auto">
          <Card className="relative border-[#4CA6FE] shadow-lg">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-[#4CA6FE] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Crown size={14} />
                Mest populær
              </div>
            </div>
            
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold">Månedlig Plan</CardTitle>
              <CardDescription className="text-gray-600">
                Perfekt for familier der ønsker fleksibilitet
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">
                  {totalPrice} kr
                </span>
                <span className="text-gray-600">
                  /måned
                </span>
                {numKids > DEFAULT_PLAN.includedChildren && (
                  <div className="text-sm text-gray-500 mt-2">
                    Base: {DEFAULT_PLAN.basePricePerChild} kr + {numKids - DEFAULT_PLAN.includedChildren} ekstra: {(numKids - DEFAULT_PLAN.includedChildren) * DEFAULT_PLAN.extraChildFee} kr
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Check className="text-green-500 flex-shrink-0" size={16} />
                <span className="text-gray-700">Fuld adgang til alle funktioner</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-green-500 flex-shrink-0" size={16} />
                <span className="text-gray-700">{DEFAULT_PLAN.includedChildren} barn inkluderet</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-green-500 flex-shrink-0" size={16} />
                <span className="text-gray-700">Prioriteret support</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-green-500 flex-shrink-0" size={16} />
                <span className="text-gray-700">Ekstra børneprofiler: {DEFAULT_PLAN.extraChildFee} kr/måned</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-green-500 flex-shrink-0" size={16} />
                <span className="text-gray-700">{DEFAULT_PLAN.trialHours} timers gratis prøveperiode</span>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full bg-[#4CA6FE] hover:bg-[#3b95e9] text-white font-semibold py-3"
                disabled={loading || subscribed}
                onClick={handleSubscribe}
              >
                {loading ? 'Opretter...' : subscribed ? 'Nuværende plan' : 'Vælg denne plan'}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            {DEFAULT_PLAN.trialHours} timers gratis prøveperiode. Annuller når som helst.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChoosePlanPage;
