
import { SHORT_VOWELS, LONG_VOWELS } from "./letterGroups";
import { ALPHABET_IMAGES } from "./imageMapping";
import { AUDIO_FILES } from "./audioMapping";

// Helper functions for alphabet operations
export const isVowel = (letter: string) => {
  return SHORT_VOWELS.includes(letter) || LONG_VOWELS.includes(letter);
};

export const hasImage = (letter: string) => {
  return ALPHABET_IMAGES[letter]?.img && ALPHABET_IMAGES[letter].img !== "";
};

export const hasAudio = (letter: string) => {
  return AUDIO_FILES[letter] && AUDIO_FILES[letter] !== "";
};
