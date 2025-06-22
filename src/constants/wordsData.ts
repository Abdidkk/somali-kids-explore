
export interface WordItem {
  danish: string;
  somali: string;
  audio?: string;
  image?: string;
  category: string; // 👈 tilføj denne linje
}

export const WORDS: WordItem[] = [
  {
    danish: "Stol",
    somali: "Kursi",
    audio: "/Words/Kursi.mp3",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    category: "hjem", // 👈 tilføj kategori
  },
  {
    danish: "Sofa",
    somali: "Sariir",
    audio: "/Words/Sariir.mp3",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    category: "stuen",
  },
  {
    danish: "Bord",
    somali: "Miis",
    audio: "/Words/Miis.mp3",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    category: "køkken", // 👈 denne kan være "quiz"

  },
]; 

export const getWordsByCategory = (category: string) => {
  return WORDS.filter(word => word.category === category);
}; 