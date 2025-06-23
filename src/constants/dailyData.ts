export interface DailyItem {
  id: number;
  danish: string;
  somali: string;
  audio?: string;
  image?: string;
  category: string;
}

export const DAILY_ACTIVITIES: DailyItem[] = [
  // Morgen aktiviteter
  {
    id: 1,
    danish: "At vågne",
    somali: "In la tooso",
    audio: "/daily/tooso.mp3",
    image: "https://images.unsplash.com/photo-1564424224827-cd24b8915874",
    category: "morgen",
  },
  {
    id: 2,
    danish: "At børste tænder",
    somali: "In la cadeeyo",
    audio: "/daily/cadeeyo.mp3", 
    image: "https://images.unsplash.com/photo-1609842947811-471b4b30a179",
    category: "morgen",
  },
  {
    id: 3,
    danish: "At spise morgenmad",
    somali: "In la cuno quraac",
    audio: "/daily/quraac.mp3",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666",
    category: "morgen",
  },
  // Eftermiddag aktiviteter
  {
    id: 4,
    danish: "At spise frokost",
    somali: "In la cuno qado",
    audio: "/daily/qado.mp3",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
    category: "eftermiddag",
  },
  {
    id: 5,
    danish: "At lege",
    somali: "In la ciyaaro",
    audio: "/daily/ciyaaro.mp3",
    image: "https://images.unsplash.com/photo-1587139223877-04cb899fa3e8",
    category: "eftermiddag",
  },
  {
    id: 6,
    danish: "At læse",
    somali: "In la akhriyo",
    audio: "/daily/akhriyo.mp3",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
    category: "eftermiddag",
  },
  // Aften aktiviteter
  {
    id: 7,
    danish: "At spise aftensmad",
    somali: "In la cuno casho",
    audio: "/daily/casho.mp3",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975",
    category: "aften",
  },
  {
    id: 8,
    danish: "At gå i seng",
    somali: "In la hurdo",
    audio: "/daily/hurdo.mp3",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
    category: "aften",
  },
  {
    id: 9,
    danish: "At sige godnat",
    somali: "Habeen wanaagsan",
    audio: "/daily/habeen.mp3",
    image: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5",
    category: "aften",
  },
];

export interface DailySentence {
  id: number;
  danish: string;
  somali: string;
  words: string[];
  correctOrder: string[];
  difficulty: "let" | "mellem" | "svær";
}

export const DAILY_SENTENCES: DailySentence[] = [
  {
    id: 1,
    danish: "Jeg spiser morgenmad",
    somali: "Waxaan cunayaa quraac",
    words: ["cunayaa", "Waxaan", "quraac"],
    correctOrder: ["Waxaan", "cunayaa", "quraac"],
    difficulty: "let",
  },
  {
    id: 2,
    danish: "Vi leger sammen",
    somali: "Waxaan wada ciyaaraynaa",
    words: ["ciyaaraynaa", "wada", "Waxaan"],
    correctOrder: ["Waxaan", "wada", "ciyaaraynaa"],
    difficulty: "let",
  },
  {
    id: 3,
    danish: "Han går i seng klokken otte",
    somali: "Wuxuu hurdaa siddeedda",
    words: ["siddeedda", "hurdaa", "Wuxuu"],
    correctOrder: ["Wuxuu", "hurdaa", "siddeedda"],
    difficulty: "mellem",
  },
  {
    id: 4,
    danish: "Hun børster sine tænder hver morgen",
    somali: "Waxay cadeysaa ilkeeda subax walba",
    words: ["subax", "cadeysaa", "walba", "ilkeeda", "Waxay"],
    correctOrder: ["Waxay", "cadeysaa", "ilkeeda", "subax", "walba"],
    difficulty: "svær",
  },
];

export const getDailyByCategory = (category: string) => {
  return DAILY_ACTIVITIES.filter(item => item.category === category);
};

export const getDailySentencesByDifficulty = (difficulty: "let" | "mellem" | "svær") => {
  return DAILY_SENTENCES.filter(sentence => sentence.difficulty === difficulty);
};
