
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { WEEKDAYS, MONTHS, getCalendarItemColor } from "@/constants/calendarData";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

interface Props {
  onBack: () => void;
}

export default function CalendarDragDropActivity({ onBack }: Props) {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [tab, setTab] = useState<"weekdays" | "months">("weekdays");
  const [weekdayOrder, setWeekdayOrder] = useState<string[]>([]);
  const [monthOrder, setMonthOrder] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const currentItems = tab === "weekdays" ? WEEKDAYS : MONTHS;
  const currentOrder = tab === "weekdays" ? weekdayOrder : monthOrder;
  const setCurrentOrder = tab === "weekdays" ? setWeekdayOrder : setMonthOrder;

  const shuffledItems = React.useMemo(() => {
    return [...currentItems].sort(() => Math.random() - 0.5);
  }, [currentItems, tab]);

  const playAudio = (item: any) => {
    if (item.audio) {
        const audio = new Audio(item.audio);
        audio.play()
        .then(() => {
            console.log("Audio played successfully");
        })
        .catch((error) => {
            console.error("Error playing audio:", error);
        });
    }
}; 

  const playApplauseSound = () => {
    // Create applause sound effect using Web Audio API
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContextClass();
    
    // Create a simple applause-like sound effect
    const duration = 2; // 2 seconds
    const sampleRate = audioContext.sampleRate;
    const frameCount = sampleRate * duration;
    const arrayBuffer = audioContext.createBuffer(1, frameCount, sampleRate);
    const channelData = arrayBuffer.getChannelData(0);
    
    // Generate applause-like noise
    for (let i = 0; i < frameCount; i++) {
      // Create bursts of noise to simulate clapping
      const time = i / sampleRate;
      const envelope = Math.exp(-time * 2) * (0.5 + 0.5 * Math.sin(time * 20));
      channelData[i] = (Math.random() * 2 - 1) * envelope * 0.3;
    }
    
    const source = audioContext.createBufferSource();
    source.buffer = arrayBuffer;
    source.connect(audioContext.destination);
    source.start();
  };

  const handleDragStart = (e: React.DragEvent, item: { danish: string; somali: string }) => {
    e.dataTransfer.setData("text/plain", item.somali);
  };

  const handleDrop = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData("text/plain");
    
    if (currentOrder[position]) return; // Position already occupied
    
    const newOrder = [...currentOrder];
    newOrder[position] = draggedItem;
    setCurrentOrder(newOrder);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFromOrder = (position: number) => {
    const newOrder = [...currentOrder];
    newOrder[position] = "";
    setCurrentOrder(newOrder);
  };

  const checkAnswer = () => {
    const correctOrder = currentItems.map(item => item.somali);
    const isCorrect = currentOrder.every((item, idx) => item === correctOrder[idx]);
    setShowResult(true);
    
    if (isCorrect) {
      playApplauseSound();
      toast({
        title: "Fantastisk! 🎉",
        description: "Du har sat dem i korrekt rækkefølge!",
        duration: 3000,
      });
    } else {
      toast({
        title: "Prøv igen!",
        description: "Nogle er ikke i den rigtige rækkefølge.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const resetGame = () => {
    setCurrentOrder([]);
    setShowResult(false);
  };

  return (
    <div className="flex flex-col items-center mt-3 md:mt-5 gap-4 md:gap-5">
      <Tabs value={tab} onValueChange={v => setTab(v as "weekdays" | "months")} className="w-full flex flex-col items-center">
        <TabsList className={`mb-3 md:mb-4 bg-violet-50 ${isMobile ? 'text-xs' : ''}`}>
          <TabsTrigger value="weekdays">Ugedage</TabsTrigger>
          <TabsTrigger value="months">Måneder</TabsTrigger>
        </TabsList>
        
        <TabsContent value={tab} className="w-full flex flex-col items-center gap-4">
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-medium text-gray-700 text-center`}>
            Træk {tab === "weekdays" ? "ugedagene" : "månederne"} i korrekt rækkefølge
          </h3>
          
          {/* Drop zones */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-4xl">
            {currentItems.map((_, idx) => (
              <div
                key={idx}
                className={`border-2 border-dashed border-gray-300 rounded-lg p-3 md:p-4 min-h-16 md:min-h-20 flex items-center justify-center text-center ${
                  currentOrder[idx] ? 'bg-green-50 border-green-300' : 'bg-gray-50'
                }`}
                onDrop={(e) => handleDrop(e, idx)}
                onDragOver={handleDragOver}
              >
                {currentOrder[idx] ? (
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-2 rounded-lg text-white font-medium cursor-pointer ${isMobile ? 'text-xs' : 'text-sm'}`}
                      style={{ backgroundColor: getCalendarItemColor(idx, tab) }}
                      onClick={() => removeFromOrder(idx)}
                    >
                      {currentOrder[idx]}
                    </div>
                    <Button
                      onClick={() => playAudio(currentOrder[idx])}
                      variant="outline"
                      size="sm"
                      className="p-1 h-6 w-6"
                    >
                      <Volume2 className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <span className="text-gray-400 text-xs md:text-sm">Træk her.{idx + 1}</span>
                )}
              </div>
            ))}
          </div>
          
          {/* Available items to drag */}
          <div className="w-full max-w-4xl">
            <h4 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-gray-700 mb-3`}>
              Tilgængelige {tab === "weekdays" ? "ugedage" : "måneder"}:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {shuffledItems.map((item, idx) => {
                const isUsed = currentOrder.includes(item.somali);
                return (
                  <div
                    key={item.somali}
                    className="flex items-center gap-2"
                  >
                    <div
                      draggable={!isUsed}
                      onDragStart={(e) => handleDragStart(e, item)}
                      className={`p-3 rounded-lg text-white font-medium text-center cursor-move transition-all flex-1 ${
                        isUsed ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105'
                      } ${isMobile ? 'text-xs' : 'text-sm'}`}
                      style={{ backgroundColor: getCalendarItemColor(shuffledItems.indexOf(item), tab) }}
                    >
                      {item.somali}
                    </div>
                    <Button
                      onClick={() => playAudio(item)}
                      variant="outline"
                      size="sm"
                      className="p-1 h-8 w-8 flex-shrink-0"
                      disabled={isUsed}
                    >
                      <Volume2 className="w-3 h-3" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-3 mt-4">
            <Button 
              onClick={checkAnswer}
              disabled={currentOrder.filter(Boolean).length !== currentItems.length}
              className="bg-green-600 hover:bg-green-700"
            >
              Tjek svar
            </Button>
            <Button 
              onClick={resetGame}
              variant="outline"
            >
              Start forfra
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
