
import React from "react";
import { Star } from "lucide-react";

interface ScoreDisplayProps {
  score: number;
  animate?: boolean;
}

export default function ScoreDisplay({ score, animate = false }: ScoreDisplayProps) {
  return (
    <div className="absolute top-0 right-2 flex items-center">
      <Star className={`w-5 h-5 text-yellow-500 mr-1 ${animate ? 'animate-pulse' : ''}`} />
      <span className={`font-semibold text-gray-700 ${animate ? 'animate-scale-in' : ''}`}>
        {score}
      </span>
    </div>
  );
}
