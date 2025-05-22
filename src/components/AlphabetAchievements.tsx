
import React from "react";
import { Star, Flame, BadgeCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

type AlphabetAchievementsProps = {
  streak: number;
  lettersTraced: number;
  totalLetters: number;
  badges: string[];
};

const badgeIconByType = (badge: string) => {
  if (badge === "Første bogstav") return <BadgeCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />;
  if (badge === "5 bogstaver") return <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />;
  if (badge === "Streak 3 dage") return <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />;
  return <BadgeCheck className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />;
};

export default function AlphabetAchievements({
  streak,
  lettersTraced,
  totalLetters,
  badges,
}: AlphabetAchievementsProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col items-center w-full mb-2 sm:mb-4">
      {/* Streak / daglig læring */}
      <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
        <Flame className={`${isMobile ? "w-4 h-4" : "w-6 h-6"} text-orange-500 animate-bounce`} />
        <span className={`font-semibold ${isMobile ? "text-xs" : "text-sm"} text-purple-700`}>
          Din streak: {streak} {streak === 1 ? "dag" : "dage"}
        </span>
      </div>
      
      {/* Fremdriftsbar for gennemførte bogstaver */}
      <Progress 
        value={Math.floor((lettersTraced / totalLetters) * 100)} 
        className={`${isMobile ? "w-32 sm:w-44" : "w-52"} mb-1 sm:mb-2 bg-gray-100 h-2`} 
      />
      
      <div className={`${isMobile ? "text-[10px]" : "text-xs"} text-gray-600 mb-1 sm:mb-2`}>
        {lettersTraced} af {totalLetters} bogstaver sporet
      </div>
      
      {/* Badges */}
      <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
        {badges.map((badge, i) => (
          <Badge 
            key={i} 
            className={`bg-purple-100 text-purple-700 rounded-full flex items-center gap-1 ${
              isMobile ? "text-[10px] py-0" : "text-xs"
            }`}
          >
            {badgeIconByType(badge)}
            <span>{badge}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}

