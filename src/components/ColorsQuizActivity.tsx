
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { COLORS_DATA } from "@/constants/colorsData";
import { recordQuizResultAuto } from "@/utils/quizRecorder";


interface ColorsQuizActivityProps {
  onBack: () => void;
}

type QuizOption = {
  name: string;
  somali: string;
  hex: string;
  audioPath?: string;
};

type QuizQuestion = {
  color: QuizOption;
  options: QuizOption[];
  correctAnswer: string; // somali
};

export default function ColorsQuizActivity({ onBack }: ColorsQuizActivityProps) {
  // ⬇️ Hooks altid øverst – ingen betingelser/løkker omkring
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const savedRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  // Generér spørgsmål ved mount
  useEffect(() => {
    generateQuestions();
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const generateQuestions = () => {
    const shuffled = [...COLORS_DATA].sort(() => Math.random() - 0.5);
    const newQuestions: QuizQuestion[] = shuffled.slice(0, 5).map((color) => {
      const otherColors = COLORS_DATA.filter((c) => c.name !== color.name);
      const wrongAnswers = otherColors.sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [color, ...wrongAnswers].sort(() => Math.random() - 0.5);
      return {
        color,
        options,
        correctAnswer: color.somali,
      };
    });
    setQuestions(newQuestions);
    // reset state når vi laver nye spørgsmål
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    savedRef.current = false;
  };

  const speakColor = (audioPath?: string, fallbackText?: string) => {
    try {
      if (audioPath) {
        const audio = new Audio(audioPath);
        audio.play().catch((e) => console.error("Lydafspilning fejl:", e));
      } else if (fallbackText) {
        const utterance = new SpeechSynthesisUtterance(fallbackText);
        utterance.lang = "so-SO";
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.error("Speak fejl:", e);
    }
  };

  const playSuccessSound = () => {
    const audio = new Audio('/feedback/waa-sax.mp3');
    audio.play().catch(() => {
      const utterance = new SpeechSynthesisUtterance('Waa sax!');
      utterance.lang = 'so-SO';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    });
  };
  
  const playErrorSound = () => {
    const audio = new Audio('/feedback/waa-qalad.mp3');
    audio.play().catch(() => {
      const utterance = new SpeechSynthesisUtterance('Waa qalad!');
      utterance.lang = 'so-SO';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    });
  };
  

  const handleAnswerSelect = (answer: string) => {
    const q = questions[currentQuestion];
    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === q.correctAnswer) {
      setScore((prev) => prev + 1); // funktionel update
    }

    if (answer === q.correctAnswer) {
      setScore((prev) => prev + 1);
      playSuccessSound(); // <-- Tilføj her
    } else {
      playErrorSound(); // <-- Tilføj her
    }    

    // Gå videre efter 1.5s
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setSelectedAnswer(null);
      setShowResult(false);
      setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
    }, 1500);
  };

  const resetQuiz = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    generateQuestions();
  };

  // Afledte værdier (ingen hooks her)
  const isLastQuestion = currentQuestion === questions.length - 1;
  const isQuizComplete = questions.length > 0 && isLastQuestion && showResult;
  const question = questions[currentQuestion];

  // Gem resultat én gang når quiz er færdig
  useEffect(() => {
    if (!isQuizComplete) return;
    if (savedRef.current) return;
    savedRef.current = true;

    // score + total er stabile her
    recordQuizResultAuto({
      category: "Farver",
      activityName: "Farve Quiz",
      correct: score,
      total: questions.length,
    });
  }, [isQuizComplete, score, questions.length]);

  if (questions.length === 0) {
    return <div>Indlæser...</div>;
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <h3 className="text-2xl font-bold text-pink-700 mb-4">Farve Quiz</h3>

      <div className="flex gap-4 text-lg">
        <span>Spørgsmål: {currentQuestion + 1}/{questions.length}</span>
        <span>Score: {score}</span>
      </div>

      {!isQuizComplete ? (
        <>
          <div className="text-center space-y-4">
            <h4 className="text-xl font-semibold text-gray-700">
              Hvilken farve er dette?
            </h4>

            <div className="relative">
              <div
                className="w-32 h-32 rounded-lg border-4 border-pink-300 shadow-lg mx-auto"
                style={{ backgroundColor: question.color.hex }}
              />

              <Button
                onClick={() => speakColor(question.color.audioPath, question.color.somali)}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-pink-600 hover:bg-pink-700 rounded-full p-2"
                size="icon"
              >
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            {question.options.map((option, index) => (
              <Button
                key={`${option.somali}-${index}`}
                onClick={() => handleAnswerSelect(option.somali)}
                variant="outline"
                className={`p-4 h-auto ${
                  showResult
                    ? option.somali === question.correctAnswer
                      ? "bg-green-100 border-green-500"
                      : selectedAnswer === option.somali
                      ? "bg-red-100 border-red-500"
                      : ""
                    : "hover:bg-pink-50"
                }`}
                disabled={showResult}
              >
                <div className="text-center">
                  <div className="font-semibold text-lg">{option.somali}</div>
                </div>
              </Button>
            ))}
          </div>

          {showResult && (
            <div
              className={`text-center p-4 rounded-lg ${
                selectedAnswer === question.correctAnswer
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {selectedAnswer === question.correctAnswer
                ? "Korrekt! 🎉"
                : "Forkert. Prøv igen næste gang!"}
            </div>
          )}
        </>
      ) : (
        <div className="text-center space-y-4">
          <h4 className="text-2xl font-bold text-pink-700">Quiz færdig! 🎉</h4>
          <p className="text-xl">
            Din score: {score}/{questions.length}
          </p>
          <div className="flex gap-4">
            <Button
              onClick={resetQuiz}
              variant="outline"
              className="border-pink-300 text-pink-700"
            >
              Prøv igen
            </Button>
            <Button onClick={onBack} className="bg-pink-600 hover:bg-pink-700">
              Tilbage til menu
            </Button>
          </div>
        </div>
      )}

      {!isQuizComplete && (
        <Button
          onClick={onBack}
          variant="outline"
          className="border-pink-300 text-pink-700"
        >
          Tilbage til menu
        </Button>
      )}
    </div>
  );
}