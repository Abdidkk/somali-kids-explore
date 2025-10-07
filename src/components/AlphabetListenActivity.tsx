
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GROUPS, hasAudio, AUDIO_FILES } from "@/constants/alphabetData";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import ColoredLetterDisplay from "./alphabet/ColoredLetterDisplay";
import { useIsMobile } from "@/hooks/use-mobile";
import LetterSelector from "./alphabet/LetterSelector";

interface Props {
  onBack: () => void;
}

export default function AlphabetListenActivity({ onBack }: Props) {
  const isMobile = useIsMobile();
  // Tabs
  const [tab, setTab] = useState<"alphabet" | "short" | "long">("alphabet");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const groupLetters = GROUPS[tab].letters;
  const selectedLetter = groupLetters[selectedIdx] || groupLetters[0];

  // Reset selectedIdx if we switch tabs and the current index is out of bounds
  useEffect(() => {
    if (selectedIdx > groupLetters.length - 1) setSelectedIdx(0);
  }, [tab, groupLetters.length, selectedIdx]);

  // Function to handle audio playback
  const playAudio = () => {
    if (hasAudio(selectedLetter)) {
      const audio = new Audio(AUDIO_FILES[selectedLetter]);
      audio.play();
    } else {
      // Fall back to browser's speech synthesis
      const utter = new window.SpeechSynthesisUtterance(selectedLetter);
      utter.lang = "so-SO";
      utter.rate = 0.7;
      const hasSomali = window.speechSynthesis.getVoices().some(v => v.lang === "so-SO");
      if (!hasSomali) utter.lang = "en-US";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
  };

  return (
    <div className="flex flex-col items-center mt-3 md:mt-5 gap-4 md:gap-5">
      {/* Tabs */}
      <Tabs value={tab} onValueChange={v => setTab(v as "alphabet" | "short" | "long")} className="w-full flex flex-col items-center">
        <TabsList className={`mb-3 md:mb-4 bg-violet-50 ${isMobile ? 'text-xs' : ''}`}>
          <TabsTrigger value="alphabet">{GROUPS.alphabet.label}</TabsTrigger>
          <TabsTrigger value="short">{GROUPS.short.label}</TabsTrigger>
          <TabsTrigger value="long">{GROUPS.long.label}</TabsTrigger>
        </TabsList>
        
        <TabsContent value={tab} className="w-full flex flex-col items-center">
          {/* Letter display with image and buttons */}
          <div className="flex flex-col items-center gap-4 md:gap-5 w-full">
            {/* Current letter display using colored letters */}
            <div className={`flex flex-col items-center ${isMobile ? 'p-3' : 'p-5'}`}>
              <ColoredLetterDisplay 
                letter={selectedLetter} 
                size={isMobile ? "medium" : "large"}
              />
              
              {/* Letter name display */}
              <div className={`mt-3 ${isMobile ? 'text-xl' : 'text-2xl'} font-semibold text-gray-700`}>
                {selectedLetter}
              </div>
              
              {/* Play audio button */}
              <Button 
                onClick={playAudio} 
                variant="outline" 
                size={isMobile ? "default" : "lg"}
                className="mt-3 md:mt-4 flex gap-2"
              >
                <Volume2 className="w-5 h-5" /> Lyt
              </Button>
            </div>
            
            {/* Letter navigation */}
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <button 
                onClick={() => setSelectedIdx(prev => Math.max(0, prev - 1))}
                disabled={selectedIdx === 0}
                className="bg-purple-100 hover:bg-purple-200 disabled:opacity-50 p-2 md:p-3 rounded-full"
                aria-label="Forrige bogstav"
              >
                ◀
              </button>
              <div className={`px-4 md:px-5 py-2 md:py-3 bg-purple-50 rounded-lg font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>
                {selectedIdx + 1} / {groupLetters.length}
              </div>
              <button 
                onClick={() => setSelectedIdx(prev => Math.min(groupLetters.length - 1, prev + 1))}
                disabled={selectedIdx >= groupLetters.length - 1}
                className="bg-purple-100 hover:bg-purple-200 disabled:opacity-50 p-2 md:p-3 rounded-full"
                aria-label="Næste bogstav"
              >
                ▶
              </button>
            </div>
            
            {/* Letter selector grid using our updated component */}
            <LetterSelector 
              letters={groupLetters}
              selectedIdx={selectedIdx}
              onLetterSelect={setSelectedIdx}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
