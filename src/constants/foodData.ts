
export interface FoodItem {
  id: string;
  danish: string;
  somali: string;
  image: string;
  audio?: string;
  category: "madvarer" | "frugter" | "grøntsager";
}

export const FOOD_ITEMS: FoodItem[] = [
  // Madvarer (Food items)
  { id: "ris", danish: "Ris", somali: "Bariis", image: "/image/ris.png", audio: "/Mad/Bariis.mp3", category: "madvarer" },
  { id: "pasta", danish: "pasta", somali: "Baasto", image: "/lovable-uploads/food-rice.png", audio: "/Mad/Baasto.mp3", category: "madvarer" },
  { id: "bread", danish: "Brød", somali: "Rooti", image: "/lovable-uploads/food-bread.png", audio: "/Mad/Rooti.mp3", category: "madvarer" },
  { id: "cake", danish: "kage", somali: "Keeg", image: "/lovable-uploads/food-cake.png", audio: "/Mad/Keeg.mp3", category: "madvarer" },
  { id: "milk", danish: "mælk", somali: "Caano", image: "/lovable-uploads/food-milk.png",audio: "/Mad/Caano.mp3", category: "madvarer" },
  { id: "meat", danish: "kød", somali: "Hilib", image: "/lovable-uploads/food-meat.png", audio: "/Mad/Hilib.mp3", category: "madvarer" },
  { id: "fish", danish: "fisk", somali: "Kalluun", image: "/lovable-uploads/food-fish.png", audio: "/Mad/Kalluun.mp3", category: "madvarer" },
  { id: "pandecake", danish: "pandekage", somali: "Malawa", image: "/lovable-uploads/food-rice.png", audio: "/Mad/Malawa.mp3", category: "madvarer" },
  { id: "samos", danish: "samos", somali: "Sambuus", image: "/lovable-uploads/food-rice.png", audio: "/Mad/Sambuus.mp3", category: "madvarer" },
  { id: "candy", danish: "slik", somali: "Nacnac", image: "/lovable-uploads/food-rice.png", audio: "/Mad/Nacnac.mp3", category: "madvarer" },
  { id: "soup", danish: "suppe", somali: "Maraq", image: "/lovable-uploads/food-rice.png", audio: "/Mad/Maraq.mp3", category: "madvarer" },
  { id: "water", danish: "vand", somali: "Biyo", image: "/lovable-uploads/food-rice.png", audio: "/Mad/Biyo.mp3", category: "madvarer" },
  { id: "soda", danish: "sodavand", somali: "Cabitaan", image: "/lovable-uploads/food-rice.png", audio: "/Mad/Cabitaan.mp3", category: "madvarer" },
  // Frugter (Fruits)
  { id: "apple", danish: "æble", somali: "Tufaax", image: "/lovable-uploads/food-apple.png", audio: "/Mad/Tufaax.mp3", category: "frugter" },
  { id: "mango", danish: "mango", somali: "Cambe", image: "/lovable-uploads/food-mango.png", audio: "/Mad/Cambe.mp3", category: "frugter" },
  { id: "banana", danish: "banan", somali: "Muus", image: "/lovable-uploads/food-banana.png", audio: "/Mad/Muus.mp3", category: "frugter" },
  { id: "orange", danish: "appelsin", somali: "oorenji", image: "/lovable-uploads/food-orange.png", audio: "/Mad/Oorenji.mp3", category: "frugter" },
  { id: "grapes", danish: "druer", somali: "Canab", image: "/lovable-uploads/food-grapes.png", audio: "/Mad/Canab.mp3", category: "frugter" },
  { id: "watermelon", danish: "vandmelon", somali: "Qarax", image: "/lovable-uploads/food-watermelon.png", audio: "/Mad/Qarax.mp3", category: "frugter" },
  { id: "ananas", danish: "ananas", somali: "Cananaas", image: "/lovable-uploads/food-rice.png", audio: "/Mad/Cananaas.mp3", category: "frugter" },
  
  // Grøntsager (Vegetables)
  { id: "tomato", danish: "tomat", somali: "Yaanyo", image: "/lovable-uploads/food-tomato.png", audio: "/Mad/Yaanyo.mp3", category: "grøntsager" },
  { id: "onion", danish: "løg", somali: "Basal", image: "/lovable-uploads/food-onion.png", audio: "/Mad/Basal.mp3", category: "grøntsager" },
  { id: "cucumber", danish: "agurk", somali: "Qajaar", image: "/lovable-uploads/food-cucumber.png", audio: "/Mad/Qajaar.mp3", category: "grøntsager" },
  { id: "carrot", danish: "gulerod", somali: "Karooto", image: "/lovable-uploads/food-carrot.png", audio: "/Mad/Karooto.mp3", category: "grøntsager" },
  { id: "lettuce", danish: "salat", somali: "Khudaar", image: "/lovable-uploads/food-lettuce.png", audio: "/Mad/Khudaar.mp3", category: "grøntsager" },
  { id: "potato", danish: "kartoffel", somali: "Bataati", image: "/lovable-uploads/food-potato.png", audio: "/Mad/Bataati.mp3", category: "grøntsager" },
  { id: "chili", danish: "chili", somali: "Bisbaas", image: "/lovable-uploads/food-potato.png", audio: "/Mad/Bisbass.mp3", category: "grøntsager" },
];

export function getFoodByCategory(category: "madvarer" | "frugter" | "grøntsager"): FoodItem[] {
  return FOOD_ITEMS.filter(item => item.category === category);
}

export function getAllFood(): FoodItem[] {
  return FOOD_ITEMS;
}
