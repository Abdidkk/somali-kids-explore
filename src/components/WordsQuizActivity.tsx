import React, { useMemo, useState } from "react";
import MultipleChoiceQuiz, { MCQuestion } from "@/components/quiz/MultipleChoiceQuiz";
import { WORDS } from "@/constants/wordsData";

interface WordsQuizActivityProps { 
  onBack: () => void 
}

export default function WordsQuizActivity({ onBack }: WordsQuizActivityProps) {
  const [seed, setSeed] = useState(0);

  const questions: MCQuestion[] = useMemo(() => {
    const items = WORDS;
    const shuffled = [...items].sort(() => Math.random() - 0.5).slice(0, 5);

    return shuffled.map((correct) => {
      const wrong = items.filter(w => w.danish !== correct.danish).sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [correct, ...wrong].sort(() => Math.random() - 0.5);

      return {
        prompt: correct.image ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 bg-purple-50 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={correct.image}
                alt="Quiz billede"
                className="w-28 h-28 object-contain"
              />
            </div>
            <p className="text-lg text-gray-700">Hvad betyder dette somaliske ord?</p>
          </div>
        ) : "Hvad betyder dette somaliske ord?",
        speak: { 
          audio: correct.audio, 
          tts: { text: correct.somali, lang: "so-SO", rate: 0.9 } 
        },
        options: options.map((word) => ({
          id: word.danish,
          label: word.danish,
        })),
        correctId: correct.danish,
      } as MCQuestion;
    });
  }, [seed]);

  return (
    <MultipleChoiceQuiz
      title="Test din viden"
      category="Ord"
      activityName="Ord Quiz"
      questions={questions}
      onBack={onBack}
      onRetry={() => setSeed((s) => s + 1)}
      theme="purple"
    />
  );
}

