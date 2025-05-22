
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
    <div className="flex flex-col items-center gap-3">
      <div 
        className={`${isMobile ? "text-[70px] sm:text-[80px]" : "text-[100px]"} text-purple-700 font-bold drop-shadow-md`} 
        aria-label="Somalisk bogstav"
      >
        {letter}
      </div>
      
      <Button 
        onClick={() => speakLetter(letter)} 
        variant="outline" 
        size={isMobile ? "default" : "lg"}
        className="flex gap-2"
      >
        <Play className="w-5 h-5" /> Lyt
      </Button>
    </div>
  );
}
