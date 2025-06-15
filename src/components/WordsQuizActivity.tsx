
import React, { useState } from "react";
import { WORDS } from "@/constants/wordsData";
import { Button } from "@/components/ui/button";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default function WordsQuizActivity({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<null | boolean>(null);

  const q = WORDS[step % WORDS.length];
  // Genererer simple multiple choice spørgsmål: 'Hvad betyder X?'
  const choices = [q.danish, ...WORDS.filter(w => w !== q).map(w => w.danish)];
  const shuffled = choices.sort(() => Math.random() - 0.5).slice(0, 3);

  function check(ans: string) {
    setResult(ans === q.danish);
    setTimeout(() => {
      setResult(null);
      setStep(s => s + 1);
    }, 1200);
  }

  if (step >= WORDS.length) return (
    <div>
      <div className="font-semibold text-green-600 text-center mb-3">Du har gennemført quizzen! 🎉</div>
      <Button onClick={() => setStep(0)}>Prøv igen</Button>
      <Button onClick={onBack} variant="ghost" className="ml-3">Tilbage</Button>
    </div>
  );

  return (
    <div>
      <h3 className="font-semibold mb-2 text-center">Quiz: Hvad betyder dette somaliske ord?</h3>
      <div className="bg-violet-100 text-xl font-bold p-3 rounded-lg text-center mb-3">{q.somali}</div>
      <div className="flex flex-wrap justify-center gap-2">
        {shuffled.map(ans => (
          <Button 
            key={ans}
            variant="secondary"
            onClick={() => check(ans)}
            className="min-w-[100px]"
            disabled={result !== null}
          >{ans}</Button>
        ))}
      </div>
      {result !== null && (
        <div className={result ? "text-green-600 font-semibold text-center mt-3" : "text-red-600 font-semibold text-center mt-3"}>
          {result ? "Korrekt! 🎉" : "Forkert"}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <Button onClick={onBack} variant="ghost">Tilbage</Button>
      </div>
    </div>
  );
}
