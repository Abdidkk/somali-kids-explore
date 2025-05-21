
import React, { useState } from "react";
import { ArrowLeft, Headphones, Pencil, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import AlphabetTraceActivity from "./AlphabetTraceActivity";
import AlphabetListenActivity from "./AlphabetListenActivity";
import AlphabetGuessActivity from "./AlphabetGuessActivity";

interface AlphabetModalProps {
  open: boolean;
  onClose: () => void;
}

type AlphabetActivityType = "menu" | "listen" | "trace" | "guess";

const MENU: { key: AlphabetActivityType, icon: React.ReactNode, label: string, description: string }[] = [
  { key: "listen", icon: <Headphones />, label: "Lyt til bogstavet", description: "Hør hvordan bogstavet udtales på somali" },
  { key: "trace", icon: <Pencil />, label: "Tegn bogstavet", description: "Øv dig i at tegne bogstavet" },
  { key: "guess", icon: <HelpCircle />, label: "Gæt bogstavet", description: "Kan du gætte hvilket bogstav kommer næste gang?" },
];

const AlphabetModal: React.FC<AlphabetModalProps> = ({ open, onClose }) => {
  const [activity, setActivity] = useState<AlphabetActivityType>("menu");
  const [lastActivity, setLastActivity] = useState<AlphabetActivityType | null>(null);

  // Remember the last activity when closing to provide continuity when reopening
  React.useEffect(() => {
    if (!open) {
      setLastActivity(activity);
    } else if (open && lastActivity && activity === "menu") {
      // Optional: Uncomment to auto-resume last activity when reopening
      // setActivity(lastActivity);
    }
  }, [open]);

  if (!open) return null;

  // Tilbage-funktion: fra aktivitet til menu, ellers lukkes modal
  const handleBack = () => {
    if (activity === "menu") {
      onClose();
    } else {
      setActivity("menu");
    }
  };

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm overflow-y-auto py-10">
      <div className="bg-white rounded-xl shadow-xl px-7 py-6 w-full max-w-lg relative animate-in fade-in-50 my-auto mx-4">
        {/* Tilbage-knap */}
        <div className="absolute left-4 top-3 z-20">
          <Button
            onClick={handleBack}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            aria-label="Tilbage"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbage
          </Button>
        </div>
        {/* Luk-knap */}
        <button
          aria-label="Luk alfabet"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 text-xl hover:text-vivid-purple"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold text-purple-700 mb-3 text-center">Somalisk alfabet</h2>
        
        <ScrollArea className="h-[70vh] max-h-[600px] pr-3">
          <div className="min-h-[370px] flex flex-col gap-5">
            {activity === "menu" && (
              <>
                <p className="mb-3 text-gray-600 text-center">
                  Vælg en aktivitet for at øve alfabetet på forskellige måder.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-2">
                  {MENU.map((item) => (
                    <button
                      key={item.key}
                      className="flex flex-col items-center gap-2 rounded-xl shadow p-5 bg-violet-50 hover:shadow-lg focus:outline-none transition-all border-2 border-transparent hover:border-vivid-purple"
                      onClick={() => setActivity(item.key)}
                      aria-label={item.label}
                    >
                      <span className="bg-white p-2 rounded-full shadow">{item.icon}</span>
                      <span className="font-semibold text-purple-800">{item.label}</span>
                      <span className="text-xs text-gray-600 text-center">{item.description}</span>
                    </button>
                  ))}
                </div>
                
                {lastActivity && (
                  <div className="mt-4 text-center">
                    <Button 
                      variant="ghost" 
                      onClick={() => setActivity(lastActivity)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      Fortsæt med {MENU.find(m => m.key === lastActivity)?.label}
                    </Button>
                  </div>
                )}
              </>
            )}
            {activity === "listen" && (
              <AlphabetListenActivity onBack={handleBack} />
            )}
            {activity === "trace" && (
              <AlphabetTraceActivity onBack={handleBack} />
            )}
            {activity === "guess" && (
              <AlphabetGuessActivity onBack={handleBack} />
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default AlphabetModal;
