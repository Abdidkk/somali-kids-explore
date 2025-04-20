
import { Play, Pause } from "lucide-react";
import React, { useRef, useState } from "react";

const HERO_BLUE = "#4CA6FE";

// Du kan udskifte videoen med din egen, når du har den! Foreløbigt en demo-video fra et stock-site.
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
    <section className="max-w-3xl mx-auto mt-12 px-4 py-10 rounded-xl bg-white/70 shadow-lg">
      <h2
        className="text-2xl md:text-3xl font-extrabold mb-4 text-center"
        style={{ color: HERO_BLUE, letterSpacing: 1 }}
      >
        Se hvordan Dugsi virker!
      </h2>
      <p className="text-md md:text-lg text-center mb-6 text-gray-700">
        Se denne korte video for at lære, hvordan børn og familier let kan fordybe sig i det somaliske sprog på en sjov måde.
      </p>
      <div className="relative max-w-2xl mx-auto group">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster="/placeholder.svg"
          className="rounded-xl w-full max-h-[320px] border-2 border-[#4CA6FE] shadow transition-all"
          controls={false}
          aria-label="Demo video om Dugsi"
          tabIndex={0}
        />
        <button
          className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition group-hover:scale-105 duration-200 rounded-xl focus:outline-none"
          style={{ pointerEvents: "auto" }}
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Afspil video"}
          tabIndex={0}
        >
          {playing ? (
            <Pause size={44} color="#fff" className="drop-shadow-lg" />
          ) : (
            <Play size={44} color="#fff" className="drop-shadow-lg" />
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
