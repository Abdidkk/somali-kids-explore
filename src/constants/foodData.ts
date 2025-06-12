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
    { id: "ris", danish: "Ris", somali: "Bariis", image: "/billeder/ris.png", audio: "/mad/Bariis.mp3", category: "madvarer" },
    { id: "pasta", danish: "pasta", somali: "Baasto", image: "/billeder/paasta.png", audio: "/mad/Baasto.mp3", category: "madvarer" },
    { id: "bread", danish: "Brød", somali: "Rooti", image: "/billeder/brøød.png", audio: "/mad/Rooti.mp3", category: "madvarer" },
    { id: "cake", danish: "kage", somali: "Keeg", image: "/billeder/kage.png", audio: "/mad/Keeg.mp3", category: "madvarer" },
    { id: "milk", danish: "mælk", somali: "Caano", image: "/billeder/mælk.png",audio: "/mad/Caano.mp3", category: "madvarer" },
    { id: "meat", danish: "kød", somali: "Hilib", image: "/billeder/kød.png", audio: "/mad/Hilib.mp3", category: "madvarer" },
    { id: "fish", danish: "fisk", somali: "Kalluun", image: "/billeder/ffisk.png", audio: "/mad/Kalluun.mp3", category: "madvarer" },
    { id: "pandecake", danish: "pandekage", somali: "Malawa", image: "/billeder/pandekage.png", audio: "/mad/Malawa.mp3", category: "madvarer" },
    { id: "samos", danish: "samos", somali: "Sambuus", image: "/billeder/sambus.png", audio: "/mad/Sambuus.mp3", category: "madvarer" },
    { id: "candy", danish: "slik", somali: "Nacnac", image: "/billeder/slik.png", audio: "/mad/Nacnac.mp3", category: "madvarer" },
    { id: "soup", danish: "suppe", somali: "Maraq", image: "/billeder/suppe.png", audio: "/mad/Maraq.mp3", category: "madvarer" },
    { id: "water", danish: "vand", somali: "Biyo", image: "/billeder/vand.png", audio: "/mad/Biyo.mp3", category: "madvarer" },
    { id: "soda", danish: "sodavand", somali: "Cabitaan", image: "/billeder/sodavand.png", audio: "/mad/Cabitaan.mp3", category: "madvarer" },
    // Frugter (Fruits)
    { id: "apple", danish: "æble", somali: "Tufaax", image: "/billeder/æble.png", audio: "/mad/Tufaax.mp3", category: "frugter" },
    { id: "mango", danish: "mango", somali: "Cambe", image: "/billeder/mango.png", audio: "/mad/Cambe.mp3", category: "frugter" },
    { id: "banana", danish: "banan", somali: "Muus", image: "/billeder/banan.png", audio: "/mad/Muus.mp3", category: "frugter" },
    { id: "orange", danish: "appelsin", somali: "oorenji", image: "/billeder/orange.png", audio: "/mad/Oorenji.mp3", category: "frugter" },
    { id: "grapes", danish: "druer", somali: "Canab", image: "/billeder/druer.png", audio: "/mad/Canab.mp3", category: "frugter" },
    { id: "watermelon", danish: "vandmelon", somali: "Qarax", image: "/billeder/melon.png", audio: "/mad/Qarax.mp3", category: "frugter" },
    { id: "ananas", danish: "ananas", somali: "Cananaas", image: "/billeder/ananas.png", audio: "/mad/Cananaas.mp3", category: "frugter" },
    
    // Grøntsager (Vegetables)
    { id: "tomato", danish: "tomat", somali: "Yaanyo", image: "/billeder/tomat.png", audio: "/mad/Yaanyo.mp3", category: "grøntsager" },
    { id: "onion", danish: "løg", somali: "Basal", image: "/billeder/løg.png", audio: "/mad/Basal.mp3", category: "grøntsager" },
    { id: "cucumber", danish: "agurk", somali: "Qajaar", image: "/billeder/agurk.png", audio: "/mad/Qajaar.mp3", category: "grøntsager" },
    { id: "carrot", danish: "gulerod", somali: "Karooto", image: "/billeder/gulerød.png", audio: "/mad/Karooto.mp3", category: "grøntsager" },
    { id: "lettuce", danish: "salat", somali: "Khudaar", image: "/billeder/salat.png", audio: "/mad/Khudaar.mp3", category: "grøntsager" },
    { id: "potato", danish: "kartoffel", somali: "Bataati", image: "/billeder/kartofel.png", audio: "/mad/Bataati.mp3", category: "grøntsager" },
    { id: "chili", danish: "chili", somali: "Bisbaas", image: "/billeder/chili.png", audio: "/mad/Bisbass.mp3", category: "grøntsager" },
  ];
  
  export function getFoodByCategory(category: "madvarer" | "frugter" | "grøntsager"): FoodItem[] {
    return FOOD_ITEMS.filter(item => item.category === category);
  }
  
  export function getAllFood(): FoodItem[] {
    return FOOD_ITEMS;
  }