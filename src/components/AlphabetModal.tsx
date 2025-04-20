
import React from "react";
import AlphabetPrototype from "./AlphabetPrototype";

interface AlphabetModalProps {
  open: boolean;
  onClose: () => void;
}

const AlphabetModal: React.FC<AlphabetModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl px-7 py-6 w-full max-w-lg relative animate-in fade-in-50">
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
