
import React, { useState } from "react";
import { WORDS } from "@/constants/wordsData";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";

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
    <div>
      <h3 className="font-semibold mb-2 text-center">Lyt og lær somaliske ord</h3>
      <div className="flex flex-col items-center mb-3">
        <div className="bg-indigo-50 p-5 rounded-lg text-xl font-bold mb-2">{word.somali}</div>
        <div className="text-gray-600 mb-2">{word.danish}</div>
        <Button onClick={play}><Volume2 className="mr-1" />Lyt</Button>
      </div>
      <div className="flex justify-center gap-2 my-2">
        <Button size="sm" onClick={onBack} variant="ghost">Tilbage</Button>
        <Button 
          size="sm"
          onClick={() => setIdx(i => Math.max(0, i - 1))} 
          disabled={idx === 0}
        >Forrige</Button>
        <Button 
          size="sm"
          onClick={() => setIdx(i => Math.min(WORDS.length - 1, i + 1))}
          disabled={idx === WORDS.length - 1}
        >Næste</Button>
      </div>
    </div>
  );
}
