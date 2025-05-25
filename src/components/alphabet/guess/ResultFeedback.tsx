
import React from "react";

interface ResultFeedbackProps {
  result: null | "correct" | "wrong";
  showCelebration: boolean;
}

export default function ResultFeedback({ result, showCelebration }: ResultFeedbackProps) {
  if (result === "correct") {
    return (
      <div className="text-green-600 font-semibold text-xl flex items-center gap-2 mt-4">
        Korrekt! 🎉
        {showCelebration && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div className="text-7xl animate-bounce">🎉</div>
          </div>
        )}
      </div>
    );
  }
  
  if (result === "wrong") {
    return (
      <div className="text-red-500 font-semibold text-lg mt-4">
        Prøv igen!
      </div>
    );
  }
  
  return null;
}
