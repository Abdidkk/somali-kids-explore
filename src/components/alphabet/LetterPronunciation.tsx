
import React from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface LetterPronunciationProps {
  letter: string;
  speakLetter: (letter: string) => void;
}

export default function LetterPronunciation({ letter, speakLetter }: LetterPronunciationProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className={`${isMobile ? "text-[52px]" : "text-[72px]"} text-purple-700 font-bold drop-shadow`} 
        aria-label="Somalisk bogstav"
      >
        {letter}
      </div>
      
      <Button 
        onClick={() => speakLetter(letter)} 
        variant="outline" 
        size={isMobile ? "sm" : "default"}
        className="flex gap-2"
      >
        <Play className="w-4 h-4" /> Lyt
      </Button>
    </div>
  );
}
