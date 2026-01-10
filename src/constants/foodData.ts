export interface FoodItem {
    id: string;
    danish: string;
    somali: string;
    image: string;
    audio: string;
    category: "madvarer" | "frugter" | "grøntsager";
  }
  
  export const FOOD_ITEMS: FoodItem[] = [
    // Madvarer (Food items)
    { id: "ris", danish: "Ris", somali: "Bariis", image: "/billeder/ris.png", audio: "/Mad/bariis.mp3", category: "madvarer" },
    { id: "pasta", danish: "pasta", somali: "Baasto", image: "/billeder/paasta.png", audio: "/Mad/baasto.mp3", category: "madvarer" },
    { id: "bread", danish: "Brød", somali: "Rooti", image: "/billeder/brøød.png", audio: "/Mad/rooti.mp3", category: "madvarer" },
    { id: "cake", danish: "kage", somali: "Keeg", image: "/billeder/kage.png", audio: "/Mad/keeg.mp3", category: "madvarer" },
    { id: "milk", danish: "mælk", somali: "Caano", image: "/billeder/mælk.png",audio: "/Mad/caano.mp3", category: "madvarer" },
    { id: "meat", danish: "kød", somali: "Hilib", image: "/billeder/kød.png", audio: "/Mad/hilib.mp3", category: "madvarer" },
    { id: "fish", danish: "fisk", somali: "Kalluun", image: "/billeder/ffisk.png", audio: "/Mad/kalluun.mp3", category: "madvarer" },
    { id: "pandecake", danish: "pandekage", somali: "Malawa", image: "/billeder/pandekage.png", audio: "/Mad/Malawa.mp3", category: "madvarer" },
    { id: "samos", danish: "samos", somali: "Sambuus", image: "/billeder/sambus.png", audio: "/Mad/sambuus.mp3", category: "madvarer" },
    { id: "candy", danish: "slik", somali: "Nacnac", image: "/billeder/slik.png", audio: "/Mad/nacnac.mp3", category: "madvarer" },
    { id: "soup", danish: "suppe", somali: "Maraq", image: "/billeder/suppe.png", audio: "/Mad/maraq.mp3", category: "madvarer" },
    { id: "water", danish: "vand", somali: "Biyo", image: "/billeder/vand.png", audio: "/Mad/biyo.mp3", category: "madvarer" },
    { id: "soda", danish: "sodavand", somali: "Cabitaan", image: "/billeder/sodavand.png", audio: "/Mad/cabitaan.mp3", category: "madvarer" },
    // Frugter (Fruits)
    { id: "apple", danish: "æble", somali: "Tufaax", image: "/billeder/æble.png", audio: "/Mad/tufaax.mp3", category: "frugter" },
    { id: "mango", danish: "mango", somali: "Cambe", image: "/billeder/mango.png", audio: "/Mad/cambe.mp3", category: "frugter" },
    { id: "banana", danish: "banan", somali: "Muus", image: "/billeder/banan.png", audio: "/Mad/muus.mp3", category: "frugter" },
    { id: "orange", danish: "appelsin", somali: "oorenji", image: "/billeder/orange.png", audio: "/Mad/oorenji.mp3", category: "frugter" },
    { id: "grapes", danish: "druer", somali: "Canab", image: "/billeder/druer.png", audio: "/Mad/canab.mp3", category: "frugter" },
    { id: "watermelon", danish: "vandmelon", somali: "Qarax", image: "/billeder/melon.png", audio: "/Mad/qarax.mp3", category: "frugter" },
    { id: "ananas", danish: "ananas", somali: "Cananaas", image: "/billeder/ananas.png", audio: "/Mad/cananaas.mp3", category: "frugter" },
    
    // Grøntsager (Vegetables)
    { id: "tomato", danish: "tomat", somali: "Yaanyo", image: "/billeder/tomat.png", audio: "/Mad/yaanyo.mp3", category: "grøntsager" },
    { id: "onion", danish: "løg", somali: "Basal", image: "/billeder/løg.png", audio: "/Mad/basal.mp3", category: "grøntsager" },
    { id: "cucumber", danish: "agurk", somali: "Qajaar", image: "/billeder/agurk.png", audio: "/Mad/qajaar.mp3", category: "grøntsager" },
    { id: "carrot", danish: "gulerod", somali: "Karooto", image: "/billeder/gulerød.png", audio: "/Mad/karooto.mp3", category: "grøntsager" },
    { id: "lettuce", danish: "salat", somali: "Khudaar", image: "/billeder/salat.png", audio: "/Mad/khudaar.mp3", category: "grøntsager" },
    { id: "potato", danish: "kartoffel", somali: "Bataati", image: "/billeder/kartofel.png", audio: "/Mad/bataati.mp3", category: "grøntsager" },
    { id: "chili", danish: "chili", somali: "Bisbaas", image: "/billeder/chili.png", audio: "/Mad/bisbass.mp3", category: "grøntsager" },
  ];
  
  export function getFoodByCategory(category: "madvarer" | "frugter" | "grøntsager"): FoodItem[] {
    return FOOD_ITEMS.filter(item => item.category === category);
  }
  
  export function getAllFood(): FoodItem[] {
    return FOOD_ITEMS;
  }