
export interface BodyPartItem {
  id: string;
  danish: string;
  somali: string;
  category: "kropsdele" | "humør" | "kropstype";
}

export const BODY_PARTS_DATA: BodyPartItem[] = [
  // Kropsdele
  { id: "head", danish: "hoved", somali: "madaxa", category: "kropsdele" },
  { id: "hair", danish: "hår", somali: "timo", category: "kropsdele" },
  { id: "eyebrow", danish: "øjenbryn", somali: "sunyaal", category: "kropsdele" },
  { id: "eye", danish: "øje", somali: "il", category: "kropsdele" },
  { id: "ear", danish: "øre", somali: "dheg", category: "kropsdele" },
  { id: "nose", danish: "næse", somali: "san", category: "kropsdele" },
  { id: "mouth", danish: "mund", somali: "af", category: "kropsdele" },
  { id: "teeth", danish: "tænder", somali: "ilko", category: "kropsdele" },
  { id: "neck", danish: "nakke", somali: "luqun", category: "kropsdele" },
  { id: "shoulder", danish: "skulder", somali: "garab", category: "kropsdele" },
  { id: "chest", danish: "bryst", somali: "laab", category: "kropsdele" },
  { id: "back", danish: "ryg", somali: "dhabar", category: "kropsdele" },
  { id: "stomach", danish: "mave", somali: "calool", category: "kropsdele" },
  { id: "arm", danish: "arm", somali: "gacan", category: "kropsdele" },
  { id: "elbow", danish: "albue", somali: "suxul", category: "kropsdele" },
  { id: "hand", danish: "hånd", somali: "gacan", category: "kropsdele" },
  { id: "finger", danish: "finger", somali: "fariin", category: "kropsdele" },
  { id: "leg", danish: "ben", somali: "lug", category: "kropsdele" },
  { id: "knee", danish: "knæ", somali: "jilb", category: "kropsdele" },
  { id: "foot", danish: "fod", somali: "cag", category: "kropsdele" },
  { id: "toe", danish: "tå", somali: "suul", category: "kropsdele" },

  // Humør
  { id: "happy", danish: "glad", somali: "faraxsan", category: "humør" },
  { id: "sad", danish: "ked af det", somali: "murugaysan", category: "humør" },
  { id: "angry", danish: "vred", somali: "cadhooday", category: "humør" },
  { id: "scared", danish: "bange", somali: "cabsi leh", category: "humør" },
  { id: "tired", danish: "træt", somali: "daalay", category: "humør" },
  { id: "surprised", danish: "overrasket", somali: "la yaabay", category: "humør" },
  { id: "shy", danish: "genert", somali: "xishooday", category: "humør" },
  { id: "disappointed", danish: "skuffet", somali: "niyad jab", category: "humør" },
  { id: "proud", danish: "stolt", somali: "faansan", category: "humør" },
  { id: "nervous", danish: "nervøs", somali: "walwalsan", category: "humør" },
  { id: "calm", danish: "rolig", somali: "deggan", category: "humør" },

  // Kropstype
  { id: "tall", danish: "høj", somali: "dheer", category: "kropstype" },
  { id: "short", danish: "lav", somali: "gaaban", category: "kropstype" },
  { id: "thin", danish: "tynd", somali: "caato", category: "kropstype" },
  { id: "thick", danish: "tykt", somali: "buuran", category: "kropstype" },
  { id: "strong", danish: "stærk", somali: "xooggan", category: "kropstype" },
  { id: "weak", danish: "svag", somali: "tabar daran", category: "kropstype" },
  { id: "slim", danish: "slank", somali: "fudud", category: "kropstype" },
  { id: "wide", danish: "bred", somali: "balaadhan", category: "kropstype" },
  { id: "normal", danish: "normal", somali: "dhexdhexaad ah", category: "kropstype" },
];

export function getBodyPartsByCategory(category: "kropsdele" | "humør" | "kropstype"): BodyPartItem[] {
  return BODY_PARTS_DATA.filter(item => item.category === category);
}

export function getAllBodyParts(): BodyPartItem[] {
  return BODY_PARTS_DATA;
}
