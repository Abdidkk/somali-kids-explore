import React, { useState, useEffect, useRef } from "react";
import { DndContext, PointerSensor, TouchSensor, useSensor, useSensors, useDraggable, useDroppable } from "@dnd-kit/core";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { WEEKDAYS, MONTHS, getCalendarItemColor } from "@/constants/calendarData";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import ScoreDisplay from "@/components/alphabet/guess/ScoreDisplay";
import { recordQuizResultAuto } from "@/utils/quizRecorder";

interface Props {
  onBack: () => void;
  selectedChild?: string;
}

/* ── Sub-components ── */

function DroppableSlot({ id, className, children }: { id: string; className: string; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`${className} ${isOver ? 'ring-2 ring-purple-400' : ''}`}>
      {children}
    </div>
  );
}

function DraggableTile({ id, disabled, className, style, children }: { id: string; disabled: boolean; className: string; style?: React.CSSProperties; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id, disabled });
  const dragStyle = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...dragStyle }}
      className={`${className} ${isDragging ? 'opacity-60 transition-none' : 'transition-transform duration-150'}`}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}

/* ── Main component ── */

export default function CalendarDragDropActivity({ onBack, selectedChild }: Props) {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [tab, setTab] = useState<"weekdays" | "months">("weekdays");
  const [weekdayOrder, setWeekdayOrder] = useState<string[]>([]);
  const [monthOrder, setMonthOrder] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showScoreAnimation, setShowScoreAnimation] = useState(false);
  const savedRef = useRef(false);

  useEffect(() => {
    const currentItems = tab === "weekdays" ? WEEKDAYS : MONTHS;
    const currentOrder = tab === "weekdays" ? weekdayOrder : monthOrder;
    const correctOrder = currentItems.map(item => item.somali);
    const isCorrect = currentOrder.every((item, idx) => item === correctOrder[idx]);

    if (isCorrect && currentOrder.filter(Boolean).length === currentItems.length && !savedRef.current) {
      savedRef.current = true;
      recordQuizResultAuto({
        category: "Kalender",
        activityName: `Drag & Drop (${tab === "weekdays" ? "ugedage" : "måneder"})`,
        correct: currentItems.length,
        total: currentItems.length,
        selectedChild,
      });
      playSuccessSound();
    }
  }, [weekdayOrder, monthOrder, tab, selectedChild]);

  useEffect(() => {
    savedRef.current = false;
  }, [tab]);

  const currentItems = tab === "weekdays" ? WEEKDAYS : MONTHS;
  const currentOrder = tab === "weekdays" ? weekdayOrder : monthOrder;
  const setCurrentOrder = tab === "weekdays" ? setWeekdayOrder : setMonthOrder;

  const shuffledItems = React.useMemo(() => {
    return [...currentItems].sort(() => Math.random() - 0.5);
  }, [currentItems, tab]);

  const playAudio = (item: any) => {
    const audioSrc = typeof item === "string"
      ? currentItems.find(i => i.somali === item)?.audio
      : item?.audio;
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.play().catch((error) => console.error("Error playing audio:", error));
    }
  };

  const playSuccessSound = () => {
    const audio = new Audio('/feedback/sifiicanayuusamaysay.mp3');
    audio.play().catch(() => {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      const duration = 2;
      const sampleRate = audioContext.sampleRate;
      const frameCount = sampleRate * duration;
      const arrayBuffer = audioContext.createBuffer(1, frameCount, sampleRate);
      const channelData = arrayBuffer.getChannelData(0);
      for (let i = 0; i < frameCount; i++) {
        const time = i / sampleRate;
        const envelope = Math.exp(-time * 2) * (0.5 + 0.5 * Math.sin(time * 20));
        channelData[i] = (Math.random() * 2 - 1) * envelope * 0.3;
      }
      const source = audioContext.createBufferSource();
      source.buffer = arrayBuffer;
      source.connect(audioContext.destination);
      source.start();
    });
  };

  /* ── @dnd-kit sensors & handler ── */

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  const handleDragEnd = (event: { active: { id: string | number }; over: { id: string | number } | null }) => {
    if (!event.over) return;
    const draggedSomali = String(event.active.id);
    const targetPosition = Number(event.over.id);
    if (currentOrder[targetPosition]) return;
    const newOrder = [...currentOrder];
    newOrder[targetPosition] = draggedSomali;
    setCurrentOrder(newOrder);
  };

  const removeFromOrder = (position: number) => {
    const newOrder = [...currentOrder];
    newOrder[position] = "";
    setCurrentOrder(newOrder);
  };

  const checkAnswer = () => {
    const correctOrder = currentItems.map(item => item.somali);
    const isCorrect = currentOrder.every((item, idx) => item === correctOrder[idx]);
    if (isCorrect) {
      playSuccessSound();
      toast({ title: "Fantastisk! 🎉", description: "Du har sat dem i korrekt rækkefølge!", duration: 3000 });
    } else {
      toast({ title: "Prøv igen!", description: "Nogle er ikke i den rigtige rækkefølge.", variant: "destructive", duration: 3000 });
    }
  };

  const resetGame = () => {
    setCurrentOrder([]);
    savedRef.current = false;
  };

  return (
    <div className="flex flex-col items-center mt-3 md:mt-5 gap-4 md:gap-5 relative">
      <ScoreDisplay score={score} animate={showScoreAnimation} />
      <Tabs value={tab} onValueChange={v => setTab(v as "weekdays" | "months")} className="w-full flex flex-col items-center">
        <TabsList className="grid w-full grid-cols-2 bg-purple-100 rounded-xl p-1 h-auto">
          <TabsTrigger
            value="weekdays"
            className="rounded-lg py-2.5 px-2 text-sm font-semibold data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
          >
            📅 Ugedage
          </TabsTrigger>
          <TabsTrigger
            value="months"
            className="rounded-lg py-2.5 px-2 text-sm font-semibold data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
          >
            🌅 Måned
          </TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="w-full flex flex-col items-center gap-4">
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-medium text-gray-700 text-center`}>
            Træk {tab === "weekdays" ? "ugedagene" : "månederne"} i korrekt rækkefølge
          </h3>

          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            {/* Drop zones */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-4xl">
              {currentItems.map((_, idx) => (
                <DroppableSlot
                  key={idx}
                  id={String(idx)}
                  className={`border-2 border-dashed border-gray-300 rounded-lg p-3 md:p-4 min-h-16 md:min-h-20 flex items-center justify-center text-center ${
                    currentOrder[idx] ? 'bg-green-50 border-green-300' : 'bg-gray-50'
                  }`}
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
                    <span className="text-gray-400 text-xs md:text-sm">Træk her. {idx + 1}</span>
                  )}
                </DroppableSlot>
              ))}
            </div>

            {/* Available items to drag */}
            <div className="w-full max-w-4xl">
              <h4 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-gray-700 mb-3`}>
                Tilgængelige {tab === "weekdays" ? "ugedage" : "måneder"}:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {shuffledItems.map((item) => {
                  const isUsed = currentOrder.includes(item.somali);
                  return (
                    <div key={item.somali} className="flex items-center gap-2">
                      <DraggableTile
                        id={item.somali}
                        disabled={isUsed}
                        className={`p-3 rounded-lg text-white font-medium text-center flex-1 touch-none select-none ${
                          isUsed ? 'opacity-30 cursor-not-allowed' : 'cursor-grab hover:scale-105'
                        } ${isMobile ? 'text-xs' : 'text-sm'}`}
                        style={{ backgroundColor: getCalendarItemColor(shuffledItems.indexOf(item), tab) }}
                      >
                        {item.somali}
                      </DraggableTile>
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
          </DndContext>

          {/* Action buttons */}
          <div className="flex gap-3 mt-4">
            <Button
              onClick={checkAnswer}
              disabled={currentOrder.filter(Boolean).length !== currentItems.length}
              className="bg-green-600 hover:bg-green-700"
            >
              Tjek svar
            </Button>
            <Button onClick={resetGame} variant="outline">
              Start forfra
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

