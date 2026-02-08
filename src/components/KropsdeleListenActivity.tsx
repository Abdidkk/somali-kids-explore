
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { speakUsingSynthesis } from "@/utils/speechUtils";
import { getBodyPartsByCategory, BodyPartItem } from "@/constants/bodyPartsData";

interface KropsdeleListenActivityProps {
  onBack: () => void;
}

const KropsdeleListenActivity: React.FC<KropsdeleListenActivityProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("kropsdele");

  const handleItemClick = (item: BodyPartItem) => {
    if (item.audio) {
      const audio = new Audio(item.audio);
      audio.play().catch(() => {
        speakUsingSynthesis(item.somali);
      });
    } else {
      speakUsingSynthesis(item.somali);
    }
  }; 

  const getItemsForTab = (tab: string): BodyPartItem[] => {
    switch (tab) {
      case "kropsdele":
        return getBodyPartsByCategory("kropsdele");
      case "humør":
        return getBodyPartsByCategory("humør");
      case "kropstype":
        return getBodyPartsByCategory("kropstype");
      default:
        return getBodyPartsByCategory("kropsdele");
    }
  };

  const getItemImage = (item: BodyPartItem) => {
    // Using placeholder icons for now - you can add specific images later
    return "/lovable-uploads/5f3c2e5c-8a56-4baf-8c3f-4d8ecbe1f924.png";
  };

  const renderItemGrid = (items: BodyPartItem[]) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleItemClick(item)}
          className="bg-white border-2 border-teal-200 rounded-lg p-4 hover:bg-teal-50 hover:border-teal-300 transition-all hover:scale-105 shadow-sm hover:shadow-md"
        >
          <div className="flex flex-col items-center gap-2">
            <img
              src={item.image}
              alt={item.danish}
              className="w-20 h-20 object-contain"
            />
            <div className="text-center">
              <div className="font-semibold text-gray-800 text-sm">{item.danish}</div>
              <div className="text-teal-600 text-xs font-medium">{item.somali}</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h3 className="text-xl font-semibold text-teal-700 mb-4 text-center">
        Lyt og lær kropsdele
      </h3>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-green-100 rounded-xl p-1 h-auto">
  <TabsTrigger 
    value="kropsdele"
    className="rounded-lg py-2.5 px-2 text-sm font-semibold data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
  >
    👀 kropsdele
  </TabsTrigger>
  <TabsTrigger 
    value="humør"
    className="rounded-lg py-2.5 px-2 text-sm font-semibold data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
  >
    😍 humør
  </TabsTrigger>
  <TabsTrigger 
    value="kropstype"
    className="rounded-lg py-2.5 px-2 text-sm font-semibold data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
  >
    🏃 kropstype
  </TabsTrigger>
</TabsList>
        
        <TabsContent value="kropsdele">
          {renderItemGrid(getItemsForTab("kropsdele"))}
        </TabsContent>
        
        <TabsContent value="humør">
          {renderItemGrid(getItemsForTab("humør"))}
        </TabsContent>
        
        <TabsContent value="kropstype">
          {renderItemGrid(getItemsForTab("kropstype"))}
        </TabsContent>
      </Tabs>
      
      <p className="text-center text-gray-600 text-sm mt-4">
        Klik på et billede for at høre, hvordan det udtales på somalisk
      </p>
    </div>
  );
};

export default KropsdeleListenActivity;
