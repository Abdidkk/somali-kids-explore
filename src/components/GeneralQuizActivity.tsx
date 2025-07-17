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
  category: string;
}

const generalQuestions: QuizQuestion[] = [
  {
    question: "Hvad betyder 'Soo dhawoow' på dansk?",
    options: ["Farvel", "Velkommen", "Tak", "Undskyld"],
    correct: 1,
    category: "Alfabet"
  },
  {
    question: "Hvad er farven 'cas' på dansk?",
    options: ["Blå", "Grøn", "Rød", "Gul"],
    correct: 2,
    category: "Farver"
  },
  {
    question: "Hvor mange er 'shan' på dansk?",
    options: ["3", "4", "5", "6"],
    correct: 2,
    category: "Tal"
  },
  {
    question: "Hvad er 'moos' på dansk?",
    options: ["Æble", "Banan", "Orange", "Ananas"],
    correct: 1,
    category: "Mad"
  },
  {
    question: "Hvad er 'libaax' på dansk?",
    options: ["Tiger", "Løve", "Leopard", "Gepard"],
    correct: 1,
    category: "Dyr"
  },
  {
    question: "Hvad er 'madax' på dansk?",
    options: ["Hånd", "Fod", "Hoved", "Arm"],
    correct: 2,
    category: "Kropsdel"
  },
  {
    question: "Hvad hedder Somalia's hovedstad?",
    options: ["Hargeisa", "Bosaso", "Mogadishu", "Kismayo"],
    correct: 2,
    category: "Geografi"
  },
  {
    question: "Hvor mange måneder er der i det somaliske kalender?",
    options: ["10", "11", "12", "13"],
    correct: 2,
    category: "Kalender"
  }
];

export default function GeneralQuizActivity({ onBack }: Props) {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [score, setScore] = useState(0);
  const [showScoreAnimation, setShowScoreAnimation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);

  // Load initial score
  useEffect(() => {
    const loadScore = async () => {
      const initialScore = await PointsManager.getCategoryScore("Quiz");
      setScore(initialScore);
    };
    loadScore();
  }, []);

  useEffect(() => {
    // Shuffle questions when component mounts
    const shuffled = [...generalQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
    setShuffledQuestions(shuffled);
  }, []);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === shuffledQuestions[currentQuestion].correct) {
      setCorrectAnswers(prev => prev + 1);
    }

    setTimeout(async () => {
      if (currentQuestion < shuffledQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Quiz completed
        const finalCorrect = correctAnswers + (answerIndex === shuffledQuestions[currentQuestion].correct ? 1 : 0);
        const earnedPoints = PointsManager.calculatePoints(finalCorrect, shuffledQuestions.length, true);
        
        await PointsManager.addScore({
          category: "Quiz",
          activity: "Generel Quiz",
          score: earnedPoints,
          maxScore: 100,
          timestamp: new Date().toISOString()
        });

        setScore(prev => prev + earnedPoints);
        setShowScoreAnimation(true);
        setQuizCompleted(true);

        toast({
          title: "Quiz afsluttet! 🎉",
          description: `Du svarede korrekt på ${finalCorrect} ud af ${shuffledQuestions.length} spørgsmål og fik ${earnedPoints} point!`,
          duration: 4000,
        });
      }
    }, 2000);
  };

  const resetQuiz = () => {
    const shuffled = [...generalQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
    setShuffledQuestions(shuffled);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectAnswers(0);
    setQuizCompleted(false);
    setShowScoreAnimation(false);
  };

  if (shuffledQuestions.length === 0) {
    return <div className="text-center">Indlæser quiz...</div>;
  }

  if (quizCompleted) {
    return (
      <div className="flex flex-col items-center gap-6 relative">
        <ScoreDisplay score={score} animate={showScoreAnimation} />
        
        <div className="text-center">
          <div className="text-6xl mb-4">🧠</div>
          <h3 className={`font-bold text-indigo-700 ${isMobile ? 'text-2xl' : 'text-3xl'} mb-4`}>
            Quiz Afsluttet!
          </h3>
          <p className={`text-gray-600 ${isMobile ? 'text-lg' : 'text-xl'} mb-6`}>
            Du svarede korrekt på {correctAnswers} ud af {shuffledQuestions.length} spørgsmål
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button onClick={resetQuiz} className="bg-indigo-600 hover:bg-indigo-700">
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

  const question = shuffledQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="flex flex-col items-center gap-6 relative">
      <ScoreDisplay score={score} animate={showScoreAnimation} />
      
      <div className="w-full max-w-2xl">
        <div className="mb-6 text-center">
          <div className="flex justify-between items-center mb-4">
            <span className="text-indigo-600 font-medium">
              Spørgsmål {currentQuestion + 1} af {shuffledQuestions.length}
            </span>
            <span className="text-gray-500">
              Korrekte: {correctAnswers}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
            />
          </div>
          
          <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
            {question.category}
          </span>
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
                    : 'bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-200 hover:border-indigo-300'
                }`}
              >
                <span className={`font-medium ${isMobile ? 'text-base' : 'text-lg'}`}>
                  {option}
                </span>
              </button>
            ))}
          </div>
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