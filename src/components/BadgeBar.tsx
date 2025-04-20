
import { BadgeCheck, Star, Flame } from "lucide-react";
import React from "react";

type BadgeBarProps = {
  badges: string[];
};

const badgeIconByName = (name: string) => {
  if (name.toLowerCase().includes("streak")) return <Flame className="text-orange-400" />;
  if (name.toLowerCase().includes("flittig")) return <Star className="text-yellow-500" />;
  return <BadgeCheck className="text-sky-600" />;
}

export default function BadgeBar({ badges }: BadgeBarProps) {
  if (!badges.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-8 w-full max-w-xl mx-auto items-center justify-center">
      {badges.map((badge, idx) => (
        <span key={idx} className="flex items-center bg-gradient-to-r from-purple-50 to-purple-100 rounded-full px-3 py-1 text-xs font-medium text-purple-700 shadow animate-fade-in">
          {badgeIconByName(badge)}
          <span className="ml-1">{badge}</span>
        </span>
      ))}
    </div>
  )
}
