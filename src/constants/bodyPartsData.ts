
export interface BodyPartItem {
  id: string;
  danish: string;
  somali: string;
  image: string;
  category: "kropsdele" | "humør" | "kropstype";
}

export const BODY_PART_ITEMS: BodyPartItem[] = [
  // Kropsdele (Body parts)
  { id: "head", danish: "hoved", somali: "madaxa", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", category: "kropsdele" },
  { id: "hair", danish: "hår", somali: "timo", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a", category: "kropsdele" },
  { id: "eyebrow", danish: "øjenbryn", somali: "sunyaal", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2", category: "kropsdele" },
  { id: "eye", danish: "øje", somali: "il", image: "https://images.unsplash.com/photo-1585652055377-d74ac4e8d0ba", category: "kropsdele" },
  { id: "ear", danish: "øre", somali: "dheg", image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6", category: "kropsdele" },
  { id: "nose", danish: "næse", somali: "san", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54", category: "kropsdele" },
  { id: "mouth", danish: "mund", somali: "af", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56", category: "kropsdele" },
  { id: "teeth", danish: "tænder", somali: "ilko", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95", category: "kropsdele" },
  { id: "neck", danish: "nakke", somali: "luqun", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b", category: "kropsdele" },
  { id: "shoulder", danish: "skulder", somali: "garab", image: "https://images.unsplash.com/photo-1594824388514-9a3e2a7ef86c", category: "kropsdele" },
  { id: "chest", danish: "bryst", somali: "laab", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b", category: "kropsdele" },
  { id: "back", danish: "ryg", somali: "dhabar", image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063", category: "kropsdele" },
  { id: "stomach", danish: "mave", somali: "calool", image: "https://images.unsplash.com/photo-1594824388514-9a3e2a7ef86c", category: "kropsdele" },
  { id: "arm", danish: "arm", somali: "gacan", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56", category: "kropsdele" },
  { id: "elbow", danish: "albue", somali: "suxul", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b", category: "kropsdele" },
  { id: "hand", danish: "hånd", somali: "gacan", image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b", category: "kropsdele" },
  { id: "finger", danish: "finger", somali: "fariin", image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa", category: "kropsdele" },
  { id: "leg", danish: "ben", somali: "lug", image: "https://images.unsplash.com/photo-1594824388514-9a3e2a7ef86c", category: "kropsdele" },
  { id: "knee", danish: "knæ", somali: "jilb", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b", category: "kropsdele" },
  { id: "foot", danish: "fod", somali: "cag", image: "https://images.unsplash.com/photo-1520637836862-4d197d17c55a", category: "kropsdele" },
  { id: "toe", danish: "tå", somali: "suul", image: "https://images.unsplash.com/photo-1520637836862-4d197d17c55a", category: "kropsdele" },

  // Humør (Moods)
  { id: "happy", danish: "glad", somali: "faraxsan", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", category: "humør" },
  { id: "sad", danish: "ked af det", somali: "murugaysan", image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0", category: "humør" },
  { id: "angry", danish: "vred", somali: "cadhooday", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56", category: "humør" },
  { id: "scared", danish: "bange", somali: "cabsi leh", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54", category: "humør" },
  { id: "tired", danish: "træt", somali: "daalay", image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0", category: "humør" },
  { id: "surprised", danish: "overrasket", somali: "la yaabay", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", category: "humør" },
  { id: "shy", danish: "genert", somali: "xishooday", image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0", category: "humør" },
  { id: "disappointed", danish: "skuffet", somali: "niyad jab", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56", category: "humør" },
  { id: "proud", danish: "stolt", somali: "faansan", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", category: "humør" },
  { id: "nervous", danish: "nervøs", somali: "walwalsan", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54", category: "humør" },
  { id: "calm", danish: "rolig", somali: "deggan", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", category: "humør" },

  // Kropstype (Body types)
  { id: "tall", danish: "høj", somali: "dheer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", category: "kropstype" },
  { id: "short", danish: "lav", somali: "gaaban", image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0", category: "kropstype" },
  { id: "thin", danish: "tynd", somali: "caato", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56", category: "kropstype" },
  { id: "thick", danish: "tykt", somali: "buuran", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54", category: "kropstype" },
  { id: "strong", danish: "stærk", somali: "xooggan", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", category: "kropstype" },
  { id: "weak", danish: "svag", somali: "tabar daran", image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0", category: "kropstype" },
  { id: "slim", danish: "slank", somali: "fudud", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56", category: "kropstype" },
  { id: "wide", danish: "bred", somali: "balaadhan", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54", category: "kropstype" },
  { id: "normal", danish: "normal", somali: "dhexdhexaad ah", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", category: "kropstype" }
];

export function getBodyPartsByCategory(category: "kropsdele" | "humør" | "kropstype"): BodyPartItem[] {
  return BODY_PART_ITEMS.filter(item => item.category === category);
}

export function getAllBodyParts(): BodyPartItem[] {
  return BODY_PART_ITEMS;
}
