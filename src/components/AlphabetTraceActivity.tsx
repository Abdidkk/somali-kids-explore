
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import AlphabetPrototype from "./AlphabetPrototype";

// Det somaliske alfabet (ingen C, F, P, Q, V, X, Z ifølge klassisk opsætning)
const SOMALI_ALPHABET = [
  "A","B","D","E","G","H","I","J","K","L","M","N","O","R","S","Sh","T","U","W","Y"
];

interface Props {
  onBack: () => void;
}

/**
 * Spor bogstavet-aktivitetskomponent hvor man vælger bogstav fra et grid.
 */
export default function AlphabetTraceActivity({ onBack }: Props) {
  const [selectedLetter, setSelectedLetter] = useState<string>("A");

  return (
    <div className="flex flex-col items-center mt-5 gap-5 w-full">
      {/* Aktivitetsikon og titel */}
      <div className="flex flex-col items-center gap-2">
        <Pencil className="w-10 h-10 text-purple-700" />
        <div className="font-semibold text-lg text-purple-700">Tegn bogstavet</div>
      </div>
      {/* Info-text */}
      <div className="text-gray-600 text-center text-sm max-w-xs">
        Vælg et bogstav nedenfor og øv dig i at spore/tegne det med musen eller fingeren.<br />
        Du får stjerner og badges for at øve flere bogstaver!
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-2 mb-2 w-full max-w-md">
        {SOMALI_ALPHABET.map((letter) => (
          <button
            key={letter}
            className={[
              "flex flex-col items-center justify-center rounded-lg border transition-all font-bold text-lg md:text-2xl p-2",
              selectedLetter === letter 
                ? "bg-purple-100 border-purple-400 text-purple-700 scale-105 shadow"
                : "bg-white border-gray-300 hover:bg-violet-50"
            ].join(" ")}
            onClick={() => setSelectedLetter(letter)}
            aria-label={`Vælg bogstav ${letter}`}
            tabIndex={0}
          >
            {letter}
          </button>
        ))}
      </div>
      {/* Tegne-aktiviteten */}
      <AlphabetPrototype letter={selectedLetter} />
      {/* Tilbage-knap, placeret nederst som de andre */}
      <Button onClick={onBack} variant="outline" size="sm" className="mt-2">
        Tilbage
      </Button>
    </div>
  );
}

