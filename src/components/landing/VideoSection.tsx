
import { Play, Pause } from "lucide-react";
import React, { useRef, useState } from "react";

const HERO_BLUE = "#4CA6FE";

const VIDEO_SRC =
  "https://www.w3schools.com/html/mov_bbb.mp4"; // Demo video (kan ændres)

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      className="max-w-3xl mx-auto mt-16 px-4 py-12 rounded-3xl border-4 border-[#FFD7F1] shadow-xl relative overflow-visible"
      style={{
        background: "linear-gradient(95deg, #FDE1D3 60%, #E5DEFF 100%)",
        boxShadow: "0 8px 32px 0 rgba(254,198,161,0.07)",
      }}
    >
      {/* Små dekorative cirkler og prikker for børne-touch */}
      <div className="absolute -top-7 left-8 w-7 h-7 bg-[#FEDEE2] rounded-full opacity-80 border-2 border-[#FEF7CD] shadow-md animate-pulse" />
      <div className="absolute top-3 right-20 w-4 h-4 bg-[#FEC6A1] rounded-full border-2 border-[#FFD7F1]" />
      <div className="absolute -bottom-7 right-8 w-10 h-10 bg-[#4CA6FE]/20 rounded-full border-2 border-[#4CA6FE]/60 blur-sm" />
      <div className="absolute bottom-4 left-3 w-5 h-5 bg-[#FEF7CD] rounded-full border-2 border-[#FFD7F1]" />
      {/* 
  
      Du kan evt. tilføje flere "deco" senere for endnu mere legesyghed.
      */}

      <h2
        className="text-3xl md:text-4xl font-black mb-5 text-center bg-gradient-to-r from-[#4CA6FE] via-[#FFD7F1] to-[#FEDEE2] bg-clip-text text-transparent drop-shadow"
        style={{ letterSpacing: 1 }}
      >
        Sådan virker Dugsi!
      </h2>
      <p className="text-lg md:text-xl text-center mb-8 text-purple-800 font-semibold bg-white/70 p-3 rounded-lg max-w-xl mx-auto shadow">
        Se den korte video og oplev, hvor nemt og sjovt børn lærer somalisk med Dugsi.
      </p>
      <div className="relative max-w-2xl mx-auto group animate-scale-in mb-4">
        {/* Fuld pastel "frame" omkring video */}
        <div className="absolute -top-2 -left-2 w-full h-full rounded-2xl bg-[#FFD7F1]/60 border-2 border-dotted border-[#FEF7CD] z-0 pointer-events-none animate-fade-in"></div>
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster="/placeholder.svg"
          className="rounded-xl w-full max-h-[320px] border-4 border-[#4CA6FE] shadow-lg z-10 relative"
          controls={false}
          aria-label="Demo video om Dugsi"
          tabIndex={0}
        />
        <button
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 rounded-xl focus:outline-none transition group-hover:scale-105 duration-200"
          style={{ pointerEvents: "auto" }}
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Afspil video"}
          tabIndex={0}
        >
          {playing ? (
            <Pause size={48} color="#fff" className="drop-shadow-md" />
          ) : (
            <Play size={48} color="#fff" className="drop-shadow-md" />
          )}
        </button>
        {/* Farverigt badge */}
        <div className="absolute -bottom-5 -right-3 bg-[#FDE1D3] border-4 border-[#FFD7F1] text-[#4CA6FE] font-bold py-1 px-4 rounded-full shadow">
          {playing ? "Video spiller..." : "Tryk for at afspille"}
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center text-purple-700 text-base font-medium">
        <span className="bg-[#FEF7CD]/60 px-5 py-2 rounded-xl shadow">Ingen download nødvendig – bare leg og lær!</span>
      </div>
    </section>
  );
};

export default VideoSection;

