
import React, { useState } from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getBodyPartsByCategory, BodyPartItem } from "@/constants/bodyPartsData";

interface BodyPartsListenActivityProps {
  onBack: () => void;
}

export default function BodyPartsListenActivity({ onBack }: BodyPartsListenActivityProps) {
  const [activeTab, setActiveTab] = useState<"kropsdele" | "humør" | "kropstype">("kropsdele");
  
  const bodyParts = getBodyPartsByCategory(activeTab);

  const speakBodyPart = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "so-SO";
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab as "kropsdele" | "humør" | "kropstype");
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <h3 className="text-2xl font-bold text-teal-700 mb-4">Lyt og lær kropsdele</h3>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-2xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="kropsdele">Kropsdele</TabsTrigger>
          <TabsTrigger value="humør">Humør</TabsTrigger>
          <TabsTrigger value="kropstype">Kropstype</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {bodyParts.map((bodyPart) => (
              <div
                key={bodyPart.id}
                className="relative bg-white rounded-xl border-2 border-teal-200 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => speakBodyPart(bodyPart.somali)}
              >
                <div className="p-4 text-center">
                  <div className="w-20 h-20 mx-auto mb-3 bg-teal-50 rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src={bodyPart.image} 
                      alt={bodyPart.danish}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-teal-700 mb-1">{bodyPart.somali}</h4>
                  <p className="text-sm text-gray-600">({bodyPart.danish})</p>
                </div>
                
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-teal-600 text-white p-2 rounded-full">
                    <Volume2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Button onClick={onBack} className="mt-6 bg-teal-600 hover:bg-teal-700">
        Tilbage til menu
      </Button>
    </div>
  );
}
