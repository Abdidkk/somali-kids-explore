
import { Sparkles } from "lucide-react";
import { Trophy } from "lucide-react";
import SomaliFlag from "@/components/landing/SomaliFlag";

const COLORS = [
  "text-pink-400",
  "text-yellow-400",
  "text-purple-500",
  "text-orange-500",
  "text-blue-400",
  "text-fuchsia-500",
  "text-violet-500",
  "text-green-400",
  "text-rose-400",
  "text-sky-400",
  "text-indigo-400",
  "text-lime-400",
];

export default function CongratulationsPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#f9e9fc] via-[#e5deff] to-[#fef7cd] animate-fade-in px-2 py-10">
      <div className="relative w-full max-w-lg mx-auto animate-fade-in">
        {/* Kort container */}
        <div className="bg-white/80 rounded-3xl shadow-[0_8px_32px_0_rgba(155,136,245,0.15)] border border-[#9b87f5]/20 px-6 md:px-12 py-10 md:py-12 ring-2 ring-vivid-purple/10 flex flex-col items-center">
          {/* Overskrift: Somali flag, Trophy & Sparkles */}
          <div className="flex flex-col items-center gap-4 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <SomaliFlag className="w-14 h-10 drop-shadow-xl" />
              <Trophy className="w-10 h-10 text-yellow-500 drop-shadow-lg animate-bounce" />
              <span className="relative inline-block">
                <Sparkles className="absolute -top-3 -right-5 text-fuchsia-400 animate-pulse" size={32} />
                <Sparkles className="absolute -bottom-3 -left-5 text-amber-400 animate-pulse" size={32} />
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-3 leading-snug drop-shadow-xl tracking-tight">
              Tillykke! 🎉
            </h1>
          </div>
          {/* Festlig beskrivelse */}
          <h2 className="text-[1.25rem] md:text-2xl font-semibold text-vivid-purple mb-6 text-center max-w-2xl mx-auto animate-fade-in">
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
        </div>
        {/* Bløde gradientglimt baggrundseffekt */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[-1] w-full h-full pointer-events-none">
          <div className="absolute -top-20 left-1/3 w-1/2 h-40 rounded-full bg-gradient-to-r from-[#fec6a1]/40 via-[#e5deff]/60 to-[#fef7cd]/40 blur-2xl opacity-80 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-1/3 h-32 rounded-full bg-gradient-to-br from-[#d3e4fd]/70 via-[#f2fce2]/60 to-[#ffdee2]/50 blur-2xl opacity-75 animate-fade-in" />
        </div>
      </div>
    </div>
  );
}
