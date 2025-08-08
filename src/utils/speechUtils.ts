export function speakSomaliLetter(letter: string, audioFiles: Record<string, string>) {
  // Check if we have a custom audio file for this letter
  if (hasAudio(letter, audioFiles)) {
    const audio = new Audio(audioFiles[letter]);
    audio.play().catch(error => {
      console.error("Failed to play custom audio:", error);
      // Fallback to speech synthesis if audio file fails
      speakUsingSynthesis(letter);
    });
  } else {
    speakUsingSynthesis(letter);
  }
}

export function speakUsingSynthesis(text: string) {
  const utter = new window.SpeechSynthesisUtterance(text);
  utter.lang = "so-SO";
  utter.rate = 0.7;
  const hasSomali = window.speechSynthesis.getVoices().some(v => v.lang === "so-SO");
  if (!hasSomali) utter.lang = "en-US";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

// Generic helper to prefer custom audio and fall back to TTS
export function speakWithAudioFallback(text: string, audioPath?: string) {
  if (audioPath) {
    const audio = new Audio(audioPath);
    audio.play().catch((error) => {
      console.error("Audio playback failed, falling back to TTS:", error);
      speakUsingSynthesis(text);
    });
  } else {
    speakUsingSynthesis(text);
  }
}

export function hasAudio(letter: string, audioFiles: Record<string, string>) {
  return audioFiles[letter] && audioFiles[letter] !== "";
}

