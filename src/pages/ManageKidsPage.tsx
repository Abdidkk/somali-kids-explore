import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Apple, CreditCard } from "lucide-react";
import AddKidForm from "@/components/kids/AddKidForm";
import KidList from "@/components/kids/KidList";
import PaymentSummary from "@/components/kids/PaymentSummary";
import PaymentForm from "@/components/kids/PaymentForm";

const BASE_MONTHLY = 45;
const KID_MONTHLY = 15;
const BASE_YEARLY = 405;
const KID_YEARLY = 135;

const ManageKidsPage = () => {
  const [kids, setKids] = useState<Kid[]>([]);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const handleAddKid = (name: string, age: string) => {
    setKids([...kids, { id: crypto.randomUUID(), name, age }]);
  };

  const handleDeleteKid = (id: string) => {
    setKids(kids.filter((k) => k.id !== id));
  };

  const handlePay = () => {
    alert("Betaling kan kun simuleres i denne prototype.");
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
        <PaymentSummary
          baseMonthly={BASE_MONTHLY}
          kidMonthly={KID_MONTHLY}
          baseYearly={BASE_YEARLY}
          kidYearly={KID_YEARLY}
          numKids={kids.length}
        />
        <div className="mb-6">
          <AddKidForm onAdd={handleAddKid} />
        </div>
        <KidList kids={kids} onDelete={handleDeleteKid} />
        <PaymentForm
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          cardExpiry={cardExpiry}
          setCardExpiry={setCardExpiry}
          cardCvc={cardCvc}
          setCardCvc={setCardCvc}
          handlePay={handlePay}
        />
      </div>
    </div>
  );
};

export default ManageKidsPage;
