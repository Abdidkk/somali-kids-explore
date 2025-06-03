export interface FoodItem {
  id: string;
  danish: string;
  somali: string;
  image: string;
  category: "madvarer" | "frugter" | "grøntsager";
  audioPath?: string;
}

export const FOOD_ITEMS: FoodItem[] = [
  // Madvarer (Food items)
  { id: "ris", danish: "ris", somali: "bariis", image: "/lovable-uploads/food-rice.png", category: "madvarer", audioPath: "/audio/food/bariis.mp3" },
  { id: "bread", danish: "brød", somali: "rooti", image: "/lovable-uploads/food-bread.png", category: "madvarer", audioPath: "/audio/food/rooti.mp3" },
  { id: "cake", danish: "kage", somali: "keeg", image: "/lovable-uploads/food-cake.png", category: "madvarer", audioPath: "/audio/food/keeg.mp3" },
  { id: "milk", danish: "mælk", somali: "caano", image: "/lovable-uploads/food-milk.png", category: "madvarer", audioPath: "/audio/food/caano.mp3" },
  { id: "meat", danish: "kød", somali: "hilib", image: "/lovable-uploads/food-meat.png", category: "madvarer", audioPath: "/audio/food/hilib.mp3" },
  { id: "fish", danish: "fisk", somali: "kalluun", image: "/lovable-uploads/food-fish.png", category: "madvarer", audioPath: "/audio/food/kalluun.mp3" },
  
  // Frugter (Fruits)
  { id: "apple", danish: "æble", somali: "tufaax", image: "/lovable-uploads/food-apple.png", category: "frugter", audioPath: "/audio/food/tufaax.mp3" },
  { id: "mango", danish: "mango", somali: "cambe", image: "/lovable-uploads/be828fee-3bf1-4cdc-9b7c-eec490be3769.png", category: "frugter", audioPath: "/audio/food/cambe.mp3" },
  { id: "banana", danish: "banan", somali: "muus", image: "/lovable-uploads/food-banana.png", category: "frugter", audioPath: "/audio/food/muus.mp3" },
  { id: "orange", danish: "appelsin", somali: "oorenji", image: "/lovable-uploads/food-orange.png", category: "frugter", audioPath: "/audio/food/oorenji.mp3" },
  { id: "grapes", danish: "druer", somali: "canab", image: "/lovable-uploads/food-grapes.png", category: "frugter", audioPath: "/audio/food/canab.mp3" },
  { id: "watermelon", danish: "vandmelon", somali: "qarax", image: "/lovable-uploads/food-watermelon.png", category: "frugter", audioPath: "/audio/food/qarax.mp3" },
  
  // Grøntsager (Vegetables)
  { id: "tomato", danish: "tomat", somali: "yaanyo", image: "/lovable-uploads/food-tomato.png", category: "grøntsager", audioPath: "/audio/food/yaanyo.mp3" },
  { id: "onion", danish: "løg", somali: "basal", image: "/lovable-uploads/food-onion.png", category: "grøntsager", audioPath: "/audio/food/basal.mp3" },
  { id: "cucumber", danish: "agurk", somali: "qajaar", image: "/lovable-uploads/food-cucumber.png", category: "grøntsager", audioPath: "/audio/food/qajaar.mp3" },
  { id: "carrot", danish: "gulerod", somali: "dabaqalin", image: "/lovable-uploads/food-carrot.png", category: "grøntsager", audioPath: "/audio/food/dabaqalin.mp3" },
  { id: "lettuce", danish: "salat", somali: "khudaar", image: "/lovable-uploads/food-lettuce.png", category: "grøntsager", audioPath: "/audio/food/khudaar.mp3" },
  { id: "potato", danish: "kartoffel", somali: "bataati", image: "/lovable-uploads/food-potato.png", category: "grøntsager", audioPath: "/audio/food/bataati.mp3" }
];

export function getFoodByCategory(category: "madvarer" | "frugter" | "grøntsager"): FoodItem[] {
  return FOOD_ITEMS.filter(item => item.category === category);
}

export function getAllFood(): FoodItem[] {
  return FOOD_ITEMS;
}
