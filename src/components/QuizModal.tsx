import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import GeneralQuizActivity from "./GeneralQuizActivity";
import { useIsMobile } from "@/hooks/use-mobile";

interface QuizModalProps {
  open: boolean;
  onClose: () => void;
}

type ActivityType = "general" | null;

const QuizModal: React.FC<QuizModalProps> = ({
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
        <div className="bg-gradient-to-r from-indigo-400 to-indigo-600 p-4 md:p-6 text-white">
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
                Quiz
              </h2>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} opacity-90`}>
                Test din viden om det, du har lært
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {!activity ? (
            <div className="flex flex-col items-center gap-6">
              <button
                onClick={() => setActivity("general")}
                className="w-full max-w-md p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border-2 border-indigo-200 hover:border-indigo-300 transition-all hover:scale-105"
              >
                <div className="text-4xl mb-4">🧠</div>
                <div>
                  <h4 className={`font-bold text-indigo-700 ${isMobile ? 'text-2xl' : 'text-3xl'} mb-2`}>Generel Quiz</h4>
                  <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600`}>Blandet quiz om alle emner du har lært</p>
                </div>
              </button>
            </div>
          ) : (
            <GeneralQuizActivity onBack={handleBackToMenu} />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;