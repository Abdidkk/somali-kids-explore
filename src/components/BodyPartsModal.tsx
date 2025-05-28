
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Volume2, ArrowLeft, Play } from "lucide-react";
import BodyPartsListenActivity from "./BodyPartsListenActivity";
import BodyPartsHearChooseActivity from "./BodyPartsHearChooseActivity";
import BodyPartsQuizActivity from "./BodyPartsQuizActivity";

interface BodyPartsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BodyPartsModal({ open, onClose }: BodyPartsModalProps) {
  const [currentActivity, setCurrentActivity] = useState<"menu" | "listen" | "hear-choose" | "quiz">("menu");

  const handleBack = () => {
    setCurrentActivity("menu");
  };

  const ActivityMenu = () => (
    <div className="flex flex-col items-center space-y-6 p-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-teal-700 mb-2">Lær om kropsdele</h2>
        <p className="text-gray-600">Vælg en aktivitet for at begynde at lære</p>
      </div>

      <div className="grid gap-4 w-full max-w-md">
        <Button
          onClick={() => setCurrentActivity("listen")}
          className="h-16 text-lg bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-3"
        >
          <Volume2 className="w-6 h-6" />
          Lyt og lær
        </Button>

        <Button
          onClick={() => setCurrentActivity("hear-choose")}
          className="h-16 text-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-3"
        >
          <Play className="w-6 h-6" />
          Hør og vælg
        </Button>

        <Button
          onClick={() => setCurrentActivity("quiz")}
          className="h-16 text-lg bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-3"
        >
          <Play className="w-6 h-6" />
          Test din viden
        </Button>
      </div>

      <Button onClick={onClose} variant="outline" className="mt-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Tilbage til kategorier
      </Button>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-teal-700">
            Kropsdele
          </DialogTitle>
        </DialogHeader>

        {currentActivity === "menu" && <ActivityMenu />}
        {currentActivity === "listen" && <BodyPartsListenActivity onBack={handleBack} />}
        {currentActivity === "hear-choose" && <BodyPartsHearChooseActivity onBack={handleBack} />}
        {currentActivity === "quiz" && <BodyPartsQuizActivity onBack={handleBack} />}
      </DialogContent>
    </Dialog>
  );
}
