
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AlphabetAchievements from "./AlphabetAchievements";
import { hasAudio, AUDIO_FILES } from "@/constants/alphabetData";

const TOTAL_LETTERS = 28;
const IMAGE_URL = "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=facearea&w=256&h=256&facepad=3";

function speakSomaliLetter(letter: string) {
  // Check if we have a custom audio file for this letter
  if (hasAudio(letter)) {
    const audio = new Audio(AUDIO_FILES[letter]);
    audio.play().catch(error => {
      console.error("Failed to play custom audio:", error);
      // Fallback to speech synthesis if audio file fails
      speakUsingSynthesis(letter);
    });
  } else {
    speakUsingSynthesis(letter);
  }
}

function speakUsingSynthesis(letter: string) {
  const utter = new window.SpeechSynthesisUtterance(letter);
  utter.lang = "so-SO";
  utter.rate = 0.7;
  const hasSomali = window.speechSynthesis.getVoices().some(v => v.lang === "so-SO");
  if (!hasSomali) utter.lang = "en-US";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

interface Props {
  letter: string;
}

// Dummy funktioner og stater til proof-of-concept
export default function AlphabetPrototype({ letter }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [traced, setTraced] = useState(false);
  const [lettersTraced, setLettersTraced] = useState(0);
  const [streak, setStreak] = useState(2); // eks. dummy værdi
  const [badges, setBadges] = useState<string[]>([]);
  const { toast } = useToast();

  // Simple trace-logic: markér "traced" når mouseup på canvas = 'sporet'
  let drawing = false;

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    drawing = true;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!drawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = "#7c3aed";
    ctx.lineWidth = 6;
    ctx.stroke();
  };

  const stopDraw = () => {
    // Første gang brugeren "tegnede" betragtes det som succesfuldt sporet
    if (!traced) {
      setTraced(true);
      setLettersTraced(lt => {
        const newCount = lt + 1;
        // Awards
        let newBadges = [...badges];
        if (newCount === 1 && !badges.includes("Første bogstav")) {
          newBadges.push("Første bogstav");
          toast({
            title: "Tillykke!",
            description: "Du har sporet dit første bogstav og modtaget din første badge 🎉",
            duration: 3500,
            className: "bg-green-50",
          });
        }
        if (newCount === 5 && !badges.includes("5 bogstaver")) {
          newBadges.push("5 bogstaver");
          toast({
            title: "Sejt!",
            description: "Du har sporet 5 bogstaver og får en stjerne ⭐️",
            duration: 3500,
          });
        }
        setBadges(newBadges);
        return newCount;
      });
    }
    drawing = false;
  };

  const handleClear = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setTraced(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <AlphabetAchievements
        streak={streak}
        lettersTraced={lettersTraced}
        totalLetters={TOTAL_LETTERS}
        badges={badges}
      />
      <div className="flex flex-col items-center gap-2">
        <div className="text-[72px] text-purple-700 font-bold drop-shadow" aria-label="Somalisk bogstav">
          {letter}
        </div>
        <img
          src={IMAGE_URL}
          alt="Eksempel for bogstav"
          className="w-24 h-24 object-cover rounded-xl border shadow mb-2"
        />
        <Button onClick={() => speakSomaliLetter(letter)} variant="outline" className="flex gap-2">
          <Play className="w-5 h-5" /> Lyt
        </Button>
      </div>
      <div>
        <div className="mb-1 text-gray-700 text-center text-sm">Prøv at spore bogstavet:</div>
        <div className="relative border rounded-xl bg-gray-50 overflow-hidden shadow">
          <canvas
            ref={canvasRef}
            width={200}
            height={200}
            style={{ touchAction: "none", background: "transparent" }}
            className="block"
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
          />
          <div className="pointer-events-none absolute inset-0 flex justify-center items-center">
            <span className="text-[120px] text-gray-300 font-bold select-none">{letter}</span>
          </div>
        </div>
        <Button size="sm" onClick={handleClear} className="mt-2" variant="ghost">
          Ryd tegning
        </Button>
      </div>
    </div>
  );
}
