import React, { useMemo, useState } from "react";
import MultipleChoiceQuiz, { MCQuestion } from "@/components/quiz/MultipleChoiceQuiz";

interface Props { onBack: () => void }

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  category: string;
}

const generalQuestions: QuizQuestion[] = [
  { question: "Hvad betyder 'Soo dhawoow' på dansk?", options: ["Farvel", "Velkommen", "Tak", "Undskyld"], correct: 1, category: "Alfabet" },
  { question: "Hvad er farven 'cas' på dansk?", options: ["Blå", "Grøn", "Rød", "Gul"], correct: 2, category: "Farver" },
  { question: "Hvor mange er 'shan' på dansk?", options: ["3", "4", "5", "6"], correct: 2, category: "Tal" },
  { question: "Hvad er 'moos' på dansk?", options: ["Æble", "Banan", "Orange", "Ananas"], correct: 1, category: "Mad" },
  { question: "Hvad er 'libaax' på dansk?", options: ["Tiger", "Løve", "Leopard", "Gepard"], correct: 1, category: "Dyr" },
  { question: "Hvad er 'madax' på dansk?", options: ["Hånd", "Fod", "Hoved", "Arm"], correct: 2, category: "Kropsdel" },
  { question: "Hvad hedder Somalia's hovedstad?", options: ["Hargeisa", "Bosaso", "Mogadishu", "Kismayo"], correct: 2, category: "Geografi" },
  { question: "Hvor mange måneder er der i det somaliske kalender?", options: ["10", "11", "12", "13"], correct: 2, category: "Kalender" },
];

export default function GeneralQuizActivity({ onBack }: Props) {
  const [seed, setSeed] = useState(0);

  const questions: MCQuestion[] = useMemo(() => {
    const shuffled = [...generalQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
    return shuffled.map((q) => ({
      prompt: q.question,
      options: q.options.map((opt, idx) => ({ id: `${idx}`, label: opt })),
      correctId: `${q.correct}`,
    }));
  }, [seed]);

  return (
    <MultipleChoiceQuiz
      title="Generel Quiz"
      category="Quiz"
      activityName="Generel Quiz"
      questions={questions}
      onBack={onBack}
      onRetry={() => setSeed((s) => s + 1)}
      theme="indigo"
    />
  );
}
