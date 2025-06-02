
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, ArrowLeft } from "lucide-react";
import { familyData, categoryTitles } from "@/constants/familyData";
import { speakUsingSynthesis } from "@/utils/speechUtils";
import { useIsMobile } from "@/hooks/use-mobile";

interface FamilyListenActivityProps {
  onBack: () => void;
}

const FamilyListenActivity: React.FC<FamilyListenActivityProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<'family' | 'people' | 'feelings'>('family');
  const isMobile = useIsMobile();

  const handlePlaySound = (somaliText: string) => {
    speakUsingSynthesis(somaliText);
  };

  const getCategoryData = (category: 'family' | 'people' | 'feelings') => {
    return familyData.filter(item => item.category === category);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button onClick={onBack} variant="outline" size="sm" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Tilbage
        </Button>
        <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-pink-700`}>
          Lyt og lær - Familie og venner
        </h3>
      </div>

      {/* Category Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(categoryTitles).map(([key, title]) => (
          <Button
            key={key}
            onClick={() => setSelectedCategory(key as 'family' | 'people' | 'feelings')}
            variant={selectedCategory === key ? "default" : "outline"}
            className={`${isMobile ? 'text-sm px-3 py-2' : 'px-4 py-2'} ${
              selectedCategory === key ? 'bg-pink-600 hover:bg-pink-700' : 'border-pink-300 text-pink-600 hover:bg-pink-50'
            }`}
          >
            {title}
          </Button>
        ))}
      </div>

      {/* Family Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {getCategoryData(selectedCategory).map((item, index) => (
          <div 
            key={index} 
            className="bg-pink-50 border-2 border-pink-200 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer hover:bg-pink-100"
            onClick={() => handlePlaySound(item.somali)}
          >
            <div className="aspect-square bg-white rounded-lg mb-3 flex items-center justify-center overflow-hidden">
              <img 
                src={item.image} 
                alt={item.danish}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-center">
              <p className={`font-semibold text-gray-800 ${isMobile ? 'text-sm' : 'text-base'} mb-1`}>
                {item.danish}
              </p>
              <p className={`text-pink-600 ${isMobile ? 'text-xs' : 'text-sm'} mb-2`}>
                {item.somali}
              </p>
              <Button 
                size="sm" 
                className="bg-pink-600 hover:bg-pink-700 text-white w-full flex items-center justify-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlaySound(item.somali);
                }}
              >
                <Volume2 className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                {isMobile ? 'Lyt' : 'Lyt'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyListenActivity;
