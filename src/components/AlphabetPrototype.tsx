
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const LETTER = "A";
const IMAGE_URL = "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=facearea&w=256&h=256&facepad=3"; // kat som placeholder

function speakSomaliLetter(letter: string) {
  const utter = new window.SpeechSynthesisUtterance(letter);
  utter.lang = "so-SO";
  utter.rate = 0.7;
  const hasSomali = window.speechSynthesis.getVoices().some(v => v.lang === "so-SO");
  if (!hasSomali) utter.lang = "en-US";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

export default function AlphabetPrototype() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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
    drawing = false;
  };

  const handleClear = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <div className="text-[72px] text-purple-700 font-bold drop-shadow" aria-label="Somalisk bogstav">{LETTER}</div>
        <img src={IMAGE_URL} alt="Eksempel for bogstav" className="w-24 h-24 object-cover rounded-xl border shadow mb-2" />
        <Button onClick={() => speakSomaliLetter(LETTER)} variant="outline" className="flex gap-2">
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
            <span className="text-[120px] text-gray-300 font-bold select-none">{LETTER}</span>
          </div>
        </div>
        <Button size="sm" onClick={handleClear} className="mt-2" variant="ghost">Ryd tegning</Button>
      </div>
    </div>
  );
}

