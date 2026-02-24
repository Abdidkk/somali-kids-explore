import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CulturalFactsActivity from "./CulturalFactsActivity";
import CulturalQuizActivity from "./CulturalQuizActivity";
import { useIsMobile } from "@/hooks/use-mobile";

interface CulturalModalProps {
  open: boolean;
  onClose: () => void;
}

type ActivityType = "facts" | "quiz" | null;

const CulturalModal: React.FC<CulturalModalProps> = ({
  open,
  onClose
}) => {
  const [activity, setActivity] = useState<ActivityType>(null);
  const isMobile = useIsMobile();

  if (!open) return null;

  const handleBackToMenu = () => {
    setActivity(null);
  };

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm overflow-y-auto py-6 md:py-10">
<div className="bg-white rounded-xl shadow-xl px-4 py-5 md:px-7 md:py-6 w-full max-w-2xl relative animate-in fade-in-50 my-auto mx-2 md:mx-4">
        {/* Back button */}
        <div className="absolute left-2 md:left-4 top-2 md:top-3 z-20">
          <Button 
            onClick={activity ? handleBackToMenu : onClose} 
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
          Kulturelt indhold
        </h2>
        
        {activity === null ? (
          <div className="flex flex-col gap-6 md:gap-8 py-6 md:py-8 px-3 md:px-4 max-w-2xl mx-auto">
            <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-medium text-gray-700 mb-2 md:mb-3`}>
              Vælg en aktivitet:
            </h3>
            
            {/* Facts Activity */}
            <button 
              onClick={() => setActivity("facts")} 
              className="bg-pink-50 hover:bg-pink-100 border-2 border-purple-200 rounded-xl p-6 md:p-8 transition-all text-left flex items-center gap-5 md:gap-6 shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              <div className="bg-pink-600 text-white p-4 md:p-5 rounded-full flex items-center justify-center min-w-28 min-h-28 md:min-w-32 md:min-h-32">
                <img src="/kategorier/kultur1.png" alt="Lyt og lær" className="w-20 h-20 md:w-25 md:h-25 rounded-full object-cover" />
              </div>
              <div>
                <h4 className={`font-bold text-pink-700 ${isMobile ? 'text-2xl' : 'text-3xl'} mb-2`}>Vidste du...</h4>
                <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600`}>Udforsk somalisk kultur, traditioner og historie</p>
              </div>
            </button>
            
            {/* Quiz Activity */}
            <button 
              onClick={() => setActivity("quiz")} 
              className="bg-red-50 hover:bg-red-100 border-2 border-purple-200 rounded-xl p-6 md:p-8 transition-all text-left flex items-center gap-5 md:gap-6 shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              <div className="bg-red-600 text-white p-4 md:p-5 rounded-full flex items-center justify-center min-w-28 min-h-28 md:min-w-32 md:min-h-32">
                <img src="/kategorier/kultur2.png" alt="Lyt og lær" className="w-20 h-20 md:w-25 md:h-25 rounded-full object-cover" />
              </div>
              <div>
                <h4 className={`font-bold text-red-700 ${isMobile ? 'text-2xl' : 'text-3xl'} mb-2`}>Kultur Quiz</h4>
                <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600`}>Test din viden om somalisk kultur</p>
              </div>
            </button>
          </div>
        ) : activity === "facts" ? (
          <CulturalFactsActivity onBack={handleBackToMenu} />
        ) : (
          <CulturalQuizActivity onBack={handleBackToMenu} />
        )}
      </div>
    </div>
  );
};

export default CulturalModal;
