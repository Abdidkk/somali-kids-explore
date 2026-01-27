export interface SentenceItem {
    id: string;
    danish: string;
    somali: string;
    incomplete: string; // Sætning med blank
    options: string[]; // Multiple choice muligheder
    correct: string; // Korrekt svar
    audio?: string;
    image?: string;
    difficulty: 'let' | 'mellem' | 'svær';
    theme: 'familie' | 'mad' | 'farver' | 'daglig' | 'følelser';
  }
  
  export interface UnjumbleItem {
    id: string;
    danish: string;
    somali: string;
    words: string[]; // Scrambled ord
    correct: string[]; // Korrekt rækkefølge
    audio?: string;
    image?: string;
    difficulty: 'let' | 'mellem' | 'svær';
    theme: 'familie' | 'mad' | 'farver' | 'daglig' | 'følelser';
  }
  
  export const sentenceData: SentenceItem[] = [
    // Let
    {
      id: "s1",
      danish: "Min mor hedder Hawa",
      somali: "Hooyadey magaceeda waa Hawa",
      incomplete: "Hooyada magaceeda waa ____",
      options: ["Hawa", "Sarah", "Fatima", "Amina"],
      correct: "Hawa",
      audio: "/familie/hawa.mp3",
      image: "/familie/mor.png",
      difficulty: "let",
      theme: "familie"
    },

    {
    id: "s1",
    danish: "Jeg elsker dig",
    somali: "Waan ku jeclahay",
    incomplete: "Waan kuu  ____",
    options: ["kuu", "jeclahay", "Waan", "xisey"],
    correct: "jeclahay",
    audio: "/familie/jegelskerdig.mp3",
    image: "/familie/jegelskerdig.png",
    difficulty: "let",
    theme: "familie"
  },

  {
    id: "s2",
    danish: "jeg savner dig",
    somali: "Waan kuu xisey",
    incomplete: "Waan ___ xisey",
    options: ["waan", "kuu", "xisey", "jeclahay"],
    correct: "kuu",
    audio: "/familie/jegsavnerdig.mp3",
    image: "/familie/savn.png",
    difficulty: "let",
    theme: "familie"
  },

    {
      id: "s3", 
      danish: "Jeg elsker min familie",
      somali: "Waan jeclahay qoyskayga",
      incomplete: "Waan jeclahay ____",
      options: ["qoyskayga", "macalinlka", "dugsiga", "cuntada"],
      correct: "qoyskayga",
      audio: "/sætninger/jegelskerminfamilie.mp3", 
      image: "/familie/familie.png",
      difficulty: "let",
      theme: "familie"
    },
    
    {
      id: "s4",
      danish: "Jeg spiser en æble",
      somali: "Waxaan cunayaa tufaax",
      incomplete: "Waxaan cunayaa ____",
      options: ["tufaax", "hilib", "caano", "bariis"],
      correct: "tufaax",
      audio: "/daglig/jegspiseræble.mp3",
      image: "/daglig/jegspiseræble.png",
      difficulty: "let", 
      theme: "mad"
    },
    
    //  Mellem

    {
      id: "s5",
      danish: "Jeg går i skole hver dag",
      somali: "Maalin walba dugsiga baan tagaa",
      incomplete: "Maalin walba ____ baan tagaa",
      options: ["dugsiga", "suuqa", "guriga", "beerta"],
      correct: "dugsiga",
      audio: "/sætninger/s55.mp3",
      image: "/daglig/s5.png",
      difficulty: "mellem",
      theme: "daglig"
    },
      
    {
      id: "s6",
      danish: "Jeg er glad i dag",
      somali: "Maanta waan faraxsanahay",
      incomplete: "Maanta waan ____",
      options: ["faraxsanahay", "cabsanaya", "baqayaa", "nasanaaya"],
      correct: "faraxsanahay",
      audio: "/sætninger/idagerjegglad.mp3",
      image: "/billeder/glad.png", 
      difficulty: "mellem",
      theme: "følelser"
    },

    {
      id: "s7",
      danish: "jeg har tre bolde",
      somali: "Waxaan hayaa saddex kubbadood",
      incomplete: "Waxaan hayaa ___ Kubadood",
      options: ["4", "2", "3", "1"],
      correct: "3",
      audio: "/sætninger/jeghar3bolde.mp3",
      image: "/sætninger/3bolde.png", 
      difficulty: "mellem",
      theme: "følelser"
    },

    {
      id: "s8",
      danish: "Min banan er gul",
      somali: "Mooskeygu waa Jaalle.",
      incomplete: "Mooskeygu waa ____",
      options: ["gaduud", "cagaar", "jaalle", "Oranji"],
      correct: "jaalle",
      audio: "/sætninger/minbananergul.mp3",
      image: "/sætninger/banangul.png", 
      difficulty: "mellem",
      theme: "følelser"
    },

    {
      id: "s9",
      danish: "Min trøje er blå",
      somali: "Funaanadeyda waa buluug",
      incomplete: "Funaanadeyda waa ____",
      options: ["fiyoole", "buluug", "bunni", "madow"],
      correct: "buluug",
      audio: "/sætninger/s99.mp3",
      image: "/sætninger/s9.png", 
      difficulty: "mellem",
      theme: "følelser"
    },

    // svær
    {
      id: "s10",
      danish: "Jeg bliver ni år",
      somali: "Waxaan noqonayaa sagaal jir",
      incomplete: "Waxaan noqonayaa ____ jir",
      options: ["7", "9", "5", "8"],
      correct: "9",
      audio: "/sætninger/jegbliver9.mp3",
      image: "/sætninger/jegbliver9.png", 
      difficulty: "svær",
      theme: "følelser"
    },

    {
      id: "s11",
      danish: "Denne bil er hvid",
      somali: "Gaarigaan waa caddaan.",
      incomplete: "Gaarigaan waa ____",
      options: ["maadow", "cagaar", "jaalle", "caddaan"],
      correct: "caddaan",
      audio: "/sætninger/hvidbil.mp3",
      image: "/sætninger/hvidbil.png", 
      difficulty: "svær",
      theme: "følelser"
    },

    {
      id: "s12",
      danish: "Jeg har slået min finger",
      somali: "Farta ayaan iska dhaawacay",
      incomplete: "___ ayan iska dhaawcay",
      options: ["timo", "farta", "ilko", "af"],
      correct: "farta",
      audio: "/sætninger/farta.mp3",
      image: "/sætninger/s12.png", 
      difficulty: "svær",
      theme: "følelser"
    },

    {
      id: "s13",
      danish: "Jeg spiser en slikpinde",
      somali: "Waxaan cunayaa nacnac qori",
      incomplete: "Waxaan cunayaa nacnac qori",
      options: ["basal", "doolsho", "nacnac qori", "bataati"],
      correct: "nacnac qori",
      audio: "/sætninger/qori.mp3",
      image: "/sætninger/jegspiserslik.png", 
      difficulty: "svær",
      theme: "følelser"
    },

    {
      id: "s14",
      danish: "jeg giver mad til min kat",
      somali: "Waxaan siinayaa bisadayda cunto",
      incomplete: "Waxaan siinayaa ____ cunto",
      options: ["eey", "bisadayda", "faras", "libaax"],
      correct: "bisadayda",
      audio: "/sætninger/madtilminkat.mp3",
      image: "/sætninger/katmad.png", 
      difficulty: "svær",
      theme: "følelser"
    },

  ];
  
  export const unjumbleData: UnjumbleItem[] = [
    // Let niveau
    {
      id: "u1",
      danish: "Min mor er sød",
      somali: "Hooyadeey wey naxaris baddantahey",
      words: ["Hooyadeey", "baddantahey", "wey", "naxaris"],
      correct: ["Hooyadeey", "wey", "naxaris", "baddantahey"],
      audio: "/sætninger/Mor.mp3",
      image: "/familie/mor.png",
      difficulty: "let",
      theme: "familie"
    },
    {
      id: "u2",
      danish: "Min far er 30 år",
      somali: "aabahay waa soddon jir",
      words: ["waa", "soddon", "aabahay", "jir"],
      correct: ["aabahay", "waa", "soddon", "jir"],
      audio: "/sætninger/minfar30.mp3",
      image: "/familie/far.png",
      difficulty: "let",
      theme: "familie"
    },
    {
      id: "u2", 
      danish: "Jeg drikker vand",
      somali: "waxaan cabooyaa biyo",
      words: ["cabooyaa", "biyo", "waxaan"],
      correct: ["waxaan", "cabooyaa", "biyo"],
      audio: "/sætninger/biyo.mp3",
      image: "/sætninger/drikkervand.png",
      difficulty: "let",
      theme: "mad"
    },
    
    // Mellem niveau
    {
      id: "u3",
      danish: "Jeg holder en rød blomst",
      somali: "waxaan hayaa ubax gaduud ah",
      words: ["gaduud", "ah", "ubax", "hayaa", "waxaan"],
      correct: ["waxaan", "hayaa", "ubax", "gaduud", "ah"],
      audio: "/sætninger/rødblomst.mp3",
      image: "/sætninger/rødblomst.png",
      difficulty: "mellem", 
      theme: "daglig"
    },
    {
      id: "u4",
      danish: "Jeg er bange for en hund",
      somali: "waxaan ka baqayaa eey",
      words: ["baqayaa", "eey", "ka", "waxaan",],
      correct: ["waxaan", "ka", "baqayaa", "eey",],
      audio: "/sætninger/jegerbangeforhund.mp3",
      image: "/sætninger/bangeforhun.png",
      difficulty: "mellem",
      theme: "daglig"
    },
    {
      id: "u5",
      danish: "Vi er søskende",
      somali: "Waxaan nahay walaalo",
      words: ["nahay", "Waxaan", "walaalo",],
      correct: ["Waxaan", "nahay", "walaalo",],
      audio: "/sætninger/viersøskende.mp3",
      image: "/familie/sammen.png",
      difficulty: "mellem",
      theme: "familie"
    },

    // Svær niveau

    {
      id: "u6",
      danish: "Vi skal til england",
      somali: "waxaan u soconnaa Ingiriiska.",
      words: ["u", "Waxaan", "Ingiriiska","soconnaa"],
      correct: ["Waxaan", "u", "soconnaa", "Ingiriiska"],
      audio: "/sætninger/viskaltilengland.mp3",
      image: "/sætninger/viskaltilengland.png",
      difficulty: "svær",
      theme: "familie"
    },

    {
      id: "u7",
      danish: "Vi har 4 stole som er sorte",
      somali: "Waxaan leenahay afar kursi oo madow ah",
      words: ["leenahay", "Waxaan", "kursi","afar", "madow", "oo", "ah"],
      correct: ["Waxaan", "leenahay", "afar", "kursi", "oo", "madow", "ah"],
      audio: "/sætninger/4stole.mp3",
      image: "/sætninger/4stoler.png",
      difficulty: "svær",
      theme: "familie"
    },

    {
      id: "u8",
      danish: "Det er en stor blå ur",
      somali: "tani waa saacad weyn oo buluug ah",
      words: ["waa", "weyn", "saacaddan","ah", "buluug", "oo", "tani"],
      correct: ["tani", "waa", "saacad", "weyn", "oo", "buluug", "ah"],
      audio: "/sætninger/ur.mp3",
      image: "/sætninger/blaur.png",
      difficulty: "svær",
      theme: "familie"
    },

  ];
  
  export const getSentencesByDifficulty = (difficulty: 'let' | 'mellem' | 'svær') => {
    return sentenceData.filter(item => item.difficulty === difficulty);
  };
  
  export const getUnjumbleByDifficulty = (difficulty: 'let' | 'mellem' | 'svær') => {
    return unjumbleData.filter(item => item.difficulty === difficulty);
  };
  
  export const getSentencesByTheme = (theme: 'familie' | 'mad' | 'farver' | 'daglig' | 'følelser') => {
    return sentenceData.filter(item => item.theme === theme);
  };
  