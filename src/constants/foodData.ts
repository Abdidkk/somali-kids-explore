
export interface FoodItem {
  id: string;
  danish: string;
  somali: string;
  image: string;
  category: "madvarer" | "frugter" | "grøntsager";
}

export const foodData: FoodItem[] = [
  // Madvarer (General Food)
  { id: "rice", danish: "Ris", somali: "Bariis", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "madvarer" },
  { id: "bread", danish: "Brød", somali: "Rooti", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "madvarer" },
  { id: "pasta", danish: "Pasta", somali: "Baasto", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "madvarer" },
  { id: "meat", danish: "Kød", somali: "Hilib", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "madvarer" },
  { id: "fish", danish: "Fisk", somali: "Kalluun", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "madvarer" },
  { id: "chicken", danish: "Kylling", somali: "Digaag", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "madvarer" },
  { id: "milk", danish: "Mælk", somali: "Caano", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "madvarer" },
  { id: "cheese", danish: "Ost", somali: "Farmaajo", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "madvarer" },
  { id: "eggs", danish: "Æg", somali: "Ukun", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "madvarer" },
  { id: "yogurt", danish: "Yoghurt", somali: "Laban", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "madvarer" },

  // Frugter (Fruits)
  { id: "apple", danish: "Æble", somali: "Tufaax", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "frugter" },
  { id: "banana", danish: "Banan", somali: "Muus", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "frugter" },
  { id: "orange", danish: "Orange", somali: "Liin", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "frugter" },
  { id: "grape", danish: "Druer", somali: "Canab", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "frugter" },
  { id: "strawberry", danish: "Jordbær", somali: "Istarooberi", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "frugter" },
  { id: "mango", danish: "Mango", somali: "Cambe", image: "/lovable-uploads/be828fee-3bf1-4cdc-9b7c-eec490be3769.png", category: "frugter" },
  { id: "pineapple", danish: "Ananas", somali: "Canaanaas", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "frugter" },
  { id: "watermelon", danish: "Vandmelon", somali: "Qarre", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "frugter" },
  { id: "lemon", danish: "Citron", somali: "Liin", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "frugter" },
  { id: "pear", danish: "Pære", somali: "Geedka pear", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "frugter" },

  // Grøntsager (Vegetables)
  { id: "carrot", danish: "Gulerod", somali: "Dabliin", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "grøntsager" },
  { id: "potato", danish: "Kartoffel", somali: "Bataato", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "grøntsager" },
  { id: "tomato", danish: "Tomat", somali: "Yaanyo", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "grøntsager" },
  { id: "cucumber", danish: "Agurk", somali: "Qajaar", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "grøntsager" },
  { id: "onion", danish: "Løg", somali: "Basal", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "grøntsager" },
  { id: "lettuce", danish: "Salat", somali: "Salad", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "grøntsager" },
  { id: "pepper", danish: "Peber", somali: "Basbaas", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "grøntsager" },
  { id: "broccoli", danish: "Broccoli", somali: "Broccoli", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "grøntsager" },
  { id: "spinach", danish: "Spinat", somali: "Isbinaaj", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "grøntsager" },
  { id: "corn", danish: "Majs", somali: "Galley", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "grøntsager" },
];

export const getFoodByCategory = (category: "madvarer" | "frugter" | "grøntsager"): FoodItem[] => {
  return foodData.filter(food => food.category === category);
};

export const getAllFood = (): FoodItem[] => {
  return foodData;
};
