import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ElevenLabsTTS from "./ElevenLabsTTS";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Bogstavgrupper
const SHORT_VOWELS = ["A", "E", "I", "O", "U"];
const LONG_VOWELS = ["AA", "EE", "II", "OO", "UU"];
const ALPHABET = [
  "Bb", "Cc", "Dd", "DHdh", "Ff", "Gg", "Hh", "Jj", "Kk", "KHkh",
  "Ll", "Mm", "Nn", "Qq", "Rr", "Ss", "SHsh", "Tt", "Ww", "Xx", "Yy"
];

const GROUPS = {
  alphabet: { label: "Alfabetet", letters: [...SHORT_VOWELS, ...LONG_VOWELS, ...ALPHABET] },
  short:    { label: "Korte vokaler", letters: SHORT_VOWELS },
  long:     { label: "Lange vokaler", letters: LONG_VOWELS }
};

const ALPHABET_IMAGES: Record<string, { img: string; alt: string }> = {
  // Korte vokaler
  "A": {
    img: "/lovable-uploads/0a4df638-a8fe-492e-b3bf-9b8d9c7235fc.png",
    alt: "Bogstavet A"
  },
  "E": {
    img: "/lovable-uploads/d0b3c9b9-109a-4f4a-b560-6bbcba7c84e8.png",
    alt: "Bogstavet E"
  },
  "I": {
    img: "/lovable-uploads/6506b1da-00fd-4f81-9d87-1c7275dccb9c.png",
    alt: "Bogstavet I"
  },
  "O": {
    img: "/lovable-uploads/fe657e0f-c052-431d-88ac-d092125bd493.png",
    alt: "Bogstavet O"
  },
  "U": {
    img: "/lovable-uploads/565c97e5-b6b0-4419-9a59-13174c95fba6.png",
    alt: "Bogstavet U"
  },
  // Lange vokaler tilføjes her, men bruger default billede midlertidigt
  "AA": {
    img: "/lovable-uploads/23df9b50-7f66-4b52-819b-59cc920edd2b.png",
    alt: "Bogstavet AA"
  },
  "EE": {
    img: "/lovable-uploads/23df9b50-7f66-4b52-819b-59cc920edd2b.png",
    alt: "Bogstavet EE"
  },
  "II": {
    img: "/lovable-uploads/23df9b50-7f66-4b52-819b-59cc920edd2b.png",
    alt: "Bogstavet II"
  },
  "OO": {
    img: "/lovable-uploads/23df9b50-7f66-4b52-819b-59cc920edd2b.png",
    alt: "Bogstavet OO"
  },
  "UU": {
    img: "/lovable-uploads/23df9b50-7f66-4b52-819b-59cc920edd2b.png",
    alt: "Bogstavet UU"
  },
  // Alfabetet
  "Bb": {
    img: "/lovable-uploads/81ec82e0-146f-4c28-87de-65901d939ac0.png",
    alt: "Baabuur / Bil billede: Dreng og bil"
  },
  "Dd": {
    img: "/lovable-uploads/c3c53a02-5ecc-4109-964e-df932b52581c.png",
    alt: "Dameer / Æsel billede: Pige og æsel"
  },
  // Flere billeder kan tilføjes her.
};

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

  React.useEffect(() => {
    if (selectedIdx > groupLetters.length - 1) setSelectedIdx(0);
  }, [tab]);

  // Afspil bogstav
  const handlePlay = (idx: number) => {
    if (!apiKey) {
      alert("Indtast din ElevenLabs API-nøgle!");
      return;
    }
    setPlayingIdx(idx);
  };

  // Find billedinfo
  const getLetterImage = (letter: string) => {
    if (ALPHABET_IMAGES[letter]) return ALPHABET_IMAGES[letter];
    return {
      img: "/lovable-uploads/23df9b50-7f66-4b52-819b-59cc920edd2b.png",
      alt: "Standard alfabet billede"
    };
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
          <div className="w-full max-w-md overflow-x-auto">
            <div className="flex flex-row gap-3 py-2 min-w-max">
              {groupLetters.map((letter, idx) => {
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
            Tryk på et bogstav og hør det udtalt på somali<br />
            (ElevenLabs "Aria" stemme – kræver API-nøgle)
          </div>
        </TabsContent>
      </Tabs>
      <Button onClick={onBack} variant="outline" size="sm" className="mt-2">
        Tilbage
      </Button>
    </div>
  );
}
