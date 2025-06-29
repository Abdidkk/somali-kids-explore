
import React, { useState, useEffect } from "react";
import { WORDS } from "@/constants/wordsData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Volume2 } from "lucide-react";

const QUIZ_LENGTH = 12;

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function WordsQuizActivity({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<null | boolean>(null);
  const [score, setScore] = useState(0);
  const [shuffledWords, setShuffledWords] = useState(WORDS);

  // Bland ordene når komponenten loader
  useEffect(() => {
    setShuffledWords(shuffleArray(WORDS));
  }, []);

  const q = shuffledWords[step % shuffledWords.length];
  
  // Genererer simple multiple choice spørgsmål: 'Hvad betyder X?'
  const choices = [q.danish, ...WORDS.filter(w => w !== q).map(w => w.danish)];
  const shuffled = choices.sort(() => Math.random() - 0.).slice(0, 4);

  const wrongChoices = shuffleArray(WORDS.filter(w => w !== q)).slice(0, 4);
  // Lav en liste af de 4 mulige svar (1 rigtig + 3 forkerte)
const answerChoices = shuffleArray([q, ...wrongChoices]); 

  function playAudio() {
    if (q.audio) {
      const audio = new Audio(q.audio);
      audio.play().catch(error => {
        console.error("Failed to play audio:", error);
        // Fallback til speech synthesis
        const utterance = new SpeechSynthesisUtterance(q.somali);
        utterance.lang = "so-SO";
        speechSynthesis.speak(utterance);
      });
    } else {
      // Fallback til speech synthesis
      const utterance = new SpeechSynthesisUtterance(q.somali);
      utterance.lang = "so-SO";
      speechSynthesis.speak(utterance);
    }
  }

  function check(ans: string) {
    const isCorrect = ans === q.danish;
    setResult(isCorrect);
    if (isCorrect) setScore(score + 1);
    
    setTimeout(() => {
      setResult(null);
      setStep(s => s + 1);
    }, 1200);
  }

  function resetQuiz() {
    setStep(0);
    setScore(0);
    setResult(null);
    setShuffledWords(shuffleArray(WORDS)); // Bland ordene igen
  }

  if (step >= shuffledWords.length) {
    return (
      <div className="flex flex-col items-center space-y-6 p-6">
        <h3 className="text-2xl font-bold text-purple-700">Quiz færdig!</h3>
        
        <div className="text-center">
          <div className="text-6xl mb-4">
            {score === shuffledWords.length ? "🎉" : score >= shuffledWords.length / 2 ? "😊" : "😔"}
          </div>
          
          <div className="text-3xl font-bold text-purple-700 mb-2">
            {score} / {shuffledWords.length}
          </div>
          <p className="text-lg text-gray-600">
            {score === shuffledWords.length 
              ? "Fantastisk! Du fik alle rigtige!" 
              : score >= shuffledWords.length / 2 
              ? "Godt klaret!"
              : "Øv dig lidt mere og prøv igen!"
            }
          </p>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={resetQuiz}
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
            {step + 1} / {shuffledWords.length}
          </div>
        </div>

        <Card>
          <CardContent className="p-6 text-center">
            {q.image && (
              <div className="w-24 h-24 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={q.image}
                  alt="Quiz billede"
                  className="w-20 h-20 object-contain"
                />
              </div>
            )}
            
            <div className="bg-purple-100 p-4 rounded-lg mb-6 text-purple-800">
              <div className="flex items-center justify-center gap-3">
                <div className="text-2xl font-bold">
                  {q.somali}
                </div>
                <Button
                  onClick={playAudio}
                  variant="ghost"
                  size="sm"
                  className="p-2 h-auto hover:bg-purple-200 rounded-full"
                  title="Hør ordet"
                >
                  <Volume2 className="h-6 w-6 text-purple-700" />
                </Button>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 mb-4">Hvad betyder dette somaliske ord?</p>
            
            <div className="space-y-3">
              {shuffled.map((ans, index) => (
                <Button 
                  key={`${ans}-${index}`}
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
          <div className="text-sm text-gray-600">Score: {score} / {shuffledWords.length}</div>
        </div>
      </div>

      <Button onClick={onBack} variant="ghost">
        Tilbage til menu
      </Button>
    </div>
  );
}
