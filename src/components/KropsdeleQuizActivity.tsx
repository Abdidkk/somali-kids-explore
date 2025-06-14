
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";
import { speakUsingSynthesis } from "@/utils/speechUtils";
import { getAllBodyParts, BodyPartItem } from "@/constants/bodyPartsData";

interface KropsdeleQuizActivityProps {
  onBack: () => void;
}

const KropsdeleQuizActivity: React.FC<KropsdeleQuizActivityProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<BodyPartItem[]>([]);
  const [options, setOptions] = useState<BodyPartItem[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const totalQuestions = 10;
  const allItems = getAllBodyParts();

  const generateQuiz = () => {
    const shuffledItems = [...allItems].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledItems.slice(0, totalQuestions);
    setQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    generateOptionsForQuestion(selectedQuestions[0]);
  };

  const generateOptionsForQuestion = (correctAnswer: BodyPartItem) => {
    const wrongAnswers = allItems
      .filter(item => item.id !== correctAnswer.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
    
    const questionOptions = [correctAnswer, ...wrongAnswers].sort(() => 0.5 - Math.random());
    setOptions(questionOptions);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (selectedId: string) => {
    if (showResult) return;
    
    setSelectedAnswer(selectedId);
    setShowResult(true);
    
    const currentQuestion = questions[currentQuestionIndex];
    const correct = selectedId === currentQuestion?.id;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      generateOptionsForQuestion(questions[nextIndex]);
    } else {
      setQuizCompleted(true);
    }
  };

  const playCurrentWord = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;
  
    if (currentQuestion.audio) {
      const audio = new Audio(currentQuestion.audio);
      audio.play().catch(() => {
        // fallback hvis lyd fejler
        speakUsingSynthesis(currentQuestion.somali);
      });
    } else {
      speakUsingSynthesis(currentQuestion.somali);
    }
  }; 

  const restartQuiz = () => {
    generateQuiz();
  };

  const getItemImage = (item: BodyPartItem) => {
    return "/lovable-uploads/5f3c2e5c-8a56-4baf-8c3f-4d8ecbe1f924.png";
  };

  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 90) return "Fantastisk! 🌟";
    if (percentage >= 70) return "Godt klaret! 👏";
    if (percentage >= 50) return "Ikke dårligt! 👍";
    return "Øv dig mere! 💪";
  };

  useEffect(() => {
    generateQuiz();
  }, []);

  useEffect(() => {
    if (questions[currentQuestionIndex]) {
      const timer = setTimeout(() => {
        playCurrentWord();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, questions]);

  const currentQuestion = questions[currentQuestionIndex];

  if (quizCompleted) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center">
        <div className="bg-cyan-50 rounded-lg p-8">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-cyan-700 mb-4">Quiz færdig!</h3>
          <p className="text-xl mb-2">{getScoreMessage()}</p>
          <p className="text-lg text-gray-700 mb-6">
            Du fik <span className="font-bold text-cyan-600">{score}</span> ud af {totalQuestions} rigtige
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={restartQuiz} className="bg-cyan-600 hover:bg-cyan-700">
              <RotateCcw className="w-4 h-4 mr-2" />
              Prøv igen
            </Button>
            <Button onClick={onBack} variant="outline">
              Tilbage til menu
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 text-center">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-cyan-700 mb-2">Kropsdel Quiz</h3>
        <p className="text-gray-600 mb-4">
          Spørgsmål {currentQuestionIndex + 1} af {totalQuestions} | Score: {score}
        </p>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-cyan-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>

        <Button onClick={playCurrentWord} className="bg-cyan-600 hover:bg-cyan-700 mb-4">
          🔊 Hør ordet
        </Button>
      </div>

      {currentQuestion && (
        <div>
          <p className="text-lg mb-6 text-gray-700">
            Vælg det billede, der matcher ordet du hører
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
                      : 'border-gray-200 hover:border-cyan-300 hover:bg-cyan-50'
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
              <Button onClick={nextQuestion} className="mt-4 bg-cyan-600 hover:bg-cyan-700">
                {currentQuestionIndex + 1 < totalQuestions ? 'Næste spørgsmål' : 'Se resultater'}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KropsdeleQuizActivity;
