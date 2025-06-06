
export interface FamilyItem {
  danish: string;
  somali: string;
  image?: string;
  category: 'Familie' | 'Mennesker' | 'Følelser';
  
}

export const familyData: FamilyItem[] = [
  // Familie
  { danish: "Mor", somali: "Hooyo", category: "Familie", image: "/lovable-uploads/mother.png" },
  { danish: "Far", somali: "Aabo", category: "Familie", image: "/lovable-uploads/father.png" },
  { danish: "Søster", somali: "Walaal dumar", category: "Familie", image: "/lovable-uploads/sister.png" },
  { danish: "Bror", somali: "Walaal lab", category: "Familie", image: "/lovable-uploads/brother.png" },
  { danish: "Baby", somali: "Ilmo", category: "Familie", image: "/lovable-uploads/baby.png" },
  { danish: "Barn", somali: "Carruur", category: "Familie", image: "/lovable-uploads/child.png" },
  { danish: "Bedstemor", somali: "Ayeeyo", category: "Familie", image: "/lovable-uploads/grandmother.png" },
  { danish: "Bedstefar", somali: "Awoowe", category: "Familie", image: "/lovable-uploads/grandfather.png" },
  { danish: "Tante", somali: "Habaryar", category: "Familie", image: "/lovable-uploads/aunt.png" },
  { danish: "Onkel", somali: "Adeer", category: "Familie", image: "/lovable-uploads/uncle.png" },
  { danish: "Forældre", somali: "Waalidiin", category: "Familie", image: "/lovable-uploads/parents.png" },
  { danish: "Familie", somali: "Qoyska", category: "Familie", image: "/lovable-uploads/family.png" },

  // Mennesker
  { danish: "Ven (dreng)", somali: "Saaxiib", category: "Mennesker", image: "/lovable-uploads/boy-friend.png" },
  { danish: "Veninde (pige)", somali: "Saaxiibad", category: "Mennesker", image: "/lovable-uploads/girl-friend.png" },
  { danish: "Klassekammerat", somali: "La dhigto iskuul", category: "Mennesker", image: "/lovable-uploads/classmate.png" },
  { danish: "Nabo", somali: "Deris", category: "Mennesker", image: "/lovable-uploads/neighbor.png" },
  { danish: "Lærer", somali: "Macallin", category: "Mennesker", image: "/lovable-uploads/teacher.png" },
  { danish: "Kammerat", somali: "Walaal ciyaarta", category: "Mennesker", image: "/lovable-uploads/playmate.png" },
  { danish: "Gruppe", somali: "Koox", category: "Mennesker", image: "/lovable-uploads/group.png" },

  // Følelser
  { danish: "Jeg elsker dig", somali: "Waan ku jeclahay", category: "Følelser", image: "/lovable-uploads/love.png" },
  { danish: "Jeg savner dig", somali: "Waan ku tabayaa", category: "Følelser", image: "/lovable-uploads/miss.png" },
  { danish: "Venlig", somali: "Naxariis leh", category: "Følelser", image: "/lovable-uploads/kind.png" },
  { danish: "Hjælpsom", somali: "Gargaaraya", category: "Følelser", image: "/lovable-uploads/helpful.png" },
  { danish: "Sammen", somali: "Wadajir", category: "Følelser", image: "/lovable-uploads/together.png" },
  { danish: "Ensom", somali: "Kelinimo", category: "Følelser", image: "/lovable-uploads/lonely.png" },
];

export const getFamilyByCategory = (category: 'Familie' | 'Mennesker' | 'Følelser') => {
  return familyData.filter(item => item.category === category);
};
