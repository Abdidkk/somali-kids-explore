
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
  // Korte vokaler - removed images for vowels
  "A": {
    img: "",
    alt: "Bogstavet A"
  },
  "E": {
    img: "",
    alt: "Bogstavet E"
  },
  "I": {
    img: "",
    alt: "Bogstavet I"
  },
  "O": {
    img: "",
    alt: "Bogstavet O"
  },
  "U": {
    img: "",
    alt: "Bogstavet U"
  },
  // Lange vokaler - removed images 
  "AA": {
    img: "",
    alt: "Bogstavet AA"
  },
  "EE": {
    img: "",
    alt: "Bogstavet EE"
  },
  "II": {
    img: "",
    alt: "Bogstavet II"
  },
  "OO": {
    img: "",
    alt: "Bogstavet OO"
  },
  "UU": {
    img: "",
    alt: "Bogstavet UU"
  },
  // Alfabetet - nye billeder tilføjet
  "Bb": {
    img: "/lovable-uploads/2176c21d-70ed-4835-8927-27d0dee437d2.png",
    alt: "Bogstavet B"
  },
  "Cc": {
    img: "/lovable-uploads/0e29c5c2-6fa5-4899-a196-b7832d8abc67.png",
    alt: "Bogstavet C"
  },
  "Dd": {
    img: "/lovable-uploads/c1dd8450-aabf-4867-a1f8-a87aedeb964a.png",
    alt: "Bogstavet D"
  },
  "DHdh": {
    img: "/lovable-uploads/fed49f42-48ff-4aa2-971d-914092d122a8.png", 
    alt: "Bogstavet DH"
  },
  "Ff": {
    img: "/lovable-uploads/e6aa3b70-3fa2-4c9e-af6a-398e0c5487f6.png",
    alt: "Bogstavet F"
  },
  "Gg": {
    img: "/lovable-uploads/4097f6e7-9f3a-423f-8959-f5b7d9b23ed7.png",
    alt: "Bogstavet G"
  },
  "Hh": {
    img: "/lovable-uploads/fadf7158-7c58-41a5-bc73-84baf9995109.png",
    alt: "Bogstavet H"
  },
  "Jj": {
    img: "/lovable-uploads/2880b50d-a895-4677-a7d9-680fa0c872f3.png",
    alt: "Bogstavet J"
  },
  "Kk": {
    img: "/lovable-uploads/5e9cedef-3d1e-4ca9-8f28-eac454a506e7.png",
    alt: "Bogstavet K"
  },
  "KHkh": {
    img: "/lovable-uploads/a2da5f69-75bf-45a0-8325-4e3c1285929c.png",
    alt: "Bogstavet KH"
  },
  "Ll": {
    img: "/lovable-uploads/1dbfd78f-7c8b-4272-a674-10d38c20043d.png",
    alt: "Bogstavet L"
  },
  "Mm": {
    img: "/lovable-uploads/ad1381cf-5eeb-4fef-8af0-1dc5f93bf90b.png",
    alt: "Bogstavet M"
  },
  "Nn": {
    img: "/lovable-uploads/3b5c7f31-fb92-4d57-b31a-2b9f5e3f8f04.png",
    alt: "Bogstavet N"
  },
  "Qq": {
    img: "/lovable-uploads/49106c52-e19b-492a-8642-9a326819df86.png",
    alt: "Bogstavet Q"
  },
  "Rr": {
    img: "/lovable-uploads/05aa24f3-bf74-4721-80fd-294bfe79b1eb.png",
    alt: "Bogstavet R"
  },
  "Ss": {
    img: "/lovable-uploads/7704660d-576e-4a7f-ac19-3aed5364351f.png",
    alt: "Bogstavet S"
  },
  "SHsh": {
    img: "/lovable-uploads/0249030c-58e1-4fac-8541-4c83b0b41900.png",
    alt: "Bogstavet SH"
  },
  "Tt": {
    img: "/lovable-uploads/0e8c4234-8d4a-494f-ba70-7efa05bbf051.png",
    alt: "Bogstavet T"
  },
  "Ww": {
    img: "/lovable-uploads/1b83ffd6-177b-4abc-b5e8-ff1f289e98d6.png",
    alt: "Bogstavet W"
  },
  "Xx": {
    img: "/lovable-uploads/8caf3563-09bf-4bd5-a4ee-92b930b270a5.png",
    alt: "Bogstavet X"
  },
  "Yy": {
    img: "/lovable-uploads/635670fe-f87e-4fb0-aec5-e1d0346b85c7.png",
    alt: "Bogstavet Y"
  }
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

  // Afspil bogstav automatisk hvis API-nøgle er angivet
  React.useEffect(() => {
    if (apiKey) {
      setPlayingIdx(selectedIdx);
    }
  }, [selectedIdx, apiKey]);

  // Check om bogstavet er en vokal
  const isVowel = (letter: string) => {
    return SHORT_VOWELS.includes(letter) || LONG_VOWELS.includes(letter);
  };

  // Check om bogstavet har et billede
  const hasImage = (letter: string) => {
    return ALPHABET_IMAGES[letter]?.img && ALPHABET_IMAGES[letter].img !== "";
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
          {/* Viser kun billede hvis det ikke er en vokal */}
          {!isVowel(selectedLetter) && (
            <img
              src={ALPHABET_IMAGES[selectedLetter]?.img || ""}
              alt={ALPHABET_IMAGES[selectedLetter]?.alt || selectedLetter}
              className="w-full max-w-xs rounded-xl border mb-2 shadow bg-white"
              style={{ objectFit: "cover" }}
            />
          )}
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
              {groupLetters.map((letter, idx) => (
                <div
                  key={letter}
                  className={[
                    "flex flex-col items-center min-w-[54px] transition-all rounded-lg px-2 py-1 cursor-pointer",
                    selectedIdx === idx 
                      ? "bg-vivid-purple/10 border border-vivid-purple shadow scale-105"
                      : "hover:bg-violet-50 border border-transparent"
                  ].join(" ")}
                  onClick={() => setSelectedIdx(idx)}
                  aria-label={`Vælg bogstav: ${letter}`}
                  tabIndex={0}
                >
                  {hasImage(letter) ? (
                    <img
                      src={ALPHABET_IMAGES[letter].img}
                      alt={ALPHABET_IMAGES[letter].alt}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <span className="font-semibold text-lg">{letter}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="text-gray-600 text-center text-sm max-w-xs mt-3">
            Tryk på et bogstav og hør det udtalt på somali<br />
            (ElevenLabs "Aria" stemme – kræver API-nøgle)
          </div>
        </TabsContent>
      </Tabs>
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
