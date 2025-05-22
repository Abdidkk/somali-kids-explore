
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ElevenLabsTTS from "./ElevenLabsTTS";
import { GROUPS, ALPHABET_IMAGES, hasAudio, AUDIO_FILES } from "@/constants/alphabetData";
import AudioPlayer from "./AudioPlayer";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import LetterDisplay from "./alphabet/LetterDisplay";

interface Props {
  onBack: () => void;
}

export default function AlphabetListenActivity({ onBack }: Props) {
  const [apiKey, setApiKey] = useState(""); 
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  // Tabs
  const [tab, setTab] = useState<"alphabet" | "short" | "long">("alphabet");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const groupLetters = GROUPS[tab].letters;
  const selectedLetter = groupLetters[selectedIdx] || groupLetters[0];
  const [useCustomAudio, setUseCustomAudio] = useState(true);

  // Reset selectedIdx if we switch tabs and the current index is out of bounds
  useEffect(() => {
    if (selectedIdx > groupLetters.length - 1) setSelectedIdx(0);
  }, [tab, groupLetters.length, selectedIdx]);

  // Afspil bogstav automatisk hvis API-nøgle er angivet og ikke bruger custom audio
  useEffect(() => {
    if (apiKey && !useCustomAudio) {
      setPlayingIdx(selectedIdx);
    }
  }, [selectedIdx, apiKey, useCustomAudio]);

  // Function to handle audio playback
  const playAudio = () => {
    if (hasAudio(selectedLetter) && useCustomAudio) {
      // We'll use the Audio API directly here since we control the playback manually with a button
      const audio = new Audio(AUDIO_FILES[selectedLetter]);
      audio.play();
    } else if (apiKey) {
      // Fall back to ElevenLabs if we have an API key
      setPlayingIdx(selectedIdx);
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

  // Function to display only the uppercase letter
  const getDisplayLetter = (letter: string) => {
    // Special cases for digraphs
    if (letter === "DHdh") return "DH";
    if (letter === "KHkh") return "KH";
    if (letter === "SHsh") return "SH";
    return letter.charAt(0);
  };

  return (
    <div className="flex flex-col items-center mt-5 gap-4">
      {/* Tabs */}
      <Tabs value={tab} onValueChange={v => setTab(v as "alphabet" | "short" | "long")} className="w-full flex flex-col items-center">
        <TabsList className="mb-3 bg-violet-50">
          <TabsTrigger value="alphabet">{GROUPS.alphabet.label}</TabsTrigger>
          <TabsTrigger value="short">{GROUPS.short.label}</TabsTrigger>
          <TabsTrigger value="long">{GROUPS.long.label}</TabsTrigger>
        </TabsList>
        
        <TabsContent value={tab} className="w-full flex flex-col items-center">
          {/* Letter display with image and buttons */}
          <div className="flex flex-col items-center gap-4 w-full">
            {/* Current letter display using the dedicated LetterDisplay component */}
            <div className="flex flex-col items-center p-4">
              <LetterDisplay selectedLetter={selectedLetter} />
              
              {/* Play audio button */}
              <Button 
                onClick={playAudio} 
                variant="outline" 
                className="mt-4 flex gap-2"
              >
                <Volume2 className="w-5 h-5" /> Lyt
              </Button>
            </div>
            
            {/* Letter navigation */}
            <div className="flex items-center gap-2 mb-4">
              <button 
                onClick={() => setSelectedIdx(prev => Math.max(0, prev - 1))}
                disabled={selectedIdx === 0}
                className="bg-purple-100 hover:bg-purple-200 disabled:opacity-50 p-2 rounded-full"
                aria-label="Forrige bogstav"
              >
                ◀
              </button>
              <div className="px-4 py-2 bg-purple-50 rounded-lg font-medium">
                {selectedIdx + 1} / {groupLetters.length}
              </div>
              <button 
                onClick={() => setSelectedIdx(prev => Math.min(groupLetters.length - 1, prev + 1))}
                disabled={selectedIdx >= groupLetters.length - 1}
                className="bg-purple-100 hover:bg-purple-200 disabled:opacity-50 p-2 rounded-full"
                aria-label="Næste bogstav"
              >
                ▶
              </button>
            </div>
            
            {/* Letter selector grid - updated to show only uppercase */}
            <div className="w-full overflow-x-auto">
              <div className="flex flex-wrap gap-2 justify-center min-w-min p-2">
                {groupLetters.map((letter, idx) => (
                  <button
                    key={letter}
                    onClick={() => setSelectedIdx(idx)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                      idx === selectedIdx 
                        ? "bg-purple-600 text-white border-purple-700" 
                        : "bg-white hover:bg-purple-50 border-gray-200"
                    }`}
                  >
                    {getDisplayLetter(letter)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Text-to-speech component - only render if needed */}
      {playingIdx !== null && apiKey && !useCustomAudio && (
        <ElevenLabsTTS
          text={groupLetters[playingIdx]}
          apiKey={apiKey}
          onAudioEnd={() => setPlayingIdx(null)}
        />
      )}
    </div>
  );
}
