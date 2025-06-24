
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { familyData, getFamilyByCategory } from "@/constants/familyData";
import { speakUsingSynthesis } from "@/utils/speechUtils";
import { useIsMobile } from "@/hooks/use-mobile";

interface FamilyListenActivityProps {
  onBack: () => void;
}

type CategoryType = 'Familie' | 'Mennesker' | 'Følelser';

const FamilyListenActivity: React.FC<FamilyListenActivityProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<CategoryType>('Familie');
  const isMobile = useIsMobile();

  const handleItemClick = (item: FamilyItem) => {
    if (item.audio) {
      // Spil din egen audio-fil
      const audio = new Audio(item.audio);
      audio.play().catch((error) => {
        console.error("Audio kunne ikke afspilles:", error);
        // Fallback til speech synthesis hvis audio fejler
        speakUsingSynthesis(item.somali);
      });
    } else {
      // Brug speech synthesis hvis ingen audio-fil
      speakUsingSynthesis(item.somali);
    }
  };

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab as CategoryType);
  };

  const renderItemGrid = (category: CategoryType) => {
    const items = getFamilyByCategory(category);
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(item)}
            className="bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-105 border-2 border-transparent hover:border-blue-200"
          >
    
          {/* Rigtige billeder */}
          <div className="w-full h-24 md:h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 md:mb-4 flex items-center justify-center overflow-hidden">
          <img
          src={item.image}
          alt={item.danish}
          className="w-full h-full object-cover rounded-lg"
          />
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
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
        Lyt og lær familie og følelser
      </h3>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-2xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="Familie">Familie</TabsTrigger>
          <TabsTrigger value="Mennesker">Mennesker</TabsTrigger>
          <TabsTrigger value="Følelser">Følelser</TabsTrigger>
        </TabsList>
        
        <TabsContent value="Familie" className="mt-6">
          {renderItemGrid('Familie')}
        </TabsContent>
        
        <TabsContent value="Mennesker" className="mt-6">
          {renderItemGrid('Mennesker')}
        </TabsContent>
        
        <TabsContent value="Følelser" className="mt-6">
          {renderItemGrid('Følelser')}
        </TabsContent>
      </Tabs>

      <div className="mt-6 md:mt-8 text-center">
        <p className={`text-gray-600 ${isMobile ? 'text-sm' : 'text-base'}`}>
          Klik på et billede for at høre ordet på somalisk
        </p>
      </div>
    </div>
  );
};

export default FamilyListenActivity;
