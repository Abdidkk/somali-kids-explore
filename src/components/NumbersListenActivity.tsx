
import React, { useState } from "react";
import { Volume2, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getNumbersForTab } from "@/constants/numbersData";

interface NumbersListenActivityProps {
  onBack: () => void;
}

export default function NumbersListenActivity({ onBack }: NumbersListenActivityProps) {
  const [activeTab, setActiveTab] = useState<string>("1-19");
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const numbers = getNumbersForTab(activeTab);
  const currentNumber = numbers[currentIndex];

  const speakNumber = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "so-SO";
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  const nextNumber = () => {
    setCurrentIndex((prev) => (prev + 1) % numbers.length);
  };

  const prevNumber = () => {
    setCurrentIndex((prev) => (prev - 1 + numbers.length) % numbers.length);
  };

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    setCurrentIndex(0);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <h3 className="text-2xl font-bold text-blue-700 mb-4">Lyt og lær tal</h3>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-lg">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="1-19">1-19</TabsTrigger>
          <TabsTrigger value="20-90">20-90</TabsTrigger>
          <TabsTrigger value="100-1000">100-1000</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-48 h-48 rounded-xl border-4 border-blue-300 shadow-lg bg-blue-50 flex items-center justify-center">
                <span className="text-6xl font-bold text-blue-700">{currentNumber.number}</span>
              </div>
              
              <Button
                onClick={() => speakNumber(currentNumber.somali)}
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 rounded-full p-3"
                size="icon"
              >
                <Volume2 className="w-6 h-6" />
              </Button>
            </div>

            <div className="text-center space-y-2">
              <h4 className="text-3xl font-bold text-blue-700">{currentNumber.somali}</h4>
              <p className="text-lg text-gray-600">({currentNumber.danish})</p>
            </div>

            <div className="flex items-center gap-4">
              <Button onClick={prevNumber} variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              
              <span className="text-sm text-gray-500">
                {currentIndex + 1} af {numbers.length}
              </span>
              
              <Button onClick={nextNumber} variant="outline" size="icon">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Button onClick={onBack} className="mt-6 bg-blue-600 hover:bg-blue-700">
        Tilbage til menu
      </Button>
    </div>
  );
}
