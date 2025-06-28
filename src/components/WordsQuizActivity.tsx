
import React, { useState } from "react";
import { WORDS } from "@/constants/wordsData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default function WordsQuizActivity({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<null | boolean>(null);
  const [score, setScore] = useState(0);

  const q = WORDS[step % WORDS.length];
  // Genererer simple multiple choice spørgsmål: 'Hvad betyder X?'
  const choices = [q.danish, ...WORDS.filter(w => w !== q).map(w => w.danish)];
  const shuffled = choices.sort(() => Math.random() - 0.5).slice(0, 3);

  function check(ans: string) {
    const isCorrect = ans === q.danish;
    setResult(isCorrect);
    if (isCorrect) setScore(score + 1);
    
    setTimeout(() => {
      setResult(null);
      setStep(s => s + 1);
    }, 1200);
  }

  if (step >= WORDS.length) {
    return (
      <div className="flex flex-col items-center space-y-6 p-6">
        <h3 className="text-2xl font-bold text-purple-700">Quiz færdig!</h3>
        
        <div className="text-center">
          <div className="text-6xl mb-4">
            {score === WORDS.length ? "🎉" : score >= WORDS.length / 2 ? "😊" : "😔"}
          </div>
          
          <div className="text-3xl font-bold text-purple-700 mb-2">
            {score} / {WORDS.length}
          </div>
          <p className="text-lg text-gray-600">
            {score === WORDS.length 
              ? "Fantastisk! Du fik alle rigtige!" 
              : score >= WORDS.length / 2 
              ? "Godt klaret!"
              : "Øv dig lidt mere og prøv igen!"
            }
          </p>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={() => {
              setStep(0);
              setScore(0);
              setResult(null);
            }} 
            className="bg-purple-600 hover:bg-purple-700"
          >
            Prøv igen
          </Button>
          <Button onClick={onBack} variant="outline">
            Tilbage til menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <div className="w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-purple-700">Ord Quiz</h3>
          <div className="text-lg font-semibold text-gray-600">
            {step + 1} / {WORDS.length}
          </div>
        </div>

        <Card>
          <CardContent className="p-6 text-center">
            {q.image && (
              <div className="w-21 h-20 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={q.image}
                  alt="Quiz billede"
                  className="w-18 h-16 object-fit "
                />
              </div>
            )}
            
            <div className="bg-purple-100 text-2xl font-bold p-4 rounded-lg mb-6 text-purple-800">
              {q.somali}
            </div>
            
            <p className="text-lg text-gray-700 mb-4">Hvad betyder dette somaliske ord?</p>
            
            <div className="space-y-3">
              {shuffled.map(ans => (
                <Button 
                  key={ans}
                  variant="outline"
                  onClick={() => check(ans)}
                  disabled={result !== null}
                  className={`w-full text-lg py-3 ${
                    result !== null && ans === q.danish 
                      ? 'bg-green-100 border-green-500 text-green-700' 
                      : result !== null && result === false && ans !== q.danish
                      ? 'bg-red-100 border-red-500 text-red-700'
                      : ''
                  }`}
                >
                  {ans}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {result !== null && (
          <div className={`text-center text-xl font-bold ${
            result ? "text-green-600" : "text-red-600"
          }`}>
            {result ? "Korrekt! 🎉" : "Forkert"}
          </div>
        )}

        <div className="text-center">
          <div className="text-sm text-gray-600">Score: {score} / {WORDS.length}</div>
        </div>
      </div>

      <Button onClick={onBack} variant="ghost">
        Tilbage til menu
      </Button>
    </div>
  );
}
