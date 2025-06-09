
import React, { useState, useEffect } from "react";
import { Volume2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllFood, FoodItem } from "@/constants/foodData";

interface FoodQuizActivityProps {
  onBack: () => void;
}

export default function FoodQuizActivity({ onBack }: FoodQuizActivityProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState<Array<{
    correct: FoodItem;
    options: FoodItem[];
  }>>([]);

  const totalQuestions = 5;

  // Generate quiz questions
  useEffect(() => {
    const current = questions[currentQuestion];
    if (current?.correct) {
      speakFood(current.correct.audio, current.correct.somali);
    }
  }, [currentQuestion, questions]); 

  const speakFood = (audioPath?: string, fallbackText?: string) => {
    if (audioPath) {
      const audio = new Audio(audioPath);
      audio.play().catch((error) => {
        console.error("Fejl ved afspilning:", error);
      });
    } else if (fallbackText) {
      const utterance = new SpeechSynthesisUtterance(fallbackText);
      utterance.lang = "so-SO";
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  }; 

  const handleAnswer = (selectedFood: FoodItem) => {
    if (selectedAnswer) return;

    setSelectedAnswer(selectedFood.id);
    
    if (selectedFood.id === questions[currentQuestion].correct.id) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    // Regenerate questions
    const allFoods = getAllFood();
    const generatedQuestions = [];

    for (let i = 0; i < totalQuestions; i++) {
      const correct = allFoods[Math.floor(Math.random() * allFoods.length)];
      const wrongOptions = allFoods
        .filter(food => food.id !== correct.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
      
      const options = [correct, ...wrongOptions].sort(() => Math.random() - 0.5);
      
      generatedQuestions.push({ correct, options });
    }

    setQuestions(generatedQuestions);
  };

  if (questions.length === 0) {
    return <div className="flex justify-center items-center h-64">Indlæser quiz...</div>;
  }

  if (showResult) {
    return (
      <div className="flex flex-col items-center space-y-6 p-6">
        <h3 className="text-2xl font-bold text-purple-700">Quiz færdig!</h3>
        
        <div className="text-center">
          <div className="text-6xl mb-4">
            {score === totalQuestions ? "🎉" : score >= totalQuestions / 2 ? "😊" : "😔"}
          </div>
          <h4 className="text-3xl font-bold text-purple-700 mb-2">
            {score} / {totalQuestions}
          </h4>
          <p className="text-lg text-gray-600">
            {score === totalQuestions 
              ? "Fantastisk! Du fik alle rigtige!" 
              : score >= totalQuestions / 2 
              ? "Godt klaret!"
              : "Øv dig lidt mere og prøv igen!"
            }
          </p>
        </div>

        <div className="flex gap-4">
          <Button onClick={resetQuiz} className="bg-purple-600 hover:bg-purple-700">
            Prøv igen
          </Button>
          <Button onClick={onBack} variant="outline">
            Tilbage til menu
          </Button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <div className="w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-purple-700">Mad Quiz</h3>
          <div className="text-lg font-semibold text-gray-600">
            {currentQuestion + 1} / {totalQuestions}
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-lg text-gray-700 mb-4">Hør ordet og klik på det rigtige billede:</p>
          
          <Button
            onClick={() => speakFood(currentQ.correct.somali)}
            className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-4"
          >
            <Volume2 className="w-6 h-6 mr-2" />
            Afspil igen
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {currentQ.options.map((food) => {
            const isSelected = selectedAnswer === food.id;
            const isCorrect = food.id === currentQ.correct.id;
            const showFeedback = selectedAnswer !== null;

            return (
              <button
                key={food.id}
                onClick={() => handleAnswer(food)}
                disabled={selectedAnswer !== null}
                className={`
                  relative p-4 rounded-xl border-2 transition-all
                  ${!showFeedback 
                    ? 'border-purple-200 hover:border-purple-400 hover:bg-purple-50' 
                    : isCorrect 
                    ? 'border-green-500 bg-green-50' 
                    : isSelected 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 bg-gray-50'
                  }
                  ${selectedAnswer ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <div className="w-16 h-16 mx-auto mb-2 bg-purple-50 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🍎</span>
                </div>
                <p className="text-sm font-medium text-gray-700">{food.danish}</p>
                
                {showFeedback && isCorrect && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                )}
                
                {showFeedback && isSelected && !isCorrect && (
                  <div className="absolute top-2 right-2">
                    <XCircle className="w-6 h-6 text-red-500" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <div className="text-sm text-gray-600">Score: {score} / {totalQuestions}</div>
        </div>
      </div>
    </div>
  );
}
