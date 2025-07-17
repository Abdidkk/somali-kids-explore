import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CulturalQuizActivity from "./CulturalQuizActivity";
import { useIsMobile } from "@/hooks/use-mobile";

interface CulturalModalProps {
  open: boolean;
  onClose: () => void;
}

type ActivityType = "quiz" | null;

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-6xl h-[90vh] flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-4 md:p-6 text-white">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={activity ? handleBackToMenu : onClose}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className={`font-bold ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                Kulturelt indhold
              </h2>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} opacity-90`}>
                Udforsk somalisk kultur gennem quizzer
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {!activity ? (
            <div className="flex flex-col items-center gap-6">
              <button
                onClick={() => setActivity("quiz")}
                className="w-full max-w-md p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 hover:border-purple-300 transition-all hover:scale-105"
              >
                <div className="text-4xl mb-4">🎭</div>
                <div>
                  <h4 className={`font-bold text-purple-700 ${isMobile ? 'text-2xl' : 'text-3xl'} mb-2`}>Kultur Quiz</h4>
                  <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600`}>Test din viden om somalisk kultur, traditioner og historie</p>
                </div>
              </button>
            </div>
          ) : (
            <CulturalQuizActivity onBack={handleBackToMenu} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CulturalModal;