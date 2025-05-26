
import React, { useState } from "react";
import { Volume2, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COLORS_DATA } from "@/constants/colorsData";

interface ColorsListenActivityProps {
  onBack: () => void;
}

export default function ColorsListenActivity({ onBack }: ColorsListenActivityProps) {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const currentColor = COLORS_DATA[currentColorIndex];

  const speakColor = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "so-SO";
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  const nextColor = () => {
    setCurrentColorIndex((prev) => (prev + 1) % COLORS_DATA.length);
  };

  const prevColor = () => {
    setCurrentColorIndex((prev) => (prev - 1 + COLORS_DATA.length) % COLORS_DATA.length);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <h3 className="text-2xl font-bold text-pink-700 mb-4">Lyt og lær farver</h3>
      
      <div className="relative">
        <div 
          className="w-48 h-48 rounded-full border-4 border-pink-300 shadow-lg"
          style={{ backgroundColor: currentColor.hex }}
        />
        
        <Button
          onClick={() => speakColor(currentColor.somali)}
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-pink-600 hover:bg-pink-700 rounded-full p-3"
          size="icon"
        >
          <Volume2 className="w-6 h-6" />
        </Button>
      </div>

      <div className="text-center space-y-2">
        <h4 className="text-3xl font-bold text-pink-700">{currentColor.somali}</h4>
        <p className="text-lg text-gray-600">({currentColor.danish})</p>
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={prevColor} variant="outline" size="icon">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        
        <span className="text-sm text-gray-500">
          {currentColorIndex + 1} af {COLORS_DATA.length}
        </span>
        
        <Button onClick={nextColor} variant="outline" size="icon">
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <Button onClick={onBack} className="mt-6 bg-pink-600 hover:bg-pink-700">
        Tilbage til menu
      </Button>
    </div>
  );
}
