
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { CALENDAR_GROUPS, getCalendarItemColor } from "@/constants/calendarData";
import { useIsMobile } from "@/hooks/use-mobile";

interface Props {
  onBack: () => void;
}

export default function CalendarListenActivity({ onBack }: Props) {
  const isMobile = useIsMobile();
  const [tab, setTab] = useState<"weekdays" | "months" | "seasons">("weekdays");
  const [selectedIdx, setSelectedIdx] = useState(0);
  
  const currentGroup = CALENDAR_GROUPS[tab];
  const selectedItem = currentGroup.items[selectedIdx] || currentGroup.items[0];

  const playAudio = () => {
    // Brug browser's speech synthesis som fallback
    const utter = new window.SpeechSynthesisUtterance(selectedItem.somali);
    utter.lang = "so-SO";
    utter.rate = 0.7;
    const hasSomali = window.speechSynthesis.getVoices().some(v => v.lang === "so-SO");
    if (!hasSomali) utter.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="flex flex-col items-center mt-3 md:mt-5 gap-4 md:gap-5">
      {/* Tabs */}
      <Tabs value={tab} onValueChange={v => setTab(v as "weekdays" | "months" | "seasons")} className="w-full flex flex-col items-center">
        <TabsList className={`mb-3 md:mb-4 bg-violet-50 ${isMobile ? 'text-xs' : ''}`}>
          <TabsTrigger value="weekdays">Ugedage</TabsTrigger>
          <TabsTrigger value="months">Måneder</TabsTrigger>
          <TabsTrigger value="seasons">Årstider</TabsTrigger>
        </TabsList>
        
        <TabsContent value={tab} className="w-full flex flex-col items-center">
          {/* Current item display */}
          <div className="flex flex-col items-center gap-4 md:gap-5 w-full">
            <div className={`flex flex-col items-center ${isMobile ? 'p-3' : 'p-5'}`}>
              <div 
                className={`${isMobile ? 'w-24 h-24' : 'w-32 h-32'} flex items-center justify-center rounded-lg font-bold text-white shadow-lg mb-3`}
                style={{ backgroundColor: getCalendarItemColor(selectedIdx, tab) }}
              >
                <div className="text-center">
                  <div className={`${isMobile ? 'text-sm' : 'text-lg'} font-medium`}>{selectedItem.danish}</div>
                  <div className={`${isMobile ? 'text-xs' : 'text-sm'} opacity-90`}>{selectedItem.somali}</div>
                </div>
              </div>
              
              {/* Play audio button */}
              <Button 
                onClick={playAudio} 
                variant="outline" 
                size={isMobile ? "default" : "lg"}
                className="mt-3 md:mt-4 flex gap-2"
              >
                <Volume2 className="w-5 h-5" /> Lyt
              </Button>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <button 
                onClick={() => setSelectedIdx(prev => Math.max(0, prev - 1))}
                disabled={selectedIdx === 0}
                className="bg-purple-100 hover:bg-purple-200 disabled:opacity-50 p-2 md:p-3 rounded-full"
                aria-label="Forrige"
              >
                ◀
              </button>
              <div className={`px-4 md:px-5 py-2 md:py-3 bg-purple-50 rounded-lg font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>
                {selectedIdx + 1} / {currentGroup.items.length}
              </div>
              <button 
                onClick={() => setSelectedIdx(prev => Math.min(currentGroup.items.length - 1, prev + 1))}
                disabled={selectedIdx >= currentGroup.items.length - 1}
                className="bg-purple-100 hover:bg-purple-200 disabled:opacity-50 p-2 md:p-3 rounded-full"
                aria-label="Næste"
              >
                ▶
              </button>
            </div>
            
            {/* Grid selector */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 max-w-md">
              {currentGroup.items.map((item, idx) => (
                <button
                  key={item.danish}
                  onClick={() => setSelectedIdx(idx)}
                  className={`p-2 md:p-3 rounded-lg text-white font-medium transition-all ${
                    selectedIdx === idx 
                      ? 'ring-2 ring-purple-400 ring-offset-2 scale-105' 
                      : 'hover:scale-105'
                  } ${isMobile ? 'text-xs' : 'text-sm'}`}
                  style={{ backgroundColor: getCalendarItemColor(idx, tab) }}
                >
                  <div>{item.danish}</div>
                  <div className="text-xs opacity-90">{item.somali}</div>
                </button>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
