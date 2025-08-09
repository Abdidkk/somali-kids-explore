import React, { useState, useEffect, useRef } from "react";
import { WORDS } from "@/constants/wordsData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Volume2 } from "lucide-react";
import { recordQuizResultAuto } from "@/utils/quizRecorder";

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
  const [shuffledWords, setShuffledWords] = useState<any[]>([]);
  const savedRef = useRef(false);

  // Bland ordene når komponenten loader og vælg kun 12
  useEffect(() => {
    const randomWords = shuffleArray(WORDS).slice(0, QUIZ_LENGTH);
    setShuffledWords(randomWords);
  }, []);

  function playAudio() {
    const q = shuffledWords[step];
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
    const q = shuffledWords[step];
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
    const randomWords = shuffleArray(WORDS).slice(0, QUIZ_LENGTH);
    setShuffledWords(randomWords);
    savedRef.current = false;
  }

  // Loading state
  if (shuffledWords.length === 0) {
    return (
      <div className="flex flex-col items-center space-y-6 p-6">
        <div className="text-xl text-gray-600">Indlæser quiz...</div>
      </div>
    );
  }

  // Auto-record when quiz completes
  useEffect(() => {
    if (step >= QUIZ_LENGTH && !savedRef.current) {
      savedRef.current = true;
      recordQuizResultAuto({
        category: "Ord",
        activityName: "Ord Quiz",
        correct: score,
        total: QUIZ_LENGTH,
      });
    }
  }, [step]);

  // VIGTIG ÆNDRING: Brug QUIZ_LENGTH i stedet for shuffledWords.length
  if (step >= QUIZ_LENGTH) {
    return (
      <div className="flex flex-col items-center space-y-6 p-6">
        <h3 className="text-2xl font-bold text-purple-700">Quiz færdig!</h3>
        
        <div className="text-center">
          <div className="text-6xl mb-4">
            {score === QUIZ_LENGTH ? "🎉" : score >= QUIZ_LENGTH / 2 ? "😊" : "😔"}
          </div>
          
          <div className="text-3xl font-bold text-purple-700 mb-2">
            {score} / {QUIZ_LENGTH}
          </div>
          <p className="text-lg text-gray-600">
            {score === QUIZ_LENGTH 
              ? "Fantastisk! Du fik alle rigtige!" 
              : score >= QUIZ_LENGTH / 2 
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

  const q = shuffledWords[step];
  
  // Genererer simple multiple choice spørgsmål med bedre shuffling
  const wrongChoices = WORDS.filter(w => w !== q).map(w => w.danish);
  const randomWrongChoices = shuffleArray(wrongChoices).slice(0, 2);
  const allChoices = [q.danish, ...randomWrongChoices];
  const shuffled = shuffleArray(allChoices); // Korrekt shuffling

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <div className="w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-purple-700">Ord Quiz</h3>
          <div className="text-lg font-semibold text-gray-600">
            {step + 1} / {QUIZ_LENGTH}
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
          <div className="text-sm text-gray-600">Score: {score} / {QUIZ_LENGTH}</div>
        </div>
      </div>

      <Button onClick={onBack} variant="ghost">
        Tilbage til menu
      </Button>
    </div>
  );
}
