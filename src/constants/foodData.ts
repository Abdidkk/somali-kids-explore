
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
  { id: "ris", danish: "Ris", somali: "Bariis", image: "/Image/ris.png", audio: "/Mad/Bariis.mp3", category: "madvarer" },
  { id: "pasta", danish: "pasta", somali: "Baasto", image: "/Image/paasta.png", audio: "/Mad/Baasto.mp3", category: "madvarer" },
  { id: "bread", danish: "Brød", somali: "Rooti", image: "Image/brøød.png", audio: "/Mad/Rooti.mp3", category: "madvarer" },
  { id: "cake", danish: "kage", somali: "Keeg", image: "Image/kage.png", audio: "/Mad/Keeg.mp3", category: "madvarer" },
  { id: "milk", danish: "mælk", somali: "Caano", image: "Image/mælk.png",audio: "/Mad/Caano.mp3", category: "madvarer" },
  { id: "meat", danish: "kød", somali: "Hilib", image: "Image/kød.png", audio: "/Mad/Hilib.mp3", category: "madvarer" },
  { id: "fish", danish: "fisk", somali: "Kalluun", image: "Image/ffisk.png", audio: "/Mad/Kalluun.mp3", category: "madvarer" },
  { id: "pandecake", danish: "pandekage", somali: "Malawa", image: "Image/pandekage.png", audio: "/Mad/Malawa.mp3", category: "madvarer" },
  { id: "samos", danish: "samos", somali: "Sambuus", image: "Image/sambus.png", audio: "/Mad/Sambuus.mp3", category: "madvarer" },
  { id: "candy", danish: "slik", somali: "Nacnac", image: "Image/slik.png", audio: "/Mad/Nacnac.mp3", category: "madvarer" },
  { id: "soup", danish: "suppe", somali: "Maraq", image: "Image/suppe.png", audio: "/Mad/Maraq.mp3", category: "madvarer" },
  { id: "water", danish: "vand", somali: "Biyo", image: "Image/vand.png", audio: "/Mad/Biyo.mp3", category: "madvarer" },
  { id: "soda", danish: "sodavand", somali: "Cabitaan", image: "Image/sodavand.png", audio: "/Mad/Cabitaan.mp3", category: "madvarer" },
  // Frugter (Fruits)
  { id: "apple", danish: "æble", somali: "Tufaax", image: "Image/æble.png", audio: "/Mad/Tufaax.mp3", category: "frugter" },
  { id: "mango", danish: "mango", somali: "Cambe", image: "Image/mango.png", audio: "/Mad/Cambe.mp3", category: "frugter" },
  { id: "banana", danish: "banan", somali: "Muus", image: "Image/banan.png", audio: "/Mad/Muus.mp3", category: "frugter" },
  { id: "orange", danish: "appelsin", somali: "oorenji", image: "Image/orange.png", audio: "/Mad/Oorenji.mp3", category: "frugter" },
  { id: "grapes", danish: "druer", somali: "Canab", image: "Image/druer.png", audio: "/Mad/Canab.mp3", category: "frugter" },
  { id: "watermelon", danish: "vandmelon", somali: "Qarax", image: "Image/melon.png", audio: "/Mad/Qarax.mp3", category: "frugter" },
  { id: "ananas", danish: "ananas", somali: "Cananaas", image: "Image/ananas.png", audio: "/Mad/Cananaas.mp3", category: "frugter" },
  
  // Grøntsager (Vegetables)
  { id: "tomato", danish: "tomat", somali: "Yaanyo", image: "Image/tomat.png", audio: "/Mad/Yaanyo.mp3", category: "grøntsager" },
  { id: "onion", danish: "løg", somali: "Basal", image: "Image/løg.png", audio: "/Mad/Basal.mp3", category: "grøntsager" },
  { id: "cucumber", danish: "agurk", somali: "Qajaar", image: "Image/agurk.png", audio: "/Mad/Qajaar.mp3", category: "grøntsager" },
  { id: "carrot", danish: "gulerod", somali: "Karooto", image: "Image/gulerød.png", audio: "/Mad/Karooto.mp3", category: "grøntsager" },
  { id: "lettuce", danish: "salat", somali: "Khudaar", image: "Image/salat.png", audio: "/Mad/Khudaar.mp3", category: "grøntsager" },
  { id: "potato", danish: "kartoffel", somali: "Bataati", image: "Image/kartofel.png", audio: "/Mad/Bataati.mp3", category: "grøntsager" },
  { id: "chili", danish: "chili", somali: "Bisbaas", image: "Image/chili.png", audio: "/Mad/Bisbass.mp3", category: "grøntsager" },
];

export function getFoodByCategory(category: "madvarer" | "frugter" | "grøntsager"): FoodItem[] {
  return FOOD_ITEMS.filter(item => item.category === category);
}

export function getAllFood(): FoodItem[] {
  return FOOD_ITEMS;
}
