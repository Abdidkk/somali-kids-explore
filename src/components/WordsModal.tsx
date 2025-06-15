
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import WordsUnjumbleActivity from "./WordsUnjumbleActivity";
import WordsListenActivity from "./WordsListenActivity";
import WordsQuizActivity from "./WordsQuizActivity";

interface WordsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WordsModal({ open, onClose }: WordsModalProps) {
  const [activity, setActivity] = useState<null | "unjumble" | "listen" | "quiz">(null);

  function handleBack() {
    setActivity(null);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) handleBack(); }}>
      <DialogContent className="max-w-lg">
        {!activity && (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-bold text-center mb-2">Vælg en aktivitet</h2>
            <Button className="w-full" onClick={() => setActivity("unjumble")}>🧩 Sammensæt sætning</Button>
            <Button className="w-full" onClick={() => setActivity("listen")}>🎧 Lyt til ord</Button>
            <Button className="w-full" onClick={() => setActivity("quiz")}>❓ Quiz</Button>
            <Button variant="ghost" onClick={onClose}>Tilbage</Button>
          </div>
        )}
        {activity === "unjumble" && <WordsUnjumbleActivity onBack={() => setActivity(null)} />}
        {activity === "listen" && <WordsListenActivity onBack={() => setActivity(null)} />}
        {activity === "quiz" && <WordsQuizActivity onBack={() => setActivity(null)} />}
      </DialogContent>
    </Dialog>
  );
}
