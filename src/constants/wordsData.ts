
export interface WordItem {
  danish: string;
  somali: string;
  audio?: string;
  image?: string;
  category: string; // 👈 tilføj denne linje
}

export const WORDS: WordItem[] = [
  {danish: "Dør", somali: "Albaab", audio: "/ord/stol.mp3", image: "/ord/dør.png", category: "hjem",},
  {danish: "Vindue", somali: "Daaqad", audio: "/ord/vindue.mp3", image: "/ord/vindue.png", category: "hjem",},
  {danish: "Seng", somali: "Sariir", audio: "/ord/stol.mp3", image: "/ord/seng.png", category: "hjem",},
  {danish: "Toilet", somali: "Musqul", audio: "/ord/stol.mp3", image: "/ord/toilet.png", category: "hjem",},
  {danish: "Penge", somali: "Lacag", audio: "/ord/stol.mp3", image: "/ord/penge.png", category: "hjem",},
  {danish: "Nøgle", somali: "Fure", audio: "/ord/stol.mp3", image: "/ord/nogle.png", category: "hjem",},
  {danish: "Mobil", somali: "Moobil", audio: "/ord/stol.mp3", image: "/ord/mobil.png", category: "hjem",},
  {danish: "Bog", somali: "Buug", audio: "/ord/stol.mp3", image: "/ord/bog.png", category: "hjem",},
  {danish: "Papir", somali: "Warqad", audio: "/ord/stol.mp3", image: "/ord/papir.png", category: "hjem",},
  {danish: "Kuglepen", somali: "Qalinka", audio: "/ord/stol.mp3", image: "/ord/kuglepen.png", category: "hjem",},
  {danish: "Spejl", somali: "Muraayad", audio: "/ord/stol.mp3", image: "/ord/spejl.png", category: "hjem",},
  {danish: "Sko", somali: "Kabaha", audio: "/ord/stol.mp3", image: "/ord/sko.png", category: "hjem",},
  {danish: "Bil", somali: "Baabuur", audio: "/ord/stol.mp3", image: "/ord/bil.png", category: "hjem",},

  {danish: "Sofa", somali: "Sariir", audio: "/Words/Sariir.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "stuen",},
  {danish: "Stol", somali: "Kursi", audio: "/Words/Sariir.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "stuen",},
  {danish: "Sofabord", somali: "Miiska fadhiga", audio: "/Words/Sariir.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "stuen",},
  {danish: "Pude", somali: "Barkin", audio: "/Words/Sariir.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "stuen",},
  {danish: "Tæppe", somali: "Roog", audio: "/Words/Sariir.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "stuen",},
  {danish: "Tv", somali: "Telefishin", audio: "/Words/Sariir.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "stuen",},
  {danish: "Lampe", somali: "Nal", audio: "/Words/Sariir.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "stuen",},
  {danish: "Reol", somali: "Armaajo", audio: "/Words/Sariir.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "stuen",},
  {danish: "Gardiner", somali: "Daahyada", audio: "/Words/Sariir.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "stuen",},
  {danish: "Ur", somali: "Saacad", audio: "/Words/Sariir.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "stuen",},
  {danish: "Blomst", somali: "Ubax", audio: "/Words/Sariir.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "stuen",},
  
  {danish: "Tallerken", somali: "Saxan", audio: "/Words/Miis.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "køkken",},
  {danish: "Kop", somali: "Koob", audio: "/Words/Miis.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "køkken",},
  {danish: "Gaffel", somali: "Fargeeto", audio: "/Words/Miis.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "køkken",},
  {danish: "Ske", somali: "Qaaddo", audio: "/Words/Miis.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "køkken",},
  {danish: "Gryde", somali: "Digsiga", audio: "/Words/Miis.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "køkken",},
  {danish: "Pande", somali: "Shiilan", audio: "/Words/Miis.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "køkken",},
  {danish: "Ovn", somali: "Foorno", audio: "/Words/Miis.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "køkken",},
  {danish: "Køleskab", somali: "Qaboojiye", audio: "/Words/Miis.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "køkken",},
  {danish: "Spisebord", somali: "Miiskacuntada", audio: "/Words/Miis.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "køkken",},
  {danish: "Skål", somali: "Weel", audio: "/Words/Miis.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "køkken",},
  {danish: "Kniv", somali: "Mindi", audio: "/Words/Miis.mp3", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", category: "køkken",},
]; 

export const getWordsByCategory = (category: string) => {
  return WORDS.filter(word => word.category === category);
}; 