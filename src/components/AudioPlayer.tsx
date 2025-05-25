
import React, { useEffect, useState } from "react";
import { AUDIO_FILES } from "@/constants/alphabetData";

interface Props {
  letter: string;
  onAudioEnd?: () => void;
  autoPlay?: boolean;
}

export default function AudioPlayer({ letter, onAudioEnd, autoPlay = false }: Props) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Initialize audio on component mount
  useEffect(() => {
    if (AUDIO_FILES[letter]) {
      const audioElement = new Audio(AUDIO_FILES[letter]);
      audioElement.onended = () => {
        if (onAudioEnd) onAudioEnd();
      };
      setAudio(audioElement);
      
      // Autoplay if enabled
      if (autoPlay) {
        audioElement.play().catch(error => {
          console.error("Autoplay failed:", error);
        });
      }
    }
    
    return () => {
      if (audio) {
        audio.pause();
        audio.onended = null;
      }
    };
  }, [letter]);

  const playAudio = () => {
    if (audio) {
      // Reset audio to start
      audio.currentTime = 0;
      audio.play().catch(error => {
        console.error("Failed to play audio:", error);
      });
    }
  };

  // No UI rendered, just handles audio playback
  return null;
}
