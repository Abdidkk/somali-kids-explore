
export interface ColorData {
  name: string;
  somali: string;
  danish: string;
  hex: string;
  image?: string;
  audioPath: string;
}

export const COLORS_DATA: ColorData[] = [
  {
    name: "red",
    somali: "Gaduud",
    danish: "Rød",
    hex: "#FF0000",
  },
  {
    name: "blue", 
    somali: "buluug",
    danish: "blå",
    hex: "#0000FF",
    audioPath:"/public/Buluug.mp3",
  },
  {
    name: "green",
    somali: "cagaar",
    danish: "grøn", 
    hex: "#00FF00",
  },
  {
    name: "yellow",
    somali: "jaalle",
    danish: "gul",
    hex: "#FFFF00",
  },
  {
    name: "orange",
    somali: "oranjo",
    danish: "orange",
    hex: "#FFA500",
  },
  {
    name: "purple",
    somali: "guduud",
    danish: "lilla",
    hex: "#800080",
  },
  {
    name: "pink",
    somali: "casaan",
    danish: "lyserød",
    hex: "#FFC0CB",
  },
  {
    name: "brown",
    somali: "bunni",
    danish: "brun",
    hex: "#8B4513",
  },
  {
    name: "black",
    somali: "madow",
    danish: "sort",
    hex: "#000000",
  },
  {
    name: "white",
    somali: "caddaan",
    danish: "hvid",
    hex: "#FFFFFF",
  },
];
