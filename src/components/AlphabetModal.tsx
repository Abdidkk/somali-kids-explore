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
const AlphabetModal: React.FC<AlphabetModalProps> = ({
  open,
  onClose
}) => {
  const [activity, setActivity] = useState<ActivityType>(null);
  const isMobile = useIsMobile();
  if (!open) return null;
  const handleBackToMenu = () => {
    setActivity(null);
  };
  return <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm overflow-y-auto py-6 md:py-10">
      <div className={`bg-white rounded-xl shadow-xl ${isMobile ? 'px-4 py-5' : 'px-7 py-6'} w-full max-w-2xl relative animate-in fade-in-50 my-auto mx-2 md:mx-4`}>
        {/* Back button */}
        <div className="absolute left-2 md:left-4 top-2 md:top-3 z-20">
          <Button onClick={activity ? handleBackToMenu : onClose} variant="outline" size="sm" className={`flex items-center gap-1 ${isMobile ? 'text-xs' : ''}`} aria-label="Tilbage">
            <ArrowLeft className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
            Tilbage
          </Button>
        </div>
        
        <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-semibold text-purple-700 mb-3 md:mb-5 text-center pt-3`}>
          Somalisk alfabet
        </h2>
        
        {activity === null ? <div className="flex flex-col gap-6 md:gap-8 py-6 md:py-8 px-3 md:px-4 max-w-2xl mx-auto">
            <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-medium text-gray-700 mb-2 md:mb-3`}>
              Vælg en aktivitet:
            </h3>
            
            {/* Listen Activity - Made larger with more prominence */}
            <button onClick={() => setActivity("listen")} className="bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-xl p-6 md:p-8 transition-all text-left flex items-center gap-5 md:gap-6 shadow-sm hover:shadow-md hover:-translate-y-1">
              
              <div>
                <h4 className={`font-bold text-purple-700 ${isMobile ? 'text-2xl' : 'text-3xl'} mb-2`}>Lyt og lær</h4>
                <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600`}>Lyt til bogstaverne og lær deres udtale</p>
              </div>
            </button>
            
            {/* Trace Activity - Made larger with more prominence */}
            <button onClick={() => setActivity("trace")} className="bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-xl p-6 md:p-8 transition-all text-left flex items-center gap-5 md:gap-6 shadow-sm hover:shadow-md hover:-translate-y-1">
              <div className="bg-blue-600 text-white p-4 md:p-5 rounded-full flex items-center justify-center min-w-28 min-h-28 md:min-w-32 md:min-h-32">
                <img src="/lovable-uploads/72e8879d-c2fa-4fbe-982b-eb59d9fa37c5.png" alt="Tegn og skriv" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
              </div>
              <div>
                <h4 className={`font-bold text-blue-700 ${isMobile ? 'text-2xl' : 'text-3xl'} mb-2`}>Tegn og skriv</h4>
                <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600`}>Øv dig i at skrive bogstaverne</p>
              </div>
            </button>
            
            {/* Guess Activity - Made larger with more prominence */}
            <button onClick={() => setActivity("guess")} className="bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-xl p-6 md:p-8 transition-all text-left flex items-center gap-5 md:gap-6 shadow-sm hover:shadow-md hover:-translate-y-1">
              <div className="bg-green-600 text-white p-4 md:p-5 rounded-full flex items-center justify-center min-w-28 min-h-28 md:min-w-32 md:min-h-32">
                <img src="/lovable-uploads/1e80efba-0e83-48c7-aa88-40fa3c48f0a9.png" alt="Gæt og lær" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
              </div>
              <div>
                <h4 className={`font-bold text-green-700 ${isMobile ? 'text-2xl' : 'text-3xl'} mb-2`}>Gæt og lær</h4>
                <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600`}>Test din viden med sjove spil</p>
              </div>
            </button>
          </div> : activity === "listen" ? <AlphabetListenActivity onBack={handleBackToMenu} /> : activity === "trace" ? <AlphabetTraceActivity onBack={handleBackToMenu} /> : <AlphabetGuessActivity onBack={handleBackToMenu} />}
      </div>
    </div>;
};
export default AlphabetModal;