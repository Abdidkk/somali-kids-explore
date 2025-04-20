
import { Fireworks, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CongratulationsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 via-purple-100 to-yellow-50 animate-fade-in px-4 py-10">
      <div className="text-center mb-10 relative">
        <div className="flex justify-center mb-4 gap-2 animate-bounce">
          <Fireworks size={60} className="text-pink-400 drop-shadow-lg rotate-12" />
          <Fireworks size={60} className="text-yellow-400 drop-shadow-lg -rotate-12" />
          <Fireworks size={60} className="text-purple-500 drop-shadow-lg" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-4 leading-snug drop-shadow-xl">
          Tillykke! 🎉
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-purple-900 mb-6 max-w-2xl mx-auto">
          Dit barn er nu klar til at lære det somaliske sprog gennem vores side. <br className="hidden md:inline" />
          Vi glæder os til at tage jer med på eventyret sammen!
        </h2>
        <div className="flex justify-center gap-2 mb-8">
          <Sparkles size={38} className="text-pink-400 animate-pulse" />
          <Sparkles size={38} className="text-orange-300 animate-pulse" />
          <Sparkles size={38} className="text-purple-400 animate-pulse" />
        </div>
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Fireworks
              key={i}
              size={28 + (i % 3) * 12}
              className={
                "drop-shadow-md " +
                [
                  "text-orange-500",
                  "text-pink-500",
                  "text-violet-500",
                  "text-yellow-500",
                  "text-blue-400",
                  "text-fuchsia-500",
                ][i % 6]
              }
              style={{ animation: `fade-in 0.6s ${0.08 * i}s both` }}
            />
          ))}
        </div>
        <div className="mt-10">
          <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 text-lg shadow-lg rounded-full hover:scale-105 transition-all">
            <Link to="/">Gå til forsiden</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
