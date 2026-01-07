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
    { id: "ris", danish: "Ris", somali: "Bariis", image: "/billeder/ris.png", audio: "/mad/bariis.mp3", category: "madvarer" },
    { id: "pasta", danish: "pasta", somali: "Baasto", image: "/billeder/paasta.png", audio: "/mad/baasto.mp3", category: "madvarer" },
    { id: "bread", danish: "Brød", somali: "Rooti", image: "/billeder/brøød.png", audio: "/mad/rooti.mp3", category: "madvarer" },
    { id: "cake", danish: "kage", somali: "Keeg", image: "/billeder/kage.png", audio: "/mad/keeg.mp3", category: "madvarer" },
    { id: "milk", danish: "mælk", somali: "Caano", image: "/billeder/mælk.png",audio: "/mad/caano.mp3", category: "madvarer" },
    { id: "meat", danish: "kød", somali: "Hilib", image: "/billeder/kød.png", audio: "/mad/hilib.mp3", category: "madvarer" },
    { id: "fish", danish: "fisk", somali: "Kalluun", image: "/billeder/ffisk.png", audio: "/mad/kalluun.mp3", category: "madvarer" },
    { id: "pandecake", danish: "pandekage", somali: "Malawa", image: "/billeder/pandekage.png", audio: "/mad/Malawa.mp3", category: "madvarer" },
    { id: "samos", danish: "samos", somali: "Sambuus", image: "/billeder/sambus.png", audio: "/mad/sambuus.mp3", category: "madvarer" },
    { id: "candy", danish: "slik", somali: "Nacnac", image: "/billeder/slik.png", audio: "/mad/nacnac.mp3", category: "madvarer" },
    { id: "soup", danish: "suppe", somali: "Maraq", image: "/billeder/suppe.png", audio: "/mad/maraq.mp3", category: "madvarer" },
    { id: "water", danish: "vand", somali: "Biyo", image: "/billeder/vand.png", audio: "/mad/biyo.mp3", category: "madvarer" },
    { id: "soda", danish: "sodavand", somali: "Cabitaan", image: "/billeder/sodavand.png", audio: "/mad/cabitaan.mp3", category: "madvarer" },
    // Frugter (Fruits)
    { id: "apple", danish: "æble", somali: "Tufaax", image: "/billeder/æble.png", audio: "/mad/tufaax.mp3", category: "frugter" },
    { id: "mango", danish: "mango", somali: "Cambe", image: "/billeder/mango.png", audio: "/mad/cambe.mp3", category: "frugter" },
    { id: "banana", danish: "banan", somali: "Muus", image: "/billeder/banan.png", audio: "/mad/muus.mp3", category: "frugter" },
    { id: "orange", danish: "appelsin", somali: "oorenji", image: "/billeder/orange.png", audio: "/mad/oorenji.mp3", category: "frugter" },
    { id: "grapes", danish: "druer", somali: "Canab", image: "/billeder/druer.png", audio: "/mad/canab.mp3", category: "frugter" },
    { id: "watermelon", danish: "vandmelon", somali: "Qarax", image: "/billeder/melon.png", audio: "/mad/qarax.mp3", category: "frugter" },
    { id: "ananas", danish: "ananas", somali: "Cananaas", image: "/billeder/ananas.png", audio: "/mad/cananaas.mp3", category: "frugter" },
    
    // Grøntsager (Vegetables)
    { id: "tomato", danish: "tomat", somali: "Yaanyo", image: "/billeder/tomat.png", audio: "/mad/yaanyo.mp3", category: "grøntsager" },
    { id: "onion", danish: "løg", somali: "Basal", image: "/billeder/løg.png", audio: "/mad/basal.mp3", category: "grøntsager" },
    { id: "cucumber", danish: "agurk", somali: "Qajaar", image: "/billeder/agurk.png", audio: "/mad/qajaar.mp3", category: "grøntsager" },
    { id: "carrot", danish: "gulerod", somali: "Karooto", image: "/billeder/gulerød.png", audio: "/mad/karooto.mp3", category: "grøntsager" },
    { id: "lettuce", danish: "salat", somali: "Khudaar", image: "/billeder/salat.png", audio: "/mad/khudaar.mp3", category: "grøntsager" },
    { id: "potato", danish: "kartoffel", somali: "Bataati", image: "/billeder/kartofel.png", audio: "/mad/bataati.mp3", category: "grøntsager" },
    { id: "chili", danish: "chili", somali: "Bisbaas", image: "/billeder/chili.png", audio: "/mad/bisbass.mp3", category: "grøntsager" },
  ];
  
  export function getFoodByCategory(category: "madvarer" | "frugter" | "grøntsager"): FoodItem[] {
    return FOOD_ITEMS.filter(item => item.category === category);
  }
  
  export function getAllFood(): FoodItem[] {
    return FOOD_ITEMS;
  }