
export interface AnimalItem {
  id: string;
  danish: string;
  somali: string;
  image: string;
  category: "husdyr" | "savannedyr" | "fugle_og_smådyr";
}

export const ANIMAL_ITEMS: AnimalItem[] = [
  // Husdyr (Domestic animals)
  { id: "cat", danish: "kat", somali: "bisad", image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1", category: "husdyr" },
  { id: "dog", danish: "hund", somali: "eey", image: "https://images.unsplash.com/photo-1552053831-71594a27632d", category: "husdyr" },
  { id: "cow", danish: "ko", somali: "lo'", image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac", category: "husdyr" },
  { id: "sheep", danish: "får", somali: "ido", image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632", category: "husdyr" },
  { id: "horse", danish: "hest", somali: "faras", image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2", category: "husdyr" },
  { id: "goat", danish: "ged", somali: "ri'", image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a", category: "husdyr" },
  
  // Savannedyr (Savanna animals)
  { id: "elephant", danish: "elefant", somali: "maroodi", image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44", category: "savannedyr" },
  { id: "lion", danish: "løve", somali: "libaax", image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d", category: "savannedyr" },
  { id: "giraffe", danish: "giraf", somali: "geri", image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0", category: "savannedyr" },
  { id: "zebra", danish: "zebra", somali: "faras dibadeed", image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d", category: "savannedyr" },
  { id: "monkey", danish: "abe", somali: "daanyeer", image: "https://images.unsplash.com/photo-1501286353178-1ec881214838", category: "savannedyr" },
  { id: "camel", danish: "kamel", somali: "geel", image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3", category: "savannedyr" },
  
  // Fugle og smådyr (Birds and small animals)
  { id: "bird", danish: "fugl", somali: "shimbir", image: "https://images.unsplash.com/photo-1444464666168-49d633b86797", category: "fugle_og_smådyr" },
  { id: "rabbit", danish: "kanin", somali: "bakayle", image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308", category: "fugle_og_smådyr" },
  { id: "mouse", danish: "mus", somali: "jiir", image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca", category: "fugle_og_smådyr" },
  { id: "chicken", danish: "høne", somali: "dooro", image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7", category: "fugle_og_smådyr" },
  { id: "duck", danish: "and", somali: "bolobolo", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba", category: "fugle_og_smådyr" },
  { id: "fish", danish: "fisk", somali: "kalluun", image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4", category: "fugle_og_smådyr" }
];

export function getAnimalsByCategory(category: "husdyr" | "savannedyr" | "fugle_og_smådyr"): AnimalItem[] {
  return ANIMAL_ITEMS.filter(item => item.category === category);
}

export function getAllAnimals(): AnimalItem[] {
  return ANIMAL_ITEMS;
}
