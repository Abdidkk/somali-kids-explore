import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { familyData, getFamilyByCategory, FamilyItem } from "@/constants/familyData";
import { speakWithAudioFallback } from "@/utils/speechUtils";
import { useIsMobile } from "@/hooks/use-mobile";


interface FamilyListenActivityProps {
  onBack: () => void;
}

type CategoryType = 'Familie' | 'Mennesker' | 'Følelser';

const FamilyListenActivity: React.FC<FamilyListenActivityProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<CategoryType>('Familie');
  const isMobile = useIsMobile();

  const handleItemClick = (item: FamilyItem) => {
    speakWithAudioFallback(item.somali, item.audio);
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
          <div className="w-full h-24 md:h-32  rounded-lg mb-3 md:mb-4 flex items-center justify-center overflow-hidden">
          <img
          src={item.image}
          alt={item.danish}
          className="w-24 h-24 object-cover rounded-lg"
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
      <TabsList className="grid w-full grid-cols-3 bg-pink-100 rounded-xl p-1 h-auto">
  <TabsTrigger 
    value="Familie"
    className="rounded-lg py-2.5 px-2 text-sm font-semibold data-[state=active]:bg-pink-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
  >
    👨🏾‍🦱👩🏾‍🦱 Familie
  </TabsTrigger>
  <TabsTrigger 
    value="Mennesker"
    className="rounded-lg py-2.5 px-2 text-sm font-semibold data-[state=active]:bg-pink-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
  >
    👨🏾‍⚕️👩🏾‍🏫 Mennesker
  </TabsTrigger>
  <TabsTrigger 
    value="Følelser"
    className="rounded-lg py-2.5 px-2 text-sm font-semibold data-[state=active]:bg-pink-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
  >
    😁 Følelser
  </TabsTrigger>
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
