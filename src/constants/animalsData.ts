
export interface AnimalItem {
  id: string;
  danish: string;
  somali: string;
  image: string;
  audio: string;
  category: "husdyr" | "savannedyr" | "fugle_og_smådyr";
}

export const ANIMAL_ITEMS: AnimalItem[] = [
  // Husdyr (Domestic animals)
  { id: "cat", danish: "Kat", somali: "Bisad", image: "/billeder/cat.png", audio: "/dyr/kat.mp3", category: "husdyr" },
  { id: "dog", danish: "Hund", somali: "Eey", image: "/billeder/dog.png", audio: "/dyr/hund.mp3", category: "husdyr" },
  { id: "cow", danish: "Ko", somali: "Lo'", image: "/billeder/cow.png", audio: "/dyr/ko.mp3", category: "husdyr" },
  { id: "goat", danish: "Ged", somali: "Ari'", image: "/billeder/goat.png", audio: "/dyr/ari.mp3", category: "husdyr" },
  { id: "horse", danish: "Hest", somali: "Faras", image: "/billeder/horse.png", audio: "/dyr/hest.mp3", category: "husdyr" },
  { id: "sheep", danish: "Får", somali: "Ido'", image: "/billeder/sheep.png", audio: "/dyr/far.mp3", category: "husdyr" },
  
  // Savannedyr (Savanna animals)
  { id: "elephant", danish: "Elefant", somali: "Maroodi", image: "/billeder/elephant.png", audio: "/dyr/elefant.mp3", category: "savannedyr" },
  { id: "lion", danish: "Løve", somali: "Libaax", image: "/billeder/lion.png", audio: "/dyr/løve.mp3", category: "savannedyr" },
  { id: "giraffe", danish: "Giraf", somali: "Geri", image: "/billeder/giraf.png", audio: "/dyr/giraf.mp3", category: "savannedyr" },
  { id: "zebra", danish: "Zebra", somali: "Dameer faroow", image: "/billeder/zebra.png", audio: "/dyr/zebra.mp3", category: "savannedyr" },
  { id: "monkey", danish: "Abe", somali: "Daanyeer", image: "/billeder/monkey.png", audio: "/dyr/abe.mp3", category: "savannedyr" },
  { id: "camel", danish: "Kamel", somali: "Geel", image: "/billeder/camel.png", audio: "/dyr/kamel.mp3", category: "savannedyr" },
  
  // Fugle og smådyr (Birds and small animals)
  { id: "bird", danish: "Fugl", somali: "Shimbir", image: "/billeder/bird.png", audio: "/dyr/fugle.mp3", category: "fugle_og_smådyr" },
  { id: "rabbit", danish: "Kanin", somali: "Bakayle", image: "/billeder/rabbit.png", audio: "/dyr/kanin.mp3", category: "fugle_og_smådyr" },
  { id: "mouse", danish: "Mus", somali: "Jiir", image: "/billeder/mouse.png", audio: "/dyr/mus.mp3", category: "fugle_og_smådyr" },
  { id: "chicken", danish: "Høne", somali: "Dooro", image: "/billeder/chicken.png", audio: "/dyr/høne.mp3", category: "fugle_og_smådyr" },
  { id: "duck", danish: "And", somali: "Bolanboolo", image: "/billeder/duck.png", audio: "/dyr/and.mp3", category: "fugle_og_smådyr" },
  { id: "fish", danish: "Fisk", somali: "Malaay", image: "/billeder/fish.png", audio: "/dyr/malaay.mp3", category: "fugle_og_smådyr" }
];

export function getAnimalsByCategory(category: "husdyr" | "savannedyr" | "fugle_og_smådyr"): AnimalItem[] {
  return ANIMAL_ITEMS.filter(item => item.category === category);
}

export function getAllAnimals(): AnimalItem[] {
  return ANIMAL_ITEMS;
}
