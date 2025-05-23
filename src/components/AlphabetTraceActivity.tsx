
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import AlphabetPrototype from "./AlphabetPrototype";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GROUPS } from "@/constants/letterGroups";
import { useIsMobile } from "@/hooks/use-mobile";
import LetterSelector from "./alphabet/LetterSelector";

interface Props {
  onBack: () => void;
}

/**
 * Alfabetaktivitet med tabs til alfabetet, korte og lange vokaler.
 */
export default function AlphabetTraceActivity({ onBack }: Props) {
  const isMobile = useIsMobile();
  const [tab, setTab] = useState<"alphabet" | "short" | "long">("short"); // Changed default to "short"
  const [selectedLetter, setSelectedLetter] = useState<string>(GROUPS.short.letters[0]); // Start with first short vowel
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Sørg for at valgt bogstav altid eksisterer i nuværende gruppe
  React.useEffect(() => {
    const arr = GROUPS[tab].letters;
    if (arr.length === 0) {
      // If current tab has no letters, switch to short vowels
      setTab("short");
      setSelectedLetter(GROUPS.short.letters[0]);
      setSelectedIdx(0);
    } else if (!arr.includes(selectedLetter)) {
      setSelectedLetter(arr[0]);
      setSelectedIdx(0);
    }
  }, [tab]);

  // Update selectedIdx and selectedLetter together
  const handleLetterSelect = (idx: number) => {
    setSelectedIdx(idx);
    setSelectedLetter(GROUPS[tab].letters[idx]);
  };

  return (
    <div className={`flex flex-col items-center ${isMobile ? 'mt-2 gap-3' : 'mt-5 gap-5'} w-full`}>
      {/* Ikon og titel */}
      <div className="flex flex-col items-center gap-2">
        <Pencil className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} text-purple-700`} />
        <div className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'} text-purple-700`}>
          Tegn bogstavet
        </div>
      </div>
      
      {/* Tabs til valg - hide alphabet tab if empty */}
      <Tabs value={tab} onValueChange={v => setTab(v as "alphabet" | "short" | "long")} className="w-full flex flex-col items-center">
        <TabsList className={`mb-2 md:mb-3 bg-violet-50 ${isMobile ? 'text-xs' : ''}`}>
          {GROUPS.alphabet.letters.length > 0 && (
            <TabsTrigger value="alphabet">{GROUPS.alphabet.label}</TabsTrigger>
          )}
          <TabsTrigger value="short">{GROUPS.short.label}</TabsTrigger>
          <TabsTrigger value="long">{GROUPS.long.label}</TabsTrigger>
        </TabsList>
        
        {/* Info-text */}
        <div className={`text-gray-600 text-center ${isMobile ? 'text-xs' : 'text-sm'} max-w-xs mb-2`}>
          Vælg et bogstav og øv dig i at spore det med musen eller fingeren. Skift mellem korte og lange vokaler med fanerne.
        </div>
        
        <TabsContent value={tab} className="w-full">
          {/* Use our new LetterSelector component */}
          {GROUPS[tab].letters.length > 0 && (
            <LetterSelector 
              letters={GROUPS[tab].letters}
              selectedIdx={selectedIdx}
              onLetterSelect={handleLetterSelect}
            />
          )}
          {GROUPS[tab].letters.length === 0 && (
            <div className="text-gray-500 text-center py-4">
              Ingen bogstaver tilgængelige i denne kategori
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Tegne-aktiviteten */}
      <AlphabetPrototype letter={selectedLetter} />
      
      <Button onClick={onBack} variant="outline" size={isMobile ? "sm" : "default"} className="mt-2">
        Tilbage
      </Button>
    </div>
  );
}
