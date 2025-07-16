import { Sparkles } from "lucide-react";
import { Trophy } from "lucide-react";
import SomaliFlag from "@/components/landing/SomaliFlag";
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const COLORS = [
  "text-blue-400",
  "text-blue-500",
  "text-purple-500",
  "text-blue-600",
  "text-blue-400",
  "text-blue-500",
  "text-violet-500",
  "text-blue-400",
  "text-blue-500",
  "text-sky-400",
  "text-indigo-400",
  "text-blue-400",
];

// Skift til det korrekte filnavn, fx "minlyd.mp3"
const SOUND_SRC = "/lovable-uploads/LYDFIL_NAVN.mp3";

export default function CongratulationsPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Afspil lyd automatisk når siden indlæses (én gang)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay kan blive blokeret – så gør ingenting.
      });
    }
  }, []);

  // Manuel afspilning via knap
  const handlePlay = () => {
    audioRef.current?.play();
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-[#e5f0ff] to-[#f8fbff] animate-fade-in px-2 py-10">
      {/* Bannerbillede */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="relative rounded-xl overflow-hidden shadow-xl">
          <img 
            src="/lovable-uploads/bed57f0f-32ee-4a06-8668-fb4be176b5f1.png" 
            alt="Dugsi - Børn på vej til skole" 
            className="w-full h-auto object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-center py-6">
            <h2 className="text-white text-3xl md:text-4xl font-bold">Kaalay Dugsiga</h2>
            <p className="text-white text-lg md:text-xl mt-2">Kom ind til skolen</p>
          </div>
        </div>
      </div>
      
      <div className="relative w-full max-w-lg mx-auto animate-fade-in">
        {/* Kort container */}
        <div className="bg-white/80 rounded-3xl shadow-[0_8px_32px_0_rgba(67,136,245,0.15)] border border-blue-200/20 px-6 md:px-12 py-10 md:py-12 ring-2 ring-blue-300/10 flex flex-col items-center">
          {/* Overskrift: Somali flag, Trophy & Sparkles */}
          <div className="flex flex-col items-center gap-4 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <SomaliFlag className="w-14 h-10 drop-shadow-xl" />
              <Trophy className="w-10 h-10 text-yellow-500 drop-shadow-lg animate-bounce" />
              <span className="relative inline-block">
                <Sparkles className="absolute -top-3 -right-5 text-blue-400 animate-pulse" size={32} />
                <Sparkles className="absolute -bottom-3 -left-5 text-blue-400 animate-pulse" size={32} />
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-3 leading-snug drop-shadow-xl tracking-tight">
              Tillykke! 🎉
            </h1>
          </div>
          {/* Festlig beskrivelse */}
          <h2 className="text-[1.25rem] md:text-2xl font-semibold text-blue-600 mb-6 text-center max-w-2xl mx-auto animate-fade-in">
            Dit barn er nu klar til at lære det somaliske sprog gennem vores side.<br className="hidden md:inline" />
            Vi glæder os til at tage jer med på eventyret sammen!
          </h2>
          {/* Store sparkles øverst */}
          <div className="flex justify-center mb-5 gap-2 flex-wrap animate-bounce">
            {Array.from({ length: 8 }).map((_, idx) => (
              <Sparkles
                key={idx}
                size={42}
                className={`drop-shadow-xl ${COLORS[idx % COLORS.length]} animate-pulse`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              />
            ))}
          </div>
          {/* Lille sparkle confetti */}
          <div className="flex flex-wrap gap-2 justify-center mt-2 mb-6">
            {Array.from({ length: 24 }).map((_, i) => (
              <Sparkles
                key={i}
                size={20 + (i % 3) * 10}
                className={`drop-shadow-md ${COLORS[i % COLORS.length]} animate-fade-in`}
                style={{ animationDelay: `${0.07 * i}s` }}
              />
            ))}
          </div>
          {/* Audio player komponent */}
          <audio
            ref={audioRef}
            src={SOUND_SRC}
            preload="auto"
            className="hidden"
          />
          <div className="space-y-3">
            <button
              type="button"
              onClick={handlePlay}
              className="px-4 py-2 rounded bg-blue-500 text-white text-sm font-bold shadow hover:bg-blue-600 transition-colors"
            >
              Afspil lyd igen
            </button>
            
            <Link to="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Gå til dashboard
              </Button>
            </Link>
          </div>
        </div>
        {/* Bløde gradientglimt baggrundseffekt */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[-1] w-full h-full pointer-events-none">
          <div className="absolute -top-20 left-1/3 w-1/2 h-40 rounded-full bg-gradient-to-r from-blue-200/40 via-blue-100/60 to-blue-50/40 blur-2xl opacity-80 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-1/3 h-32 rounded-full bg-gradient-to-br from-blue-100/70 via-blue-50/60 to-blue-200/50 blur-2xl opacity-75 animate-fade-in" />
        </div>
      </div>
    </div>
  );
}
