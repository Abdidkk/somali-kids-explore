import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import ScoreDisplay from "@/components/alphabet/guess/ScoreDisplay";
import { PointsManager } from "@/utils/pointsManager";
import { useToast } from "@/hooks/use-toast";

interface Props {
  onBack: () => void;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

const culturalQuestions: QuizQuestion[] = [
  {
    question: "Hvad er det traditionelle somaliske tøj kaldet?",
    options: ["Dirac", "Sari", "Kente", "Dashiki"],
    correct: 0,
    explanation: "Dirac er det traditionelle tøj, som somaliske kvinder bærer ved særlige lejligheder."
  },
  {
    question: "Hvilken sport er mest populær i Somalia?",
    options: ["Basketball", "Fodbold", "Cricket", "Tennis"],
    correct: 1,
    explanation: "Fodbold er den mest populære sport i Somalia."
  },
  {
    question: "Hvad hedder det traditionelle somaliske hus?",
    options: ["Aqal", "Rondavel", "Igloo", "Yurt"],
    correct: 0,
    explanation: "Aqal er det traditionelle nomadiske hus brugt af somaliske hyrder."
  },
  {
    question: "Hvilken religion praktiseres hovedsageligt i Somalia?",
    options: ["Kristendom", "Hinduisme", "Islam", "Buddhism"],
    correct: 2,
    explanation: "Islam er den dominerende religion i Somalia."
  },
  {
    question: "Hvad er den traditionelle somaliske dans kaldet?",
    options: ["Dhaanto", "Samba", "Tango", "Waltz"],
    correct: 0,
    explanation: "Dhaanto er en traditionel somalisk folk-dans."
  }
];

export default function CulturalQuizActivity({ onBack }: Props) {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [score, setScore] = useState(0);
  const [showScoreAnimation, setShowScoreAnimation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Load initial score
  useEffect(() => {
    const loadScore = async () => {
      const initialScore = await PointsManager.getCategoryScore("Kulturelt indhold");
      setScore(initialScore);
    };
    loadScore();
  }, []);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === culturalQuestions[currentQuestion].correct) {
      setCorrectAnswers(prev => prev + 1);
    }

    setTimeout(async () => {
      if (currentQuestion < culturalQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Quiz completed
        const finalCorrect = correctAnswers + (answerIndex === culturalQuestions[currentQuestion].correct ? 1 : 0);
        const earnedPoints = PointsManager.calculatePoints(finalCorrect, culturalQuestions.length, true);
        
        await PointsManager.addScore({
          category: "Kulturelt indhold",
          activity: "Kultur Quiz",
          score: earnedPoints,
          maxScore: 100,
          timestamp: new Date().toISOString()
        });

        setScore(prev => prev + earnedPoints);
        setShowScoreAnimation(true);
        setQuizCompleted(true);

        toast({
          title: "Quiz afsluttet! 🎉",
          description: `Du svarede korrekt på ${finalCorrect} ud af ${culturalQuestions.length} spørgsmål og fik ${earnedPoints} point!`,
          duration: 4000,
        });
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectAnswers(0);
    setQuizCompleted(false);
    setShowScoreAnimation(false);
  };

  if (quizCompleted) {
    return (
      <div className="flex flex-col items-center gap-6 relative">
        <ScoreDisplay score={score} animate={showScoreAnimation} />
        
        <div className="text-center">
          <div className="text-6xl mb-4">🎭</div>
          <h3 className={`font-bold text-purple-700 ${isMobile ? 'text-2xl' : 'text-3xl'} mb-4`}>
            Quiz Afsluttet!
          </h3>
          <p className={`text-gray-600 ${isMobile ? 'text-lg' : 'text-xl'} mb-6`}>
            Du svarede korrekt på {correctAnswers} ud af {culturalQuestions.length} spørgsmål
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button onClick={resetQuiz} className="bg-purple-600 hover:bg-purple-700">
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

  const question = culturalQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="flex flex-col items-center gap-6 relative">
      <ScoreDisplay score={score} animate={showScoreAnimation} />
      
      <div className="w-full max-w-2xl">
        <div className="mb-6 text-center">
          <div className="flex justify-between items-center mb-4">
            <span className="text-purple-600 font-medium">
              Spørgsmål {currentQuestion + 1} af {culturalQuestions.length}
            </span>
            <span className="text-gray-500">
              Korrekte: {correctAnswers}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / culturalQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <h3 className={`font-bold text-gray-800 ${isMobile ? 'text-xl' : 'text-2xl'} mb-6`}>
            {question.question}
          </h3>

          <div className="grid gap-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                className={`p-4 rounded-lg text-left transition-all ${
                  showResult
                    ? index === question.correct
                      ? 'bg-green-100 border-2 border-green-500 text-green-800'
                      : index === selectedAnswer && !isCorrect
                      ? 'bg-red-100 border-2 border-red-500 text-red-800'
                      : 'bg-gray-100 text-gray-600'
                    : 'bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 hover:border-purple-300'
                }`}
              >
                <span className={`font-medium ${isMobile ? 'text-base' : 'text-lg'}`}>
                  {option}
                </span>
              </button>
            ))}
          </div>

          {showResult && question.explanation && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">
                💡 {question.explanation}
              </p>
            </div>
          )}
        </div>

        {showResult && (
          <div className="text-center">
            <div className={`text-4xl mb-2`}>
              {isCorrect ? '✅' : '❌'}
            </div>
            <p className={`font-bold ${isMobile ? 'text-lg' : 'text-xl'} ${
              isCorrect ? 'text-green-600' : 'text-red-600'
            }`}>
              {isCorrect ? 'Korrekt!' : 'Forkert'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}