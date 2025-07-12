import React, { useState } from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getWordsByCategory } from "@/constants/wordsData";

interface WordsListenActivityProps {
  onBack: () => void;
}

export default function WordsListenActivity({ onBack }: WordsListenActivityProps) {
  const [activeTab, setActiveTab] = useState<"hjem" | "stuen" | "køkken">("hjem");
  
  const words = getWordsByCategory(activeTab); 

  const speakWord = (audioPath?: string, fallbackText?: string) => {
    if (audioPath) {
      const audio = new Audio(audioPath);
      audio.play().catch((err) => console.error("Lydfejl:", err));
    } else if (fallbackText) {
      const utterance = new SpeechSynthesisUtterance(fallbackText);
      utterance.lang = "so-SO";
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  }; 

  const handleTabChange = (newTab: "hjem" | "stuen" | "køkken") => {
    setActiveTab(newTab);
  }; 

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <h3 className="text-2xl font-bold text-orange-700 mb-4">Lyt og lær ord</h3>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-2xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hjem">Hjem</TabsTrigger>
          <TabsTrigger value="stuen">Stuen</TabsTrigger>
          <TabsTrigger value="køkken">Køkken</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {words.map((word) => (
              <div
              key={`${word.category}-${word.danish}`}
                className="relative bg-white rounded-xl border-2 border-pink-200 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="p-4 text-center">
                  <div className="w-21 h-20 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src={word.image}
                      alt={word.somali}
                      className="w-18 h-16 object-fit "
                    />
                  </div>
                  <h4 className="text-lg font-bold text-gray-700 mb-1">{word.somali}</h4>
                  <p className="text-sm text-gray-600">{word.danish}</p>
                </div>

                {/* 🎧 Lyd-knap */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button onClick={() => speakWord(word.audio, word.somali)} size="icon">
                    <Volume2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))} 
          </div>
        </TabsContent>
      </Tabs>

      <Button onClick={onBack} className="mt-6 bg-gray-600 hover:bg-orange-700">
        Tilbage til menu
      </Button>
    </div>
  );
}