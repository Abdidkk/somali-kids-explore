
import React, { useState } from "react";
import { WORD_SENTENCES } from "@/constants/wordsData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Bruger drag-and-drop (touch og mus) for at arrangere ordene korrekt

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function WordsUnjumbleActivity({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [shuffled, setShuffled] = useState(() => shuffle(WORD_SENTENCES[0].words));
  const [showCorrect, setShowCorrect] = useState(false);

  const curr = WORD_SENTENCES[step];

  function reset() {
    setSelected([]);
    setShuffled(shuffle(curr.words));
    setShowCorrect(false);
  }

  function handleSelect(word: string) {
    setSelected(prev => [...prev, word]);
    setShuffled(prev => prev.filter(w => w !== word));
  }

  function handleUndo(idx: number) {
    const newSel = [...selected];
    const [w] = newSel.splice(idx, 1);
    setSelected(newSel);
    setShuffled(prev => [...prev, w]);
  }

  function check() {
    if (selected.join(" ") === curr.words.join(" ")) {
      setShowCorrect(true);
      if (curr.audio) {
        const audio = new Audio(curr.audio);
        audio.play();
      }
      setTimeout(() => {
        if (step < WORD_SENTENCES.length - 1) {
          setStep(s => s + 1);
          setSelected([]);
          setShuffled(shuffle(WORD_SENTENCES[step + 1].words));
          setShowCorrect(false);
        }
      }, 1000);
    } else {
      setShowCorrect(false);
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <h3 className="text-2xl font-bold text-green-700 mb-4">Sammensæt sætning</h3>
      
      <Card className="w-full max-w-lg">
        <CardContent className="p-6">
          {curr.image && (
            <div className="mb-4 text-center">
              <img
                src={curr.image}
                alt={curr.danish}
                className="w-24 h-24 mx-auto rounded-lg object-cover shadow-md"
              />
            </div>
          )}
          
          <div className="bg-blue-50 rounded-lg p-4 mb-4 text-center">
            <p className="text-lg font-medium text-blue-800">{curr.danish}</p>
          </div>
          
          <p className="text-center text-gray-600 mb-4">Træk ordene i den rigtige rækkefølge:</p>
          
          {/* Selected words */}
          <div className="flex flex-wrap gap-2 justify-center mb-4 min-h-12 p-2 bg-gray-50 rounded-lg">
            {selected.map((word, idx) => (
              <button 
                key={idx} 
                onClick={() => handleUndo(idx)}
                className="bg-green-300 hover:bg-green-400 px-3 py-2 rounded-full text-sm font-medium shadow transition-colors"
              >
                {word}
              </button>
            ))}
          </div>
          
          {/* Available words */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {shuffled.map(word => (
              <button
                key={word}
                onClick={() => handleSelect(word)}
                className="bg-purple-200 hover:bg-purple-300 active:bg-purple-400 px-3 py-2 rounded-full text-sm font-medium shadow transition-colors"
              >
                {word}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button onClick={reset} variant="secondary">
          Nulstil
        </Button>
        <Button 
          onClick={check} 
          disabled={selected.length !== curr.words.length}
          className="bg-green-600 hover:bg-green-700"
        >
          Tjek svar
        </Button>
      </div>
      
      {showCorrect && (
        <div className="text-green-600 text-xl font-bold animate-bounce">
          Korrekt! 🎉
        </div>
      )}

      <Button onClick={onBack} variant="ghost">
        Tilbage til menu
      </Button>
    </div>
  );
}
