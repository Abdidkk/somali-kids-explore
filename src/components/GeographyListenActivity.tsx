
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { CONTINENTS, COUNTRIES, NATURE_LANDSCAPES, getGeographyItemColor } from "@/constants/geographyData";
import { useIsMobile } from "@/hooks/use-mobile";

interface Props {
  onBack: () => void;
}

export default function GeographyListenActivity({ onBack }: Props) {
  const isMobile = useIsMobile();

  const playAudio = (text: string) => {
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = "so-SO";
    utter.rate = 0.7;
    const hasSomali = window.speechSynthesis.getVoices().some(v => v.lang === "so-SO");
    if (!hasSomali) utter.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="flex flex-col items-center mt-3 md:mt-5 gap-4 md:gap-5">
      <Tabs defaultValue="continents" className="w-full flex flex-col items-center">
        <TabsList className={`mb-3 md:mb-4 bg-green-50 ${isMobile ? 'text-xs' : ''}`}>
          <TabsTrigger value="continents">Kontinenter</TabsTrigger>
          <TabsTrigger value="countries">Lande</TabsTrigger>
          <TabsTrigger value="nature">Natur</TabsTrigger>
        </TabsList>
        
        <TabsContent value="continents" className="w-full flex flex-col items-center gap-4">
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-medium text-gray-700 text-center mb-3`}>
            Klik og hør kontinenternes navne på somalisk
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-4xl">
            {CONTINENTS.map((continent, idx) => (
              <div
                key={continent.somali}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all cursor-pointer bg-white"
                onClick={() => playAudio(continent.somali)}
              >
                <div
                  className={`p-6 md:p-8 rounded-lg text-white font-medium text-center flex-1 w-full ${isMobile ? 'text-sm' : 'text-base'}`}
                  style={{ backgroundColor: getGeographyItemColor(idx, 'continents') }}
                >
                  🌍 {continent.danish}
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    playAudio(continent.somali);
                  }}
                  variant="outline"
                  size="sm"
                  className="mt-2"
                >
                  <Volume2 className="w-4 h-4 mr-1" />
                  {continent.somali}
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="countries" className="w-full flex flex-col items-center gap-4">
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-medium text-gray-700 text-center mb-3`}>
            Klik på flag og hør landenes navne på somalisk
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-6xl">
            {COUNTRIES.map((country, idx) => (
              <div
                key={country.somali}
                className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all cursor-pointer bg-white"
                onClick={() => playAudio(country.somali)}
              >
                <div className="text-4xl md:text-5xl mb-2">{country.flag}</div>
                <div className={`font-medium text-gray-700 text-center ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {country.danish}
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    playAudio(country.somali);
                  }}
                  variant="outline"
                  size="sm"
                  className={`${isMobile ? 'text-xs px-2 py-1' : ''}`}
                >
                  <Volume2 className="w-3 h-3 mr-1" />
                  {country.somali}
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="nature" className="w-full flex flex-col items-center gap-4">
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-medium text-gray-700 text-center mb-3`}>
            Klik og hør naturtypernes navne på somalisk
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-4xl">
            {NATURE_LANDSCAPES.map((nature, idx) => (
              <div
                key={nature.somali}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all cursor-pointer bg-white"
                onClick={() => playAudio(nature.somali)}
              >
                <div className="text-4xl md:text-5xl mb-2">{nature.emoji}</div>
                <div className={`font-medium text-gray-700 text-center ${isMobile ? 'text-sm' : 'text-base'}`}>
                  {nature.danish}
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    playAudio(nature.somali);
                  }}
                  variant="outline"
                  size="sm"
                >
                  <Volume2 className="w-4 h-4 mr-1" />
                  {nature.somali}
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
