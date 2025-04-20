
import React from "react";
import { Button } from "@/components/ui/button";

const SOMALI_ALPHABET = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
  "M", "N", "O", "Q", "R", "S", "Sh", "T", "U", "W", "X", "Y"
];

interface AlphabetModalProps {
  open: boolean;
  onClose: () => void;
}

function speakSomaliLetter(letter: string) {
  const utter = new window.SpeechSynthesisUtterance(letter);
  utter.lang = "so-SO";
  utter.rate = 0.7;
  // Hvis ingen somali, brug fallback
  const hasSomali = window.speechSynthesis.getVoices().some(v => v.lang === "so-SO");
  if (!hasSomali) utter.lang = "en-US"; // fallback
  window.speechSynthesis.cancel(); // stop evt. igangværende
  window.speechSynthesis.speak(utter);
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
        <h2 className="text-2xl font-semibold text-purple-700 mb-3 text-center">Somalisk alfabet</h2>
        <p className="mb-6 text-gray-600 text-center">Tryk på et bogstav og hør udtalen på somalisk.</p>
        <div className="grid grid-cols-6 gap-3">
          {SOMALI_ALPHABET.map((letter) => (
            <Button
              key={letter}
              onClick={() => speakSomaliLetter(letter)}
              variant="secondary"
              className="rounded-lg text-xl h-14 w-14 flex items-center justify-center shadow"
              aria-label={`Udtal bogstavet ${letter}`}
            >
              {letter}
              <span className="sr-only">{letter} play sound</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlphabetModal;
