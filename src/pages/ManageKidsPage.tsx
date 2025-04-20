import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Apple } from "lucide-react";

interface Kid {
  id: string;
  name: string;
  age: string;
}

const BASE_MONTHLY = 45;
const KID_MONTHLY = 15;
const BASE_YEARLY = 405;
const KID_YEARLY = 135;

const ManageKidsPage = () => {
  const [kids, setKids] = useState<Kid[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // Dummy state for prototype (ingen rigtig betaling)
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const handleAdd = () => {
    if (!name || !age) return;
    setKids([...kids, { id: crypto.randomUUID(), name, age }]);
    setName("");
    setAge("");
  };

  const handleDelete = (id: string) => {
    setKids(kids.filter((k) => k.id !== id));
  };

  // Opdateret payment calculation
  // Første barn er inkluderet i basisprisen, ekstra børn koster ekstra
  const extraKids = kids.length > 1 ? kids.length - 1 : 0;
  const totalMonthly = BASE_MONTHLY + KID_MONTHLY * extraKids;
  const totalYearly = BASE_YEARLY + KID_YEARLY * extraKids;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 via-white to-white px-4 py-12 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl px-8 py-10 border border-purple-100">
        <h1 className="text-2xl font-bold mb-3 text-center text-purple-600">
          Børneprofiler
        </h1>
        {/* Prisinfo gjort mere synlig */}
        <div className="mb-5 text-center text-purple-800 bg-purple-100 rounded py-2 px-4 border border-purple-200 font-semibold">
          Hver børneprofil koster <span className="font-bold">15 kr/md.</span> ekstra.<br />
          (Eller 135 kr/år hvis du har årlig betaling)
        </div>

        {/* Payment summary */}
        <div className="mb-6 text-center bg-orange-50 border border-orange-200 rounded py-3 px-3 text-orange-800 font-semibold">
          <div>
            <span className="block">
              <span className="text-base">Din samlede pris:</span>
            </span>
            <span>
              <b>{totalMonthly} kr/md.</b>&nbsp;eller&nbsp;
              <b>{totalYearly} kr/år</b>
            </span>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            (Inkluderer basispris + {kids.length} børneprofil{kids.length === 1 ? "" : "er"})
          </div>
        </div>

        <div className="mb-6">
          <div className="flex gap-2">
            <input
              className="border rounded px-3 py-2 w-1/2 bg-purple-50"
              placeholder="Navn"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              className="border rounded px-3 py-2 w-1/2 bg-purple-50"
              placeholder="Alder"
              type="number"
              min="1"
              value={age}
              onChange={e => setAge(e.target.value)}
            />
            <Button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700">
              Tilføj
            </Button>
          </div>
        </div>
        <div>
          {kids.length === 0 && (
            <div className="text-gray-500 text-center py-6">
              Ingen børneprofiler oprettet endnu.
            </div>
          )}
          <ul className="space-y-2">
            {kids.map((kid) => (
              <li key={kid.id} className="flex justify-between items-center p-3 bg-purple-50 rounded border">
                <span>
                  <b>{kid.name}</b> ({kid.age} år)
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(kid.id)}
                >
                  Slet
                </Button>
              </li>
            ))}
          </ul>
        </div>

        {/* --- NYT: Betalingsoplysninger --- */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-purple-700 mb-3">Betalingsoplysninger</h2>
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Kortnummer"
              value={cardNumber}
              onChange={e => setCardNumber(e.target.value)}
              className="bg-purple-50 focus:bg-white"
              maxLength={19}
              autoComplete="cc-number"
              inputMode="numeric"
            />
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Udløbsdato (MM/ÅÅ)"
                value={cardExpiry}
                onChange={e => setCardExpiry(e.target.value)}
                className="bg-purple-50 focus:bg-white"
                maxLength={5}
                autoComplete="cc-exp"
                inputMode="numeric"
              />
              <Input
                type="text"
                placeholder="CVC"
                value={cardCvc}
                onChange={e => setCardCvc(e.target.value)}
                className="bg-purple-50 focus:bg-white"
                maxLength={4}
                autoComplete="cc-csc"
                inputMode="numeric"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <Button
              className="w-full bg-[#4285F4] hover:bg-[#357ae8] text-white font-semibold flex items-center justify-center gap-2 py-3 text-base"
              type="button"
              disabled
            >
              {/* No google icon available, only text */}
              Betal med Google Pay
            </Button>
            <Button
              className="w-full bg-black hover:bg-neutral-800 text-white font-semibold flex items-center justify-center gap-2 py-3 text-base"
              type="button"
              disabled
            >
              <Apple size={22} /> Betal med Apple Pay
            </Button>
            <Button
              className="w-full bg-[#0095DA] hover:bg-[#007bbd] text-white font-semibold flex items-center justify-center gap-2 py-3 text-base"
              type="button"
              disabled
            >
              {/* No mobilepay icon available, only text */}
              Betal med MobilePay
            </Button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-3">
            (Prototype: Betaling er ikke aktiveret)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageKidsPage;
