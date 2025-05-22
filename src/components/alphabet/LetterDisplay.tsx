
import React from "react";
import { ALPHABET_IMAGES } from "@/constants/alphabetData";

interface LetterDisplayProps {
  selectedLetter: string;
}

export default function LetterDisplay({ selectedLetter }: LetterDisplayProps) {
  return (
    <>
      {/* Removed restriction for vowels so all letters can show images */}
      {ALPHABET_IMAGES[selectedLetter]?.img && (
        <img
          src={ALPHABET_IMAGES[selectedLetter].img}
          alt={ALPHABET_IMAGES[selectedLetter].alt || selectedLetter}
          className="w-full max-w-xs rounded-xl border mb-2 shadow bg-white"
          style={{ objectFit: "cover" }}
        />
      )}
      <h3 className="text-xl font-bold text-purple-700 mb-2">{selectedLetter} — Lyt til bogstavet</h3>
    </>
  );
}
