
import React, { useState } from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getFoodByCategory, FoodItem } from "@/constants/foodData";

interface FoodListenActivityProps {
  onBack: () => void;
}

export default function FoodListenActivity({ onBack }: FoodListenActivityProps) {
  const [activeTab, setActiveTab] = useState<"madvarer" | "frugter" | "grøntsager">("madvarer");
  
  const foods = getFoodByCategory(activeTab);

  const speakFood = (audioPath?: string, fallbackText?: string) => {
    if (audioPath) {
      const audio = new Audio(audioPath);
      audio.play().catch((err) => console.error("Lydfejl:", err));
    } else if (fallbackText) {
      const utterance = new SpeechSynthesisUtterance(fallbackText);
      utterance.lang = "so-SO";
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  }; 

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab as "madvarer" | "frugter" | "grøntsager");
  };

  return (
    
    <div className="flex flex-col items-center space-y-6 p-6">
      <h3 className="text-2xl font-bold text-orange-700 mb-4">Lyt og lær mad</h3>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-2xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="madvarer">Madvarer</TabsTrigger>
          <TabsTrigger value="frugter">Frugter</TabsTrigger>
          <TabsTrigger value="grøntsager">Grøntsager</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {foods.map((food) => (
          
            <div
             key={food.id}
              className="relative bg-white rounded-xl border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
             >
              <div className="p-4 text-center">
              <div className="w-20 h-20 mx-auto mb-3 bg-orange-50 rounded-full flex items-center justify-center">
      
            <div className="p-0.1 text-center">
          <img
          src={food.image}
          alt={food.somali}
                  className="w-20 h-20 mx-auto mb-1.5 rounded-full cover"
  />
</div> 

      </div>
      <h4 className="text-lg font-bold text-orange-700 mb-1">{food.somali}</h4>
      <p className="text-sm text-gray-600">{food.danish}</p>
    </div>

    {/* 🎧 Lyd-knap */}
     <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <Button onClick={() => speakFood(food.audio, food.somali)} size="icon">
        <Volume2 className="w-5 h-5" />
        </Button>
        </div>
        </div>
        ))} 
          </div>
          
        </TabsContent>
      </Tabs>

      <Button onClick={onBack} className="mt-6 bg-orange-600 hover:bg-orange-700">
        Tilbage til menu
      </Button>
    </div>
  );
}
