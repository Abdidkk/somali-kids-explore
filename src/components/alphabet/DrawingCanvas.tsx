
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { EraserIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DrawingCanvasProps {
  letter: string;
  onSuccessfulTrace: () => void;
}

export default function DrawingCanvas({ letter, onSuccessfulTrace }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [traced, setTraced] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
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
  
  // Drawing functions - supporting both mouse and touch events
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
      onSuccessfulTrace();
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
  );
}
