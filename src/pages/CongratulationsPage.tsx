
import { Sparkles } from "lucide-react";
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 via-purple-100 to-yellow-50 animate-fade-in px-4 py-10">
      <div className="text-center mb-10 relative">
        {/* Somali flag on top for festlig effekt */}
        <div className="flex justify-center mb-6">
          <SomaliFlag className="w-20 h-14 drop-shadow-xl" />
        </div>
        {/* Stor række af sparkles for festlig effekt */}
        <div className="flex justify-center mb-6 gap-2 flex-wrap animate-bounce">
          {Array.from({ length: 8 }).map((_, idx) => (
            <Sparkles
              key={idx}
              size={52}
              className={`drop-shadow-xl ${COLORS[idx % COLORS.length]} animate-pulse`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            />
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-4 leading-snug drop-shadow-xl">
          Tillykke! 🎉
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-purple-900 mb-6 max-w-2xl mx-auto">
          Dit barn er nu klar til at lære det somaliske sprog gennem vores side. <br className="hidden md:inline" />
          Vi glæder os til at tage jer med på eventyret sammen!
        </h2>
        {/* Festlige sparkles i mindre størrelser overalt */}
        <div className="flex flex-wrap gap-2 justify-center mt-4 mb-8">
          {Array.from({ length: 20 }).map((_, i) => (
            <Sparkles
              key={i}
              size={28 + (i % 3) * 10}
              className={`drop-shadow-md ${COLORS[i % COLORS.length]} animate-fade-in`}
              style={{ animationDelay: `${0.08 * i}s` }}
            />
          ))}
        </div>
        {/* Knappen er fjernet her! */}
      </div>
    </div>
  );
}
