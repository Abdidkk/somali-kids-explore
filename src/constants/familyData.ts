
export interface FamilyItem {
  danish: string;
  somali: string;
  category: 'familie' | 'mennesker' | 'følelser';
  image?: string;
  audioPath?: string;
}

export const familyData: FamilyItem[] = [
  // Familie
  { danish: "Mor", somali: "Hooyo", category: "familie", image: "/lovable-uploads/mother.png", audioPath: "/audio/family/hooyo.mp3" },
  { danish: "Far", somali: "Aabo", category: "familie", image: "/lovable-uploads/father.png", audioPath: "/audio/family/aabo.mp3" },
  { danish: "Søster", somali: "Walaal dumar", category: "familie", image: "/lovable-uploads/sister.png", audioPath: "/audio/family/walaal_dumar.mp3" },
  { danish: "Bror", somali: "Walaal lab", category: "familie", image: "/lovable-uploads/brother.png", audioPath: "/audio/family/walaal_lab.mp3" },
  { danish: "Baby", somali: "Ilmo", category: "familie", image: "/lovable-uploads/baby.png", audioPath: "/audio/family/ilmo.mp3" },
  { danish: "Barn", somali: "Carruur", category: "familie", image: "/lovable-uploads/child.png", audioPath: "/audio/family/carruur.mp3" },
  { danish: "Bedstemor", somali: "Ayeeyo", category: "familie", image: "/lovable-uploads/grandmother.png", audioPath: "/audio/family/ayeeyo.mp3" },
  { danish: "Bedstefar", somali: "Awoowe", category: "familie", image: "/lovable-uploads/grandfather.png", audioPath: "/audio/family/awoowe.mp3" },
  { danish: "Tante", somali: "Habaryar", category: "familie", image: "/lovable-uploads/aunt.png", audioPath: "/audio/family/habaryar.mp3" },
  { danish: "Onkel", somali: "Adeer", category: "familie", image: "/lovable-uploads/uncle.png", audioPath: "/audio/family/adeer.mp3" },
  { danish: "Forældre", somali: "Waalidiin", category: "familie", image: "/lovable-uploads/parents.png", audioPath: "/audio/family/waalidiin.mp3" },
  { danish: "Familie", somali: "Qoyska", category: "familie", image: "/lovable-uploads/family.png", audioPath: "/audio/family/qoyska.mp3" },

  // Mennesker
  { danish: "Ven (dreng)", somali: "Saaxiib", category: "mennesker", image: "/lovable-uploads/boy-friend.png", audioPath: "/audio/people/saaxiib.mp3" },
  { danish: "Veninde (pige)", somali: "Saaxiibad", category: "mennesker", image: "/lovable-uploads/girl-friend.png", audioPath: "/audio/people/saaxiibad.mp3" },
  { danish: "Klassekammerat", somali: "La dhigto iskuul", category: "mennesker", image: "/lovable-uploads/classmate.png", audioPath: "/audio/people/la_dhigto_iskuul.mp3" },
  { danish: "Nabo", somali: "Deris", category: "mennesker", image: "/lovable-uploads/neighbor.png", audioPath: "/audio/people/deris.mp3" },
  { danish: "Lærer", somali: "Macallin", category: "mennesker", image: "/lovable-uploads/teacher.png", audioPath: "/audio/people/macallin.mp3" },
  { danish: "Kammerat", somali: "Walaal ciyaarta", category: "mennesker", image: "/lovable-uploads/playmate.png", audioPath: "/audio/people/walaal_ciyaarta.mp3" },
  { danish: "Gruppe", somali: "Koox", category: "mennesker", image: "/lovable-uploads/group.png", audioPath: "/audio/people/koox.mp3" },

  // Følelser
  { danish: "Jeg elsker dig", somali: "Waan ku jeclahay", category: "følelser", image: "/lovable-uploads/love.png", audioPath: "/audio/feelings/waan_ku_jeclahay.mp3" },
  { danish: "Jeg savner dig", somali: "Waan ku tabayaa", category: "følelser", image: "/lovable-uploads/miss.png", audioPath: "/audio/feelings/waan_ku_tabayaa.mp3" },
  { danish: "Venlig", somali: "Naxariis leh", category: "følelser", image: "/lovable-uploads/kind.png", audioPath: "/audio/feelings/naxariis_leh.mp3" },
  { danish: "Hjælpsom", somali: "Gargaaraya", category: "følelser", image: "/lovable-uploads/helpful.png", audioPath: "/audio/feelings/gargaaraya.mp3" },
  { danish: "Sammen", somali: "Wadajir", category: "følelser", image: "/lovable-uploads/together.png", audioPath: "/audio/feelings/wadajir.mp3" },
  { danish: "Ensom", somali: "Kelinimo", category: "følelser", image: "/lovable-uploads/lonely.png", audioPath: "/audio/feelings/kelinimo.mp3" },
];

export const getFamilyByCategory = (category: 'familie' | 'mennesker' | 'følelser') => {
  return familyData.filter(item => item.category === category);
};
