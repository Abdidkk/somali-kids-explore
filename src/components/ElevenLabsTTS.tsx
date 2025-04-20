
import React from "react";
import { useEffect } from "react";

interface Props {
  text: string;
  voiceId?: string; // Default: Aria
  language?: string; // Default: Somali "so"
  onAudioEnd?: () => void;
  apiKey: string; // ElevenLabs
}

export default function ElevenLabsTTS({ text, voiceId = "9BWtsMINqrJLrRacOk9x", language = "so", onAudioEnd, apiKey }: Props) {
  useEffect(() => {
    if (!apiKey || !text) return;

    // Fetch TTS audio from ElevenLabs
    const fetchAudio = async () => {
      const resp = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: "POST",
          headers: {
            "xi-api-key": apiKey,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg"
          },
          body: JSON.stringify({
            text,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              style: 0.5,
              use_speaker_boost: true,
            }
          })
        }
      );
      if (!resp.ok) return;
      const blob = await resp.blob();
      const audio = new Audio(URL.createObjectURL(blob));
      audio.onended = onAudioEnd;
      audio.play();
    };

    fetchAudio();
    // eslint-disable-next-line
  }, [text, apiKey, voiceId, language]);

  return null; // Ingen UI, vi spiller kun lyd
}
