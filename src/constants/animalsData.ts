
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
  { id: "cat", danish: "kat", somali: "bisad", image: "/billeder/cat.png", audio: "/dyr/kat.mp3", category: "husdyr" },
  { id: "dog", danish: "hund", somali: "eey", image: "/billeder/dog.png", audio: "/dyr/hund.mp3", category: "husdyr" },
  { id: "cow", danish: "ko", somali: "lo'", image: "/billeder/cow.png", audio: "/dyr/ko.mp3", category: "husdyr" },
  { id: "sheep", danish: "får", somali: "ido'", image: "/billeder/goat.png", audio: "/dyr/far.mp3", category: "husdyr" },
  { id: "horse", danish: "hest", somali: "faras", image: "/billeder/horse.png", audio: "/dyr/hest.mp3", category: "husdyr" },
  { id: "goat", danish: "ged", somali: "ri'", image: "/billeder/sheep.png", audio: "/dyr/ged.mp3", category: "husdyr" },
  
  // Savannedyr (Savanna animals)
  { id: "elephant", danish: "elefant", somali: "maroodi", image: "/billeder/elephant.png", audio: "/dyr/elefant.mp3", category: "savannedyr" },
  { id: "lion", danish: "løve", somali: "libaax", image: "/billeder/lion.png", audio: "/dyr/løve.mp3", category: "savannedyr" },
  { id: "giraffe", danish: "giraf", somali: "geri", image: "/billeder/giraf.png", audio: "/dyr/giraf.mp3", category: "savannedyr" },
  { id: "zebra", danish: "zebra", somali: "faras dibadeed", image: "/billeder/zebra.png", audio: "/dyr/zebra.mp3", category: "savannedyr" },
  { id: "monkey", danish: "abe", somali: "daanyeer", image: "/billeder/monkey.png", audio: "/dyr/abe.mp3", category: "savannedyr" },
  { id: "camel", danish: "kamel", somali: "geel", image: "/billeder/camel.png", audio: "/dyr/kamel.mp3", category: "savannedyr" },
  
  // Fugle og smådyr (Birds and small animals)
  { id: "bird", danish: "fugl", somali: "shimbir", image: "/billeder/bird.png", audio: "/dyr/fugle.mp3", category: "fugle_og_smådyr" },
  { id: "rabbit", danish: "kanin", somali: "bakayle", image: "/billeder/rabbit.png", audio: "/dyr/kanin.mp3", category: "fugle_og_smådyr" },
  { id: "mouse", danish: "mus", somali: "jiir", image: "/billeder/mouse.png", audio: "/dyr/mus.mp3", category: "fugle_og_smådyr" },
  { id: "chicken", danish: "høne", somali: "dooro", image: "/billeder/chicken.png", audio: "/dyr/høne.mp3", category: "fugle_og_smådyr" },
  { id: "duck", danish: "and", somali: "bolobolo", image: "/billeder/duck.png", audio: "/dyr/and.mp3", category: "fugle_og_smådyr" },
  { id: "fish", danish: "fisk", somali: "kalluun", image: "/billeder/fish.png", audio: "/dyr/fisk.mp3", category: "fugle_og_smådyr" }
];

export function getAnimalsByCategory(category: "husdyr" | "savannedyr" | "fugle_og_smådyr"): AnimalItem[] {
  return ANIMAL_ITEMS.filter(item => item.category === category);
}

export function getAllAnimals(): AnimalItem[] {
  return ANIMAL_ITEMS;
}
