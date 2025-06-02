
export interface FamilyItem {
  danish: string;
  somali: string;
  image: string;
  category: 'family' | 'people' | 'feelings';
}

export const familyData: FamilyItem[] = [
  // Familie
  { danish: "Mor", somali: "Hooyo", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "family" },
  { danish: "Far", somali: "Aabo", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "family" },
  { danish: "Søster", somali: "Walaal dumar", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "family" },
  { danish: "Bror", somali: "Walaal lab", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "family" },
  { danish: "Baby", somali: "Ilmo", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "family" },
  { danish: "Barn", somali: "Carruur", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "family" },
  { danish: "Bedstemor", somali: "Ayeeyo", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "family" },
  { danish: "Bedstefar", somali: "Awoowe", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "family" },
  { danish: "Tante", somali: "Habaryar", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "family" },
  { danish: "Onkel", somali: "Adeer", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "family" },
  { danish: "Forældre", somali: "Waalidiin", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "family" },
  { danish: "Familie", somali: "Qoyska", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "family" },

  // Mennesker
  { danish: "Ven (dreng)", somali: "Saaxiib", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "people" },
  { danish: "Veninde (pige)", somali: "Saaxiibad", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "people" },
  { danish: "Klassekammerat", somali: "La dhigto iskuul", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "people" },
  { danish: "Nabo", somali: "Deris", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "people" },
  { danish: "Lærer", somali: "Macallin", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "people" },
  { danish: "Kammerat", somali: "Walaal ciyaarta", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "people" },
  { danish: "Gruppe", somali: "Koox", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "people" },

  // Følelser
  { danish: "Jeg elsker dig", somali: "Waan ku jeclahay", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "feelings" },
  { danish: "Jeg savner dig", somali: "Waan ku tabayaa", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "feelings" },
  { danish: "Venlig", somali: "Naxariis leh", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "feelings" },
  { danish: "Hjælpsom", somali: "Gargaaraya", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "feelings" },
  { danish: "Sammen", somali: "Wadajir", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "feelings" },
  { danish: "Ensom", somali: "Kelinimo", image: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png", category: "feelings" },
];

export const categoryTitles = {
  family: "Familie",
  people: "Mennesker", 
  feelings: "Følelser"
};
