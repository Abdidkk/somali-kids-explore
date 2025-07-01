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
    danish: "Jeg er stået op",
    somali: "Waan soo kacay.",
    audio: "/daglig/jegerståetop.mp3",
    image: "/daglig/jegerligeståetop.png",
    category: "morgen",
  },
  {
    id: 2,
    danish: "Jeg tager tøj på",
    somali: "Dhar ayaan gashanayaa.",
    audio: "/daglig/jegtagertøjpå.mp3", 
    image: "/daglig/jegtagertøjpå.png",
    category: "morgen",
  },
  {
    id: 3,
    danish: "Jeg børster tænder",
    somali: "Ilkahayga ayaan iska cadaystaa.",
    audio: "/daily/quraac.mp3",
    image: "/daglig/jegbørstertænder.png",
    category: "morgen",
  },

  {
    id: 4,
    danish: "Jeg børster mit hår",
    somali: "Timaha ayaan iska sifeeyaa.",
    audio: "/daily/quraac.mp3",
    image: "/daglig/jegbørsterhår.png",
    category: "morgen",
  },

  {
    id: 5,
    danish: "Jeg spise mad",
    somali: "Waxaan cunayaa cunto.",
    audio: "/daglig/jegspisermad.mp3",
    image: "/daglig/jegspiser.png",
    category: "morgen",
  },

  {
    id: 6,
    danish: "Jeg tager sko på",
    somali: "kabaha ayaan xidhaa.",
    audio: "/daily/quraac.mp3",
    image: "/daglig/jegtagerskopå.png",
    category: "morgen",
  },  

  {
    id: 7,
    danish: "Jeg går til skole",
    somali: "Waxaan aadaa dugsiga.",
    audio: "/daglig/jegskaliskole.mp3",
    image: "/daglig/jeggårskole.png",
    category: "morgen",
  },  

  // Eftermiddag aktiviteter
  {
    id: 8,
    danish: "Jeg laver lektier",
    somali: "In la cuno qado",
    audio: "/daily/qado.mp3",
    image: "/daglig/jeglaverlektier.png",
    category: "eftermiddag",
  },
  {
    id: 9,
    danish: "Jeg lsæer en bog",
    somali: "In la ciyaaro",
    audio: "/daily/ciyaaro.mp3",
    image: "/daglig/jeglæserbog.png",
    category: "eftermiddag",
  },
  {
    id: 10,
    danish: "Jeg spiser en æble",
    somali: "In la akhriyo",
    audio: "/daily/akhriyo.mp3",
    image: "/daglig/jegspiseræble.png",
    category: "eftermiddag",
  },
  {
    id: 11,
    danish: "Jeg spiller fodbold",
    somali: "In la akhriyo",
    audio: "/daily/akhriyo.mp3",
    image: "/daglig/jegleger.png",
    category: "eftermiddag",
  },
  {
    id: 12,
    danish: "Jeg går hjem",
    somali: "In la akhriyo",
    audio: "/daily/akhriyo.mp3",
    image: "/daglig/jeggårhjem.png",
    category: "eftermiddag",
  },
  {
    id: 13,
    danish: "Jeg spiser frokost",
    somali: "In la akhriyo",
    audio: "/daily/akhriyo.mp3",
    image: "/daglig/jegspiserfrokost.png",
    category: "eftermiddag",
  },

  // Aften aktiviteter
  {
    id: 7,
    danish: "Jeg ser tv",
    somali: "In la cuno casho",
    audio: "/daily/casho.mp3",
    image: "/daglig/jegsertv.png",
    category: "aften",
  },
  {
    id: 8,
    danish: "Jeg leger med bror",
    somali: "In la hurdo",
    audio: "/daily/hurdo.mp3",
    image: "/daglig/legermedbror.png",
    category: "aften",
  },
  {
    id: 9,
    danish: "Jeg spiser aftensmad med familien",
    somali: "Habeen wanaagsan",
    audio: "/daily/habeen.mp3",
    image: "/daglig/jegspiserfamilie.png",
    category: "aften",
  },
  {
    id: 10,
    danish: "Jeg rydder op",
    somali: "Habeen wanaagsan",
    audio: "/daily/habeen.mp3",
    image: "/daglig/jegrydderop.png",
    category: "aften",
  },
  {
    id: 11,
    danish: "Jeg skal sove",
    somali: "Habeen wanaagsan",
    audio: "/daily/habeen.mp3",
    image: "/daglig/jegskalsove.png",
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
