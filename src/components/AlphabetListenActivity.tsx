
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";
import ElevenLabsTTS from "./ElevenLabsTTS";

// Det somaliske alfabet (ingen C, F, P, Q, V, X, Z ifølge klassisk opsætning)
const SOMALI_ALPHABET = [
  "A","B","D","E","G","H","I","J","K","L","M","N","O","R","S","Sh","T","U","W","Y"
];

interface Props {
  onBack: () => void;
}

export default function AlphabetListenActivity({ onBack }: Props) {
  const [apiKey, setApiKey] = useState(""); 
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);

  // Afspil bogstav
  const handlePlay = (idx: number) => {
    if (!apiKey) {
      alert("Indtast din ElevenLabs API-nøgle!");
      return;
    }
    setPlayingIdx(idx);
  };

  return (
    <div className="flex flex-col items-center mt-5 gap-3">
      <h3 className="text-xl font-bold text-purple-700 mb-2">Somalisk alfabet</h3>
      <div className="flex flex-col items-center gap-2 w-full max-w-xs">
        <input
          type="password"
          placeholder="ElevenLabs API nøgle"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="border rounded px-3 py-2 text-sm w-full"
        />
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-2 mb-2 w-full max-w-md">
        {SOMALI_ALPHABET.map((letter, idx) => (
          <div key={letter} className="flex flex-col items-center gap-1">
            <div className="text-2xl md:text-3xl font-bold text-purple-700">{letter}</div>
            <Button
              onClick={() => handlePlay(idx)}
              variant="outline"
              size="sm"
              className="flex gap-1 px-2 py-1 text-xs"
              disabled={playingIdx === idx}
            >
              <Headphones />
              {playingIdx === idx ? "Afspiller..." : "Lyt"}
            </Button>
            {playingIdx === idx && apiKey && (
              <ElevenLabsTTS
                text={letter}
                voiceId="9BWtsMINqrJLrRacOk9x"
                language="so"
                apiKey={apiKey}
                onAudioEnd={() => setPlayingIdx(null)}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-gray-600 text-center text-sm max-w-xs mt-3">
        Tryk på "Lyt" ud for et bogstav for at høre det udtalt på somali<br />
        (ElevenLabs "Aria" stemme – kræver API-nøgle)
      </div>
    </div>
  );
}
