
export interface ColorData {
  name: string;
  somali: string;
  danish: string;
  hex: string;
  image?: string;
  audioPath?: string; // Made optional to fix build errors
}

export const COLORS_DATA: ColorData[] = [
  {
    name: "red",
    somali: "Gaduud",
    danish: "Rød",
    hex: "#FF0000",
    audioPath:"/Farver/Gaduud.mp3",
  },
  {
    name: "blue", 
    somali: "Buluug",
    danish: "Blå",
    hex: "#0000FF",
    audioPath:"/Farver/Buluug.mp3", // Only blue has audio file currently
  },
  {
    name: "green",
    somali: "Cagaar",
    danish: "grøn", 
    hex: "#00FF00",
    audioPath:"/Farver/Cagaar.mp3",
  },
  {
    name: "yellow",
    somali: "Jaale",
    danish: "Gul",
    hex: "#FFFF00",
    audioPath:"/Farver/Jaalle.mp3",
  },
  {
    name: "orange",
    somali: "Dahabi",
    danish: "Orange",
    hex: "#FFA500",
    audioPath:"/Farver/Dahabi.mp3",
  },
  {
    name: "purple",
    somali: "Fiyoole",
    danish: "Lilla",
    hex: "#800080",
    audioPath:"/Farver/Lilla.mp3",
  },
  {
    name: "pink",
    somali: "Basali",
    danish: "lyserød",
    hex: "#FFC0CB",
    audioPath:"/Farver/Lyserød.mp3",
  },
  {
    name: "brown",
    somali: "Bunni",
    danish: "Brun",
    hex: "#8B4513",
    audioPath:"/Farver/Bunni.mp3",
  },
  {
    name: "black",
    somali: "Madoow",
    danish: "Sort",
    hex: "#000000",
    audioPath:"/Farver/Madow.mp3",
  },
  {
    name: "white",
    somali: "Cadaan",
    danish: "Hvid",
    hex: "#FFFFFF",
    audioPath:"/Farver/Hvid.mp3",
  },
];

// Utility function to check if color has audio
export const hasColorAudio = (color: ColorData): boolean => {
  return !!color.audioPath;
};
