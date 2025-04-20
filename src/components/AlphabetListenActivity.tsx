
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";
import ElevenLabsTTS from "./ElevenLabsTTS";

/**
 * Dummy-lytteaktivitet — endstegnsbogstav og knap til at høre.
 * Udvid evt. til flere bogstaver senere.
 */
interface Props {
  onBack: () => void;
}

// Konfigureret til at udtale "pixar"-style med Aria (ElevenLabs)
const LETTER = "A";

export default function AlphabetListenActivity({ onBack }: Props) {
  const [playing, setPlaying] = useState(false);
  // For demo skal brugeren indtaste sin ElevenLabs API-nøgle:
  const [apiKey, setApiKey] = useState(""); 

  const handlePlay = () => {
    if (apiKey) setPlaying(true);
    else alert("Indtast din ElevenLabs API-nøgle!");
  };

  return (
    <div className="flex flex-col items-center mt-5 gap-5">
      <div className="text-[80px] font-bold text-purple-700">{LETTER}</div>
      <div className="flex flex-col items-center gap-2 w-full max-w-xs">
        <input
          type="password"
          placeholder="ElevenLabs API nøgle"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="border rounded px-3 py-2 text-sm w-full"
        />
        <Button onClick={handlePlay} variant="outline" size="lg" className="flex gap-2 px-6">
          <Headphones />
          Lyt til bogstavet <span className="ml-2">{playing && "🔊"}</span>
        </Button>
        {playing && apiKey && (
          <ElevenLabsTTS
            text={LETTER}
            voiceId="9BWtsMINqrJLrRacOk9x"
            language="so"
            apiKey={apiKey}
            onAudioEnd={() => setPlaying(false)}
          />
        )}
      </div>
      {/* Info-text */}
      <div className="text-gray-600 text-center text-sm max-w-xs mt-3">
        Tryk på knappen for at høre hvordan bogstavet "{LETTER}" udtales på somali<br />
        (Nu med ElevenLabs "Pixar"-stemmen "Aria" – kræver API-nøgle)
      </div>
    </div>
  );
}
