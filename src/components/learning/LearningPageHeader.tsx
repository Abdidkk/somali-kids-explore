import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChildProgressBar from "@/components/ChildProgressBar";
import BadgeBar from "@/components/BadgeBar";
import ContinueCard from "@/components/ContinueCard";

interface LearningPageHeaderProps {
  child: {
    name: string;
    progress: number;
    streak: number;
    badges: string[];
    lastCategory: string | null;
    lastPercent: number;
  };
  onBack: () => void;
  onContinue: (category: string) => void;
}

const LearningPageHeader: React.FC<LearningPageHeaderProps> = ({ 
  child, 
  onBack,
  onContinue 
}) => {
  const showContinue = !!child.lastCategory;

  return (
    <>
      <div className="absolute left-4 top-4 z-20">
        <Button onClick={onBack} variant="outline" size="sm" className="flex items-center gap-1 border-blue-200 text-blue-600">
          <ArrowLeft className="w-4 h-4" />
          Tilbage
        </Button>
      </div>
      
      <ChildProgressBar name={child.name} progress={child.progress} streak={child.streak} />
      <BadgeBar badges={child.badges} />

      {showContinue && (
        <ContinueCard 
          lastCategory={child.lastCategory} 
          percent={child.lastPercent} 
          onContinue={() => onContinue(child.lastCategory!)} 
        />
      )}

      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Læringskategorier</h1>
      <p className="text-lg text-gray-700 max-w-xl mb-8 text-center">
        Vælg en kategori og begynd at lære nye ting på dansk og somali!
      </p>
    </>
  );
};

export default LearningPageHeader;
