
export interface FamilyItem {
  danish: string;
  somali: string;
  image?: string;
  category: 'Familie' | 'Mennesker' | 'Følelser';
  
}

export const familyData: FamilyItem[] = [
  // Familie
  { danish: "Mor", somali: "Hooyo", category: "familie", image: "/lovable-uploads/mother.png" },
  { danish: "Far", somali: "Aabo", category: "familie", image: "/lovable-uploads/father.png" },
  { danish: "Søster", somali: "Walaal dumar", category: "familie", image: "/lovable-uploads/sister.png" },
  { danish: "Bror", somali: "Walaal lab", category: "familie", image: "/lovable-uploads/brother.png" },
  { danish: "Baby", somali: "Ilmo", category: "familie", image: "/lovable-uploads/baby.png" },
  { danish: "Barn", somali: "Carruur", category: "familie", image: "/lovable-uploads/child.png" },
  { danish: "Bedstemor", somali: "Ayeeyo", category: "familie", image: "/lovable-uploads/grandmother.png" },
  { danish: "Bedstefar", somali: "Awoowe", category: "familie", image: "/lovable-uploads/grandfather.png" },
  { danish: "Tante", somali: "Habaryar", category: "familie", image: "/lovable-uploads/aunt.png" },
  { danish: "Onkel", somali: "Adeer", category: "familie", image: "/lovable-uploads/uncle.png" },
  { danish: "Forældre", somali: "Waalidiin", category: "familie", image: "/lovable-uploads/parents.png" },
  { danish: "Familie", somali: "Qoyska", category: "familie", image: "/lovable-uploads/family.png" },

  // Mennesker
  { danish: "Ven (dreng)", somali: "Saaxiib", category: "mennesker", image: "/lovable-uploads/boy-friend.png" },
  { danish: "Veninde (pige)", somali: "Saaxiibad", category: "mennesker", image: "/lovable-uploads/girl-friend.png" },
  { danish: "Klassekammerat", somali: "La dhigto iskuul", category: "mennesker", image: "/lovable-uploads/classmate.png" },
  { danish: "Nabo", somali: "Deris", category: "mennesker", image: "/lovable-uploads/neighbor.png" },
  { danish: "Lærer", somali: "Macallin", category: "mennesker", image: "/lovable-uploads/teacher.png" },
  { danish: "Kammerat", somali: "Walaal ciyaarta", category: "mennesker", image: "/lovable-uploads/playmate.png" },
  { danish: "Gruppe", somali: "Koox", category: "mennesker", image: "/lovable-uploads/group.png" },

  // Følelser
  { danish: "Jeg elsker dig", somali: "Waan ku jeclahay", category: "følelser", image: "/lovable-uploads/love.png" },
  { danish: "Jeg savner dig", somali: "Waan ku tabayaa", category: "følelser", image: "/lovable-uploads/miss.png" },
  { danish: "Venlig", somali: "Naxariis leh", category: "følelser", image: "/lovable-uploads/kind.png" },
  { danish: "Hjælpsom", somali: "Gargaaraya", category: "følelser", image: "/lovable-uploads/helpful.png" },
  { danish: "Sammen", somali: "Wadajir", category: "følelser", image: "/lovable-uploads/together.png" },
  { danish: "Ensom", somali: "Kelinimo", category: "følelser", image: "/lovable-uploads/lonely.png" },
];

export const getFamilyByCategory = (category: 'familie' | 'mennesker' | 'følelser') => {
  return familyData.filter(item => item.category === category);
};
