import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreditCard } from "lucide-react";
import AddKidForm from "@/components/kids/AddKidForm";
import KidList from "@/components/kids/KidList";
import PaymentSummary from "@/components/kids/PaymentSummary";
import { Kid } from "@/types/Kid";
import { supabase } from "@/integrations/supabase/client";

const BASE_MONTHLY = 45;
const KID_MONTHLY = 15;
const BASE_YEARLY = 405;
const KID_YEARLY = 135;

const PRICE_IDS = {
  BASE_MONTHLY: "price_1RlZK0HugRjwpvWtOzopzx3y",
  BASE_YEARLY: "price_1RlZKXHugRjwpvWtRzuNYmYq",
  KID_MONTHLY: "price_1RlZQVHugRjwpvWt7BKwjRTr",
  KID_YEARLY: "price_1RlZR3HugRjwpvWtv2fdRbkX",
};

const ManageKidsPage = () => {
  const [kids, setKids] = useState<Kid[]>([]);
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddKid = (name: string, age: string) => {
    setKids([...kids, { id: crypto.randomUUID(), name, age }]);
  };

  const handleDeleteKid = (id: string) => {
    setKids(kids.filter((k) => k.id !== id));
  };

  const handlePay = async () => {
    if (kids.length === 0) {
      alert("Tilføj mindst én børneprofil for at fortsætte.");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          priceId: billingInterval === "monthly" ? PRICE_IDS.BASE_MONTHLY : PRICE_IDS.BASE_YEARLY,
          planName: billingInterval === "monthly" ? "Månedlig + Børn" : "Årlig + Børn",
          billingInterval,
          numKids: kids.length,
        },
      });

      if (error) {
        console.error("Error creating checkout:", error);
        alert("Der opstod en fejl ved oprettelse af betalingsession. Prøv igen.");
        return;
      }

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error("Error calling create-checkout:", error);
      alert("Der opstod en fejl. Prøv igen senere.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-white to-white px-4 py-12 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl px-8 py-10 border border-blue-100">
        <h1 className="text-2xl font-bold mb-3 text-center text-blue-600">
          Børneprofiler
        </h1>
        <div className="mb-5 text-center text-blue-800 bg-blue-50 rounded py-2 px-4 border border-blue-200 font-semibold">
          Hver børneprofil koster <span className="font-bold">15 kr/md.</span> ekstra.<br />
          (Eller 135 kr/år hvis du har årlig betaling)
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Betalingsinterval
          </label>
          <select
            value={billingInterval}
            onChange={(e) => setBillingInterval(e.target.value as "monthly" | "yearly")}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="monthly">Månedlig betaling</option>
            <option value="yearly">Årlig betaling (spar 25%)</option>
          </select>
        </div>
        <PaymentSummary
          baseMonthly={BASE_MONTHLY}
          kidMonthly={KID_MONTHLY}
          baseYearly={BASE_YEARLY}
          kidYearly={KID_YEARLY}
          numKids={kids.length}
          billingInterval={billingInterval}
        />
        <div className="mb-6">
          <AddKidForm onAdd={handleAddKid} />
        </div>
        <KidList kids={kids} onDelete={handleDeleteKid} />
        {kids.length > 0 && (
          <div className="mt-8">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 py-3 text-base shadow transition-all"
              type="button"
              onClick={handlePay}
              disabled={isLoading}
            >
              <CreditCard className="mr-1" size={21} />
              {isLoading ? "Opretter..." : "Næste til Betaling"}
            </Button>
            <p className="text-xs text-gray-500 text-center mt-3">
              Du vil blive viderestillet til sikker kortbetaling
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageKidsPage;
