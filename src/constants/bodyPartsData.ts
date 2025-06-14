export interface BodyPartItem {
  id: string;
  danish: string;
  somali: string;
  category: "kropsdele" | "humør" | "kropstype";
  audio?: string;
}

export const BODY_PARTS_DATA: BodyPartItem[] = [
  // Kropsdele
  { id: "head", danish: "hoved", somali: "madaxa", audio: "/krop/hoved.mp3", category: "kropsdele" },
  { id: "hair", danish: "hår", somali: "timo", audio: "/krop/har.mp3", category: "kropsdele" },
  { id: "eyebrow", danish: "øjenbryn", somali: "sunyaal", audio: "/krop/øjnebryn.mp3", category: "kropsdele" },
  { id: "eye", danish: "øje", somali: "il", audio: "/krop/øje.mp3", category: "kropsdele" },
  { id: "ear", danish: "øre", somali: "dheg", audio: "/krop/øre.mp3", category: "kropsdele" },
  { id: "nose", danish: "næse", somali: "san", audio: "/krop/næse.mp3", category: "kropsdele" },
  { id: "mouth", danish: "mund", somali: "af", audio: "/krop/mund.mp3", category: "kropsdele" },
  { id: "teeth", danish: "tænder", somali: "ilko", audio: "/krop/tænder.mp3", category: "kropsdele" },
  { id: "neck", danish: "nakke", somali: "luqun", audio: "/krop/nakke.mp3", category: "kropsdele" },
  { id: "shoulder", danish: "skulder", somali: "garab", audio: "/krop/skulder.mp3", category: "kropsdele" },
  { id: "chest", danish: "bryst", somali: "laab", audio: "/krop/bryst.mp3", category: "kropsdele" },
  { id: "back", danish: "ryg", somali: "dhabar", audio: "/krop/ryg.mp3", category: "kropsdele" },
  { id: "stomach", danish: "mave", somali: "calool", audio: "/krop/mave.mp3", category: "kropsdele" },
  { id: "arm", danish: "arm", somali: "gacan", audio: "/krop/arm.mp3", category: "kropsdele" },
  { id: "elbow", danish: "albue", somali: "suxul", audio: "/krop/albue.mp3", category: "kropsdele" },
  { id: "finger", danish: "finger", somali: "faro", audio: "/krop/finger.mp3", category: "kropsdele" },
  { id: "leg", danish: "ben", somali: "lug", audio: "/krop/ben.mp3", category: "kropsdele" },
  { id: "knee", danish: "knæ", somali: "jilb", audio: "/krop/knæ.mp3", category: "kropsdele" },
  { id: "foot", danish: "fod", somali: "cag", audio: "/krop/fod.mp3", category: "kropsdele" },
  { id: "toe", danish: "tå", somali: "suul", audio: "/krop/ta.mp3", category: "kropsdele" },

  // Humør
  { id: "happy", danish: "glad", somali: "faraxsan", audio: "/krop/glad.mp3", category: "humør" },
  { id: "sad", danish: "ked af det", somali: "murugaysan", audio: "/krop/kedafdet.mp3", category: "humør" },
  { id: "angry", danish: "vred", somali: "cadhooday", audio: "/krop/vred.mp3", category: "humør" },
  { id: "scared", danish: "bange", somali: "cabsi leh", audio: "/krop/bange.mp3", category: "humør" },
  { id: "tired", danish: "træt", somali: "daalay", audio: "/krop/træt.mp3", category: "humør" },
  { id: "surprised", danish: "overrasket", somali: "la yaabay", audio: "/krop/overrasket.mp3", category: "humør" },
  { id: "shy", danish: "genert", somali: "xishooday", audio: "/krop/genert.mp3", category: "humør" },
  { id: "proud", danish: "stolt", somali: "faansan", audio: "/krop/stolt.mp3", category: "humør" },
  { id: "nervous", danish: "nervøs", somali: "walwalsan", audio: "/krop/nervøs.mp3", category: "humør" },
  { id: "calm", danish: "rolig", somali: "deggan", audio: "/krop/rolig.mp3", category: "humør" },

  // Kropstype
  { id: "tall", danish: "høj", somali: "dheer", audio: "/krop/høj.mp3", category: "kropstype" },
  { id: "short", danish: "lav", somali: "gaaban", audio: "/krop/lav.mp3", category: "kropstype" },
  { id: "thin", danish: "tynd", somali: "caato", audio: "/krop/tynd.mp3", category: "kropstype" },
  { id: "thick", danish: "tykt", somali: "buuran", audio: "/krop/tyk.mp3", category: "kropstype" },
  { id: "strong", danish: "stærk", somali: "xooggan", audio: "/krop/stærk.mp3", category: "kropstype" },
  { id: "weak", danish: "svag", somali: "tabar daran", audio: "/krop/svag.mp3", category: "kropstype" },
  { id: "wide", danish: "bred", somali: "balaadhan", audio: "/krop/bred.mp3", category: "kropstype" },
  { id: "normal", danish: "normal", somali: "dhexdhexaad ah", audio: "/krop/normal.mp3", category: "kropstype" },
];

export function getBodyPartsByCategory(category: "kropsdele" | "humør" | "kropstype"): BodyPartItem[] {
  return BODY_PARTS_DATA.filter(item => item.category === category);
}

export function getAllBodyParts(): BodyPartItem[] {
  return BODY_PARTS_DATA;
}