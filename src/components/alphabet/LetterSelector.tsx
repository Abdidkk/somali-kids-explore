
import React from "react";
import { hasImage, ALPHABET_IMAGES } from "@/constants/alphabetData";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full overflow-x-auto py-1">
      <div className="flex flex-row gap-3 py-2 min-w-max px-1">
        {letters.map((letter, idx) => (
          <div
            key={letter}
            className={[
              "flex flex-col items-center justify-center transition-all rounded-lg px-2 py-2 cursor-pointer",
              isMobile ? "min-w-[50px] min-h-[50px]" : "min-w-[60px] min-h-[60px]",
              selectedIdx === idx 
                ? "bg-vivid-purple/10 border-2 border-vivid-purple shadow-md scale-105"
                : "hover:bg-violet-50 border-2 border-transparent hover:border-violet-200"
            ].join(" ")}
            onClick={() => onLetterSelect(idx)}
            aria-label={`Vælg bogstav: ${letter}`}
            tabIndex={0}
          >
            {hasImage(letter) ? (
              <img
                src={ALPHABET_IMAGES[letter].img}
                alt={ALPHABET_IMAGES[letter].alt}
                className={isMobile ? "w-10 h-10 object-contain rounded" : "w-12 h-12 object-contain rounded"}
              />
            ) : (
              <span className={isMobile ? "font-semibold text-xl" : "font-semibold text-2xl"}>{letter}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
