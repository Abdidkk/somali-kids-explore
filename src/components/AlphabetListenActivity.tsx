
import React from "react";
import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";

/**
 * Dummy-lytteaktivitet — endstegnsbogstav og knap til at høre.
 * Udvid evt. til flere bogstaver senere.
 */
interface Props {
  onBack: () => void;
}
const LETTER = "A";
function speakSomaliLetter(letter: string) {
  const utter = new window.SpeechSynthesisUtterance(letter);
  utter.lang = "so-SO";
  utter.rate = 0.7;
  const hasSomali = window.speechSynthesis.getVoices().some(v => v.lang === "so-SO");
  if (!hasSomali) utter.lang = "en-US";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

export default function AlphabetListenActivity({ onBack }: Props) {
  return (
    <div className="flex flex-col items-center mt-5 gap-5">
      <div className="text-[80px] font-bold text-purple-700">{LETTER}</div>
      <Button onClick={() => speakSomaliLetter(LETTER)} variant="outline" size="lg" className="flex gap-2 px-6">
        <Headphones />
        Lyt til bogstavet
      </Button>
      {/* Info-text */}
      <div className="text-gray-600 text-center text-sm max-w-xs mt-3">
        Tryk på knappen for at høre hvordan bogstavet "{LETTER}" udtales på somali.
      </div>
    </div>
  );
}
