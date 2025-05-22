
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AlphabetListenActivity from "./AlphabetListenActivity";
import AlphabetTraceActivity from "./AlphabetTraceActivity";
import AlphabetGuessActivity from "./AlphabetGuessActivity";
import { useIsMobile } from "@/hooks/use-mobile";

interface AlphabetModalProps {
  open: boolean;
  onClose: () => void;
}

type ActivityType = "listen" | "trace" | "guess" | null;

const AlphabetModal: React.FC<AlphabetModalProps> = ({ open, onClose }) => {
  const [activity, setActivity] = useState<ActivityType>(null);
  const isMobile = useIsMobile();

  if (!open) return null;

  const handleBackToMenu = () => {
    setActivity(null);
  };

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm overflow-y-auto py-6 md:py-10">
      <div className={`bg-white rounded-xl shadow-xl ${isMobile ? 'px-4 py-5' : 'px-7 py-6'} w-full max-w-lg relative animate-in fade-in-50 my-auto mx-2 md:mx-4`}>
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
          Somalisk alfabet
        </h2>
        
        {activity === null ? (
          <div className="grid grid-cols-1 gap-4 md:gap-5 py-2 md:py-4">
            <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-gray-700 mb-1 md:mb-2`}>
              Vælg en aktivitet:
            </h3>
            
            {/* Listen Activity */}
            <button 
              onClick={() => setActivity("listen")}
              className="bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-4 md:p-5 transition-all text-left flex items-center gap-3 md:gap-4"
            >
              <div className="bg-purple-600 text-white p-2.5 md:p-3 rounded-full flex items-center justify-center w-14 h-14 md:w-16 md:h-16">
                <img 
                  src="/lovable-uploads/4b8dc6fc-aca1-44d7-9188-920521dc6d81.png" 
                  alt="Lyt og lær" 
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
              </div>
              <div>
                <h4 className={`font-medium text-purple-700 ${isMobile ? 'text-base' : 'text-lg'}`}>Lyt og lær</h4>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600`}>Lyt til bogstaverne og lær deres udtale</p>
              </div>
            </button>
            
            {/* Trace Activity */}
            <button 
              onClick={() => setActivity("trace")}
              className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 md:p-5 transition-all text-left flex items-center gap-3 md:gap-4"
            >
              <div className="bg-blue-600 text-white p-2.5 md:p-3 rounded-full flex items-center justify-center w-14 h-14 md:w-16 md:h-16">
                <img 
                  src="/lovable-uploads/72e8879d-c2fa-4fbe-982b-eb59d9fa37c5.png" 
                  alt="Tegn og skriv" 
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
              </div>
              <div>
                <h4 className={`font-medium text-blue-700 ${isMobile ? 'text-base' : 'text-lg'}`}>Tegn og skriv</h4>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600`}>Øv dig i at skrive bogstaverne</p>
              </div>
            </button>
            
            {/* Guess Activity */}
            <button 
              onClick={() => setActivity("guess")}
              className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 md:p-5 transition-all text-left flex items-center gap-3 md:gap-4"
            >
              <div className="bg-green-600 text-white p-2.5 md:p-3 rounded-full flex items-center justify-center w-14 h-14 md:w-16 md:h-16">
                <img 
                  src="/lovable-uploads/1e80efba-0e83-48c7-aa88-40fa3c48f0a9.png" 
                  alt="Gæt og lær" 
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
              </div>
              <div>
                <h4 className={`font-medium text-green-700 ${isMobile ? 'text-base' : 'text-lg'}`}>Gæt og spil</h4>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600`}>Test din viden med sjove spil</p>
              </div>
            </button>
          </div>
        ) : activity === "listen" ? (
          <AlphabetListenActivity onBack={handleBackToMenu} />
        ) : activity === "trace" ? (
          <AlphabetTraceActivity onBack={handleBackToMenu} />
        ) : (
          <AlphabetGuessActivity onBack={handleBackToMenu} />
        )}
      </div>
    </div>
  );
}

export default AlphabetModal;
