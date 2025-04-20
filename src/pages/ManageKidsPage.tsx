
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Kid {
  id: string;
  name: string;
  age: string;
}

const ManageKidsPage = () => {
  const [kids, setKids] = useState<Kid[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

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
        <h1 className="text-2xl font-bold mb-5 text-center text-purple-600">Børneprofiler</h1>
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
      </div>
    </div>
  );
};

export default ManageKidsPage;
