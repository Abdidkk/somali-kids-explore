
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AddKidFormProps {
  onAdd: (name: string, age: string) => void;
}

const AddKidForm = ({ onAdd }: AddKidFormProps) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleAdd = () => {
    if (!name || !age) return;
    onAdd(name, age);
    setName("");
    setAge("");
  };

  return (
    <div className="flex gap-2">
      <input
        className="border rounded px-3 py-2 w-1/2 bg-blue-50 border-blue-200 focus:border-blue-400 focus:outline-none"
        placeholder="Navn"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        className="border rounded px-3 py-2 w-1/2 bg-blue-50 border-blue-200 focus:border-blue-400 focus:outline-none"
        placeholder="Alder"
        type="number"
        min="1"
        value={age}
        onChange={e => setAge(e.target.value)}
      />
      <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
        Tilføj
      </Button>
    </div>
  );
};

export default AddKidForm;
