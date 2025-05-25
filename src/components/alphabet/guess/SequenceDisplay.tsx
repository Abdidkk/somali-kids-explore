
import React from "react";
import { Volume2 } from "lucide-react";
import { ALPHABET_IMAGES } from "@/constants/alphabetData";

interface SequenceDisplayProps {
  sequence: string[];
  activeTab: string;
  onPlaySound: (letter: string) => void;
}

export default function SequenceDisplay({ sequence, activeTab, onPlaySound }: SequenceDisplayProps) {
  return (
    <div className="flex items-center gap-2 md:gap-4 justify-center mb-2">
      {sequence.map((letter, idx) => (
        <div 
          key={idx} 
          className="flex flex-col items-center gap-1 relative"
          onClick={() => onPlaySound(letter)}
        >
          {ALPHABET_IMAGES[letter] && (
            <div className="relative w-16 h-16 md:w-20 md:h-20 bg-purple-50 rounded-lg p-1 border-2 border-purple-200 hover:bg-purple-100 cursor-pointer">
              <img
                src={ALPHABET_IMAGES[letter].img}
                alt={ALPHABET_IMAGES[letter].alt}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Conditionally show text label - hide for alphabet category */}
              {activeTab !== "alfabetet" && (
                <div className="absolute -bottom-6 left-0 right-0 text-center font-bold text-purple-700 text-xl">
                  {letter}
                </div>
              )}
            </div>
          )}
          {!ALPHABET_IMAGES[letter] && (
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-purple-100 rounded-lg border-2 border-purple-300 hover:bg-purple-200 cursor-pointer">
              <span className="text-3xl font-bold text-purple-700">{letter}</span>
            </div>
          )}
          {/* Sound icon */}
          <Volume2 className="w-4 h-4 text-purple-600 absolute -bottom-7 md:-bottom-8 right-0" />
        </div>
      ))}
      
      {/* Question mark for the answer */}
      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-yellow-100 rounded-lg border-2 border-yellow-300 animate-pulse">
        <span className="text-3xl font-bold text-yellow-700">?</span>
      </div>
    </div>
  );
}
