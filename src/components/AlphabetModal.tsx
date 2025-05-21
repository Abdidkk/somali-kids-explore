
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AlphabetModalProps {
  open: boolean;
  onClose: () => void;
}

const AlphabetModal: React.FC<AlphabetModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm overflow-y-auto py-10">
      <div className="bg-white rounded-xl shadow-xl px-7 py-6 w-full max-w-lg relative animate-in fade-in-50 my-auto mx-4">
        {/* Back button */}
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
        
        <h2 className="text-2xl font-semibold text-purple-700 mb-5 text-center pt-3">
          Somalisk alfabet
        </h2>
        
        <div className="min-h-[300px] flex flex-col items-center justify-center">
          <p className="text-gray-600">
            Vi skal bygge alfabetaktiviteterne op trin for trin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlphabetModal;
