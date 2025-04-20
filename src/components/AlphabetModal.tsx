
import React from "react";
import AlphabetPrototype from "./AlphabetPrototype";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AlphabetModalProps {
  open: boolean;
  onClose: () => void;
}

const AlphabetModal: React.FC<AlphabetModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl px-7 py-6 w-full max-w-lg relative animate-in fade-in-50">
        {/* Tilbage-knap i øverste venstre hjørne */}
        <div className="absolute left-4 top-3 z-20">
          <Button
            onClick={onClose}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            aria-label="Tilbage"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbage
          </Button>
        </div>
        {/* Eksisterende luk-knap (×) i højre hjørne */}
        <button
          aria-label="Luk alfabet"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 text-xl hover:text-vivid-purple"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold text-purple-700 mb-3 text-center">Somalisk alfabet prototype</h2>
        <p className="mb-5 text-gray-600 text-center">
          Se bogstavet, billedet, lyt til udtalen og prøv at spore bogstavet.
        </p>
        <AlphabetPrototype />
      </div>
    </div>
  );
};

export default AlphabetModal;

