
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getNumbersForTab } from "@/constants/numbersData";

interface NumbersQuizActivityProps {
  onBack: () => void;
}

export default function NumbersQuizActivity({ onBack }: NumbersQuizActivityProps) {
  const [activeTab, setActiveTab] = useState<string>("1-19");
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [result, setResult] = useState<null | "correct" | "wrong">(null);
  const [quizType, setQuizType] = useState<"number-to-somali" | "somali-to-number">("number-to-somali");

  const numbers = getNumbersForTab(activeTab);

  const generateNewQuestion = () => {
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    const randomQuizType = Math.random() > 0.5 ? "number-to-somali" : "somali-to-number";
    
    setCurrentQuestion(randomNumber);
    setQuizType(randomQuizType);
    
    // Generate options based on quiz type
    if (randomQuizType === "number-to-somali") {
      const wrongOptions = numbers
        .filter(n => n.somali !== randomNumber.somali)
        .map(n => n.somali)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      const allOptions = [...wrongOptions, randomNumber.somali].sort(() => 0.5 - Math.random());
      setOptions(allOptions);
    } else {
      const wrongOptions = numbers
        .filter(n => n.number !== randomNumber.number)
        .map(n => n.number.toString())
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      const allOptions = [...wrongOptions, randomNumber.number.toString()].sort(() => 0.5 - Math.random());
      setOptions(allOptions);
    }
    
    setSelectedAnswer("");
    setResult(null);
  };

  useEffect(() => {
    generateNewQuestion();
  }, [activeTab]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    setScore(0);
    setQuestionCount(0);
  };

  const checkAnswer = () => {
    const correctAnswer = quizType === "number-to-somali" 
      ? currentQuestion.somali 
      : currentQuestion.number.toString();
    
    if (selectedAnswer === correctAnswer) {
      setResult("correct");
      setScore(prev => prev + 1);
      
      setTimeout(() => {
        setQuestionCount(prev => prev + 1);
        generateNewQuestion();
      }, 1800);
    } else {
      setResult("wrong");
      setTimeout(() => {
        setResult(null);
        setSelectedAnswer("");
      }, 1500);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="flex flex-col items-center gap-6 mt-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-purple-600 mb-2">Score: {score}</div>
        <div className="text-sm text-gray-500">Spørgsmål: {questionCount + 1}</div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-lg">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="1-19">1-19</TabsTrigger>
          <TabsTrigger value="20-90">20-90</TabsTrigger>
          <TabsTrigger value="100-1000">100-1000</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-700 mb-4">
                {quizType === "number-to-somali" 
                  ? "Hvad hedder dette tal på somalisk?" 
                  : "Hvilket tal er dette på dansk?"
                }
              </h3>
              
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <span className="text-4xl font-bold text-purple-700">
                  {quizType === "number-to-somali" 
                    ? currentQuestion.number 
                    : currentQuestion.somali
                  }
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-3 w-full max-w-sm">
              {options.map((option) => (
                <Button
                  key={option}
                  onClick={() => setSelectedAnswer(option)}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className={`h-12 text-lg ${
                    result === "correct" && option === (quizType === "number-to-somali" ? currentQuestion.somali : currentQuestion.number.toString())
                      ? "bg-green-500 hover:bg-green-600"
                      : result === "wrong" && option === selectedAnswer
                      ? "bg-red-500 hover:bg-red-600"
                      : result === "wrong" && option === (quizType === "number-to-somali" ? currentQuestion.somali : currentQuestion.number.toString())
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
            
            {result === "correct" && (
              <div className="text-center mt-4">
                <p className="text-green-600 font-semibold text-xl">🎉 Rigtigt!</p>
              </div>
            )}
            
            {result === "wrong" && (
              <div className="text-center mt-4">
                <p className="text-red-600 font-semibold">Forkert! Prøv igen.</p>
                <p className="text-gray-600">
                  Det rigtige svar var: {quizType === "number-to-somali" ? currentQuestion.somali : currentQuestion.number}
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
