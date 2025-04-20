
import React from "react";
import { ArrowRight, CircleCheck } from "lucide-react";

type ContinueCardProps = {
  lastCategory: string;
  percent: number;
  onContinue: () => void;
};

export default function ContinueCard({ lastCategory, percent, onContinue }: ContinueCardProps) {
  return (
    <div
      tabIndex={0}
      className="flex items-center justify-between bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-vivid-purple rounded-xl px-6 py-4 mb-6 hover:scale-105 transition cursor-pointer shadow"
      onClick={onContinue}
      aria-label={`Fortsæt hvor du slap: ${lastCategory}`}
    >
      <div className="flex items-center gap-3">
        <CircleCheck className="text-green-500 w-7 h-7 animate-jump-in" />
        <div>
          <div className="text-md font-semibold text-purple-700">Fortsæt hvor du slap</div>
          <div className="text-sm text-gray-700">{lastCategory} — {percent}% færdig</div>
        </div>
      </div>
      <ArrowRight className="text-vivid-purple w-6 h-6" />
    </div>
  );
}
