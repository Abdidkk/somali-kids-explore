
import React, { useState } from "react";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dummy for proof-of-concept — der vælges altid "A"
const CORRECT_ANSWER = "A";

interface Props {
  onBack: () => void;
}

export default function AlphabetGuessActivity({ onBack }: Props) {
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<null | "correct" | "wrong">(null);

  const handleGuess = () => {
    setResult(guess.trim().toUpperCase() === CORRECT_ANSWER ? "correct" : "wrong");
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-4">
      <div className="flex flex-col items-center gap-1">
        <HelpCircle className="w-10 h-10 text-purple-700" />
        <div className="font-semibold text-lg text-purple-700 mb-2">Gæt hvilket bogstav der kommer efter:</div>
        <div className="text-6xl font-bold text-gray-600 mb-2">?</div>
      </div>
      <input
        className="w-24 text-center text-2xl border-b-2 border-vivid-purple outline-none bg-transparent mb-2"
        placeholder="Svar"
        maxLength={1}
        value={guess}
        onChange={e => {
          setGuess(e.target.value);
          setResult(null);
        }}
        autoFocus
        aria-label="Gæt bogstav"
      />
      <Button onClick={handleGuess} disabled={!guess || result === "correct"} className="px-5">
        Indsend svar
      </Button>
      {result === "correct" && <div className="text-green-600 font-semibold">Korrekt! 🎉</div>}
      {result === "wrong" && <div className="text-red-500 font-semibold">Prøv igen!</div>}
    </div>
  );
}
