
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import KropsdeleListenActivity from "./KropsdeleListenActivity";
import KropsdeleGuessActivity from "./KropsdeleGuessActivity";
import KropsdeleQuizActivity from "./KropsdeleQuizActivity";
import { useIsMobile } from "@/hooks/use-mobile";

interface KropsdeleModalProps {
  open: boolean;
  onClose: () => void;
}

type ActivityType = "listen" | "guess" | "quiz" | null;

const KropsdeleModal: React.FC<KropsdeleModalProps> = ({
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
      <div className={`bg-white rounded-xl shadow-xl ${isMobile ? 'px-4 py-5' : 'px-7 py-6'} w-full max-w-2xl relative animate-in fade-in-50 my-auto mx-2 md:mx-4`}>
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
        
        <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-semibold text-teal-700 mb-3 md:mb-5 text-center pt-3`}>
          Kropsdele på somalisk
        </h2>
        
        {activity === null ? (
          <div className="flex flex-col gap-6 md:gap-8 py-6 md:py-8 px-3 md:px-4 max-w-2xl mx-auto">
            <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-medium text-gray-700 mb-2 md:mb-3`}>
              Vælg en aktivitet:
            </h3>
            
            {/* Listen Activity */}
            <button 
              onClick={() => setActivity("listen")} 
              className="bg-teal-50 hover:bg-teal-100 border-2 border-teal-200 rounded-xl p-6 md:p-8 transition-all text-left flex items-center gap-5 md:gap-6 shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              <div className="bg-teal-600 text-white p-4 md:p-5 rounded-full flex items-center justify-center min-w-28 min-h-28 md:min-w-32 md:min-h-32">
                <img src="/lovable-uploads/4b8dc6fc-aca1-44d7-9188-920521dc6d81.png" alt="Lyt og lær" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
              </div>
              <div>
                <h4 className={`font-bold text-teal-700 ${isMobile ? 'text-2xl' : 'text-3xl'} mb-2`}>Lyt og lær</h4>
                <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600`}>Klik på billederne og hør, hvad de hedder på somalisk</p>
              </div>
            </button>
            
            {/* Guess Activity */}
            <button 
              onClick={() => setActivity("guess")} 
              className="bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 rounded-xl p-6 md:p-8 transition-all text-left flex items-center gap-5 md:gap-6 shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              <div className="bg-emerald-600 text-white p-4 md:p-5 rounded-full flex items-center justify-center min-w-28 min-h-28 md:min-w-32 md:min-h-32">
                <img src="/lovable-uploads/1e80efba-0e83-48c7-aa88-40fa3c48f0a9.png" alt="Hør og vælg" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
              </div>
              <div>
                <h4 className={`font-bold text-emerald-700 ${isMobile ? 'text-2xl' : 'text-3xl'} mb-2`}>Hør og vælg</h4>
                <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600`}>Hør et somalisk ord og klik på det rigtige billede</p>
              </div>
            </button>
            
            {/* Quiz Activity */}
            <button 
              onClick={() => setActivity("quiz")} 
              className="bg-cyan-50 hover:bg-cyan-100 border-2 border-cyan-200 rounded-xl p-6 md:p-8 transition-all text-left flex items-center gap-5 md:gap-6 shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              <div className="bg-cyan-600 text-white p-4 md:p-5 rounded-full flex items-center justify-center min-w-28 min-h-28 md:min-w-32 md:min-h-32">
                <img src="/lovable-uploads/4bdde527-cfcd-4a08-bf5c-65c9f1b9127f.png" alt="Test din viden" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
              </div>
              <div>
                <h4 className={`font-bold text-cyan-700 ${isMobile ? 'text-2xl' : 'text-3xl'} mb-2`}>Test din viden</h4>
                <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600`}>Test din viden om kropsdele, følelser og kropstyper</p>
              </div>
            </button>
          </div>
        ) : activity === "listen" ? (
          <KropsdeleListenActivity onBack={handleBackToMenu} />
        ) : activity === "guess" ? (
          <KropsdeleGuessActivity onBack={handleBackToMenu} />
        ) : (
          <KropsdeleQuizActivity onBack={handleBackToMenu} />
        )}
      </div>
    </div>
  );
};

export default KropsdeleModal;
