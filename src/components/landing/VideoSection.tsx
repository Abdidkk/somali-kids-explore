
import { Play, Pause } from "lucide-react";
import React, { useRef, useState } from "react";

const HERO_BLUE = "#4CA6FE";

const VIDEO_SRC =
  "/Video/Dugsi.mp4"; // Demo video (kan ændres)

// Custom hook til at detektere tablet
function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState(false);

  React.useEffect(() => {
    const check = () => {
      // Tablet approx: 768px <= width < 1024px
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isTablet;
}

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const isTablet = useIsTablet();

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
    <section className={`max-w-3xl mx-auto mt-12 px-2 py-8 md:px-4 md:py-10 rounded-xl bg-white/70 shadow-lg
      ${isTablet ? 'max-w-4xl py-12 px-6' : ''}`}>
      <h2
        className="text-2xl md:text-3xl font-extrabold mb-4 text-center"
        style={{ color: HERO_BLUE, letterSpacing: 1 }}
      >
        Se hvordan Dugsi virker!
      </h2>
      <p className="text-md md:text-lg text-center mb-6 text-gray-700">
        Se denne korte video for at lære, hvordan børn og familier let kan fordybe sig i det somaliske sprog på en sjov måde.
      </p>
      <div className={`relative mx-auto group ${isTablet ? 'max-w-3xl' : 'max-w-2xl'}`}>
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster="/placeholder.svg"
          className={`rounded-xl w-full border-2 border-[#4CA6FE] shadow transition-all ${isTablet ? 'max-h-[450px] min-h-[320px]' : 'max-h-[320px]'}`}
          controls={false}
          aria-label="Demo video om Dugsi"
          tabIndex={0}
        />
        {/* Knappen har større størrelse og bedre synlighed på tablet */}
        <button
          className={`absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition duration-200 rounded-xl focus:outline-none 
            ${isTablet ? "hover:scale-110 scale-105" : "group-hover:scale-105"}`}
          style={{ pointerEvents: "auto" }}
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Afspil video"}
          tabIndex={0}
        >
          {playing ? (
            <Pause size={isTablet ? 64 : 44} color="#fff" className="drop-shadow-lg" />
          ) : (
            <Play size={isTablet ? 64 : 44} color="#fff" className="drop-shadow-lg" />
          )}
        </button>
      </div>
      <div className="mt-6 flex flex-col items-center text-gray-600 text-sm">
        <span>
          Ingen download nødvendig. Se videoen og kom i gang på få minutter!
        </span>
      </div>
    </section>
  );
};

export default VideoSection;
