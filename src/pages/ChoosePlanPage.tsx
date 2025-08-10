
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Crown, Plus, Minus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ChoosePlanPage = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [numKids, setNumKids] = useState(0);
  const { user, session } = useAuth();
  const { subscribed, billingInterval } = useSubscription();
  const navigate = useNavigate();

  const plans = [
    {
      name: "Månedlig",
      price: 45,
      priceId: "price_1RlZK0HugRjwpvWtOzopzx3y",
      description: "Perfekt for familier der ønsker fleksibilitet",
      features: [
        "Fuld adgang til alle funktioner",
        "Ubegrænsede profiler",
        "Prioriteret support",
        "Børneprofiler: 15 kr/måned ekstra",
      ],
      popular: false,
      billingInterval: "monthly",
    },
    {
      name: "Årlig",
      price: 405,
      priceId: "price_1RlZKXHugRjwpvWtRzuNYmYq",
      description: "Spar 135 kr/år med årlig betaling",
      features: [
        "Fuld adgang til alle funktioner",
        "Ubegrænsede profiler", 
        "Prioriteret support",
        "Børneprofiler: 135 kr/år ekstra",
        "25% rabat på årsbasis",
      ],
      popular: true,
      billingInterval: "yearly",
      savings: 135,
    },
  ];

  const handleSubscribe = async (priceId: string, planName: string, billingInterval: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(priceId);
    try {
      // Ensure we have a fresh session token
      const { data: { session: freshSession } } = await supabase.auth.getSession();
      if (!freshSession?.access_token) {
        toast({
          title: "Session udløbet",
          description: "Prøv at logge ind igen.",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          priceId, 
          planName, 
          billingInterval,
          numKids,
          childrenOnly: false
        },
        headers: {
          Authorization: `Bearer ${freshSession.access_token}`,
        },
      });

      if (error) {
        console.error('Error creating checkout:', error);
        
        // Handle authentication errors specifically
        if (error.message?.includes('authentication') || error.message?.includes('Session')) {
          toast({
            title: "Session udløbet",
            description: "Prøv at logge ind igen.",
            variant: "destructive",
          });
          navigate('/login');
        } else {
          toast({
            title: "Fejl",
            description: "Kunne ikke oprette betalingssession. Prøv igen.",
            variant: "destructive",
          });
        }
        return;
      }

      if (data?.url) {
        // Gem det antal børn der er betalt for
        localStorage.setItem("maxChildrenPaid", numKids.toString());
      
        // Open Stripe Checkout in a new tab (fixes redirect inside iframes like Lovable preview)
        const newTab = window.open(data.url, '_blank', 'noopener,noreferrer');
        if (!newTab) {
          // Fallback: same-tab navigation
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
      setLoading(null);
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
            onClick={() => navigate('/login')}
            className="bg-[#4CA6FE] hover:bg-[#3b95e9]"
          >
            Log ind
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Vælg den rigtige plan for din familie
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start med 24 timers gratis prøveperiode. Kreditkort påkrævet - du betaler først efter prøveperioden.
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
                Du kan altid tilføje flere profiler senere
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setNumKids(Math.max(0, numKids - 1))}
                disabled={numKids === 0}
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
            {numKids > 0 && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Ekstra omkostning: <span className="font-semibold">
                    {numKids * 15} kr/måned eller {numKids * 135} kr/år
                  </span>
                </p>
              </div>
            )}
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'border-[#4CA6FE] shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#4CA6FE] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Crown size={14} />
                    Mest populær
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600">
                  {plan.description}
                </CardDescription>
                {'savings' in plan && (
                  <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                    Spar {plan.savings} kr/år
                  </div>
                )}
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    {plan.price + (numKids * (plan.billingInterval === "monthly" ? 15 : 135))} kr
                  </span>
                  <span className="text-gray-600">
                    {plan.billingInterval === "monthly" ? "/måned" : "/år"}
                  </span>
                  {plan.billingInterval === "yearly" && (
                    <div className="text-sm text-green-600 font-medium mt-1">
                      ({Math.round((plan.price + (numKids * 135)) / 12)} kr/måned)
                    </div>
                  )}
                  {numKids > 0 && (
                    <div className="text-sm text-gray-500 mt-2">
                      Base: {plan.price} kr + {numKids} børn: {numKids * (plan.billingInterval === "monthly" ? 15 : 135)} kr
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="text-green-500 flex-shrink-0" size={16} />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </CardContent>

              <CardFooter>
                {(() => {
                  // Fix the current plan detection logic
                  const isCurrentPlan = subscribed && 
                    ((billingInterval === 'monthly' && plan.billingInterval === 'monthly') ||
                     (billingInterval === 'yearly' && plan.billingInterval === 'yearly'));
                  
                  /* Debug log removed to prevent noisy console during renders */

                  return (
                    <Button
                      className={`w-full ${
                        isCurrentPlan
                          ? 'bg-green-600 hover:bg-green-700'
                          : plan.popular
                          ? 'bg-[#4CA6FE] hover:bg-[#3b95e9]'
                          : 'bg-gray-800 hover:bg-gray-700'
                      } text-white font-semibold py-3`}
                      disabled={loading === plan.priceId || isCurrentPlan}
                      onClick={() => handleSubscribe(plan.priceId, plan.name, plan.billingInterval)}
                    >
                      {loading === plan.priceId ? (
                        'Opretter...'
                      ) : isCurrentPlan ? (
                        'Nuværende plan'
                      ) : (
                        'Vælg denne plan'
                      )}
                    </Button>
                  );
                })()}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Alle planer inkluderer 24 timers gratis prøveperiode. Annuller når som helst.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChoosePlanPage;
