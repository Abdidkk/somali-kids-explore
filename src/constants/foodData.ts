
export interface FoodItem {
  id: string;
  danish: string;
  somali: string;
  image: string;
  category: "madvarer" | "frugter" | "grøntsager";
}

export const FOOD_ITEMS: FoodItem[] = [
  // Madvarer (Food items)
  { id: "ris", danish: "ris", somali: "bariis", image: "/lovable-uploads/food-rice.png", category: "madvarer" },
  { id: "bread", danish: "brød", somali: "rooti", image: "/lovable-uploads/food-bread.png", category: "madvarer" },
  { id: "cake", danish: "kage", somali: "keeg", image: "/lovable-uploads/food-cake.png", category: "madvarer" },
  { id: "milk", danish: "mælk", somali: "caano", image: "/lovable-uploads/food-milk.png", category: "madvarer" },
  { id: "meat", danish: "kød", somali: "hilib", image: "/lovable-uploads/food-meat.png", category: "madvarer" },
  { id: "fish", danish: "fisk", somali: "kalluun", image: "/lovable-uploads/food-fish.png", category: "madvarer" },
  
  // Frugter (Fruits)
  { id: "apple", danish: "æble", somali: "tufaax", image: "/lovable-uploads/food-apple.png", category: "frugter" },
  { id: "mango", danish: "mango", somali: "cambe", image: "/lovable-uploads/food-mango.png", category: "frugter" },
  { id: "banana", danish: "banan", somali: "muus", image: "/lovable-uploads/food-banana.png", category: "frugter" },
  { id: "orange", danish: "appelsin", somali: "oorenji", image: "/lovable-uploads/food-orange.png", category: "frugter" },
  { id: "grapes", danish: "druer", somali: "canab", image: "/lovable-uploads/food-grapes.png", category: "frugter" },
  { id: "watermelon", danish: "vandmelon", somali: "qarax", image: "/lovable-uploads/food-watermelon.png", category: "frugter" },
  
  // Grøntsager (Vegetables)
  { id: "tomato", danish: "tomat", somali: "yaanyo", image: "/lovable-uploads/food-tomato.png", category: "grøntsager" },
  { id: "onion", danish: "løg", somali: "basal", image: "/lovable-uploads/food-onion.png", category: "grøntsager" },
  { id: "cucumber", danish: "agurk", somali: "qajaar", image: "/lovable-uploads/food-cucumber.png", category: "grøntsager" },
  { id: "carrot", danish: "gulerod", somali: "dabaqalin", image: "/lovable-uploads/food-carrot.png", category: "grøntsager" },
  { id: "lettuce", danish: "salat", somali: "khudaar", image: "/lovable-uploads/food-lettuce.png", category: "grøntsager" },
  { id: "potato", danish: "kartoffel", somali: "bataati", image: "/lovable-uploads/food-potato.png", category: "grøntsager" }
];

export function getFoodByCategory(category: "madvarer" | "frugter" | "grøntsager"): FoodItem[] {
  return FOOD_ITEMS.filter(item => item.category === category);
}

export function getAllFood(): FoodItem[] {
  return FOOD_ITEMS;
}
