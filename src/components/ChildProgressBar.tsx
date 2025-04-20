
import { Progress } from "@/components/ui/progress";
import { Star, Badge, Flame } from "lucide-react";
import React from "react";

type ChildProgressBarProps = {
  name: string;
  progress: number;
  streak: number;
};

export default function ChildProgressBar({ name, progress, streak }: ChildProgressBarProps) {
  // Inspiration: dashboard streak logic
  let motivation = "";
  if (streak >= 7) motivation = `🌟 Flot! Du har holdt din streak i ${streak} dage!`;
  else if (progress >= 50) motivation = `Du har gennemført mere end halvdelen, ${name}!`;
  else if (progress > 0) motivation = `God start, ${name}!`;

  return (
    <div className="w-full max-w-xl mx-auto mb-6 p-4 rounded-xl bg-white/60 shadow flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Flame className="text-orange-400 w-7 h-7 animate-bounce" />
        <div className="font-bold text-lg text-purple-700">{name}</div>
        <span className="inline-flex items-center bg-yellow-100 text-yellow-800 font-mono rounded-full px-3 py-1 text-xs font-semibold ml-2 animate-pulse">
          <Star className="text-yellow-500 w-4 h-4 mr-1" />
          {streak} dages streak
        </span>
      </div>
      <div className="space-y-1">
        <Progress value={progress} />
        <div className="text-xs text-right text-gray-700">{progress}% gennemført</div>
      </div>
      {motivation && (
        <div className="flex items-center gap-2 text-green-700 text-sm mt-2">
          <Badge className="w-4 h-4 text-green-400" />
          <span>{motivation}</span>
        </div>
      )}
    </div>
  )
}
