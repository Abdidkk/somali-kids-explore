
import React from "react";
import { HelpCircle } from "lucide-react";

interface QuestionHeaderProps {
  showCelebration: boolean;
}

export default function QuestionHeader({ showCelebration }: QuestionHeaderProps) {
  return (
    <div className="flex flex-col items-center">
      <HelpCircle className={`w-10 h-10 text-purple-700 ${showCelebration ? 'animate-bounce' : ''}`} />
      <div className="font-semibold text-lg text-purple-700 mb-3">
        Hvilket bogstav kommer efter:
      </div>
    </div>
  );
}
