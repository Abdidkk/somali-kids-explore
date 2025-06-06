
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { familyData, getFamilyByCategory } from "@/constants/familyData";
import { speakUsingSynthesis } from "@/utils/speechUtils";
import { useIsMobile } from "@/hooks/use-mobile";

interface FamilyListenActivityProps {
  onBack: () => void;
}

type CategoryType = 'Familie' | 'Mennesker' | 'Følelser';

const FamilyListenActivity: React.FC<FamilyListenActivityProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Familie');
  const isMobile = useIsMobile();

  const handleItemClick = (somaliWord: string) => {
    speakUsingSynthesis(somaliWord);
  };

  const categories = [
    { key: 'Familie' as CategoryType, name: 'Familie', color: 'bg-pink-100 border-pink-300', textColor: 'text-pink-700' },
    { key: 'Mennesker' as CategoryType, name: 'Mennesker', color: 'bg-blue-100 border-blue-300', textColor: 'text-blue-700' },
    { key: 'Følelser' as CategoryType, name: 'Følelser', color: 'bg-purple-100 border-purple-300', textColor: 'text-purple-700' }
  ];

  const currentItems = getFamilyByCategory(selectedCategory);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Category Selection */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6 md:mb-8">
        {categories.map((category) => (
          <Button
            key={category.key}
            variant={selectedCategory === category.key ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.key)}
            className={`${isMobile ? 'text-sm px-3 py-2' : 'text-base px-4 py-2'} transition-all ${
              selectedCategory === category.key 
                ? `${category.color} ${category.textColor} border-2` 
                : 'hover:bg-gray-50'
            }`}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {currentItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(item.somali)}
            className="bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-105 border-2 border-transparent hover:border-blue-200"
          >
            {/* Placeholder for image */}
            <div className="w-full h-24 md:h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 md:mb-4 flex items-center justify-center">
              <div className={`${isMobile ? 'text-2xl' : 'text-4xl'}`}>
                {selectedCategory === 'Familie' && '👨‍👩‍👧‍👦'}
                {selectedCategory === 'Mennesker' && '👫'}
                {selectedCategory === 'Følelser' && '😊'}
              </div>
            </div>
            
            <h3 className={`font-bold text-gray-800 mb-1 text-center ${isMobile ? 'text-sm' : 'text-base'}`}>
              {item.danish}
            </h3>
            <p className={`text-blue-600 font-semibold text-center ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {item.somali}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 md:mt-8 text-center">
        <p className={`text-gray-600 ${isMobile ? 'text-sm' : 'text-base'}`}>
          Klik på et billede for at høre ordet på somalisk
        </p>
      </div>
    </div>
  );
};

export default FamilyListenActivity;
