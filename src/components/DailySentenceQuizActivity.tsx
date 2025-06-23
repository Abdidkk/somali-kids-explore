import React, { useState } from "react";
import { DAILY_SENTENCES, DailySentence } from "@/constants/dailyData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, RotateCcw } from "lucide-react";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default function DailySentenceQuizActivity({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [result, setResult] = useState<null | boolean>(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const currentSentence = DAILY_SENTENCES[step % DAILY_SENTENCES.length];

  React.useEffect(() => {
    // Shuffle ord når nyt spørgsmål starter
    const shuffled = [...currentSentence.words].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
    setUserOrder([]);
    setResult(null);
    setShowHint(false);
  }, [step]);

  const addWordToSentence = (word: string) => {
    if (result !== null) return;
    
    setUserOrder([...userOrder, word]);
    setAvailableWords(availableWords.filter(w => w !== word));
  };

  const removeWordFromSentence = (index: number) => {
    if (result !== null) return;
    
    const wordToRemove = userOrder[index];
    setUserOrder(userOrder.filter((_, i) => i !== index));
    setAvailableWords([...availableWords, wordToRemove]);
  };

  const checkAnswer = () => {
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(currentSentence.correctOrder);
    setResult(isCorrect);
    if (isCorrect) setScore(score + 1);
    
    setTimeout(() => {
      setStep(s => s + 1);
    }, 2000);
  };

  const resetCurrentQuestion = () => {
    setUserOrder([]);
    setAvailableWords([...currentSentence.words].sort(() => Math.random() - 0.5));
    setResult(null);
    setShowHint(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "let": return "bg-green-100 text-green-700";
      case "mellem": return "bg-yellow-100 text-yellow-700";
      case "svær": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  if (step >= DAILY_SENTENCES.length) {
    return (
      <div className="flex flex-col items-center space-y-6 p-6">
        <h3 className="text-2xl font-bold text-blue-700">Quiz færdig!</h3>
        
        <div className="text-center">
          <div className="text-6xl mb-4">
            {score === DAILY_SENTENCES.length ? "🎉" : score >= DAILY_SENTENCES.length / 2 ? "😊" : "😔"}
          </div>
          
          <div className="text-3xl font-bold text-blue-700 mb-2">
            {score} / {DAILY_SENTENCES.length}
          </div>
          <p className="text-lg text-gray-600">
            {score === DAILY_SENTENCES.length 
              ? "Fantastisk! Du sammensatte alle sætninger korrekt!" 
              : score >= DAILY_SENTENCES.length / 2 
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
            className="bg-blue-600 hover:bg-blue-700"
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
          <h3 className="text-2xl font-bold text-blue-700">Sammensæt sætning</h3>
          <div className="text-lg font-semibold text-gray-600">
            {step + 1} / {DAILY_SENTENCES.length}
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <Badge className={getDifficultyColor(currentSentence.difficulty)}>
                {currentSentence.difficulty}
              </Badge>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-1"
                >
                  <HelpCircle className="w-4 h-4" />
                  Hjælp
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetCurrentQuestion}
                  className="flex items-center gap-1"
                >
                  <RotateCcw className="w-4 h-4" />
                  Nulstil
                </Button>
              </div>
            </div>
            
            <div className="bg-blue-100 text-lg font-medium p-4 rounded-lg mb-4 text-blue-800 text-center">
              {currentSentence.danish}
            </div>

            {showHint && (
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mb-4">
                <p className="text-sm text-yellow-800">
                  <strong>Hjælp:</strong> Korrekt rækkefølge: {currentSentence.correctOrder.join(" → ")}
                </p>
              </div>
            )}
            
            {/* Brugerens sætning */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Din sætning:</p>
              <div className="min-h-[60px] bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-3 flex flex-wrap gap-2">
                {userOrder.map((word, index) => (
                  <Button
                    key={index}
                    variant="secondary"
                    size="sm"
                    onClick={() => removeWordFromSentence(index)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800"
                  >
                    {word}
                  </Button>
                ))}
                {userOrder.length === 0 && (
                  <p className="text-gray-500 italic">Træk ord herhen...</p>
                )}
              </div>
            </div>

            {/* Tilgængelige ord */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Tilgængelige ord:</p>
              <div className="flex flex-wrap gap-2">
                {availableWords.map((word, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => addWordToSentence(word)}
                    className="hover:bg-blue-50"
                  >
                    {word}
                  </Button>
                ))}
              </div>
            </div>

            {/* Check knap */}
            <div className="text-center">
              <Button 
                onClick={checkAnswer}
                disabled={userOrder.length !== currentSentence.correctOrder.length || result !== null}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Tjek svar
              </Button>
            </div>
          </CardContent>
        </Card>

        {result !== null && (
          <div className={`text-center text-xl font-bold mt-4 ${
            result ? "text-green-600" : "text-red-600"
          }`}>
            {result ? "Korrekt! 🎉" : "Forkert - prøv igen næste gang!"}
            {!result && (
              <div className="text-sm font-normal text-gray-600 mt-2">
                Korrekt: {currentSentence.correctOrder.join(" ")}
              </div>
            )}
          </div>
        )}

        <div className="text-center mt-4">
          <div className="text-sm text-gray-600">Score: {score} / {DAILY_SENTENCES.length}</div>
        </div>
      </div>

      <Button onClick={onBack} variant="ghost">
        Tilbage til menu
      </Button>
    </div>
  );
}
