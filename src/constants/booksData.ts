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
      title: "Min første somaliske bog",
      somali: "Buuggayga ugu horeeyay ee Soomaaliga ah",
      danish: "Min første somaliske bog",
      description: "En introduktionsbog til somalisk sprog og kultur",
      coverImage: "/books/book1-cover.png",
      fliphtml5Url: "https://online.fliphtml5.com/your-flipbook-1/",
      ageGroup: "3-6 år",
      difficulty: "let",
      category: "sprog"
    },
    {
      id: "book2", 
      title: "Somaliske eventyr",
      somali: "Sheekooyin Soomaaliyeed",
      danish: "Somaliske eventyr",
      description: "Klassiske somaliske folk eventyr og historier",
      coverImage: "/books/book2-cover.png", 
      fliphtml5Url: "https://online.fliphtml5.com/your-flipbook-2/",
      ageGroup: "5-8 år",
      difficulty: "mellem", 
      category: "eventyr"
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
  