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
    audio: "/daglig/jegbørstertænder.mp3",
    image: "/daglig/jegbørstertænder.png",
    category: "morgen",
  },

  {
    id: 4,
    danish: "Jeg børster mit hår",
    somali: "Timaha ayaan iska sifeeyaa.",
    audio: "/daglig/jegbørsterminhår.mp3",
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
    somali: "Waxaan xiranayaa kabo",
    audio: "/daglig/jegtagerskopå.mp3",
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
    somali: "Waxaan sameynayaa guriga",
    audio: "/daglig/jeglaverlektier.mp3",
    image: "/daglig/jeglaverlektier.png",
    category: "eftermiddag",
  },
  {
    id: 9,
    danish: "Jeg læser en bog",
    somali: "Waxaan akhrinayaa buug",
    audio: "/daglig/jeglæserbog.mp3",
    image: "/daglig/jeglæserbog.png",
    category: "eftermiddag",
  },
  {
    id: 10,
    danish: "Jeg spiser en æble",
    somali: "Waxaan cunayaa tufaax",
    audio: "/daglig/jegspiseræble.mp3",
    image: "/daglig/jegspiseræble.png",
    category: "eftermiddag",
  },
  {
    id: 11,
    danish: "Jeg spiller fodbold",
    somali: "Waxaan ciyaarayaa kubadda",
    audio: "/daglig/jegspillerfodbold.mp3",
    image: "/daglig/jegleger.png",
    category: "eftermiddag",
  },
  {
    id: 12,
    danish: "Jeg går hjem",
    somali: "Waxaan u socdaa guriga",
    audio: "/daglig/jegerpåvejhjem.mp3",
    image: "/daglig/jeggårhjem.png",
    category: "eftermiddag",
  },
  {
    id: 13,
    danish: "Jeg spiser frokost",
    somali: "Waxaan cunayaa qado",
    audio: "/daglig/jegspiserfrokost.mp3",
    image: "/daglig/jegspiserfrokost.png",
    category: "eftermiddag",
  },

  // Aften aktiviteter
  {
    id: 7,
    danish: "Jeg ser tv",
    somali: "Waxaan daawanayaa telefishinka",
    audio: "/daglig/jegsertv.mp3",
    image: "/daglig/jegsertv.png",
    category: "aften",
  },
  {
    id: 8,
    danish: "Jeg leger med bror",
    somali: "Waxaan la ciyarayaa walaalkay",
    audio: "/daglig/legermedlillebror.mp3",
    image: "/daglig/legermedbror.png",
    category: "aften",
  },
  {
    id: 9,
    danish: "Jeg spiser aftensmad med familien",
    somali: "Waxaan la cunayaa casho qoyskeyga",
    audio: "/daglig/jegspiserfamilie.mp3",
    image: "/daglig/jegspiserfamilie.png",
    category: "aften",
  },
  {
    id: 10,
    danish: "Jeg rydder op",
    somali: "Waxaan sameynayaa shaqada guriga",
    audio: "/daglig/jegrydderop.mp3",
    image: "/daglig/jegrydderop.png",
    category: "aften",
  },
  {
    id: 11,
    danish: "Jeg skal sove",
    somali: "Waa seexanayaa",
    audio: "/daglig/jegsover.mp3",
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
    danish: "Jeg er stået op",
    somali: "Waan soo kacay",
    words: ["soo", "Waan", "kacay"],
    correctOrder: ["Waan", "soo", "kacay"],
    difficulty: "let",
  },
  {
    id: 2,
    danish: "jeg spiser morgenmad",
    somali: "Waxaan cunayaa quraac",
    words: ["cunayaa", "quraac", "Waxaan"],
    correctOrder: ["Waxaan", "cunayaa", "quraac"],
    difficulty: "let",
  },
  {
    id: 3,
    danish: "Jeg laver lektier",
    somali: "Waxaan u socdaa guriga",
    words: ["u", "Waxaan", "guriga", "socdaa"],
    correctOrder: ["Waxaan", "u", "socdaa", "guriga"],
    difficulty: "mellem",
  },
  {
    id: 4,
    danish: "Jeg spiser en æble",
    somali: "Waxaan cunayaa tufaax",
    words: ["tufaax", "Waxaan", "cunayaa",],
    correctOrder: ["Waxaan", "cunayaa", "tufaax",],
    difficulty: "mellem",
  },
  {
    id: 5,
    danish: "Jeg leger med bror",
    somali: "Waxaan la ciyarayaa walaalkay",
    words: ["walaalkay", "ciyarayaa", "la","Waxaan",],
    correctOrder: ["Waxaan", "la", "ciyarayaa","walaalkay",],
    difficulty: "svær",
  },
  {
    id: 6,
    danish: "Jeg spiser aftensmad med familien",
    somali: "Waxaan la cunayaa casho qoyskeyga",
    words: ["Waxaan", "qoyskeyga", "cunayaa ","la","casho",],
    correctOrder: ["Waxaan", "la", "cunayaa","casho","qoyskeyga"],
    difficulty: "svær",
  },
];

export const getDailyByCategory = (category: string) => {
  return DAILY_ACTIVITIES.filter(item => item.category === category);
};

export const getDailySentencesByDifficulty = (difficulty: "let" | "mellem" | "svær") => {
  return DAILY_SENTENCES.filter(sentence => sentence.difficulty === difficulty);
};
