
export interface WordItem {
  danish: string;
  somali: string;
  audio?: string;
  image?: string;
}

export interface WordSentence {
  danish: string;
  somali: string;
  words: string[]; // Somaliske ord i korrekt rækkefølge
  audio?: string;
  image?: string;
}

export const WORDS: WordItem[] = [
  { 
    danish: "Stol", 
    somali: "Kursi", 
    audio: "/Words/Kursi.mp3",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
  },
  { 
    danish: "Sofa", 
    somali: "Sariir", 
    audio: "/Words/Sariir.mp3",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
  },
  { 
    danish: "Bord", 
    somali: "Miis", 
    audio: "/Words/Miis.mp3",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
  },
  // Tilføj flere ord og sæt audio-filnavne efter du har uploadet dem
];

export const WORD_SENTENCES: WordSentence[] = [
  {
    danish: "Stolen står ved bordet",
    somali: "Kursigu waxa uu yaalaa miiska agtiisa",
    words: ["Kursigu", "waxa", "uu", "yaalaa", "miiska", "agtiisa"],
    audio: "/Words/Stolen.mp3",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
  },
  {
    danish: "Sofaen er grøn",
    somali: "Sariirtu waa cagaar",
    words: ["Sariirtu", "waa", "cagaar"],
    audio: "/Words/Sofaen.mp3",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
  }
  // Tilføj flere!
];

export const WORDS_AUDIO_FILES: Record<string, string> = {
  "Kursi": "/Words/Kursi.mp3",
  "Sariir": "/Words/Sariir.mp3",
  "Miis": "/Words/Miis.mp3",
  // ... udfyld når du uploader egne filer
};
