
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
    audioPath:"/public/Farver/Gaduud.mp3"
  },
  {
    name: "blue", 
    somali: "Buluug",
    danish: "Blå",
    hex: "#0000FF",
    audioPath: "Buluug.mp3", // Only blue has audio file currently
  },
  {
    name: "green",
    somali: "Cagaar",
    danish: "grøn", 
    hex: "#00FF00",
  },
  {
    name: "yellow",
    somali: "Jaalle",
    danish: "Gul",
    hex: "#FFFF00",
  },
  {
    name: "orange",
    somali: "Oranji",
    danish: "Orange",
    hex: "#FFA500",
  },
  {
    name: "purple",
    somali: "Fiyoole",
    danish: "Lilla",
    hex: "#800080",
  },
  {
    name: "pink",
    somali: "Basli",
    danish: "lyserød",
    hex: "#FFC0CB",
  },
  {
    name: "brown",
    somali: "Bunni",
    danish: "Brun",
    hex: "#8B4513",
  },
  {
    name: "black",
    somali: "Madow",
    danish: "Sort",
    hex: "#000000",
  },
  {
    name: "white",
    somali: "Caddaan",
    danish: "Hvid",
    hex: "#FFFFFF",
  },
];

// Utility function to check if color has audio
export const hasColorAudio = (color: ColorData): boolean => {
  return !!color.audioPath;
};
