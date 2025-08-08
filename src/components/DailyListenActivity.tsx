import React, { useState } from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getDailyByCategory } from "@/constants/dailyData";
import { speakWithAudioFallback } from "@/utils/speechUtils";

interface DailyListenActivityProps {
  onBack: () => void;
}

export default function DailyListenActivity({ onBack }: DailyListenActivityProps) {
  const [activeTab, setActiveTab] = useState<"morgen" | "eftermiddag" | "aften">("morgen");
  
  const activities = getDailyByCategory(activeTab); 

  const speakActivity = (audioPath?: string, fallbackText?: string) => {
    if (!audioPath && !fallbackText) return;
    speakWithAudioFallback(fallbackText || "", audioPath);
  };

  const handleTabChange = (newTab: "morgen" | "eftermiddag" | "aften") => {
    setActiveTab(newTab);
  }; 

  return (
    <main className="flex flex-col items-center space-y-6 p-6" role="main">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Lyt og lær daglige aktiviteter</h1>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-2xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="morgen">Morgen</TabsTrigger>
          <TabsTrigger value="eftermiddag">Eftermiddag</TabsTrigger>
          <TabsTrigger value="aften">Aften</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="relative bg-white rounded-xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => speakActivity(activity.audio, activity.somali)}
              >
                <div className="p-4 text-center">
                  <div className="w-20 h-20 mx-auto mb-3 bg-gray-50  flex items-center justify-center overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.somali}
                      className="w-26 h-26 object-cover"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-gray-700 mb-1">{activity.somali}</h4>
                  <p className="text-sm text-gray-600">{activity.danish}</p>
                </div>

                {/* 🎧 Lyd-knap */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      speakActivity(activity.audio, activity.somali);
                    }} 
                    size="icon"
                    variant="secondary"
                  >
                    <Volume2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))} 
          </div>
        </TabsContent>
      </Tabs>

      <Button onClick={onBack} className="mt-6 bg-gray-600 hover:bg-gray-700">
        Tilbage til menu
      </Button>
    </main>
  );
}
