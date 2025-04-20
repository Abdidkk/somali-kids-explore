
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Apple, Google } from "lucide-react";

interface Kid {
  id: string;
  name: string;
  age: string;
}

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 via-white to-white px-4 py-12 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl px-8 py-10 border border-purple-100">
        <h1 className="text-2xl font-bold mb-3 text-center text-purple-600">Børneprofiler</h1>
        <div className="mb-5 text-center text-purple-700 bg-purple-50 rounded py-2 px-4 border border-purple-200 font-medium">
          Hver børneprofil koster <span className="font-bold">15 kr/md.</span> ekstra.<br />
          (Eller 135 kr/år hvis du har årlig betaling)
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
            <Button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700">Tilføj</Button>
          </div>
        </div>
        <div>
          {kids.length === 0 && (
            <div className="text-gray-500 text-center py-6">Ingen børneprofiler oprettet endnu.</div>
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
              <Google size={22} /> Betal med Google Pay
            </Button>
            <Button
              className="w-full bg-black hover:bg-neutral-800 text-white font-semibold flex items-center justify-center gap-2 py-3 text-base"
              type="button"
              disabled
            >
              <Apple size={22} /> Betal med Apple Pay
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
