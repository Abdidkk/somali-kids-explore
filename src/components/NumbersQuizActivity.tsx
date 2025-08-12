
import React, { useEffect, useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MultipleChoiceQuiz, { MCQuestion } from "@/components/quiz/MultipleChoiceQuiz";
import { getNumbersForTab } from "@/constants/numbersData";

interface NumbersQuizActivityProps {
  onBack: () => void;
}

export default function NumbersQuizActivity({ onBack }: NumbersQuizActivityProps) {
  const [activeTab, setActiveTab] = useState<string>("1-19");
  const [questions, setQuestions] = useState<MCQuestion[]>([]);

  const numbers = useMemo(() => getNumbersForTab(activeTab), [activeTab]);

  const regenerate = () => {
    // Shuffle and pick 5 base questions
    const base = [...numbers].sort(() => Math.random() - 0.5).slice(0, 5);
    const qs: MCQuestion[] = base.map((n) => {
      const wrongs = numbers
        .filter((x) => x.number !== n.number)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const options = [n, ...wrongs]
        .sort(() => Math.random() - 0.5)
        .map((opt) => ({ id: String(opt.number), label: String(opt.number) }));

      return {
        prompt: "Hvilket tal hører du?",
        speak: {
          audio: n.audioPath,
          tts: { text: n.somali, lang: "so-SO", rate: 0.9 },
        },
        options,
        correctId: String(n.number),
      };
    });
    setQuestions(qs);
  };

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleTabChange = (tab: string) => setActiveTab(tab);

  return (
    <div className="flex flex-col items-center gap-6 mt-4 w-full">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-3xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="1-19">1-19</TabsTrigger>
          <TabsTrigger value="20-90">20-90</TabsTrigger>
          <TabsTrigger value="100-1000">100-1000</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <MultipleChoiceQuiz
            title="Tal – Quiz"
            category="Tal"
            activityName="Tal Quiz"
            questions={questions}
            onBack={onBack}
            onRetry={regenerate}
            theme="purple"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
