
import React, { useState } from "react";
import { WORD_SENTENCES } from "@/constants/wordsData";
import { Button } from "@/components/ui/button";

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
    <div>
      <h3 className="font-semibold mb-2 text-center">Træk ordene så sætningen bliver rigtig</h3>
      <div className="bg-blue-50 rounded-md py-2 px-3 mb-3 text-center">{curr.danish}</div>
      <div className="flex flex-wrap gap-2 justify-center mb-3 min-h-12">
        {selected.map((word, idx) => (
          <button 
            key={idx} 
            onClick={() => handleUndo(idx)}
            className="bg-green-300 px-2 py-1 rounded-full text-base shadow hover:bg-green-400 transition"
          >
            {word}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {shuffled.map(word => (
          <button
            key={word}
            onClick={() => handleSelect(word)}
            className="bg-violet-200 shadow px-2 py-1 rounded-full text-base hover:bg-violet-300 active:bg-violet-400 animate-fade-in"
            style={{ minWidth: 60 }}
          >
            {word}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-2">
        <Button size="sm" onClick={onBack} variant="ghost">Tilbage</Button>
        <Button size="sm" onClick={reset} variant="secondary">Nulstil</Button>
        <Button size="sm" onClick={check} disabled={selected.length !== curr.words.length}>Tjek</Button>
      </div>
      {showCorrect && (
        <div className="mt-3 text-green-700 text-center font-semibold animate-bounce">Korrekt! 🎉</div>
      )}
    </div>
  );
}
