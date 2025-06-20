export interface BodyPartItem {
  id: string;
  danish: string;
  somali: string;
  category: "kropsdele" | "humør" | "kropstype";
  audio?: string;
  image?: string;
}

export const BODY_PARTS_DATA: BodyPartItem[] = [
  // Kropsdele
  { id: "head", danish: "hoved", somali: "madaxa", audio: "/krop/hoved.mp3", image: "/billeder/hoved.png", category: "kropsdele" },
  { id: "hair", danish: "hår", somali: "timo", audio: "/krop/har.mp3", image: "/billeder/har.png", category: "kropsdele" },
  { id: "eyebrow", danish: "øjenbryn", somali: "sunyaal", audio: "/krop/øjnebryn.mp3", image: "/billeder/øjnebryn.png" ,category: "kropsdele" },
  { id: "eye", danish: "øje", somali: "il", audio: "/krop/øje.mp3", image: "/billeder/øjne.png" ,category: "kropsdele" },
  { id: "ear", danish: "øre", somali: "dheg", audio: "/krop/øre.mp3", image: "/billeder/ore.png" ,category: "kropsdele" },
  { id: "nose", danish: "næse", somali: "san", audio: "/krop/næse.mp3", image: "/billeder/nase.png" ,category: "kropsdele" },
  { id: "mouth", danish: "mund", somali: "af", audio: "/krop/mund.mp3", image: "/billeder/tander.png" ,category: "kropsdele" },
  { id: "teeth", danish: "tænder", somali: "ilko", audio: "/krop/tænder.mp3", image: "/billeder/tand.png" ,category: "kropsdele" },
  { id: "neck", danish: "nakke", somali: "luqun", audio: "/krop/nakke.mp3", image: "/billeder/nakke.png" ,category: "kropsdele" },
  { id: "shoulder", danish: "skulder", somali: "garab", audio: "/krop/skulder.mp3", image: "/billeder/skulder.png" ,category: "kropsdele" },
  { id: "chest", danish: "bryst", somali: "laab", audio: "/krop/bryst.mp3", image: "/billeder/bryst.png" ,category: "kropsdele" },
  { id: "back", danish: "ryg", somali: "dhabar", audio: "/krop/ryg.mp3", image: "/billeder/ryg.png" ,category: "kropsdele" },
  { id: "stomach", danish: "mave", somali: "calool", audio: "/krop/mave.mp3", image: "/billeder/mave.png" , category: "kropsdele" },
  { id: "arm", danish: "arm", somali: "gacan", audio: "/krop/arm.mp3", image: "/billeder/arm.png" ,category: "kropsdele" },
  { id: "elbow", danish: "albue", somali: "suxul", audio: "/krop/albue.mp3", image: "/billeder/albue.png" ,category: "kropsdele" },
  { id: "finger", danish: "finger", somali: "faro", audio: "/krop/finger.mp3", image: "/billeder/finger.png" ,category: "kropsdele" },
  { id: "leg", danish: "ben", somali: "lug", audio: "/krop/ben.mp3", image: "/billeder/ben.png?" ,category: "kropsdele" },
  { id: "knee", danish: "knæ", somali: "jilb", audio: "/krop/knæ.mp3", image: "/billeder/kna.png" ,category: "kropsdele" },
  { id: "foot", danish: "fod", somali: "cag", audio: "/krop/fod.mp3", image: "/billeder/fod.png" ,category: "kropsdele" },
  { id: "toe", danish: "tå", somali: "suul", audio: "/krop/ta.mp3", image: "/billeder/ta.png" ,category: "kropsdele" },

  // Humør
  { id: "happy", danish: "glad", somali: "faraxsan", audio: "/krop/glad.mp3", image: "/billeder/glad.png" ,category: "humør" },
  { id: "sad", danish: "ked af det", somali: "murugaysan", audio: "/krop/kedafdet.mp3", image: "/billeder/kedafdet.png" ,category: "humør" },
  { id: "angry", danish: "vred", somali: "cadhooday", audio: "/krop/vred.mp3", image: "/billeder/sur.png" ,category: "humør" },
  { id: "scared", danish: "bange", somali: "cabsi leh", audio: "/krop/bange.mp3", image: "/billeder/bange.png" ,category: "humør" },
  { id: "tired", danish: "træt", somali: "daalay", audio: "/krop/træt.mp3", image: "/billeder/trat.png" ,category: "humør" },
  { id: "surprised", danish: "overrasket", somali: "la yaabay", audio: "/krop/overrasket.mp3", image: "/billeder/overrasket.png" ,category: "humør" },
  { id: "shy", danish: "genert", somali: "xishooday", audio: "/krop/genert.mp3", image: "/billeder/genert.png" , category: "humør" },
  { id: "proud", danish: "stolt", somali: "faansan", audio: "/krop/stolt.mp3", image: "/billeder/stolt.png" ,category: "humør" },
  { id: "nervous", danish: "nervøs", somali: "walwalsan", audio: "/krop/nervøs.mp3", image: "/billeder/nervos.png" ,category: "humør" },
  { id: "calm", danish: "rolig", somali: "deggan", audio: "/krop/rolig.mp3", image: "/billeder/rolig.png" ,category: "humør" },

  // Kropstype
  { id: "tall", danish: "høj", somali: "dheer", audio: "/krop/høj.mp3", image: "/billeder/hoj.png" ,category: "kropstype" },
  { id: "short", danish: "lav", somali: "gaaban", audio: "/krop/lav.mp3", image: "/billeder/lav.png" ,category: "kropstype" },
  { id: "thin", danish: "tynd", somali: "caato", audio: "/krop/tynd.mp3", image: "/billeder/tynd.png" ,category: "kropstype" },
  { id: "thick", danish: "tykt", somali: "buuran", audio: "/krop/tyk.mp3", image: "/billeder/tyk.png" ,category: "kropstype" },
  { id: "strong", danish: "stærk", somali: "xooggan", audio: "/krop/stærk.mp3", image: "/billeder/stark.png" ,category: "kropstype" },
  { id: "weak", danish: "svag", somali: "tabar daran", audio: "/krop/svag.mp3", image: "/billeder/slap.png" ,category: "kropstype" },
  { id: "wide", danish: "bred", somali: "balaadhan", audio: "/krop/bred.mp3", image: "/billeder/bred.png" ,category: "kropstype" },
  { id: "normal", danish: "normal", somali: "dhexdhexaad ah", audio: "/krop/normal.mp3", image: "/billeder/normal.png" ,category: "kropstype" },
];

export function getBodyPartsByCategory(category: "kropsdele" | "humør" | "kropstype"): BodyPartItem[] {
  return BODY_PARTS_DATA.filter(item => item.category === category);
}

export function getAllBodyParts(): BodyPartItem[] {
  return BODY_PARTS_DATA;
}