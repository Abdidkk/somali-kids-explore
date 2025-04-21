
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ElevenLabsTTS from "./ElevenLabsTTS";

// Rigtig somalisk alfabet: vokaler først
const SOMALI_ALPHABET = [
  // Korte vokaler
  "Aa", "Ee", "Ii", "Oo", "Uu",
  // Lange vokaler
  "AA", "EE", "II", "OO", "UU",
  // Resten af bogstaverne
  "Bb", "Cc", "Dd", "DHdh", "Ff", "Gg", "Hh", "Jj", "Kk", "KHkh",
  "Ll", "Mm", "Nn", "Qq", "Rr", "Ss", "SHsh", "Tt", "Ww", "Xx", "Yy"
];

// Tilføj mapping mellem bogstav og billede/tekst
const ALPHABET_IMAGES: Record<string, { img: string; alt: string }> = {
  "Bb": {
    img: "/lovable-uploads/81ec82e0-146f-4c28-87de-65901d939ac0.png",
    alt: "Baabuur / Bil billede: Dreng og bil"
  },
  "Dd": {
    img: "/lovable-uploads/c3c53a02-5ecc-4109-964e-df932b52581c.png",
    alt: "Dameer / Æsel billede: Pige og æsel"
  },
  // Yderligere billeder kan tilføjes her, ellers bruges fallback.
};

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

  // Find billedinfo til valgt bogstav, ellers brug fallback
  const getLetterImage = (letter: string) => {
    if (ALPHABET_IMAGES[letter]) {
      return ALPHABET_IMAGES[letter];
    }
    // Standard-billede fallback
    return {
      img: "/lovable-uploads/23df9b50-7f66-4b52-819b-59cc920edd2b.png",
      alt: "Standard alfabet billede"
    };
  };

  // Det valgte bogstav til visning af stort billede
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selectedLetter = SOMALI_ALPHABET[selectedIdx];

  return (
    <div className="flex flex-col items-center mt-5 gap-4">
      {/* Det store billede for valgt bogstav */}
      <img
        src={getLetterImage(selectedLetter).img}
        alt={getLetterImage(selectedLetter).alt}
        className="w-full max-w-xs rounded-xl border mb-2 shadow bg-white"
        style={{ objectFit: "cover" }}
      />
      <h3 className="text-xl font-bold text-purple-700 mb-2">{selectedLetter} — Lyt til bogstavet</h3>
      <div className="flex flex-col items-center gap-2 w-full max-w-xs">
        <input
          type="password"
          placeholder="ElevenLabs API nøgle"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="border rounded px-3 py-2 text-sm w-full"
        />
      </div>
      {/* Bogstavs-selector med billeder */}
      <div className="w-full max-w-md overflow-x-auto">
        <div className="flex flex-row gap-3 py-2 min-w-max">
          {SOMALI_ALPHABET.map((letter, idx) => {
            const info = getLetterImage(letter);
            return (
              <button
                key={letter}
                className={[
                  "flex flex-col items-center min-w-[54px] transition-all rounded-lg px-2 py-1",
                  selectedIdx === idx 
                    ? "bg-vivid-purple/10 border border-vivid-purple shadow scale-105"
                    : "hover:bg-violet-50 border border-transparent"
                ].join(" ")}
                onClick={() => setSelectedIdx(idx)}
                aria-label={`Vælg bogstav: ${letter}`}
                tabIndex={0}
                type="button"
              >
                <img
                  src={info.img}
                  alt={info.alt}
                  className="w-10 h-10 object-cover rounded"
                />
                <span className="text-lg font-bold mt-1">{letter}</span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Knappen til at lytte + ElevenLabsTTS */}
      <Button
        onClick={() => handlePlay(selectedIdx)}
        variant="outline"
        size="sm"
        className="flex gap-1 px-4 py-2 text-md items-center mt-1 font-semibold"
        disabled={playingIdx === selectedIdx}
      >
        {playingIdx === selectedIdx ? "Afspiller..." : `Lyt til ${selectedLetter}`}
      </Button>
      {playingIdx === selectedIdx && apiKey && (
        <ElevenLabsTTS
          text={selectedLetter}
          voiceId="9BWtsMINqrJLrRacOk9x"
          language="so"
          apiKey={apiKey}
          onAudioEnd={() => setPlayingIdx(null)}
        />
      )}
      <div className="text-gray-600 text-center text-sm max-w-xs mt-3">
        Tryk på et bogstav ovenfor og hør det udtalt på somali<br />
        (ElevenLabs "Aria" stemme – kræver API-nøgle)
      </div>
      <Button onClick={onBack} variant="outline" size="sm" className="mt-2">
        Tilbage
      </Button>
    </div>
  );
}
