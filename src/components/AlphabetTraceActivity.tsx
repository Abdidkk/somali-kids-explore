
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import AlphabetPrototype from "./AlphabetPrototype";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GROUPS } from "@/constants/alphabetData";

interface Props {
  onBack: () => void;
}

/**
 * Alfabetaktivitet med tabs til alfabetet, korte og lange vokaler.
 */
export default function AlphabetTraceActivity({ onBack }: Props) {
  const [tab, setTab] = useState<"alphabet" | "short" | "long">("alphabet");
  const [selectedLetter, setSelectedLetter] = useState<string>(GROUPS.alphabet.letters[0]);

  // Sørg for at valgt bogstav altid eksisterer i nuværende gruppe
  React.useEffect(() => {
    const arr = GROUPS[tab].letters;
    if (!arr.includes(selectedLetter)) setSelectedLetter(arr[0]);
  }, [tab]);

  // Function to display only the uppercase letter
  const getDisplayLetter = (letter: string) => {
    // Special cases for digraphs
    if (letter === "DHdh") return "DH";
    if (letter === "KHkh") return "KH";
    return letter.charAt(0);
  };

  return (
    <div className="flex flex-col items-center mt-5 gap-5 w-full">
      {/* Ikon og titel */}
      <div className="flex flex-col items-center gap-2">
        <Pencil className="w-10 h-10 text-purple-700" />
        <div className="font-semibold text-lg text-purple-700">Tegn bogstavet</div>
      </div>
      {/* Tabs til valg */}
      <Tabs value={tab} onValueChange={v => setTab(v as "alphabet" | "short" | "long")} className="w-full flex flex-col items-center">
        <TabsList className="mb-3 bg-violet-50">
          <TabsTrigger value="alphabet">{GROUPS.alphabet.label}</TabsTrigger>
          <TabsTrigger value="short">{GROUPS.short.label}</TabsTrigger>
          <TabsTrigger value="long">{GROUPS.long.label}</TabsTrigger>
        </TabsList>
        {/* Info-text */}
        <div className="text-gray-600 text-center text-sm max-w-xs mb-2">
          Vælg et bogstav og øv dig i at spore det med musen eller fingeren. Skift mellem alfabet, korte og lange vokaler med fanerne.
        </div>
        <TabsContent value={tab} className="w-full">
          <div className="w-full max-w-md overflow-x-auto">
            <div className="flex flex-row gap-2 py-2 min-w-max">
              {GROUPS[tab].letters.map((letter) => (
                <button
                  key={letter}
                  className={[
                    "flex flex-col items-center justify-center rounded-lg border transition-all font-bold text-lg md:text-2xl p-2 min-w-[54px]",
                    selectedLetter === letter 
                      ? "bg-purple-100 border-purple-400 text-purple-700 scale-105 shadow"
                      : "bg-white border-gray-300 hover:bg-violet-50"
                  ].join(" ")}
                  onClick={() => setSelectedLetter(letter)}
                  aria-label={`Vælg bogstav ${letter}`}
                  tabIndex={0}
                  type="button"
                >
                  {getDisplayLetter(letter)}
                </button>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      {/* Tegne-aktiviteten */}
      <AlphabetPrototype letter={selectedLetter} />
      <Button onClick={onBack} variant="outline" size="sm" className="mt-2">
        Tilbage
      </Button>
    </div>
  );
}
