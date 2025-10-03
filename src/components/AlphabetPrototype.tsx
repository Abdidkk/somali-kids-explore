
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AUDIO_FILES } from "@/constants/alphabetData";
import { useIsMobile } from "@/hooks/use-mobile";
import AlphabetAchievements from "./AlphabetAchievements";

import DrawingCanvas from "./alphabet/DrawingCanvas";
import LetterPronunciation from "./alphabet/LetterPronunciation";
import { speakSomaliLetter } from "@/utils/speechUtils";

const TOTAL_LETTERS = 29; // Updated to include the new vowel A

interface Props {
  letter: string;
}

export default function AlphabetPrototype({ letter }: Props) {
  const [lettersTraced, setLettersTraced] = useState(0);
  const [streak, setStreak] = useState(2); // eks. dummy værdi
  const [badges, setBadges] = useState<string[]>([]);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const handleSuccessfulTrace = () => {
    setLettersTraced(lt => {
      const newCount = lt + 1;
      // Awards
      let newBadges = [...badges];
      if (newCount === 1 && !badges.includes("Første bogstav")) {
        newBadges.push("Første bogstav");
        toast({
          title: "Tillykke!",
          description: "Du har sporet dit første bogstav",
          duration: 3500,
          className: "bg-green-50",
        });
      }
      if (newCount === 5 && !badges.includes("5 bogstaver")) {
        newBadges.push("5 bogstaver");
        toast({
          title: "Sejt!",
          description: "Du har sporet 5 bogstaver",
          duration: 3500,
        });
      }
      if (newCount === 9 && !badges.includes("9 bogstaver")) {
        newBadges.push("9 bogstaver");
        toast({
          title: "Sejt!",
          description: "Sejt, blive ved med øve sporing af bogstaverne",
          duration: 3500,
        });
      }
      setBadges(newBadges);
      return newCount;
    });
  };

  const handleSpeakLetter = (letter: string) => {
    speakSomaliLetter(letter, AUDIO_FILES);
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 md:gap-6">
      <AlphabetAchievements
        streak={streak}
        lettersTraced={lettersTraced}
        totalLetters={TOTAL_LETTERS}
        badges={badges}
      />
      
      <LetterPronunciation 
        letter={letter}
        speakLetter={handleSpeakLetter}
      />
      
      
      
      <DrawingCanvas 
        letter={letter} 
        onSuccessfulTrace={handleSuccessfulTrace} 
      />
    </div>
  );
}
