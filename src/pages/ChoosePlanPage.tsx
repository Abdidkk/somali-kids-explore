
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    label: "Månedlig",
    price: "45 kr/md.",
    description: "Perfekt hvis du vil prøve Dugsi uden binding.",
    value: "monthly",
  },
  {
    label: "Årlig",
    price: "405 kr/år",
    description: "Spar 25% i forhold til månedlig betaling.",
    value: "yearly",
  },
];

export default function ChoosePlanPage() {
  const navigate = useNavigate();

  const handleChoose = (plan: string) => {
    // I prototype gemmer vi ikke noget, bare videre
    navigate("/admin-kids");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 via-white to-white px-4 py-12 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl px-8 py-10 border border-purple-100">
        <h1 className="text-2xl font-bold mb-5 text-center text-purple-600">Vælg dit abonnement</h1>
        <div className="mb-6 text-center text-purple-700 bg-purple-50 rounded py-3 px-4 border border-purple-200 font-medium">
          OBS: Hver børneprofil koster <span className="font-bold">15 kr/md.</span> ekstra.<br />
          (Ved årlig betaling: 135 kr/år pr. børneprofil)
        </div>
        <div className="space-y-6">
          {plans.map((p) => (
            <div key={p.value} className="rounded-lg border border-purple-200 p-5 flex flex-col items-center bg-purple-50">
              <div className="text-xl font-semibold mb-2">{p.label}</div>
              <div className="text-2xl font-bold mb-1">{p.price}</div>
              <div className="text-sm text-gray-500 mb-4 text-center">{p.description}</div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => handleChoose(p.value)}>
                Vælg {p.label}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
