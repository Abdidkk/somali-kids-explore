
import React, { useState } from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getAnimalsByCategory, AnimalItem } from "@/constants/animalsData";

interface AnimalsListenActivityProps {
  onBack: () => void;
}

export default function AnimalsListenActivity({ onBack }: AnimalsListenActivityProps) {
  const [activeTab, setActiveTab] = useState<"husdyr" | "savannedyr" | "fugle_og_smådyr">("husdyr");
  
  const animals = getAnimalsByCategory(activeTab);

  const speakAnimal = (audioPath?: string, fallbackText?: string) => {
    if (audioPath) {
      const audio = new Audio(audioPath);
      audio.play().catch((error) => {
        console.error("Fejl ved afspilning", error);
  
        // Hvis mp3 fejler, brug fallback text-to-speech
        if (fallbackText) {
          const utterance = new SpeechSynthesisUtterance(fallbackText);
          utterance.lang = "so-SO";
          utterance.rate = 0.7;
          speechSynthesis.speak(utterance);
        }
      });
    } else if (fallbackText) {
      const utterance = new SpeechSynthesisUtterance(fallbackText);
      utterance.lang = "so-SO";
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  }; 

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab as "husdyr" | "savannedyr" | "fugle_og_smådyr");
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <h3 className="text-2xl font-bold text-green-700 mb-4">Lyt og lær dyr</h3>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-2xl">
      <TabsList className="grid w-full grid-cols-3 bg-green-100 rounded-xl p-1 h-auto">
  <TabsTrigger 
    value="husdyr"
    className="rounded-lg py-2.5 px-2 text-sm font-semibold data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
  >
    🐄 Husdyr
  </TabsTrigger>
  <TabsTrigger 
    value="savannedyr"
    className="rounded-lg py-2.5 px-2 text-sm font-semibold data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
  >
    🦁 Savannedyr
  </TabsTrigger>
  <TabsTrigger 
    value="fugle_og_smådyr"
    className="rounded-lg py-2.5 px-2 text-sm font-semibold data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
  >
    🐦 Smådyr
  </TabsTrigger>
</TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {animals.map((animal) => (
              <div
                key={animal.id}
                className="relative bg-white rounded-xl border-2 border-green-200 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => speakAnimal(animal.audio, animal.somali)}
              >
                <div className="p-4 text-center">
                  <div className="w-21 h-20 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src={animal.image} 
                      alt={animal.danish}
                      className="w-18 h-16 object-fit "
                    />
                  </div>
                  <h4 className="text-lg font-bold text-green-700 mb-1">{animal.somali}</h4>
                  <p className="text-sm text-gray-600">({animal.danish})</p>
                </div>
                
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-green-600 text-white p-2 rounded-full">
                    <Volume2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Button onClick={onBack} className="mt-6 bg-green-600 hover:bg-green-700">
        Tilbage til menu
      </Button>
    </div>
  );
}
