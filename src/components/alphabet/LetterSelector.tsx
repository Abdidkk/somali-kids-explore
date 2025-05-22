
import React from "react";
import { hasImage, ALPHABET_IMAGES } from "@/constants/alphabetData";

interface LetterSelectorProps {
  letters: string[];
  selectedIdx: number;
  onLetterSelect: (idx: number) => void;
}

export default function LetterSelector({ 
  letters, 
  selectedIdx, 
  onLetterSelect 
}: LetterSelectorProps) {
  return (
    <div className="w-full max-w-md overflow-x-auto">
      <div className="flex flex-row gap-3 py-2 min-w-max">
        {letters.map((letter, idx) => (
          <div
            key={letter}
            className={[
              "flex flex-col items-center min-w-[54px] transition-all rounded-lg px-2 py-1 cursor-pointer",
              selectedIdx === idx 
                ? "bg-vivid-purple/10 border border-vivid-purple shadow scale-105"
                : "hover:bg-violet-50 border border-transparent"
            ].join(" ")}
            onClick={() => onLetterSelect(idx)}
            aria-label={`Vælg bogstav: ${letter}`}
            tabIndex={0}
          >
            {hasImage(letter) ? (
              <img
                src={ALPHABET_IMAGES[letter].img}
                alt={ALPHABET_IMAGES[letter].alt}
                className="w-10 h-10 object-cover rounded"
              />
            ) : (
              <span className="font-semibold text-lg">{letter}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
