
import React, { useState } from "react";
import { WORDS } from "@/constants/wordsData";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function WordsListenActivity({ onBack }: { onBack: () => void }) {
  const [idx, setIdx] = useState(0);
  const word = WORDS[idx];

  function play() {
    if (word.audio) {
      const audio = new Audio(word.audio);
      audio.play();
    } else {
      const utter = new window.SpeechSynthesisUtterance(word.somali);
      utter.lang = "so-SO";
      utter.rate = 0.7;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <h3 className="text-2xl font-bold text-orange-700 mb-4">Lyt og lær somaliske ord</h3>
      
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center">
          {word.image && (
            <div className="mb-4">
              <img
                src={word.image}
                alt={word.danish}
                className="w-32 h-32 mx-auto rounded-lg object-cover shadow-md"
              />
            </div>
          )}
          
          <div className="space-y-3">
            <div className="bg-orange-100 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-800 mb-1">{word.somali}</div>
              <div className="text-lg text-gray-600">{word.danish}</div>
            </div>
            
            <Button onClick={play} className="bg-orange-600 hover:bg-orange-700">
              <Volume2 className="w-5 h-5 mr-2" />
              Lyt
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-4">
        <Button 
          onClick={() => setIdx(i => Math.max(0, i - 1))} 
          disabled={idx === 0}
          variant="outline"
        >
          ← Forrige
        </Button>
        
        <div className="px-4 py-2 bg-orange-50 rounded-lg font-medium">
          {idx + 1} / {WORDS.length}
        </div>
        
        <Button 
          onClick={() => setIdx(i => Math.min(WORDS.length - 1, i + 1))}
          disabled={idx === WORDS.length - 1}
          variant="outline"
        >
          Næste →
        </Button>
      </div>

      <Button onClick={onBack} variant="ghost" className="mt-4">
        Tilbage til menu
      </Button>
    </div>
  );
}
