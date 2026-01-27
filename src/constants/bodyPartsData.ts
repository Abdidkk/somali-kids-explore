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
  { id: "face", danish: "Ansigt", somali: "Waji", audio: "/krop/ansigt.mp3", image: "/krop/waji.png", category: "kropsdele" },
  { id: "head", danish: "Hoved", somali: "Madax", audio: "/krop/hoved.mp3", image: "/billeder/hoved.png", category: "kropsdele" },
  { id: "hair", danish: "Hår", somali: "Timo", audio: "/krop/har.mp3", image: "/billeder/har.png", category: "kropsdele" },
  { id: "eyebrow", danish: "Øjenbryn", somali: "Suniyo", audio: "/krop/suniyo.mp3", image: "/billeder/øjnebryn.png" ,category: "kropsdele" },
  { id: "eye", danish: "Øje", somali: "Il", audio: "/krop/øje.mp3", image: "/billeder/øjne.png" ,category: "kropsdele" },
  { id: "ear", danish: "Øre", somali: "Dhag", audio: "/krop/dhag.mp3", image: "/billeder/ore.png" ,category: "kropsdele" },
  { id: "nose", danish: "Næse", somali: "San", audio: "/krop/næse.mp3", image: "/billeder/nase.png" ,category: "kropsdele" },
  { id: "mouth", danish: "Mund", somali: "Af", audio: "/krop/mund.mp3", image: "/billeder/tander.png" ,category: "kropsdele" },
  { id: "teeth", danish: "Tænder", somali: "Ilko", audio: "/krop/tænder.mp3", image: "/billeder/tand.png" ,category: "kropsdele" },
  { id: "neck", danish: "Hals", somali: "Qoor", audio: "/krop/qoor.mp3", image: "/billeder/nakke.png" ,category: "kropsdele" },
  { id: "shoulder", danish: "Skulder", somali: "Garab", audio: "/krop/skulder.mp3", image: "/billeder/skulder.png" ,category: "kropsdele" },
  { id: "chest", danish: "Bryst", somali: "Xabad", audio: "/krop/xabad.mp3", image: "/billeder/bryst.png" ,category: "kropsdele" },
  { id: "back", danish: "Ryg", somali: "Dhabar", audio: "/krop/ryg.mp3", image: "/billeder/ryg.png" ,category: "kropsdele" },
  { id: "stomach", danish: "Mave", somali: "Calool", audio: "/krop/mave.mp3", image: "/billeder/mave.png" , category: "kropsdele" },
  { id: "arm", danish: "Arm", somali: "Gacan", audio: "/krop/arm.mp3", image: "/billeder/arm.png" ,category: "kropsdele" },
  { id: "elbow", danish: "Albue", somali: "Suxul", audio: "/krop/albue.mp3", image: "/billeder/albue.png" ,category: "kropsdele" },
  { id: "finger", danish: "Finger", somali: "Far", audio: "/krop/far.mp3", image: "/billeder/finger.png" ,category: "kropsdele" },
  { id: "leg", danish: "Ben", somali: "Lug", audio: "/krop/ben.mp3", image: "/billeder/ben.png?" ,category: "kropsdele" },
  { id: "knee", danish: "Knæ", somali: "Jilib", audio: "/krop/knæ.mp3", image: "/billeder/kna.png" ,category: "kropsdele" },
  { id: "foot", danish: "Fod", somali: "Cag", audio: "/krop/fod.mp3", image: "/billeder/fod.png" ,category: "kropsdele" },
  { id: "toe", danish: "Tå", somali: "Suul", audio: "/krop/ta.mp3", image: "/billeder/ta.png" ,category: "kropsdele" },

  // Humør
  { id: "happy", danish: "Glad", somali: "Faraxsan", audio: "/krop/glad.mp3", image: "/billeder/glad.png" ,category: "humør" },
  { id: "sad", danish: "Ked af det", somali: "Murugaysan", audio: "/krop/kedafdet.mp3", image: "/billeder/kedafdet.png" ,category: "humør" },
  { id: "angry", danish: "Vred", somali: "Careysan", audio: "/krop/careysan.mp3", image: "/billeder/sur.png" ,category: "humør" },
  { id: "scared", danish: "Bange", somali: "Cabsi", audio: "/krop/cabsi.mp3", image: "/billeder/bange.png" ,category: "humør" },
  { id: "tired", danish: "Træt", somali: "Daalan", audio: "/krop/træt.mp3", image: "/billeder/trat.png" ,category: "humør" },
  { id: "surprised", danish: "Overrasket", somali: "Yaaban", audio: "/krop/overrasket.mp3", image: "/billeder/overrasket.png" ,category: "humør" },
  { id: "shy", danish: "Genert", somali: "Xishood", audio: "/krop/xishood.mp3", image: "/billeder/genert.png" , category: "humør" },
  { id: "proud", danish: "Stolt", somali: "Faan", audio: "/krop/faan.mp3", image: "/billeder/stolt.png" ,category: "humør" },
  { id: "nervous", danish: "Nervøs", somali: "Walwalsan", audio: "/krop/nervøs.mp3", image: "/billeder/nervos.png" ,category: "humør" },
  { id: "calm", danish: "Rolig", somali: "Daggan", audio: "/krop/rolig.mp3", image: "/billeder/rolig.png" ,category: "humør" },

  // Kropstype
  { id: "tall", danish: "Høj", somali: "Dheer", audio: "/krop/høj.mp3", image: "/billeder/hoj.png" ,category: "kropstype" },
  { id: "short", danish: "Lav", somali: "Gaaban", audio: "/krop/lav.mp3", image: "/billeder/lav.png" ,category: "kropstype" },
  { id: "thin", danish: "Tynd", somali: "Caato", audio: "/krop/tynd.mp3", image: "/billeder/tynd.png" ,category: "kropstype" },
  { id: "thick", danish: "Tykt", somali: "Buuran", audio: "/krop/tyk.mp3", image: "/billeder/tyk.png" ,category: "kropstype" },
  { id: "strong", danish: "Stærk", somali: "Xooggan", audio: "/krop/stærk.mp3", image: "/billeder/stark.png" ,category: "kropstype" },
  { id: "weak", danish: "Svag", somali: "Dacif", audio: "/krop/svag.mp3", image: "/billeder/slap.png" ,category: "kropstype" },
  { id: "normal", danish: "Normal", somali: "Cadi ah", audio: "/krop/normal.mp3", image: "/billeder/normal.png" ,category: "kropstype" },
];

export function getBodyPartsByCategory(category: "kropsdele" | "humør" | "kropstype"): BodyPartItem[] {
  return BODY_PARTS_DATA.filter(item => item.category === category);
}

export function getAllBodyParts(): BodyPartItem[] {
  return BODY_PARTS_DATA;
}