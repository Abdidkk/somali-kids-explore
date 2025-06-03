
import { AudioManager, AudioConfig } from './audioManager';

export function speakSomaliLetter(letter: string, audioFiles: Record<string, string>) {
  const audioManager = AudioManager.getInstance();
  const config: AudioConfig = {
    customAudioPath: audioFiles[letter],
    fallbackText: letter,
    language: "so-SO"
  };
  
  audioManager.playAudio(config);
}

export function speakUsingSynthesis(text: string) {
  const audioManager = AudioManager.getInstance();
  const config: AudioConfig = {
    fallbackText: text,
    language: "so-SO"
  };
  
  audioManager.playAudio(config);
}

export function speakCustomOrFallback(customAudioPath: string | undefined, fallbackText: string) {
  const audioManager = AudioManager.getInstance();
  const config: AudioConfig = {
    customAudioPath,
    fallbackText,
    language: "so-SO"
  };
  
  audioManager.playAudio(config);
}

export function hasAudio(letter: string, audioFiles: Record<string, string>) {
  return audioFiles[letter] && audioFiles[letter] !== "";
}
