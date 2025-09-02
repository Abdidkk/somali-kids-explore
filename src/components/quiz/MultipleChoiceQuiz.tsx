import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { recordQuizResultAuto } from "@/utils/quizRecorder";
import { PointsManager } from "@/utils/pointsManager";

export interface MCOption {
  id: string;
  label?: string;
  content?: React.ReactNode; // optional custom node (e.g., image)
}

export interface MCQuestion {
  prompt?: string; // e.g., "Hvilken farve er dette?"
  promptNode?: React.ReactNode; // e.g., color square
  speak?: { audio?: string; tts?: { text: string; lang?: string; rate?: number } };
  options: MCOption[]; // must be length 4 (1 correct + 3 wrong)
  correctId: string;
}

interface MultipleChoiceQuizProps {
  title: string;
  category: string; // used for saving results
  activityName: string; // used for saving results
  questions: MCQuestion[]; // should contain 5 items
  onBack: () => void;
  onRetry: () => void; // parent regenerates questions
  theme?: "indigo" | "pink" | "green" | "purple" | "cyan";
  selectedChild?: string; // Add selectedChild prop
}

const themeMap = {
  indigo: {
    text: "text-indigo-700",
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-700",
    btn: "bg-indigo-600 hover:bg-indigo-700",
    border: "border-indigo-200 hover:border-indigo-300",
    halo: "bg-indigo-50",
    progress: "bg-indigo-600",
  },
  pink: {
    text: "text-pink-700",
    badgeBg: "bg-pink-100",
    badgeText: "text-pink-700",
    btn: "bg-pink-600 hover:bg-pink-700",
    border: "border-pink-200 hover:border-pink-300",
    halo: "bg-pink-50",
    progress: "bg-pink-600",
  },
  green: {
    text: "text-green-700",
    badgeBg: "bg-green-100",
    badgeText: "text-green-700",
    btn: "bg-green-600 hover:bg-green-700",
    border: "border-green-200 hover:border-green-300",
    halo: "bg-green-50",
    progress: "bg-green-600",
  },
  purple: {
    text: "text-purple-700",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-700",
    btn: "bg-purple-600 hover:bg-purple-700",
    border: "border-purple-200 hover:border-purple-300",
    halo: "bg-purple-50",
    progress: "bg-purple-600",
  },
  cyan: {
    text: "text-cyan-700",
    badgeBg: "bg-cyan-100",
    badgeText: "text-cyan-700",
    btn: "bg-cyan-600 hover:bg-cyan-700",
    border: "border-cyan-200 hover:border-cyan-300",
    halo: "bg-cyan-50",
    progress: "bg-cyan-600",
  },
  
};

export default function MultipleChoiceQuiz({
  title,
  category,
  activityName,
  questions,
  onBack,
  onRetry,
  theme = "indigo",
  selectedChild
}: MultipleChoiceQuizProps) {
  const t = themeMap[theme];
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Debug logging and set current child at component mount
  useEffect(() => {
    console.log('MultipleChoiceQuiz mounted:', {
      category,
      activityName,
      selectedChild,
      currentChildInManager: PointsManager.getCurrentChild()
    });
    
    if (selectedChild) {
      console.log('Setting current child in PointsManager to:', selectedChild);
      PointsManager.setCurrentChild(selectedChild);
      console.log('Current child after setting:', PointsManager.getCurrentChild());
    }
  }, [category, activityName, selectedChild]);
  const timeoutRef = useRef<number | null>(null);
  const savedRef = useRef(false);

  const total = useMemo(() => questions.length, [questions.length]);
  const isLast = index === total - 1;
  const isComplete = total > 0 && isLast && showResult;
  const q = questions[index];

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  // Auto play prompt audio
  useEffect(() => {
    if (!q?.speak) return;
    const { audio, tts } = q.speak;
    if (audio) {
      const a = new Audio(audio);
      a.play().catch(() => {
        if (tts?.text) speak(tts.text, tts.lang, tts.rate);
      });
    } else if (tts?.text) {
      speak(tts.text, tts.lang, tts.rate);
    }
  }, [index, q?.speak]);

  const speak = (text: string, lang = "so-SO", rate = 0.9) => {
    try {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang;
      utter.rate = rate;
      window.speechSynthesis.speak(utter);
    } catch {}
  };

  const handleSelect = (id: string) => {
    if (showResult) return;
    setSelected(id);
    setShowResult(true);
    if (id === q.correctId) setScore((s) => s + 1);

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      if (!isLast) {
        setIndex((i) => i + 1);
        setSelected(null);
        setShowResult(false);
      }
    }, 1500);
  };

  // Save once when complete
  useEffect(() => {
    if (!isComplete || savedRef.current) return;
    savedRef.current = true;
    
    // Ensure the correct child is set before recording result
    if (selectedChild) {
      PointsManager.setCurrentChild(selectedChild);
      console.log('Recording quiz result for child:', selectedChild);
    }
    
    recordQuizResultAuto({ category, activityName, correct: score, total });
  }, [isComplete, selectedChild]);

  if (!q) return <div className="text-center">Indlæser...</div>;

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <h3 className={`text-2xl font-bold ${t.text}`}>{title}</h3>

      <div className="flex gap-4 text-lg">
        <span>Spørgsmål: {index + 1}/{total}</span>
        <span>Score: {score}</span>
      </div>

      {!isComplete ? (
        <>
          <div className="text-center space-y-4 w-full max-w-xl">
            {q.prompt && (
              <h4 className="text-xl font-semibold text-gray-700">{q.prompt}</h4>
            )}

            <div className="relative">
              {q.promptNode && (
                <div className={`mx-auto ${t.halo} rounded-lg inline-block`}>{q.promptNode}</div>
              )}

              {q.speak && (
                <Button
                  onClick={() => {
                    const { audio, tts } = q.speak!;
                    if (audio) {
                      const a = new Audio(audio);
                      a.play().catch(() => tts?.text && speak(tts.text, tts.lang, tts.rate));
                    } else if (tts?.text) {
                      speak(tts.text, tts.lang, tts.rate);
                    }
                  }}
                  className={`mt-3 ${t.btn}`}
                >
                  <Volume2 className="w-4 h-4 mr-2" /> Afspil igen
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
            {q.options.map((opt) => {
              const isCorrect = opt.id === q.correctId;
              const isSelected = selected === opt.id;
              return (
                <Button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  variant="outline"
                  className={`h-auto p-4 text-center ${
                    showResult
                      ? isCorrect
                        ? "bg-green-100 border-green-500"
                        : isSelected
                        ? "bg-red-100 border-red-500"
                        : ""
                      : t.border
                  }`}
                  disabled={showResult}
                >
                  <div className="w-full flex flex-col items-center gap-2">
                    {opt.content}
                    {opt.label && <div className="font-semibold text-lg">{opt.label}</div>}
                  </div>
                </Button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center space-y-4">
          <h4 className={`text-2xl font-bold ${t.text}`}>Quiz færdig! 🎉</h4>
          <p className="text-xl">Din score: {score}/{total}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={onRetry} variant="outline" className={t.border}>
              Prøv igen
            </Button>
            <Button onClick={onBack} className={t.btn}>
              Tilbage til menu
            </Button>
          </div>
        </div>
      )}

      {!isComplete && (
        <Button onClick={onBack} variant="outline" className={t.border}>
          Tilbage til menu
        </Button>
      )}

      {/* Progress bar */}
      <div className="w-full max-w-xl">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`${t.progress} h-2 rounded-full transition-all`}
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
