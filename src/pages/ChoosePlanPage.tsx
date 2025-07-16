
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Crown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ChoosePlanPage = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const { user, session } = useAuth();
  const { subscribed, subscriptionTier } = useSubscription();
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
    if (!user || !session) {
      navigate('/login');
      return;
    }

    setLoading(priceId);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          priceId, 
          planName, 
          billingInterval,
          numKids: 0 // Base subscription only
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
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
        window.open(data.url, '_blank');
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
            Start med en 24-timers gratis prøveperiode. Ingen forpligtelser.
          </p>
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
                  <span className="text-4xl font-bold">{plan.price} kr</span>
                  <span className="text-gray-600">
                    {plan.billingInterval === "monthly" ? "/måned" : "/år"}
                  </span>
                  {plan.billingInterval === "yearly" && (
                    <div className="text-sm text-green-600 font-medium mt-1">
                      ({Math.round(plan.price / 12)} kr/måned)
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
                <Button
                  className={`w-full ${
                    subscribed && subscriptionTier === plan.name
                      ? 'bg-green-600 hover:bg-green-700'
                      : plan.popular
                      ? 'bg-[#4CA6FE] hover:bg-[#3b95e9]'
                      : 'bg-gray-800 hover:bg-gray-700'
                  } text-white font-semibold py-3`}
                  disabled={loading === plan.priceId || (subscribed && subscriptionTier === plan.name)}
                  onClick={() => handleSubscribe(plan.priceId, plan.name, plan.billingInterval)}
                >
                  {loading === plan.priceId ? (
                    "Opretter..."
                  ) : subscribed && subscriptionTier === plan.name ? (
                    "Nuværende plan"
                  ) : (
                    "Vælg denne plan"
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Alle planer inkluderer 24-timers gratis prøveperiode. Annuller når som helst.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChoosePlanPage;
