
export interface FamilyItem {
  danish: string;
  somali: string;
  image?: string;
  audio?: string
  category: 'Familie' | 'Mennesker' | 'Følelser';

}

export const familyData: FamilyItem[] = [
  // Familie
  { danish: "Mor", somali: "Hooyo", category: "Familie", image: "/familie/mor.png", audio: "/familie/mor.mp3" },
  { danish: "Far", somali: "Aabo", category: "Familie", image: "/familie/far.png", audio: "/familie/far.mp3" },
  { danish: "Søster", somali: "Abaayo", category: "Familie", image: "/familie/soster.png", audio: "/familie/abaayo.mp3" },
  { danish: "Bror", somali: "Aboowe", category: "Familie", image: "/familie/bror.png", audio: "/familie/aboowe.mp3" },
  { danish: "Baby", somali: "Nuune", category: "Familie", image: "/familie/baby.png", audio: "/familie/nuune.mp3" },
  { danish: "Barn", somali: "Carruur", category: "Familie", image: "/familie/barn.png", audio: "/familie/barn.mp3" },
  { danish: "Bedstemor", somali: "Ayeeyo", category: "Familie", image: "/familie/bedstemor.png", audio: "/familie/bedstemor.mp3" },
  { danish: "Bedstefar", somali: "Awoowe", category: "Familie", image: "/familie/bedstefar.png", audio: "/familie/bedstefar.mp3" },
  { danish: "Moster", somali: "Habaryar", category: "Familie", image: "/familie/tante.png", audio: "/familie/tante.mp3" },
  { danish: "Farbror", somali: "Adeer", category: "Familie", image: "/familie/onkel.png", audio: "/familie/onkel.mp3" },
  { danish: "Onkel", somali: "Abti", category: "Familie", image: "/familie/onkel.png", audio: "/familie/abti.mp3" },
  { danish: "Forældre", somali: "Waalid", category: "Familie", image: "/familie/foraldre.png", audio: "/familie/waalid.mp3" },
  { danish: "Familie", somali: "Qoys", category: "Familie", image: "/familie/familie.png", audio: "/familie/qoys.mp3" },

  // Mennesker
  { danish: "Ven (dreng)", somali: "Saxiib", category: "Mennesker", image: "/familie/ven.png", audio: "/familie/ven.mp3" },
  { danish: "Veninde (pige)", somali: "Saaxiibad", category: "Mennesker", image: "/familie/veninde.png", audio: "/familie/veninde.mp3" },
  { danish: "Elev", somali: "Ardey", category: "Mennesker", image: "/familie/klassekamrat.png", audio: "/familie/ardey.mp3" },
  { danish: "Nabo", somali: "Deris", category: "Mennesker", image: "/familie/nabo.png", audio: "/familie/nabo.mp3" },
  { danish: "Lærer", somali: "Macallin", category: "Mennesker", image: "/familie/lare.png", audio: "/familie/lare.mp3" },
  { danish: "Gruppe", somali: "Koox", category: "Mennesker", image: "/familie/gruppe.png", audio: "/familie/gruppe.mp3" },

  // Følelser
  { danish: "Jeg elsker dig", somali: "Waan kuu jeclahay", category: "Følelser", image: "/familie/jegelskerdig.png", audio: "/familie/jegelskerdig.mp3" },
  { danish: "Jeg savner dig", somali: "Waan kuu xisey", category: "Følelser", image: "/familie/savn.png", audio: "/familie/jegsavnerdig.mp3" },
  { danish: "Venlig", somali: "Naxariis leh", category: "Følelser", image: "/familie/venlig.png", audio: "/familie/venlig.mp3" },
  { danish: "Hjælpsom", somali: "Cawin badan", category: "Følelser", image: "/familie/hjalpsom.png", audio: "/familie/badan.mp3" },
  { danish: "Sammen", somali: "Wadajir", category: "Følelser", image: "/familie/sammen.png", audio: "/familie/sammen.mp3" },
  { danish: "Ensom", somali: "Kelinimo", category: "Følelser", image: "/familie/ensom.png", audio: "/familie/ensom.mp3" },
];

export const getFamilyByCategory = (category: 'Familie' | 'Mennesker' | 'Følelser') => {
  return familyData.filter(item => item.category === category);
};
