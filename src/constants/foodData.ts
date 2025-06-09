
export interface FoodItem {
  id: string;
  danish: string;
  somali: string;
  image: string;
  category: "madvarer" | "frugter" | "grøntsager";
}

export const FOOD_ITEMS: FoodItem[] = [
  // Madvarer (Food items)
  { id: "ris", danish: "Ris", somali: "Bariis", image: "/lovable-uploads/food-rice.png", category: "madvarer" },
  { id: "pasta", danish: "pasta", somali: "Baasto", image: "/lovable-uploads/food-rice.png", category: "madvarer" },
  { id: "bread", danish: "Brød", somali: "Rooti", image: "/lovable-uploads/food-bread.png", category: "madvarer" },
  { id: "cake", danish: "kage", somali: "Keeg", image: "/lovable-uploads/food-cake.png", category: "madvarer" },
  { id: "milk", danish: "mælk", somali: "Caano", image: "/lovable-uploads/food-milk.png", category: "madvarer" },
  { id: "meat", danish: "kød", somali: "Hilib", image: "/lovable-uploads/food-meat.png", category: "madvarer" },
  { id: "fish", danish: "fisk", somali: "Kalluun", image: "/lovable-uploads/food-fish.png", category: "madvarer" },
  { id: "pandecake", danish: "pandekage", somali: "Malawa", image: "/lovable-uploads/food-rice.png", category: "madvarer" },
  { id: "samos", danish: "samos", somali: "Sambus", image: "/lovable-uploads/food-rice.png", category: "madvarer" },
  { id: "candy", danish: "slik", somali: "Nacnac", image: "/lovable-uploads/food-rice.png", category: "madvarer" },
  { id: "soup", danish: "suppe", somali: "Maraq", image: "/lovable-uploads/food-rice.png", category: "madvarer" },
  { id: "water", danish: "vand", somali: "Biyo", image: "/lovable-uploads/food-rice.png", category: "madvarer" },
  { id: "soda", danish: "sodavand", somali: "Cabitaan", image: "/lovable-uploads/food-rice.png", category: "madvarer" },
  // Frugter (Fruits)
  { id: "apple", danish: "æble", somali: "Tufaax", image: "/lovable-uploads/food-apple.png", category: "frugter" },
  { id: "mango", danish: "mango", somali: "Cambe", image: "/lovable-uploads/food-mango.png", category: "frugter" },
  { id: "banana", danish: "banan", somali: "Muus", image: "/lovable-uploads/food-banana.png", category: "frugter" },
  { id: "orange", danish: "appelsin", somali: "oorenji", image: "/lovable-uploads/food-orange.png", category: "frugter" },
  { id: "grapes", danish: "druer", somali: "Canab", image: "/lovable-uploads/food-grapes.png", category: "frugter" },
  { id: "watermelon", danish: "vandmelon", somali: "Qarax", image: "/lovable-uploads/food-watermelon.png", category: "frugter" },
  { id: "ananas", danish: "ananas", somali: "Cananaas", image: "/lovable-uploads/food-rice.png", category: "frugter" },
  
  // Grøntsager (Vegetables)
  { id: "tomato", danish: "tomat", somali: "Yaanyo", image: "/lovable-uploads/food-tomato.png", category: "grøntsager" },
  { id: "onion", danish: "løg", somali: "Basal", image: "/lovable-uploads/food-onion.png", category: "grøntsager" },
  { id: "cucumber", danish: "agurk", somali: "Qajaar", image: "/lovable-uploads/food-cucumber.png", category: "grøntsager" },
  { id: "carrot", danish: "gulerod", somali: "Dabaqalin", image: "/lovable-uploads/food-carrot.png", category: "grøntsager" },
  { id: "lettuce", danish: "salat", somali: "Khudaar", image: "/lovable-uploads/food-lettuce.png", category: "grøntsager" },
  { id: "potato", danish: "kartoffel", somali: "Bataati", image: "/lovable-uploads/food-potato.png", category: "grøntsager" },
  { id: "chili", danish: "chili", somali: "Basbaas", image: "/lovable-uploads/food-potato.png", category: "grøntsager" },
  { id: "carrots", danish: "gulerod", somali: "Karootada", image: "/lovable-uploads/food-potato.png", category: "grøntsager" }
];

export function getFoodByCategory(category: "madvarer" | "frugter" | "grøntsager"): FoodItem[] {
  return FOOD_ITEMS.filter(item => item.category === category);
}

export function getAllFood(): FoodItem[] {
  return FOOD_ITEMS;
}
