import React, { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import MultipleChoiceQuiz, { MCQuestion } from "@/components/quiz/MultipleChoiceQuiz";
import { AUDIO_FILES, ALPHABET_IMAGES } from "@/constants/alphabetData";
import { speakSomaliLetter } from "@/utils/speechUtils";
import { generateSequence, generateOptions } from "@/utils/alphabetGuessUtils";

interface Props {
  onBack: () => void;
}

export default function AlphabetGuessActivity({ onBack }: Props) {
  const [activeTab, setActiveTab] = useState<string>("alfabetet");
  const [seed, setSeed] = useState(0);

  // Generate questions for the active tab
  const questions = useMemo(() => {
    const questionsArray: MCQuestion[] = [];
    
    for (let i = 0; i < 5; i++) {
      const { sequence, answer } = generateSequence(activeTab);
      const options = generateOptions(answer, activeTab);
      
      // Create custom prompt node that displays the sequence
      const promptNode = (
        <div className="flex flex-col items-center gap-4">
          <div className="text-lg font-semibold text-purple-700 mb-3">
            Hvilket bogstav kommer efter:
          </div>
          
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {sequence.map((letter, index) => (
              <div key={`${letter}-${index}`} className="flex flex-col items-center">
                <div className="relative bg-white rounded-lg border-2 border-purple-200 p-4 shadow-sm">
                  {ALPHABET_IMAGES[letter] ? (
                    <img 
                      src={ALPHABET_IMAGES[letter].img} 
                      alt={ALPHABET_IMAGES[letter].alt}
                      className="w-16 h-16 object-contain"
                    />
                  ) : (
                    <div className="w-16 h-16 flex items-center justify-center text-2xl font-bold text-purple-700">
                      {letter}
                    </div>
                  )}
                  
                  <Button
                    onClick={() => speakSomaliLetter(letter, AUDIO_FILES)}
                    variant="ghost"
                    size="sm"
                    className="absolute -top-2 -right-2 w-6 h-6 p-0 bg-purple-100 hover:bg-purple-200 rounded-full"
                  >
                    <Volume2 className="w-3 h-3 text-purple-600" />
                  </Button>
                </div>
                
                {activeTab !== "alfabetet" && (
                  <div className="text-xs text-gray-600 mt-1 text-center">
                    {letter}
                  </div>
                )}
              </div>
            ))}
            
            {/* Question mark for the missing letter */}
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 rounded-lg border-2 border-purple-300 border-dashed p-4 w-20 h-20 flex items-center justify-center">
                <span className="text-4xl text-purple-400">?</span>
              </div>
            </div>
          </div>
        </div>
      );

      // Create options with images/text
      const mcOptions = options.map(option => ({
        id: option,
        label: activeTab !== "alfabetet" ? option : undefined,
        content: (
          <div className="flex items-center gap-3 w-full">
            {ALPHABET_IMAGES[option] ? (
              <img 
                src={ALPHABET_IMAGES[option].img} 
                alt={ALPHABET_IMAGES[option].alt}
                className="w-12 h-12 object-contain"
              />
            ) : (
              <div className="w-12 h-12 flex items-center justify-center text-xl font-bold text-purple-700 bg-purple-50 rounded">
                {option}
              </div>
            )}
            
            {activeTab !== "alfabetet" && (
              <span className="font-medium">{option}</span>
            )}
            
            <Button
              onClick={() => speakSomaliLetter(option, AUDIO_FILES)}
              variant="ghost"
              size="sm"
              className="ml-auto p-1 h-auto hover:bg-purple-100"
            >
              <Volume2 className="w-4 h-4 text-purple-600" />
            </Button>
          </div>
        )
      }));

      questionsArray.push({
        promptNode,
        options: mcOptions,
        correctId: answer
      });
    }
    
    return questionsArray;
  }, [activeTab, seed]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    setSeed(prev => prev + 1); // Force regeneration of questions
  };

  const handleRetry = () => {
    setSeed(prev => prev + 1); // Generate new questions
  };

  const getTabTitle = () => {
    switch(activeTab) {
      case "korte-vokaler": return "Korte vokaler quiz";
      case "lange-vokaler": return "Lange vokaler quiz";
      case "alfabetet": 
      default: return "Alfabet quiz";
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-4">
      {/* Tabs for letter groups */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-4xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="alfabetet">Alfabetet</TabsTrigger>
          <TabsTrigger value="korte-vokaler">Korte vokaler</TabsTrigger>
          <TabsTrigger value="lange-vokaler">Lange vokaler</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <MultipleChoiceQuiz
            key={`${activeTab}-${seed}`}
            title={getTabTitle()}
            category="Alfabet"
            activityName={`Alfabet Quiz - ${activeTab}`}
            questions={questions}
            theme="purple"
            onBack={onBack}
            onRetry={handleRetry}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

