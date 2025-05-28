
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, RefreshCw } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getBodyPartsByCategory, BodyPartItem } from "@/constants/bodyPartsData";

interface BodyPartsQuizActivityProps {
  onBack: () => void;
}

export default function BodyPartsQuizActivity({ onBack }: BodyPartsQuizActivityProps) {
  const [activeTab, setActiveTab] = useState<"kropsdele" | "humør" | "kropstype">("kropsdele");
  const [currentQuestion, setCurrentQuestion] = useState<BodyPartItem | null>(null);
  const [options, setOptions] = useState<BodyPartItem[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const bodyParts = getBodyPartsByCategory(activeTab);

  const generateQuestion = () => {
    const randomBodyPart = bodyParts[Math.floor(Math.random() * bodyParts.length)];
    const wrongOptions = bodyParts.filter(item => item.id !== randomBodyPart.id);
    const shuffledWrong = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
    const allOptions = [randomBodyPart, ...shuffledWrong].sort(() => 0.5 - Math.random());
    
    setCurrentQuestion(randomBodyPart);
    setOptions(allOptions);
    setSelectedAnswer(null);
    setShowResult(false);
    
    // Auto-play the sound when question loads
    setTimeout(() => {
      speakBodyPart(randomBodyPart.somali);
    }, 500);
  };

  useEffect(() => {
    if (bodyParts.length > 0) {
      generateQuestion();
    }
  }, [activeTab, bodyParts]);

  const speakBodyPart = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "so-SO";
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  const handleAnswer = (selectedBodyPart: BodyPartItem) => {
    setSelectedAnswer(selectedBodyPart.id);
    setShowResult(true);
    
    if (selectedBodyPart.id === currentQuestion?.id) {
      setScore(score + 1);
    }
    setQuestionsAnswered(questionsAnswered + 1);
  };

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab as "kropsdele" | "humør" | "kropstype");
    setScore(0);
    setQuestionsAnswered(0);
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <h3 className="text-2xl font-bold text-purple-700 mb-4">Test din viden</h3>
      
      <div className="text-lg text-gray-700 mb-4">
        Score: {score}/{questionsAnswered}
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-2xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="kropsdele">Kropsdele</TabsTrigger>
          <TabsTrigger value="humør">Humør</TabsTrigger>
          <TabsTrigger value="kropstype">Kropstype</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="text-center mb-6">
            <div className="mb-4">
              <div className="w-32 h-32 mx-auto bg-purple-50 rounded-full flex items-center justify-center overflow-hidden mb-4">
                <img 
                  src={currentQuestion.image} 
                  alt={currentQuestion.danish}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <p className="text-lg mb-4">Se billedet, hør ordet og vælg det rigtige svar:</p>
              <Button
                onClick={() => speakBodyPart(currentQuestion.somali)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Volume2 className="w-5 h-5 mr-2" />
                Afspil lyd igen
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {options.map((option) => (
              <div
                key={option.id}
                className={`
                  relative bg-white rounded-xl border-2 shadow-lg cursor-pointer transition-all p-4
                  ${!showResult ? 'border-gray-200 hover:border-purple-300' : ''}
                  ${showResult && selectedAnswer === option.id && option.id === currentQuestion.id ? 'border-green-500 bg-green-50' : ''}
                  ${showResult && selectedAnswer === option.id && option.id !== currentQuestion.id ? 'border-red-500 bg-red-50' : ''}
                  ${showResult && option.id === currentQuestion.id ? 'border-green-500 bg-green-50' : ''}
                `}
                onClick={() => !showResult && handleAnswer(option)}
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 bg-purple-50 rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src={option.image} 
                      alt={option.danish}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <p className="text-lg font-semibold text-purple-700">{option.danish}</p>
                </div>
              </div>
            ))}
          </div>

          {showResult && (
            <div className="text-center">
              {selectedAnswer === currentQuestion.id ? (
                <p className="text-green-600 font-bold text-xl mb-4">Korrekt! 🎉</p>
              ) : (
                <p className="text-red-500 font-bold text-xl mb-4">Prøv igen næste gang!</p>
              )}
              
              <Button
                onClick={generateQuestion}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Næste spørgsmål
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Button onClick={onBack} className="mt-6 bg-purple-600 hover:bg-purple-700">
        Tilbage til menu
      </Button>
    </div>
  );
}
