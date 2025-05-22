
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ElevenLabsTTS from "./ElevenLabsTTS";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GROUPS } from "@/constants/alphabetData";

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

  // Reset selectedIdx if we switch tabs and the current index is out of bounds
  useEffect(() => {
    if (selectedIdx > groupLetters.length - 1) setSelectedIdx(0);
  }, [tab, groupLetters.length, selectedIdx]);

  // Afspil bogstav automatisk hvis API-nøgle er angivet
  useEffect(() => {
    if (apiKey) {
      setPlayingIdx(selectedIdx);
    }
  }, [selectedIdx, apiKey]);

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
          {/* Content will be rebuilt */}
          
          <div className="text-gray-600 text-center text-sm max-w-xs mt-3">
            Tryk på et bogstav og hør det udtalt på somali<br />
            (ElevenLabs "Aria" stemme – kræver API-nøgle)
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Text-to-speech component */}
      {playingIdx !== null && apiKey && (
        <ElevenLabsTTS
          text={groupLetters[playingIdx]}
          apiKey={apiKey}
          onAudioEnd={() => setPlayingIdx(null)}
        />
      )}
      
      <Button onClick={onBack} variant="outline" size="sm" className="mt-2">
        Tilbage
      </Button>
    </div>
  );
}
