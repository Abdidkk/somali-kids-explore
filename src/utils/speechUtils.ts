
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

export function speakUsingSynthesis(letter: string) {
  const utter = new window.SpeechSynthesisUtterance(letter);
  utter.lang = "so-SO";
  utter.rate = 0.7;
  const hasSomali = window.speechSynthesis.getVoices().some(v => v.lang === "so-SO");
  if (!hasSomali) utter.lang = "en-US";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

export function hasAudio(letter: string, audioFiles: Record<string, string>) {
  return audioFiles[letter] && audioFiles[letter] !== "";
}
