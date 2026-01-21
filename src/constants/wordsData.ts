
export interface WordItem {
  danish: string;
  somali: string;
  audio?: string;
  image?: string;
  category: string; // 👈 tilføj denne linje
}

export const WORDS: WordItem[] = [
  {danish: "Dør", somali: "Albaab", audio: "/ord/dor.mp3", image: "/ord/dør.png", category: "hjem",},
  {danish: "Vindue", somali: "Daaqad", audio: "/ord/vindue.mp3", image: "/ord/vindue.png", category: "hjem",},
  {danish: "Seng", somali: "Sariir", audio: "/ord/seng.mp3", image: "/ord/seng.png", category: "hjem",},
  {danish: "Toilet", somali: "Musqul", audio: "/ord/toilet.mp3", image: "/ord/toilet.png", category: "hjem",},
  {danish: "Penge", somali: "Lacag", audio: "/ord/penge.mp3", image: "/ord/penge.png", category: "hjem",},
  {danish: "Nøgle", somali: "Fure", audio: "/ord/nogle.mp3", image: "/ord/nogle.png", category: "hjem",},
  {danish: "Mobil", somali: "Moobaayl", audio: "/ord/moobaayl.mp3", image: "/ord/mobil.png", category: "hjem",},
  {danish: "Bog", somali: "Buug", audio: "/ord/booog.mp3", image: "/ord/bog.png", category: "hjem",},
  {danish: "Papir", somali: "Warqad", audio: "/ord/papir.mp3", image: "/ord/papir.png", category: "hjem",},
  {danish: "Kuglepen", somali: "Qalin biire", audio: "/ord/qalin.mp3", image: "/ord/kuglepen.png", category: "hjem",},
  {danish: "Spejl", somali: "Muraayad", audio: "/ord/spejl.mp3", image: "/ord/spejl.png", category: "hjem",},
  {danish: "Sko", somali: "Kabo", audio: "/ord/kabo.mp3", image: "/ord/sko.png", category: "hjem",},
  {danish: "Bil", somali: "Baabuur", audio: "/ord/bil.mp3", image: "/ord/bil.png", category: "hjem",},

  {danish: "Sofa", somali: "Fadhi", audio: "/ord/fadhi.mp3", image: "/ord/sofa.png", category: "stuen",},
  {danish: "Stol", somali: "Kursi", audio: "/ord/stol.mp3", image: "/ord/stol.png", category: "stuen",},
  {danish: "Sofabord", somali: "Miiska fadhiga", audio: "/ord/sofabord.mp3", image: "/ord/sofabord.png", category: "stuen",},
  {danish: "Pude", somali: "Barkin", audio: "/ord/pude.mp3", image: "/ord/pude.png", category: "stuen",},
  {danish: "Tæppe", somali: "Maro", audio: "/ord/maro.mp3", image: "/ord/tappe.png", category: "stuen",},
  {danish: "Tv", somali: "Telefishin", audio: "/ord/tv.mp3", image: "/ord/tv.png", category: "stuen",},
  {danish: "Lampe", somali: "Nal", audio: "/ord/lampe.mp3", image: "/ord/lampe.png", category: "stuen",},
  {danish: "Skab", somali: "Armaajo", audio: "/ord/reol.mp3", image: "/ord/reol.png", category: "stuen",},
  {danish: "Gardiner", somali: "Daah", audio: "/ord/daah.mp3", image: "/ord/gardiner.png", category: "stuen",},
  {danish: "Ur", somali: "Saacad", audio: "/ord/ur.mp3", image: "/ord/ur.png", category: "stuen",},
  {danish: "Blomst", somali: "Ubax", audio: "/ord/blomst.mp3", image: "/ord/blomst.png", category: "stuen",},
  
  {danish: "Tallerken", somali: "Saxan", audio: "/ord/tallerken.mp3", image: "/ord/tallerken.png", category: "køkken",},
  {danish: "Kop", somali: "Koob", audio: "/ord/kop.mp3", image: "/ord/kop.png", category: "køkken",},
  {danish: "Gaffel", somali: "Fargeedo", audio: "/ord/fargeedo.mp3", image: "/ord/gaffel.png", category: "køkken",},
  {danish: "Ske", somali: "Qaado", audio: "/ord/ske.mp3", image: "/ord/ske.png", category: "køkken",},
  {danish: "Gryde", somali: "Digsi", audio: "/ord/digsi.mp3", image: "/ord/gryde.png", category: "køkken",},
  {danish: "Pande", somali: "Birtaabo", audio: "/ord/birtaabo.mp3", image: "/ord/pan.png", category: "køkken",},
  {danish: "Ovn", somali: "Foorno", audio: "/ord/ovn.mp3", image: "/ord/ovn.png", category: "køkken",},
  {danish: "Køleskab", somali: "Filinjeer", audio: "/ord/filinjeer.mp3", image: "/ord/koleskab.png", category: "køkken",},
  {danish: "Spisebord", somali: "Miiskacuntada", audio: "/ord/spisebord.mp3", image: "/ord/spisebord.png", category: "køkken",},
  {danish: "Skål", somali: "Baaquli", audio: "/ord/baaquli.mp3", image: "/ord/skal.png", category: "køkken",},
  {danish: "Kniv", somali: "Mindi", audio: "/ord/kniv.mp3", image: "/ord/kniv.png", category: "køkken",},
]; 

export const getWordsByCategory = (category: string) => {
  return WORDS.filter(word => word.category === category);
}; 