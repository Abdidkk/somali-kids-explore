
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { CONTINENTS, COUNTRIES, NATURE_LANDSCAPES, getGeographyItemColor } from "@/constants/geographyData";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import ScoreDisplay from "@/components/alphabet/guess/ScoreDisplay";
import { PointsManager } from "@/utils/pointsManager";

interface Props {
  onBack: () => void;
}

export default function GeographyDragDropActivity({ onBack }: Props) {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [tab, setTab] = useState<"continents" | "countries" | "nature">("continents");
  const [continentOrder, setContinentOrder] = useState<string[]>([]);
  const [countryOrder, setCountryOrder] = useState<string[]>([]);
  const [natureOrder, setNatureOrder] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showScoreAnimation, setShowScoreAnimation] = useState(false);

  // Load initial score
  useEffect(() => {
    const loadScore = async () => {
      const initialScore = await PointsManager.getCategoryScore("Geografi");
      setScore(initialScore);
    };
    loadScore();
  }, []);

  const getCurrentData = () => {
    switch (tab) {
      case "continents": return { items: CONTINENTS, order: continentOrder, setOrder: setContinentOrder };
      case "countries": return { items: COUNTRIES.slice(0, 8), order: countryOrder, setOrder: setCountryOrder }; // Begræns til 8 for bedre UX
      case "nature": return { items: NATURE_LANDSCAPES, order: natureOrder, setOrder: setNatureOrder };
    }
  };

  const { items, order, setOrder } = getCurrentData();

  const shuffledItems = React.useMemo(() => {
    return [...items].sort(() => Math.random() - 0.5);
  }, [items, tab]);

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
  };

  const handleDragStart = (e: React.DragEvent, item: any) => {
    e.dataTransfer.setData("text/plain", item.somali);
  };

  const handleDrop = (e: React.DragEvent, targetDanish: string) => {
    e.preventDefault();
    const draggedSomali = e.dataTransfer.getData("text/plain");
    
    if (order.find(item => item === draggedSomali)) return; // Already placed
    
    const newOrder = [...order];
    const targetIndex = items.findIndex(item => item.danish === targetDanish);
    newOrder[targetIndex] = draggedSomali;
    setOrder(newOrder);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFromOrder = (index: number) => {
    const newOrder = [...order];
    newOrder[index] = "";
    setOrder(newOrder);
  };

  const checkAnswer = () => {
    const correctMatches = items.filter((item, idx) => order[idx] === item.somali);
    const isCorrect = correctMatches.length === items.length;
    const earnedPoints = PointsManager.calculatePoints(correctMatches.length, items.length, isCorrect);
    
    if (isCorrect) {
      playApplauseSound();
      
      // Add points and update score
      PointsManager.addScore({
        category: "Geografi",
        activity: `Drag & Drop - ${tab}`,
        score: earnedPoints,
        maxScore: 100,
        timestamp: new Date().toISOString()
      });
      
      setScore(prev => prev + earnedPoints);
      setShowScoreAnimation(true);
      setTimeout(() => setShowScoreAnimation(false), 2000);
      
      toast({
        title: "Fantastisk! 🎉",
        description: `Du har matchet alle korrekt og fået ${earnedPoints} point!`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Prøv igen!",
        description: `Du har ${correctMatches.length} ud af ${items.length} korrekte.`,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const resetGame = () => {
    setOrder([]);
  };

  return (
    <div className="flex flex-col items-center mt-3 md:mt-5 gap-4 md:gap-5 relative">
      <ScoreDisplay score={score} animate={showScoreAnimation} />
      <Tabs value={tab} onValueChange={v => setTab(v as "continents" | "countries" | "nature")} className="w-full flex flex-col items-center">
        <TabsList className={`mb-3 md:mb-4 bg-green-50 ${isMobile ? 'text-xs' : ''}`}>
          <TabsTrigger value="continents">Kontinenter</TabsTrigger>
          <TabsTrigger value="countries">Lande</TabsTrigger>
          <TabsTrigger value="nature">Natur</TabsTrigger>
        </TabsList>
        
        <TabsContent value={tab} className="w-full flex flex-col items-center gap-4">
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-medium text-gray-700 text-center`}>
            Træk det somaliske navn til det rigtige danske navn
          </h3>
          
          {/* Drop zones - Danish names */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-5xl">
            {items.map((item, idx) => (
              <div
                key={item.danish}
                className={`border-2 border-dashed border-gray-300 rounded-lg p-3 md:p-4 min-h-20 md:min-h-24 flex flex-col items-center justify-center text-center ${
                  order[idx] ? 'bg-green-50 border-green-300' : 'bg-gray-50'
                }`}
                onDrop={(e) => handleDrop(e, item.danish)}
                onDragOver={handleDragOver}
              >
                <div className={`font-medium text-gray-700 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {tab === "countries" && (item as any).flag && (
                    <div className="text-2xl mb-1">{(item as any).flag}</div>
                  )}
                  {tab === "nature" && (item as any).emoji && (
                    <div className="text-2xl mb-1">{(item as any).emoji}</div>
                  )}
                  {tab === "continents" && <div className="text-xl mb-1">🌍</div>}
                  {item.danish}
                </div>
                {order[idx] ? (
                  <div className="flex items-center gap-1">
                    <div
                      className={`px-2 py-1 rounded text-white font-medium cursor-pointer ${isMobile ? 'text-xs' : 'text-sm'}`}
                      style={{ backgroundColor: getGeographyItemColor(idx, tab) }}
                      onClick={() => removeFromOrder(idx)}
                    >
                      {order[idx]}
                    </div>
                    <Button
                      onClick={() => playAudio(order[idx])}
                      variant="outline"
                      size="sm"
                      className="p-1 h-6 w-6"
                    >
                      <Volume2 className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <span className="text-gray-400 text-xs">Træk her</span>
                )}
              </div>
            ))}
          </div>
          
          {/* Available items to drag - Somali names */}
          <div className="w-full max-w-5xl">
            <h4 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-gray-700 mb-3`}>
              Tilgængelige somaliske navne:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {shuffledItems.map((item, idx) => {
                const isUsed = order.includes(item.somali);
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
                      style={{ backgroundColor: getGeographyItemColor(shuffledItems.indexOf(item), tab) }}
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
              disabled={order.filter(Boolean).length !== items.length}
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
