
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
      {/* INDSÆTTER BILLEDET ØVERST */}
      <img
        src="/lovable-uploads/23df9b50-7f66-4b52-819b-59cc920edd2b.png"
        alt="Børn lærer alfabetet"
        className="w-full max-w-xs rounded-xl border mb-2 shadow"
        style={{objectFit: "cover"}}
      />
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
      <div className="w-full max-w-md overflow-x-auto">
        <div className="flex flex-row gap-2 py-2 min-w-max">
          {SOMALI_ALPHABET.map((letter, idx) => (
            <div key={letter} className="flex flex-col items-center gap-1 min-w-[52px]">
              <div className="text-2xl md:text-3xl font-bold text-purple-700">{letter}</div>
              <Button
                onClick={() => handlePlay(idx)}
                variant="outline"
                size="sm"
                className="flex gap-1 px-2 py-1 text-xs"
                disabled={playingIdx === idx}
              >
                {/* Fjerner Headphones-ikonet, kun Lyt/tekst */}
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
      </div>
      <div className="text-gray-600 text-center text-sm max-w-xs mt-3">
        Tryk på "Lyt" ud for et bogstav for at høre det udtalt på somali<br />
        (ElevenLabs "Aria" stemme – kræver API-nøgle)
      </div>
    </div>
  );
}
