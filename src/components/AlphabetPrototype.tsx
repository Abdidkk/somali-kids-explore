import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, EraserIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AlphabetAchievements from "./AlphabetAchievements";
import { hasAudio, AUDIO_FILES, ALPHABET_IMAGES } from "@/constants/alphabetData";
import { useIsMobile } from "@/hooks/use-mobile";
import LetterDisplay from "./alphabet/LetterDisplay";

const TOTAL_LETTERS = 29; // Updated to include the new vowel A

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

export default function AlphabetPrototype({ letter }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [traced, setTraced] = useState(false);
  const [lettersTraced, setLettersTraced] = useState(0);
  const [streak, setStreak] = useState(2); // eks. dummy værdi
  const [badges, setBadges] = useState<string[]>([]);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Set up canvas after render and when letter changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Resize canvas to container size
    const resizeCanvas = () => {
      if (canvas) {
        const container = canvas.parentElement;
        if (container) {
          // Set canvas dimensions based on container size
          canvas.width = container.clientWidth;
          canvas.height = container.clientWidth; // Keep it square
          
          // Reset canvas when letter changes
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setTraced(false);
          }
        }
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [letter]);
  
  // Track if we're currently drawing
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Drawing functions - now supporting both mouse and touch events
  const startDraw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    
    // Prevent scrolling while drawing
    if ('touches' in e) {
      e.preventDefault();
    }
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault(); // Prevent scrolling
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = "#7c3aed";
    ctx.lineWidth = isMobile ? 8 : 6; // Thicker line on mobile
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };
  
  const stopDraw = () => {
    setIsDrawing(false);
    
    // First time the user "drew" is considered successful tracing
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
  };
  
  const handleClear = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setTraced(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 md:gap-6">
      <AlphabetAchievements
        streak={streak}
        lettersTraced={lettersTraced}
        totalLetters={TOTAL_LETTERS}
        badges={badges}
      />
      
      <div className="flex flex-col items-center gap-2">
        <div 
          className={`${isMobile ? "text-[52px]" : "text-[72px]"} text-purple-700 font-bold drop-shadow`} 
          aria-label="Somalisk bogstav"
        >
          {letter}
        </div>
        
        <LetterDisplay selectedLetter={letter} />
        
        <Button 
          onClick={() => speakSomaliLetter(letter)} 
          variant="outline" 
          size={isMobile ? "sm" : "default"}
          className="flex gap-2"
        >
          <Play className="w-4 h-4" /> Lyt
        </Button>
      </div>
      
      <div className="w-full max-w-xs">
        <div className="mb-1 text-gray-700 text-center text-sm">Prøv at spore bogstavet:</div>
        <div className="relative border rounded-xl bg-gray-50 overflow-hidden shadow w-full aspect-square">
          <canvas
            ref={canvasRef}
            style={{ touchAction: "none", background: "transparent" }}
            className="block w-full h-full"
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
          />
          <div className="pointer-events-none absolute inset-0 flex justify-center items-center">
            <span className={`${isMobile ? "text-[100px]" : "text-[120px]"} text-gray-300 font-bold select-none`}>{letter}</span>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <Button 
            size={isMobile ? "sm" : "default"} 
            onClick={handleClear} 
            variant="ghost" 
            className="flex gap-1 items-center"
          >
            <EraserIcon className="w-4 h-4" />
            Ryd tegning
          </Button>
        </div>
      </div>
    </div>
  );
}
