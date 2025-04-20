
import React from "react";
import { Star, Flame, BadgeCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type AlphabetAchievementsProps = {
  streak: number;
  lettersTraced: number;
  totalLetters: number;
  badges: string[];
};

const badgeIconByType = (badge: string) => {
  if (badge === "Første bogstav") return <BadgeCheck className="w-4 h-4 text-green-600" />;
  if (badge === "5 bogstaver") return <Star className="w-4 h-4 text-yellow-400" />;
  if (badge === "Streak 3 dage") return <Flame className="w-4 h-4 text-orange-500" />;
  return <BadgeCheck className="w-4 h-4 text-purple-400" />;
};

export default function AlphabetAchievements({
  streak,
  lettersTraced,
  totalLetters,
  badges,
}: AlphabetAchievementsProps) {
  return (
    <div className="flex flex-col items-center w-full mb-4">
      {/* Streak / daglig læring */}
      <div className="flex items-center gap-2 mb-2">
        <Flame className="w-6 h-6 text-orange-500 animate-bounce" />
        <span className="font-semibold text-sm text-purple-700">
          Din streak: {streak} {streak === 1 ? "dag" : "dage"}
        </span>
      </div>
      {/* Fremdriftsbar for gennemførte bogstaver */}
      <Progress value={Math.floor((lettersTraced / totalLetters) * 100)} className="w-52 mb-2 bg-gray-100" />
      <div className="text-xs text-gray-600 mb-2">{lettersTraced} af {totalLetters} bogstaver sporet</div>
      {/* Badges */}
      <div className="flex flex-wrap gap-2 justify-center">
        {badges.map((badge, i) => (
          <Badge key={i} className="bg-purple-100 text-purple-700 rounded-full flex items-center gap-1">
            {badgeIconByType(badge)}
            <span>{badge}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}
