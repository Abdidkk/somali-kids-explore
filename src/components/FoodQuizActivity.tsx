import React, { useMemo, useState } from "react";
import MultipleChoiceQuiz, { MCQuestion } from "@/components/quiz/MultipleChoiceQuiz";
import { getAllFood, FoodItem } from "@/constants/foodData";

interface FoodQuizActivityProps { 
  onBack: () => void;
  selectedChild?: string;
}

export default function FoodQuizActivity({ onBack, selectedChild }: FoodQuizActivityProps) {
  const [seed, setSeed] = useState(0);

  const questions: MCQuestion[] = useMemo(() => {
    const items = getAllFood();
    const shuffled = [...items].sort(() => Math.random() - 0.5).slice(0, 5);

    return shuffled.map((correct) => {
      const wrong = items.filter(i => i.id !== correct.id).sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [correct, ...wrong].sort(() => Math.random() - 0.5);

      return {
        prompt: "Hør ordet og klik på det rigtige billede:",
        speak: { audio: correct.audio, tts: { text: correct.somali, lang: "so-SO", rate: 0.9 } },
        options: options.map((f: FoodItem) => ({
          id: f.id,
          content: (
            <img src={f.image} alt={f.somali} className="w-24 h-24 object-contain rounded-full" />
          ),
        })),
        correctId: correct.id,
      } as MCQuestion;
    });
  }, [seed]);

  return (
    <MultipleChoiceQuiz
      title="Mad Quiz"
      category="Mad"
      activityName="Mad Quiz"
      questions={questions}
      onBack={onBack}
      onRetry={() => setSeed((s) => s + 1)}
      theme="purple"
      selectedChild={selectedChild}
    />
  );
}
