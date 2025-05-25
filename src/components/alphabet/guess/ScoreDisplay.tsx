
import React from "react";
import { Star } from "lucide-react";

interface ScoreDisplayProps {
  score: number;
}

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="absolute top-0 right-2 flex items-center">
      <Star className="w-5 h-5 text-yellow-500 mr-1" />
      <span className="font-semibold text-gray-700">{score}</span>
    </div>
  );
}
