import React, { useState } from "react";
import { ArrowLeft, Volume2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllCulturalFacts, CulturalFact } from "@/constants/culturalFactsData";
import { speakWithAudioFallback } from "@/utils/speechUtils";
import { useIsMobile } from "@/hooks/use-mobile";

interface CulturalFactsActivityProps {
  onBack: () => void;
}

const CulturalFactsActivity: React.FC<CulturalFactsActivityProps> = ({ onBack }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<"somali" | "danish">("somali");
  const facts = getAllCulturalFacts();
  const isMobile = useIsMobile();

  const playFactAudio = (fact: CulturalFact) => {
    const audioPath = selectedLanguage === "somali" ? fact.audioSomali : fact.audioDanish;
    const text = selectedLanguage === "somali" ? fact.factSomali : fact.factDanish;
    speakWithAudioFallback(text, audioPath);
  };

  return (
    <div className="w-full">
      <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-purple-700 mb-3 md:mb-5 text-center`}>
        Vidste du...
      </h3>

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
  );
};

export default CulturalFactsActivity;
