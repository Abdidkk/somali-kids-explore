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
      danish: "Min mor hedder Libin",
      somali: "Hooyada magaceeda waa Libin",
      incomplete: "Hooyada magaceeda waa ____",
      options: ["Libin", "Sarah", "Fatima", "Nimco"],
      correct: "Libin",
      audio: "/familie/minmor.mp3",
      image: "/familie/mor.png",
      difficulty: "let",
      theme: "familie"
    },

    {
    id: "s1",
    danish: "Jeg elsker dig",
    somali: "Waan ku jeclahay",
    incomplete: "Waan ku  ____",
    options: ["ku", "jeclahay", "Waan",],
    correct: "jeclahay",
    audio: "/familie/jegelskerdig.mp3",
    image: "/familie/jegelskerdig.png",
    difficulty: "let",
    theme: "familie"
  },

  {
    id: "s2",
    danish: "jeg savner dig",
    somali: "Waan ku xisey",
    incomplete: "Waan ___ xisey",
    options: ["waan", "ku", "xisey",],
    correct: "ku",
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
      audio: "/sætninger/jeggårhverdag.mp3",
      image: "/daglig/jeggårskole.png",
      difficulty: "mellem",
      theme: "daglig"
    },
      
    {
      id: "s6",
      danish: "Jeg er glad i dag",
      somali: "Maanta waan faraxsanahay",
      incomplete: "Maanta waan ____",
      options: ["faraxsanahay", "cabanayaa", "baqayaa", "neefsanayaa"],
      correct: "faraxsanahay",
      audio: "/sætninger/idagerjegglad.mp3",
      image: "/billeder/glad.png", 
      difficulty: "mellem",
      theme: "følelser"
    },

    {
      id: "s7",
      danish: "Jeg er glad i dag",
      somali: "Maanta waan faraxsanahay",
      incomplete: "Maanta waan ____",
      options: ["faraxsanahay", "cabanayaa", "baqayaa", "neefsanayaa"],
      correct: "faraxsanahay",
      audio: "/sætninger/idagerjegglad.mp3",
      image: "/sætninger/3bolde.png", 
      difficulty: "mellem",
      theme: "følelser"
    },

    {
      id: "s8",
      danish: "Jeg er glad i dag",
      somali: "Maanta waan faraxsanahay",
      incomplete: "Maanta waan ____",
      options: ["faraxsanahay", "cabanayaa", "baqayaa", "neefsanayaa"],
      correct: "faraxsanahay",
      audio: "/sætninger/idagerjegglad.mp3",
      image: "/sætninger/banangul.png", 
      difficulty: "mellem",
      theme: "følelser"
    },

    {
      id: "s9",
      danish: "Jeg er glad i dag",
      somali: "Maanta waan faraxsanahay",
      incomplete: "Maanta waan ____",
      options: ["faraxsanahay", "cabanayaa", "baqayaa", "neefsanayaa"],
      correct: "faraxsanahay",
      audio: "/sætninger/idagerjegglad.mp3",
      image: "/sætninger/blåtrøje.png", 
      difficulty: "mellem",
      theme: "følelser"
    },

    // svær
    {
      id: "s10",
      danish: "Jeg er glad i dag",
      somali: "Maanta waan faraxsanahay",
      incomplete: "Maanta waan ____",
      options: ["faraxsanahay", "cabanayaa", "baqayaa", "neefsanayaa"],
      correct: "faraxsanahay",
      audio: "/sætninger/idagerjegglad.mp3",
      image: "/sætninger/jegbliver9.png", 
      difficulty: "svær",
      theme: "følelser"
    },

    {
      id: "s11",
      danish: "Jeg er glad i dag",
      somali: "Maanta waan faraxsanahay",
      incomplete: "Maanta waan ____",
      options: ["faraxsanahay", "cabanayaa", "baqayaa", "neefsanayaa"],
      correct: "faraxsanahay",
      audio: "/sætninger/idagerjegglad.mp3",
      image: "/sætninger/hvidbil.png", 
      difficulty: "svær",
      theme: "følelser"
    },

    {
      id: "s12",
      danish: "Jeg er glad i dag",
      somali: "Maanta waan faraxsanahay",
      incomplete: "Maanta waan ____",
      options: ["faraxsanahay", "cabanayaa", "baqayaa", "neefsanayaa"],
      correct: "faraxsanahay",
      audio: "/sætninger/idagerjegglad.mp3",
      image: "/sætninger/slåetfinger.png", 
      difficulty: "svær",
      theme: "følelser"
    },

    {
      id: "s13",
      danish: "Jeg er glad i dag",
      somali: "Maanta waan faraxsanahay",
      incomplete: "Maanta waan ____",
      options: ["faraxsanahay", "cabanayaa", "baqayaa", "neefsanayaa"],
      correct: "faraxsanahay",
      audio: "/sætninger/idagerjegglad.mp3",
      image: "/sætninger/jegspiserslik.png", 
      difficulty: "svær",
      theme: "følelser"
    },

    {
      id: "s14",
      danish: "Jeg er glad i dag",
      somali: "Maanta waan faraxsanahay",
      incomplete: "Maanta waan ____",
      options: ["faraxsanahay", "cabanayaa", "baqayaa", "neefsanayaa"],
      correct: "faraxsanahay",
      audio: "/sætninger/idagerjegglad.mp3",
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
      somali: "Hooyadu waa macaan",
      words: ["macaan", "waa", "Hooyadu"],
      correct: ["Hooyadu", "waa", "macaan"],
      audio: "/saetninger/unjumble1.mp3",
      image: "/familie/mor.png",
      difficulty: "let",
      theme: "familie"
    },
    {
      id: "u2", 
      danish: "Jeg drikker vand",
      somali: "Biyo baan cabbaa",
      words: ["cabbaa", "Biyo", "baan"],
      correct: ["Biyo", "baan", "cabbaa"],
      audio: "/saetninger/unjumble2.mp3",
      image: "/sætninger/drikkervand.png",
      difficulty: "let",
      theme: "mad"
    },
    
    // Mellem niveau
    {
      id: "u3",
      danish: "Min bror spiller fodbold",
      somali: "Walaalkay kubadda cagta ayuu ciyaaraa",
      words: ["ciyaaraa", "kubadda", "Walaalkay", "cagta", "ayuu"],
      correct: ["Walaalkay", "kubadda", "cagta", "ayuu", "ciyaaraa"],
      audio: "/saetninger/unjumble3.mp3",
      image: "/familie/bror.png",
      difficulty: "mellem", 
      theme: "familie"
    },
    
    // Svær niveau
    {
      id: "u4",
      danish: "Vi er søskende",
      somali: "Subax walba quraac ayaanu isla cunaa",
      words: ["isla", "quraac", "cunaa", "Subax", "walba", "ayaanu"],
      correct: ["Subax", "walba", "quraac", "ayaanu", "isla", "cunaa"],
      audio: "/saetninger/unjumble4.mp3",
      image: "/familie/sammen.png",
      difficulty: "svær",
      theme: "daglig"
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
  