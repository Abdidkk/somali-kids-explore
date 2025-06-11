
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
  { id: "ris", danish: "Ris", somali: "Bariis", image: "/lovable-uploads/c1dd8450-aabf-4867-a1f8-a87aedeb964a.png", audio: "/Mad/Bariis.mp3", category: "madvarer" },
  { id: "pasta", danish: "pasta", somali: "Baasto", image: "/lovable-uploads/5ea2439d-4fd6-419d-a5b6-9afb3d0362dd.png", audio: "/Mad/Baasto.mp3", category: "madvarer" },
  { id: "bread", danish: "Brød", somali: "Rooti", image: "/lovable-uploads/5f3c2e5c-8a56-4baf-8c3f-4d8ecbe1f924.png", audio: "/Mad/Rooti.mp3", category: "madvarer" },
  { id: "cake", danish: "kage", somali: "Keeg", image: "/lovable-uploads/6a848c23-3667-454f-bb54-122cdb3444b9.png", audio: "/Mad/Keeg.mp3", category: "madvarer" },
  { id: "milk", danish: "mælk", somali: "Caano", image: "/lovable-uploads/72e8879d-c2fa-4fbe-982b-eb59d9fa37c5.png", audio: "/Mad/Caano.mp3", category: "madvarer" },
  { id: "meat", danish: "kød", somali: "Hilib", image: "/lovable-uploads/81ec82e0-146f-4c28-87de-65901d939ac0.png", audio: "/Mad/Hilib.mp3", category: "madvarer" },
  { id: "fish", danish: "fisk", somali: "Kalluun", image: "/lovable-uploads/85f38696-d894-4781-a2e8-210a91796896.png", audio: "/Mad/Kalluun.mp3", category: "madvarer" },
  { id: "pandecake", danish: "pandekage", somali: "Malawa", image: "/lovable-uploads/cffd237e-6a54-4fc2-8948-ab03ee00399a.png", audio: "/Mad/Malawa.mp3", category: "madvarer" },
  { id: "samos", danish: "samos", somali: "Sambuus", image: "/lovable-uploads/d53ddb64-53af-4bd5-a6c6-c7cd8495bda0.png", audio: "/Mad/Sambuus.mp3", category: "madvarer" },
  { id: "candy", danish: "slik", somali: "Nacnac", image: "/lovable-uploads/5b82e785-bd89-4559-81c7-048e78c263ff.png", audio: "/Mad/Nacnac.mp3", category: "madvarer" },
  { id: "soup", danish: "suppe", somali: "Maraq", image: "/lovable-uploads/1e80efba-0e83-48c7-aa88-40fa3c48f0a9.png", audio: "/Mad/Maraq.mp3", category: "madvarer" },
  { id: "water", danish: "vand", somali: "Biyo", image: "/lovable-uploads/2b3d5738-fe36-44c4-8d12-40c95bb1c0f8.png", audio: "/Mad/Biyo.mp3", category: "madvarer" },
  { id: "soda", danish: "sodavand", somali: "Cabitaan", image: "/lovable-uploads/39e62fa6-99c4-4bf1-996f-19577f56a318.png", audio: "/Mad/Cabitaan.mp3", category: "madvarer" },
  
  // Frugter (Fruits)
  { id: "apple", danish: "æble", somali: "Tufaax", image: "/lovable-uploads/42f73c53-76a6-4c54-82f2-df3ccb4980f6.png", audio: "/Mad/Tufaax.mp3", category: "frugter" },
  { id: "mango", danish: "mango", somali: "Cambe", image: "/lovable-uploads/4b8dc6fc-aca1-44d7-9188-920521dc6d81.png", audio: "/Mad/Cambe.mp3", category: "frugter" },
  { id: "banana", danish: "banan", somali: "Muus", image: "/lovable-uploads/4bdde527-cfcd-4a08-bf5c-65c9f1b9127f.png", audio: "/Mad/Muus.mp3", category: "frugter" },
  { id: "orange", danish: "appelsin", somali: "oorenji", image: "/lovable-uploads/51f528f7-5124-4514-b0f4-ecf0d93a85ae.png", audio: "/Mad/Oorenji.mp3", category: "frugter" },
  { id: "grapes", danish: "druer", somali: "Canab", image: "/lovable-uploads/5226a33a-bf7f-4cc7-ace6-28b7484c60ce.png", audio: "/Mad/Canab.mp3", category: "frugter" },
  { id: "watermelon", danish: "vandmelon", somali: "Qarax", image: "/lovable-uploads/96a8e74c-d203-46ea-a5b3-62d43488681b.png", audio: "/Mad/Qarax.mp3", category: "frugter" },
  { id: "ananas", danish: "ananas", somali: "Cananaas", image: "/lovable-uploads/a1b97193-b26e-42a5-90f1-0ee432386d70.png", audio: "/Mad/Cananaas.mp3", category: "frugter" },
  
  // Grøntsager (Vegetables)
  { id: "tomato", danish: "tomat", somali: "Yaanyo", image: "/lovable-uploads/a57afdc1-14bd-4e86-87d9-907a566e2c64.png", audio: "/Mad/Yaanyo.mp3", category: "grøntsager" },
  { id: "onion", danish: "løg", somali: "Basal", image: "/lovable-uploads/ae3f224d-137a-48d2-bfd6-2ec7db22aec3.png", audio: "/Mad/Basal.mp3", category: "grøntsager" },
  { id: "cucumber", danish: "agurk", somali: "Qajaar", image: "/lovable-uploads/b4199833-0e7b-4459-b668-e1703860ecf1.png", audio: "/Mad/Qajaar.mp3", category: "grøntsager" },
  { id: "carrot", danish: "gulerod", somali: "Karooto", image: "/lovable-uploads/bed57f0f-32ee-4a06-8668-fb4be176b5f1.png", audio: "/Mad/Karooto.mp3", category: "grøntsager" },
  { id: "lettuce", danish: "salat", somali: "Khudaar", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", audio: "/Mad/Khudaar.mp3", category: "grøntsager" },
  { id: "potato", danish: "kartoffel", somali: "Bataati", image: "/lovable-uploads/0d3cffdb-ae5f-47c7-921d-87af02dceffe.png", audio: "/Mad/Bataati.mp3", category: "grøntsager" },
  { id: "chili", danish: "chili", somali: "Bisbaas", image: "/lovable-uploads/0435c435-2eb6-4de9-a68e-d3a18fd524e5.png", audio: "/Mad/Bisbass.mp3", category: "grøntsager" },
];

export function getFoodByCategory(category: "madvarer" | "frugter" | "grøntsager"): FoodItem[] {
  return FOOD_ITEMS.filter(item => item.category === category);
}

export function getAllFood(): FoodItem[] {
  return FOOD_ITEMS;
}
