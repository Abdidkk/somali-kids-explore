
import { SHORT_VOWELS, LONG_VOWELS, CONSONANTS } from "@/constants/alphabetData";

// Generate a sequence based on the selected tab
export const generateSequence = (activeTab: string): { sequence: string[], answer: string } => {
  let letters: string[] = [];
  
  switch(activeTab) {
    case "korte-vokaler":
      letters = [...SHORT_VOWELS];
      // For vowels, create shorter sequences with varied starting points
      const shortVowelStart = Math.floor(Math.random() * (SHORT_VOWELS.length - 2));
      const shortVowelLength = Math.min(2 + Math.floor(Math.random() * 2), SHORT_VOWELS.length - shortVowelStart);
      return {
        sequence: SHORT_VOWELS.slice(shortVowelStart, shortVowelStart + shortVowelLength - 1),
        answer: SHORT_VOWELS[shortVowelStart + shortVowelLength - 1]
      };
    case "lange-vokaler":
      letters = [...LONG_VOWELS];
      // For vowels, create shorter sequences with varied starting points
      const longVowelStart = Math.floor(Math.random() * (LONG_VOWELS.length - 2));
      const longVowelLength = Math.min(2 + Math.floor(Math.random() * 2), LONG_VOWELS.length - longVowelStart);
      return {
        sequence: LONG_VOWELS.slice(longVowelStart, longVowelStart + longVowelLength - 1),
        answer: LONG_VOWELS[longVowelStart + longVowelLength - 1]
      };
    case "alfabetet":
    default:
      // Select a continuous subset of consonants (3-5 letters)
      const startIdx = Math.floor(Math.random() * (CONSONANTS.length - 5));
      letters = CONSONANTS.slice(startIdx, startIdx + Math.floor(Math.random() * 2) + 3);
      break;
  }
  
  // For consonants, use the original logic
  const sequenceLength = Math.min(letters.length - 1, 3);
  const sequence = letters.slice(0, sequenceLength);
  
  // The answer is the next letter in the sequence
  const answer = letters[sequenceLength];
  
  return { sequence, answer };
};

// Generate multiple choice options based on the active tab
export const generateOptions = (correctAnswer: string, activeTab: string): string[] => {
  let allOptions: string[] = [];
  
  switch(activeTab) {
    case "korte-vokaler":
      allOptions = [...SHORT_VOWELS];
      break;
    case "lange-vokaler":
      allOptions = [...LONG_VOWELS];
      break;
    case "alfabetet":
    default:
      // For consonants, include nearby letters in the alphabet
      const idx = CONSONANTS.indexOf(correctAnswer);
      const start = Math.max(0, idx - 4);
      const end = Math.min(CONSONANTS.length, idx + 5);
      allOptions = CONSONANTS.slice(start, end);
      break;
  }
  
  // Exclude the correct answer from the pool (we'll add it back later)
  allOptions = allOptions.filter(letter => letter !== correctAnswer);
  
  // Shuffle the options and take 3 (or fewer if not enough options)
  allOptions = allOptions.sort(() => Math.random() - 0.5).slice(0, 3);
  
  // Add the correct answer and shuffle again
  allOptions.push(correctAnswer);
  return allOptions.sort(() => Math.random() - 0.5);
};

// Play success sound
export const playSuccessSound = () => {
  const audio = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2ooVoLAIFUz9JpJiqeAJzKvHQCQZzxyPT7HbzgudJbGIoPyMXnHG/QtOAVp0tQxfjTzbPnMskFygDgwAAAQRC/AAO+KbuwAAAAAA");
  audio.play().catch(e => console.error("Audio playback failed:", e));
};
