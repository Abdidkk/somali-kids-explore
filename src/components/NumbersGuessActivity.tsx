
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Volume2 } from "lucide-react";
import { getNumbersForTab } from "@/constants/numbersData";
import type { NumberData } from "@/constants/numbersData";

interface NumbersGuessActivityProps {
  onBack: () => void;
}

export default function NumbersGuessActivity({ onBack }: NumbersGuessActivityProps) {
  const [activeTab, setActiveTab] = useState<string>("1-19");
  const [score, setScore] = useState(0);
  const [currentNumber, setCurrentNumber] = useState<any>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [result, setResult] = useState<null | "correct" | "wrong">(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const numbers = getNumbersForTab(activeTab);

  const generateNewQuestion = () => {
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    setCurrentNumber(randomNumber);
    
    // Generate 3 wrong options + 1 correct
    const wrongOptions = numbers
      .filter(n => n.number !== randomNumber.number)
      .map(n => n.number)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    const allOptions = [...wrongOptions, randomNumber.number].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
    setSelectedAnswer(null);
    setResult(null);
  };

  useEffect(() => {
    generateNewQuestion();
  }, [activeTab]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    setScore(0);
  };

  const speakNumber = () => {
    if (!currentNumber) return;
const audio = currentNumber.audioPath ? new Audio(currentNumber.audioPath) : null;
if (audio) { audio.play();
} else { const utterance = new SpeechSynthesisUtterance(currentNumber.somali);
      utterance.lang = "so-SO";
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  const checkAnswer = () => {
    if (selectedAnswer === currentNumber.number) {
      setResult("correct");
      setScore(prev => prev + 1);
      setShowCelebration(true);
      
      setTimeout(() => {
        setShowCelebration(false);
        generateNewQuestion();
      }, 1800);
    } else {
      setResult("wrong");
      setTimeout(() => {
        setResult(null);
        setSelectedAnswer(null);
      }, 1500);
    }
  };

  if (!currentNumber) return null;

  return (
    <div className="flex flex-col items-center gap-6 mt-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600 mb-2">Score: {score}</div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-lg">
      <TabsList className="grid w-full grid-cols-3 bg-blue-100 rounded-xl p-1 h-auto">
  <TabsTrigger 
    value="1-19"
    className="rounded-lg py-2.5 px-2 text-sm font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
  >
    🔢 1-19
  </TabsTrigger>
  <TabsTrigger 
    value="20-90"
    className="rounded-lg py-2.5 px-2 text-sm font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
  >
    🔢 20-90
  </TabsTrigger>
  <TabsTrigger 
    value="100-1000"
    className="rounded-lg py-2.5 px-2 text-sm font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
  >
    💯 100-1000
  </TabsTrigger>
</TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-xl font-medium text-gray-700">
              {showCelebration ? "🎉 Rigtigt!" : "Hvilket tal hører du?"}
            </h3>
            
            <Button
              onClick={speakNumber}
              className="bg-blue-600 hover:bg-blue-700 rounded-full p-4"
              size="icon"
            >
              <Volume2 className="w-8 h-8" />
            </Button>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              {options.map((option) => (
                <Button
                  key={option}
                  onClick={() => setSelectedAnswer(option)}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className={`h-16 text-xl font-bold ${
                    result === "correct" && option === currentNumber.number
                      ? "bg-green-500 hover:bg-green-600"
                      : result === "wrong" && option === selectedAnswer
                      ? "bg-red-500 hover:bg-red-600"
                      : result === "wrong" && option === currentNumber.number
                      ? "bg-green-500 hover:bg-green-600"
                      : ""
                  }`}
                  disabled={result !== null}
                >
                  {option}
                </Button>
              ))}
            </div>
            
            <Button 
              onClick={checkAnswer} 
              disabled={!selectedAnswer || result === "correct"}
              className="px-8 mt-4"
            >
              Tjek svar
            </Button>
            
            {result === "wrong" && (
              <div className="text-center mt-4">
                <p className="text-red-600 font-semibold">Forkert! Prøv igen.</p>
                <p className="text-gray-600">Det rigtige svar var: {currentNumber.number}</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
