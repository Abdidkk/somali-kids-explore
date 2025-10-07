import React, { useState } from "react";
import { ArrowLeft, Volume2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllCulturalFacts, CulturalFact } from "@/constants/culturalFactsData";
import { speakWithAudioFallback } from "@/utils/speechUtils";
import { useIsMobile } from "@/hooks/use-mobile";

interface CulturalContentModalProps {
  open: boolean;
  onClose: () => void;
}

const CulturalContentModal: React.FC<CulturalContentModalProps> = ({ open, onClose }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<"somali" | "danish">("somali");
  const facts = getAllCulturalFacts();
  const isMobile = useIsMobile();

  if (!open) return null;

  const playFactAudio = (fact: CulturalFact) => {
    const audioPath = selectedLanguage === "somali" ? fact.audioSomali : fact.audioDanish;
    const text = selectedLanguage === "somali" ? fact.factSomali : fact.factDanish;
    speakWithAudioFallback(text, audioPath);
  };

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm overflow-y-auto py-6 md:py-10">
      <div className={`bg-white rounded-xl shadow-xl ${isMobile ? 'px-4 py-5' : 'px-7 py-6'} w-full max-w-6xl relative animate-in fade-in-50 my-auto mx-2 md:mx-4`}>
        {/* Back button */}
        <div className="absolute left-2 md:left-4 top-2 md:top-3 z-20">
          <Button 
            onClick={onClose} 
            variant="outline" 
            size="sm" 
            className={`flex items-center gap-1 ${isMobile ? 'text-xs' : ''}`} 
            aria-label="Tilbage"
          >
            <ArrowLeft className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
            Tilbage
          </Button>
        </div>
        
        <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-semibold text-purple-700 mb-3 md:mb-5 text-center pt-3`}>
          Kulturelt indhold - Vidste du...
        </h2>

        {/* Language Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-full bg-purple-100 p-1">
            <button
              onClick={() => setSelectedLanguage("somali")}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedLanguage === "somali"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-purple-700 hover:bg-purple-200"
              } ${isMobile ? 'text-sm' : 'text-base'}`}
            >
              🇸🇴 Somalisk
            </button>
            <button
              onClick={() => setSelectedLanguage("danish")}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedLanguage === "danish"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-purple-700 hover:bg-purple-200"
              } ${isMobile ? 'text-sm' : 'text-base'}`}
            >
              🇩🇰 Dansk
            </button>
          </div>
        </div>

        {/* Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-h-[60vh] overflow-y-auto px-2">
          {facts.map((fact) => (
            <Card
              key={fact.id}
              className="overflow-hidden border-2 border-purple-200 hover:border-purple-300 transition-all hover:shadow-lg"
            >
              {/* Image */}
              <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center overflow-hidden">
                <img
                  src={fact.image}
                  alt={fact.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardContent className="p-4">
                {/* Category Badge */}
                {fact.category && (
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium mb-2">
                    {fact.category}
                  </span>
                )}

                {/* Title */}
                <h3 className={`font-bold text-purple-900 mb-3 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                  {fact.title}
                </h3>

                {/* Fact Text */}
                <p className={`text-gray-700 mb-4 leading-relaxed ${isMobile ? 'text-sm' : 'text-base'}`}>
                  {selectedLanguage === "somali" ? fact.factSomali : fact.factDanish}
                </p>

                {/* Listen Button */}
                <Button
                  onClick={() => playFactAudio(fact)}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                  size={isMobile ? "sm" : "default"}
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  Lyt {selectedLanguage === "somali" ? "🇸🇴" : "🇩🇰"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CulturalContentModal;
