
import React from "react";
import AlphabetPrototype from "./AlphabetPrototype";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface Props {
  onBack: () => void;
}

/**
 * Spor bogstavet-aktivitetskomponent (samme layout som de øvrige aktiviteter)
 */
export default function AlphabetTraceActivity({ onBack }: Props) {
  return (
    <div className="flex flex-col items-center mt-5 gap-5 w-full">
      {/* Aktivitetsikon og titel */}
      <div className="flex flex-col items-center gap-2">
        <Pencil className="w-10 h-10 text-purple-700" />
        <div className="font-semibold text-lg text-purple-700">Tegn bogstavet</div>
      </div>
      {/* Info-text */}
      <div className="text-gray-600 text-center text-sm max-w-xs">
        Prøv at spore bogstavet med musen eller fingeren på computerskærmen. 
        Du får stjerner og badges for at øve flere bogstaver!
      </div>
      {/* Tegne-aktiviteten */}
      <AlphabetPrototype />
      {/* Tilbage-knap, placeret nederst som de andre */}
      <Button onClick={onBack} variant="outline" size="sm" className="mt-2">
        Tilbage
      </Button>
    </div>
  );
}
