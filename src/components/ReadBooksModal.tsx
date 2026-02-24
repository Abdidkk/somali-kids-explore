import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReadBooksActivity from "./ReadBooksActivity";
import { useIsMobile } from "@/hooks/use-mobile";

interface ReadBooksModalProps {
  open: boolean;
  onClose: () => void;
}

type ActivityType = "browse" | null;

const ReadBooksModal: React.FC<ReadBooksModalProps> = ({ open, onClose }) => {
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
        
        <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-semibold text-blue-700 mb-3 md:mb-5 text-center pt-3`}>
          Læse bøger
        </h2>
        
        {activity === null ? (
          <div className="flex flex-col gap-6 md:gap-8 py-6 md:py-8 px-3 md:px-4 max-w-3xl mx-auto">
            <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-medium text-gray-700 mb-2 md:mb-3`}>
              Vælg en aktivitet:
            </h3>
            
            {/* Browse Books Activity */}
            <button 
              onClick={() => setActivity("browse")} 
              className="bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-xl p-6 md:p-8 transition-all text-left flex items-center gap-5 md:gap-6 shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              <div className="bg-blue-600 text-white p-4 md:p-5 rounded-full flex items-center justify-center min-w-28 min-h-28 md:min-w-32 md:min-h-32">
                <img 
                  src="/kategorier/bog.png" 
                  alt="Læs bøger" 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-contain" 
                />
              </div>
              <div>
                <h4 className={`font-bold text-blue-700 ${isMobile ? 'text-2xl' : 'text-3xl'} mb-2`}>Læs bøger</h4>
                <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600`}>Udforsk vores samling af interaktive somaliske bøger</p>
              </div>
            </button>
          </div>
        ) : (
          <ReadBooksActivity onBack={handleBackToMenu} />
        )}
      </div>
    </div>
  );
};

export default ReadBooksModal;
