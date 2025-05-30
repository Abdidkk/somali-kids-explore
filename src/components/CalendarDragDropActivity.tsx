
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { WEEKDAYS, MONTHS, getCalendarItemColor } from "@/constants/calendarData";
import { useIsMobile } from "@/hooks/use-mobile";

interface Props {
  onBack: () => void;
}

export default function CalendarDragDropActivity({ onBack }: Props) {
  const isMobile = useIsMobile();
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

  const handleDragStart = (e: React.DragEvent, item: { danish: string; somali: string }) => {
    e.dataTransfer.setData("text/plain", item.danish);
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
    const correctOrder = currentItems.map(item => item.danish);
    const isCorrect = currentOrder.every((item, idx) => item === correctOrder[idx]);
    setShowResult(true);
    
    if (isCorrect) {
      alert("Rigtig! Du har sat dem i korrekt rækkefølge!");
    } else {
      alert("Prøv igen! Nogle er ikke i den rigtige rækkefølge.");
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
                  <div
                    className={`p-2 rounded-lg text-white font-medium cursor-pointer ${isMobile ? 'text-xs' : 'text-sm'}`}
                    style={{ backgroundColor: getCalendarItemColor(idx, tab) }}
                    onClick={() => removeFromOrder(idx)}
                  >
                    {currentOrder[idx]}
                  </div>
                ) : (
                  <span className="text-gray-400 text-xs md:text-sm">Træk her</span>
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
                const isUsed = currentOrder.includes(item.danish);
                return (
                  <div
                    key={item.danish}
                    draggable={!isUsed}
                    onDragStart={(e) => handleDragStart(e, item)}
                    className={`p-3 rounded-lg text-white font-medium text-center cursor-move transition-all ${
                      isUsed ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105'
                    } ${isMobile ? 'text-xs' : 'text-sm'}`}
                    style={{ backgroundColor: getCalendarItemColor(shuffledItems.indexOf(item), tab) }}
                  >
                    <div>{item.danish}</div>
                    <div className="text-xs opacity-90">{item.somali}</div>
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
