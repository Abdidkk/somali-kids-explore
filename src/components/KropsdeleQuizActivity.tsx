import React, { useMemo, useState } from "react";
import MultipleChoiceQuiz, { MCQuestion } from "@/components/quiz/MultipleChoiceQuiz";
import { getAllBodyParts, BodyPartItem } from "@/constants/bodyPartsData";

interface KropsdeleQuizActivityProps { 
  onBack: () => void;
  selectedChild?: string;
}

export default function KropsdeleQuizActivity({ onBack, selectedChild }: KropsdeleQuizActivityProps) {
  const [seed, setSeed] = useState(0);

  const questions: MCQuestion[] = useMemo(() => {
    const items = getAllBodyParts();
    const shuffled = [...items].sort(() => Math.random() - 0.5).slice(0, 5);

    return shuffled.map((correct) => {
      const wrong = items.filter(i => i.id !== correct.id).sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [correct, ...wrong].sort(() => Math.random() - 0.5);

      return {
        prompt: "Hør kropsdelen og vælg det rigtige billede:",
        speak: { audio: correct.audio, tts: { text: correct.somali, lang: "so-SO", rate: 0.9 } },
        options: options.map((bp: BodyPartItem) => ({
          id: bp.id,
          content: (
            <img src={bp.image ?? "/billeder/placeholder.png"} alt={bp.danish} className="w-24 h-24 object-contain rounded" />
          ),
        })),
        correctId: correct.id,
      } as MCQuestion;
    });
  }, [seed]);

  return (
    <MultipleChoiceQuiz
      title="Test din viden"
      category="Kropsdele"
      activityName="Kropsdel Quiz"
      questions={questions}
      onBack={onBack}
      onRetry={() => setSeed((s) => s + 1)}
      theme="cyan"
      selectedChild={selectedChild}
    />
  );
}
