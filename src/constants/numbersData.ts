
export interface NumberData {
  number: number;
  somali: string;
  danish: string;
  audioPath?: string;
}

export const NUMBERS_1_19: NumberData[] = [
  { number: 1, somali: "Koow", danish: "en", audioPath: "/Tal/1.mp3"},
  { number: 2, somali: "Labo", danish: "to", audioPath: "/Tal/2.mp3"},
  { number: 3, somali: "Sedex", danish: "tre", audioPath: "/Tal/3.mp3" },
  { number: 4, somali: "Afar", danish: "fire", audioPath: "/Tal/4.mp3" },
  { number: 5, somali: "Shan", danish: "fem", audioPath: "/Tal/5.mp3" },
  { number: 6, somali: "Lix", danish: "seks", audioPath: "/Tal/6.mp3" },
  { number: 7, somali: "Todobo", danish: "syv", audioPath: "/Tal/7.mp3" },
  { number: 8, somali: "Sideed", danish: "otte", audioPath: "/Tal/8.mp3" },
  { number: 9, somali: "Sagaal", danish: "ni", audioPath: "/Tal/9.mp3" },
  { number: 10, somali: "Toban", danish: "ti", audioPath: "/Tal/10.mp3" },
  { number: 11, somali: "Kow iyo toban", danish: "elleve", audioPath: "/Tal/11.mp3" },
  { number: 12, somali: "Labo iyo toban", danish: "tolv", audioPath: "/Tal/12.mp3" },
  { number: 13, somali: "Sedex iyo toban", danish: "tretten", audioPath: "/Tal/13.mp3" },
  { number: 14, somali: "Afar iyo toban", danish: "fjorten", audioPath: "/Tal/14.mp3" },
  { number: 15, somali: "Shan iyo toban", danish: "femten", audioPath: "/Tal/15.mp3" },
  { number: 16, somali: "Lix iyo toban", danish: "seksten", audioPath: "/Tal/16.mp3" },
  { number: 17, somali: "Todobaad iyo toban", danish: "sytten", audioPath: "/Tal/17.mp3" },
  { number: 18, somali: "Sideed iyo toban", danish: "atten", audioPath: "/Tal/18.mp3" },
  { number: 19, somali: "Sagaal iyo toban", danish: "nitten", audioPath: "/Tal/19.mp3" },
];

export const NUMBERS_20_90: NumberData[] = [
  { number: 20, somali: "Labaatan", danish: "tyve", audioPath: "/Tal/20.mp3" },
  { number: 30, somali: "Soddon", danish: "tredive", audioPath: "/Tal/30.mp3" },
  { number: 40, somali: "Afartan", danish: "fyrre", audioPath: "/Tal/40.mp3" },
  { number: 50, somali: "Konton", danish: "halvtreds", audioPath: "/Tal/50.mp3" },
  { number: 60, somali: "Lixdan", danish: "tres", audioPath: "/Tal/60.mp3" },
  { number: 70, somali: "Todobaatan", danish: "halvfjerds", audioPath: "/Tal/70.mp3" },
  { number: 80, somali: "Sideedatan", danish: "firs", audioPath: "/Tal/80.mp3" },
  { number: 90, somali: "Sagaashan", danish: "halvfems", audioPath: "/Tal/90.mp3" },
];

export const NUMBERS_100_1000: NumberData[] = [
  { number: 100, somali: "Boqol", danish: "hundrede", audioPath: "/Tal/100.mp3" },
  { number: 200, somali: "Laba boqol", danish: "to hundrede", audioPath: "/Tal/200.mp3" },
  { number: 300, somali: "Saddex boqol", danish: "tre hundrede", audioPath: "/Tal/300.mp3" },
  { number: 400, somali: "Afar boqol", danish: "fire hundrede", audioPath: "/Tal/400.mp3" },
  { number: 500, somali: "Shan boqol", danish: "fem hundrede", audioPath: "/Tal/500.mp3" },
  { number: 600, somali: "Lix boqol", danish: "seks hundrede", audioPath: "/Tal/600.mp3" },
  { number: 700, somali: "Todobaad boqol", danish: "syv hundrede", audioPath: "/Tal/700.mp3" },
  { number: 800, somali: "Sideed boqol", danish: "otte hundrede", audioPath: "/Tal/800.mp3" },
  { number: 900, somali: "Sagaal boqol", danish: "ni hundrede", audioPath: "/Tal/900.mp3" },
  { number: 1000, somali: "Kun", danish: "tusind", audioPath: "/Tal/1000.mp3" },
];

export function getNumbersForTab(tab: string): NumberData[] {
  switch (tab) {
    case "1-19":
      return NUMBERS_1_19;
    case "20-90":
      return NUMBERS_20_90;
    case "100-1000":
      return NUMBERS_100_1000;
    default:
      return NUMBERS_1_19;
  }
}
