export interface BookData {
    id: string;
    title: string;
    somali: string;
    danish: string;
    description: string;
    coverImage: string;
    fliphtml5Url: string;
    ageGroup: string;
    difficulty: 'let' | 'mellem' | 'svær';
    category: 'eventyr' | 'læring' | 'historie' | 'sprog';
  }
  
  export const BOOKS_DATA: BookData[] = [
    {
      id: "book1",
      title: "Labo",
      somali: "Labo",
      danish: "To",
      description: "Bogen To handler om alt det, man kan gøre med kroppen.",
      coverImage: "/bog/tokrop.png",
      fliphtml5Url: "https://heyzine.com/flip-book/d5f00d5ba4.html",
      ageGroup: "3-6 år",
      difficulty: "let",
      category: "sprog"
    },
    {
      id: "book2", 
      title: "Jirkeyga",
      somali: "Jirkeyga",
      danish: "Min krop",
      description: "Bogen Min krop handler om et barn, der fortæller, hvad kroppen kan.",
      coverImage: "/bog/Minkrop.png", 
      fliphtml5Url: "https://heyzine.com/flip-book/09ffa3cde2.html",
      ageGroup: "3-6 år",
      difficulty: "let", 
      category: "læring"
    },
    {
      id: "book3",
      title: "Lær tallene på somalisk",
      somali: "Baro tirooyinka Soomaaliga",
      danish: "Lær tallene på somalisk", 
      description: "Interaktiv bog til at lære tal og optælling",
      coverImage: "/books/book3-cover.png",
      fliphtml5Url: "https://online.fliphtml5.com/your-flipbook-3/",
      ageGroup: "4-7 år", 
      difficulty: "let",
      category: "læring"
    },
    {
      id: "book4",
      title: "Somalias historie for børn",
      somali: "Taariikhda Soomaaliya ee carruurta",
      danish: "Somalias historie for børn",
      description: "En kort introducering til Somalias rige historie",
      coverImage: "/books/book4-cover.png",
      fliphtml5Url: "https://online.fliphtml5.com/your-flipbook-4/", 
      ageGroup: "7-12 år",
      difficulty: "svær",
      category: "historie"
    }
  ];
  
  export const getBooksByCategory = (category: string) => {
    return BOOKS_DATA.filter(book => book.category === category);
  };
  
  export const getBooksByDifficulty = (difficulty: 'let' | 'mellem' | 'svær') => {
    return BOOKS_DATA.filter(book => book.difficulty === difficulty);
  };
  