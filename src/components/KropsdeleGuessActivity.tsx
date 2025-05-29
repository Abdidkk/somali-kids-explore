
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { speakUsingSynthesis } from "@/utils/speechUtils";
import { getAllBodyParts, BodyPartItem } from "@/constants/bodyPartsData";

interface KropsdeleGuessActivityProps {
  onBack: () => void;
}

const KropsdeleGuessActivity: React.FC<KropsdeleGuessActivityProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<BodyPartItem | null>(null);
  const [options, setOptions] = useState<BodyPartItem[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const allItems = getAllBodyParts();

  const generateQuestion = () => {
    const correctAnswer = allItems[Math.floor(Math.random() * allItems.length)];
    const wrongAnswers = allItems
      .filter(item => item.id !== correctAnswer.id && item.category === correctAnswer.category)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
    
    const questionOptions = [correctAnswer, ...wrongAnswers].sort(() => 0.5 - Math.random());
    
    setCurrentQuestion(correctAnswer);
    setOptions(questionOptions);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (selectedId: string) => {
    if (showResult) return;
    
    setSelectedAnswer(selectedId);
    setShowResult(true);
    setTotalQuestions(prev => prev + 1);
    
    const correct = selectedId === currentQuestion?.id;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    generateQuestion();
  };

  const playCurrentWord = () => {
    if (currentQuestion) {
      speakUsingSynthesis(currentQuestion.somali);
    }
  };

  const resetGame = () => {
    setScore(0);
    setTotalQuestions(0);
    generateQuestion();
  };

  const getItemImage = (item: BodyPartItem) => {
    return "/lovable-uploads/5f3c2e5c-8a56-4baf-8c3f-4d8ecbe1f924.png";
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (currentQuestion) {
      // Auto-play the word when question loads
      const timer = setTimeout(() => {
        playCurrentWord();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentQuestion]);

  return (
    <div className="max-w-2xl mx-auto p-4 text-center">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-emerald-700 mb-2">Hør og vælg</h3>
        <p className="text-gray-600 mb-4">Score: {score} / {totalQuestions}</p>
        
        <div className="flex justify-center gap-4 mb-4">
          <Button onClick={playCurrentWord} className="bg-emerald-600 hover:bg-emerald-700">
            🔊 Hør ordet igen
          </Button>
          <Button onClick={resetGame} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-1" />
            Start forfra
          </Button>
        </div>
      </div>

      {currentQuestion && (
        <div>
          <p className="text-lg mb-6 text-gray-700">
            Klik på det billede, der matcher det ord, du hører
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                disabled={showResult}
                className={`
                  p-4 rounded-lg border-2 transition-all hover:scale-105
                  ${showResult && selectedAnswer === option.id
                    ? isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : showResult && option.id === currentQuestion.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                  }
                  ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={getItemImage(option)}
                    alt={option.danish}
                    className="w-20 h-20 object-contain"
                  />
                  <span className="font-medium text-gray-800">{option.danish}</span>
                  {showResult && option.id === currentQuestion.id && (
                    <CheckCircle className="w-6 h-6 text-green-600 mx-auto" />
                  )}
                  {showResult && selectedAnswer === option.id && option.id !== currentQuestion.id && (
                    <XCircle className="w-6 h-6 text-red-600 mx-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mb-4">
              <p className={`text-lg font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? 'Rigtigt! 🎉' : 'Forkert 😔'}
              </p>
              <p className="text-gray-600 mt-2">
                Det rigtige svar var: <strong>{currentQuestion.danish}</strong> ({currentQuestion.somali})
              </p>
              <Button onClick={nextQuestion} className="mt-4 bg-emerald-600 hover:bg-emerald-700">
                Næste spørgsmål
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KropsdeleGuessActivity;
