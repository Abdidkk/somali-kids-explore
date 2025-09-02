import React, { useMemo, useState } from "react";
import MultipleChoiceQuiz, { MCQuestion } from "@/components/quiz/MultipleChoiceQuiz";
import { getAllAnimals, AnimalItem } from "@/constants/animalsData";

interface AnimalsQuizActivityProps { 
  onBack: () => void;
  selectedChild?: string;
}

export default function AnimalsQuizActivity({ onBack, selectedChild }: AnimalsQuizActivityProps) {
  const [seed, setSeed] = useState(0);

  const questions: MCQuestion[] = useMemo(() => {
    const animals = getAllAnimals();
    const shuffled = [...animals].sort(() => Math.random() - 0.5).slice(0, 5);

    return shuffled.map((correct) => {
      const wrong = animals.filter(a => a.id !== correct.id).sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [correct, ...wrong].sort(() => Math.random() - 0.5);

      return {
        prompt: "Hør dyret og vælg det rigtige billede:",
        speak: { audio: correct.audio, tts: { text: correct.somali, lang: "so-SO", rate: 0.8 } },
        options: options.map((a: AnimalItem) => ({
          id: a.id,
          content: (
            <img src={a.image} alt={a.danish} className="w-24 h-24 object-contain rounded" />
          ),
        })),
        correctId: correct.id,
      } as MCQuestion;
    });
  }, [seed]);

  return (
    <MultipleChoiceQuiz
      title="Test din viden"
      category="Dyr"
      activityName="Dyr Quiz"
      questions={questions}
      onBack={onBack}
      onRetry={() => setSeed((s) => s + 1)}
      theme="green"
      selectedChild={selectedChild}
    />
  );
}
