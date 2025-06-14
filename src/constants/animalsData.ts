
export interface AnimalItem {
  id: string;
  danish: string;
  somali: string;
  image: string;
  audio?: string;
  category: "husdyr" | "savannedyr" | "fugle_og_smådyr";
}

export const ANIMAL_ITEMS: AnimalItem[] = [
  // Husdyr (Domestic animals)
  { id: "cat", danish: "kat", somali: "bisad", image: "/billeder/cat.png", category: "husdyr" },
  { id: "dog", danish: "hund", somali: "eey", image: "/billeder/dog.png", category: "husdyr" },
  { id: "cow", danish: "ko", somali: "lo'", image: "/billeder/cow.png", category: "husdyr" },
  { id: "sheep", danish: "får", somali: "ido", image: "/billeder/goat.png", category: "husdyr" },
  { id: "horse", danish: "hest", somali: "faras", image: "/billeder/horse.png", category: "husdyr" },
  { id: "goat", danish: "ged", somali: "ri'", image: "/billeder/sheep.png", category: "husdyr" },
  
  // Savannedyr (Savanna animals)
  { id: "elephant", danish: "elefant", somali: "maroodi", image: "/billeder/elephant.png", category: "savannedyr" },
  { id: "lion", danish: "løve", somali: "libaax", image: "/billeder/lion.png", category: "savannedyr" },
  { id: "giraffe", danish: "giraf", somali: "geri", image: "/billeder/giraf.png", category: "savannedyr" },
  { id: "zebra", danish: "zebra", somali: "faras dibadeed", image: "/billeder/zebra.png", category: "savannedyr" },
  { id: "monkey", danish: "abe", somali: "daanyeer", image: "/billeder/monkey.png", category: "savannedyr" },
  { id: "camel", danish: "kamel", somali: "geel", image: "/billeder/camel.png", category: "savannedyr" },
  
  // Fugle og smådyr (Birds and small animals)
  { id: "bird", danish: "fugl", somali: "shimbir", image: "/billeder/bird.png", category: "fugle_og_smådyr" },
  { id: "rabbit", danish: "kanin", somali: "bakayle", image: "/billeder/rabbit.png", category: "fugle_og_smådyr" },
  { id: "mouse", danish: "mus", somali: "jiir", image: "/billeder/mouse.png", category: "fugle_og_smådyr" },
  { id: "chicken", danish: "høne", somali: "dooro", image: "/billeder/chicken.png", category: "fugle_og_smådyr" },
  { id: "duck", danish: "and", somali: "bolobolo", image: "/billeder/duck.png", category: "fugle_og_smådyr" },
  { id: "fish", danish: "fisk", somali: "kalluun", image: "/billeder/fish.png", category: "fugle_og_smådyr" }
];

export function getAnimalsByCategory(category: "husdyr" | "savannedyr" | "fugle_og_smådyr"): AnimalItem[] {
  return ANIMAL_ITEMS.filter(item => item.category === category);
}

export function getAllAnimals(): AnimalItem[] {
  return ANIMAL_ITEMS;
}
